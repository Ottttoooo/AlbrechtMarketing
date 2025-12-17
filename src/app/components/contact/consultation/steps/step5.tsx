"use client";

import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StepProps } from "../consultaionPageClient";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/routing";

export const Step5 = ({ form }: StepProps) => {
  const t = useTranslations("contact.consultation.multiStepForm.step5");
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Execute reCAPTCHA when component mounts
  useEffect(() => {
    const handleReCaptchaVerify = async () => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }

      const token = await executeRecaptcha("consultation_form");
      form.setValue("step5.captcha", token);
    };

    handleReCaptchaVerify();
  }, [executeRecaptcha, form]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("description")}</h2>

      <FormField
        control={form.control}
        name="step5.additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("additionalInfo.label")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("additionalInfo.placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4 mt-6">
        <FormField
          control={form.control}
          name="step5.privacyPolicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t("privacyPolicy.label")}{" "}
                  <Link
                    href="/legal/privacy"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    {t("privacyPolicy.link")}
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="step5.newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t("newsletter.label")}
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
