import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar } from "lucide-react"

interface ServiceHeroProps {
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
}

export function ServiceHero({ title, subtitle, description, icon }: ServiceHeroProps) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white py-16 md:py-20">
      <div className="container-medical">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">{icon}</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-balance mb-4">{title}</h1>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-6">{subtitle}</p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">{description}</p>
          <Button size="lg" asChild>
            <Link href="/book">
              <Calendar className="h-5 w-5 ml-2" />
              احجز استشارة
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
