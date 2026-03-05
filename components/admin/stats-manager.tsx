"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Award,
  Users,
  Building2,
  Clock,
  Heart,
  Star,
  Trophy,
  Target,
  Plus,
  Save,
  Trash2,
  Loader2,
  BarChart3,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"

interface Stat {
  id?: string
  key: string
  value: string
  label: string
  icon: string
  order_index?: number
}

const iconOptions = [
  { value: "Award", label: "جائزة", icon: Award },
  { value: "Users", label: "مستخدمين", icon: Users },
  { value: "Building2", label: "مبنى", icon: Building2 },
  { value: "Clock", label: "ساعة", icon: Clock },
  { value: "Heart", label: "قلب", icon: Heart },
  { value: "Star", label: "نجمة", icon: Star },
  { value: "Trophy", label: "كأس", icon: Trophy },
  { value: "Target", label: "هدف", icon: Target },
]

const iconMap: Record<string, any> = {
  Award,
  Users,
  Building2,
  Clock,
  Heart,
  Star,
  Trophy,
  Target,
}

export function StatsManager() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newStat, setNewStat] = useState<Stat>({
    key: "",
    value: "",
    label: "",
    icon: "Award",
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    setError(null)
    try {
      const response = await fetch("/api/admin/stats/manage")
      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setStats(result.data || [])
    } catch (error: any) {
      console.error("[v0] Error fetching stats:", error)
      setError(error.message || "حدث خطأ أثناء جلب الإحصائيات")
    } finally {
      setLoading(false)
    }
  }

  const handleAddStat = async () => {
    if (!newStat.key.trim() || !newStat.value.trim() || !newStat.label.trim()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    setSaving(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/stats/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: newStat.key.trim(),
          value: newStat.value.trim(),
          label: newStat.label.trim(),
          icon: newStat.icon,
        }),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(result.error || "فشل في إضافة الإحصائية")
      }

      toast.success("تمت إضافة الإحصائية بنجاح")
      setShowAddForm(false)
      setNewStat({
        key: "",
        value: "",
        label: "",
        icon: "Award",
      })
      fetchStats()
    } catch (error: any) {
      console.error("[v0] Error adding stat:", error)
      toast.error(error.message || "حدث خطأ أثناء الإضافة")
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateStat = async (stat: Stat) => {
    if (!stat.id) return

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/stats/manage/${stat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: stat.key,
          value: stat.value,
          label: stat.label,
          icon: stat.icon,
        }),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(result.error || "فشل في تحديث الإحصائية")
      }

      toast.success("تم تحديث الإحصائية بنجاح")
      setEditingId(null)
      fetchStats()
    } catch (error: any) {
      console.error("[v0] Error updating stat:", error)
      toast.error(error.message || "حدث خطأ أثناء التحديث")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteStat = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الإحصائية؟")) return

    try {
      const response = await fetch(`/api/admin/stats/manage/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(result.error || "فشل في حذف الإحصائية")
      }

      toast.success("تم حذف الإحصائية بنجاح")
      fetchStats()
    } catch (error: any) {
      console.error("[v0] Error deleting stat:", error)
      toast.error(error.message || "حدث خطأ أثناء الحذف")
    }
  }

  const updateStatField = (id: string, field: keyof Stat, value: string | number) => {
    setStats(stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-medical-600" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 py-4">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-medical-100 rounded-xl flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-medical-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900">الإحصائيات الحالية</h2>
            <p className="text-sm text-zinc-500">{stats.length} إحصائية</p>
          </div>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-medical-600 hover:bg-medical-700">
          <Plus className="h-4 w-4" />
          إضافة إحصائية
        </Button>
      </div>

      {/* Add New Stat Form */}
      {showAddForm && (
        <Card className="border-medical-200 bg-medical-50/50">
          <CardHeader>
            <CardTitle className="text-lg">إضافة إحصائية جديدة</CardTitle>
            <CardDescription>أدخل تفاصيل الإحصائية الجديدة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-key">المفتاح (باللغة الإنجليزية) *</Label>
                <Input
                  id="new-key"
                  placeholder="مثال: experience"
                  value={newStat.key}
                  onChange={(e) => setNewStat({ ...newStat, key: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-value">القيمة (الرقم) *</Label>
                <Input
                  id="new-value"
                  placeholder="مثال: 20+"
                  value={newStat.value}
                  onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-label">الوصف (باللغة العربية) *</Label>
                <Input
                  id="new-label"
                  placeholder="مثال: سنوات الخبرة"
                  value={newStat.label}
                  onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>الأيقونة</Label>
                <Select value={newStat.icon} onValueChange={(value) => setNewStat({ ...newStat, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => {
                      const IconComp = option.icon
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <IconComp className="h-4 w-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddStat} disabled={saving} className="gap-2 bg-medical-600 hover:bg-medical-700">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                إضافة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats List */}
      <div className="grid gap-4">
        {stats.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <BarChart3 className="h-12 w-12 text-zinc-300 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 mb-2">لا توجد إحصائيات</h3>
              <p className="text-zinc-500 mb-4">قم بإضافة إحصائيات جديدة لعرضها في الصفحة الرئيسية</p>
              <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-medical-600 hover:bg-medical-700">
                <Plus className="h-4 w-4" />
                إضافة إحصائية
              </Button>
            </CardContent>
          </Card>
        ) : (
          stats.map((stat) => {
            const IconComp = iconMap[stat.icon] || Award
            const isEditing = editingId === stat.id

            return (
              <Card
                key={stat.id}
                className={`transition-all duration-200 ${
                  isEditing ? "border-medical-400 shadow-md" : "hover:shadow-sm"
                }`}
              >
                <CardContent className="p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>المفتاح</Label>
                          <Input value={stat.key} onChange={(e) => updateStatField(stat.id!, "key", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>القيمة</Label>
                          <Input
                            value={stat.value}
                            onChange={(e) => updateStatField(stat.id!, "value", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>الوصف</Label>
                          <Input
                            value={stat.label}
                            onChange={(e) => updateStatField(stat.id!, "label", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الأيقونة</Label>
                          <Select value={stat.icon} onValueChange={(value) => updateStatField(stat.id!, "icon", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {iconOptions.map((option) => {
                                const Icon = option.icon
                                return (
                                  <SelectItem key={option.value} value={option.value}>
                                    <div className="flex items-center gap-2">
                                      <Icon className="h-4 w-4" />
                                      <span>{option.label}</span>
                                    </div>
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingId(null)
                            fetchStats()
                          }}
                        >
                          إلغاء
                        </Button>
                        <Button
                          onClick={() => handleUpdateStat(stat)}
                          disabled={saving}
                          className="gap-2 bg-medical-600 hover:bg-medical-700"
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          حفظ
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-medical-100 rounded-xl flex items-center justify-center">
                          <IconComp className="h-6 w-6 text-medical-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-zinc-900">{stat.value}</span>
                            <span className="text-zinc-500">{stat.label}</span>
                          </div>
                          <p className="text-sm text-zinc-400">المفتاح: {stat.key}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingId(stat.id!)}>
                          تعديل
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          onClick={() => handleDeleteStat(stat.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Preview Section */}
      {stats.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>معاينة</CardTitle>
            <CardDescription>هذا ما سيظهر في الصفحة الرئيسية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-zinc-50 rounded-2xl p-8">
              {stats.map((stat) => {
                const IconComp = iconMap[stat.icon] || Award
                return (
                  <div key={stat.id} className="text-center">
                    <div className="text-3xl font-bold text-zinc-900 mb-1">{stat.value}</div>
                    <p className="text-sm text-zinc-500">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
