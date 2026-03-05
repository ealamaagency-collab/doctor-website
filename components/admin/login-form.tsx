"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/admin/dashboard")
      } else {
        setError(data.error || "فشل تسجيل الدخول")
      }
    } catch (err) {
      setError("حدث خطأ أثناء تسجيل الدخول")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive" className="animate-shake">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">
            البريد الإلكتروني
          </Label>
          <div className="relative group">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="email"
              type="email"
              placeholder="admin@drihabyassin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-11 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-base">
            كلمة المرور
          </Label>
          <div className="relative group">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-11 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20"
              required
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full h-12 text-base font-semibold group" size="lg" disabled={loading}>
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            جاري تسجيل الدخول...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            تسجيل الدخول
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </span>
        )}
      </Button>
    </form>
  )
}
