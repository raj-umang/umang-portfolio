import { 
  skills, projects, certifications, learnings, contactMessages, pageViews, adminUsers,
  type Skill, type InsertSkill,
  type Project, type InsertProject,
  type Certification, type InsertCertification,
  type Learning, type InsertLearning,
  type ContactMessage, type InsertContactMessage,
  type PageView, type InsertPageView,
  type AdminUser, type InsertAdminUser
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, desc, asc } from "drizzle-orm";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<boolean>;

  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | undefined>;
  searchProjects(query: string, techFilter?: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  getCertifications(): Promise<Certification[]>;
  createCertification(cert: InsertCertification): Promise<Certification>;
  updateCertification(id: string, cert: Partial<InsertCertification>): Promise<Certification | undefined>;
  deleteCertification(id: string): Promise<boolean>;

  getLearnings(): Promise<Learning[]>;
  getLearningById(id: string): Promise<Learning | undefined>;
  createLearning(learning: InsertLearning): Promise<Learning>;
  updateLearning(id: string, learning: Partial<InsertLearning>): Promise<Learning | undefined>;
  deleteLearning(id: string): Promise<boolean>;

  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageRead(id: string): Promise<boolean>;
  deleteContactMessage(id: string): Promise<boolean>;

  createPageView(view: InsertPageView): Promise<PageView>;
  getPageViews(): Promise<PageView[]>;
  getAnalytics(): Promise<{ totalViews: number; uniquePaths: number; topPages: { path: string; count: number }[] }>;

  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  createAdmin(admin: InsertAdminUser): Promise<AdminUser>;
}

export class DatabaseStorage implements IStorage {
  async getSkills(): Promise<Skill[]> {
    return db.select().from(skills).orderBy(asc(skills.order), asc(skills.name));
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [result] = await db.insert(skills).values(skill).returning();
    return result;
  }

  async updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [result] = await db.update(skills).set(skill).where(eq(skills.id, id)).returning();
    return result;
  }

  async deleteSkill(id: string): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id)).returning();
    return result.length > 0;
  }

  async getProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(desc(projects.featured), asc(projects.order), desc(projects.createdAt));
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const [result] = await db.select().from(projects).where(eq(projects.id, id));
    return result;
  }

  async searchProjects(query: string, techFilter?: string): Promise<Project[]> {
    let results = await this.getProjects();
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.techStack.some(t => t.toLowerCase().includes(lowerQuery))
      );
    }
    
    if (techFilter) {
      const lowerFilter = techFilter.toLowerCase();
      results = results.filter(p => 
        p.techStack.some(t => t.toLowerCase() === lowerFilter)
      );
    }
    
    return results;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [result] = await db.insert(projects).values(project).returning();
    return result;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [result] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return result;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  async getCertifications(): Promise<Certification[]> {
    return db.select().from(certifications).orderBy(asc(certifications.order), desc(certifications.issueDate));
  }

  async createCertification(cert: InsertCertification): Promise<Certification> {
    const [result] = await db.insert(certifications).values(cert).returning();
    return result;
  }

  async updateCertification(id: string, cert: Partial<InsertCertification>): Promise<Certification | undefined> {
    const [result] = await db.update(certifications).set(cert).where(eq(certifications.id, id)).returning();
    return result;
  }

  async deleteCertification(id: string): Promise<boolean> {
    const result = await db.delete(certifications).where(eq(certifications.id, id)).returning();
    return result.length > 0;
  }

  async getLearnings(): Promise<Learning[]> {
    return db.select().from(learnings).where(eq(learnings.published, true)).orderBy(asc(learnings.order), desc(learnings.createdAt));
  }

  async getLearningById(id: string): Promise<Learning | undefined> {
    const [result] = await db.select().from(learnings).where(eq(learnings.id, id));
    return result;
  }

  async createLearning(learning: InsertLearning): Promise<Learning> {
    const [result] = await db.insert(learnings).values(learning).returning();
    return result;
  }

  async updateLearning(id: string, learning: Partial<InsertLearning>): Promise<Learning | undefined> {
    const [result] = await db.update(learnings).set(learning).where(eq(learnings.id, id)).returning();
    return result;
  }

  async deleteLearning(id: string): Promise<boolean> {
    const result = await db.delete(learnings).where(eq(learnings.id, id)).returning();
    return result.length > 0;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [result] = await db.insert(contactMessages).values(message).returning();
    return result;
  }

  async markMessageRead(id: string): Promise<boolean> {
    const result = await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id)).returning();
    return result.length > 0;
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id)).returning();
    return result.length > 0;
  }

  async createPageView(view: InsertPageView): Promise<PageView> {
    const [result] = await db.insert(pageViews).values(view).returning();
    return result;
  }

  async getPageViews(): Promise<PageView[]> {
    return db.select().from(pageViews).orderBy(desc(pageViews.createdAt));
  }

  async getAnalytics(): Promise<{ totalViews: number; uniquePaths: number; topPages: { path: string; count: number }[] }> {
    const views = await this.getPageViews();
    const pathCounts: Record<string, number> = {};
    
    views.forEach(v => {
      pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
    });
    
    const topPages = Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    return {
      totalViews: views.length,
      uniquePaths: Object.keys(pathCounts).length,
      topPages,
    };
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [result] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return result;
  }

  async createAdmin(admin: InsertAdminUser): Promise<AdminUser> {
    const [result] = await db.insert(adminUsers).values(admin).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
