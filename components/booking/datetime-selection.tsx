"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronRight, Clock, Loader2, CalendarDays, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

interface DateTimeSelectionProps {
  serviceId: string
  selectedDate?: string
  selectedSlot?: string
  onSelect: (slotId: string, date: string, time: string) => void
  onBack: () => void
}

// Mock available slots - in production, fetch from database
const mockSlots = [
  { id: "slot-1", time: "10:00 صباحاً", available: true },
  { id: "slot-2", time: "11:00 صباحاً", available: true },
  { id: "slot-3", time: "12:00 ظهراً", available: false },
  { id: "slot-4", time: "2:00 مساءً", available: true },
  { id: "slot-5", time: "3:00 مساءً", available: true },
  { id: "slot-6", time: "4:00 مساءً", available: true },
  { id: "slot-7", time: "5:00 مساءً", available: false },
  { id: "slot-8", time: "6:00 مساءً", available: true },
]

export function DateTimeSelection({ serviceId, selectedDate, selectedSlot, onSelect, onBack }: DateTimeSelectionProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined)
  const [slots, setSlots] = useState<typeof mockSlots>([])
  const [loading, setLoading] = useState(false)
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(selectedSlot)

  useEffect(() => {
    console.log("[v0] Date changed:", date)
    if (date) {
      setLoading(true)
      console.log("[v0] Loading slots for date:", format(date, "yyyy-MM-dd"))

      // Simulate API call - in production, fetch from database
      setTimeout(() => {
        console.log("[v0] Setting slots:", mockSlots)
        setSlots(mockSlots)
        setLoading(false)
      }, 500)
    } else {
      // Clear slots when no date is selected
      setSlots([])
    }
  }, [date])

  const handleSlotSelect = (slotId: string, time: string) => {
    if (!date) return
    const formattedDate = format(date, "yyyy-MM-dd")
    console.log("[v0] Slot selected:", { slotId, formattedDate, time })
    onSelect(slotId, formattedDate, time)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    console.log("[v0] Calendar date selected:", selectedDate)
    setDate(selectedDate)
    // Reset selected slot when date changes
    setSelectedSlotId(undefined)
  }

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold mb-2 text-center">اختر التاريخ والوقت</h2>
      <p className="text-muted-foreground text-center mb-8">حدد اليوم والوقت المناسب لموعدك</p>

      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6">
        {/* Calendar Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">اختر التاريخ</h3>
          </div>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date() || date.getDay() === 5}
              locale={ar}
              className="rounded-xl border-0"
            />
          </div>
          {date && (
            <div className="mt-6 p-4 bg-brand-50 rounded-xl border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">التاريخ المحدد</p>
              <p className="font-semibold text-lg text-primary">{format(date, "EEEE، d MMMM yyyy", { locale: ar })}</p>
            </div>
          )}
        </div>

        {/* Time Slots Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">اختر الوقت</h3>
          </div>

          {!date ? (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                  <CalendarDays className="h-10 w-10 text-neutral-400" />
                </div>
                <p className="font-medium">اختر التاريخ أولاً</p>
                <p className="text-sm mt-2">لعرض الأوقات المتاحة</p>
              </div>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">جاري تحميل الأوقات المتاحة...</p>
              </div>
            </div>
          ) : slots.length === 0 ? (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Clock className="h-10 w-10 text-neutral-400" />
                </div>
                <p className="font-medium">لا توجد أوقات متاحة</p>
                <p className="text-sm mt-2">يرجى اختيار تاريخ آخر</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => {
                    if (slot.available) {
                      console.log("[v0] Slot button clicked:", slot.id)
                      setSelectedSlotId(slot.id)
                    }
                  }}
                  disabled={!slot.available}
                  className={`w-full p-4 rounded-xl border-2 text-right transition-all duration-200 ${
                    selectedSlotId === slot.id
                      ? "border-primary bg-gradient-to-br from-brand-50 to-brand-100 shadow-sm scale-[1.02]"
                      : slot.available
                        ? "border-neutral-200 hover:border-primary/50 hover:bg-neutral-50 hover:scale-[1.01]"
                        : "border-neutral-200 bg-neutral-50 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedSlotId === slot.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      <span className={`font-semibold text-lg ${selectedSlotId === slot.id ? "text-primary" : ""}`}>
                        {slot.time}
                      </span>
                    </div>
                    {!slot.available && (
                      <span className="text-xs px-3 py-1 bg-neutral-200 rounded-full text-neutral-600 font-medium">
                        محجوز
                      </span>
                    )}
                    {slot.available && selectedSlotId !== slot.id && (
                      <span className="text-xs text-muted-foreground">متاح</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent h-12 text-base">
          <ChevronRight className="h-4 w-4 ml-2" />
          السابق
        </Button>
        <Button
          onClick={() => {
            if (date && selectedSlotId) {
              const slot = slots.find((s) => s.id === selectedSlotId)
              if (slot) {
                handleSlotSelect(slot.id, slot.time)
              }
            }
          }}
          disabled={!date || !selectedSlotId}
          className="flex-1 h-12 text-base font-semibold"
        >
          التالي
        </Button>
      </div>
    </div>
  )
}
