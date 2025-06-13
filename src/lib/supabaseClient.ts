import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ubiefdyzeadbelgimpih.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViaWVmZHl6ZWFkYmVsZ2ltcGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjYwMjcsImV4cCI6MjA2NTQwMjAyN30.2PIQ6MwyBdT9yVg7sBNQ5h-4FBRU3hbSINm3WnDzoVE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 