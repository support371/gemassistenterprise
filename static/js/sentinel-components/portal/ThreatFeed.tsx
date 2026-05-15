import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Shield, Activity, Clock, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Threat {
  id: string;
  name: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'blocked' | 'investigating' | 'resolved';
  source_ip: string | null;
  target_system: string | null;
  detected_at: string;
}

const severityConfig = {
  critical: { color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', icon: AlertTriangle },
  high: { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: AlertTriangle },
  medium: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', icon: Activity },
  low: { color: 'text-muted-foreground', bg: 'bg-muted/10', border: 'border-muted/30', icon: Shield },
};

const statusConfig = {
  active: { color: 'text-destructive', label: 'Active', animate: true },
  blocked: { color: 'text-success', label: 'Blocked', animate: false },
  investigating: { color: 'text-warning', label: 'Investigating', animate: true },
  resolved: { color: 'text-muted-foreground', label: 'Resolved', animate: false },
};

export const ThreatFeed = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const fetchThreats = async () => {
      const { data } = await supabase
        .from('threats')
        .select('*')
        .order('detected_at', { ascending: false })
        .limit(10);
      
      if (data) {
        setThreats(data as Threat[]);
      }
    };

    fetchThreats();

    // Real-time subscription
    const channel = supabase
      .channel('threats-feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'threats' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setThreats(prev => [payload.new as Threat, ...prev].slice(0, 10));
          } else if (payload.eventType === 'UPDATE') {
            setThreats(prev => prev.map(t => t.id === payload.new.id ? payload.new as Threat : t));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="gem-card border border-border h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center justify-center">
            <Activity className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Threat Feed</h3>
            <p className="text-xs text-muted-foreground">Real-time security events</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isLive ? "bg-success animate-pulse" : "bg-muted"
          )} />
          <span className="text-xs text-muted-foreground">
            {isLive ? 'Live' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Threat List */}
      <div className="max-h-[400px] overflow-y-auto">
        {threats.length === 0 ? (
          <div className="p-8 text-center">
            <Shield className="w-12 h-12 text-success mx-auto mb-3" />
            <p className="text-muted-foreground">No active threats detected</p>
            <p className="text-xs text-muted-foreground mt-1">System is secure</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {threats.map((threat) => {
              const config = severityConfig[threat.severity];
              const status = statusConfig[threat.status];
              const Icon = config.icon;
              
              return (
                <div 
                  key={threat.id}
                  className="px-5 py-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-9 h-9 rounded-lg border flex items-center justify-center shrink-0",
                      config.bg, config.border
                    )}>
                      <Icon className={cn("w-4 h-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">
                          {threat.name}
                        </span>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium uppercase",
                          config.bg, config.color
                        )}>
                          {threat.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Wifi className="w-3 h-3" />
                          {threat.source_ip || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(threat.detected_at), 'HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {status.animate && (
                        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                          status.color === 'text-destructive' ? 'bg-destructive' : 'bg-warning'
                        )} />
                      )}
                      <span className={cn("text-xs font-medium", status.color)}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
