import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, isSupabaseConfigured } from './supabase-config.js';

let client = null;

export function getSupabase() {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'flora_atelier_auth',
      },
    });
  }
  return client;
}

export { isSupabaseConfigured };
