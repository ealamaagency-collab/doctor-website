import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CTABand } from "@/components/home/cta-band"
import Image from "next/image"
import { Award, GraduationCap, Users, CheckCircle2, Building2, Bone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "من نحن - د. إيهاب ياسين سلمان",
  description:
    "تعرف على د. إيهاب ياسين سلمان، استشاري جراحة العظام والكسور والمفاصل، متخصص في تبديل مفصل الورك والركبة",
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-medical-50 to-white py-16">
          <div className="container-medical">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-balance mb-6">د. إيهاب ياسين سلمان</h1>
              <p className="text-xl text-medical-600 font-semibold mb-4">استشاري جراحة العظام والكسور والمفاصل</p>
              <p className="text-lg text-muted-foreground leading-relaxed">متخصص في تبديل مفصل الورك والركبة</p>
            </div>
          </div>
        </section>

        {/* Doctor Profile */}
        <section className="py-16">
          <div className="container-medical">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/img-3212.jpeg"
                  alt="د. إيهاب ياسين سلمان - استشاري جراحة العظام"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold">من نحن</h2>
                <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    يُعد د. إيهاب ياسين سلمان من الأطباء المتخصصين في جراحة العظام والكسور والمفاصل، ويتمتع بخبرة واسعة
                    في تشخيص وعلاج أمراض وإصابات الجهاز الحركي.
                  </p>
                  <p>
                    يركز الدكتور بشكل خاص على عمليات تبديل مفصل الورك والركبة بأحدث الطرق الطبية المعتمدة عالمياً، بهدف
                    استعادة الحركة الطبيعية وتحسين جودة حياة المرضى.
                  </p>
                  <p>
                    يسعى د. إيهاب دائماً لتقديم أفضل رعاية طبية ممكنة، مع الاهتمام بكل التفاصيل لضمان راحة المريض وتحقيق
                    أفضل النتائج العلاجية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials - Updated */}
        <section className="py-16 bg-neutral-50">
          <div className="container-medical">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">المؤهلات والعضويات</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-medical-100 flex items-center justify-center mb-6">
                    <GraduationCap className="h-8 w-8 text-medical-600" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-4">التعليم</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>بكالوريوس طب وجراحة عامة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>البورد الأوروبي (دكتوراه) في جراحة العظام والكسور والمفاصل والعمود الفقري</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-medical-100 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-medical-600" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-4">العضويات</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>عضو نقابة أطباء النرويج والسويد</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>عضو الأكاديمية الأمريكية لجراحة العظام والكسور</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>عضو الجمعية الأوروبية والأمريكية لجراحة العمود الفقري</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-medical-100 flex items-center justify-center mb-6">
                    <Building2 className="h-8 w-8 text-medical-600" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-4">المستشفيات</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>مستشفى شين – مملكة النرويج</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>مستشفى درمن – مملكة النرويج</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>مستشفى بار الأهلي – العراق / أربيل</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>مستشفى الكفاءات الأهلي – العراق / بغداد</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>مستشفى الأميرات الأهلي – العراق / بغداد</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-medical-100 flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-medical-600" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-4">الإنجازات والشهادات</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>مدرب معتمد لجراحة العظام والكسور وتبديل المفاصل</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>خبرة تزيد عن 20 عاماً في المجال</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
                      <span>أكثر من 1000 عملية جراحية ناجحة</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section className="py-16">
          <div className="container-medical">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">التخصصات الرئيسية</h2>
              <div className="space-y-4">
                {[
                  "تبديل مفصل الورك",
                  "تبديل مفصل الركبة",
                  "علاج التنخر بالخلايا الجذعية",
                  "جراحة الكسور بكافة أنواعها",
                ].map((item, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center">
                          <Bone className="h-4 w-4 text-medical-600" />
                        </div>
                        <p className="font-medium">{item}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 bg-medical-50">
          <div className="container-medical">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">رؤيتنا</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  نسعى لتقديم أعلى مستويات الرعاية الطبية في مجال جراحة العظام والمفاصل، مع التركيز على استخدام أحدث
                  التقنيات الطبية المعتمدة عالمياً.
                </p>
                <p>
                  هدفنا الأساسي هو استعادة الحركة الطبيعية للمرضى وتحسين جودة حياتهم، من خلال التشخيص الدقيق والعلاج
                  المناسب لكل حالة على حدة.
                </p>
                <p>
                  نؤمن بأهمية بناء علاقة ثقة مع المرضى، والاستماع لمخاوفهم، وتقديم الدعم الكامل خلال رحلة العلاج
                  والتعافي.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
