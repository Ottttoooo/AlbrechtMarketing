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

export const Step2 = ({ form }: StepProps) => (
  <>
    <h2 className="text-xl font-semibold mb-4">Share your links with us</h2>
    <h3>
      We will have a look at your existing website and/or social media channels
      and evaluate them based on our experience so that we can tell you whether
      and how you can improve them
    </h3>
    <FormField
      control={form.control}
      name="step2.website"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Website</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter website URL"
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
          <FormLabel>Instagram</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter Instagram URL"
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
          <FormLabel>Facebook</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter Facebook URL"
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
          <FormLabel>TikTok</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter TikTok URL"
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
          <FormLabel>YouTube</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter YouTube URL"
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
          <FormLabel>X</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter X URL"
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);
