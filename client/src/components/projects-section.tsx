import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@shared/schema";

function ProjectsSkeleton() {
  return (
    <div>
      <Card className="mb-12 overflow-hidden">
        <div className="grid lg:grid-cols-5 gap-0">
          <Skeleton className="lg:col-span-3 min-h-[280px]" />
          <div className="lg:col-span-2 p-8 lg:p-10 space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="w-12 h-12 rounded-lg mb-4" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-16 w-full mb-4" />
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-5 w-16" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const featuredProject = projects?.find((p) => p.featured);
  const otherProjects = projects?.filter((p) => !p.featured) || [];

  return (
    <section id="projects" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-projects-title">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-projects-description">
            A selection of projects that showcase my approach to solving complex problems with elegant, scalable solutions.
          </p>
        </div>

        {isLoading ? (
          <ProjectsSkeleton />
        ) : error ? (
          <div className="text-center text-muted-foreground" data-testid="text-projects-error">
            Failed to load projects. Please try again later.
          </div>
        ) : (
          <>
            {featuredProject && (
              <Card className="mb-12 overflow-hidden hover-elevate" data-testid="card-featured-project">
                <div className="grid lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-3 bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:p-12 flex items-center justify-center min-h-[280px]">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center" data-testid="img-featured-project-logo">
                        <span className="text-3xl font-bold text-primary">CIP</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Featured Project</p>
                    </div>
                  </div>
                  <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-3" data-testid="badge-featured">Featured</Badge>
                    <h3 className="text-2xl font-bold mb-3" data-testid="text-featured-project-title">
                      {featuredProject.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-featured-project-description">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6" data-testid="list-featured-project-tech">
                      {featuredProject.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="font-mono text-xs" data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {featuredProject.liveUrl && (
                        <Button size="sm" asChild data-testid="button-featured-live">
                          <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {featuredProject.githubUrl && (
                        <Button variant="outline" size="sm" asChild data-testid="button-featured-github">
                          <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <Card key={project.id} className="p-6 flex flex-col hover-elevate" data-testid={`card-project-${project.id}`}>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" data-testid={`img-project-logo-${project.id}`}>
                    <span className="text-lg font-bold text-primary">
                      {project.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-project-title-${project.id}`}>{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed" data-testid={`text-project-description-${project.id}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4" data-testid={`list-project-tech-${project.id}`}>
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    {project.liveUrl && (
                      <Button variant="ghost" size="sm" asChild className="text-muted-foreground" data-testid={`button-project-live-${project.id}`}>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-3.5 w-3.5" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="ghost" size="sm" asChild className="text-muted-foreground" data-testid={`button-project-github-${project.id}`}>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1 h-3.5 w-3.5" />
                          Code
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground" data-testid={`button-project-details-${project.id}`}>
                      Details
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
