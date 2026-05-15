import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Atom, Lock, Key, ShieldCheck, Cpu, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Atom,
    title: "Quantum-Resistant Encryption",
    description: "Post-quantum cryptographic algorithms designed to withstand attacks from quantum computers."
  },
  {
    icon: Key,
    title: "Quantum Key Distribution",
    description: "Unhackable key exchange using quantum mechanical properties for perfect forward secrecy."
  },
  {
    icon: Cpu,
    title: "Hybrid Cryptography",
    description: "Seamless integration of classical and quantum-safe algorithms for comprehensive protection."
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Quantum-secured network spanning multiple continents for worldwide enterprise deployment."
  }
];

const timeline = [
  {
    year: "Now",
    title: "Harvest Now, Decrypt Later",
    description: "Adversaries are collecting encrypted data today to decrypt with future quantum computers."
  },
  {
    year: "2025-2030",
    title: "Quantum Advantage",
    description: "Experts predict cryptographically relevant quantum computers within this timeframe."
  },
  {
    year: "Future-Proof",
    title: "Quantum-Guard Protection",
    description: "Your data remains secure regardless of quantum computing advancements."
  }
];

const protections = [
  "NIST-approved post-quantum algorithms",
  "Lattice-based cryptography",
  "Hash-based signatures",
  "Code-based encryption",
  "Multivariate cryptographic schemes",
  "Backward compatibility with existing systems"
];

export default function QuantumGuard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 mb-6">
                <Atom className="h-4 w-4" />
                <span className="text-sm font-medium">Quantum-Safe Security</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                GEM <span className="text-purple-400">Quantum-Guard</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Future-proof your data against the quantum threat. Our post-quantum 
                cryptographic solutions protect your assets today and tomorrow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    Quantum-Proof Your Data
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quantum Threat Timeline */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Quantum Threat Timeline</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Understanding why quantum-safe security matters now, not later.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {timeline.map((item, index) => (
                  <div 
                    key={index}
                    className="relative bg-card border border-border rounded-xl p-6 text-center"
                  >
                    <div className="text-2xl font-bold text-purple-400 mb-2">{item.year}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    {index < timeline.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-purple-500/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quantum-Safe Architecture</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built on NIST-approved post-quantum cryptographic standards for 
                maximum security assurance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Protections Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Comprehensive Protection</h2>
                  <p className="text-muted-foreground mb-8">
                    Quantum-Guard implements a defense-in-depth approach using multiple 
                    post-quantum cryptographic schemes for resilient security.
                  </p>
                  
                  <ul className="space-y-4">
                    {protections.map((protection, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                        <span className="text-foreground">{protection}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl p-8 border border-purple-500/30">
                  <div className="text-center">
                    <Atom className="h-24 w-24 text-purple-400 mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Quantum Ready</h3>
                    <p className="text-muted-foreground">
                      Protected against current and future quantum threats
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-500/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prepare for the Quantum Future</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Don't wait for quantum computers to threaten your data. 
              Start your quantum-safe transition today.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
