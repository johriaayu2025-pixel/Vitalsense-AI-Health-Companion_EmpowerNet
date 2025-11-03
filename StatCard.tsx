import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: 'normal' | 'warning' | 'danger';
  trend?: 'up' | 'down' | 'stable';
}

export function StatCard({ title, value, unit, icon: Icon, status = 'normal', trend }: StatCardProps) {
  const statusColors = {
    normal: 'text-success',
    warning: 'text-warning',
    danger: 'text-destructive'
  };

  const borderColors = {
    normal: 'border-success/30',
    warning: 'border-warning/30',
    danger: 'border-destructive/30'
  };

  const iconBgColors = {
    normal: 'bg-success/10',
    warning: 'bg-warning/10',
    danger: 'bg-destructive/10'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hover-lift"
    >
      <Card className={`glass-card p-6 border-2 ${borderColors[status]} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl" />
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${statusColors[status]}`}>
                {value}
              </span>
              {unit && <span className="text-base text-muted-foreground font-medium">{unit}</span>}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${iconBgColors[status]} backdrop-blur-sm border border-${status === 'normal' ? 'success' : status === 'warning' ? 'warning' : 'destructive'}/20`}>
            <Icon className={`w-6 h-6 ${statusColors[status]}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
