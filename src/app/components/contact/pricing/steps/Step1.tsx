"use client";

import { Input } from "@/components/ui/input";
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

export const PricingStep1 = ({ form }: PricingStepProps) => {
  const t = useTranslations("contact.pricing.multiStepForm.step1");

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <p className="text-gray-600 mb-6">{t("description")}</p>

      {/* Package and Tier Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FormField
          control={form.control}
          name="step1.selectedPackage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("selectedPackage.label")}</FormLabel>
              <FormDescription>{t("selectedPackage.description")}</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="start" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("selectedPackage.options.start")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="grow" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("selectedPackage.options.grow")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="maintain" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("selectedPackage.options.maintain")}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="step1.selectedTier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("selectedTier.label")}</FormLabel>
              <FormDescription>{t("selectedTier.description")}</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="basic" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("selectedTier.options.basic")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="advanced" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("selectedTier.options.advanced")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="custom" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("selectedTier.options.custom")}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Company Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormField
          control={form.control}
          name="step1.companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("companyName.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("companyName.placeholder")} {...field} />
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
              <FormLabel>{t("industry.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("industry.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="step1.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("firstName.label")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("firstName.placeholder")} />
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
              <FormLabel>{t("lastName.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("lastName.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="step1.email"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder={t("email.placeholder")} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
