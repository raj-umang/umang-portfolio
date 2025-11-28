import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import type { Learning } from "@shared/schema";

const learningsData: Learning[] = [
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const categoryColors: Record<string, string> = {
  Architecture: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  TypeScript: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  React: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  DevOps: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Database: "bg-green-500/10 text-green-600 dark:text-green-400",
  Engineering: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

export function LearningsSection() {
  return (
    <section id="learnings" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-learnings-title">
            Learnings & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge and experiences from my journey as a software engineer, exploring technologies, patterns, and best practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningsData.map((learning) => (
            <Card
              key={learning.id}
              className="p-6 flex flex-col hover-elevate group"
              data-testid={`card-learning-${learning.id}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className={`text-xs ${categoryColors[learning.category] || ""}`}
                >
                  {learning.category}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold mb-3 leading-snug group-hover:text-primary transition-colors">
                {learning.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
                {learning.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatDate(learning.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {learning.readTime}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground -mr-2">
                  Read
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
