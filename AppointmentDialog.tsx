import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { useAppointments } from '@/hooks/useAppointments';

interface AppointmentDialogProps {
  trigger?: React.ReactNode;
  appointment?: any;
  onClose?: () => void;
}

const appointmentTypes = ['General Checkup', 'Dentist', 'Specialist', 'Lab Test', 'Follow-up', 'Emergency', 'Other'];

export function AppointmentDialog({ trigger, appointment, onClose }: AppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const { members } = useFamilyMembers();
  const { addAppointment, updateAppointment } = useAppointments();
  
  const [formData, setFormData] = useState({
    member_id: '',
    doctor_name: '',
    appointment_date: '',
    appointment_time: '',
    type: '',
    notes: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        member_id: appointment.member_id,
        doctor_name: appointment.doctor_name,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        type: appointment.type,
        notes: appointment.notes || '',
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (appointment) {
      updateAppointment({ id: appointment.id, ...formData });
    } else {
      addAppointment(formData);
    }
    
    setOpen(false);
    setFormData({
      member_id: '',
      doctor_name: '',
      appointment_date: '',
      appointment_time: '',
      type: '',
      notes: '',
    });
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{appointment ? 'Edit Appointment' : 'New Appointment'}</DialogTitle>
          <DialogDescription>
            {appointment ? 'Update appointment details' : 'Schedule a new appointment'}
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
            <Label htmlFor="doctor_name">Doctor Name</Label>
            <Input
              id="doctor_name"
              value={formData.doctor_name}
              onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
              placeholder="Dr. Smith"
              required
              className="bg-muted/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} required>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointment_date">Date</Label>
              <Input
                id="appointment_date"
                type="date"
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                required
                className="bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment_time">Time</Label>
              <Input
                id="appointment_time"
                type="time"
                value={formData.appointment_time}
                onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                required
                className="bg-muted/50 border-border/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes..."
              className="bg-muted/50 border-border/50"
              rows={3}
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
              {appointment ? 'Update' : 'Schedule'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
