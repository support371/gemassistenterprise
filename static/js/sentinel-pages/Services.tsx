import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Eye, AlertTriangle, FileCheck, Shield, Zap, 
  CheckCircle, ArrowRight, Clock, Users, BarChart3 
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: "monitoring",
    icon: Eye,
    title: "Threat Monitoring",
    tagline: "24/7 Eyes on Your Digital Assets",
    description: "Continuous surveillance of your entire digital infrastructure with real-time threat detection, behavioral analytics, and instant alerting.",
    features: [
      "Real-time threat detection and alerting",
      "Network traffic analysis and anomaly detection",
      "Endpoint monitoring and protection",
      "User behavior analytics (UEBA)",
      "Cloud security posture management",
      "Dark web monitoring and intelligence"
    ],
    metrics: [
      { value: "50K+", label: "Threats Blocked Daily" },
      { value: "<5min", label: "Detection Time" },
      { value: "99.9%", label: "Accuracy Rate" }
    ]
  },
  {
    id: "response",
    icon: AlertTriangle,
    title: "Incident Response",
    tagline: "Rapid Containment & Recovery",
    description: "Expert security analysts ready to respond 24/7 with proven protocols for threat containment, forensic analysis, and rapid recovery.",
    features: [
      "15-minute response time SLA",
      "Threat containment and isolation",
      "Digital forensics and root cause analysis",
      "Malware analysis and reverse engineering",
      "Recovery planning and execution",
      "Post-incident reporting and recommendations"
    ],
    metrics: [
      { value: "<15min", label: "Response Time" },
      { value: "100%", label: "Incidents Resolved" },
      { value: "24/7", label: "Expert Coverage" }
    ]
  },
  {
    id: "compliance",
    icon: FileCheck,
    title: "Compliance Management",
    tagline: "Audit-Ready Security Posture",
    description: "Achieve and maintain compliance with industry standards through continuous control monitoring, evidence collection, and expert guidance.",
    features: [
      "SOC 2 Type I & II readiness",
      "ISO 27001 certification support",
      "GDPR and CCPA compliance",
      "HIPAA security requirements",
      "PCI DSS assessment preparation",
      "Automated evidence collection"
    ],
    metrics: [
      { value: "100%", label: "Audit Pass Rate" },
      { value: "50+", label: "Controls Monitored" },
      { value: "4hrs", label: "Report Generation" }
    ]
  },
  {
    id: "assets",
    icon: Zap,
    title: "Digital Asset Protection",
    tagline: "Comprehensive Identity Security",
    description: "Protect your organization's digital identities, accounts, and intellectual property with advanced monitoring and threat intelligence.",
    features: [
      "Executive identity protection",
      "Domain and brand monitoring",
      "Credential exposure detection",
      "Intellectual property protection",
      "Social media threat monitoring",
      "Third-party risk assessment"
    ],
    metrics: [
      { value: "1M+", label: "Identities Protected" },
      { value: "Real-time", label: "Exposure Alerts" },
      { value: "360°", label: "Visibility" }
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative">
          <div className="absolute inset-0 gem-cyber-grid opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-medium mb-4">Our Services</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Enterprise Cybersecurity
                <span className="block text-gradient-primary">Operations</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive security services designed for modern enterprises. 
                From threat detection to compliance, we've got you covered.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services */}
        {services.map((service, index) => (
          <section 
            key={service.id} 
            id={service.id}
            className={`py-24 ${index % 2 === 1 ? 'bg-secondary/20' : ''}`}
          >
            <div className="container mx-auto px-4">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
                    <service.icon className="w-4 h-4" />
                    {service.tagline}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/contact">
                    <Button variant="hero">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="gem-card gem-border-glow p-8 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-primary/10">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">Key Metrics</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {service.metrics.map((metric, i) => (
                        <div key={i} className="text-center p-4 rounded-lg bg-background/50">
                          <p className="text-2xl font-bold font-mono text-primary">{metric.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
        
        {/* CTA */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="gem-card gem-border-glow p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
              <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Strengthen Your Security?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule a consultation with our security experts to discuss your 
                organization's specific needs and challenges.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Schedule Consultation
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
