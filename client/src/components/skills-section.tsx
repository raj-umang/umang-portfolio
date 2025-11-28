import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@shared/schema";

const skillsData: Skill[] = [
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

const categoryLabels: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools & Platforms",
  practices: "Practices",
};

const categoryOrder = ["languages", "frameworks", "tools", "practices"];

export function SkillsSection() {
  const groupedSkills = categoryOrder.reduce((acc, category) => {
    acc[category] = skillsData.filter((skill) => skill.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-skills-title">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of crafting software solutions across various domains and technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryOrder.map((category) => (
            <Card key={category} className="p-6 hover-elevate" data-testid={`card-skills-${category}`}>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {categoryLabels[category]}
                <Badge variant="secondary" className="text-xs">
                  {groupedSkills[category].length}
                </Badge>
              </h3>
              <div className="space-y-3">
                {groupedSkills[category].map((skill) => (
                  <div key={skill.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground font-mono text-xs">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
