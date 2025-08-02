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
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";

export const Step3 = ({ form }: StepProps) => {
  const t = useTranslations("contact.consultation.multiStepForm.step3");
  const challengeOptions = useTranslations(
    "contact.consultation.multiStepForm.step3.challenges.options"
  );
  const phaseOptions = useTranslations(
    "contact.consultation.multiStepForm.step3.phase.options"
  );

  const challenges = [
    {
      id: challengeOptions("1"),
      label: challengeOptions("1"),
    },
    {
      id: challengeOptions("2"),
      label: challengeOptions("2"),
    },
    {
      id: challengeOptions("3"),
      label: challengeOptions("3"),
    },
    {
      id: challengeOptions("4"),
      label: challengeOptions("4"),
    },
    {
      id: challengeOptions("5"),
      label: challengeOptions("5"),
    },
    {
      id: challengeOptions("6"),
      label: challengeOptions("6"),
    },
    {
      id: challengeOptions("7"),
      label: challengeOptions("7"),
    },
    {
      id: challengeOptions("8"),
      label: challengeOptions("8"),
    },
    {
      id: challengeOptions("9"),
      label: challengeOptions("9"),
    },
    {
      id: challengeOptions("10"),
      label: challengeOptions("10"),
    },
  ] as const;

  const phases = [
    {
      id: phaseOptions("1"),
      label: phaseOptions("1"),
    },
    {
      id: phaseOptions("2"),
      label: phaseOptions("2"),
    },
    {
      id: phaseOptions("3"),
      label: phaseOptions("3"),
    },
    {
      id: phaseOptions("4"),
      label: phaseOptions("4"),
    },
  ] as const;

  return (
    <div className="space-y-16">
      {/* Field for Phases */}
      <FormField
        control={form.control}
        name="step3.phase"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">{t("phase.label")}</FormLabel>
              <FormDescription>{t("phase.description")}</FormDescription>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {phases.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="step3.phase"
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

      {/*  Field for challenges */}
      <FormField
        control={form.control}
        name="step3.challenges"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">
                {t("challenges.label")}
              </FormLabel>
              <FormDescription>{t("challenges.description")}</FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {challenges.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="step3.challenges"
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
    </div>
  );
};
