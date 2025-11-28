import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Calendar } from "lucide-react";
import type { Certification } from "@shared/schema";

const certificationsData: Certification[] = [
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-certifications-title">
            Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized certifications demonstrating expertise in cloud architecture, DevOps, and database technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificationsData.map((cert, index) => (
            <Card
              key={cert.id}
              className="p-6 hover-elevate"
              data-testid={`card-certification-${cert.id}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg leading-tight">{cert.name}</h3>
                    {cert.expiryDate && new Date(cert.expiryDate) > new Date() && (
                      <Badge variant="secondary" className="flex-shrink-0 text-xs">Active</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{cert.issuer}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
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
                    <p className="text-xs font-mono text-muted-foreground mb-3">
                      ID: {cert.credentialId}
                    </p>
                  )}
                  
                  {cert.credentialUrl && (
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
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
      </div>
    </section>
  );
}
