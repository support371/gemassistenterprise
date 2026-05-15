import { cn } from "@/lib/utils";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, features, href, className }: ServiceCardProps) {
  return (
    <Link 
      to={href}
      className={cn(
        "gem-card gem-border-glow p-6 rounded-xl group block hover:scale-[1.02] transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
      
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        {description}
      </p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
      
      <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
