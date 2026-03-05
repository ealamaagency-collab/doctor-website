import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Calendar, Clock, User, Phone, MessageCircle } from "lucide-react"
import type { BookingData } from "./booking-wizard"

interface BookingConfirmationProps {
  bookingData: BookingData
}

export function BookingConfirmation({ bookingData }: BookingConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>

          <h2 className="text-3xl font-heading font-bold mb-4">تم استلام طلبك بنجاح!</h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            شكراً لك على حجز موعدك. سنقوم بمراجعة طلبك والتواصل معك قريباً لتأكيد الموعد.
          </p>

          <Card className="bg-white border-2 mb-8">
            <CardContent className="p-6 space-y-4 text-right">
              <h3 className="font-heading font-bold text-xl mb-4 text-center">تفاصيل الحجز</h3>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">الاسم</p>
                  <p className="font-semibold">{bookingData.patientName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                  <p className="font-semibold">{bookingData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">الخدمة</p>
                  <p className="font-semibold">{bookingData.serviceName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">التاريخ والوقت</p>
                  <p className="font-semibold">
                    {bookingData.date} - {bookingData.time}
                  </p>
                </div>
              </div>

              {bookingData.notes && (
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">ملاحظات</p>
                    <p className="font-semibold">{bookingData.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900 leading-relaxed">
              <strong>الخطوات التالية:</strong> سيتواصل معك فريقنا خلال 24 ساعة عبر الهاتف أو واتساب لتأكيد الموعد. في
              حالة الاستعجال، يمكنك التواصل معنا مباشرة.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">العودة للرئيسية</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://wa.me/+201234567890" target="_blank">
                <MessageCircle className="h-5 w-5 ml-2" />
                تواصل عبر واتساب
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
