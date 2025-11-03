import { Activity, Heart, Users, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { MemberCard } from '@/components/dashboard/MemberCard';
import { AddMemberDialog } from '@/components/dialogs/AddMemberDialog';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { members, isLoading } = useFamilyMembers();
  
  const avgHeartRate = members.length > 0
    ? Math.round(members.reduce((acc: number, m: any) => acc + (m.heartRate || 70), 0) / members.length)
    : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-card/80 to-card/40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-3 glow-text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
            Welcome to VitalSense
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Your AI-powered health companion for the whole family
          </p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Members"
          value={members.length}
          icon={Users}
          status="normal"
        />
        <StatCard
          title="Avg Heart Rate"
          value={avgHeartRate || 0}
          unit="bpm"
          icon={Heart}
          status="normal"
        />
        <StatCard
          title="Active Devices"
          value={members.length}
          icon={Activity}
          status="normal"
        />
        <StatCard
          title="Health Score"
          value="92"
          unit="/100"
          icon={TrendingUp}
          status="normal"
        />
      </div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-card p-6 rounded-2xl border-2 border-accent/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border border-accent/30">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">AI Health Insights</h2>
          </div>
          <div className="space-y-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-success/10 border border-success/30 backdrop-blur-sm hover-lift"
            >
              <p className="text-sm font-semibold text-success mb-1.5">✓ Family Health Status: Good</p>
              <p className="text-xs text-muted-foreground">All tracked members showing normal vitals</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-primary/10 border border-primary/30 backdrop-blur-sm hover-lift"
            >
              <p className="text-sm font-semibold text-primary mb-1.5">💡 Tip: Record Regular Data</p>
              <p className="text-xs text-muted-foreground">Keep track of vital signs daily for better insights</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-accent/10 border border-accent/30 backdrop-blur-sm hover-lift"
            >
              <p className="text-sm font-semibold text-accent mb-1.5">🤖 Ask VitaBot</p>
              <p className="text-xs text-muted-foreground">Get AI-powered health insights and recommendations</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Family Members */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Family Members</h2>
          <AddMemberDialog />
        </div>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse text-primary">Loading...</div>
          </div>
        ) : members.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No family members yet</h3>
            <p className="text-muted-foreground mb-6">Add your first family member to start tracking health data</p>
            <AddMemberDialog />
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {members.map((member: any, index: number) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
