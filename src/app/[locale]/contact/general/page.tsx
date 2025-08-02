import ContactForm from '@/app/components/contact/contact-form'
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.general" });

  return {
    title: t("MetaData.title"),
    description: t("MetaData.description"),
  };
}

function generalContactPage() {
  return (
    <ContactForm />
  )
}

export default generalContactPage