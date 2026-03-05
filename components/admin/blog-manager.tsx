"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Save, X, Loader2, Eye, EyeOff, Star, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url?: string
  category: string
  tags: string[]
  author_name: string
  is_featured: boolean
  is_published: boolean
  published_at: string
  reading_time: number
  views: number
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    author_name: "د. إيهاب ياسين",
    is_featured: false,
    is_published: true,
    reading_time: 5,
    tags: [],
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [tagInput, setTagInput] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setFetching(true)
      const response = await fetch("/api/admin/blog")
      const result = await response.json()

      if (result.data) {
        setPosts(result.data)
      }
    } catch (error) {
      console.error("[v0] Error loading blog posts:", error)
      toast.error("فشل تحميل المقالات")
    } finally {
      setFetching(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.category) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    try {
      setLoading(true)

      if (editingId) {
        const response = await fetch(`/api/admin/blog/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error("Failed to update")

        toast.success("تم تحديث المقال بنجاح")
      } else {
        const newPost = {
          ...formData,
          published_at: new Date().toISOString(),
        }

        const response = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        })

        if (!response.ok) throw new Error("Failed to create")

        toast.success("تم إضافة المقال بنجاح")
      }

      await loadPosts()
      setEditingId(null)
      setFormData({
        author_name: "د. إيهاب ياسين",
        is_featured: false,
        is_published: true,
        reading_time: 5,
        tags: [],
      })
    } catch (error) {
      console.error("[v0] Error saving blog post:", error)
      toast.error("فشل حفظ المقال")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id)
    setFormData(post)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("تم حذف المقال بنجاح")
      await loadPosts()
    } catch (error) {
      console.error("[v0] Error deleting blog post:", error)
      toast.error("فشل حذف المقال")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      author_name: "د. إيهاب ياسين",
      is_featured: false,
      is_published: true,
      reading_time: 5,
      tags: [],
    })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag) || [],
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("يجب أن يكون الملف صورة")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت")
      return
    }

    try {
      setUploadingImage(true)

      const formDataToUpload = new FormData()
      formDataToUpload.append("file", file)

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formDataToUpload,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "فشل رفع الصورة")
      }

      const { url } = await response.json()
      setFormData({ ...formData, image_url: url })
      toast.success("تم رفع الصورة بنجاح")
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      toast.error(error instanceof Error ? error.message : "فشل رفع الصورة")
    } finally {
      setUploadingImage(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "تعديل المقال" : "إضافة مقال جديد"}</CardTitle>
          <CardDescription>املأ البيانات التالية لإضافة أو تعديل مقال</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان المقال *</Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="عنوان جذاب للمقال"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">الرابط (Slug) *</Label>
              <Input
                id="slug"
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="article-url-slug"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">المقتطف *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt || ""}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="ملخص قصير للمقال"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">المحتوى الكامل *</Label>
            <Textarea
              id="content"
              value={formData.content || ""}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="محتوى المقال بالكامل"
              rows={8}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">التصنيف *</Label>
              <Input
                id="category"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="جراحة العظام"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author_name">اسم الكاتب</Label>
              <Input
                id="author_name"
                value={formData.author_name || ""}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                placeholder="د. إيهاب ياسين"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reading_time">وقت القراءة (دقائق)</Label>
              <Input
                id="reading_time"
                type="number"
                value={formData.reading_time || ""}
                onChange={(e) => setFormData({ ...formData, reading_time: Number(e.target.value) })}
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">صورة المقال</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  id="image_upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="flex-1"
                />
                {uploadingImage && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
              </div>

              {formData.image_url && (
                <div className="relative rounded-lg border border-border overflow-hidden bg-muted">
                  <img
                    src={formData.image_url || "/placeholder.svg"}
                    alt="معاينة الصورة"
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 left-2"
                    onClick={() => setFormData({ ...formData, image_url: undefined })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {!formData.image_url && !uploadingImage && (
                <div className="flex items-center justify-center h-48 border-2 border-dashed border-border rounded-lg bg-muted/50">
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">اختر صورة للمقال</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>الوسوم (Tags)</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                placeholder="أضف وسم واضغط Enter"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                إضافة
              </Button>
            </div>
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
              <Label htmlFor="is_published">منشور</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <Label htmlFor="is_featured">مميز</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editingId ? "حفظ التعديلات" : "إضافة المقال"}
            </Button>
            {editingId && (
              <Button onClick={handleCancel} variant="outline" className="gap-2 bg-transparent">
                <X className="h-4 w-4" />
                إلغاء
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    {post.is_featured && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">/{post.slug}</p>
                  <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">{post.category}</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-muted px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    <span>• {post.reading_time} دقائق</span>
                    <span>• {post.views} مشاهدة</span>
                    {post.is_published ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <Eye className="h-3 w-3" />
                        منشور
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <EyeOff className="h-3 w-3" />
                        مسودة
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(post)} variant="outline" size="icon" disabled={loading}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
