import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Reminder {
  id?: string;
  member_id: string;
  title: string;
  type: string;
  frequency: string;
  time: string;
  active?: boolean;
}

export function useReminders() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reminders, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .order('time', { ascending: true });

      if (error) throw error;
      return data as Reminder[];
    },
  });

  const addReminder = useMutation({
    mutationFn: async (reminder: Reminder) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('reminders')
        .insert({ ...reminder, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      toast({
        title: 'Success',
        description: 'Reminder added successfully',
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

  const updateReminder = useMutation({
    mutationFn: async ({ id, ...reminder }: Reminder & { id: string }) => {
      const { data, error } = await supabase
        .from('reminders')
        .update(reminder)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      toast({
        title: 'Success',
        description: 'Reminder updated successfully',
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

  const deleteReminder = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      toast({
        title: 'Success',
        description: 'Reminder deleted',
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
    reminders: reminders || [],
    isLoading,
    addReminder: addReminder.mutate,
    updateReminder: updateReminder.mutate,
    deleteReminder: deleteReminder.mutate,
  };
}
