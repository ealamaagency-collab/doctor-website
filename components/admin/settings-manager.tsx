"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Save, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export function SettingsManager() {
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      const data = await response.json()
      setSettings(data.settings || {})
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert("تم حفظ الإعدادات بنجاح!")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("فشل حفظ الإعدادات")
    } finally {
      setSaving(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingLogo(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        setSettings({ ...settings, logo_url: data.url })
      }
    } catch (error) {
      console.error("Error uploading logo:", error)
      alert("فشل رفع الشعار")
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("كلمة المرور الجديدة غير متطابقة")
      return
    }

    if (passwordData.newPassword.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      return
    }

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error("Error changing password:", error)
      alert("فشل تغيير كلمة المرور")
    }
  }

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>
  }

  return (
    <div className="space-y-6">
      {/* Logo Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">الشعار</h2>

        <div className="space-y-4">
          {settings.logo_url && (
            <div className="flex justify-center">
              <div className="relative w-32 h-32 border-2 border-border rounded-lg overflow-hidden">
                <Image src={settings.logo_url || "/placeholder.svg"} alt="Logo" fill className="object-contain" />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="logo">رفع شعار جديد (مربع)</Label>
            <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploadingLogo} />
            {uploadingLogo && <p className="text-sm text-muted-foreground mt-2">جاري الرفع...</p>}
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">معلومات التواصل</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact_phone">رقم الهاتف</Label>
            <Input
              id="contact_phone"
              value={settings.contact_phone || ""}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              placeholder="+966 XX XXX XXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_email">البريد الإلكتروني</Label>
            <Input
              id="contact_email"
              type="email"
              value={settings.contact_email || ""}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              placeholder="info@example.com"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="contact_address">العنوان</Label>
            <Input
              id="contact_address"
              value={settings.contact_address || ""}
              onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
              placeholder="المدينة، الدولة"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="working_hours">ساعات العمل</Label>
            <Input
              id="working_hours"
              value={settings.working_hours || ""}
              onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
              placeholder="السبت - الخميس: 9:00 صباحاً - 5:00 مساءً"
            />
          </div>
        </div>
      </Card>

      {/* Map Location */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">موقع الخريطة</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="map_latitude">خط العرض (Latitude)</Label>
            <Input
              id="map_latitude"
              value={settings.map_latitude || ""}
              onChange={(e) => setSettings({ ...settings, map_latitude: e.target.value })}
              placeholder="24.7136"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="map_longitude">خط الطول (Longitude)</Label>
            <Input
              id="map_longitude"
              value={settings.map_longitude || ""}
              onChange={(e) => setSettings({ ...settings, map_longitude: e.target.value })}
              placeholder="46.6753"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          يمكنك الحصول على الإحداثيات من Google Maps بالنقر بزر الماوس الأيمن على الموقع
        </p>
      </Card>

      {/* Social Media */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">روابط التواصل الاجتماعي</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp_number">رقم الواتساب</Label>
            <Input
              id="whatsapp_number"
              value={settings.whatsapp_number || ""}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              placeholder="+966XXXXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook_url">فيسبوك</Label>
            <Input
              id="facebook_url"
              value={settings.facebook_url || ""}
              onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter_url">تويتر / X</Label>
            <Input
              id="twitter_url"
              value={settings.twitter_url || ""}
              onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
              placeholder="https://twitter.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram_url">إنستغرام</Label>
            <Input
              id="instagram_url"
              value={settings.instagram_url || ""}
              onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin_url">لينكد إن</Label>
            <Input
              id="linkedin_url"
              value={settings.linkedin_url || ""}
              onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
              placeholder="https://linkedin.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube_url">يوتيوب</Label>
            <Input
              id="youtube_url"
              value={settings.youtube_url || ""}
              onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      </Card>

      {/* Legal Pages */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">الصفحات القانونية</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="privacy_policy">سياسة الخصوصية</Label>
            <Textarea
              id="privacy_policy"
              value={settings.privacy_policy || ""}
              onChange={(e) => setSettings({ ...settings, privacy_policy: e.target.value })}
              rows={6}
              placeholder="أدخل نص سياسة الخصوصية..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms_conditions">الشروط والأحكام</Label>
            <Textarea
              id="terms_conditions"
              value={settings.terms_conditions || ""}
              onChange={(e) => setSettings({ ...settings, terms_conditions: e.target.value })}
              rows={6}
              placeholder="أدخل نص الشروط والأحكام..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medical_disclaimer">إخلاء المسؤولية الطبية</Label>
            <Textarea
              id="medical_disclaimer"
              value={settings.medical_disclaimer || ""}
              onChange={(e) => setSettings({ ...settings, medical_disclaimer: e.target.value })}
              rows={6}
              placeholder="أدخل نص إخلاء المسؤولية الطبية..."
            />
          </div>
        </div>
      </Card>

      {/* Change Password */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">تغيير كلمة المرور</h2>

        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="current_password">كلمة المرور الحالية</Label>
            <div className="relative">
              <Input
                id="current_password"
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new_password">كلمة المرور الجديدة</Label>
            <Input
              id="new_password"
              type={showPassword ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">تأكيد كلمة المرور</Label>
            <Input
              id="confirm_password"
              type={showPassword ? "text" : "password"}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />
          </div>

          <Button onClick={handleChangePassword}>تغيير كلمة المرور</Button>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="ml-2 h-5 w-5" />
          {saving ? "جاري الحفظ..." : "حفظ جميع الإعدادات"}
        </Button>
      </div>
    </div>
  )
}
