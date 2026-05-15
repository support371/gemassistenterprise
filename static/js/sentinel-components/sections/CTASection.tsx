import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gem-gradient-bg" />
      <div className="absolute inset-0 gem-hex-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="gem-card gem-border-glow p-8 md:p-12 rounded-2xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Secure Your Enterprise?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Get a comprehensive security assessment and discover how GEM Cybersecurity Assist 
              can protect your organization with Sentinel-X™ technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Schedule Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+14017022460">
                <Button variant="hero-outline" size="xl">
                  <Phone className="w-5 h-5" />
                  Contact Security Team
                </Button>
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Free security consultation • No commitment required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}