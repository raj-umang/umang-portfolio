import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Clock } from "lucide-react";
import type { Learning } from "@shared/schema";

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

function LearningsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-5 w-20 mb-4" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-16 w-full mb-4" />
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-16" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function LearningsSection() {
  const { data: learnings, isLoading, error } = useQuery<Learning[]>({
    queryKey: ["/api/learnings"],
  });

  return (
    <section id="learnings" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-learnings-title">
            Learnings & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-learnings-description">
            Sharing knowledge and experiences from my journey as a software engineer, exploring technologies, patterns, and best practices.
          </p>
        </div>

        {isLoading ? (
          <LearningsSkeleton />
        ) : error ? (
          <div className="text-center text-muted-foreground" data-testid="text-learnings-error">
            Failed to load learnings. Please try again later.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learnings?.map((learning) => (
              <Card
                key={learning.id}
                className="p-6 flex flex-col hover-elevate group"
                data-testid={`card-learning-${learning.id}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${categoryColors[learning.category] || ""}`}
                    data-testid={`badge-learning-category-${learning.id}`}
                  >
                    {learning.category}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-3 leading-snug group-hover:text-primary transition-colors" data-testid={`text-learning-title-${learning.id}`}>
                  {learning.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed" data-testid={`text-learning-excerpt-${learning.id}`}>
                  {learning.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground" data-testid={`text-learning-meta-${learning.id}`}>
                    <span>{formatDate(learning.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {learning.readTime}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground -mr-2" data-testid={`button-learning-read-${learning.id}`}>
                    Read
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
