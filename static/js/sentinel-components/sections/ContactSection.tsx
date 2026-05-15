import { Button } from "@/components/ui/button";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const contacts = [
  {
    title: "General",
    email: "Assist@gemcybersecurityassist.com"
  },
  {
    title: "Administration",
    email: "Admin@gemcybersecurityassist.com"
  },
  {
    title: "Analysis",
    email: "Analyzer@gemcybersecurityassist.com"
  },
  {
    title: "Compliance",
    email: "Compliance@gemcybersecurityassist.com"
  }
];

export function ContactSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact
          </h2>
          <p className="text-muted-foreground text-lg">
            Route inquiries to the right team immediately using role-based contacts.
          </p>
        </div>
        
        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {contacts.map((contact, index) => (
            <div key={index} className="gem-card p-5 rounded-xl">
              <h4 className="text-sm font-semibold text-foreground mb-2">{contact.title}</h4>
              <a 
                href={`mailto:${contact.email}`}
                className="text-sm text-primary hover:underline break-all"
              >
                {contact.email}
              </a>
            </div>
          ))}
        </div>
        
        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="tel:+14017022460">
            <Button variant="hero-outline" size="lg" className="gap-2">
              <Phone className="w-4 h-4" />
              +1 (401) 702-2460
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="hero" size="lg" className="gap-2">
              Request Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}