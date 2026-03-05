import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin_auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("stats")
      .select("id, key, value, label, icon")
      .order("id", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching stats:", error)
      return NextResponse.json({ error: error.message, data: [] }, { status: 500 })
    }

    return NextResponse.json({ data: data || [] })
  } catch (error: any) {
    console.error("[v0] Error in GET stats:", error)
    return NextResponse.json({ error: "حدث خطأ", data: [] }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin_auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const body = await request.json()
    const { key, value, label, icon } = body

    if (!key || !value || !label) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    const supabase = await createServerClient()

    const insertData = {
      key: key.trim(),
      value: value.trim(),
      label: label.trim(),
      icon: icon || "Award",
    }

    const { data, error } = await supabase
      .from("stats")
      .insert([insertData])
      .select("id, key, value, label, icon")
      .single()

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, success: true })
  } catch (error: any) {
    console.error("[v0] Error adding stat:", error)
    return NextResponse.json({ error: error.message || "حدث خطأ أثناء الإضافة" }, { status: 500 })
  }
}
