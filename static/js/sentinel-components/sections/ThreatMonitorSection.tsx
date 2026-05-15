import { Activity, Shield, AlertTriangle } from "lucide-react";

export function ThreatMonitorSection() {
  return (
    <section id="threat" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gem-cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Enterprise Command Center
          </h2>
          <p className="text-muted-foreground text-lg">
            High-fidelity operational telemetry and live threat intelligence feed.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Live Attack Vectors */}
          <div className="gem-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Live Attack Vectors</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-success">System Active</span>
              </div>
            </div>
            
            {/* Visualization placeholder */}
            <div className="aspect-video bg-background/50 rounded-lg border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 gem-hex-pattern opacity-30" />
              <div className="text-center relative z-10">
                <Activity className="w-12 h-12 text-primary/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Neural Network Analysis in Progress...</p>
              </div>
              
              {/* Animated scan line */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan_3s_linear_infinite]" />
              </div>
            </div>
          </div>
          
          {/* Incident Feed */}
          <div className="gem-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Incident Feed</h3>
              <Shield className="w-5 h-5 text-primary" />
            </div>
            
            <div className="space-y-4">
              {/* Sample incidents */}
              {[
                { severity: "low", message: "Routine scan completed", time: "2m ago", type: "info" },
                { severity: "medium", message: "Unusual login pattern detected", time: "15m ago", type: "warning" },
                { severity: "low", message: "Firewall rules updated", time: "1h ago", type: "success" },
                { severity: "high", message: "Brute force attempt blocked", time: "2h ago", type: "blocked" },
              ].map((incident, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border/50"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    incident.type === "blocked" ? "bg-destructive" :
                    incident.type === "warning" ? "bg-warning" :
                    incident.type === "success" ? "bg-success" : "bg-primary"
                  }`} />
                  <span className="flex-1 text-sm text-muted-foreground">{incident.message}</span>
                  <span className="text-xs text-muted-foreground/60 font-mono">{incident.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}