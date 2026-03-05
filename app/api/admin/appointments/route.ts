import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("[v0] Fetching appointments from Supabase...")
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: false })
      .order("appointment_time", { ascending: false })

    if (error) {
      console.error("[v0] Supabase fetch error:", error)
      throw error
    }

    console.log("[v0] Fetched appointments count:", data?.length || 0)
    console.log("[v0] Appointments data:", data)

    return NextResponse.json({ data })
  } catch (error) {
    console.error("[v0] Error fetching appointments:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch appointments",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
