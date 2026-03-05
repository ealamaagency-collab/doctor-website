import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { BookingWizard } from "@/components/booking/booking-wizard"

export const metadata = {
  title: "احجز موعد - د. إيهاب ياسين",
  description: "احجز موعدك الآن مع د. إيهاب ياسين للحصول على استشارة طبية شاملة",
}

export default function BookingPage() {
  return (
    <>
      <Navigation />
      <main className="py-16 bg-neutral-50 min-h-screen">
        <div className="container-medical">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">احجز موعدك</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                املأ النموذج التالي وسنتواصل معك لتأكيد موعدك
              </p>
            </div>
            <BookingWizard />
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
