import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const supabase = await createServerClient()

    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("is_published", true)
      .single()

    if (error) {
      console.error("[v0] Error fetching blog post:", error)
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ data: post })
  } catch (error) {
    console.error("[v0] Error in blog post API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
