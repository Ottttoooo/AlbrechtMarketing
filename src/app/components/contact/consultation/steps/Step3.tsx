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

const challenges = [
  {
    id: "challenge1",
    label: "I have no / very little internet presence",
  },
  {
    id: "challenge2",
    label:
      "I don’t have a strong corporate identity (Logo, Colors, Font, etc...)",
  },
  {
    id: "challenge3",
    label: "website is not performing as needed",
  },
  {
    id: "challenge4",
    label: "Social Media channels are struggling to gain traction",
  },
  {
    id: "challenge5",
    label: "google Ads are performing poorly",
  },
  {
    id: "challenge6",
    label: "Instagram/Facebook ads are performing poorly",
  },
  {
    id: "challenge7",
    label: "location is hard to find on google maps",
  },
  {
    id: "challenge8",
    label: "Website is not showing at the top of google search",
  },
  {
    id: "challenge9",
    label: "I don’t have enough time to manage my online presence",
  },
  {
    id: "challenge10",
    label: "My content (photos, videos, text) could be more professional",
  },
] as const;

const phases = [
  {
    id: "phase1",
    label: "Launch my online presence for the first time",
  },
  {
    id: "phase2",
    label: "I already have some online presence, but I want to upgrade/add",
  },
  {
    id: "phase3",
    label: "I want to optimize and maintain what I have",
  },
  {
    id: "phase4",
    label: "I’m not sure",
  },
] as const;

export const Step3 = ({ form }: StepProps) => (
  <div className="space-y-4">
    {/* Field for Phases */}
    <FormField
      control={form.control}
      name="step3.phase"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">
              Your current marketing phase
            </FormLabel>
            <FormDescription>
              Select one or more of the phases bellow that best describe current
              progress.
            </FormDescription>
          </div>
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
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
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
            <FormLabel className="text-base">Your current challenges</FormLabel>
            <FormDescription>
              Select one or more of the statements bellow that best describe
              your marketing challenges.
            </FormDescription>
          </div>
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
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);