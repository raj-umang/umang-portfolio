import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, insertSkillSchema, insertProjectSchema, 
  insertCertificationSchema, insertLearningSchema, insertPageViewSchema,
  insertAdminUserSchema
} from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

declare module "express-session" {
  interface SessionData {
    adminId?: string;
    adminUsername?: string;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "portfolio-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({
        checkPeriod: 86400000,
      }),
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const { search, tech } = req.query;
      let projects;
      if (search || tech) {
        projects = await storage.searchProjects(
          search as string || "",
          tech as string
        );
      } else {
        projects = await storage.getProjects();
      }
      res.json(projects);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/certifications", async (req, res) => {
    try {
      const certifications = await storage.getCertifications();
      res.json(certifications);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/learnings", async (req, res) => {
    try {
      const learnings = await storage.getLearnings();
      res.json(learnings);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/learnings/:id", async (req, res) => {
    try {
      const learning = await storage.getLearningById(req.params.id);
      if (!learning) {
        return res.status(404).json({ success: false, error: "Learning not found" });
      }
      res.json(learning);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const validatedData = insertPageViewSchema.parse(req.body);
      await storage.createPageView(validatedData);
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/technologies", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      const techSet = new Set<string>();
      projects.forEach(p => p.techStack.forEach(t => techSet.add(t)));
      res.json(Array.from(techSet).sort());
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await storage.getAdminByUsername(username);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
      
      req.session.adminId = admin.id;
      req.session.adminUsername = admin.username;
      
      res.json({ success: true, admin: { id: admin.id, username: admin.username } });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/session", (req, res) => {
    if (req.session.adminId) {
      res.json({ 
        authenticated: true, 
        admin: { id: req.session.adminId, username: req.session.adminUsername } 
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  app.post("/api/admin/setup", async (req, res) => {
    try {
      const existing = await storage.getAdminByUsername("admin");
      if (existing) {
        return res.status(400).json({ success: false, error: "Admin already exists" });
      }
      
      const { password } = req.body;
      if (!password || password.length < 6) {
        return res.status(400).json({ success: false, error: "Password must be at least 6 characters" });
      }
      
      const admin = await storage.createAdmin({ username: "admin", password });
      res.status(201).json({ success: true, admin: { id: admin.id, username: admin.username } });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/api/admin/skills", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.status(201).json({ success: true, skill });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  app.put("/api/admin/skills/:id", requireAdmin, async (req, res) => {
    try {
      const skill = await storage.updateSkill(req.params.id, req.body);
      if (!skill) {
        return res.status(404).json({ success: false, error: "Skill not found" });
      }
      res.json({ success: true, skill });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.delete("/api/admin/skills/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteSkill(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Skill not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/api/admin/projects", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json({ success: true, project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  app.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      res.json({ success: true, project });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/api/admin/certifications", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertCertificationSchema.parse(req.body);
      const cert = await storage.createCertification(validatedData);
      res.status(201).json({ success: true, certification: cert });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  app.put("/api/admin/certifications/:id", requireAdmin, async (req, res) => {
    try {
      const cert = await storage.updateCertification(req.params.id, req.body);
      if (!cert) {
        return res.status(404).json({ success: false, error: "Certification not found" });
      }
      res.json({ success: true, certification: cert });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.delete("/api/admin/certifications/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteCertification(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Certification not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/api/admin/learnings", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertLearningSchema.parse(req.body);
      const learning = await storage.createLearning(validatedData);
      res.status(201).json({ success: true, learning });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  app.put("/api/admin/learnings/:id", requireAdmin, async (req, res) => {
    try {
      const learning = await storage.updateLearning(req.params.id, req.body);
      if (!learning) {
        return res.status(404).json({ success: false, error: "Learning not found" });
      }
      res.json({ success: true, learning });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.delete("/api/admin/learnings/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteLearning(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Learning not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/admin/messages", requireAdmin, async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.put("/api/admin/messages/:id/read", requireAdmin, async (req, res) => {
    try {
      const marked = await storage.markMessageRead(req.params.id);
      if (!marked) {
        return res.status(404).json({ success: false, error: "Message not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteContactMessage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Message not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/admin/analytics", requireAdmin, async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  return httpServer;
}
