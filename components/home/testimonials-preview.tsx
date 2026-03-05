"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronRight, ChevronLeft, Quote, CheckCircle } from "lucide-react"

interface Testimonial {
  id: string
  patient_name: string
  age?: number
  procedure: string
  comment: string
  rating: number
  date: string
  is_verified: boolean
}

export function TestimonialsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/public/testimonials")
        const result = await response.json()

        if (result.data && result.data.length > 0) {
          setTestimonials(result.data)
        } else {
          setTestimonials([])
        }
      } catch (error) {
        console.error("Error loading testimonials:", error)
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

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

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (testimonials.length === 0) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  if (!loading && testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />

      <div className="container-medical relative z-10">
        <div className="reveal-on-scroll text-center mb-16">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 font-semibold text-sm tracking-wider uppercase mb-4 rounded-full">
            آراء المرضى
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">تجارب مرضانا</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            استمع إلى قصص نجاح مرضانا وكيف ساعدناهم على العودة لحياتهم الطبيعية
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {loading ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-12 animate-pulse">
              <div className="flex justify-center mb-8 gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-7 w-7 bg-slate-200 rounded" />
                ))}
              </div>
              <div className="h-6 bg-slate-200 rounded w-3/4 mx-auto mb-4" />
              <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto mb-4" />
              <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto mb-10" />
              <div className="text-center">
                <div className="h-6 bg-slate-200 rounded w-32 mx-auto mb-2" />
                <div className="h-4 bg-slate-200 rounded w-40 mx-auto" />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-12 relative">
              {/* Quote icon */}
              <div className="absolute -top-6 right-8 w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 rotate-3">
                <Quote className="w-7 h-7 text-white" />
              </div>

              {/* Rating stars */}
              <div className="flex justify-center mb-8 gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-7 w-7 ${i < currentTestimonial.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-xl md:text-2xl text-center leading-relaxed mb-10 text-slate-700 font-medium">
                "{currentTestimonial.comment}"
              </blockquote>

              {/* Patient info */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="font-bold text-xl text-slate-900">{currentTestimonial.patient_name}</span>
                  {currentTestimonial.is_verified && <CheckCircle className="w-5 h-5 text-teal-500 fill-teal-100" />}
                </div>
                <div className="text-sm text-slate-500 font-medium">{currentTestimonial.procedure}</div>
                {currentTestimonial.age && (
                  <div className="text-xs text-slate-400 mt-1">{currentTestimonial.age} سنة</div>
                )}
                <div className="text-xs text-slate-400 mt-1">{currentTestimonial.date}</div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {!loading && testimonials.length > 1 && (
            <>
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={prev}
                  className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-600 transition-all duration-300 shadow-lg shadow-slate-200/50"
                  aria-label="الشهادة السابقة"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <button
                  onClick={next}
                  className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-600 transition-all duration-300 shadow-lg shadow-slate-200/50"
                  aria-label="الشهادة التالية"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-teal-500 w-10 shadow-md shadow-teal-500/30"
                        : "bg-slate-300 w-3 hover:bg-slate-400"
                    }`}
                    aria-label={`الانتقال إلى الشهادة ${index + 1}`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="text-center mt-6 text-sm text-slate-500">
                {currentIndex + 1} من {testimonials.length}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
