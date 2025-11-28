import { db } from "./db";
import { skills, projects, certifications, learnings, adminUsers } from "@shared/schema";
import { eq } from "drizzle-orm";

const initialSkills = [
  { name: "TypeScript", category: "languages", proficiency: 95, order: 1 },
  { name: "JavaScript", category: "languages", proficiency: 95, order: 2 },
  { name: "Python", category: "languages", proficiency: 85, order: 3 },
  { name: "Go", category: "languages", proficiency: 75, order: 4 },
  { name: "Java", category: "languages", proficiency: 80, order: 5 },
  { name: "SQL", category: "languages", proficiency: 85, order: 6 },
  { name: "React", category: "frameworks", proficiency: 95, order: 1 },
  { name: "Node.js", category: "frameworks", proficiency: 90, order: 2 },
  { name: "Next.js", category: "frameworks", proficiency: 85, order: 3 },
  { name: "Express", category: "frameworks", proficiency: 90, order: 4 },
  { name: "Django", category: "frameworks", proficiency: 75, order: 5 },
  { name: "FastAPI", category: "frameworks", proficiency: 80, order: 6 },
  { name: "Docker", category: "tools", proficiency: 85, order: 1 },
  { name: "Kubernetes", category: "tools", proficiency: 70, order: 2 },
  { name: "AWS", category: "tools", proficiency: 80, order: 3 },
  { name: "Git", category: "tools", proficiency: 95, order: 4 },
  { name: "PostgreSQL", category: "tools", proficiency: 85, order: 5 },
  { name: "Redis", category: "tools", proficiency: 75, order: 6 },
  { name: "CI/CD", category: "practices", proficiency: 85, order: 1 },
  { name: "TDD", category: "practices", proficiency: 80, order: 2 },
  { name: "Agile", category: "practices", proficiency: 90, order: 3 },
  { name: "System Design", category: "practices", proficiency: 85, order: 4 },
];

const initialProjects = [
  {
    title: "Cloud Infrastructure Platform",
    description: "A comprehensive cloud management platform enabling teams to provision, monitor, and scale infrastructure across multiple cloud providers. Features real-time metrics, cost optimization, and automated scaling policies.",
    fullDescription: "This platform revolutionizes how teams manage cloud infrastructure by providing a unified interface for AWS, GCP, and Azure. Key features include real-time resource monitoring, automated cost optimization recommendations, infrastructure-as-code templates, and intelligent scaling based on traffic patterns. Built with a microservices architecture ensuring high availability and scalability.",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "Kubernetes"],
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    order: 1,
  },
  {
    title: "Real-time Collaboration Suite",
    description: "A collaborative workspace application with real-time document editing, video conferencing, and project management capabilities.",
    fullDescription: "This suite enables remote teams to collaborate seamlessly with features like real-time document co-editing with conflict resolution, HD video conferencing with screen sharing, integrated project management with Kanban boards, and team messaging with threaded conversations. The application handles thousands of concurrent users with sub-100ms latency.",
    techStack: ["React", "WebSocket", "Redis", "PostgreSQL", "WebRTC"],
    featured: false,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    order: 2,
  },
  {
    title: "ML Pipeline Orchestrator",
    description: "An end-to-end machine learning pipeline orchestration tool for training, versioning, and deploying ML models at scale.",
    fullDescription: "A comprehensive MLOps platform that automates the entire machine learning lifecycle. Features include experiment tracking, model versioning, automated hyperparameter tuning, A/B testing for model deployments, and monitoring for model drift. Integrates with popular ML frameworks like TensorFlow, PyTorch, and scikit-learn.",
    techStack: ["Python", "FastAPI", "TensorFlow", "Docker", "Airflow"],
    featured: false,
    githubUrl: "https://github.com",
    order: 3,
  },
  {
    title: "Developer Analytics Dashboard",
    description: "A comprehensive analytics platform for engineering teams to track productivity, code quality metrics, and sprint velocity.",
    fullDescription: "This dashboard aggregates data from Git repositories, CI/CD pipelines, and project management tools to provide actionable insights. Features include code review turnaround time tracking, deployment frequency metrics, DORA metrics visualization, and team productivity trends. Helps engineering managers make data-driven decisions.",
    techStack: ["Next.js", "GraphQL", "PostgreSQL", "Chart.js"],
    featured: false,
    liveUrl: "https://example.com",
    order: 4,
  },
];

const initialCertifications = [
  {
    name: "AWS Solutions Architect Professional",
    issuer: "Amazon Web Services",
    issueDate: "2024-01",
    expiryDate: "2027-01",
    credentialId: "AWS-SAP-2024",
    credentialUrl: "https://aws.amazon.com/verification",
    order: 1,
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    issueDate: "2023-08",
    expiryDate: "2025-08",
    credentialId: "GCP-PD-2023",
    credentialUrl: "https://cloud.google.com/certification",
    order: 2,
  },
  {
    name: "Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "2023-05",
    expiryDate: "2026-05",
    credentialId: "CKA-2023-12345",
    credentialUrl: "https://cncf.io/certification",
    order: 3,
  },
  {
    name: "MongoDB Database Administrator",
    issuer: "MongoDB University",
    issueDate: "2023-03",
    credentialId: "MDB-DBA-2023",
    credentialUrl: "https://university.mongodb.com",
    order: 4,
  },
];

const initialLearnings = [
  {
    title: "Building Scalable Microservices with Event-Driven Architecture",
    excerpt: "Exploring patterns and best practices for designing loosely coupled microservices using event sourcing and CQRS.",
    content: "Event-driven architecture (EDA) has become essential for building scalable microservices. In this article, we explore how event sourcing and CQRS patterns can help create loosely coupled systems that scale independently. We cover topics like event stores, message brokers, eventual consistency, and saga patterns for managing distributed transactions.",
    category: "Architecture",
    date: "2024-10-15",
    readTime: "8 min read",
    published: true,
    order: 1,
  },
  {
    title: "TypeScript 5.0: Advanced Type Patterns",
    excerpt: "Deep dive into advanced TypeScript patterns including conditional types, mapped types, and template literal types.",
    content: "TypeScript 5.0 brings powerful new type features. This guide covers advanced patterns like conditional types for type-level programming, mapped types for transforming object types, template literal types for string manipulation at the type level, and the new const type parameters for more precise type inference.",
    category: "TypeScript",
    date: "2024-09-22",
    readTime: "6 min read",
    published: true,
    order: 2,
  },
  {
    title: "Optimizing React Performance at Scale",
    excerpt: "Practical techniques for improving React application performance through memoization, code splitting, and virtualization.",
    content: "As React applications grow, performance optimization becomes critical. This article covers practical techniques including React.memo and useMemo for preventing unnecessary renders, code splitting with React.lazy for faster initial loads, virtualization with react-window for rendering large lists, and profiling with React DevTools to identify bottlenecks.",
    category: "React",
    date: "2024-08-30",
    readTime: "10 min read",
    published: true,
    order: 3,
  },
  {
    title: "Infrastructure as Code with Terraform",
    excerpt: "A comprehensive guide to managing cloud infrastructure using Terraform, including modules, state management, and CI/CD integration.",
    content: "Terraform has become the standard for infrastructure as code. This comprehensive guide covers creating reusable modules, managing state with remote backends, implementing workspaces for environment management, and integrating Terraform into CI/CD pipelines for automated infrastructure deployment.",
    category: "DevOps",
    date: "2024-07-18",
    readTime: "12 min read",
    published: true,
    order: 4,
  },
  {
    title: "Database Sharding Strategies",
    excerpt: "Understanding horizontal scaling patterns for databases and implementing effective sharding strategies for high-traffic applications.",
    content: "When vertical scaling reaches its limits, database sharding becomes necessary. This article explores different sharding strategies including range-based, hash-based, and directory-based sharding. We also cover shard key selection, cross-shard queries, and rebalancing strategies for growing datasets.",
    category: "Database",
    date: "2024-06-25",
    readTime: "7 min read",
    published: true,
    order: 5,
  },
  {
    title: "The Art of Code Review",
    excerpt: "Best practices for conducting effective code reviews that improve code quality, share knowledge, and build team culture.",
    content: "Code review is more than finding bugs—it's about knowledge sharing and team growth. This article covers creating a positive review culture, what to look for beyond syntax errors, balancing thoroughness with velocity, and using automation to handle style and formatting so reviewers can focus on logic and architecture.",
    category: "Engineering",
    date: "2024-05-12",
    readTime: "5 min read",
    published: true,
    order: 6,
  },
];

export async function seed() {
  console.log("Starting database seed...");

  const existingSkills = await db.select().from(skills).limit(1);
  if (existingSkills.length === 0) {
    console.log("Seeding skills...");
    await db.insert(skills).values(initialSkills);
  } else {
    console.log("Skills already exist, skipping...");
  }

  const existingProjects = await db.select().from(projects).limit(1);
  if (existingProjects.length === 0) {
    console.log("Seeding projects...");
    await db.insert(projects).values(initialProjects);
  } else {
    console.log("Projects already exist, skipping...");
  }

  const existingCerts = await db.select().from(certifications).limit(1);
  if (existingCerts.length === 0) {
    console.log("Seeding certifications...");
    await db.insert(certifications).values(initialCertifications);
  } else {
    console.log("Certifications already exist, skipping...");
  }

  const existingLearnings = await db.select().from(learnings).limit(1);
  if (existingLearnings.length === 0) {
    console.log("Seeding learnings...");
    await db.insert(learnings).values(initialLearnings);
  } else {
    console.log("Learnings already exist, skipping...");
  }

  console.log("Database seed completed!");
}
