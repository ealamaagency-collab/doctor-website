import { TestimonialsManager } from "@/components/admin/testimonials-manager"

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold mb-2">إدارة تجارب المرضى</h2>
        <p className="text-muted-foreground">أضف وعدل تجارب المرضى والتقييمات</p>
      </div>

      <TestimonialsManager />
    </div>
  )
}
