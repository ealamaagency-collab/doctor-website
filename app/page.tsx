import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { SchemaOrg } from "@/components/schema-org"
import { HeroSection } from "@/components/home/hero-section"
import { TrustBadges } from "@/components/home/trust-badges"
import { ServicesHighlight } from "@/components/home/services-highlight"
import { TestimonialsPreview } from "@/components/home/testimonials-preview"
import { BlogPreview } from "@/components/home/blog-preview"
import { FAQPreview } from "@/components/home/faq-preview"
import { CTABand } from "@/components/home/cta-band"
import { MapContact } from "@/components/home/map-contact"

export default function HomePage() {
  return (
    <>
      <SchemaOrg />
      <Navigation />
      <main>
        <HeroSection />
        <TrustBadges />
        <ServicesHighlight />
        <TestimonialsPreview />
        <BlogPreview />
        <FAQPreview />
        <CTABand />
        <MapContact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
