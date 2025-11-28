import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@shared/schema";

const projectsData: Project[] = [
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

const featuredProject = projectsData.find((p) => p.featured);
const otherProjects = projectsData.filter((p) => !p.featured);

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-projects-title">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my approach to solving complex problems with elegant, scalable solutions.
          </p>
        </div>

        {featuredProject && (
          <Card className="mb-12 overflow-hidden hover-elevate" data-testid="card-featured-project">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:p-12 flex items-center justify-center min-h-[280px]">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">CIP</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Featured Project</p>
                </div>
              </div>
              <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-3">Featured</Badge>
                <h3 className="text-2xl font-bold mb-3" data-testid="text-featured-project-title">
                  {featuredProject.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="font-mono text-xs">
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
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-primary">
                  {project.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
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
                  <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3.5 w-3.5" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-1 h-3.5 w-3.5" />
                      Code
                    </a>
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground">
                  Details
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
