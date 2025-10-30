export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  recaptchaToken?: string;
}

import { z } from "zod";

const step1Schema = z.object({
  firstName: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.firstName.required" }),
  lastName: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.lastName.required" }),
  companyName: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.companyName.required" }),
  industry: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.industry.required" }),
  companyAge: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.companyAge.required" }),
  companyDescription: z.string().optional(),
  country: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.country.required" }),
  state: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.state.required" }),
  email: z.string().email({ message: "contact.consultation.multiStepForm.errors.email.invalid" }),
  phone: z.string().optional(),
});

const optionalUrl = (key: string) =>
  z
    .string()
    .optional()
    .refine((v) => !v || /^https?:\/\//i.test(v), { message: key });

const step2Schema = z.object({
  website: optionalUrl("contact.consultation.multiStepForm.errors.website.url"),
  instagram: optionalUrl("contact.consultation.multiStepForm.errors.instagram.url"),
  facebook: optionalUrl("contact.consultation.multiStepForm.errors.facebook.url"),
  tiktok: optionalUrl("contact.consultation.multiStepForm.errors.tiktok.url"),
  youtube: optionalUrl("contact.consultation.multiStepForm.errors.youtube.url"),
  x: optionalUrl("contact.consultation.multiStepForm.errors.x.url"),
});

const step3Schema = z.object({
  phase: z.array(z.string()).min(1, { message: "contact.consultation.multiStepForm.errors.phase.required" }),
  challenges: z.array(z.string()).min(1, { message: "contact.consultation.multiStepForm.errors.challenges.required" }),
});

const step4Schema = z.object({
  launchBudget: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.launchBudget.required" }),
  runningBudget: z.string().min(1, { message: "contact.consultation.multiStepForm.errors.runningBudget.required" }),
});

const step5Schema = z.object({
  additionalInfo: z.string().optional(),
  privacyPolicy: z.boolean().refine((v) => v === true, { message: "contact.consultation.multiStepForm.step5.privacyPolicy.error" }),
  newsletter: z.boolean(),
  captcha: z.string().min(1, { message: "contact.consultation.multiStepForm.step5.errors.captcha.required" }),
});

export const consultationSchema = z.object({
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  step4: step4Schema,
  step5: step5Schema,
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export const STEP_KEYS = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5"
] as const;

export type StepKey = typeof STEP_KEYS[number];

// Pricing Form Schema
const pricingStep1Schema = z.object({
  selectedPackage: z.enum(["start", "grow", "maintain"], { errorMap: () => ({ message: "contact.pricing.multiStepForm.step1.errors.selectedPackage.required" }) }),
  selectedTier: z.enum(["basic", "advanced", "custom"], { errorMap: () => ({ message: "contact.pricing.multiStepForm.step1.errors.selectedTier.required" }) }),
  companyName: z.string().min(1, { message: "contact.pricing.multiStepForm.step1.errors.companyName.required" }),
  industry: z.string().min(1, { message: "contact.pricing.multiStepForm.step1.errors.industry.required" }),
  firstName: z.string().min(1, { message: "contact.pricing.multiStepForm.step1.errors.firstName.required" }),
  lastName: z.string().min(1, { message: "contact.pricing.multiStepForm.step1.errors.lastName.required" }),
  email: z.string().email({ message: "contact.pricing.multiStepForm.step1.errors.email.invalid" }),
});

const pricingStep2Schema = z.object({
  currentSituation: z.string().min(1, { message: "contact.pricing.multiStepForm.step2.errors.currentSituation.required" }),
  primaryGoals: z.array(z.string()).min(1, { message: "contact.pricing.multiStepForm.step2.errors.primaryGoals.required" }),
  timeline: z.string().min(1, { message: "contact.pricing.multiStepForm.step2.errors.timeline.required" }),
});

const pricingStep3Schema = z.object({
  // Dynamic fields based on package - we'll use a union type
  packageSpecific: z.record(z.string(), z.any()).refine((v) => v && Object.keys(v).length >= 0, { message: "contact.pricing.multiStepForm.step3.errors.packageSpecific.required" }),
});

const pricingStep4Schema = z.object({
  budgetRange: z.string().min(1, { message: "contact.pricing.multiStepForm.step4.errors.budgetRange.required" }),
  additionalServices: z.array(z.string()).optional(),
  startDate: z.string().min(1, { message: "contact.pricing.multiStepForm.step4.errors.startDate.required" }),
});

const pricingStep5Schema = z.object({
  phone: z.string().optional(),
  communicationPreference: z.string().min(1, { message: "contact.pricing.multiStepForm.step5.errors.communicationPreference.required" }),
  additionalInfo: z.string().optional(),
  privacyPolicy: z.boolean().refine((v) => v === true, { message: "contact.pricing.multiStepForm.step5.errors.privacyPolicy.required" }),
  newsletter: z.boolean(),
  captcha: z.string().min(1, { message: "contact.pricing.multiStepForm.step5.errors.captcha.required" }),
});

export const pricingSchema = z.object({
  step1: pricingStep1Schema,
  step2: pricingStep2Schema,
  step3: pricingStep3Schema,
  step4: pricingStep4Schema,
  step5: pricingStep5Schema,
});

export type PricingFormData = z.infer<typeof pricingSchema>;

export const PRICING_STEP_KEYS = [
  "step1",
  "step2", 
  "step3",
  "step4",
  "step5"
] as const;

export type PricingStepKey = typeof PRICING_STEP_KEYS[number];


