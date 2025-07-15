"use client";
import { Button } from "@/components/ui/button";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm, UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckIcon, XIcon } from "lucide-react";
import {
  ComponentType,
  useCallback,
  useMemo,
  useState,
} from "react";
import { sendConsultationEmail } from "@/app/actions";
import { useRouter } from "next/navigation"; // Fixed import

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
    phase: z.string().min(1, { message: "errors.phase.required" }),
    challenges: z.string(),
  }),
  step4: z.object({
    launchBudget: z
      .string()
      .min(1, { message: "errors.launchBudget.required" }),
    runningBudget: z
      .string()
      .min(1, { message: "errors.runningBudget.required" }),
  }),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

interface StepProps {
  form: UseFormReturn<ConsultationFormData>;
}

type StepKey = keyof ConsultationFormData;

const Step1 = ({ form }: StepProps) => (
  <>
    <FormField
      control={form.control}
      name="step1.firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="enter first name" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="step1.lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="enter last name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="step1.companyName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company Name</FormLabel>
          <FormControl>
            <Input placeholder="enter company name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="step1.industry"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Industy</FormLabel>
          <FormControl>
            <Input placeholder="enter Industy" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="step1.companyAge"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company Age</FormLabel>
          <FormControl>
            <Input placeholder="enter company age" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="step1.country"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <FormControl>
            <Input placeholder="enter your country" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="step1.state"
      render={({ field }) => (
        <FormItem>
          <FormLabel>State</FormLabel>
          <FormControl>
            <Input placeholder="enter your state" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="step1.email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="enter your email address" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="step1.phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone number</FormLabel>
          <FormControl>
            <Input placeholder="enter phone number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

const Step2 = ({ form }: StepProps) => (
  <>
    <FormField
      control={form.control}
      name="step2.website"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Website</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter website URL"
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="step2.instagram"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Instagram</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter Instagram URL"
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="step2.facebook"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Facebook</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter Facebook URL"
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="step2.tiktok"
      render={({ field }) => (
        <FormItem>
          <FormLabel>TikTok</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter TikTok URL"
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="step2.youtube"
      render={({ field }) => (
        <FormItem>
          <FormLabel>YouTube</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter YouTube URL"
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="step2.x"
      render={({ field }) => (
        <FormItem>
          <FormLabel>X</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter X URL"
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

const Step3 = ({ form }: StepProps) => (
  <div className="space-y-4">
    <FormField
      control={form.control}
      name="step3.phase"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phase</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter project phase" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {/* Add useFieldArray for challenges if needed */}
  </div>
);

const Step4 = ({ form }: StepProps) => (
  <div className="space-y-4">
    <FormField
      control={form.control}
      name="step4.launchBudget"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Launch Budget</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter launch budget" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="step4.runningBudget"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Running Budget</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter running budget" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

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
        phase: "",
        challenges: "",
      },
      step4: {
        launchBudget: "",
        runningBudget: "",
      },
    },
  });

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

  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } = useMultistepForm<ConsultationFormData>({ steps });

  const handleNext = useCallback(async () => {
    const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
    const currentStepKey = stepKeys[currentStepIndex];
    await form.trigger(currentStepKey);
    next();
  }, [form, currentStepIndex, next]);

  const handleGoTo = useCallback(
    async (index: number) => {
      const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
      const stepsToValidate = Array.from(
        { length: Math.max(currentStepIndex, index) + 1 },
        (_, i) => stepKeys[i]
      );
      for (const key of stepsToValidate) {
        await form.trigger(key);
      }
      goTo(index);
    },
    [form, currentStepIndex, goTo]
  );

  const stepHasErrors = (index: number): boolean => {
    const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
    const stepKey = stepKeys[index];
    return !!form.formState.errors[stepKey];
  };

  const stepIsEdited = (index: number): boolean => {
    const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
    const stepKey = stepKeys[index];
    const stepData = form.getValues(stepKey);
    if (!stepData) return false;
    return Object.values(stepData).some(
      (value) => value != null && value !== ""
    );
  };

  const step = useCallback(() => {
    const CurrentStep = steps[currentStepIndex].component;
    return <CurrentStep form={form} />;
  }, [currentStepIndex, steps, form]);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="space-y-8">
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
  );
}

export default ConsultationContactPage;
