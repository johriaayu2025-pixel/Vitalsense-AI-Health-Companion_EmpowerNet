import { Calendar, Clock, FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AppointmentDialog } from '@/components/dialogs/AppointmentDialog';
import { useAppointments } from '@/hooks/useAppointments';
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

export default function Appointments() {
  const { appointments, isLoading, deleteAppointment } = useAppointments();
  const { members } = useFamilyMembers();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getMemberById = (id: string) => members.find(m => m.id === id);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="text-muted-foreground">Manage family medical appointments</p>
        </div>
        <AppointmentDialog />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-pulse text-primary">Loading...</div>
        </div>
      ) : appointments.length === 0 ? (
        <Card className="glass-card p-12 text-center">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No appointments scheduled</h3>
          <p className="text-muted-foreground mb-6">Schedule your first appointment to get started</p>
          <AppointmentDialog />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {appointments.map((appointment, index) => {
            const member = getMemberById(appointment.member_id);
            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card-hover p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl border-2 border-primary/30">
                        {member?.avatar || '👤'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{member?.name || 'Unknown'}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.doctor_name}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      {appointment.type}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(appointment.appointment_date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{formatTime(appointment.appointment_time)}</span>
                    </div>
                    {appointment.notes && (
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50 flex gap-2">
                    <AppointmentDialog
                      appointment={appointment}
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
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={() => setDeletingId(appointment.id!)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Cancel
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
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingId) {
                  deleteAppointment(deletingId);
                  setDeletingId(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
