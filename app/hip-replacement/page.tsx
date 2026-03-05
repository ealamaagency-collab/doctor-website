import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { ServiceHero } from "@/components/service/service-hero"
import { ServiceSidebar } from "@/components/service/service-sidebar"
import { ServiceFAQ } from "@/components/service/service-faq"
import { CTABand } from "@/components/home/cta-band"
import { Bone, CheckCircle2, AlertCircle, Clock, Activity, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "تبديل مفصل الورك - د. إيهاب ياسين",
  description: "جراحة استبدال مفصل الورك بأحدث التقنيات الطبية - جرح أمامي جانبي دون قطع العضلات لضمان أفضل النتائج",
}

const faqs = [
  {
    question: "كم تستغرق العملية؟",
    answer:
      "عادة تستغرق العملية من ساعة ونصف إلى ساعتين حسب حالة المريض ويبقى في المستشفى ليوم واحد للمتابعة ويغادر في اليوم التالي بعد التأكد من الشفاء التام.",
  },
  {
    question: "ما هي فترة التعافي المتوقعة؟",
    answer:
      "يمكن للمريض المشي بمساعدة الحجلة الرباعية بعد 6 ساعات من العملية ويمكن العودة للأنشطة الخفيفة خلال 3-4 أسابيع بعد رفع الكلبسات. التعافي الكامل والعودة للأنشطة اليومية قد يستغرق 4-6 أسابيع.",
  },
  {
    question: "ما هي نسبة نجاح العملية؟",
    answer:
      "نسبة نجاح عمليات تبديل مفصل الورك تتجاوز 95%. نستخدم مفصل صناعي حديث ثنائي الحركة يدوم لأكثر من 20 عاماً في معظم الحالات مع الرعاية المناسبة.",
  },
  {
    question: "هل سأشعر بالمفصل الصناعي؟",
    answer:
      "بعد فترة التعافي، لن تشعر بالمفصل الصناعي في الحياة اليومية. معظم المرضى يستطيعون العودة لأنشطتهم الطبيعية بدون ألم أو إزعاج.",
  },
]

export default function HipReplacementPage() {
  return (
    <>
      <Navigation />
      <main>
        <ServiceHero
          title="تبديل مفصل الورك"
          subtitle="أحدث طريقة بدون قطع العضلات"
          description="نقدم أحدث طريقة في إجراء عملية تبديل مفصل الورك وذلك بإحداث جرح أمامي-جانبي وتبديل المفصل دون اللجوء إلى قطع العضلات المحيطة بالمفصل لضمان أفضل النتائج"
          icon={<Bone className="h-10 w-10 text-primary" />}
        />

        <section className="py-16">
          <div className="container-medical">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">من يحتاج لهذه العملية؟</h2>
                  <Card>
                    <CardContent className="p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تنخر رأس عظم الفخذ</strong>
                            <p className="text-muted-foreground">
                              موت أنسجة العظم بسبب نقص التروية الدموية، مما يؤدي إلى انهيار رأس عظمة الفخذ وتلف المفصل
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">سوفان مفصل الورك المتقدمة</strong>
                            <p className="text-muted-foreground">
                              تآكل الغضروف المفصلي الشديد مع تقدم العمر مما يسبب ألماً مزمناً وصعوبة في الحركة
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">كسور الورك</strong>
                            <p className="text-muted-foreground">نتيجة الحوادث المختلفة</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">التهاب المفاصل الروماتويدي</strong>
                            <p className="text-muted-foreground">
                              التهاب مزمن يؤثر على المفاصل ويسبب تلفاً تدريجياً في الغضاريف والعظام
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">خطوات العملية</h2>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "التحضير والتخدير",
                        description: "يتم تخدير المريض (كلي أو نصفي) وتحضير منطقة الجراحة",
                      },
                      {
                        step: "2",
                        title: "إحداث جرح أمامي-جانبي",
                        description: "يتم إحداث جرح أمامي-جانبي بطول 10 سم وإزاحة العضلات والأربطة دون الحاجة لقطعها",
                      },
                      {
                        step: "3",
                        title: "إزالة المفصل التالف",
                        description: "يتم إزالة رأس عظمة الفخذ والغضروف التالف من الحُق",
                      },
                      {
                        step: "4",
                        title: "تركيب المفصل الصناعي",
                        description: "يتم تثبيت المفصل الصناعي الحديث ثنائي الحركة المكون من كرة ومقبس",
                      },
                      {
                        step: "5",
                        title: "الإغلاق والتعافي",
                        description: "إغلاق الجرح والبدء في برنامج العلاج الطبيعي",
                      },
                    ].map((item) => (
                      <Card key={item.step}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shrink-0">
                              {item.step}
                            </div>
                            <div>
                              <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                              <p className="text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">الجدول الزمني للتعافي</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">اليوم الأول</strong>
                            <p className="text-muted-foreground">البدء في الحركة والمشي بعد 6 ساعات من العملية</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">اليوم الثاني</strong>
                            <p className="text-muted-foreground">الخروج من المستشفى والبدء بالتمارين المنزلية</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">3-4 أسابيع</strong>
                            <p className="text-muted-foreground">رفع الكلبسات والعودة للأنشطة اليومية الخفيفة</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">4-6 أسابيع</strong>
                            <p className="text-muted-foreground">التعافي الكامل والعودة للأنشطة اليومية</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">معلومات مهمة</h2>
                  <Card className="bg-brand-50 border-primary/20">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <Shield className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">صالة عمليات مجهزة</strong>
                            <p className="text-sm text-muted-foreground">
                              صالة عمليات مجهزة بأحدث أنظمة العزل لمنع حدوث أي التهاب
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Activity className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تقنية متقدمة</strong>
                            <p className="text-sm text-muted-foreground">جرح أمامي-جانبي دون قطع العضلات لتعافي أسرع</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Activity className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">مفصل صناعي حديث</strong>
                            <p className="text-sm text-muted-foreground">
                              مفصل صناعي ثنائي الحركة يدوم لأكثر من 20 عاماً
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Activity className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">نتائج طويلة الأمد</strong>
                            <p className="text-sm text-muted-foreground">نسبة نجاح تتجاوز 95%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contraindications */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">موانع العملية</h2>
                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">التهابات نشطة في الجسم</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">أمراض قلبية غير مستقرة</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">ضعف شديد في العضلات أو الأعصاب</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">عدم القدرة على المشاركة في العلاج الطبيعي</span>
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-4 pr-8">
                        * يتم تقييم كل حالة بشكل فردي لتحديد مدى ملاءمة العملية
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-1">
                <ServiceSidebar serviceName="تبديل مفصل الورك" />
              </div>
            </div>
          </div>
        </section>

        <ServiceFAQ faqs={faqs} />
        <CTABand />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
