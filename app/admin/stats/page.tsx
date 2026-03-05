import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { StatsManager } from "@/components/admin/stats-manager"

export default function AdminStatsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-50" dir="rtl">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900">إدارة الإحصائيات</h1>
            <p className="text-zinc-600 mt-2">قم بإضافة وتعديل الإحصائيات التي تظهر في الصفحة الرئيسية</p>
          </div>
          <StatsManager />
        </div>
      </main>
    </div>
  )
}
