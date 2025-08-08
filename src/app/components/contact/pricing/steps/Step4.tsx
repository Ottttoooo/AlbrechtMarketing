"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { PricingStepProps } from "../../pricing-form";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export const PricingStep4 = ({ form }: PricingStepProps) => {
  const t = useTranslations("contact.pricing.multiStepForm.step4");

  const additionalServices = [
    { id: "seo-audit", label: t("additionalServices.options.seoAudit") },
    { id: "competitor-analysis", label: t("additionalServices.options.competitorAnalysis") },
    { id: "conversion-optimization", label: t("additionalServices.options.conversionOptimization") },
    { id: "email-marketing", label: t("additionalServices.options.emailMarketing") },
    { id: "analytics-setup", label: t("additionalServices.options.analyticsSetup") },
    { id: "training-support", label: t("additionalServices.options.trainingSupport") },
  ];

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <p className="text-gray-600 mb-6">{t("description")}</p>

      {/* Budget Range */}
      <FormField
        control={form.control}
        name="step4.budgetRange"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel>{t("budgetRange.label")}</FormLabel>
            <FormDescription>{t("budgetRange.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="500-1500" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("budgetRange.options.low")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="1500-3000" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("budgetRange.options.medium")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="3000-5000" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("budgetRange.options.high")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="5000-10000" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("budgetRange.options.premium")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="10000+" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("budgetRange.options.enterprise")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="discuss" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("budgetRange.options.discuss")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Services */}
      <FormField
        control={form.control}
        name="step4.additionalServices"
        render={() => (
          <FormItem className="mb-6">
            <div className="mb-4">
              <FormLabel className="text-base">{t("additionalServices.label")}</FormLabel>
              <FormDescription>{t("additionalServices.description")}</FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {additionalServices.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="step4.additionalServices"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={Array.isArray(field.value) && field.value.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = Array.isArray(field.value) ? field.value : [];
                              return checked
                                ? field.onChange([...currentValue, item.id])
                                : field.onChange(
                                    currentValue.filter((value: string) => value !== item.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal !mt-0">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Preferred Start Date */}
      <FormField
        control={form.control}
        name="step4.startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("startDate.label")}</FormLabel>
            <FormDescription>{t("startDate.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="immediately" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("startDate.options.immediately")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="within-week" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("startDate.options.withinWeek")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="within-month" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("startDate.options.withinMonth")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="next-quarter" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("startDate.options.nextQuarter")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="flexible" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("startDate.options.flexible")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
