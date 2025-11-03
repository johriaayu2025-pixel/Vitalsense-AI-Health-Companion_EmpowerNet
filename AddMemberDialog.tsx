import { useState } from 'react';
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

const avatars = ['👨', '👩', '👦', '👧', '👴', '👵', '👶', '🧑', '👨‍⚕️', '👩‍⚕️'];
const relations = ['Self', 'Spouse', 'Parent', 'Child', 'Sibling', 'Grandparent', 'Grandchild', 'Other'];

export function AddMemberDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [avatar, setAvatar] = useState('👤');
  const { addMember } = useFamilyMembers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({ name, relation, avatar });
    setOpen(false);
    setName('');
    setRelation('');
    setAvatar('👤');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="glow-button bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
          <DialogDescription>
            Add a new family member to track their health data
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
              className="bg-muted/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relation">Relation</Label>
            <Select value={relation} onValueChange={setRelation} required>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Select relation" />
              </SelectTrigger>
              <SelectContent>
                {relations.map(rel => (
                  <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Avatar</Label>
            <div className="grid grid-cols-5 gap-2">
              {avatars.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatar(emoji)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                    avatar === emoji
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-muted/50 border border-border/50 hover:bg-muted'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
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
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
