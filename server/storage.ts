import { type InsertContactMessage, type ContactMessage, type Skill, type Project, type Certification, type Learning } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  getCertifications(): Promise<Certification[]>;
  getLearnings(): Promise<Learning[]>;
}

const initialSkills: Skill[] = [
  { id: "1", name: "TypeScript", category: "languages", proficiency: 95 },
  { id: "2", name: "JavaScript", category: "languages", proficiency: 95 },
  { id: "3", name: "Python", category: "languages", proficiency: 85 },
  { id: "4", name: "Go", category: "languages", proficiency: 75 },
  { id: "5", name: "Java", category: "languages", proficiency: 80 },
  { id: "6", name: "SQL", category: "languages", proficiency: 85 },
  { id: "7", name: "React", category: "frameworks", proficiency: 95 },
  { id: "8", name: "Node.js", category: "frameworks", proficiency: 90 },
  { id: "9", name: "Next.js", category: "frameworks", proficiency: 85 },
  { id: "10", name: "Express", category: "frameworks", proficiency: 90 },
  { id: "11", name: "Django", category: "frameworks", proficiency: 75 },
  { id: "12", name: "FastAPI", category: "frameworks", proficiency: 80 },
  { id: "13", name: "Docker", category: "tools", proficiency: 85 },
  { id: "14", name: "Kubernetes", category: "tools", proficiency: 70 },
  { id: "15", name: "AWS", category: "tools", proficiency: 80 },
  { id: "16", name: "Git", category: "tools", proficiency: 95 },
  { id: "17", name: "PostgreSQL", category: "tools", proficiency: 85 },
  { id: "18", name: "Redis", category: "tools", proficiency: 75 },
  { id: "19", name: "CI/CD", category: "practices", proficiency: 85 },
  { id: "20", name: "TDD", category: "practices", proficiency: 80 },
  { id: "21", name: "Agile", category: "practices", proficiency: 90 },
  { id: "22", name: "System Design", category: "practices", proficiency: 85 },
];

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Cloud Infrastructure Platform",
    description: "A comprehensive cloud management platform enabling teams to provision, monitor, and scale infrastructure across multiple cloud providers. Features real-time metrics, cost optimization, and automated scaling policies.",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "Kubernetes"],
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "2",
    title: "Real-time Collaboration Suite",
    description: "A collaborative workspace application with real-time document editing, video conferencing, and project management capabilities.",
    techStack: ["React", "WebSocket", "Redis", "PostgreSQL", "WebRTC"],
    featured: false,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "3",
    title: "ML Pipeline Orchestrator",
    description: "An end-to-end machine learning pipeline orchestration tool for training, versioning, and deploying ML models at scale.",
    techStack: ["Python", "FastAPI", "TensorFlow", "Docker", "Airflow"],
    featured: false,
    githubUrl: "https://github.com",
  },
  {
    id: "4",
    title: "Developer Analytics Dashboard",
    description: "A comprehensive analytics platform for engineering teams to track productivity, code quality metrics, and sprint velocity.",
    techStack: ["Next.js", "GraphQL", "PostgreSQL", "Chart.js"],
    featured: false,
    liveUrl: "https://example.com",
  },
];

const initialCertifications: Certification[] = [
  {
    id: "1",
    name: "AWS Solutions Architect Professional",
    issuer: "Amazon Web Services",
    issueDate: "2024-01",
    expiryDate: "2027-01",
    credentialId: "AWS-SAP-2024",
    credentialUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "2",
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    issueDate: "2023-08",
    expiryDate: "2025-08",
    credentialId: "GCP-PD-2023",
    credentialUrl: "https://cloud.google.com/certification",
  },
  {
    id: "3",
    name: "Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "2023-05",
    expiryDate: "2026-05",
    credentialId: "CKA-2023-12345",
    credentialUrl: "https://cncf.io/certification",
  },
  {
    id: "4",
    name: "MongoDB Database Administrator",
    issuer: "MongoDB University",
    issueDate: "2023-03",
    credentialId: "MDB-DBA-2023",
    credentialUrl: "https://university.mongodb.com",
  },
];

const initialLearnings: Learning[] = [
  {
    id: "1",
    title: "Building Scalable Microservices with Event-Driven Architecture",
    excerpt: "Exploring patterns and best practices for designing loosely coupled microservices using event sourcing and CQRS.",
    category: "Architecture",
    date: "2024-10-15",
    readTime: "8 min read",
  },
  {
    id: "2",
    title: "TypeScript 5.0: Advanced Type Patterns",
    excerpt: "Deep dive into advanced TypeScript patterns including conditional types, mapped types, and template literal types.",
    category: "TypeScript",
    date: "2024-09-22",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "Optimizing React Performance at Scale",
    excerpt: "Practical techniques for improving React application performance through memoization, code splitting, and virtualization.",
    category: "React",
    date: "2024-08-30",
    readTime: "10 min read",
  },
  {
    id: "4",
    title: "Infrastructure as Code with Terraform",
    excerpt: "A comprehensive guide to managing cloud infrastructure using Terraform, including modules, state management, and CI/CD integration.",
    category: "DevOps",
    date: "2024-07-18",
    readTime: "12 min read",
  },
  {
    id: "5",
    title: "Database Sharding Strategies",
    excerpt: "Understanding horizontal scaling patterns for databases and implementing effective sharding strategies for high-traffic applications.",
    category: "Database",
    date: "2024-06-25",
    readTime: "7 min read",
  },
  {
    id: "6",
    title: "The Art of Code Review",
    excerpt: "Best practices for conducting effective code reviews that improve code quality, share knowledge, and build team culture.",
    category: "Engineering",
    date: "2024-05-12",
    readTime: "5 min read",
  },
];

export class MemStorage implements IStorage {
  private contactMessages: Map<string, ContactMessage>;
  private skills: Skill[];
  private projects: Project[];
  private certifications: Certification[];
  private learnings: Learning[];

  constructor() {
    this.contactMessages = new Map();
    this.skills = initialSkills;
    this.projects = initialProjects;
    this.certifications = initialCertifications;
    this.learnings = initialLearnings;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getCertifications(): Promise<Certification[]> {
    return this.certifications;
  }

  async getLearnings(): Promise<Learning[]> {
    return this.learnings;
  }
}

export const storage = new MemStorage();
