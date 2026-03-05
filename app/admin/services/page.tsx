import { ServicesManager } from "@/components/admin/services-manager"

export default function AdminServicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold mb-2">إدارة الخدمات</h2>
        <p className="text-muted-foreground">أضف وعدل وحذف الخدمات الطبية</p>
      </div>

      <ServicesManager />
    </div>
  )
}
