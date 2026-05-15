import { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  GripVertical, 
  Clock, 
  User,
  AlertCircle,
  CheckCircle,
  Circle,
  Loader2,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
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

interface Task {
  id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assigned_to: string | null;
  due_date: string | null;
  created_by: string | null;
  created_at: string;
}

const columns = [
  { id: 'backlog', title: 'Backlog', icon: Circle, color: 'text-muted-foreground' },
  { id: 'todo', title: 'To Do', icon: AlertCircle, color: 'text-warning' },
  { id: 'in_progress', title: 'In Progress', icon: Loader2, color: 'text-primary' },
  { id: 'review', title: 'Review', icon: Clock, color: 'text-blue-400' },
  { id: 'done', title: 'Done', icon: CheckCircle, color: 'text-success' },
];

const priorityConfig = {
  critical: { color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
  high: { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  medium: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  low: { color: 'text-muted-foreground', bg: 'bg-muted/10', border: 'border-muted/30' },
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  }>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setTasks(data as Task[]);
      }
      setLoading(false);
    };

    fetchTasks();

    // Real-time subscription
    const channel = supabase
      .channel('tasks-board')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks(prev => [payload.new as Task, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks(prev => prev.map(t => t.id === payload.new.id ? payload.new as Task : t));
          } else if (payload.eventType === 'DELETE') {
            setTasks(prev => prev.filter(t => t.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return;

    const { error } = await supabase.from('tasks').insert({
      title: newTask.title,
      description: newTask.description || null,
      priority: newTask.priority,
      status: newTask.status,
      created_by: user?.id,
    });

    if (!error) {
      setNewTask({ title: '', description: '', priority: 'medium', status: 'todo' });
      setIsDialogOpen(false);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Task Board</h1>
            <p className="text-muted-foreground">Manage and track project tasks</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task title"
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task description..."
                    className="bg-secondary/50 min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(v) => setNewTask({ ...newTask, priority: v as 'critical' | 'high' | 'medium' | 'low' })}
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
                    <Label>Status</Label>
                    <Select
                      value={newTask.status}
                      onValueChange={(v) => setNewTask({ ...newTask, status: v as 'backlog' | 'todo' | 'in_progress' | 'review' | 'done' })}
                    >
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map(col => (
                          <SelectItem key={col.id} value={col.id}>{col.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleCreateTask} className="w-full">
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            const Icon = column.icon;
            
            return (
              <div key={column.id} className="min-w-[280px]">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-4 h-4", column.color)} />
                    <span className="font-semibold text-foreground">{column.title}</span>
                    <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Task Cards */}
                <div className="space-y-3">
                  {columnTasks.map((task) => {
                    const priority = priorityConfig[task.priority];
                    
                    return (
                      <div
                        key={task.id}
                        className="gem-card p-4 border border-border hover:border-primary/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full font-medium uppercase",
                              priority.bg, priority.color
                            )}>
                              {task.priority}
                            </span>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}
                          </span>
                          {task.assigned_to && (
                            <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                              <User className="w-3 h-3 text-primary" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {columnTasks.length === 0 && (
                    <div className="gem-card p-6 border border-dashed border-border text-center">
                      <p className="text-sm text-muted-foreground">No tasks</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
};

export default TaskBoard;
