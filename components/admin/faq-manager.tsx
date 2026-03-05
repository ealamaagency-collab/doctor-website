"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Edit2, Trash2, Save, X } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  display_order: number
  is_published: boolean
}

export function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "عام",
    display_order: 0,
    is_published: true,
  })

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch("/api/admin/faqs")
      const data = await response.json()
      setFaqs(data.faqs || [])
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        // Update existing FAQ
        const response = await fetch(`/api/admin/faqs/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          await fetchFAQs()
          resetForm()
        }
      } else {
        // Create new FAQ
        const response = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          await fetchFAQs()
          resetForm()
        }
      }
    } catch (error) {
      console.error("Error saving FAQ:", error)
    }
  }

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      display_order: faq.display_order,
      is_published: faq.is_published,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا السؤال؟")) return

    try {
      const response = await fetch(`/api/admin/faqs/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchFAQs()
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      question: "",
      answer: "",
      category: "عام",
      display_order: 0,
      is_published: true,
    })
  }

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "تعديل السؤال" : "إضافة سؤال جديد"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">التصنيف</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="مثال: العمليات الجراحية"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">ترتيب العرض</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">السؤال *</Label>
            <Input
              id="question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="أدخل السؤال"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">الإجابة *</Label>
            <Textarea
              id="answer"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="أدخل الإجابة"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
            />
            <Label>نشر السؤال</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              <Save className="ml-2 h-4 w-4" />
              {editingId ? "تحديث" : "إضافة"}
            </Button>

            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                <X className="ml-2 h-4 w-4" />
                إلغاء
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* FAQs List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">الأسئلة الحالية ({faqs.length})</h2>

        {faqs.map((faq) => (
          <Card key={faq.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{faq.category}</span>
                  <span className="text-xs text-muted-foreground">ترتيب: {faq.display_order}</span>
                  {!faq.is_published && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">غير منشور</span>
                  )}
                </div>

                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(faq)}>
                  <Edit2 className="h-4 w-4" />
                </Button>

                <Button size="sm" variant="outline" onClick={() => handleDelete(faq.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {faqs.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            لا توجد أسئلة شائعة حالياً. قم بإضافة السؤال الأول!
          </Card>
        )}
      </div>
    </div>
  )
}
