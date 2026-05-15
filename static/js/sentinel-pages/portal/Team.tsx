import { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Mail, 
  Briefcase,
  Shield,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  department: string | null;
  status: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer';
}

const roleColors = {
  admin: 'bg-destructive/10 text-destructive border-destructive/30',
  manager: 'bg-primary/10 text-primary border-primary/30',
  analyst: 'bg-warning/10 text-warning border-warning/30',
  viewer: 'bg-muted/10 text-muted-foreground border-muted/30',
};

const Team = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      const [profilesRes, rolesRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('user_roles').select('*'),
      ]);

      if (profilesRes.data) {
        setProfiles(profilesRes.data as Profile[]);
      }
      if (rolesRes.data) {
        setRoles(rolesRes.data as UserRole[]);
      }
      setLoading(false);
    };

    fetchTeam();
  }, []);

  const getUserRole = (userId: string): string => {
    const userRole = roles.find(r => r.user_id === userId);
    return userRole?.role || 'viewer';
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
            <p className="text-muted-foreground">Manage your security operations team</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{profiles.length} Members</span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile) => {
            const role = getUserRole(profile.user_id);
            
            return (
              <div 
                key={profile.id}
                className="gem-card p-6 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    {profile.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={profile.full_name || 'User'} 
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-primary">
                        {(profile.full_name || 'U').charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {profile.full_name || 'Unnamed User'}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {profile.job_title || 'Team Member'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium capitalize border",
                        roleColors[role as keyof typeof roleColors]
                      )}>
                        {role}
                      </span>
                      {profile.department && (
                        <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                          {profile.department}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Joined {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                  </span>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    profile.status === 'active' ? 'bg-success' : 'bg-muted'
                  )} />
                </div>
              </div>
            );
          })}

          {profiles.length === 0 && !loading && (
            <div className="col-span-full gem-card p-12 border border-border text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No team members yet</h3>
              <p className="text-muted-foreground">
                Invite team members to collaborate on security operations
              </p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
};

export default Team;
