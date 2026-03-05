"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Save, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  content: string
  features: string[]
  benefits: string[]
  procedure_steps: string[]
  is_active: boolean
  display_order: number
}

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Service>>({})
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      setFetching(true)
      const response = await fetch("/api/admin/services")
      const result = await response.json()

      if (result.data) {
        setServices(result.data)
      }
    } catch (error) {
      console.error("[v0] Error loading services:", error)
      toast.error("فشل تحميل الخدمات")
    } finally {
      setFetching(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    try {
      setLoading(true)

      if (editingId) {
        // Update existing service
        const response = await fetch(`/api/admin/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error("Failed to update")

        toast.success("تم تحديث الخدمة بنجاح")
      } else {
        // Add new service
        const newService = {
          ...formData,
          icon: formData.icon || "Activity",
          content: formData.content || formData.description || "",
          features: formData.features || [],
          benefits: formData.benefits || [],
          procedure_steps: formData.procedure_steps || [],
          is_active: true,
          display_order: services.length,
        }

        const response = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newService),
        })

        if (!response.ok) throw new Error("Failed to create")

        toast.success("تم إضافة الخدمة بنجاح")
      }

      await loadServices()
      setEditingId(null)
      setFormData({})
    } catch (error) {
      console.error("[v0] Error saving service:", error)
      toast.error("فشل حفظ الخدمة")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingId(service.id)
    setFormData(service)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("تم حذف الخدمة بنجاح")
      await loadServices()
    } catch (error) {
      console.error("[v0] Error deleting service:", error)
      toast.error("فشل حذف الخدمة")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({})
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}</CardTitle>
          <CardDescription>املأ البيانات التالية لإضافة أو تعديل خدمة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان الخدمة *</Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: تبديل مفصل الورك"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">الرابط (Slug) *</Label>
              <Input
                id="slug"
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="مثال: hip-replacement"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف المختصر *</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="وصف مختصر للخدمة"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">المحتوى الكامل</Label>
            <Textarea
              id="content"
              value={formData.content || ""}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="المحتوى التفصيلي للخدمة"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">الأيقونة (Lucide Icon Name)</Label>
            <Input
              id="icon"
              value={formData.icon || ""}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="Activity"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editingId ? "حفظ التعديلات" : "إضافة الخدمة"}
            </Button>
            {editingId && (
              <Button onClick={handleCancel} variant="outline" className="gap-2 bg-transparent">
                <X className="h-4 w-4" />
                إلغاء
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">/{service.slug}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(service)} variant="outline" size="icon" disabled={loading}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(service.id)}
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
