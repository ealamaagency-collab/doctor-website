"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Stethoscope,
  MessageSquare,
  LogOut,
  Calendar,
  BookOpen,
  HelpCircle,
  Settings,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"

const menuItems = [
  {
    title: "نظرة عامة",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "إدارة الإحصائيات",
    href: "/admin/stats",
    icon: BarChart3,
  },
  {
    title: "إدارة الخدمات",
    href: "/admin/services",
    icon: Stethoscope,
  },
  {
    title: "تجارب المرضى",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    title: "إدارة المدونة",
    href: "/admin/blog",
    icon: BookOpen,
  },
  {
    title: "إدارة المواعيد",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "الأسئلة الشائعة",
    href: "/admin/faqs",
    icon: HelpCircle,
  },
  {
    title: "الإعدادات",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-white border-l border-border shadow-lg z-50">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Logo showText={true} href="/admin/dashboard" />
          <p className="text-sm text-muted-foreground mt-2">لوحة التحكم</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  "hover:bg-primary/10 hover:text-primary",
                  isActive ? "bg-primary text-white hover:bg-primary hover:text-white" : "text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}
