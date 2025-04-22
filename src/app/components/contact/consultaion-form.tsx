"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Textarea } from "../../../components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  website: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  hasWebsite: z.enum(["yes", "no"], {
    required_error: "Please select if you have a website.",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function ConsultationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      website: "",
      hasWebsite: "no",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_1fr]">
      {/* Sidebar */}
      <div className="flex flex-col justify-center bg-slate-50 p-6 md:p-10 lg:p-16">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            Get a free consultation
          </h1>
          <p className="mb-4 text-slate-600">
            Ready to transform your online presence? Our team of experts is here
            to help you navigate the digital landscape and achieve your goals.
          </p>
          <p className="mb-4 text-slate-600">
            Fill out the form and we&apos;ll get back to you within 24 hours to
            schedule your free consultation.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">Personalized Strategy</h3>
                <p className="text-sm text-slate-600">
                  Tailored solutions for your specific needs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">Expert Guidance</h3>
                <p className="text-sm text-slate-600">
                  Insights from industry professionals
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">No Obligation</h3>
                <p className="text-sm text-slate-600">
                  Free consultation with no strings attached
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-md">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">Thank You!</h2>
              <p className="mb-6 text-slate-600">
                Your consultation request has been submitted. We&apos;ll get back to
                you within 24 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Submit another request
              </Button>
            </div>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Consultation Request</CardTitle>
                <CardDescription>
                  Fill out the form below to request your free consultation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hasWebsite"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Do you have a website?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  I have a website
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  I don&apos;t have a website
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch("hasWebsite") === "yes" && (
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://yourwebsite.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Optional if you have a website
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            What are you struggling with in your online
                            presence?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your challenges..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Submit Request <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
