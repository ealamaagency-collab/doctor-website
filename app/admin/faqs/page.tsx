import { FAQManager } from "@/components/admin/faq-manager"

export default function AdminFAQsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold">إدارة الأسئلة الشائعة</h1>
        <p className="text-muted-foreground mt-2">إضافة وتعديل الأسئلة الشائعة التي تظهر للزوار</p>
      </div>

      <FAQManager />
    </div>
  )
}
