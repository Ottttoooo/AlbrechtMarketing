"use client";

import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PricingStepProps } from "../../pricing-form";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const PricingStep5 = ({ form }: PricingStepProps) => {
  const t = useTranslations("contact.pricing.multiStepForm.step5");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const locale = useLocale();

  // Execute reCAPTCHA when component mounts
  useEffect(() => {
    const handleReCaptchaVerify = async () => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }

      const token = await executeRecaptcha("pricing_form");
      form.setValue("step5.captcha", token);
    };

    handleReCaptchaVerify();
  }, [executeRecaptcha, form]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">{t("expectation.title")}</h3>
        <p className="text-blue-700 text-sm">{t("expectation.description")}</p>
      </div>

      {/* Phone Number (Optional) */}
      <FormField
        control={form.control}
        name="step5.phone"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>{t("phone.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("phone.placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Communication Preference */}
      <FormField
        control={form.control}
        name="step5.communicationPreference"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel>{t("communicationPreference.label")}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="email" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("communicationPreference.options.email")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="phone" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("communicationPreference.options.phone")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="both" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("communicationPreference.options.both")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Information */}
      <FormField
        control={form.control}
        name="step5.additionalInfo"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel>{t("additionalInfo.label")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("additionalInfo.placeholder")}
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4 mt-6">
        {/* Privacy Policy Checkbox */}
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
                    href={`/${locale}/legal/privacy`}
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

        {/* Newsletter Checkbox */}
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
