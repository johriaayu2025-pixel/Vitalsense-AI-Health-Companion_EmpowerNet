import { Bell, Clock, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ReminderDialog } from '@/components/dialogs/ReminderDialog';
import { useReminders } from '@/hooks/useReminders';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Reminders() {
  const { reminders, isLoading, updateReminder, deleteReminder } = useReminders();
  const { members } = useFamilyMembers();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getMemberById = (id: string) => members.find(m => m.id === id);

  const getReminderIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'medication': return '💊';
      case 'water': return '💧';
      case 'exercise': return '🏃';
      case 'checkup': return '🏥';
      case 'test': return '🧪';
      default: return '⏰';
    }
  };

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleToggleActive = (reminder: any) => {
    updateReminder({
      id: reminder.id,
      member_id: reminder.member_id,
      title: reminder.title,
      type: reminder.type,
      frequency: reminder.frequency,
      time: reminder.time,
      active: !reminder.active,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reminders</h1>
          <p className="text-muted-foreground">Manage medication and health reminders</p>
        </div>
        <ReminderDialog />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-pulse text-primary">Loading...</div>
        </div>
      ) : reminders.length === 0 ? (
        <Card className="glass-card p-12 text-center">
          <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No reminders set</h3>
          <p className="text-muted-foreground mb-6">Create your first reminder to stay on top of health tasks</p>
          <ReminderDialog />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((reminder, index) => {
            const member = getMemberById(reminder.member_id);
            return (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card-hover p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                        {getReminderIcon(reminder.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{reminder.title}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{reminder.type}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={reminder.active} 
                      onCheckedChange={() => handleToggleActive(reminder)}
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">👤</span>
                      <span className="text-muted-foreground">{member?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{formatTime(reminder.time)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground capitalize">{reminder.frequency}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex gap-2">
                    <ReminderDialog
                      reminder={reminder}
                      trigger={
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      }
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeletingId(reminder.id!)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Reminder</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this reminder? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingId) {
                  deleteReminder(deletingId);
                  setDeletingId(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
