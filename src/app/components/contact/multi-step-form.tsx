"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckIcon } from "lucide-react"

// Define the form data structure
interface FormData {
  name: string
  email: string
  phone: string
  company: string
  businessDescription: string
  website: string
  goals: string[]
  services: string[]
  branding: string
  budget: string
  timeline: string
  additionalNotes: string
}

export default function MultiStepForm() {
  // State for tracking the current step
  const [currentStep, setCurrentStep] = useState(1)

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessDescription: "",
    website: "",
    goals: [],
    services: [],
    branding: "",
    budget: "",
    timeline: "",
    additionalNotes: "",
  })

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field as keyof FormData] as string[]

      if (currentValues.includes(value)) {
        return {
          ...prev,
          [field]: currentValues.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value],
        }
      }
    })
  }

  // Handle radio button changes
  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Navigate to the next step
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Navigate to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!")
  }

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= step
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {currentStep > step ? <CheckIcon className="h-5 w-5" /> : step}
            </div>
            <span className={`text-xs mt-2 ${currentStep >= step ? "text-primary" : "text-gray-400"}`}>
              {step === 1 && "About You"}
              {step === 2 && "Goals"}
              {step === 3 && "Budget"}
              {step === 4 && "Comments"}
            </span>
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: About You / Your Business */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">About You / Your Business</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number (optional)</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company or Project name</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">What does your business do?</Label>
                    <Textarea
                      id="businessDescription"
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL (optional)</Label>
                    <Input id="website" name="website" value={formData.website} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Goals & Priorities */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Goals & Priorities</h2>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>What do you want to achieve with this project?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Build a new website",
                        "Improve visibility",
                        "Attract new customers",
                        "Launch a product",
                        "Look more professional",
                        "Get social media working",
                      ].map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={`goal-${goal}`}
                            checked={formData.goals.includes(goal)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleCheckboxChange("goals", goal)
                              } else {
                                handleCheckboxChange("goals", goal)
                              }
                            }}
                          />
                          <Label htmlFor={`goal-${goal}`} className="cursor-pointer">
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Which services are you interested in?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {["Web design & development", "Content creation", "Social media management", "Online ads"].map(
                        (service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={`service-${service}`}
                              checked={formData.services.includes(service)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleCheckboxChange("services", service)
                                } else {
                                  handleCheckboxChange("services", service)
                                }
                              }}
                            />
                            <Label htmlFor={`service-${service}`} className="cursor-pointer">
                              {service}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Do you have existing branding?</Label>
                    <RadioGroup
                      value={formData.branding}
                      onValueChange={(value) => handleRadioChange("branding", value)}
                    >
                      {["Logo and colors", "Only a logo", "Nothing yet", "Not sure"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`branding-${option}`} />
                          <Label htmlFor={`branding-${option}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Budget & Timeline</h2>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>What is your approximate budget?</Label>
                    <RadioGroup value={formData.budget} onValueChange={(value) => handleRadioChange("budget", value)}>
                      {["€1,000–€2,000", "€2,000–€5,000", "€5,000+", "Not sure yet"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`budget-${option}`} />
                          <Label htmlFor={`budget-${option}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>When would you like to get started?</Label>
                    <RadioGroup
                      value={formData.timeline}
                      onValueChange={(value) => handleRadioChange("timeline", value)}
                    >
                      {["ASAP", "In 1–2 months", "Flexible", "Just exploring"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`timeline-${option}`} />
                          <Label htmlFor={`timeline-${option}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Final Comments */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Final Comments</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Any other notes you want us to know?</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}

              <div className="ml-auto">
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-primary">
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
