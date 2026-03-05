"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"

const mainNavLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
]

const servicesLinks = [
  { href: "/hip-replacement", label: "تبديل مفصل الورك" },
  { href: "/knee-replacement", label: "تبديل مفصل الركبة" },
  { href: "/stem-cells", label: "الخلايا الجذعية" },
  { href: "/prp-therapy", label: "العلاج بالبلازما (PRP)" },
]

const secondaryNavLinks = [
  { href: "/testimonials", label: "تجارب المرضى" },
  { href: "/contact", label: "تواصل معنا" },
]

const allNavLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/hip-replacement", label: "تبديل مفصل الورك" },
  { href: "/knee-replacement", label: "تبديل مفصل الركبة" },
  { href: "/stem-cells", label: "الخلايا الجذعية" },
  { href: "/prp-therapy", label: "العلاج بالبلازما (PRP)" },
  { href: "/testimonials", label: "تجارب المرضى" },
  { href: "/contact", label: "تواصل معنا" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/60 shadow-sm">
      <div className="container-medical">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Logo />

          {/* Desktop Navigation - Pill style */}
          <div className="hidden lg:flex items-center bg-white/60 border border-zinc-200/60 rounded-full py-2.5 px-2 shadow-sm backdrop-blur-md gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 text-sm font-medium text-zinc-500 hover:text-medical-700 hover:bg-white hover:shadow-sm rounded-full transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-5 py-2 text-sm font-medium text-zinc-500 hover:text-medical-700 hover:bg-white hover:shadow-sm rounded-full transition-all duration-300">
                الخدمات
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl border-white/60 shadow-xl">
                {servicesLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {secondaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 text-sm font-medium text-zinc-500 hover:text-medical-700 hover:bg-white hover:shadow-sm rounded-full transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Dark style */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/book"
              className="btn-shine flex items-center gap-2 hover:bg-zinc-800 hover:scale-105 transition-all duration-300 text-xs font-semibold text-white bg-zinc-900 rounded-full py-3.5 px-6 shadow-lg shadow-zinc-900/10"
            >
              <span>احجز موعدك الآن</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-180"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-600 hover:bg-white/80 rounded-xl transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-200/50">
            <div className="flex flex-col gap-2">
              {allNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-zinc-600 hover:text-medical-700 hover:bg-white/80 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button variant="outline" size="sm" asChild className="w-full bg-white/80 rounded-full border-zinc-200">
                  <Link href="tel:07710751000">
                    <Phone className="h-4 w-4 ml-2" />
                    اتصل الآن
                  </Link>
                </Button>
                <Link
                  href="/book"
                  className="btn-shine flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-zinc-900 rounded-full py-3 px-6 shadow-lg"
                >
                  احجز موعدك الآن
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
