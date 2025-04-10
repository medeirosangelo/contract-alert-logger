
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pkeceanqsbkchxakmuet.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWNlYW5xc2JrY2h4YWttdWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNzA2MTMsImV4cCI6MjA1ODc0NjYxM30.MSAT0K8II_x4pEqVC3zgIL6_PfqcMJsM1FUGUllworU";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    }
  }
);
