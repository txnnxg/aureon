import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// 1. Cole aqui a sua URL (a que resgatamos na tela Home do painel)
const supabaseUrl = 'https://iqkyadewdgeobsnamngb.supabase.co';

// 2. Cole aqui a sua Publishable Key (a que começa com sb_publishable_)
const supabaseAnonKey = 'sb_publishable_4TY5IT5yuiDqeO0-0zJxCA_ME5iqwdf';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});