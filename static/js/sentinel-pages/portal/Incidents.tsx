import { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { IncidentCard } from '@/components/portal/IncidentCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search,
  Filter,
  AlertTriangle,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Incident {
  id: string;
  title: string;
  description: string | null;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'mitigating' | 'resolved' | 'closed';
  type: string;
  affected_systems: string[] | null;
  assigned_to: string | null;
  reported_by: string | null;
  created_at: string;
}

const severityTabs = [
  { id: 'all', label: 'All' },
  { id: 'critical', label: 'Critical', color: 'text-destructive' },
  { id: 'high', label: 'High', color: 'text-orange-500' },
  { id: 'medium', label: 'Medium', color: 'text-warning' },
  { id: 'low', label: 'Low', color: 'text-muted-foreground' },
];

const Incidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIncident, setNewIncident] = useState<{
    title: string;
    description: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    type: 'security' | 'performance' | 'availability' | 'compliance' | 'other';
  }>({
    title: '',
    description: '',
    severity: 'medium',
    type: 'security',
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchIncidents = async () => {
      const { data } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setIncidents(data as Incident[]);
      }
      setLoading(false);
    };

    fetchIncidents();

    // Real-time subscription
    const channel = supabase
      .channel('incidents-page')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'incidents' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setIncidents(prev => [payload.new as Incident, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setIncidents(prev => prev.map(i => i.id === payload.new.id ? payload.new as Incident : i));
          } else if (payload.eventType === 'DELETE') {
            setIncidents(prev => prev.filter(i => i.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCreateIncident = async () => {
    if (!newIncident.title.trim()) return;

    const { error } = await supabase.from('incidents').insert({
      title: newIncident.title,
      description: newIncident.description || null,
      severity: newIncident.severity,
      type: newIncident.type,
      reported_by: user?.id,
    });

    if (!error) {
      setNewIncident({ title: '', description: '', severity: 'medium', type: 'security' });
      setIsDialogOpen(false);
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || incident.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getCounts = () => {
    return {
      all: incidents.length,
      critical: incidents.filter(i => i.severity === 'critical').length,
      high: incidents.filter(i => i.severity === 'high').length,
      medium: incidents.filter(i => i.severity === 'medium').length,
      low: incidents.filter(i => i.severity === 'low').length,
    };
  };

  const counts = getCounts();

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Incident Management</h1>
            <p className="text-muted-foreground">Track and resolve security incidents</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-destructive hover:bg-destructive/90">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Report New Incident</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={newIncident.title}
                    onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                    placeholder="Incident title"
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newIncident.description}
                    onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                    placeholder="Describe the incident..."
                    className="bg-secondary/50 min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select
                      value={newIncident.severity}
                      onValueChange={(v) => setNewIncident({ ...newIncident, severity: v as 'critical' | 'high' | 'medium' | 'low' })}
                    >
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={newIncident.type}
                      onValueChange={(v) => setNewIncident({ ...newIncident, type: v as 'security' | 'performance' | 'availability' | 'compliance' | 'other' })}
                    >
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="availability">Availability</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleCreateIncident} className="w-full bg-destructive hover:bg-destructive/90">
                  Report Incident
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search incidents..."
              className="pl-10 bg-secondary/50"
            />
          </div>
          <div className="flex items-center gap-2">
            {severityTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSeverity(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedSeverity === tab.id
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-70">
                  {counts[tab.id as keyof typeof counts]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.length === 0 ? (
            <div className="gem-card p-12 border border-border text-center">
              <Shield className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No incidents found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedSeverity !== 'all' 
                  ? 'Try adjusting your filters'
                  : 'All systems are operating normally'}
              </p>
            </div>
          ) : (
            filteredIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))
          )}
        </div>
      </div>
    </PortalLayout>
  );
};

export default Incidents;
