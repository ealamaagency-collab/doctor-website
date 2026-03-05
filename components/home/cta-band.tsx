"use client"

import Link from "next/link"
import { Calendar, Phone } from "lucide-react"
import { useEffect, useRef } from "react"

export function CTABand() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-on-scroll").forEach((el) => {
              el.classList.add("active")
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-medical-600 via-medical-500 to-blue-500" />

      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container-medical relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="reveal-on-scroll text-3xl md:text-5xl font-bold text-white text-balance mb-6 tracking-tight">
            حياتك تستحق أن تعود لحركتها الطبيعية
          </h2>
          <p className="reveal-on-scroll delay-100 text-lg md:text-xl mb-10 leading-relaxed text-white/90">
            لا تدع الألم يمنعك من الاستمتاع بحياتك. احجز موعدك الآن واحصل على استشارة طبية شاملة
          </p>
          <div className="reveal-on-scroll delay-200 flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/book"
              className="btn-shine hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold text-medical-600 bg-white rounded-full py-4 px-9 shadow-xl shadow-black/10"
            >
              <Calendar className="h-5 w-5" />
              <span>احجز موعد الآن</span>
            </Link>
            <Link
              href="tel:07710751000"
              className="hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold text-white bg-white/10 border border-white/30 rounded-full py-4 px-9 backdrop-blur-sm"
            >
              <Phone className="h-5 w-5" />
              <span>اتصل بنا</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
