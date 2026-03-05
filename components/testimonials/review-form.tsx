"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Star, CheckCircle2 } from "lucide-react"

const procedures = ["استبدال مفصل الركبة", "استبدال مفصل الورك", "علاج بالخلايا الجذعية", "جراحة عظام أخرى"]

export function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    procedure: "",
    review: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Review submitted:", {
      ...formData,
      rating,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">شكراً لك على تقييمك</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">تم استلام تقييمك بنجاح. سيتم مراجعته ونشره قريباً.</p>
        <Button onClick={() => (window.location.href = "/testimonials")}>العودة للتقييمات</Button>
      </Card>
    )
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <Label className="text-base mb-3 block">التقييم *</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-base mb-2 block">
            الاسم *
          </Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="أدخل اسمك"
            className="text-base"
          />
        </div>

        {/* Age */}
        <div>
          <Label htmlFor="age" className="text-base mb-2 block">
            العمر (اختياري)
          </Label>
          <Input
            id="age"
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="أدخل عمرك"
            className="text-base"
          />
        </div>

        {/* Procedure */}
        <div>
          <Label htmlFor="procedure" className="text-base mb-2 block">
            نوع العملية أو العلاج *
          </Label>
          <select
            id="procedure"
            required
            value={formData.procedure}
            onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">اختر نوع العملية</option>
            {procedures.map((proc) => (
              <option key={proc} value={proc}>
                {proc}
              </option>
            ))}
          </select>
        </div>

        {/* Review */}
        <div>
          <Label htmlFor="review" className="text-base mb-2 block">
            تجربتك معنا *
          </Label>
          <Textarea
            id="review"
            required
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            placeholder="شارك تجربتك وانطباعك عن العلاج والخدمة..."
            rows={6}
            className="text-base resize-none"
          />
          <p className="text-sm text-muted-foreground mt-2">الحد الأدنى 50 حرف</p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full text-lg"
          disabled={isSubmitting || rating === 0 || formData.review.length < 50}
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">سيتم مراجعة تقييمك قبل نشره للتأكد من مصداقيته</p>
      </form>
    </Card>
  )
}
