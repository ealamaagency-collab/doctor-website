"use client"

import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function FloatingWhatsApp() {
  const [whatsappNumber, setWhatsappNumber] = useState("+201234567890")

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/public/settings")
      const data = await response.json()
      if (data.settings?.whatsapp_number) {
        setWhatsappNumber(data.settings.whatsapp_number)
      }
    } catch (error) {
      console.error("Error fetching WhatsApp settings:", error)
    }
  }

  const message = "مرحباً، أود الاستفسار عن خدماتكم"
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
