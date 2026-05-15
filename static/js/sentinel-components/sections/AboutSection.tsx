import { Shield, FileText, Brain } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Governance-first",
    description: "Accountability, auditability, and change control built into the operating model."
  },
  {
    icon: FileText,
    title: "Explainable outputs",
    description: "Every risk rank and recommendation has traceable logic and rationale."
  },
  {
    icon: Brain,
    title: "Responsible AI boundaries",
    description: "AI augments analysis; final decisions remain human-owned and reviewable."
  }
];

export function AboutSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About GEM Cybersecurity Assist
          </h2>
          <p className="text-muted-foreground text-lg">
            We deliver enterprise-grade cybersecurity outcomes across industries including finance,
            real estate operations, marketing technology stacks, and business-critical platforms.
          </p>
          <p className="text-muted-foreground mt-4">
            Our work emphasizes defensible decisions, operational accountability, and governance-first execution.
          </p>
        </div>
        
        {/* Principles Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {principles.map((principle, index) => (
            <div key={index} className="gem-card p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <principle.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{principle.title}</h3>
              <p className="text-sm text-muted-foreground">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}