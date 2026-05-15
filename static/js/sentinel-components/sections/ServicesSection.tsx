import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Shield, Package, Users } from "lucide-react";

const tabContent = {
  flagship: {
    icon: Shield,
    title: "Sentinel-X Framework",
    description: "Our proprietary cyber risk intelligence framework providing threat realism modeling, control effectiveness analysis, and executive-ready reporting.",
    features: [
      "Threat realism modeling aligned to enterprise and financial environments",
      "Control effectiveness analysis under operational stress",
      "Explainable scoring and remediation prioritization",
      "Executive-ready reporting and AI governance boundaries"
    ]
  },
  products: {
    icon: Package,
    title: "GEM Security Products",
    description: "Enterprise-grade security solutions engineered for complex risk environments.",
    features: [
      "Continuous threat monitoring platform",
      "Incident response automation",
      "Compliance management suite",
      "Real estate protection module"
    ]
  },
  advisory: {
    icon: Users,
    title: "Advisory Services",
    description: "Expert guidance and strategic consulting for your security initiatives.",
    features: [
      "Security architecture review",
      "Penetration testing services",
      "Compliance audit preparation",
      "Security awareness training"
    ]
  }
};

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState("flagship");

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Enterprise Security Architecture
          </h2>
          <p className="text-muted-foreground text-lg">
            Advanced cybersecurity solutions engineered for complex risk environments. 
            Select a capability to explore technical details.
          </p>
        </div>
        
        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 border border-border h-auto p-1">
            <TabsTrigger 
              value="flagship" 
              className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Flagship
            </TabsTrigger>
            <TabsTrigger 
              value="products"
              className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="advisory"
              className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Advisory Services
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(tabContent).map(([key, content]) => (
            <TabsContent key={key} value={key} className="mt-8">
              <div className="gem-card p-8 rounded-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <content.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{content.title}</h3>
                    <p className="text-muted-foreground">{content.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {content.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}