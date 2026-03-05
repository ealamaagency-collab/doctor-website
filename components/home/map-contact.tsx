"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function MapContact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [contactInfo, setContactInfo] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch contact info from settings
    const fetchContactInfo = async () => {
      try {
        const response = await fetch("/api/public/settings")
        if (!response.ok) throw new Error("Failed to fetch settings")
        const data = await response.json()

        // Map settings data to contact info format
        const info = [
          {
            icon: MapPin,
            title: "العنوان",
            content: data.address || "العراق – بغداد – الحارثية، شارع الكندي\nداخل مستشفى الاميرات الأهلي",
          },
          {
            icon: Phone,
            title: "الهاتف",
            phones: ["07890751000", "07710751000"],
            content: "07890751000\n07710751000",
            isPhone: true,
          },
          {
            icon: Mail,
            title: "البريد الإلكتروني",
            content: data.email || "info@drehabyassin.com",
            isEmail: true,
          },
          {
            icon: Clock,
            title: "ساعات العمل",
            content: data.working_hours || "الأحد - الأربعاء: 12:00 م - 03:00 م\nالخميس - الجمعة - السبت: مغلق",
          },
        ]

        setContactInfo(info)
      } catch (error) {
        console.log("[v0] Error fetching contact info, using defaults:", error)
        setContactInfo([
          {
            icon: MapPin,
            title: "العنوان",
            content: "العراق – بغداد – الحارثية، شارع الكندي\nداخل مستشفى الاميرات الأهلي",
          },
          {
            icon: Phone,
            title: "الهاتف",
            phones: ["07890751000", "07710751000"],
            content: "07890751000\n07710751000",
            isPhone: true,
          },
          {
            icon: Mail,
            title: "البريد الإلكتروني",
            content: "info@drehabyassin.com",
            isEmail: true,
          },
          {
            icon: Clock,
            title: "ساعات العمل",
            content: "الأحد - الأربعاء: 12:00 م - 03:00 م\nالخميس - الجمعة - السبت: مغلق",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()

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
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container-medical">
        <div className="reveal-on-scroll text-center mb-16">
          <span className="text-medical-600 font-bold text-sm tracking-wider uppercase mb-2 block">تواصل معنا</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">موقعنا</h2>
          <p className="text-lg text-zinc-500 leading-relaxed">نحن هنا لخدمتك. تفضل بزيارتنا أو تواصل معنا</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Map */}
          <div className="reveal-on-scroll delay-100 rounded-[2rem] overflow-hidden shadow-xl h-[450px] border border-zinc-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d44.3661!3d33.3406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIwJzI2LjIiTiA0NMKwMjEnNTguMCJF!5e0!3m2!1sen!2siq!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Info */}
          <div className="reveal-on-scroll delay-200 space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-zinc-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-5">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className="flex gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 hover:shadow-lg hover:border-medical-100 transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5 text-medical-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 mb-1">{item.title}</h3>
                        {item.isPhone && item.phones ? (
                          <div className="space-y-2">
                            {item.phones.map((phone: string, phoneIndex: number) => (
                              <a
                                key={phoneIndex}
                                href={`tel:${phone}`}
                                className="text-zinc-500 text-sm leading-relaxed hover:text-medical-600 transition-colors block"
                                dir="ltr"
                              >
                                {phone.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3")}
                              </a>
                            ))}
                          </div>
                        ) : item.isEmail ? (
                          <a
                            href={`mailto:${item.content}`}
                            className="text-zinc-500 text-sm leading-relaxed hover:text-medical-600 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-zinc-500 text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <a
              href="https://maps.app.goo.gl/Y1etJUx2FLxyefCR6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 hover:bg-medical-700 hover:-translate-y-1 transition-all duration-300 text-sm font-bold text-white bg-medical-600 rounded-full py-4 px-8 shadow-xl shadow-medical-600/20"
            >
              <MapPin className="w-5 h-5" />
              <span>افتح في خرائط جوجل</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
