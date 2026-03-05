"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronRight, Loader2, AlertCircle } from "lucide-react"

interface PatientInfoProps {
  patientName?: string
  email?: string
  phone?: string
  notes?: string
  onSubmit: (patientName: string, email: string, phone: string, notes: string) => void
  onBack: () => void
}

export function PatientInfo({
  patientName: initialName = "",
  email: initialEmail = "",
  phone: initialPhone = "",
  notes: initialNotes = "",
  onSubmit,
  onBack,
}: PatientInfoProps) {
  const [patientName, setPatientName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [notes, setNotes] = useState(initialNotes)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string>("")

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!patientName.trim()) {
      newErrors.patientName = "الاسم مطلوب"
    }

    if (!email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح"
    }

    if (!phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب"
    } else if (!/^[0-9+\s-()]+$/.test(phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError("")

    if (!validate()) return

    setIsSubmitting(true)

    try {
      onSubmit(patientName, email, phone, notes)
    } catch (error) {
      console.error("[v0] Error in patient info submit:", error)
      setApiError("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold mb-2 text-center">معلوماتك الشخصية</h2>
      <p className="text-muted-foreground text-center mb-8">أدخل معلوماتك للتواصل معك وتأكيد الموعد</p>

      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="patientName">الاسم الكامل *</Label>
          <Input
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="أدخل اسمك الكامل"
            className={errors.patientName ? "border-destructive" : ""}
          />
          {errors.patientName && <p className="text-sm text-destructive">{errors.patientName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">رقم الهاتف *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="مثال: 01234567890"
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="أي معلومات إضافية تود مشاركتها..."
            rows={4}
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 leading-relaxed">
            <strong>ملاحظة:</strong> سيتم مراجعة طلبك والتواصل معك خلال 24 ساعة لتأكيد الموعد. جميع معلوماتك محمية وفقاً
            لسياسة الخصوصية.
          </p>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            <ChevronRight className="h-4 w-4 ml-2" />
            السابق
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              "تأكيد الحجز"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
