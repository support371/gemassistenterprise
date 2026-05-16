import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, Phone, MapPin, Clock, Shield, ArrowRight,
  Building, User, Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Received",
      description: "Our security team will contact you within 24 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative">
          <div className="absolute inset-0 gem-cyber-grid opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-medium mb-4">Contact Us</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Get in Touch with
                <span className="block text-gradient-primary">Our Security Team</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Ready to discuss your security needs? Our experts are here to help 
                you build a stronger cyber defense.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Let's Secure Your Future
                  </h2>
                  <p className="text-muted-foreground">
                    Whether you need a security assessment, want to learn about Sentinel-X™, 
                    or have questions about our services, we're here to help.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">security@gemcyber.trust</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+1 (888) GEM-SAFE</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Response Time</h3>
                      <p className="text-muted-foreground">Within 24 hours for inquiries</p>
                      <p className="text-muted-foreground">Immediate for security incidents</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Global Operations</h3>
                      <p className="text-muted-foreground">Security operations centers worldwide</p>
                    </div>
                  </div>
                </div>
                
                {/* Emergency */}
                <div className="gem-card gem-border-glow p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-destructive" />
                    <h3 className="font-semibold text-foreground">Security Emergency?</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're experiencing an active security incident, contact our 
                    24/7 emergency response line immediately.
                  </p>
                  <Button variant="destructive" size="sm">
                    Emergency Hotline
                  </Button>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="gem-card gem-border-glow p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Send Us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@company.com" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="company" 
                        placeholder="Company Name" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interest">Area of Interest</Label>
                    <select 
                      id="interest"
                      className="w-full h-10 px-3 rounded-md bg-background border border-input text-foreground"
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="assessment">Security Assessment</option>
                      <option value="monitoring">Threat Monitoring</option>
                      <option value="response">Incident Response</option>
                      <option value="compliance">Compliance</option>
                      <option value="sentinel-x">Sentinel-X Demo</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your security needs..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
