import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { ServiceHero } from "@/components/service/service-hero"
import { ServiceSidebar } from "@/components/service/service-sidebar"
import { ServiceFAQ } from "@/components/service/service-faq"
import { CTABand } from "@/components/home/cta-band"
import { Activity, CheckCircle2, AlertCircle, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "تبديل مفصل الركبة - د. إيهاب ياسين",
  description: "جراحة استبدال مفصل الركبة المتقدمة لعلاج التهاب المفاصل والإصابات الشديدة واستعادة الحركة الطبيعية",
}

const faqs = [
  {
    question: "ما هي أعراض احتياج الركبة للاستبدال؟",
    answer:
      "الأعراض الرئيسية تشمل: ألم شديد ومستمر في الركبة حتى أثناء الراحة، صعوبة في المشي أو صعود السلالم، تيبس في المفصل خاصة في الصباح، تورم مستمر، وعدم استجابة للعلاجات التحفظية.",
  },
  {
    question: "هل يمكنني ثني الركبة بشكل طبيعي بعد العملية؟",
    answer:
      "نعم، معظم المرضى يستطيعون ثني الركبة بزاوية 110-120 درجة بعد التعافي، وهو ما يكفي لمعظم الأنشطة اليومية مثل المشي، صعود السلالم، والجلوس.",
  },
  {
    question: "كم تدوم الركبة الصناعية؟",
    answer:
      "الركبة الصناعية الحديثة تدوم عادةً لمدة 15-25 عاماً أو أكثر، حسب مستوى النشاط والوزن والعناية بالمفصل. أكثر من 90% من المفاصل الصناعية تعمل بشكل جيد بعد 15 عاماً.",
  },
  {
    question: "متى يمكنني العودة للعمل؟",
    answer:
      "يعتمد ذلك على نوع العمل. للأعمال المكتبية: 4-6 أسابيع. للأعمال التي تتطلب الوقوف: 8-12 أسبوع. للأعمال الشاقة: 3-6 أشهر. سيساعدك الطبيب في تحديد الوقت المناسب.",
  },
  {
    question: "هل يمكنني ممارسة الرياضة بعد العملية؟",
    answer:
      "نعم، يمكنك ممارسة رياضات منخفضة التأثير مثل المشي، السباحة، وركوب الدراجة. يُنصح بتجنب الرياضات عالية التأثير مثل الجري والقفز للحفاظ على المفصل الصناعي.",
  },
]

export default function KneeReplacementPage() {
  return (
    <>
      <Navigation />
      <main>
        <ServiceHero
          title="تبديل مفصل الركبة"
          subtitle="حياة جديدة بدون ألم في الركبة"
          description="نستخدم أحدث تقنيات جراحة استبدال مفصل الركبة لمساعدتك على العودة لحياتك الطبيعية والتخلص من الألم المزمن"
          icon={<Activity className="h-10 w-10 text-primary" />}
        />

        <section className="py-16">
          <div className="container-medical">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-12">
                {/* Who Needs This */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">من يحتاج لهذه العملية؟</h2>
                  <Card>
                    <CardContent className="p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">سوفان الركبة المتقدم</strong>
                            <p className="text-muted-foreground">تآكل الغضروف وألم شديد يؤثر على الحياة اليومية</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">التهاب المفاصل الروماتويدي</strong>
                            <p className="text-muted-foreground">التهاب مزمن يسبب تلف المفصل</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">إصابات الركبة الشديدة</strong>
                            <p className="text-muted-foreground">كسور أو تلف شديد في المفصل</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تشوهات الركبة</strong>
                            <p className="text-muted-foreground">انحراف أو تشوه في محور الركبة</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Procedure Overview */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">خطوات العملية</h2>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "التحضير والتخدير",
                        description: "تخدير المريض وتحضير منطقة الجراحة بأعلى معايير التعقيم",
                      },
                      {
                        step: "2",
                        title: "إزالة الأنسجة التالفة",
                        description: "إزالة الغضروف والعظم التالف من عظمة الفخذ والساق",
                      },
                      {
                        step: "3",
                        title: "تركيب المفصل الصناعي",
                        description: "تثبيت المكونات المعدنية والبلاستيكية للمفصل الجديد",
                      },
                      {
                        step: "4",
                        title: "الإغلاق والتعافي",
                        description: "إغلاق الجرح والبدء الفوري في برنامج التأهيل",
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

                {/* Expected Outcomes */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">النتائج المتوقعة</h2>
                  <Card className="bg-brand-50 border-primary/20">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تخفيف الألم الفوري</strong>
                            <p className="text-sm text-muted-foreground">القضاء على الألم المزمن بشكل كبير</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تحسين الحركة</strong>
                            <p className="text-sm text-muted-foreground">استعادة القدرة على المشي والحركة</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تصحيح التشوهات</strong>
                            <p className="text-sm text-muted-foreground">إعادة محور الركبة للوضع الطبيعي</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">استقرار المفصل</strong>
                            <p className="text-sm text-muted-foreground">ركبة مستقرة وقوية للأنشطة اليومية</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recovery Timeline */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">الجدول الزمني للتعافي</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">اليوم الأول</strong>
                            <p className="text-muted-foreground">
                              البدء في تحريك الركبة والمشي بمساعدة الحجلة الرباعية
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">الأسبوع الأول</strong>
                            <p className="text-muted-foreground">
                              المشي بمساعدة الحجلة الرباعية وإجراء التمارين الرياضية
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">3-6 أسابيع</strong>
                            <p className="text-muted-foreground">المشي بدون مساعدة والعودة للأنشطة الخفيفة</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">6-8 أشهر</strong>
                            <p className="text-muted-foreground">التعافي الكامل والعودة للحياة اليومية</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Important Info */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">معلومات مهمة</h2>
                  <Card className="border-medical-200 bg-medical-50">
                    <CardContent className="p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-6 w-6 text-medical-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">صالة العمليات</strong>
                            <p className="text-muted-foreground">
                              صالة عمليات مجهزة بأنظمة العزل وتنقية الهواء بأعلى المعايير العالمية
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-6 w-6 text-medical-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">المفصل الصناعي</strong>
                            <p className="text-muted-foreground">
                              نستخدم أحدث أنواع المفاصل الصناعية المعتمدة عالمياً لضمان أفضل النتائج
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-6 w-6 text-medical-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">فريق طبي متكامل</strong>
                            <p className="text-muted-foreground">
                              فريق من أطباء التخدير والتمريض والعلاج الطبيعي لرعاية المريض قبل وبعد العملية
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Ideal Candidate */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">المرشح المثالي للعملية</h2>
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-sm">ألم شديد في الركبة يؤثر على الحياة اليومية</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-sm">عدم استجابة للعلاجات التحفظية (أدوية، علاج طبيعي، حقن)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-sm">حالة صحية عامة جيدة تسمح بإجراء الجراحة</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-sm">الاستعداد للالتزام ببرنامج العلاج الطبيعي</span>
                        </li>
                      </ul>
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
                          <span className="text-sm">التهابات نشطة في الركبة أو الجسم</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">ضعف شديد في عضلات الفخذ</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">أمراض الأوعية الدموية الشديدة في الساق</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">عدم القدرة على المشاركة في التأهيل بعد العملية</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-1">
                <ServiceSidebar serviceName="تبديل مفصل الركبة" />
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
