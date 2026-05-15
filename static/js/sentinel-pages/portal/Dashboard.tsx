import { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { StatWidget } from '@/components/portal/StatWidget';
import { RiskGauge } from '@/components/portal/RiskGauge';
import { ThreatFeed } from '@/components/portal/ThreatFeed';
import { ActivityFeed } from '@/components/portal/ActivityFeed';
import { IncidentCard } from '@/components/portal/IncidentCard';
import { supabase } from '@/integrations/supabase/client';
import { 
  Shield, 
  AlertTriangle, 
  ListTodo, 
  Activity,
  TrendingUp,
  Users
} from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  activeIncidents: number;
  openTasks: number;
  riskScore: number;
}

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

const PortalDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeIncidents: 0,
    openTasks: 0,
    riskScore: 0,
  });
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch projects count
      const { count: projectCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      // Fetch active incidents count
      const { count: incidentCount } = await supabase
        .from('incidents')
        .select('*', { count: 'exact', head: true })
        .in('status', ['open', 'investigating', 'mitigating']);

      // Fetch open tasks count
      const { count: taskCount } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .in('status', ['backlog', 'todo', 'in_progress', 'review']);

      // Calculate risk score based on incidents
      const { data: criticalIncidents } = await supabase
        .from('incidents')
        .select('severity')
        .in('status', ['open', 'investigating', 'mitigating']);

      let riskScore = 0;
      if (criticalIncidents) {
        criticalIncidents.forEach(inc => {
          if (inc.severity === 'critical') riskScore += 25;
          else if (inc.severity === 'high') riskScore += 15;
          else if (inc.severity === 'medium') riskScore += 8;
          else riskScore += 3;
        });
      }
      riskScore = Math.min(100, Math.max(0, riskScore));

      setStats({
        totalProjects: projectCount || 0,
        activeIncidents: incidentCount || 0,
        openTasks: taskCount || 0,
        riskScore,
      });
    };

    const fetchRecentIncidents = async () => {
      const { data } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (data) {
        setRecentIncidents(data as Incident[]);
      }
    };

    fetchStats();
    fetchRecentIncidents();
  }, []);

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
            <p className="text-muted-foreground">Real-time security operations overview</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">All Systems Operational</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatWidget
            title="Active Projects"
            value={stats.totalProjects}
            icon={<TrendingUp className="w-6 h-6" />}
            change={12}
            changeLabel="vs last month"
          />
          <StatWidget
            title="Active Incidents"
            value={stats.activeIncidents}
            icon={<AlertTriangle className="w-6 h-6" />}
            variant={stats.activeIncidents > 0 ? 'warning' : 'success'}
            change={stats.activeIncidents > 0 ? -8 : 0}
            changeLabel="vs last week"
          />
          <StatWidget
            title="Open Tasks"
            value={stats.openTasks}
            icon={<ListTodo className="w-6 h-6" />}
            change={5}
            changeLabel="vs yesterday"
          />
          <StatWidget
            title="Team Members"
            value={8}
            icon={<Users className="w-6 h-6" />}
            variant="success"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Risk & Incidents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Score Card */}
            <div className="gem-card p-6 border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Security Posture</h3>
                  <p className="text-sm text-muted-foreground">Current risk assessment score</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Sentinel-X</span>
                </div>
              </div>
              <div className="flex items-center justify-center py-8">
                <RiskGauge score={stats.riskScore} size="lg" />
              </div>
            </div>

            {/* Recent Incidents */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Recent Incidents</h3>
                <a href="/portal/incidents" className="text-sm text-primary hover:underline">
                  View all
                </a>
              </div>
              {recentIncidents.length === 0 ? (
                <div className="gem-card p-8 border border-border text-center">
                  <Shield className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="text-muted-foreground">No recent incidents</p>
                  <p className="text-xs text-muted-foreground mt-1">Your systems are secure</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <IncidentCard key={incident.id} incident={incident} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Feeds */}
          <div className="space-y-6">
            <ThreatFeed />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalDashboard;
