import { AlertTriangle, Clock, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Incident {
  id: string;
  title: string;
  description: string | null;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'mitigating' | 'resolved' | 'closed';
  type: string;
  affected_systems: string[] | null;
  created_at: string;
}

interface IncidentCardProps {
  incident: Incident;
  onClick?: () => void;
}

const severityConfig = {
  critical: { color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/50' },
  high: { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/50' },
  medium: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/50' },
  low: { color: 'text-muted-foreground', bg: 'bg-muted/10', border: 'border-muted/50' },
};

const statusConfig = {
  open: { color: 'text-destructive', bg: 'bg-destructive/10' },
  investigating: { color: 'text-warning', bg: 'bg-warning/10' },
  mitigating: { color: 'text-blue-400', bg: 'bg-blue-400/10' },
  resolved: { color: 'text-success', bg: 'bg-success/10' },
  closed: { color: 'text-muted-foreground', bg: 'bg-muted/10' },
};

export const IncidentCard = ({ incident, onClick }: IncidentCardProps) => {
  const severity = severityConfig[incident.severity];
  const status = statusConfig[incident.status];

  return (
    <div 
      onClick={onClick}
      className={cn(
        "gem-card p-5 border cursor-pointer transition-all hover:border-primary/50 group",
        severity.border
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-10 h-10 rounded-lg border flex items-center justify-center shrink-0",
            severity.bg, severity.border
          )}>
            <AlertTriangle className={cn("w-5 h-5", severity.color)} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {incident.title}
              </h4>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium uppercase",
                severity.bg, severity.color
              )}>
                {incident.severity}
              </span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium capitalize",
                status.bg, status.color
              )}>
                {incident.status}
              </span>
            </div>
            {incident.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {incident.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {formatDistanceToNow(new Date(incident.created_at), { addSuffix: true })}
              </span>
              <span className="capitalize">{incident.type}</span>
              {incident.affected_systems && incident.affected_systems.length > 0 && (
                <span>{incident.affected_systems.length} systems affected</span>
              )}
            </div>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
};
