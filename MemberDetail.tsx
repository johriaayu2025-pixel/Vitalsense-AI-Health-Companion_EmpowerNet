import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Activity, Droplet, Thermometer, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RecordDataDialog } from '@/components/dialogs/RecordDataDialog';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { members } = useFamilyMembers();
  const { records } = useHealthRecords(id);
  
  const member = members.find(m => m.id === id);

  // Generate chart data from health records
  const chartData = records.slice(0, 7).reverse().map((record, i) => ({
    day: new Date(record.recorded_at || '').toLocaleDateString('en-US', { weekday: 'short' }),
    heartRate: record.heart_rate || 0,
    bloodPressure: record.bp_systolic || 0,
    spO2: record.spo2 || 0,
  }));

  if (!member) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Member not found</p>
        <Button onClick={() => navigate('/members')} className="mt-4">
          Back to Members
        </Button>
      </div>
    );
  }

  const latestRecord = records[0];
  const vitals = [
    { label: 'Heart Rate', value: latestRecord?.heart_rate || '--', unit: 'bpm', icon: Heart, color: 'text-primary' },
    { label: 'Blood Pressure', value: latestRecord ? `${latestRecord.bp_systolic || '--'}/${latestRecord.bp_diastolic || '--'}` : '--/--', unit: 'mmHg', icon: Activity, color: 'text-secondary' },
    { label: 'SpO₂', value: latestRecord?.spo2 || '--', unit: '%', icon: Droplet, color: 'text-accent' },
    { label: 'Temperature', value: latestRecord?.temperature || '--', unit: '°C', icon: Thermometer, color: 'text-warning' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/members')}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-4xl border-2 border-primary/30 glow-border-primary">
              {member.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{member.name}</h1>
              <p className="text-muted-foreground">{member.relation}</p>
            </div>
          </div>
        </div>
        <RecordDataDialog memberId={member.id} memberName={member.name} />
      </div>

      {/* Current Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vitals.map((vital, index) => (
          <motion.div
            key={vital.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card-hover p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl bg-${vital.color.split('-')[1]}/10`}>
                  <vital.icon className={`w-5 h-5 ${vital.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{vital.label}</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${vital.color}`}>{vital.value}</span>
                <span className="text-sm text-muted-foreground">{vital.unit}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Heart Rate Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Blood Oxygen Level</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  domain={[90, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="spO2" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Health Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-card p-6 border border-success/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Health Score</h3>
              <p className="text-sm text-muted-foreground">Based on recent vital signs</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-success/20 border-4 border-success flex items-center justify-center">
                <span className="text-3xl font-bold text-success">94</span>
              </div>
              <p className="text-xs text-success mt-2">Excellent</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
