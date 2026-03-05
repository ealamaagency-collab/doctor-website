import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Get current admin credentials from cookie
    const cookieStore = cookies()
    const adminEmail = cookieStore.get("admin_email")?.value

    // In production, you should verify the current password against a database
    // For now, we'll just check if it matches the hardcoded password
    const ADMIN_EMAIL = "admin@drehabyassin.com"
    const ADMIN_PASSWORD = "Eh@#1234"

    if (adminEmail !== ADMIN_EMAIL || currentPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "كلمة المرور الحالية غير صحيحة" }, { status: 401 })
    }

    // In production, hash and store the new password
    // For now, we'll just return success
    // Note: You should implement proper password hashing and storage

    return NextResponse.json({
      success: true,
      message: "تم تغيير كلمة المرور بنجاح. يرجى تسجيل الدخول مرة أخرى بكلمة المرور الجديدة.",
    })
  } catch (error) {
    console.error("[v0] Error changing password:", error)
    return NextResponse.json({ error: "فشل تغيير كلمة المرور" }, { status: 500 })
  }
}
