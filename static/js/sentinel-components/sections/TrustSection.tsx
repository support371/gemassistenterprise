import { ComplianceBadge } from "@/components/cyber/ComplianceBadge";
import { StatCard } from "@/components/cyber/StatCard";
import { Shield, Users, Clock, AlertTriangle } from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "500+",
    label: "Enterprises Protected",
    trend: { value: "12%", isPositive: true }
  },
  {
    icon: AlertTriangle,
    value: "50K+",
    label: "Threats Blocked Daily",
    trend: { value: "8%", isPositive: true }
  },
  {
    icon: Clock,
    value: "<15min",
    label: "Average Response Time",
    trend: { value: "23%", isPositive: true }
  },
  {
    icon: Users,
    value: "24/7",
    label: "Expert SOC Coverage",
  }
];

const certifications = [
  { name: "SOC 2 Type II", status: "certified" as const },
  { name: "ISO 27001", status: "certified" as const },
  { name: "GDPR Compliant", status: "compliant" as const },
  { name: "HIPAA", status: "compliant" as const },
  { name: "PCI DSS", status: "certified" as const },
];

export function TrustSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-medium mb-4">Trust & Compliance</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Enterprise-Grade Security You Can Trust
          </h2>
          <p className="text-muted-foreground text-lg">
            We maintain the highest security standards and certifications to protect 
            your organization's most critical assets.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              trend={stat.trend}
            />
          ))}
        </div>
        
        {/* Certifications */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">Certifications & Compliance</p>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <ComplianceBadge
                key={index}
                name={cert.name}
                status={cert.status}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}