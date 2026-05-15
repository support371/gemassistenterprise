import { Shield, Lock, Eye, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreatShieldProps {
  className?: string;
}

export function ThreatShield({ className }: ThreatShieldProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
      
      {/* Animated rings */}
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Outermost ring */}
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full gem-glow" />
        </div>
        
        {/* Second ring */}
        <div className="absolute inset-4 rounded-full border border-primary/30 animate-[spin_15s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-primary/80 rounded-full" />
        </div>
        
        {/* Third ring */}
        <div className="absolute inset-8 rounded-full border border-primary/40 animate-[spin_12s_linear_infinite]">
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/60 rounded-full" />
        </div>
        
        {/* Inner ring */}
        <div className="absolute inset-12 rounded-full border-2 border-primary/50 animate-[spin_10s_linear_infinite_reverse]">
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full gem-glow" />
        </div>

        {/* Center shield */}
        <div className="absolute inset-16 md:inset-20 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative gem-card gem-border-glow p-8 rounded-2xl">
              <Shield className="w-16 h-16 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]" />
            </div>
          </div>
        </div>

        {/* Floating icons */}
        <div className="absolute top-1/4 left-0 animate-float" style={{ animationDelay: "0s" }}>
          <div className="gem-card p-3 rounded-xl gem-border-glow">
            <Lock className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <div className="absolute top-1/4 right-0 animate-float" style={{ animationDelay: "1s" }}>
          <div className="gem-card p-3 rounded-xl gem-border-glow">
            <Eye className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <div className="absolute bottom-1/4 left-0 animate-float" style={{ animationDelay: "2s" }}>
          <div className="gem-card p-3 rounded-xl gem-border-glow">
            <Zap className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
