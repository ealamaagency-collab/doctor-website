"use client"

import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

const defaultFaqs: FAQ[] = [
  {
    id: "1",
    question: "كم تستغرق عملية استبدال المفصل؟",
    answer:
      "عادة ما تستغرق العملية بين ساعة إلى ساعتين، وذلك حسب نوع المفصل والحالة الصحية للمريض. يتم إجراء العملية تحت التخدير العام أو النصفي.",
    category: "general",
  },
  {
    id: "2",
    question: "ما هي فترة التعافي المتوقعة؟",
    answer:
      "معظم المرضى يمكنهم المشي في نفس يوم العملية أو في اليوم التالي. العودة للأنشطة اليومية الخفيفة تستغرق 4-6 أسابيع، بينما التعافي الكامل يحتاج 3-6 أشهر.",
    category: "recovery",
  },
  {
    id: "3",
    question: "ما هي نسبة نجاح العملية؟",
    answer:
      "نسبة النجاح تتجاوز 95% مع استخدام أحدث التقنيات والمفاصل الصناعية عالية الجودة. عمليات استبدال المفاصل من أكثر العمليات الجراحية نجاحاً وأماناً.",
    category: "safety",
  },
  {
    id: "4",
    question: "هل سأشعر بالمفصل الصناعي؟",
    answer:
      "المفاصل الصناعية الحديثة مصممة لتعمل بشكل طبيعي جداً. بعد فترة التعافي، معظم المرضى لا يشعرون بأي فرق ويمكنهم ممارسة حياتهم الطبيعية بدون ألم.",
    category: "experience",
  },
  {
    id: "5",
    question: "ما هي مدة بقاء المفصل الصناعي؟",
    answer:
      "المفاصل الصناعية الحديثة مصممة لتستمر 20-25 سنة أو أكثر. العناية الصحيحة والمتابعة الدورية تساعد على إطالة عمر المفصل.",
    category: "durability",
  },
]

export function FAQPreview() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch("/api/public/faqs")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      if (data.faqs && data.faqs.length > 0) {
        setFaqs(data.faqs.slice(0, 5))
      }
    } catch (error) {
      console.error("[v0] Error fetching FAQs:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-medical">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">الأسئلة الشائعة</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
                className="border border-slate-200 rounded-lg px-6 bg-white hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-right hover:no-underline py-5">
                  <span className="font-heading font-semibold text-lg text-slate-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 leading-relaxed pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
