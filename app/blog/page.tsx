"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Loader2, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  image_url?: string
  category: string
  published_at: string
  reading_time: number
  is_featured: boolean
}

const categories = ["الكل", "جراحة العظام", "الوقاية والعلاج", "استبدال المفاصل", "علاجات حديثة", "التأهيل"]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("الكل")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("[v0] Fetching blog posts...")
        const response = await fetch("/api/public/blog")
        const result = await response.json()

        console.log("[v0] Blog posts response:", result)

        if (result.data) {
          console.log("[v0] Found", result.data.length, "blog posts")
          setPosts(result.data)
        } else {
          console.log("[v0] No blog posts data in response")
        }
      } catch (error) {
        console.error("[v0] Error loading blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = selectedCategory === "الكل" ? posts : posts.filter((post) => post.category === selectedCategory)

  const featuredPost = filteredPosts.find((post) => post.is_featured)
  const regularPosts = filteredPosts.filter((post) => !post.is_featured)

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    )
  }

  if (posts.length === 0) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">المدونة الطبية</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  مقالات ونصائح طبية متخصصة في جراحة العظام وصحة المفاصل
                </p>
              </div>
            </div>
          </section>

          {/* Empty State */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">لا توجد مقالات حالياً</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  نعمل على إضافة محتوى طبي قيم. تابعنا قريباً للحصول على أحدث المقالات والنصائح الطبية.
                </p>
                <Button asChild>
                  <Link href="/">العودة للرئيسية</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">المدونة الطبية</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                مقالات ونصائح طبية متخصصة في جراحة العظام وصحة المفاصل
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={
                            featuredPost.image_url ||
                            "/placeholder.svg?height=400&width=600&query=medical+orthopedic+surgery"
                          }
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          مميز
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="text-sm text-primary font-semibold mb-3">{featuredPost.category}</div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(featuredPost.published_at).toLocaleDateString("ar-EG", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredPost.reading_time} دقائق
                          </div>
                        </div>
                        <Button className="w-fit">
                          اقرأ المزيد
                          <ArrowLeft className="w-4 h-4 mr-2" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            {regularPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-lg">لا توجد مقالات في هذا التصنيف</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48">
                        <Image
                          src={post.image_url || "/placeholder.svg?height=300&width=400&query=medical+orthopedic"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-primary font-semibold mb-2">{post.category}</div>
                        <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.published_at).toLocaleDateString("ar-EG", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.reading_time} دقائق
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">اشترك في نشرتنا الطبية</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                احصل على آخر المقالات والنصائح الطبية مباشرة في بريدك الإلكتروني
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 h-12 rounded-md border border-input bg-background px-4 text-base"
                />
                <Button size="lg">اشترك الآن</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
