"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { MapPin, Phone, Mail, Clock, Send, Loader2, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب"
    } else if (!/^[0-9+\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح"
    }

    if (!formData.message.trim()) {
      newErrors.message = "الرسالة مطلوبة"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call - in production, submit to Airtable
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", phone: "", message: "" })
    }, 1000)
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-brand-50 to-white py-16">
          <div className="container-medical">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-balance mb-6">تواصل معنا</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                نحن هنا للإجابة على استفساراتك ومساعدتك في حجز موعدك
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container-medical">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">معلومات التواصل</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    يمكنك التواصل معنا من خلال أي من الطرق التالية، وسنكون سعداء بخدمتك
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">العنوان</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            العراق – بغداد – الحارثية
                            <br />
                            شارع الكندي
                            <br />
                            داخل مستشفى الاميرات الأهلي
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>ملاحظة:</strong> يتوفر موقف سيارات في المستشفى
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">الهاتف</h3>
                          <div className="space-y-2">
                            <a
                              href="tel:07890751000"
                              className="text-primary hover:underline text-lg font-medium block"
                              dir="ltr"
                            >
                              0789 075 1000
                            </a>
                            <a
                              href="tel:07710751000"
                              className="text-primary hover:underline text-lg font-medium block"
                              dir="ltr"
                            >
                              0771 075 1000
                            </a>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">متاح للرد على المكالمات خلال ساعات العمل</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
                          <a href="mailto:info@drehabyassin.com" className="text-primary hover:underline font-medium">
                            info@drehabyassin.com
                          </a>
                          <p className="text-sm text-muted-foreground mt-2">سنرد على رسالتك خلال 24 ساعة</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">ساعات العمل</h3>
                          <div className="space-y-2 text-muted-foreground">
                            <div className="flex justify-between">
                              <span>الأحد - الأربعاء</span>
                              <span className="font-medium">12:00 م - 03:00 م</span>
                            </div>
                            <div className="flex justify-between">
                              <span>الخميس - الجمعة - السبت</span>
                              <span className="font-medium text-destructive">مغلق</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-2">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-heading font-bold mb-6">أرسل رسالة</h2>

                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <Send className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">تم إرسال رسالتك بنجاح!</h3>
                        <p className="text-muted-foreground mb-6">شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.</p>
                        <Button onClick={() => setIsSubmitted(false)}>إرسال رسالة أخرى</Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">الاسم *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="أدخل اسمك الكامل"
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="مثال: 01234567890"
                            className={errors.phone ? "border-destructive" : ""}
                          />
                          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">رسالتك *</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="اكتب رسالتك هنا..."
                            rows={6}
                            className={errors.message ? "border-destructive" : ""}
                          />
                          {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-900 leading-relaxed">
                            <strong>ملاحظة:</strong> جميع معلوماتك محمية وفقاً لسياسة الخصوصية الخاصة بنا.
                          </p>
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                              جاري الإرسال...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5 ml-2" />
                              إرسال الرسالة
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-16 bg-neutral-50">
          <div className="container-medical">
            <h2 className="text-3xl font-heading font-bold text-center mb-8">موقعنا على الخريطة</h2>
            <div className="rounded-xl overflow-hidden shadow-lg h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1656.9!2d44.3661!3d33.3406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIwJzI2LjIiTiA0NMKwMjEnNTguMCJF!5e0!3m2!1sar!2siq!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع مستشفى الاميرات الأهلي - الحارثية"
              />
            </div>
            <div className="mt-6 text-center space-y-4">
              <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
                <a href="https://maps.app.goo.gl/Y1etJUx2FLxyefCR6" target="_blank" rel="noopener noreferrer">
                  <MapPin className="h-5 w-5" />
                  افتح في خرائط جوجل للحصول على الاتجاهات
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-muted-foreground">
                <strong>كيفية الوصول:</strong> يقع المستشفى في منطقة الحارثية على شارع الكندي، ويمكن الوصول إليه بسهولة
                من جميع مناطق بغداد مع توفر موقف سيارات داخل المستشفى.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
