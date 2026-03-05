"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function MedicalDisclaimerPage() {
  return (
    <>
      <Navigation />
      <main className="py-16">
        <div className="container-medical max-w-4xl">
          <h1 className="text-4xl font-heading font-bold mb-8">إخلاء المسؤولية الطبية</h1>

          <Alert className="mb-8 border-orange-200 bg-orange-50">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <AlertDescription className="text-orange-900">
              <strong>تنبيه مهم:</strong> المعلومات المقدمة على هذا الموقع هي لأغراض تعليمية فقط ولا تشكل استشارة طبية
              أو تشخيصاً أو علاجاً.
            </AlertDescription>
          </Alert>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 leading-relaxed text-muted-foreground">
              <p>
                جميع المعلومات الواردة في هذا الموقع هي لأغراض تثقيفية فقط، ولا تُعد بديلاً عن الاستشارة الطبية المتخصصة
                أو التشخيص أو العلاج.
              </p>

              <p>يُرجى استشارة طبيبك أو مقدم الرعاية الصحية المؤهل قبل اتخاذ أي قرار يتعلق بصحتك أو علاجك.</p>

              <p>
                لا يتحمل الموقع أو الطبيب أي مسؤولية عن أي أضرار ناتجة عن استخدام المعلومات المقدمة هنا دون استشارة طبية
                مباشرة.
              </p>

              <p>النتائج الطبية تختلف من مريض لآخر، والصور والشهادات المعروضة لا تضمن نتائج مماثلة لجميع المرضى.</p>

              <p className="font-medium text-foreground">
                للحصول على استشارة طبية متخصصة، يُرجى حجز موعد في العيادة - مستشفى الاميرات الأهلي – بغداد
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
