"use client"

import Link from "next/link"
import { ArrowLeft, Activity, Bone, Sparkles, Droplets } from "lucide-react"
import { useEffect, useRef } from "react"

const services = [
  {
    icon: Bone,
    title: "تبديل مفصل الورك",
    description: "استبدال مفصل الورك بأحدث التقنيات الجراحية لاستعادة الحركة الطبيعية والتخلص من الألم المزمن",
    href: "/hip-replacement",
  },
  {
    icon: Activity,
    title: "تبديل مفصل الركبة",
    description: "جراحة استبدال مفصل الركبة المتقدمة لعلاج التهاب المفاصل والإصابات الشديدة",
    href: "/knee-replacement",
  },
  {
    icon: Sparkles,
    title: "الخلايا الجذعية",
    description: "علاج متطور باستخدام الخلايا الجذعية لتجديد الأنسجة وتخفيف الألم بطرق طبيعية",
    href: "/stem-cells",
  },
  {
    icon: Droplets,
    title: "العلاج بالبلازما (PRP)",
    description: "علاج خشونة المفاصل وتخفيف الألم بطريقة طبيعية باستخدام البلازما الغنية بالصفائح الدموية",
    href: "/prp-therapy",
  },
]

export function ServicesHighlight() {
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
    <section ref={sectionRef} className="py-24 bg-zinc-50">
      <div className="container-medical">
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-medical-600 font-bold text-sm tracking-wider uppercase mb-2 block">ماذا نقدم</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
              خدماتنا الطبية المتكاملة
            </h2>
            <p className="text-zinc-500 font-normal leading-relaxed text-lg">
              برامج علاجية مصممة خصيصاً لتلبية احتياجاتك، نمزج فيها بين العلم والخبرة لاستعادة حركتك.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden md:flex items-center text-sm font-bold text-zinc-800 hover:text-medical-600 transition-colors"
          >
            عرض كل الخدمات
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={index}
                href={service.href}
                className={`reveal-on-scroll delay-${(index + 1) * 100} group bg-white border border-zinc-100 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-zinc-200/50 hover:border-medical-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden cursor-pointer`}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-medical-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center justify-center text-medical-600 mb-8 group-hover:scale-110 group-hover:bg-medical-600 group-hover:text-white transition-all duration-500">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-medical-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed mb-8 flex-grow text-sm">{service.description}</p>
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-medical-100 group-hover:text-medical-600 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
