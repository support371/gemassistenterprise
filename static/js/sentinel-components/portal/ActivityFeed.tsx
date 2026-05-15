import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Activity, User, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  entity_name: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

const actionIcons: Record<string, typeof Activity> = {
  created: FileText,
  updated: Activity,
  completed: CheckCircle,
  assigned: User,
  incident: AlertTriangle,
};

const actionColors: Record<string, string> = {
  created: 'text-primary bg-primary/10 border-primary/30',
  updated: 'text-warning bg-warning/10 border-warning/30',
  completed: 'text-success bg-success/10 border-success/30',
  assigned: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  incident: 'text-destructive bg-destructive/10 border-destructive/30',
};

export const ActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(15);
      
      if (data) {
        setActivities(data as ActivityItem[]);
      }
    };

    fetchActivities();

    // Real-time subscription
    const channel = supabase
      .channel('activity-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activities' },
        (payload) => {
          setActivities(prev => [payload.new as ActivityItem, ...prev].slice(0, 15));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getActionType = (action: string): string => {
    if (action.includes('created') || action.includes('added')) return 'created';
    if (action.includes('updated') || action.includes('modified')) return 'updated';
    if (action.includes('completed') || action.includes('resolved')) return 'completed';
    if (action.includes('assigned')) return 'assigned';
    if (action.includes('incident') || action.includes('alert')) return 'incident';
    return 'updated';
  };

  return (
    <div className="gem-card border border-border h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Activity Feed</h3>
            <p className="text-xs text-muted-foreground">Team collaboration updates</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Activity List */}
      <div className="max-h-[400px] overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">Activities will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities.map((activity) => {
              const actionType = getActionType(activity.action);
              const Icon = actionIcons[actionType] || Activity;
              const colorClass = actionColors[actionType] || actionColors.updated;
              
              return (
                <div 
                  key={activity.id}
                  className="px-5 py-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg border flex items-center justify-center shrink-0",
                      colorClass
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.action}</span>
                        {activity.entity_name && (
                          <>
                            {' '}
                            <span className="text-primary">{activity.entity_name}</span>
                          </>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground capitalize">
                          {activity.entity_type}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                        </span>
                      </div>
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
