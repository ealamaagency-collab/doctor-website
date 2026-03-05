import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { ServiceHero } from "@/components/service/service-hero"
import { ServiceSidebar } from "@/components/service/service-sidebar"
import { ServiceFAQ } from "@/components/service/service-faq"
import { CTABand } from "@/components/home/cta-band"
import { Droplets, CheckCircle2, AlertCircle, Clock, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata = {
  title: "العلاج بالبلازما (PRP) - د. إيهاب ياسين",
  description: "علاج خشونة المفاصل ونتوء القدم وتخفيف الألم بطريقة طبيعية باستخدام البلازما الغنية بالصفائح الدموية",
}

const faqs = [
  {
    question: "ما هو العلاج بالبلازما (PRP)؟",
    answer:
      "PRP هو علاج يستخدم البلازما الغنية بالصفائح الدموية المستخلصة من دم المريض نفسه. تحتوي على عوامل نمو طبيعية تحفز عملية الشفاء وتجديد الأنسجة.",
  },
  {
    question: "كيف يتم الإجراء؟",
    answer:
      "يتم سحب عينة دم صغيرة من المريض، ثم فصل البلازما الغنية بالصفائح الدموية في جهاز طرد مركزي، وأخيراً حقنها في المنطقة المصابة تحت توجيه الأشعة.",
  },
  {
    question: "هل العلاج مؤلم؟",
    answer:
      "الإجراء بسيط ويتم تحت التخدير الموضعي. قد يشعر المريض بانزعاج خفيف أثناء الحقن، لكنه عادة ما يكون محتملاً ويزول سريعاً.",
  },
  {
    question: "كم عدد الجلسات المطلوبة؟",
    answer:
      "يختلف عدد الجلسات حسب الحالة، عادة ما تتراوح بين 1-3 جلسات بفاصل 2-4 أسابيع بين كل جلسة. سيحدد الطبيب العدد المناسب بعد التقييم.",
  },
  {
    question: "متى تظهر النتائج؟",
    answer:
      "يبدأ معظم المرضى بالشعور بتحسن خلال 2-4 أسابيع، مع استمرار التحسن على مدى الأشهر التالية مع تجديد الأنسجة.",
  },
  {
    question: "هل هناك آثار جانبية؟",
    answer:
      "لأن العلاج يستخدم دم المريض نفسه، فإن الآثار الجانبية نادرة جداً. قد يحدث تورم أو ألم خفيف في موقع الحقن يزول خلال أيام.",
  },
]

export default function PRPTherapyPage() {
  return (
    <>
      <Navigation />
      <main>
        <ServiceHero
          title="العلاج بالبلازما (PRP)"
          subtitle="تحفيز الشفاء الطبيعي وتخفيف الألم"
          description="علاج متطور باستخدام البلازما الغنية بالصفائح الدموية لعلاج خشونة المفاصل ونتوء القدم وتخفيف الألم بطريقة طبيعية وآمنة"
          icon={<Droplets className="h-10 w-10 text-primary" />}
        />

        <section className="py-16">
          <div className="container-medical">
            <Alert className="mb-12 border-blue-200 bg-blue-50">
              <Info className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <strong>ملاحظة مهمة:</strong> العلاج بالبلازما هو إجراء آمن وفعال يستخدم مكونات دم المريض نفسه لتحفيز
                الشفاء الطبيعي دون أي مواد كيميائية أو أدوية.
              </AlertDescription>
            </Alert>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-12">
                {/* What is PRP */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">ما هو العلاج بالبلازما (PRP)؟</h2>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <p className="leading-relaxed">
                        العلاج بالبلازما الغنية بالصفائح الدموية (Platelet-Rich Plasma) هو إجراء طبي متقدم يستخدم مكونات
                        دم المريض نفسه لتحفيز عملية الشفاء الطبيعية. تحتوي البلازما الغنية بالصفائح الدموية على تركيز
                        عالٍ من عوامل النمو التي تساعد على تجديد الأنسجة وتقليل الالتهاب.
                      </p>
                      <p className="leading-relaxed">
                        يُستخدم هذا العلاج بنجاح لعلاج خشونة المفاصل، ونتوء القدم (مسمار القدم)، وإصابات الأوتار
                        والأربطة، وآلام المفاصل المزمنة، مما يوفر بديلاً طبيعياً وآمناً للأدوية والجراحة.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Conditions Treated */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">الحالات التي يعالجها PRP</h2>
                  <Card>
                    <CardContent className="p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">خشونة المفاصل</strong>
                            <p className="text-muted-foreground">علاج فعال لخشونة الركبة والورك والكتف وتخفيف الألم</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">نتوء القدم (التهاب اللفافة الأخمصية)</strong>
                            <p className="text-muted-foreground">علاج مسمار القدم وألم الكعب المزمن</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">إصابات الأوتار والأربطة</strong>
                            <p className="text-muted-foreground">التهاب وتر أخيل، مرفق التنس، إصابات الكتف</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">إصابات العضلات</strong>
                            <p className="text-muted-foreground">التمزقات العضلية الجزئية والإصابات الرياضية</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">آلام الظهر والرقبة</strong>
                            <p className="text-muted-foreground">علاج مشاكل الفقرات والأقراص</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Procedure Steps */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">خطوات العلاج</h2>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "سحب عينة الدم",
                        description: "سحب كمية صغيرة من دم المريض (حوالي 15-30 مل)",
                      },
                      {
                        step: "2",
                        title: "فصل البلازما",
                        description: "وضع الدم في جهاز طرد مركزي لفصل البلازما الغنية بالصفائح الدموية",
                      },
                      {
                        step: "3",
                        title: "تجهيز الحقنة",
                        description: "تركيز البلازما للحصول على أعلى نسبة من عوامل النمو",
                      },
                      {
                        step: "4",
                        title: "الحقن الموجه",
                        description: "حقن البلازما في المنطقة المصابة بدقة تحت توجيه الأشعة أو السونار",
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

                {/* Benefits */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">مميزات العلاج بالبلازما</h2>
                  <Card className="bg-brand-50 border-primary/20">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Droplets className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">علاج طبيعي 100%</strong>
                            <p className="text-sm text-muted-foreground">
                              يستخدم مكونات دم المريض نفسه دون أي مواد كيميائية
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Droplets className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">آمن وبدون آثار جانبية</strong>
                            <p className="text-sm text-muted-foreground">
                              لا يوجد خطر رفض أو حساسية لأنه من جسم المريض
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Droplets className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">إجراء سريع وبسيط</strong>
                            <p className="text-sm text-muted-foreground">يستغرق الإجراء حوالي 30-45 دقيقة فقط</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Droplets className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">لا يحتاج فترة نقاهة طويلة</strong>
                            <p className="text-sm text-muted-foreground">
                              يمكن العودة للأنشطة اليومية خلال يوم أو يومين
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Droplets className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <div>
                            <strong className="block mb-1">بديل للجراحة</strong>
                            <p className="text-sm text-muted-foreground">قد يؤخر أو يغني عن الحاجة للتدخل الجراحي</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">الجدول الزمني للنتائج</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">اليوم الأول</strong>
                            <p className="text-muted-foreground">راحة نسبية وتجنب الأنشطة الشاقة</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">الأسبوع الأول</strong>
                            <p className="text-muted-foreground">قد يحدث تورم أو ألم خفيف مؤقت (طبيعي)</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">2-4 أسابيع</strong>
                            <p className="text-muted-foreground">بداية الشعور بتحسن وتقليل الألم</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <strong className="block mb-1">1-3 أشهر</strong>
                            <p className="text-muted-foreground">النتائج الكاملة مع تجديد الأنسجة</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Who is a good candidate */}
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">من هو المرشح المناسب؟</h2>
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <p className="mb-4 leading-relaxed">العلاج بالبلازما مناسب لمعظم المرضى، وخاصة:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>من يعانون من خشونة المفاصل المبكرة إلى المتوسطة</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>من لديهم إصابات رياضية أو التهابات مزمنة في الأوتار</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>من يبحثون عن بديل طبيعي للأدوية المضادة للالتهاب</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>من يريدون تأخير أو تجنب الجراحة</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>الرياضيون الذين يحتاجون شفاء سريع من الإصابات</span>
                        </li>
                      </ul>
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
                          <span className="text-sm">قد لا يكون فعالاً في حالات التآكل الشديد جداً للغضروف</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">النتائج تختلف من مريض لآخر حسب شدة الحالة والعمر</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">قد يحتاج المريض لأكثر من جلسة للحصول على أفضل النتائج</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="text-sm">غير مناسب لمن يعانون من اضطرابات في الدم أو تجلط الدم</span>
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-4 pr-8">
                        * نقدم استشارة شاملة لتحديد ما إذا كان هذا العلاج مناسباً لحالتك
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-1">
                <ServiceSidebar serviceName="العلاج بالبلازما (PRP)" />
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
