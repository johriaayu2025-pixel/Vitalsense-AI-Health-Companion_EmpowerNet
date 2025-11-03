import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HealthRecord {
  id?: string;
  member_id: string;
  heart_rate?: number;
  bp_systolic?: number;
  bp_diastolic?: number;
  spo2?: number;
  temperature?: number;
  blood_sugar?: number;
  weight?: number;
  notes?: string;
  recorded_at?: string;
}

export function useHealthRecords(memberId?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: records, isLoading } = useQuery({
    queryKey: ['health-records', memberId],
    queryFn: async () => {
      let query = supabase
        .from('health_records')
        .select('*')
        .order('recorded_at', { ascending: false });

      if (memberId) {
        query = query.eq('member_id', memberId);
      }

      const { data, error } = await query.limit(10);

      if (error) throw error;
      return data as HealthRecord[];
    },
    enabled: !!memberId,
  });

  const addRecord = useMutation({
    mutationFn: async (record: HealthRecord) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('health_records')
        .insert({ ...record, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-records'] });
      toast({
        title: 'Success',
        description: 'Health data recorded successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    records: records || [],
    isLoading,
    addRecord: addRecord.mutate,
  };
}
