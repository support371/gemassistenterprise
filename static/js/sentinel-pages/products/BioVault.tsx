import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Fingerprint, Lock, Eye, Server, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Multi-factor biometric verification including fingerprint, facial recognition, and retinal scanning for maximum security."
  },
  {
    icon: Lock,
    title: "Zero-Knowledge Encryption",
    description: "Your data is encrypted with military-grade algorithms. Even our systems cannot access your protected information."
  },
  {
    icon: Server,
    title: "Distributed Storage",
    description: "Data is fragmented and stored across multiple secure nodes, eliminating single points of failure."
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description: "24/7 surveillance of access attempts with instant alerts for suspicious activity."
  }
];

const benefits = [
  "GDPR & HIPAA compliant data storage",
  "99.999% uptime guarantee",
  "Automatic backup and disaster recovery",
  "Audit trails for all data access",
  "Role-based access control",
  "API integration support"
];

export default function BioVault() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary mb-6">
                <Fingerprint className="h-4 w-4" />
                <span className="text-sm font-medium">Enterprise Data Protection</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                GEM <span className="text-primary">Bio-Vault</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Next-generation biometric data vault combining advanced authentication with 
                zero-knowledge encryption for ultimate data sovereignty.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="gap-2">
                    <Shield className="h-5 w-5" />
                    Request Demo
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Bio-Vault leverages cutting-edge biometric technology and encryption 
                to protect your most sensitive data assets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Enterprise-Ready Security</h2>
                  <p className="text-muted-foreground mb-8">
                    Bio-Vault is designed for organizations that demand the highest level of 
                    data protection without compromising on accessibility or performance.
                  </p>
                  
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/30">
                  <div className="text-center">
                    <Fingerprint className="h-24 w-24 text-primary mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Secure by Design</h3>
                    <p className="text-muted-foreground">
                      Built from the ground up with security-first architecture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Data?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact our team to schedule a personalized demo and learn how Bio-Vault 
              can transform your data security posture.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
