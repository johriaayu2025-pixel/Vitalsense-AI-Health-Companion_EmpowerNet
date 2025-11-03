import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { useReminders } from '@/hooks/useReminders';

interface ReminderDialogProps {
  trigger?: React.ReactNode;
  reminder?: any;
  onClose?: () => void;
}

const reminderTypes = ['Medication', 'Water', 'Exercise', 'Checkup', 'Test', 'Other'];
const frequencies = ['Daily', 'Weekly', 'Monthly', 'As Needed'];

export function ReminderDialog({ trigger, reminder, onClose }: ReminderDialogProps) {
  const [open, setOpen] = useState(false);
  const { members } = useFamilyMembers();
  const { addReminder, updateReminder } = useReminders();
  
  const [formData, setFormData] = useState({
    member_id: '',
    title: '',
    type: '',
    frequency: '',
    time: '',
    active: true,
  });

  useEffect(() => {
    if (reminder) {
      setFormData({
        member_id: reminder.member_id,
        title: reminder.title,
        type: reminder.type,
        frequency: reminder.frequency,
        time: reminder.time,
        active: reminder.active ?? true,
      });
    }
  }, [reminder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (reminder) {
      updateReminder({ id: reminder.id, ...formData });
    } else {
      addReminder(formData);
    }
    
    setOpen(false);
    setFormData({
      member_id: '',
      title: '',
      type: '',
      frequency: '',
      time: '',
      active: true,
    });
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Reminder
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50">
        <DialogHeader>
          <DialogTitle>{reminder ? 'Edit Reminder' : 'New Reminder'}</DialogTitle>
          <DialogDescription>
            {reminder ? 'Update reminder details' : 'Create a new health reminder'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member_id">Family Member</Label>
            <Select value={formData.member_id} onValueChange={(value) => setFormData({ ...formData, member_id: value })} required>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent>
                {members.map(member => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.avatar} {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Reminder Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Take medication"
              required
              className="bg-muted/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} required>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {reminderTypes.map(type => (
                  <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })} required>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map(freq => (
                  <SelectItem key={freq} value={freq.toLowerCase()}>{freq}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              className="bg-muted/50 border-border/50"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              {reminder ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
