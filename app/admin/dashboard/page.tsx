"use client"

import { cn } from "@/lib/utils"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, Calendar, TrendingUp, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DashboardStats {
  counts: {
    services: number
    testimonials: number
    blog: number
    appointments: number
  }
  appointmentsByStatus: {
    pending: number
    confirmed: number
    completed: number
    cancelled: number
  }
  blogByStatus: {
    published: number
    draft: number
  }
  recentAppointments: any[]
  appointmentsTrend: { month: string; count: number }[]
}

const statusColors: { [key: string]: string } = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
}

const statusLabels: { [key: string]: string } = {
  pending: "قيد الانتظار",
  confirmed: "مؤكد",
  completed: "مكتمل",
  cancelled: "ملغي",
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!stats) {
    return <div className="text-center text-muted-foreground">فشل في تحميل الإحصائيات</div>
  }

  const pieData = [
    { name: "قيد الانتظار", value: stats.appointmentsByStatus.pending },
    { name: "مؤكد", value: stats.appointmentsByStatus.confirmed },
    { name: "مكتمل", value: stats.appointmentsByStatus.completed },
    { name: "ملغي", value: stats.appointmentsByStatus.cancelled },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-heading font-bold mb-2">نظرة عامة</h2>
        <p className="text-muted-foreground">ملخص شامل لأداء العيادة والموقع</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Appointments Card */}
        <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المواعيد</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.counts.appointments}</div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600 font-medium">{stats.appointmentsByStatus.confirmed} مؤكد</span>
            </p>
          </CardContent>
        </Card>

        {/* Testimonials Card */}
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">تجارب المرضى</CardTitle>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.counts.testimonials}</div>
            <p className="text-xs text-muted-foreground mt-2">تجربة منشورة</p>
          </CardContent>
        </Card>

        {/* Blog Posts Card */}
        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">المقالات</CardTitle>
            <FileText className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.counts.blog}</div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600 font-medium">{stats.blogByStatus.published} منشور</span>
              {" • "}
              <span className="text-yellow-600 font-medium">{stats.blogByStatus.draft} مسودة</span>
            </p>
          </CardContent>
        </Card>

        {/* Services Card */}
        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">الخدمات الطبية</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.counts.services}</div>
            <p className="text-xs text-muted-foreground mt-2">خدمة متاحة</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Appointments Trend Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              اتجاه المواعيد
            </CardTitle>
            <CardDescription>عدد المواعيد خلال الأشهر الستة الماضية</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "المواعيد",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.appointmentsTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="count" stroke="var(--color-count)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Appointments Status Distribution */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              توزيع حالات المواعيد
            </CardTitle>
            <CardDescription>نسبة المواعيد حسب الحالة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            آخر المواعيد
          </CardTitle>
          <CardDescription>أحدث 5 مواعيد تم حجزها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentAppointments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">لا توجد مواعيد حتى الآن</p>
            ) : (
              stats.recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{appointment.patient_name}</h4>
                      <Badge variant="outline" className={cn("text-white", statusColors[appointment.status])}>
                        {statusLabels[appointment.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(appointment.appointment_date).toLocaleDateString("ar-EG")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {appointment.appointment_time}
                      </span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-primary">{appointment.service}</p>
                    <p className="text-xs text-muted-foreground">{appointment.patient_phone}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
