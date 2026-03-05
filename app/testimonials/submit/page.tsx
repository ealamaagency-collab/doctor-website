import type { Metadata } from "next"
import { ReviewForm } from "@/components/testimonials/review-form"

export const metadata: Metadata = {
  title: "إضافة تقييم | د. إيهاب ياسين",
  description: "شارك تجربتك مع د. إيهاب ياسين وساعد الآخرين في اتخاذ القرار الصحيح",
}

export default function SubmitReviewPage() {
  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">شارك تجربتك معنا</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              رأيك يهمنا ويساعد الآخرين في اتخاذ القرار الصحيح. سيتم مراجعة تقييمك قبل نشره.
            </p>
          </div>
          <ReviewForm />
        </div>
      </div>
    </main>
  )
}
