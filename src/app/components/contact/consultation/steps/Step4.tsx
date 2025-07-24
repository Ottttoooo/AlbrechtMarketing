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
import { Input } from "@/components/ui/input";

export const Step4 = ({ form }: StepProps) => (
  <div className="space-y-4">
    <FormField
      control={form.control}
      name="step4.launchBudget"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Notify me about...</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              className="flex flex-col"
            >
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <RadioGroupItem value="all" />
                </FormControl>
                <FormLabel className="font-normal">All new messages</FormLabel>
              </FormItem>
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <RadioGroupItem value="mentions" />
                </FormControl>
                <FormLabel className="font-normal">
                  Direct messages and mentions
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel className="font-normal">Nothing</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="step4.runningBudget"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Running Budget</FormLabel>
          <FormDescription>
            Recurring payment for maintaining online presence and/or improving
            it over time, such as running ads, social media management or search
            engine optimization (SEO)
          </FormDescription>
          <FormControl>
            <Input {...field} placeholder="Enter running budget" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
