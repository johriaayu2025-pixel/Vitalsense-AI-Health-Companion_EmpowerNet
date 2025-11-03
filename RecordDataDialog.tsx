import { useState } from 'react';
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
import { Plus } from 'lucide-react';
import { useHealthRecords } from '@/hooks/useHealthRecords';

interface RecordDataDialogProps {
  memberId: string;
  memberName: string;
  trigger?: React.ReactNode;
}

export function RecordDataDialog({ memberId, memberName, trigger }: RecordDataDialogProps) {
  const [open, setOpen] = useState(false);
  const { addRecord } = useHealthRecords(memberId);
  const [formData, setFormData] = useState({
    heart_rate: '',
    bp_systolic: '',
    bp_diastolic: '',
    spo2: '',
    temperature: '',
    blood_sugar: '',
    weight: '',
    vitamin_b12: '',
    vitamin_d: '',
    iron: '',
    calcium: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const record: any = { member_id: memberId };
    
    if (formData.heart_rate) record.heart_rate = parseInt(formData.heart_rate);
    if (formData.bp_systolic) record.bp_systolic = parseInt(formData.bp_systolic);
    if (formData.bp_diastolic) record.bp_diastolic = parseInt(formData.bp_diastolic);
    if (formData.spo2) record.spo2 = parseInt(formData.spo2);
    if (formData.temperature) record.temperature = parseFloat(formData.temperature);
    if (formData.blood_sugar) record.blood_sugar = parseInt(formData.blood_sugar);
    if (formData.weight) record.weight = parseFloat(formData.weight);
    if (formData.vitamin_b12) record.vitamin_b12 = parseFloat(formData.vitamin_b12);
    if (formData.vitamin_d) record.vitamin_d = parseFloat(formData.vitamin_d);
    if (formData.iron) record.iron = parseFloat(formData.iron);
    if (formData.calcium) record.calcium = parseFloat(formData.calcium);
    if (formData.notes) record.notes = formData.notes;

    addRecord(record);
    setOpen(false);
    setFormData({
      heart_rate: '',
      bp_systolic: '',
      bp_diastolic: '',
      spo2: '',
      temperature: '',
      blood_sugar: '',
      weight: '',
      vitamin_b12: '',
      vitamin_d: '',
      iron: '',
      calcium: '',
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Record Data
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record Health Data</DialogTitle>
          <DialogDescription>
            Record vital signs for {memberName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heart_rate">Heart Rate (bpm)</Label>
              <Input
                id="heart_rate"
                type="number"
                value={formData.heart_rate}
                onChange={(e) => setFormData({ ...formData, heart_rate: e.target.value })}
                placeholder="e.g., 75"
                className="bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spo2">SpO₂ (%)</Label>
              <Input
                id="spo2"
                type="number"
                min="0"
                max="100"
                value={formData.spo2}
                onChange={(e) => setFormData({ ...formData, spo2: e.target.value })}
                placeholder="e.g., 98"
                className="bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bp_systolic">BP Systolic (mmHg)</Label>
              <Input
                id="bp_systolic"
                type="number"
                value={formData.bp_systolic}
                onChange={(e) => setFormData({ ...formData, bp_systolic: e.target.value })}
                placeholder="e.g., 120"
                className="bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bp_diastolic">BP Diastolic (mmHg)</Label>
              <Input
                id="bp_diastolic"
                type="number"
                value={formData.bp_diastolic}
                onChange={(e) => setFormData({ ...formData, bp_diastolic: e.target.value })}
                placeholder="e.g., 80"
                className="bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                placeholder="e.g., 36.6"
                className="bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blood_sugar">Blood Sugar (mg/dL)</Label>
              <Input
                id="blood_sugar"
                type="number"
                value={formData.blood_sugar}
                onChange={(e) => setFormData({ ...formData, blood_sugar: e.target.value })}
                placeholder="e.g., 95"
                className="bg-muted/50 border-border/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="e.g., 70.5"
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Vitamins & Minerals</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vitamin_b12">Vitamin B12 (µg)</Label>
                <Input
                  id="vitamin_b12"
                  type="number"
                  step="0.1"
                  value={formData.vitamin_b12}
                  onChange={(e) => setFormData({ ...formData, vitamin_b12: e.target.value })}
                  placeholder="e.g., 2.4"
                  className="bg-muted/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vitamin_d">Vitamin D (IU)</Label>
                <Input
                  id="vitamin_d"
                  type="number"
                  step="0.1"
                  value={formData.vitamin_d}
                  onChange={(e) => setFormData({ ...formData, vitamin_d: e.target.value })}
                  placeholder="e.g., 600"
                  className="bg-muted/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iron">Iron (mg)</Label>
                <Input
                  id="iron"
                  type="number"
                  step="0.1"
                  value={formData.iron}
                  onChange={(e) => setFormData({ ...formData, iron: e.target.value })}
                  placeholder="e.g., 18"
                  className="bg-muted/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calcium">Calcium (mg)</Label>
                <Input
                  id="calcium"
                  type="number"
                  step="0.1"
                  value={formData.calcium}
                  onChange={(e) => setFormData({ ...formData, calcium: e.target.value })}
                  placeholder="e.g., 1000"
                  className="bg-muted/50 border-border/50"
                />
              </div>
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
              Save Data
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
