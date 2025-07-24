import React from "react";
import ConsultationContactPage from "@/app/components/contact/consultation/consultaionPageClient";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.consultation" });

  return {
    title: t("MetaData.title"),
  };
}

const consultaionPage = () => {
  return <ConsultationContactPage />;
};

export default consultaionPage;
