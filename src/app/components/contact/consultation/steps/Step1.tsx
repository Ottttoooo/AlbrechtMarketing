"use client";

import { Input } from "@/components/ui/input";
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

export const Step1 = ({ form }: StepProps) => {
  const t = useTranslations("contact.consultation.multiStepForm.step1");
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("subtitle")}</h2>

      {/* First and last name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
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
      </div>

      {/* company details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
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

        <FormField
          control={form.control}
          name="step1.companyAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("companyAge.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("companyAge.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="step1.companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("companyDescription.label")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("companyDescription.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
        <FormField
          control={form.control}
          name="step1.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("country.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("country.placeholder")} {...field} />
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
              <FormLabel>{t("state.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("state.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
        <FormField
          control={form.control}
          name="step1.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("email.placeholder")} {...field} />
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
              <FormLabel>{t("phone.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phone.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
