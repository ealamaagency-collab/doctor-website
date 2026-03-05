import { BlogManager } from "@/components/admin/blog-manager"

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold mb-2">إدارة المدونة</h2>
        <p className="text-muted-foreground">أضف وعدل ونشر مقالات المدونة</p>
      </div>

      <BlogManager />
    </div>
  )
}
