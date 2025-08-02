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

export const Step2 = ({ form }: StepProps) => {
  const t = useTranslations("contact.consultation.multiStepForm.step2");

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <h3>{t("description")}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="step2.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("website.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("website.placeholder")}
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
              <FormLabel>{t("instagram.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("instagram.placeholder")}
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
              <FormLabel>{t("facebook.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("facebook.placeholder")}
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
              <FormLabel>{t("tiktok.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("tiktok.placeholder")}
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
              <FormLabel>{t("youtube.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("youtube.placeholder")}
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
              <FormLabel>{t("x.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("x.placeholder")}
                  value={field.value || ""}
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
