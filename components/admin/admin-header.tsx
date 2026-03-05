"use client"

import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "لوحة التحكم",
  "/admin/services": "إدارة الخدمات",
  "/admin/testimonials": "تجارب المرضى",
}

export function AdminHeader() {
  const pathname = usePathname()
  const pageTitle = pageTitles[pathname] || "لوحة التحكم"

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-heading font-bold">{pageTitle}</h1>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">مدير النظام</p>
              <p className="text-xs text-muted-foreground">admin@drehabyassin.com</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">إ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
