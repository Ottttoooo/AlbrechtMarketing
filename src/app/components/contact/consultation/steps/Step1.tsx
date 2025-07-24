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

export const Step1 = ({ form }: StepProps) => (
  <>
    <h2 className="text-xl font-semibold mb-4">
      Tell us about yourself and your company
    </h2>

    {/* First and last name */}
    <h3>Name:</h3>
    <div className="w-full grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="step1.firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="enter first name" />
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
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="enter last name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    {/* company details */}
    <h3 className="pt-4">Company Details:</h3>
    <div className="w-full grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="step1.companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input placeholder="enter company name" {...field} />
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
            <FormLabel>Industy</FormLabel>
            <FormControl>
              <Input placeholder="enter Industy" {...field} />
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
            <FormLabel>Company Age</FormLabel>
            <FormControl>
              <Input placeholder="enter company age" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    {/* Location */}
    <h3 className="pt-4">Location:</h3>
    <div className="w-full grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="step1.country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input placeholder="enter your country" {...field} />
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
            <FormLabel>State</FormLabel>
            <FormControl>
              <Input placeholder="enter your state" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    {/* Contact */}
    <h3 className="pt-4">Contact Details:</h3>
    <div className="w-full grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="step1.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="enter your email address" {...field} />
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
            <FormLabel>Phone number</FormLabel>
            <FormControl>
              <Input placeholder="enter phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </>
);
