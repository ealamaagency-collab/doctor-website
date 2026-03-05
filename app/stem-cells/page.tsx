import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { ServiceHero } from "@/components/service/service-hero"
import { ServiceSidebar } from "@/components/service/service-sidebar"
import { ServiceFAQ } from "@/components/service/service-faq"
import { CTABand } from "@/components/home/cta-band"
import { Sparkles, CheckCircle2, AlertCircle, Clock, Info, Building2, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata = {
  title: "علاج الخلايا الجذعية - د. إيهاب ياسين",
  description: "علاج متطور باستخدام الخلايا الجذعية لعلاج حالات التنخر الأولي وتخفيف الألم بطريقة طبيعية وآمنة",
}

const faqs = [
  {
    question: "ما هي الخلايا الجذعية؟",
    answer:
      "الخلايا الجذعية هي خلايا مستخلصة من نخاع العظم لها القدرة على علاج رأس عظم الفخذ المصاب بالتنخر بالإضافة إلى تجديد الأنسجة التالفة.",
  },
  {
    question: "كيف يتم الحصول على الخلايا الجذعية؟",
    answer:
      "تستخلص الخلايا الجذعية من نخاع العظم للمريض نفسه، حيث يتم سحب عينة صغيرة من نخاع العظم من منطقة الحوض، ثم يتم فصل الخلايا الجذعية خارجياً ليتم حقنها في رأس عظم الفخذ المصاب.",
  },
  {
    question: "هل العلاج بالخلايا الجذعية آمن؟",
    answer:
      "نعم، العلاج آمن جداً لأننا نستخدم خلايا المريض نفسه، مما يقلل من خطر الرفض أو الحساسية. الآثار الجانبية نادرة وعادة ما تكون خفيفة.",
  },
  {
    question: "متى أرى النتائج؟",
    answer: "بعض المرضى يشعرون بتحسن خلال أشهر قليلة، والنتائج الكاملة مع تجديد الأنسجة قد تستغرق 10-12 شهر.",
  },
  {
    question: "هل يغني عن الجراحة؟",
    answer: "في حالات التنخر الأولى، يساعد العلاج على تحسين وظيفة المفصل دون الحاجة لجراحة كبرى في العديد من الحالات.",
  },
]

export default function StemCellsPage() {
  return (
    <>
      <Navigation />
      <main>
        <ServiceHero
          title="علاج الخلايا الجذعية"
          subtitle="علاج متطور لحالات التنخر الأولي"
          description="نقدم علاجاً متطوراً باستخدام الخلايا الجذعية لعلاج حالات التنخر الأولي وتخفيف الألم بطريقة طبيعية وآمنة"
          icon={<Sparkles className="h-10 w-10 text-primary" />}
        />

        <section className="py-16">
          <div className="container-medical">
            <Alert className="mb-12 border-blue-200 bg-blue-50">
              <Info className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <strong>ملاحظة مهمة:</strong> علاج الخلايا الجذعية هو خيار علاجي متطور يناسب حالات معينة. نقدم تقييماً
                شاملاً لتحديد مدى ملاءمة هذا العلاج لحالتك.
              </AlertDescription>
            </Alert>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-12">
                {/* What is it - CHANGE: Updated last paragraph */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">ما هو علاج الخلايا الجذعية؟</h2>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <p className="leading-relaxed">
                        علاج الخلايا الجذعية هو إجراء طبي متقدم يستخدم قدرة الخلايا الجذعية الطبيعية على التجديد
                        والإصلاح. نستخدم خلايا المريض نفسه لتحفيز عملية الشفاء الطبيعية في المفاصل المصابة.
                      </p>
                      <p className="leading-relaxed">
                        هذه الطريقة تساعد المريض على علاج حالات التنخر الأولى، وتحسين وظيفة المفصل دون الحاجة لجراحة
                        كبرى في العديد من الحالات.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Indications - CHANGE: Updated to only necrosis cases */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">الحالات المناسبة للعلاج</h2>
                  <Card>
                    <CardContent className="p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تنخر مفصل الورك</strong>
                            <p className="text-muted-foreground">الحالات الأولية من تنخر رأس عظم الفخذ</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تنخر مفصل الركبة (في بعض الحالات)</strong>
                            <p className="text-muted-foreground">حالات التنخر المبكرة في مفصل الركبة</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Procedure - CHANGE: Updated steps 2 and 3 */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">خطوات العلاج</h2>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "التقييم والفحص",
                        description: "فحص شامل وأشعة لتحديد مدى ملاءمة العلاج",
                      },
                      {
                        step: "2",
                        title: "سحب الخلايا",
                        description: "سحب عينة من نخاع العظم من منطقة الحوض تحت التخدير العام أو النصفي",
                      },
                      {
                        step: "3",
                        title: "معالجة الخلايا",
                        description: "فصل واستخلاص الخلايا الجذعية بواسطة جهاز الفصل",
                      },
                      {
                        step: "4",
                        title: "الحقن",
                        description: "حقن الخلايا الجذعية في المفصل المصاب بدقة",
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
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Sparkles className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">علاج التنخر الأولي</strong>
                            <p className="text-sm text-muted-foreground">تحفيز الشفاء في حالات التنخر المبكرة</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Sparkles className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تخفيف الألم</strong>
                            <p className="text-sm text-muted-foreground">تقليل الألم والالتهاب بشكل ملحوظ</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Sparkles className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تحسين الحركة</strong>
                            <p className="text-sm text-muted-foreground">زيادة نطاق الحركة ومرونة المفصل</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Sparkles className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">تجنب الجراحة الكبرى</strong>
                            <p className="text-sm text-muted-foreground">
                              تحسين وظيفة المفصل دون الحاجة لجراحة في العديد من الحالات
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline - CHANGE: Updated timeline completely */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">الجدول الزمني للنتائج</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">أسبوعين</strong>
                            <p className="text-muted-foreground">عدم الضغط على الرجل والقيام بتمارين منزلية بسيطة</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">3-4 أسابيع</strong>
                            <p className="text-muted-foreground">راحة نسبية والبدء بتمارين البايسكل الثابت</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">3-6 أشهر</strong>
                            <p className="text-muted-foreground">تحسن ملحوظ في الحركة والوظيفة</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">6-12 شهر</strong>
                            <p className="text-muted-foreground">النتائج الكاملة مع تجديد الأنسجة</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Important Information - CHANGE: Added same as hip replacement */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">معلومات مهمة</h2>
                  <Card className="border-medical-200 bg-medical-50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Building2 className="h-6 w-6 text-medical-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">صالة عمليات مجهزة</strong>
                            <p className="text-sm text-muted-foreground">
                              تتم العملية في صالة عمليات مجهزة بأنظمة العزل والتعقيم المتقدمة لضمان أعلى معايير السلامة
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="h-6 w-6 text-medical-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">أجهزة فصل متطورة</strong>
                            <p className="text-sm text-muted-foreground">
                              نستخدم أحدث أجهزة فصل الخلايا الجذعية لضمان أفضل النتائج
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Limitations */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">القيود والاعتبارات</h2>
                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">النتائج تختلف من مريض لآخر حسب الحالة والعمر</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">العلاج مناسب لحالات التنخر الأولية فقط</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">قد يحتاج المريض لأكثر من جلسة للحصول على أفضل النتائج</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">ليس بديلاً عن الجراحة في الحالات المتقدمة</span>
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-4 pr-8">
                        * نقدم استشارة شاملة لتحديد ما إذا كان هذا العلاج مناسباً لحالتك
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Safety */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">السلامة والآثار الجانبية</h2>
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <p className="mb-4 leading-relaxed">
                        علاج الخلايا الجذعية آمن جداً لأننا نستخدم خلايا المريض نفسه. الآثار الجانبية نادرة وعادة ما تكون
                        خفيفة:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>ألم خفيف أو تورم في موقع الحقن (يزول خلال أيام)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>احمرار مؤقت في منطقة العلاج</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>نادراً: عدوى (نسبة أقل من 1%)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-1">
                <ServiceSidebar serviceName="الخلايا الجذعية" />
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
