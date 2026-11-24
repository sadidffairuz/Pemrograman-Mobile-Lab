import { createClient } from '@supabase/supabase-js';
import { secureStorageAdapter } from './secureStorageAdapter';

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://hqjnzstpmytzajccunur.supabase.co';
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_tDOWyso-TeTF3NqpsZpUkQ_2hqlSOAy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: secureStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
