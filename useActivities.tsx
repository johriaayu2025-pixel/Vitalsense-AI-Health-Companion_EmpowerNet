import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

interface Activity {
  id: string;
  member_id: string | null;
  activity_type: string;
  action: string;
  details: any;
  created_at: string;
  member?: {
    name: string;
    avatar: string;
  };
}

export function useActivities() {
  const { data: activities, isLoading, refetch } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select(`
          *,
          member:family_members(name, avatar)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as Activity[];
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('activity-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activity_logs',
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return {
    activities: activities || [],
    isLoading,
  };
}
