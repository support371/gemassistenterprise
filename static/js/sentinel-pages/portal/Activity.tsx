import { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { ActivityFeed } from '@/components/portal/ActivityFeed';
import { supabase } from '@/integrations/supabase/client';
import { 
  Activity as ActivityIcon,
  Filter,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ActivityPage = () => {
  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
            <p className="text-muted-foreground">Track all team activities and changes</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-primary">Live Updates</span>
          </div>
        </div>

        {/* Activity Feed - Full Width */}
        <div className="max-w-4xl">
          <ActivityFeed />
        </div>
      </div>
    </PortalLayout>
  );
};

export default ActivityPage;
