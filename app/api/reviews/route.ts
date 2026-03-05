import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, age, procedure, review, rating } = body

    // Validate required fields
    if (!name || !procedure || !review || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 })
    }

    // Log review data
    console.log("[v0] Review submitted:", {
      name,
      age: age || null,
      procedure,
      review,
      rating,
      status: "pending",
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "تم استلام تقييمك بنجاح",
    })
  } catch (error) {
    console.error("[v0] Review submission error:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
