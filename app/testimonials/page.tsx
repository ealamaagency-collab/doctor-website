import type { Metadata } from "next"
import { Star, Quote, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createServerClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "آراء المرضى | د. إيهاب ياسين",
  description: "اقرأ تجارب وآراء مرضانا السابقين مع د. إيهاب ياسين في جراحة العظام واستبدال المفاصل",
}

async function getTestimonials() {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("testimonials")
      .select("id, patient_name, age, procedure, comment, rating, date, is_verified, created_at")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching testimonials from database:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("[v0] Error fetching testimonials:", error)
    return []
  }
}

const stats = [
  { label: "مريض راضٍ", value: "500+" },
  { label: "تقييم 5 نجوم", value: "98%" },
  { label: "سنوات خبرة", value: "20+" },
  { label: "عملية ناجحة", value: "1000+" },
]

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 font-semibold text-sm tracking-wider uppercase mb-4 rounded-full">
                آراء المرضى
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">تجارب مرضانا</h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                نفخر بثقة مرضانا ونسعد بمشاركة تجاربهم الناجحة معنا
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            {testimonials.length === 0 ? (
              <div className="text-center py-16">
                <Quote className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">لا توجد تجارب متاحة حالياً</h3>
                <p className="text-slate-500">سيتم إضافة تجارب المرضى قريباً</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial: any) => (
                  <div
                    key={testimonial.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 relative hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Quote icon */}
                    <div className="absolute -top-4 right-6 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 rotate-3">
                      <Quote className="w-6 h-6 text-white" />
                    </div>

                    {/* Rating stars */}
                    <div className="flex justify-center mb-6 gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    <blockquote className="text-lg text-center leading-relaxed mb-8 text-slate-700 font-medium min-h-[120px]">
                      "{testimonial.comment}"
                    </blockquote>

                    {/* Patient info */}
                    <div className="text-center border-t border-slate-100 pt-6">
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="font-bold text-lg text-slate-900">{testimonial.patient_name}</span>
                        {testimonial.is_verified && <CheckCircle className="w-5 h-5 text-teal-500 fill-teal-100" />}
                      </div>
                      <div className="text-sm text-slate-500 font-medium">{testimonial.procedure}</div>
                      {testimonial.age && <div className="text-xs text-slate-400 mt-1">{testimonial.age} سنة</div>}
                      <div className="text-xs text-slate-400 mt-1">{testimonial.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">هل لديك تجربة معنا؟</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">رأيك يهمنا ويساعد الآخرين في اتخاذ القرار الصحيح</p>
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg">
                <Link href="/contact">تواصل معنا</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
