export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  recaptchaToken?: string;
}

export interface ConsultationFormData {
  // Add your form fields here, for example:
  step1?: {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    industry?: string;
    companyAge?: string;
    companyDescription?: string;
    country?: string;
    state?: string;
    email?: string;
    phone?: string;
  };
  step2?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    x?: string;
  };
  step3?: {
    phase?: string[];
    challenges?: string[];
  };
  step4?: {
    launchBudget?: string;
    runningBudget?: string;
  };
  step5?: {
    additionalInfo?: string;
    captcha?: string; // For reCAPTCHA
  };
}

// If you're using specific step keys, you might want to define them as well
export const STEP_KEYS = [
  // Add your step keys here
  "step1",
  "step2",
  "step3",
  "step4",
] as const;

export type StepKey = (typeof STEP_KEYS)[number];

