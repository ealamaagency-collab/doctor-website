"use client"

import { Bone, Activity, Sparkles } from "lucide-react"

interface ServiceSelectionProps {
  selectedService?: string
  onSelect: (serviceId: string, serviceName: string) => void
}

const services = [
  {
    id: "hip-replacement",
    name: "تبديل مفصل الورك",
    description: "استبدال مفصل الورك بأحدث التقنيات الجراحية",
    icon: Bone,
    color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
  {
    id: "knee-replacement",
    name: "تبديل مفصل الركبة",
    description: "جراحة استبدال مفصل الركبة المتقدمة",
    icon: Activity,
    color: "bg-teal-50 text-teal-600 hover:bg-teal-100",
  },
  {
    id: "stem-cells",
    name: "الخلايا الجذعية",
    description: "علاج متطور لتجديد الأنسجة وتخفيف الألم",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
  },
  {
    id: "consultation",
    name: "استشارة عامة",
    description: "استشارة طبية شاملة وتقييم للحالة",
    icon: Activity,
    color: "bg-green-50 text-green-600 hover:bg-green-100",
  },
]

export function ServiceSelection({ selectedService, onSelect }: ServiceSelectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-heading font-bold mb-2 text-center">اختر الخدمة المطلوبة</h2>
      <p className="text-muted-foreground text-center mb-8">حدد نوع الخدمة التي تحتاجها</p>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id, service.name)}
              className={`p-6 rounded-xl border-2 transition-all text-right hover:shadow-lg ${
                selectedService === service.id
                  ? "border-primary bg-brand-50"
                  : "border-neutral-200 hover:border-primary/50"
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
