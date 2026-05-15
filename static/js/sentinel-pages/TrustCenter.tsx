import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ComplianceBadge } from "@/components/cyber/ComplianceBadge";
import { 
  Shield, FileCheck, Lock, Eye, Users, Server,
  ArrowRight, CheckCircle, Download, ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const certifications = [
  {
    name: "SOC 2 Type II",
    status: "certified" as const,
    description: "Annual audit of security, availability, and confidentiality controls.",
    validUntil: "December 2025"
  },
  {
    name: "ISO 27001",
    status: "certified" as const,
    description: "International standard for information security management systems.",
    validUntil: "March 2026"
  },
  {
    name: "GDPR Compliant",
    status: "compliant" as const,
    description: "Full compliance with EU General Data Protection Regulation.",
    validUntil: "Ongoing"
  },
  {
    name: "HIPAA",
    status: "compliant" as const,
    description: "Healthcare data protection standards compliance.",
    validUntil: "Ongoing"
  },
  {
    name: "PCI DSS",
    status: "certified" as const,
    description: "Payment card industry data security standards.",
    validUntil: "June 2025"
  },
  {
    name: "CSA STAR",
    status: "certified" as const,
    description: "Cloud Security Alliance security trust assurance registry.",
    validUntil: "September 2025"
  }
];

const securityPractices = [
  {
    icon: Lock,
    title: "Encryption at Rest & Transit",
    description: "All data encrypted using AES-256 at rest and TLS 1.3 in transit."
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description: "Granular permissions with least-privilege principle enforcement."
  },
  {
    icon: Eye,
    title: "Continuous Monitoring",
    description: "24/7 security monitoring with automated threat detection."
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Multi-region deployment with redundancy and disaster recovery."
  },
  {
    icon: FileCheck,
    title: "Regular Audits",
    description: "Annual third-party penetration testing and security audits."
  },
  {
    icon: Shield,
    title: "Incident Response",
    description: "Documented incident response procedures with SLA guarantees."
  }
];

export default function TrustCenter() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative">
          <div className="absolute inset-0 gem-cyber-grid opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-medium mb-4">Trust Center</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Security & Compliance
                <span className="block text-gradient-primary">You Can Trust</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Transparency is at the core of our security commitment. Explore our 
                certifications, policies, and security practices.
              </p>
              
              {/* Status Banner */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-success/10 border border-success/20">
                <span className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-success font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Certifications */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Certifications & Compliance
              </h2>
              <p className="text-muted-foreground text-lg">
                We maintain industry-leading certifications to ensure the highest 
                standards of security and compliance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="gem-card gem-border-glow p-6 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <ComplianceBadge name={cert.name} status={cert.status} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cert.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Valid until</span>
                    <span className="text-foreground font-medium">{cert.validUntil}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Security Practices */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Security Practices
              </h2>
              <p className="text-muted-foreground text-lg">
                Our comprehensive security program protects your data and assets 
                through multiple layers of defense.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityPractices.map((practice, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                    <practice.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {practice.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {practice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Documentation */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Security Documentation
                </h2>
                <p className="text-muted-foreground">
                  Access our security policies and compliance documentation.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Security Policy", icon: Shield },
                  { name: "Privacy Policy", icon: Lock },
                  { name: "Incident Response Plan", icon: FileCheck },
                  { name: "Data Processing Agreement", icon: FileCheck },
                ].map((doc, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 bg-card transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <doc.icon className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">{doc.name}</span>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="gem-card gem-border-glow p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
              <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Questions About Our Security?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our security team is available to discuss our practices, answer 
                compliance questionnaires, or provide additional documentation.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Contact Security Team
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
