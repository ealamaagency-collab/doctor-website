import { AppointmentsManager } from "@/components/admin/appointments-manager"

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold mb-2">إدارة المواعيد</h2>
        <p className="text-muted-foreground">عرض وإدارة مواعيد المرضى</p>
      </div>

      <AppointmentsManager />
    </div>
  )
}
