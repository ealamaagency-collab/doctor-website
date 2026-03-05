"use client"

import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
  showText?: boolean
  href?: string
}

export function Logo({ className = "", showText = true, href = "/" }: LogoProps) {
  const logoUrl = "/images/frame-209.png"

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Image */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-medical-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

        <div className="relative w-11 h-11 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg shadow-medical-500/20 group-hover:scale-110 transition-transform duration-300 ease-out">
          <Image
            src={logoUrl || "/placeholder.svg"}
            alt="د. إيهاب ياسين - استشاري جراحة العظام والمفاصل"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col items-start">
          <span className="text-xl font-bold tracking-tight text-zinc-800 group-hover:text-medical-700 transition-colors">
            د. إيهاب ياسين
          </span>
          <span className="text-xs text-zinc-500">استشاري جراحة العظام والكسور والمفاصل</span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}
