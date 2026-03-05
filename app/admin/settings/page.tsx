import { SettingsManager } from "@/components/admin/settings-manager"

export default function AdminSettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold">الإعدادات</h1>
        <p className="text-muted-foreground mt-2">إدارة إعدادات الموقع والمعلومات العامة</p>
      </div>

      <SettingsManager />
    </div>
  )
}
