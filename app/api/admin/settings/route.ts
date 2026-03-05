import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: settings, error } = await supabase.from("settings").select("*")

    if (error) throw error

    // Convert array to object for easier access
    const settingsObj = settings.reduce((acc: any, setting: any) => {
      acc[setting.key] = setting.value
      return acc
    }, {})

    return NextResponse.json({ settings: settingsObj })
  } catch (error) {
    console.error("[v0] Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    // Update multiple settings
    const updates = Object.entries(body).map(([key, value]) => ({
      key,
      value: value as string,
      updated_at: new Date().toISOString(),
    }))

    for (const update of updates) {
      await supabase.from("settings").upsert(update, { onConflict: "key" })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
