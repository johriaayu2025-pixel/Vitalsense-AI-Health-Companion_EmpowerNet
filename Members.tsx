import { MemberCard } from '@/components/dashboard/MemberCard';
import { AddMemberDialog } from '@/components/dialogs/AddMemberDialog';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function Members() {
  const { members, isLoading } = useFamilyMembers();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 glow-text-primary">Family Members</h1>
          <p className="text-lg text-muted-foreground">Manage your family's health profiles</p>
        </div>
        <AddMemberDialog />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-pulse text-primary text-lg">Loading...</div>
        </div>
      ) : members.length === 0 ? (
        <Card className="glass-card p-12 text-center border-2 border-dashed border-primary/30">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3">No family members yet</h3>
          <p className="text-muted-foreground mb-6 text-base">Add your first family member to start tracking health data</p>
          <AddMemberDialog />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member: any, index: number) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
