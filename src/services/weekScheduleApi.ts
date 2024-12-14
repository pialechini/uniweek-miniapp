import supabase from '@/services/supabase';
import { WeekSchedule } from '@/types';

async function fetchWeekSchedule(token: string) {
  const { data, error } = await supabase
    .from('week_schedules')
    .select('week_schedule')
    .eq('token', token)
    .single();

  if (error) {
    console.error('Error fetching week schedule:', error);
  }

  return data?.week_schedule as WeekSchedule | undefined;
}

export { fetchWeekSchedule };
