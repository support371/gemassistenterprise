import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Palette
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="gem-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Update your personal details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                value={user?.email || ''} 
                disabled 
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                placeholder="Enter your name" 
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input 
                placeholder="e.g. Security Analyst" 
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input 
                placeholder="e.g. Cyber Security" 
                className="bg-secondary/50"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border flex justify-end">
            <Button className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Security Section */}
        <div className="gem-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-success/10 border border-success/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Security</h3>
              <p className="text-sm text-muted-foreground">Manage your security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your password regularly</p>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="gem-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-warning/10 border border-warning/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Security Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about security incidents</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-primary p-1 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-white ml-auto" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Task Updates</p>
                <p className="text-sm text-muted-foreground">Notifications for task changes</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-primary p-1 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-white ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Settings;
