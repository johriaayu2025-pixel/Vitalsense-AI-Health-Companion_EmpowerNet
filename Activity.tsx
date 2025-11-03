import { Activity, TrendingUp, Calendar, Heart, Users, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useActivities } from '@/hooks/useActivities';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'health_record':
      return Activity;
    case 'appointment':
      return Calendar;
    case 'reminder':
      return Clock;
    case 'family_member':
      return Users;
    default:
      return Heart;
  }
};

const formatActivityValue = (details: any, type: string) => {
  if (!details) return null;
  
  if (type === 'health_record') {
    const parts = [];
    if (details.bp_systolic && details.bp_diastolic) {
      parts.push(`BP: ${details.bp_systolic}/${details.bp_diastolic} mmHg`);
    }
    if (details.heart_rate) {
      parts.push(`HR: ${details.heart_rate} bpm`);
    }
    if (details.spo2) {
      parts.push(`SpO₂: ${details.spo2}%`);
    }
    if (details.temperature) {
      parts.push(`Temp: ${details.temperature}°C`);
    }
    return parts.join(', ');
  }
  
  if (type === 'appointment' && details.doctor_name) {
    return `Dr. ${details.doctor_name}`;
  }
  
  if (type === 'reminder' && details.title) {
    return details.title;
  }
  
  if (type === 'family_member' && details.relation) {
    return details.relation;
  }
  
  return null;
};

export default function ActivityPage() {
  const { activities, isLoading } = useActivities();
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Activity Timeline</h1>
        <p className="text-muted-foreground">Recent health activities and updates</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="glass-card p-5">
              <div className="flex items-start gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <Card className="glass-card p-12 text-center">
          <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No activities yet</h3>
          <p className="text-muted-foreground">
            Activities will appear here when you add family members, record health data, or create appointments
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.activity_type);
            const memberName = activity.member?.name || 'Family member';
            const value = formatActivityValue(activity.details, activity.activity_type);
            const timeAgo = formatDistanceToNow(new Date(activity.created_at), { addSuffix: true });

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
              >
                <Card className="glass-card-hover p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border-2 border-primary/30">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{memberName}</h3>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                          {value && (
                            <p className="text-sm font-medium text-primary mt-1">{value}</p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
