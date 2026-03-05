import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("stats")
      .select("id, key, value, label, icon")
      .order("id", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching public stats:", error)
      return NextResponse.json({ data: [] }, { status: 200 })
    }

    return NextResponse.json({ data: data || [] })
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ data: [] }, { status: 200 })
  }
}
