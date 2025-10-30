import React, { Suspense } from "react";
import PricingContactForm from "@/app/components/contact/pricing-form";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.pricing" });

  return {
    title: t("MetaData.title"),
  };
}

function pricingContactPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <PricingContactForm />
      </Suspense>
    </>
  );
}

export default pricingContactPage;
