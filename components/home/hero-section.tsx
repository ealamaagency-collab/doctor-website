"use client"

import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Users } from "lucide-react"
import { useEffect, useRef } from "react"

export function HeroSection() {
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
    <section ref={sectionRef} className="relative min-h-[90vh] overflow-hidden bg-grid-pattern">
      {/* Background Decoration Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 right-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container-medical py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="lg:col-span-7 flex flex-col pt-4">
            {/* Status Badge */}
            <div className="reveal-on-scroll inline-flex glass-card border border-medical-100 text-medical-700 w-max rounded-full mb-8 py-2 px-5 items-center gap-2.5 shadow-sm hover:shadow-md transition-shadow cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-medical-500" />
              </span>
              <span className="text-xs font-bold tracking-wide">نستقبل الحالات الجديدة الآن</span>
            </div>

            {/* Main Heading */}
            <h1 className="reveal-on-scroll delay-100 leading-[1.15] text-5xl lg:text-7xl font-bold text-zinc-900 tracking-tight mb-8">
              عودة إلى الحركة…
              <br />
              <span className="text-gradient-medical inline-block mt-2">بدون ألـم.</span>
            </h1>

            {/* Description */}
            <p className="reveal-on-scroll delay-200 text-lg text-zinc-500 font-medium max-w-lg mb-12 leading-relaxed border-r-4 border-medical-100 pr-6">
              د. إيهاب ياسين – استشاري جراحة العظام والمفاصل. نستخدم أحدث تقنيات الجراحة والعلاج لاستعادة حركتك وحياتك
              الطبيعية.
            </p>

            {/* CTA Buttons */}
            <div className="reveal-on-scroll delay-300 flex flex-col sm:flex-row gap-5">
              <Link
                href="/book"
                className="btn-shine hover:bg-medical-700 hover:-translate-y-1 transition-all duration-300 flex group text-sm font-bold text-white bg-medical-600 rounded-full py-4 px-9 shadow-xl shadow-medical-600/20 gap-2 items-center justify-center"
              >
                <span>احجز استشارة</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:-translate-x-1 transition-transform rotate-180"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="https://wa.me/9647710751000"
                target="_blank"
                className="hover:bg-zinc-50 hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex text-sm font-bold text-zinc-600 bg-white border border-zinc-200 rounded-full py-4 px-9 shadow-sm hover:shadow-lg gap-2 items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 text-zinc-400" />
                <span>استشارة واتساب</span>
              </Link>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative h-full min-h-[450px] reveal-on-scroll delay-200 hidden lg:block">
            <div className="relative w-full h-full animate-float-slow">
              {/* Main Image Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-white rounded-[3rem] border border-white shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image
                  src="/images/untitled-1.png"
                  alt="د. إيهاب ياسين - استشاري جراحة العظام والمفاصل"
                  fill
                  className="object-cover object-top transition-transform duration-1000 hover:scale-105"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent" />
              </div>

              {/* Floating Stats Card 1 */}
              <div
                className="absolute -bottom-8 -right-8 glass-card p-5 rounded-3xl border border-white shadow-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-medical-50 flex items-center justify-center text-medical-600 ring-4 ring-white shadow-sm">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                      المرضى المتعافون
                    </p>
                    <p className="text-3xl font-extrabold text-zinc-900 tracking-tight">+1,000</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card 2 */}
              <div
                className="absolute top-12 -left-8 glass-card px-5 py-3 rounded-2xl border border-white shadow-lg animate-float"
                style={{ animationDelay: "2.5s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 space-x-reverse">
                    <div className="w-8 h-8 rounded-full bg-medical-200 border-2 border-white" />
                    
                    
                  </div>
                  <div className="text-xs font-bold text-zinc-700 pr-2">Dr.ehab yassin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
