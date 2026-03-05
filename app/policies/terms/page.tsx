"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { useEffect, useState } from "react"

export default function TermsPage() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/public/settings")
      const data = await response.json()
      setContent(data.settings?.terms_conditions || "المحتوى غير متوفر حالياً")
    } catch (error) {
      console.error("Error fetching terms:", error)
      setContent("حدث خطأ في تحميل المحتوى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="py-16">
        <div className="container-medical max-w-4xl">
          <h1 className="text-4xl font-heading font-bold mb-8">الشروط والأحكام</h1>

          {loading ? (
            <div className="text-center py-12">جاري التحميل...</div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{content}</div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
