export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  recaptchaToken?: string;
}

import { z } from "zod";

const step1Schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string(),
  industry: z.string(),
  companyAge: z.string(),
  companyDescription: z.string().optional(),
  country: z.string(),
  state: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
});

const step2Schema = z.object({
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  x: z.string().optional(),
});

const step3Schema = z.object({
  phase: z.array(z.string()).min(1),
  challenges: z.array(z.string()).min(1),
});

const step4Schema = z.object({
  launchBudget: z.string().min(1),
  runningBudget: z.string().min(1),
});

const step5Schema = z.object({
  additionalInfo: z.string().optional(),
  privacyPolicy: z.boolean(),
  newsletter: z.boolean(),
  captcha: z.string().min(1),
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


