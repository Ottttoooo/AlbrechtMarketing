"use client";
import { Button } from "@/components/ui/button";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
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
import {
  ComponentType,
  JSX,
  memo,
  useCallback,
  useMemo,
} from "react";

const formSchema = z.object({
  step1: z
    .object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      companyName: z.string().min(1, "Company name is required"),
      industry: z.string().min(1, "Industry is required"),
      companyAge: z.string().min(1, "Company age is required"),
      country: z.string().min(1, "Country is required"),
      state: z.string().min(1, "State is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().optional(),
    })
    .optional(),
  step2: z
    .object({
      website: z.string().url("Must be a valid URL").optional(),
      instagram: z.string().url("Must be a valid URL").optional(),
      facebook: z.string().url("Must be a valid URL").optional(),
      tiktok: z.string().url("Must be a valid URL").optional(),
      youtube: z.string().url("Must be a valid URL").optional(),
      x: z.string().url("Must be a valid URL").optional(),
    })
    .optional(),
  step3: z
    .object({
      phase: z.string().min(1, "Phase is required"),
      challenges: z.string(),
    })
    .optional(),
  step4: z
    .object({
      launchBudget: z.string().min(1, "Launch budget is required"),
      runningBudget: z.string().min(1, "Running budget is required"),
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

interface StepProps {
  form: UseFormReturn<FormData>;
}

const Step1 = memo(({ form }: StepProps) => (
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
));
Step1.displayName = "Step1";

const Step2 = memo(({ form }: StepProps) => (
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
));
Step2.displayName = "Step2";

const Step3 = memo(({ form }: StepProps) => (
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
));
Step3.displayName = "Step3";

const Step4 = memo(({ form }: StepProps) => (
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
));
Step4.displayName = "Step4";

type StepKey = keyof FormData;

function ConsultationContactPage() {
  const t = useTranslations("Contact.pricing.priceContactForm");

  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  // define submit handler
  const onSubmit = async (data: FormData) => {
    console.log("onSubmit called with data:", data);
    console.log("Form submitted:", data);
  };

  // Debug form submission
  const handleFormSubmit = form.handleSubmit(onSubmit);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submit event triggered");
    handleFormSubmit(e);
  };

  // Define the type for a step
  interface Step {
    component: (form: UseFormReturn<FormData>) => JSX.Element;
  }

  // Memoize steps array
  const steps = useMemo(
    () => [
      { component: (form: UseFormReturn<FormData>) => <Step1 form={form} /> },
      { component: (form: UseFormReturn<FormData>) => <Step2 form={form} /> },
      { component: (form: UseFormReturn<FormData>) => <Step3 form={form} /> },
      { component: (form: UseFormReturn<FormData>) => <Step4 form={form} /> },
    ],
    [] as Step[]
  );

  // Update the useMultistepForm hook call
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultistepForm<FormData>({ steps });

  const handleNext = useCallback(async () => {
    // Map step index to step key
    const stepKeys: StepKey[] = ["step1", "step2", "step3", "step4"];
    const currentStepKey = stepKeys[currentStepIndex];
    const isValid = await form.trigger(currentStepKey);
    console.log("Validation for", currentStepKey, "isValid:", isValid);
    if (isValid) {
      next();
    } else {
      console.log("Validation errors:", form.formState.errors);
    }
  }, [form, currentStepIndex, next]);



  const step = useCallback(
    (form: UseFormReturn<FormData>) => {
      const CurrentStep = steps[currentStepIndex]
        .component as unknown as ComponentType<{
        form: UseFormReturn<FormData>;
      }>;
      return <CurrentStep form={form} />;
    },
    [currentStepIndex, steps]
  );

  function handleGoTo(index: number) {
    return goTo(index);
  }
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="space-y-8">
        {/* steps buttons */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleGoTo(index)}
                className="flex flex-col items-center focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 cursor-pointer border-gray-300 text-gray-400">
                  {index + 1}
                </div>
                <span className="text-xs mt-2 text-gray-400">
                  {t(`step${index + 1}`)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 pt-6">
            <Form {...form}>
              <form onSubmit={onFormSubmit} className="space-y-4">
                {step(form)}

                {/* next/prev/submit */}
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
