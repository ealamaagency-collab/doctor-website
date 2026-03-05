import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin_auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const body = await request.json()
    const { experience, operations, hospitals } = body

    console.log("[v0] Stats updated:", {
      experience,
      operations,
      hospitals,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Stats update error:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء الحفظ" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin_auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    // Return default stats (in production, fetch from database)
    return NextResponse.json({
      experience: 15,
      operations: 2500,
      hospitals: 8,
    })
  } catch (error) {
    console.error("[v0] Stats fetch error:", error)
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 })
  }
}
