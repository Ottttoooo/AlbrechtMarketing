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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export const PricingStep2 = ({ form }: PricingStepProps) => {
  const t = useTranslations("contact.pricing.multiStepForm.step2");

  const goalOptions = [
    { id: "increase-sales", label: t("primaryGoals.options.increaseSales") },
    { id: "brand-awareness", label: t("primaryGoals.options.brandAwareness") },
    { id: "lead-generation", label: t("primaryGoals.options.leadGeneration") },
    { id: "customer-retention", label: t("primaryGoals.options.customerRetention") },
    { id: "market-expansion", label: t("primaryGoals.options.marketExpansion") },
    { id: "cost-reduction", label: t("primaryGoals.options.costReduction") },
  ];

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <p className="text-gray-600 mb-6">{t("description")}</p>

      {/* Current Situation */}
      <FormField
        control={form.control}
        name="step2.currentSituation"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel>{t("currentSituation.label")}</FormLabel>
            <FormDescription>{t("currentSituation.description")}</FormDescription>
            <FormControl>
              <Textarea
                placeholder={t("currentSituation.placeholder")}
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Primary Goals */}
      <FormField
        control={form.control}
        name="step2.primaryGoals"
        render={() => (
          <FormItem className="mb-6">
            <div className="mb-4">
              <FormLabel className="text-base">{t("primaryGoals.label")}</FormLabel>
              <FormDescription>{t("primaryGoals.description")}</FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalOptions.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="step2.primaryGoals"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
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

      {/* Timeline */}
      <FormField
        control={form.control}
        name="step2.timeline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("timeline.label")}</FormLabel>
            <FormDescription>{t("timeline.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="asap" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("timeline.options.asap")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="1-2-weeks" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("timeline.options.oneToTwoWeeks")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="1-month" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("timeline.options.oneMonth")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="2-3-months" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("timeline.options.twoToThreeMonths")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="flexible" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("timeline.options.flexible")}
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
