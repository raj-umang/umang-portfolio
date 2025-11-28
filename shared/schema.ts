import { z } from "zod";

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["languages", "frameworks", "tools", "practices"]),
  proficiency: z.number().min(0).max(100),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  imageUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  featured: z.boolean().default(false),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
});

export const learningSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  date: z.string(),
  readTime: z.string(),
  content: z.string().optional(),
});

export const contactMessageSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Learning = z.infer<typeof learningSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;

export const insertContactMessageSchema = contactMessageSchema.omit({ id: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export const users = null;
export type User = { id: string; username: string; password: string };
export type InsertUser = { username: string; password: string };
