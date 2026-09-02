import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iqkyadewdgeobsnamngb.supabase.co';
const supabaseAnonKey = 'sb_publishable_4TY5IT5yuidQe00-0zJxCA_ME5iqwdf';

// Armazenamento em memória simples para evitar qualquer conflito com o Expo Go
const memoryStorage = {
  storage: {} as Record<string, string>,
  getItem(key: string) {
    return this.storage[key] || null;
  },
  setItem(key: string, value: string) {
    this.storage[key] = value;
  },
  removeItem(key: string) {
    delete this.storage[key];
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: memoryStorage,
    autoRefreshToken: true,
    persistSession: false, // Desliga a persistência complexa para focar no cadastro limpo
    detectSessionInUrl: false,
  },
});