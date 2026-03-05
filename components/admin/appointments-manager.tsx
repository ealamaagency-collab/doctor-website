"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, User, Phone, Mail, FileText, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface Appointment {
  id: string
  patient_name: string
  patient_email: string
  patient_phone: string
  service: string
  appointment_date: string
  appointment_time: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  created_at: string
}

const statusConfig = {
  pending: { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
  confirmed: { label: "مؤكد", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-700", icon: XCircle },
  completed: { label: "مكتمل", color: "bg-blue-100 text-blue-700", icon: CheckCircle2 },
}

export function AppointmentsManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadAppointments()
  }, [])

  useEffect(() => {
    filterAppointments()
  }, [appointments, filterStatus, searchQuery])

  const loadAppointments = async () => {
    try {
      console.log("[v0] Loading appointments...")
      setFetching(true)
      const response = await fetch("/api/admin/appointments")
      console.log("[v0] Response status:", response.status)

      const result = await response.json()
      console.log("[v0] Response data:", result)

      if (result.data) {
        console.log("[v0] Setting appointments, count:", result.data.length)
        setAppointments(result.data)
      } else {
        console.log("[v0] No data in response")
      }
    } catch (error) {
      console.error("[v0] Error loading appointments:", error)
      toast.error("فشل تحميل المواعيد")
    } finally {
      setFetching(false)
    }
  }

  const filterAppointments = () => {
    let filtered = appointments

    if (filterStatus !== "all") {
      filtered = filtered.filter((apt) => apt.status === filterStatus)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (apt) =>
          apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apt.patient_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apt.patient_phone.includes(searchQuery),
      )
    }

    setFilteredAppointments(filtered)
  }

  const updateStatus = async (id: string, status: Appointment["status"]) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast.success("تم تحديث حالة الموعد بنجاح")
      await loadAppointments()
    } catch (error) {
      console.error("[v0] Error updating appointment:", error)
      toast.error("فشل تحديث الموعد")
    } finally {
      setLoading(false)
    }
  }

  const deleteAppointment = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الموعد؟")) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("تم حذف الموعد بنجاح")
      await loadAppointments()
    } catch (error) {
      console.error("[v0] Error deleting appointment:", error)
      toast.error("فشل حذف الموعد")
    } finally {
      setLoading(false)
    }
  }

  const getStats = () => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      completed: appointments.filter((a) => a.status === "completed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    }
  }

  const stats = getStats()

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">إجمالي المواعيد</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">قيد الانتظار</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-sm text-muted-foreground">مؤكد</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">مكتمل</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <div className="text-sm text-muted-foreground">ملغي</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">البحث</Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم، البريد، أو الهاتف"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <select
                id="status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">قيد الانتظار</option>
                <option value="confirmed">مؤكد</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="grid gap-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">لا توجد مواعيد مطابقة للبحث</CardContent>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => {
            const StatusIcon = statusConfig[appointment.status].icon
            return (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Patient Info */}
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="text-lg font-bold">{appointment.patient_name}</h3>
                          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {appointment.patient_email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {appointment.patient_phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{new Date(appointment.appointment_date).toLocaleDateString("ar-EG")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{appointment.appointment_time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span>{appointment.service}</span>
                        </div>
                      </div>

                      {/* Notes */}
                      {appointment.notes && (
                        <div className="bg-muted p-3 rounded-md text-sm">
                          <strong>ملاحظات:</strong> {appointment.notes}
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <Badge className={statusConfig[appointment.status].color}>
                          <StatusIcon className="h-3 w-3 ml-1" />
                          {statusConfig[appointment.status].label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          تم الإنشاء: {new Date(appointment.created_at).toLocaleDateString("ar-EG")}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {appointment.status === "pending" && (
                        <>
                          <Button
                            onClick={() => updateStatus(appointment.id, "confirmed")}
                            disabled={loading}
                            size="sm"
                            className="gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            تأكيد
                          </Button>
                          <Button
                            onClick={() => updateStatus(appointment.id, "cancelled")}
                            disabled={loading}
                            size="sm"
                            variant="outline"
                            className="gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            إلغاء
                          </Button>
                        </>
                      )}
                      {appointment.status === "confirmed" && (
                        <Button
                          onClick={() => updateStatus(appointment.id, "completed")}
                          disabled={loading}
                          size="sm"
                          className="gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          إكمال
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteAppointment(appointment.id)}
                        disabled={loading}
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
