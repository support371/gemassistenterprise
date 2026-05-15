import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Brain, Shield, BarChart3, Layers, Eye, Zap,
  ArrowRight, CheckCircle, Network, Lock, Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: Brain,
    title: "AI-Powered Threat Detection",
    description: "Advanced machine learning algorithms continuously analyze patterns across your environment to identify sophisticated threats that traditional tools miss."
  },
  {
    icon: BarChart3,
    title: "Risk Scoring Engine",
    description: "Real-time risk assessment with dynamic scoring that considers threat severity, asset criticality, and environmental context."
  },
  {
    icon: Network,
    title: "Threat Correlation",
    description: "Automatically correlate events across multiple data sources to identify complex attack patterns and reduce false positives."
  },
  {
    icon: Eye,
    title: "Behavioral Analytics",
    description: "Establish baseline behaviors for users and systems, detecting anomalies that indicate potential compromise or insider threats."
  },
  {
    icon: Layers,
    title: "Multi-Layer Defense",
    description: "Coordinated protection across network, endpoint, identity, and application layers with unified visibility and response."
  },
  {
    icon: Lock,
    title: "Zero Trust Integration",
    description: "Built-in zero trust principles with continuous verification, least-privilege access, and micro-segmentation support."
  }
];

const architecture = [
  { phase: "Collect", description: "Ingest logs, telemetry, and threat intel from all sources" },
  { phase: "Normalize", description: "Standardize data formats for unified analysis" },
  { phase: "Correlate", description: "AI-powered pattern matching across all data" },
  { phase: "Score", description: "Dynamic risk assessment and prioritization" },
  { phase: "Alert", description: "Intelligent alerting with context enrichment" },
  { phase: "Respond", description: "Automated and manual response orchestration" }
];

export default function SentinelX() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 gem-cyber-grid opacity-30" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">GEM Proprietary Technology</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Sentinel-X™
                <span className="block text-gradient-primary">Cyber Defense Framework</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our proprietary cybersecurity platform combines advanced AI threat detection 
                with expert human analysis for unparalleled protection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="xl">
                    Request Demo
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="xl">
                  Download Whitepaper
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Architecture */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-primary font-medium mb-4">How It Works</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Intelligent Security Operations
              </h2>
              <p className="text-muted-foreground text-lg">
                Sentinel-X processes and analyzes security data through a sophisticated 
                pipeline designed for speed, accuracy, and actionability.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-6 gap-4">
                {architecture.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="gem-card gem-border-glow p-4 rounded-xl text-center h-full">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-3">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{step.phase}</h3>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    {index < architecture.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Capabilities */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-primary font-medium mb-4">Core Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Advanced Threat Defense
              </h2>
              <p className="text-muted-foreground text-lg">
                Built from the ground up to address modern cyber threats with 
                cutting-edge technology and proven methodologies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((capability, index) => (
                <div 
                  key={index}
                  className="gem-card gem-border-glow p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                    <capability.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-medium mb-4">Executive Visibility</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Real-Time Security Intelligence
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Sentinel-X provides executive dashboards with actionable insights, 
                  trend analysis, and risk metrics that matter to leadership.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Live threat landscape visualization",
                    "Risk trending and forecasting",
                    "Compliance posture at a glance",
                    "ROI and security investment metrics",
                    "Board-ready reporting"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="gem-card gem-border-glow p-6 rounded-2xl">
                {/* Mock Dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">SENTINEL-X</p>
                      <p className="font-semibold text-foreground">Executive Dashboard</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-success" />
                      <span className="text-xs text-success">Live</span>
                    </div>
                  </div>
                  
                  {/* Security Score */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-background/50 text-center">
                      <p className="text-3xl font-bold font-mono text-success">94</p>
                      <p className="text-xs text-muted-foreground">Security Score</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 text-center">
                      <p className="text-3xl font-bold font-mono text-primary">12</p>
                      <p className="text-xs text-muted-foreground">Active Alerts</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 text-center">
                      <p className="text-3xl font-bold font-mono text-foreground">98%</p>
                      <p className="text-xs text-muted-foreground">Compliance</p>
                    </div>
                  </div>
                  
                  {/* Mini Chart Placeholder */}
                  <div className="p-4 rounded-lg bg-background/50">
                    <p className="text-xs text-muted-foreground mb-3">Threat Activity (7 days)</p>
                    <div className="flex items-end gap-1 h-20">
                      {[40, 65, 45, 80, 55, 70, 45].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-primary/30 rounded-t hover:bg-primary/50 transition-colors"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="gem-card gem-border-glow p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
              <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Experience Sentinel-X™
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                See how our proprietary framework can transform your security operations 
                with a personalized demonstration.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Schedule Demo
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
