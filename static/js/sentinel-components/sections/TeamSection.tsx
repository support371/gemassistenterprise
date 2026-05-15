import { Search, Shield, Wrench } from "lucide-react";

const teamRoles = [
  {
    icon: Search,
    title: "Security Analysts",
    description: "Risk analysis, assessment execution, and operational monitoring."
  },
  {
    icon: Shield,
    title: "Compliance Specialists",
    description: "Governance, controls, and regulatory alignment advisory."
  },
  {
    icon: Wrench,
    title: "Security Engineers",
    description: "Implementation support, architecture validation, and control hardening."
  }
];

export function TeamSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Team
          </h2>
          <p className="text-muted-foreground text-lg">
            The cybersecurity operating team dedicated to your protection.
          </p>
        </div>
        
        {/* Team Roles Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamRoles.map((role, index) => (
            <div key={index} className="gem-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <role.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}