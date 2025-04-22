import React from "react";
import { withLocale } from "@/utils/withLocale";
import { getTranslations } from "next-intl/server";
import MultiStepForm from "@/app/components/contact/multi-step-form";
import ConsultationForm from "@/app/components/contact/consultaion-form";
import ContactForm from "@/app/components/contact/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("MetaData.title"),
  };
}

function ContactPage() {

  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
        <MultiStepForm />
      </div>
      <div className="max-w-[1200px] mx-auto">
        <ConsultationForm />
      </div>
      <div className="max-w-[1200px] mx-auto">
        <ContactForm />
      </div>
      
    </main>
  );
}

export default withLocale(ContactPage);
