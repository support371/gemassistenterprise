import { Button } from "@/components/ui/button";
import { Download, Target, BarChart3, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Target,
    title: "Threat realism modeling",
    description: "Aligned to enterprise and financial environments"
  },
  {
    icon: BarChart3,
    title: "Control effectiveness analysis",
    description: "Under operational stress"
  },
  {
    icon: FileText,
    title: "Explainable scoring",
    description: "And remediation prioritization"
  },
  {
    icon: Shield,
    title: "Executive-ready reporting",
    description: "And AI governance boundaries"
  }
];

export function SentinelXSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sentinel-X
            </h2>
            <p className="text-muted-foreground text-lg">
              GEM Cybersecurity Assist's proprietary cyber risk intelligence framework.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">What it delivers</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Download Card */}
            <div className="gem-card gem-border-glow p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Download Framework
              </h3>
              <p className="text-muted-foreground mb-6">
                Use as an internal methodology, proof artifact, or assessment foundation.
              </p>
              <Link to="/sentinel-x">
                <Button variant="hero" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download Sentinel-X PDF
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}