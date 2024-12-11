import { tokenToEmail } from '@/helpers';
import type { Database } from '@/types';
import { createClient } from '@supabase/supabase-js';

async function signIn(token: string) {
  const email = tokenToEmail(token);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: email,
  });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}

const SUPABASE_URL = 'https://hrpvywrejyktndtzrren.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycHZ5d3JlanlrdG5kdHpycmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNDk3MDAsImV4cCI6MjA0NjYyNTcwMH0.vJoJ-lq4fylf5vijylggEqfhM0zazCmCHLDNVTQc99M';

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
export { signIn };
