"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StepProps } from "../consultaionPageClient";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

export const Step4 = ({ form }: StepProps) => {
  const t = useTranslations("contact.consultation.multiStepForm.step4");

  return (
    <div className="space-y-4">
      {/* launch budget */}
      <FormField
        control={form.control}
        name="step4.launchBudget"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t("launchBudget.label")}</FormLabel>
            <FormDescription>{t("launchBudget.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                className="flex flex-col"
              >
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={t("launchBudget.options.1")} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("launchBudget.options.1")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={t("launchBudget.options.2")} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("launchBudget.options.2")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={t("launchBudget.options.3")} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("launchBudget.options.3")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={t("launchBudget.options.4")} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("launchBudget.options.4")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* running budget */}
      <FormField
        control={form.control}
        name="step4.runningBudget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("runningBudget.label")}</FormLabel>
            <FormDescription>{t("runningBudget.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                className="flex flex-col"
              >
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={t("runningBudget.options.1")} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("runningBudget.options.1")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={t("runningBudget.options.2")} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("runningBudget.options.2")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={t("runningBudget.options.3")} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("runningBudget.options.3")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={t("runningBudget.options.4")} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("runningBudget.options.4")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
