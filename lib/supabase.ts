import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton pattern for client-side Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Types for our database
export interface Appointment {
  id?: string
  name: string
  email: string
  phone: string
  company?: string
  service: string
  preferred_date: string
  preferred_time: string
  message?: string
  status?: "pending" | "confirmed" | "cancelled"
  created_at?: string
  updated_at?: string
}
