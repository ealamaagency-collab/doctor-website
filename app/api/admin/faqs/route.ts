import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: faqs, error } = await supabase.from("faqs").select("*").order("display_order", { ascending: true })

    if (error) throw error

    return NextResponse.json({ faqs })
  } catch (error) {
    console.error("[v0] Error fetching FAQs:", error)
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("faqs")
      .insert([
        {
          question: body.question,
          answer: body.answer,
          category: body.category || "عام",
          display_order: body.display_order || 0,
          is_published: body.is_published ?? true,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ faq: data })
  } catch (error) {
    console.error("[v0] Error creating FAQ:", error)
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 })
  }
}
