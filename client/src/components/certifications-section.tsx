import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Award, Calendar } from "lucide-react";
import type { Certification } from "@shared/schema";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function CertificationsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function CertificationsSection() {
  const { data: certifications, isLoading, error } = useQuery<Certification[]>({
    queryKey: ["/api/certifications"],
  });

  return (
    <section id="certifications" className="py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-certifications-title">
            Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-certifications-description">
            Industry-recognized certifications demonstrating expertise in cloud architecture, DevOps, and database technologies.
          </p>
        </div>

        {isLoading ? (
          <CertificationsSkeleton />
        ) : error ? (
          <div className="text-center text-muted-foreground" data-testid="text-certifications-error">
            Failed to load certifications. Please try again later.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certifications?.map((cert) => (
              <Card
                key={cert.id}
                className="p-6 hover-elevate"
                data-testid={`card-certification-${cert.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" data-testid={`icon-certification-${cert.id}`}>
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg leading-tight" data-testid={`text-certification-name-${cert.id}`}>{cert.name}</h3>
                      {cert.expiryDate && new Date(cert.expiryDate) > new Date() && (
                        <Badge variant="secondary" className="flex-shrink-0 text-xs" data-testid={`badge-certification-active-${cert.id}`}>Active</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3" data-testid={`text-certification-issuer-${cert.id}`}>{cert.issuer}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4" data-testid={`text-certification-dates-${cert.id}`}>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        Issued {formatDate(cert.issueDate)}
                      </span>
                      {cert.expiryDate && (
                        <span className="flex items-center gap-1.5">
                          Expires {formatDate(cert.expiryDate)}
                        </span>
                      )}
                    </div>
                    
                    {cert.credentialId && (
                      <p className="text-xs font-mono text-muted-foreground mb-3" data-testid={`text-certification-id-${cert.id}`}>
                        ID: {cert.credentialId}
                      </p>
                    )}
                    
                    {cert.credentialUrl && (
                      <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2" data-testid={`button-certification-verify-${cert.id}`}>
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Verify Credential
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
