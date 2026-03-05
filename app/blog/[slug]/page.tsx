import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url?: string
  category: string
  tags: string[]
  author_name: string
  published_at: string
  reading_time: number
  is_featured: boolean
  views: number
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/public/blog/${slug}`,
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      return null
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.error("[v0] Error fetching post:", error)
    return null
  }
}

async function getRelatedPosts(category: string, currentSlug: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/public/blog`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const result = await response.json()
    return result.data.filter((p: BlogPost) => p.slug !== currentSlug && p.category === category).slice(0, 3)
  } catch (error) {
    console.error("[v0] Error fetching related posts:", error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: "مقال غير موجود",
    }
  }

  return {
    title: `${post.title} | د. إيهاب ياسين`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug)

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={post.image_url || "/placeholder.svg?height=500&width=1200&query=medical+blog"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <article className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 mb-12">
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
                <ArrowRight className="w-4 h-4" />
                العودة للمدونة
              </Link>

              <div className="text-sm text-primary font-semibold mb-4">{post.category}</div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    د.إ
                  </div>
                  <span className="font-medium">{post.author_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.reading_time} دقائق
                </div>
                <Button variant="outline" size="sm" className="mr-auto bg-transparent">
                  <Share2 className="w-4 h-4 ml-2" />
                  مشاركة
                </Button>
              </div>

              <div
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-8 mb-12">
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl flex-shrink-0">
                  د.إ
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">د. إيهاب ياسين</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    استشاري جراحة العظام والمفاصل مع أكثر من 15 عاماً من الخبرة في استبدال المفاصل والعلاجات الحديثة.
                    متخصص في جراحات الورك والركبة والعلاج بالخلايا الجذعية.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/about">المزيد عن الدكتور</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">مقالات ذات صلة</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="relative h-40">
                          <Image
                            src={relatedPost.image_url || "/placeholder.svg?height=200&width=300&query=medical"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-foreground mb-2 line-clamp-2 leading-tight">
                            {relatedPost.title}
                          </h3>
                          <div className="text-sm text-muted-foreground">{relatedPost.reading_time} دقائق</div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <Card className="p-8 text-center bg-primary/5">
              <h2 className="text-2xl font-bold text-foreground mb-4">هل تعاني من آلام المفاصل؟</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                احجز استشارة مع د. إيهاب ياسين للحصول على تشخيص دقيق وخطة علاج مناسبة
              </p>
              <Button asChild size="lg">
                <Link href="/book">احجز موعدك الآن</Link>
              </Button>
            </Card>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
