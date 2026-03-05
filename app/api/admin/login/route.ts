import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_EMAIL = "admin@drihabyassin.com"
const ADMIN_PASSWORD = "admin123"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set authentication cookie
      const cookieStore = await cookies()
      cookieStore.set("admin_auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 })
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء تسجيل الدخول" }, { status: 500 })
  }
}
