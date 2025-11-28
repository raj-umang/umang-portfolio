import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Skill } from "@shared/schema";

const categoryLabels: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools & Platforms",
  practices: "Practices",
};

const categoryOrder = ["languages", "frameworks", "tools", "practices"];

function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export function SkillsSection() {
  const { data: skills, isLoading, error } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const groupedSkills = skills
    ? categoryOrder.reduce((acc, category) => {
        acc[category] = skills.filter((skill) => skill.category === category);
        return acc;
      }, {} as Record<string, Skill[]>)
    : {};

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-skills-title">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-skills-description">
            A comprehensive toolkit built over years of crafting software solutions across various domains and technologies.
          </p>
        </div>

        {isLoading ? (
          <SkillsSkeleton />
        ) : error ? (
          <div className="text-center text-muted-foreground" data-testid="text-skills-error">
            Failed to load skills. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categoryOrder.map((category) => (
              <Card key={category} className="p-6 hover-elevate" data-testid={`card-skills-${category}`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {categoryLabels[category]}
                  <Badge variant="secondary" className="text-xs" data-testid={`badge-skills-count-${category}`}>
                    {groupedSkills[category]?.length || 0}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {groupedSkills[category]?.map((skill) => (
                    <div key={skill.id} className="space-y-1.5" data-testid={`skill-item-${skill.id}`}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium" data-testid={`text-skill-name-${skill.id}`}>{skill.name}</span>
                        <span className="text-muted-foreground font-mono text-xs" data-testid={`text-skill-proficiency-${skill.id}`}>
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                          data-testid={`progress-skill-${skill.id}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
