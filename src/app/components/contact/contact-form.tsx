"use client";
import { sendContactEmail } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormData } from "@/types";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const t = useTranslations("contact.general");

  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not available");
      }

      // Execute reCAPTCHA and get token
      const token = await executeRecaptcha("contact_form");
      
      // Verify the token on your server side
      const form = event.currentTarget;
      const formData: ContactFormData = {
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
        message: (form.elements.namedItem("message") as HTMLInputElement).value,
        recaptchaToken: token,
      };

      const result = await sendContactEmail(formData);
      
      if (result.success) {
        router.push("/thank-you");
      } else {
        throw new Error(result.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error instanceof Error ? error.message : "There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">{t("form.title")}</CardTitle>
            <CardDescription>
              {t("form.subTitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name.label")}</Label>
                <Input id="name" placeholder={t("form.name.placeholder")} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email.label")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.email.placeholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{t("form.subject.label")}</Label>
                <Input id="subject" placeholder={t("form.subject.placeholder")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message.label")}</Label>
                <Textarea
                  id="message"
                  placeholder={t("form.message.placeholder")}
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner"></span>
                    {t("submitting")}
                  </div>
                ) : (
                  t("submit")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="flex flex-col gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">{t("infoBox.title")}</CardTitle>
              <CardDescription>
                {t("infoBox.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    info@albrecht-marketing.com
                  </p>
                </div>
              </div>

              {/* <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div> */}

              {/* <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-muted-foreground">123 Business Street</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA 94103</p>
                </div>
              </div> */}

              <div className="mt-6 rounded-lg bg-muted p-4">
                <h3 className="font-medium">{t("infoBox.responseTimeTitle")}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("infoBox.responseTime")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
