"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Edit, Trash2, Save, X, Loader2, CheckCircle2, Plus } from "lucide-react"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Testimonial {
  id: string
  patient_name: string
  age?: number
  procedure: string
  comment: string
  rating: number
  date: string
  is_verified: boolean
  is_featured: boolean
  is_approved: boolean
}

const procedureOptions = [
  "استبدال مفصل الركبة",
  "استبدال مفصل الورك",
  "علاج بالخلايا الجذعية",
  "العلاج بالبلازما (PRP)",
  "جراحة الكسور",
  "أخرى",
]

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    rating: 5,
    is_verified: true,
    is_approved: true,
    is_featured: false,
    date: new Date().toISOString().split("T")[0],
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      setFetching(true)
      const response = await fetch("/api/admin/testimonials")
      const result = await response.json()

      if (result.data) {
        setTestimonials(result.data)
      }
    } catch (error) {
      console.error("Error loading testimonials:", error)
      toast.error("فشل تحميل التجارب")
    } finally {
      setFetching(false)
    }
  }

  const handleSave = async () => {
    if (!formData.patient_name || !formData.procedure || !formData.comment || !formData.rating) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    try {
      setLoading(true)

      if (editingId) {
        const response = await fetch(`/api/admin/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error("Failed to update")

        toast.success("تم تحديث التجربة بنجاح")
      } else {
        const newTestimonial = {
          ...formData,
          date: formData.date || new Date().toISOString().split("T")[0],
        }

        const response = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTestimonial),
        })

        if (!response.ok) throw new Error("Failed to create")

        toast.success("تم إضافة التجربة بنجاح")
      }

      await loadTestimonials()
      handleCancel()
    } catch (error) {
      console.error("Error saving testimonial:", error)
      toast.error("فشل حفظ التجربة")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setFormData(testimonial)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه التجربة؟")) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("تم حذف التجربة بنجاح")
      await loadTestimonials()
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast.error("فشل حذف التجربة")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setShowForm(false)
    setFormData({
      rating: 5,
      is_verified: true,
      is_approved: true,
      is_featured: false,
      date: new Date().toISOString().split("T")[0],
    })
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      {!showForm && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">تجارب المرضى</h2>
            <p className="text-sm text-slate-500">إدارة وتعديل تجارب المرضى المعروضة في الموقع</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2 bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4" />
            إضافة تجربة جديدة
          </Button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="border-teal-200 shadow-lg">
          <CardHeader className="bg-teal-50 border-b border-teal-100">
            <CardTitle className="text-teal-900">{editingId ? "تعديل التجربة" : "إضافة تجربة جديدة"}</CardTitle>
            <CardDescription>املأ البيانات التالية لإضافة أو تعديل تجربة مريض</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient_name">اسم المريض *</Label>
                <Input
                  id="patient_name"
                  value={formData.patient_name || ""}
                  onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                  placeholder="مثال: أحمد محمد"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="procedure">نوع العملية *</Label>
                <Select
                  value={formData.procedure || ""}
                  onValueChange={(value) => setFormData({ ...formData, procedure: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع العملية" />
                  </SelectTrigger>
                  <SelectContent>
                    {procedureOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">التجربة والتقييم *</Label>
              <Textarea
                id="comment"
                value={formData.comment || ""}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="اكتب تجربة المريض هنا... يمكن استخدام اللهجة العامية"
                rows={4}
              />
              <p className="text-xs text-slate-500">
                نصيحة: استخدم أساليب متنوعة بين الفصحى والعامية لتبدو التجارب طبيعية
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>التقييم *</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (formData.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">تاريخ التجربة</Label>
                <Input
                  id="date"
                  value={formData.date || ""}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="مثال: يناير ٢٠٢٤"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Switch
                  id="is_verified"
                  checked={formData.is_verified}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_verified: checked })}
                />
                <Label htmlFor="is_verified" className="cursor-pointer">
                  موثق
                </Label>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Switch
                  id="is_approved"
                  checked={formData.is_approved}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_approved: checked })}
                />
                <Label htmlFor="is_approved" className="cursor-pointer">
                  معتمد للنشر
                </Label>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured" className="cursor-pointer">
                  مميز
                </Label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} disabled={loading} className="gap-2 bg-teal-600 hover:bg-teal-700">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {editingId ? "حفظ التعديلات" : "إضافة التجربة"}
              </Button>
              <Button onClick={handleCancel} variant="outline" className="gap-2 bg-transparent">
                <X className="h-4 w-4" />
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-slate-400 mb-4">
            <Star className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg">لا توجد تجارب مرضى حالياً</p>
            <p className="text-sm">اضغط على "إضافة تجربة جديدة" للبدء</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                        {testimonial.patient_name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900">{testimonial.patient_name}</h3>
                          {testimonial.is_verified && <CheckCircle2 className="h-4 w-4 text-teal-500" />}
                        </div>
                        <p className="text-sm text-slate-500">{testimonial.procedure}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-slate-600 mb-3 leading-relaxed">{testimonial.comment}</p>

                    <div className="flex gap-2 items-center text-xs">
                      <span className="text-slate-400">{testimonial.date}</span>
                      {testimonial.is_featured && (
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">مميز</span>
                      )}
                      {testimonial.is_approved ? (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">معتمد</span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">قيد المراجعة</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(testimonial)}
                      variant="outline"
                      size="icon"
                      disabled={loading}
                      className="hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(testimonial.id)}
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
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
      )}
    </div>
  )
}
