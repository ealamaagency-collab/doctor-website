import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const posts = [
  {
    title: "متى تحتاج إلى عملية تبديل مفصل الركبة؟",
    excerpt: "تعرف على العلامات والأعراض التي تشير إلى ضرورة إجراء عملية استبدال مفصل الركبة",
    image: "/knee-replacement-surgery-medical.jpg",
    slug: "when-do-you-need-knee-replacement",
    readTime: "5 دقائق",
    date: "15 يناير 2025",
  },
  {
    title: "فترة التعافي بعد جراحة استبدال مفصل الورك",
    excerpt: "دليل شامل لفترة التعافي والعودة إلى الأنشطة اليومية بعد عملية تبديل مفصل الورك",
    image: "/hip-replacement-recovery-physical-therapy.jpg",
    slug: "hip-replacement-recovery-guide",
    readTime: "7 دقائق",
    date: "10 يناير 2025",
  },
  {
    title: "الخلايا الجذعية: علاج واعد لآلام المفاصل",
    excerpt: "كيف يمكن للخلايا الجذعية أن تساعد في علاج التهاب المفاصل وتجديد الأنسجة",
    image: "/stem-cell-therapy-medical-treatment.jpg",
    slug: "stem-cells-for-joint-pain",
    readTime: "6 دقائق",
    date: "5 يناير 2025",
  },
]

export function BlogPreview() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-medical">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-balance mb-4">أحدث المقالات</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              معلومات طبية موثوقة لمساعدتك على اتخاذ قرارات صحية مستنيرة
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex bg-transparent">
            <Link href="/blog">
              عرض الكل
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <Button
                  variant="ghost"
                  asChild
                  className="group/btn p-0 h-auto font-semibold text-primary hover:text-primary"
                >
                  <Link href={`/blog/${post.slug}`}>
                    اقرأ المزيد
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover/btn:-translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/blog">
              عرض جميع المقالات
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
