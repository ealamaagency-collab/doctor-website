import { LoginForm } from "@/components/admin/login-form"
import { Activity, Shield, Stethoscope } from "lucide-react"

export const metadata = {
  title: "تسجيل الدخول - لوحة التحكم",
  description: "تسجيل الدخول إلى لوحة تحكم الإدارة",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating medical icons with animations */}
        <div className="absolute top-20 right-[10%] text-brand-200 opacity-20 animate-float">
          <Stethoscope className="w-24 h-24" />
        </div>
        <div className="absolute bottom-32 left-[15%] text-accent/20 opacity-20 animate-float-delayed">
          <Activity className="w-32 h-32" />
        </div>
        <div className="absolute top-1/3 left-[8%] text-brand-100 opacity-20 animate-float-slow">
          <Shield className="w-20 h-20" />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slower" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      {/* Login Card Container */}
      <div className="relative w-full max-w-md z-10">
        {/* Decorative top badge */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-brand-100">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-brand-700">لوحة التحكم الطبية</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-brand-100/50 p-8 md:p-10 animate-fade-in-up animation-delay-100 relative overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-500/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />

          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl shadow-lg mb-4 animate-fade-in-up animation-delay-200">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-brand-900 mb-2 animate-fade-in-up animation-delay-300">
              مرحباً بك
            </h1>
            <p className="text-muted-foreground animate-fade-in-up animation-delay-400">
              قم بتسجيل الدخول للوصول إلى لوحة التحكم
            </p>
          </div>

          {/* Login Form */}
          <div className="animate-fade-in-up animation-delay-500">
            <LoginForm />
          </div>

          {/* Security Badge */}
          <div className="mt-6 pt-6 border-t border-border animate-fade-in-up animation-delay-600">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5" />
              <span>اتصال آمن ومشفر</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-6 animate-fade-in animation-delay-700">
          <p className="text-sm text-muted-foreground">© 2025 د. إيهاب ياسين - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  )
}
