"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { StepIndicator } from "./step-indicator"
import { ServiceSelection } from "./service-selection"
import { DateTimeSelection } from "./datetime-selection"
import { PatientInfo } from "./patient-info"
import { BookingConfirmation } from "./booking-confirmation"

export type BookingData = {
  serviceId: string
  serviceName: string
  slotId: string
  date: string
  time: string
  patientName: string
  email: string
  phone: string
  notes: string
}

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>("")

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (patientName: string, email: string, phone: string, notes: string) => {
    setIsSubmitting(true)
    setError("")

    try {
      console.log("[v0] Submitting booking with data:", {
        patient_name: patientName,
        patient_email: email,
        patient_phone: phone,
        service: bookingData.serviceName,
        appointment_date: bookingData.date,
        appointment_time: bookingData.time,
        notes,
      })

      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_name: patientName,
          patient_email: email,
          patient_phone: phone,
          service: bookingData.serviceName,
          appointment_date: bookingData.date,
          appointment_time: bookingData.time,
          notes,
        }),
      })

      const data = await response.json()
      console.log("[v0] Booking API response:", data)

      if (!response.ok) {
        throw new Error(data.error || data.details || "فشل في إنشاء الموعد")
      }

      // Update booking data with final info
      updateBookingData({ patientName, email, phone, notes })
      setIsSubmitted(true)
    } catch (err) {
      console.error("[v0] Booking submission error:", err)
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return <BookingConfirmation bookingData={bookingData as BookingData} />
  }

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={currentStep} />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-2">
        <CardContent className="p-8 md:p-12">
          {currentStep === 1 && (
            <ServiceSelection
              selectedService={bookingData.serviceId}
              onSelect={(serviceId, serviceName) => {
                updateBookingData({ serviceId, serviceName })
                nextStep()
              }}
            />
          )}

          {currentStep === 2 && (
            <DateTimeSelection
              serviceId={bookingData.serviceId!}
              selectedDate={bookingData.date}
              selectedSlot={bookingData.slotId}
              onSelect={(slotId, date, time) => {
                updateBookingData({ slotId, date, time })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}

          {currentStep === 3 && (
            <PatientInfo
              patientName={bookingData.patientName}
              email={bookingData.email}
              phone={bookingData.phone}
              notes={bookingData.notes}
              onSubmit={handleSubmit}
              onBack={prevStep}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
