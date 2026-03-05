import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("[v0] Booking API called")
    const supabase = await createClient()
    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { patient_name, patient_email, patient_phone, service, appointment_date, appointment_time, notes } = body

    // Validate required fields
    if (!patient_name || !patient_email || !patient_phone || !service || !appointment_date || !appointment_time) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("[v0] Attempting to insert appointment into Supabase...")

    // Insert appointment into Supabase
    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          patient_name,
          patient_email,
          patient_phone,
          service,
          appointment_date,
          appointment_time,
          notes: notes || null,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      console.error("[v0] Error details:", JSON.stringify(error, null, 2))
      throw error
    }

    console.log("[v0] Appointment created successfully:", data)

    return NextResponse.json({
      success: true,
      message: "تم استلام طلب الحجز بنجاح",
      data,
    })
  } catch (error) {
    console.error("[v0] Booking error:", error)
    return NextResponse.json(
      {
        error: "Failed to create appointment",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
