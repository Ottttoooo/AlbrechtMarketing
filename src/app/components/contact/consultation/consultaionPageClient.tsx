"use client";
import { Button } from "@/components/ui/button";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckIcon, XIcon } from "lucide-react";
import {
  ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { sendConsultationEmail } from "@/app/actions";
import { useRouter } from "next/navigation"; // Fixed import
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { Step4 } from "./steps/Step4";

const consultationSchema = z.object({
  step1: z.object({
    firstName: z.string().min(1, { message: "errors.firstName.required" }),
    lastName: z.string().min(1, { message: "errors.lastName.required" }),
    companyName: z.string().min(1, { message: "errors.companyName.required" }),
    industry: z.string().min(1, { message: "errors.industry.required" }),
    companyAge: z.string().min(1, { message: "errors.companyAge.required" }),
    country: z.string().min(1, { message: "errors.country.required" }),
    state: z.string().min(1, { message: "errors.state.required" }),
    email: z.string().email({ message: "errors.email.invalid" }),
    phone: z.string().optional(),
  }),
  step2: z.object({
    website: z.string().url({ message: "errors.website.url" }).optional(),
    instagram: z.string().url({ message: "errors.instagram.url" }).optional(),
    facebook: z.string().url({ message: "errors.facebook.url" }).optional(),
    tiktok: z.string().url({ message: "errors.tiktok.url" }).optional(),
    youtube: z.string().url({ message: "errors.youtube.url" }).optional(),
    x: z.string().url({ message: "errors.x.url" }).optional(),
  }),
  step3: z.object({
    phase: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    challenges: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
  }),
  step4: z.object({
    launchBudget: z.enum(["all", "mentions", "none"], {
      required_error: "You need to select a notification type.",
    }),
    runningBudget: z
      .string()
      .min(1, { message: "errors.runningBudget.required" }),
  }),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export interface StepProps {
  form: UseFormReturn<ConsultationFormData>;
}

type StepKey = keyof ConsultationFormData;

function ConsultationContactPage() {
  const t = useTranslations("Contact.consultation.multiStepForm");
  const router = useRouter();
  const [submitError, setSubmitError] = useState(false);

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      step1: {
        firstName: "",
        lastName: "",
        companyName: "",
        industry: "",
        companyAge: "",
        country: "",
        state: "",
        email: "",
        phone: "",
      },
      step2: {
        website: "",
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        x: "",
      },
      step3: {
        phase: [],
        challenges: [],
      },
      step4: {
        launchBudget: "none",
        runningBudget: "",
      },
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    console.log("Form state on render:", form.formState);
  }, [form.formState]);

  const onSubmit = async (data: ConsultationFormData) => {
    try {
      setSubmitError(false);
      const result = await sendConsultationEmail(data);
      if (result.success) {
        alert(t("submitSuccess"));
        router.push("/thank-you");
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
      console.log(error);
    }
  };

  interface Step {
    component: ComponentType<StepProps>;
  }
  // Memoize steps array
  const steps = useMemo<Step[]>(
    () => [
      { component: Step1 },
      { component: Step2 },
      { component: Step3 },
      { component: Step4 },
    ],
    []
  );

  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultistepForm<ConsultationFormData>({ steps });

  const stepIsEdited = useCallback(
    (index: number): boolean => {
      const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
      const stepKey = stepKeys[index];
      const touched = form.formState.touchedFields[stepKey] || {};
      const dirty = form.formState.dirtyFields[stepKey] || {};
      return (
        Object.values(touched).some((value) => value === true) ||
        Object.values(dirty).some((value) => value === true)
      );
    },
    [form]
  );

  const handleNext = useCallback(async () => {
    const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
    const currentStepKey = stepKeys[currentStepIndex];
    if (stepIsEdited(currentStepIndex)) {
      await form.trigger(currentStepKey);
    }
    next();
  }, [currentStepIndex, stepIsEdited, next, form]);

  const handleGoTo = useCallback(
    async (index: number) => {
      const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
      const maxStep = Math.max(currentStepIndex, index);
      for (let i = 0; i <= maxStep; i++) {
        if (stepIsEdited(i)) {
          const key = stepKeys[i];
          await form.trigger(key);
        }
      }
      goTo(index);
    },
    [currentStepIndex, goTo, stepIsEdited, form]
  );

  const stepHasErrors = (index: number): boolean => {
    const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
    const stepKey = stepKeys[index];
    return !!form.formState.errors[stepKey];
  };

  const step = useCallback(() => {
    const CurrentStep = steps[currentStepIndex].component;
    return <CurrentStep form={form} />;
  }, [currentStepIndex, steps, form]);

  return (
    <>
      {/* Intro Text */}
      <div className="w-full flex flex-col pt-32 pb-8 px-4 md:px-6 justify-center items-center ">
        <div className="max-w-screen-lg w-screen-lg ">
          <div className="flex flex-col w-2/3 ">
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:text-left">
              Consultation Form
            </h1>
            <p className="sm:text-left text-sm sm:text-base">
              This survery will help us get to know you better so we can provide
              you with usefull consultation and tips on how to improve your
              online presence
            </p>
            <p className="sm:text-left text-sm sm:text-base">
              Most fields are optional, but for best result we suggest filling
              as many fields as possible so we have more information to work
              with
            </p>
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="w-full flex flex-col p-4 pb-32 md:px-6 justify-center items-center ">
        <div className="max-w-screen-lg w-full space-y-8">
          {/* steps buttons */}
          <div className="flex justify-between mb-8">
            {steps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleGoTo(index)}
                className="flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 cursor-pointer ${
                    stepIsEdited(index)
                      ? stepHasErrors(index)
                        ? "bg-destructive border-destructive text-destructive-foreground"
                        : "bg-primary border-primary text-primary-foreground"
                      : currentStepIndex === index
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-gray-300 text-gray-400"
                  }`}
                >
                  {stepIsEdited(index) ? (
                    stepHasErrors(index) ? (
                      <XIcon className="h-5 w-5" />
                    ) : (
                      <CheckIcon className="h-5 w-5" />
                    )
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    stepIsEdited(index)
                      ? stepHasErrors(index)
                        ? "text-destructive"
                        : "text-primary"
                      : currentStepIndex === index
                        ? "text-primary"
                        : "text-gray-400"
                  }`}
                >
                  {t(`step${index + 1}`)}
                </span>
              </button>
            ))}
          </div>

          {/* Form Card */}
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, () =>
                    setSubmitError(true)
                  )}
                  className="space-y-4"
                >
                  {submitError && currentStepIndex === 3 && (
                    <Alert variant="destructive">
                      <AlertDescription>{t("submitError")}</AlertDescription>
                    </Alert>
                  )}
                  {step()}
                  <div className="flex justify-between mt-8">
                    {!isFirstStep && (
                      <Button type="button" variant="outline" onClick={back}>
                        {t("previous")}
                      </Button>
                    )}
                    <div className="ml-auto space-x-2">
                      <Button
                        type={isLastStep ? "submit" : "button"}
                        onClick={isLastStep ? undefined : handleNext}
                        disabled={form.formState.isSubmitting}
                      >
                        {isLastStep ? t("submit") : t("next")}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConsultationContactPage;
