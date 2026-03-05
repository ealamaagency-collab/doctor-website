"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Award, Users, Building2, Save } from "lucide-react"
import { toast } from "sonner"

interface Stats {
  experience: number
  operations: number
  hospitals: number
}

export function StatsEditor() {
  const [stats, setStats] = useState<Stats>({
    experience: 15,
    operations: 2500,
    hospitals: 8,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem("site_stats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      // Save to localStorage
      localStorage.setItem("site_stats", JSON.stringify(stats))

      // Also send to API for persistence
      await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      })

      toast.success("تم حفظ الإحصائيات بنجاح")
    } catch (error) {
      toast.error("حدث خطأ أثناء الحفظ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          تعديل العدادات والإحصائيات
        </CardTitle>
        <CardDescription>قم بتحديث أرقام الخبرة والعمليات والمستشفيات</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="experience" className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              سنوات الخبرة
            </Label>
            <Input
              id="experience"
              type="number"
              value={stats.experience}
              onChange={(e) => setStats({ ...stats, experience: Number(e.target.value) })}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="operations" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              عدد العمليات الناجحة
            </Label>
            <Input
              id="operations"
              type="number"
              value={stats.operations}
              onChange={(e) => setStats({ ...stats, operations: Number(e.target.value) })}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospitals" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              عدد المستشفيات
            </Label>
            <Input
              id="hospitals"
              type="number"
              value={stats.hospitals}
              onChange={(e) => setStats({ ...stats, hospitals: Number(e.target.value) })}
              min="0"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
