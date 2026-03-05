import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
}

const steps = [
  { number: 1, title: "اختر الخدمة" },
  { number: 2, title: "اختر الموعد" },
  { number: 3, title: "معلوماتك" },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
                currentStep > step.number
                  ? "bg-primary text-white"
                  : currentStep === step.number
                    ? "bg-primary text-white"
                    : "bg-neutral-200 text-neutral-500"
              }`}
            >
              {currentStep > step.number ? <Check className="h-6 w-6" /> : step.number}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 flex-1 mx-4 transition-colors ${
                currentStep > step.number ? "bg-primary" : "bg-neutral-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
