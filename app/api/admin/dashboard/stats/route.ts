import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    // Get counts for all entities
    const [servicesResult, testimonialsResult, blogResult, appointmentsResult] = await Promise.all([
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("appointments").select("*", { count: "exact", head: true }),
    ])

    // Get appointments by status
    const { data: appointmentsByStatus } = await supabase
      .from("appointments")
      .select("status")
      .then((result) => {
        const statusCounts = {
          pending: 0,
          confirmed: 0,
          completed: 0,
          cancelled: 0,
        }
        result.data?.forEach((apt: any) => {
          statusCounts[apt.status as keyof typeof statusCounts]++
        })
        return { data: statusCounts }
      })

    // Get blog posts by status
    const { data: blogByStatus } = await supabase
      .from("blog_posts")
      .select("published")
      .then((result) => {
        const published = result.data?.filter((post: any) => post.published).length || 0
        const draft = (result.data?.length || 0) - published
        return { data: { published, draft } }
      })

    // Get recent appointments
    const { data: recentAppointments } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)

    // Get monthly appointments trend (last 6 months)
    const { data: appointmentsTrend } = await supabase
      .from("appointments")
      .select("appointment_date")
      .gte("appointment_date", new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString())
      .then((result) => {
        const monthCounts: { [key: string]: number } = {}
        result.data?.forEach((apt: any) => {
          const month = new Date(apt.appointment_date).toLocaleDateString("ar-EG", { month: "short" })
          monthCounts[month] = (monthCounts[month] || 0) + 1
        })
        return {
          data: Object.entries(monthCounts).map(([month, count]) => ({ month, count })),
        }
      })

    return NextResponse.json({
      counts: {
        services: servicesResult.count || 0,
        testimonials: testimonialsResult.count || 0,
        blog: blogResult.count || 0,
        appointments: appointmentsResult.count || 0,
      },
      appointmentsByStatus,
      blogByStatus,
      recentAppointments,
      appointmentsTrend,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
