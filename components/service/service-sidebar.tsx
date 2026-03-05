import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, Phone, MessageCircle } from "lucide-react"

interface ServiceSidebarProps {
  serviceName: string
}

export function ServiceSidebar({ serviceName }: ServiceSidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="sticky top-24 border-2 border-primary/20">
        <CardContent className="p-6">
          <h3 className="font-heading font-bold text-xl mb-4">احجز موعدك الآن</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            احصل على استشارة طبية شاملة وتقييم دقيق لحالتك
          </p>
          <div className="space-y-3">
            <Button size="lg" className="w-full" asChild>
              <Link href="/book">
                <Calendar className="h-5 w-5 ml-2" />
                حجز موعد
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
              <Link href="tel:07710751000">
                <Phone className="h-5 w-5 ml-2" />
                اتصل الآن
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
              <Link href="https://wa.me/9647710751000" target="_blank">
                <MessageCircle className="h-5 w-5 ml-2" />
                واتساب
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="font-heading font-semibold mb-4">معلومات مهمة</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>تقدير تقريبي للتكلفة بعد الكشف الطبي</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>نستقبل جميع أنواع التأمين الطبي</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>متابعة دورية بعد العملية</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>فريق طبي متخصص ومعدات حديثة</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
