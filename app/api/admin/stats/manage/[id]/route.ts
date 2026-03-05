import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin_auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { key, value, label, icon } = body

    const supabase = await createServerClient()

    const updateData: Record<string, any> = { key, value, label, icon }

    const { data, error } = await supabase.from("stats").update(updateData).eq("id", id).select().single()

    if (error) {
      console.error("[v0] Error updating stat:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, success: true })
  } catch (error: any) {
    console.error("[v0] Error updating stat:", error)
    return NextResponse.json({ error: error.message || "حدث خطأ أثناء التحديث" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin_auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const { id } = await params

    const supabase = await createServerClient()
    const { error } = await supabase.from("stats").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting stat:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error deleting stat:", error)
    return NextResponse.json({ error: error.message || "حدث خطأ أثناء الحذف" }, { status: 500 })
  }
}
