"use client"

import Link from "next/link"
import { MapPin, Phone, Clock, Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import { Logo } from "@/components/logo"

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

export function Footer() {
  const socialLinks = [
    { url: "https://web.facebook.com/dr.ihabyassin/?locale=ar_AR&_rdc=1&_rdr", icon: Facebook, label: "فيسبوك" },
    { url: "https://www.instagram.com/dr_ihabyassin?igsh=N3NtdnJzdzU3aDAw", icon: Instagram, label: "إنستغرام" },
    { url: "https://x.com/dr_ehabyassin?s=11", icon: Twitter, label: "تويتر" },
    { url: "https://www.tiktok.com/@dr.ihabyassinclinic?_r=1&_t=ZS-92nVhM2dgGY", icon: TikTokIcon, label: "تيكتوك" },
    { url: "https://www.youtube.com/channel/UCwZ_iUL2Qm-nZXXBJAaQC0A", icon: Youtube, label: "يوتيوب" },
  ]

  return (
    <footer className="bg-zinc-900 text-zinc-100 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950" />

      <div className="container-medical py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section - Updated description */}
          <div>
            <div className="mb-6">
              <Logo showText={true} href="/" className="[&_span]:text-white [&_.text-muted-foreground]:text-zinc-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">د. إيهاب ياسين سلمان</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">استشاري جراحة العظام والكسور والمفاصل</p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              متخصص في جراحة واستبدال مفصل الورك والركبة وعلاج تنخر مفصل الورك الأولي بالخلايا الجذعية. نساعدك على
              العودة إلى حياتك الطبيعية بدون ألم.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-zinc-800 hover:bg-medical-600 rounded-xl transition-all duration-300 hover:scale-110"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links - Updated links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">روابط سريعة</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/about", label: "من نحن" },
                { href: "/hip-replacement", label: "تبديل مفصل الورك" },
                { href: "/knee-replacement", label: "تبديل مفصل الركبة" },
                { href: "/stem-cells", label: "الخلايا الجذعية" },
                { href: "/prp-therapy", label: "العلاج بالبلازما" },
                { href: "/testimonials", label: "تجارب المرضى" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-medical-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-zinc-800 rounded-xl">
              <p className="text-medical-400 font-bold text-2xl">+20</p>
              <p className="text-zinc-400 text-sm">سنوات الخبرة</p>
            </div>
          </div>

          {/* Contact Info - Updated contact information */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">معلومات التواصل</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg">
                  <MapPin className="h-4 w-4 text-medical-400" />
                </div>
                <div className="text-zinc-400">
                  <p>العراق – بغداد – الحارثية</p>
                  <p>شارع الكندي – داخل مستشفى الاميرات الأهلي</p>
                  <p className="text-xs text-zinc-500 mt-1">ملاحظة: يتوفر موقف سيارات في المستشفى</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg">
                  <Phone className="h-4 w-4 text-medical-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:07710751000"
                    className="text-zinc-400 hover:text-medical-400 transition-colors"
                    dir="ltr"
                  >
                    07710751000
                  </a>
                  <a
                    href="tel:07890751000"
                    className="text-zinc-400 hover:text-medical-400 transition-colors"
                    dir="ltr"
                  >
                    07890751000
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Working Hours - Updated working hours */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">ساعات العمل</h4>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg">
                  <Clock className="h-4 w-4 text-medical-400" />
                </div>
                <div>
                  <p className="font-medium text-white">الأحد - الأربعاء</p>
                  <p>12:00 م - 03:00 م</p>
                </div>
              </div>
              <div className="mr-11">
                <p className="font-medium text-white">الخميس - الجمعة - السبت</p>
                <p className="text-red-400">مغلق</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Updated hospital name */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} د. إيهاب ياسين سلمان - جميع الحقوق محفوظة</p>
            <div className="flex gap-6">
              <Link href="/policies/privacy" className="hover:text-medical-400 transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/policies/terms" className="hover:text-medical-400 transition-colors">
                الشروط والأحكام
              </Link>
              <Link href="/policies/medical-disclaimer" className="hover:text-medical-400 transition-colors">
                إخلاء المسؤولية الطبية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
