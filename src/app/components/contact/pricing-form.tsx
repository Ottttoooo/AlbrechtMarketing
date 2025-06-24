"use client";

import type React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon } from "lucide-react";
import { XIcon } from "lucide-react"; // Add XIcon import
import { Alert, AlertDescription } from "@/components/ui/alert"; // Add Alert import

// Define the form data schema with Zod
const formSchema = z.object({
  package: z.string().nonempty({ message: "errors.package.required" }),
  tier: z.string().nonempty({ message: "errors.tier.required" }),
  name: z.string().nonempty({ message: "errors.name.required" }),
  email: z
    .string()
    .email({ message: "errors.email.invalid" })
    .nonempty({ message: "errors.email.required" }),
  phone: z.string().optional(),
  company: z.string().nonempty({ message: "errors.company.required" }),
  businessDescription: z
    .string()
    .nonempty({ message: "errors.businessDescription.required" }),
  website: z.string().optional(),
  goals: z.array(z.string()).min(1, { message: "errors.goals.required" }),
  services: z.array(z.string()).min(1, { message: "errors.services.required" }),
  branding: z.string().nonempty({ message: "errors.branding.required" }),
  budget: z.string().nonempty({ message: "errors.budget.required" }),
  timeline: z.string().nonempty({ message: "errors.timeline.required" }),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function PricingContactForm() {
  const t = useTranslations("Contact.pricing.priceContactForm");
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState(false); // Add state for submission error

  const stepHasErrors = (step: number): boolean => {
    const fields = getFieldsForStep(step);
    return fields.some((field) => !!errors[field]);
  };

  // Get preselected package and tier from query params
  const preselectedPackage = searchParams.get("package") || "";
  const preselectedTier = searchParams.get("tier") || "";

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      package: preselectedPackage,
      tier: preselectedTier,
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
    },
  });

  // Watch form values
  const formData = watch();

  // Handle checkbox changes
  const handleCheckboxChange = (field: "goals" | "services", value: string) => {
    const currentValues = formData[field];
    if (currentValues.includes(value)) {
      setValue(
        field,
        currentValues.filter((item) => item !== value)
      );
    } else {
      setValue(field, [...currentValues, value]);
    }
    trigger(field);
  };

  // Navigate to the next step
  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    await trigger(fieldsToValidate); // Trigger validation to show errors
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Navigate to a specific step
  const goToStep = async (step: number) => {
    // Trigger validation for all steps up to the target step
    const stepsToValidate = Array.from(
      { length: Math.max(currentStep, step) },
      (_, i) => i + 1
    );
    for (const s of stepsToValidate) {
      const fields = getFieldsForStep(s);
      await trigger(fields);
    }
    setCurrentStep(step);
  };

  // Get fields to validate for each step
  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ["package", "tier"];
      case 2:
        return [
          "name",
          "email",
          "phone",
          "company",
          "businessDescription",
          "website",
        ];
      case 3:
        return ["goals", "services", "branding"];
      case 4:
        return ["budget", "timeline"];
      case 5:
        return ["additionalNotes"];
      default:
        return [];
    }
  };

  // Handle form submission
  const onSubmit = (data: FormData) => {
    setSubmitError(false); // Reset error state on successful submission
    console.log("Form submitted:", data);
    alert(t("submitSuccess"));
  };

  // Add error handler for submission
  const onSubmitError = () => {
    setSubmitError(true);
    // Trigger validation for all steps to show errors
    for (let s = 1; s <= 5; s++) {
      const fields = getFieldsForStep(s);
      trigger(fields);
    }
  };

  // Check if a step has been edited
  const stepIsEdited = (step: number): boolean => {
    const fields = getFieldsForStep(step);
    return fields.some((field) => {
      const value = formData[field];
      if (Array.isArray(value)) return value.length > 0;
      return value != null && value !== "";
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((step) => (
          <button
            key={step}
            type="button"
            className="flex flex-col items-center focus:outline-none"
            onClick={() => goToStep(step)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 cursor-pointer ${
                stepIsEdited(step)
                  ? stepHasErrors(step)
                    ? "bg-destructive border-destructive text-destructive-foreground"
                    : "bg-primary border-primary text-primary-foreground"
                  : currentStep === step
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {stepIsEdited(step) ? (
                stepHasErrors(step) ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <CheckIcon className="h-5 w-5" />
                )
              ) : (
                step
              )}
            </div>
            <span
              className={`text-xs mt-2 ${
                stepIsEdited(step)
                  ? stepHasErrors(step)
                    ? "text-destructive"
                    : "text-primary"
                  : currentStep === step
                  ? "text-primary"
                  : "text-gray-400"
              }`}
            >
              {t(`step${step}`)}
            </span>
          </button>
        ))}
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
            {/* Step 1: Package Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">{t("step1")}</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("package")}</Label>
                    <RadioGroup
                      value={formData.package}
                      onValueChange={(value) => {
                        setValue("package", value);
                        trigger("package");
                      }}
                    >
                      {["start", "grow", "maintain"].map((pkg) => (
                        <div key={pkg} className="flex items-center space-x-2">
                          <RadioGroupItem value={pkg} id={`package-${pkg}`} />
                          <Label
                            htmlFor={`package-${pkg}`}
                            className="cursor-pointer"
                          >
                            {t(`packages.${pkg}`)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.package && (
                      <p className="text-sm text-destructive">
                        {t(errors.package.message!)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{t("tier")}</Label>
                    <RadioGroup
                      value={formData.tier}
                      onValueChange={(value) => {
                        setValue("tier", value);
                        trigger("tier");
                      }}
                    >
                      {["basic", "advanced", "custom"].map((tier) => (
                        <div key={tier} className="flex items-center space-x-2">
                          <RadioGroupItem value={tier} id={`tier-${tier}`} />
                          <Label
                            htmlFor={`tier-${tier}`}
                            className="cursor-pointer"
                          >
                            {t(`tiers.${tier}`)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.tier && (
                      <p className="text-sm text-destructive">
                        {t(errors.tier.message!)}
                      </p>
                    )}
                  </div>
                  <div className="text-sm">
                    <Link
                      href="/pricing"
                      className="text-blue-600 hover:underline"
                    >
                      {t("comparePackages")}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: About You / Your Business */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">{t("step2")}</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {t(errors.name.message!)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {t(errors.email.message!)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input id="phone" {...register("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t("company")}</Label>
                    <Input id="company" {...register("company")} />
                    {errors.company && (
                      <p className="text-sm text-destructive">
                        {t(errors.company.message!)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">
                      {t("businessDescription")}
                    </Label>
                    <Textarea
                      id="businessDescription"
                      {...register("businessDescription")}
                    />
                    {errors.businessDescription && (
                      <p className="text-sm text-destructive">
                        {t(errors.businessDescription.message!)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">{t("website")}</Label>
                    <Input id="website" {...register("website")} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Goals & Priorities */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">{t("step3")}</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>{t("goals")}</Label>
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
                            onCheckedChange={() =>
                              handleCheckboxChange("goals", goal)
                            }
                          />
                          <Label
                            htmlFor={`goal-${goal}`}
                            className="cursor-pointer"
                          >
                            {t(`goalsOptions.${goal}`)}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.goals && (
                      <p className="text-sm text-destructive">
                        {t(errors.goals.message!)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label>{t("services")}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Web design & development",
                        "Content creation",
                        "Social media management",
                        "Online ads",
                      ].map((service) => (
                        <div
                          key={service}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`service-${service}`}
                            checked={formData.services.includes(service)}
                            onCheckedChange={() =>
                              handleCheckboxChange("services", service)
                            }
                          />
                          <Label
                            htmlFor={`service-${service}`}
                            className="cursor-pointer"
                          >
                            {t(`servicesOptions.${service}`)}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.services && (
                      <p className="text-sm text-destructive">
                        {t(errors.services.message!)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label>{t("branding")}</Label>
                    <RadioGroup
                      value={formData.branding}
                      onValueChange={(value) => {
                        setValue("branding", value);
                        trigger("branding");
                      }}
                    >
                      {[
                        "Logo and colors",
                        "Only a logo",
                        "Logo, but want to upgrade",
                        "Nothing yet",
                        "Not sure",
                      ].map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`branding-${option}`}
                          />
                          <Label
                            htmlFor={`branding-${option}`}
                            className="cursor-pointer"
                          >
                            {t(`brandingOptions.${option}`)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.branding && (
                      <p className="text-sm text-destructive">
                        {t(errors.branding.message!)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Budget & Timeline */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">{t("step4")}</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>{t("budget")}</Label>
                    <RadioGroup
                      value={formData.budget}
                      onValueChange={(value) => {
                        setValue("budget", value);
                        trigger("budget");
                      }}
                    >
                      {[
                        "Under €1,000",
                        "€1,000–€2,000",
                        "€2,000–€5,000",
                        "€5,000+",
                        "Not sure yet",
                      ].map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`budget-${option}`}
                          />
                          <Label
                            htmlFor={`budget-${option}`}
                            className="cursor-pointer"
                          >
                            {t(`budgetOptions.${option}`)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.budget && (
                      <p className="text-sm text-destructive">
                        {t(errors.budget.message!)}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label>{t("timeline")}</Label>
                    <RadioGroup
                      value={formData.timeline}
                      onValueChange={(value) => {
                        setValue("timeline", value);
                        trigger("timeline");
                      }}
                    >
                      {[
                        "ASAP",
                        "In 1–2 months",
                        "Flexible",
                        "Just exploring",
                      ].map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`timeline-${option}`}
                          />
                          <Label
                            htmlFor={`timeline-${option}`}
                            className="cursor-pointer"
                          >
                            {t(`timelineOptions.${option}`)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.timeline && (
                      <p className="text-sm text-destructive">
                        {t(errors.timeline.message!)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Final Comments */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">{t("step5")}</h2>
                {submitError && (
                  <Alert variant="destructive">
                    <AlertDescription>{t("submitError")}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">
                      {t("additionalNotes")}
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      {...register("additionalNotes")}
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
                  {t("previous")}
                </Button>
              )}
              <div className="ml-auto space-x-2">
                {currentStep < 5 && (
                  <Button type="button" onClick={nextStep}>
                    {t("next")}
                  </Button>
                )}
                {currentStep === 5 && (
                  <Button type="submit" className="bg-primary">
                    {t("submit")}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
