import { Activity, Heart, Droplet, Thermometer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FamilyMember } from '@/types/health';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { Skeleton } from '@/components/ui/skeleton';
import { RecordDataDialog } from '@/components/dialogs/RecordDataDialog';

interface MemberCardProps {
  member: FamilyMember;
  index: number;
}

export function MemberCard({ member, index }: MemberCardProps) {
  const navigate = useNavigate();
  const { records, isLoading } = useHealthRecords(member.id);
  
  // Get the latest health record
  const latestRecord = records?.[0];

  // Avatar gradient based on index
  const avatarGradients = [
    'avatar-gradient-blue',
    'avatar-gradient-purple',
    'avatar-gradient-green',
    'avatar-gradient-orange',
    'avatar-gradient-pink'
  ];
  const gradientClass = avatarGradients[index % avatarGradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="glass-card-hover p-6 cursor-pointer" onClick={() => navigate(`/members/${member.id}`)}>
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-full ${gradientClass} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
            {member.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{member.relation}</p>
            
            {isLoading ? (
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-16 mb-1" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="text-sm font-semibold">
                      {latestRecord?.heart_rate ? `${latestRecord.heart_rate} bpm` : '—'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Pressure</p>
                    <p className="text-sm font-semibold">
                      {latestRecord?.bp_systolic && latestRecord?.bp_diastolic
                        ? `${latestRecord.bp_systolic}/${latestRecord.bp_diastolic}`
                        : '—'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">SpO₂</p>
                    <p className="text-sm font-semibold">
                      {latestRecord?.spo2 ? `${latestRecord.spo2}%` : '—'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-warning" />
                  <div>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="text-sm font-semibold">
                      {latestRecord?.temperature ? `${latestRecord.temperature}°C` : '—'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50 flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/members/${member.id}`);
            }}
          >
            View Details
          </Button>
          <RecordDataDialog
            memberId={member.id}
            memberName={member.name}
            trigger={
              <Button 
                size="sm" 
                className="flex-1 glow-button bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Record Data
              </Button>
            }
          />
        </div>
      </Card>
    </motion.div>
  );
}
