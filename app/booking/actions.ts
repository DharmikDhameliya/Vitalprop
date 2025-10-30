"use server"

import { createClient } from "@supabase/supabase-js"
import type { Appointment } from "@/lib/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function createAppointment(data: Omit<Appointment, "id" | "created_at" | "updated_at">) {
  try {
    // Create server-side client with service role key for secure operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert appointment into database
    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company || null,
          service: data.service,
          preferred_date: data.preferred_date,
          preferred_time: data.preferred_time,
          message: data.message || null,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        error: "Failed to create appointment. Please try again.",
      }
    }

    return {
      success: true,
      data: appointment,
      message: "Appointment booked successfully!",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
