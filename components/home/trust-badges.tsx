"use client"

import { Award, Users, Building2, Clock, Heart, Star, Trophy, Target } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface Stat {
  id?: string
  key: string
  value: string
  label: string
  icon: string
}

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return (
    <div
      ref={counterRef}
      className="text-4xl font-bold text-zinc-900 mb-2 tracking-tight group-hover:text-medical-600 transition-colors duration-300"
    >
      {count}
      {suffix}
    </div>
  )
}

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

export function TrustBadges() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/public/stats")
        const result = await response.json()

        if (result.data && result.data.length > 0) {
          setStats(result.data)
        }
      } catch (error) {
        console.error("[v0] Error loading stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <section className="py-16 relative z-10 -mt-8">
        <div className="container-medical">
          <div className="glass-card rounded-3xl p-10 border border-white/60 shadow-sm">
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse text-zinc-400">جاري تحميل الإحصائيات...</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (stats.length === 0) {
    return null
  }

  const gridCols =
    stats.length === 1
      ? "grid-cols-1"
      : stats.length === 2
        ? "grid-cols-2"
        : stats.length === 3
          ? "grid-cols-3"
          : "grid-cols-2 md:grid-cols-4"

  return (
    <section className="py-16 relative z-10 -mt-8">
      <div className="container-medical">
        <div
          className={`grid ${gridCols} gap-6 glass-card rounded-3xl p-10 border border-white/60 shadow-sm hover:shadow-lg transition-all duration-500 divide-x divide-x-reverse divide-zinc-200/50`}
        >
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Award
            const numericValue = Number.parseInt(stat.value.replace(/\D/g, "")) || 0
            const suffix = stat.value.replace(/\d/g, "")

            return (
              <div key={stat.id || stat.key} className="text-center px-4 group cursor-default">
                <AnimatedCounter target={numericValue} suffix={suffix} />
                <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
