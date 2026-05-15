import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Building, Shield, Wifi, Lock, Camera, Server,
  ArrowRight, CheckCircle, AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

const threats = [
  "Building management system breaches",
  "Smart lock and access control vulnerabilities",
  "HVAC system hijacking",
  "Tenant data exposure",
  "IoT device botnets",
  "Ransomware targeting property systems"
];

const services = [
  {
    icon: Building,
    title: "Building System Security",
    description: "Comprehensive security assessment and monitoring for building management systems, HVAC controls, and elevator systems.",
    features: [
      "BMS vulnerability assessment",
      "Network segmentation design",
      "Secure remote access",
      "Continuous monitoring"
    ]
  },
  {
    icon: Lock,
    title: "Access Control Audit",
    description: "Security review of physical access systems including smart locks, key cards, and visitor management systems.",
    features: [
      "Access system penetration testing",
      "Credential management review",
      "Integration security assessment",
      "Policy recommendations"
    ]
  },
  {
    icon: Wifi,
    title: "IoT Device Protection",
    description: "Secure deployment and monitoring of smart building devices, sensors, and connected equipment.",
    features: [
      "Device inventory and risk assessment",
      "Network isolation strategies",
      "Firmware update management",
      "Anomaly detection"
    ]
  },
  {
    icon: Camera,
    title: "Surveillance Security",
    description: "Protection for IP camera systems, video management, and surveillance infrastructure.",
    features: [
      "Camera system hardening",
      "Video data protection",
      "Access logging and audit",
      "Encryption implementation"
    ]
  }
];

export default function RealEstate() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 gem-cyber-grid opacity-30" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6">
                <Building className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">Real Estate Protection</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Cyber Protection for
                <span className="block text-gradient-primary">Smart Buildings</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Specialized security services for property management systems, 
                smart building infrastructure, and tenant data protection.
              </p>
              
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Request Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Threat Landscape */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-medium mb-4">The Challenge</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Modern Buildings Face Modern Threats
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  As buildings become smarter, they become more connected—and more 
                  vulnerable. Property operators face a unique set of cyber risks 
                  that require specialized expertise.
                </p>
                
                <ul className="space-y-3">
                  {threats.map((threat, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="gem-card gem-border-glow p-8 rounded-2xl">
                <div className="text-center mb-6">
                  <p className="text-xs text-muted-foreground font-mono mb-2">INDUSTRY STATISTICS</p>
                  <h3 className="text-xl font-semibold text-foreground">Smart Building Risks</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-background/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Buildings with IoT vulnerabilities</span>
                      <span className="text-xl font-bold font-mono text-destructive">84%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[84%] bg-destructive/50 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-background/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Avg. time to detect breach</span>
                      <span className="text-xl font-bold font-mono text-warning">197 days</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-background/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">BMS attacks increased (YoY)</span>
                      <span className="text-xl font-bold font-mono text-destructive">+67%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Specialized Protection Services
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive security solutions designed specifically for the 
                unique challenges of modern real estate.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="gem-card gem-border-glow p-6 rounded-xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="gem-card gem-border-glow p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
              <Building className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Secure Your Properties
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get a comprehensive security assessment of your building systems 
                and smart infrastructure from our specialized team.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Schedule Property Assessment
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
