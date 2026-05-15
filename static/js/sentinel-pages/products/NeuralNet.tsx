import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Brain, Zap, Target, Network, Activity, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Deep learning algorithms that evolve with emerging threats, identifying attack patterns before they execute."
  },
  {
    icon: Activity,
    title: "Behavioral Analysis",
    description: "Continuous monitoring of network behavior to detect anomalies and potential insider threats in real-time."
  },
  {
    icon: Target,
    title: "Predictive Threat Intelligence",
    description: "Machine learning models that predict attack vectors and vulnerabilities before exploitation."
  },
  {
    icon: Network,
    title: "Neural Network Architecture",
    description: "Distributed processing across secure nodes for lightning-fast threat correlation and response."
  }
];

const stats = [
  { value: "99.7%", label: "Threat Detection Rate" },
  { value: "<100ms", label: "Response Time" },
  { value: "10M+", label: "Threats Analyzed Daily" },
  { value: "24/7", label: "Active Monitoring" }
];

const capabilities = [
  "Zero-day threat detection",
  "Automated threat hunting",
  "Advanced persistent threat (APT) detection",
  "Malware behavior analysis",
  "Phishing detection and prevention",
  "Integration with existing SIEM platforms"
];

export default function NeuralNet() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent mb-6">
                <Brain className="h-4 w-4" />
                <span className="text-sm font-medium">AI-Powered Security</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                GEM <span className="text-accent">Neural-Net</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Artificial intelligence meets cybersecurity. Our neural network platform 
                learns, adapts, and defends against the most sophisticated cyber threats.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="gap-2">
                    <Zap className="h-5 w-5" />
                    See It In Action
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    Technical Specs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Intelligent Defense Systems</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Neural-Net combines multiple AI disciplines to create a comprehensive 
                threat detection and response platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl p-8 border border-accent/30">
                  <div className="text-center">
                    <Brain className="h-24 w-24 text-accent mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Self-Learning AI</h3>
                    <p className="text-muted-foreground">
                      Continuously evolving to counter new threats
                    </p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-6">Advanced Capabilities</h2>
                  <p className="text-muted-foreground mb-8">
                    Neural-Net provides comprehensive threat intelligence that adapts 
                    to your organization's unique security landscape.
                  </p>
                  
                  <ul className="space-y-4">
                    {capabilities.map((capability, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience the Power of AI Security</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Schedule a demo to see how Neural-Net can revolutionize your 
              organization's threat detection capabilities.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Request a Demo
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
