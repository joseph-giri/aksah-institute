import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iiqgxdqdxidqohdjxcex.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_pG4GZq4HMIK4qgkq7d6Myg_TrjJQHxJ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
