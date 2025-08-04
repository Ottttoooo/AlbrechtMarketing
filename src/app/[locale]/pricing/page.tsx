import React from "react";
import { useTranslations } from "next-intl";
import { withLocale } from "@/utils/withLocale";
import { getTranslations } from "next-intl/server";
import PricingSection from "@/app/components/prices/PricingSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  return {
    title: t("MetaData.title"),
  };
}

function PricingPage() {
  const t = useTranslations("pricing");

  return (
    <>
      {/* <section className="flex w-full justify-center bg-accentLow">
        <div className="flex w-full max-w-[1200px] px-8 justify-center gap-8 flex-col sm:flex-row mb-9">
          <div className="flex flex-col sm:max-w-[700px] min-h-[350px] items-center justify-center">
            <h1 className="font-bold text-2xl mt-4 sm:mt-0 md:text-5xl sm:text-4xl text-center sm:text-left">
              {t("title")}
            </h1>
            <p className="text-base text-center sm:text-left">
              Für jedes Unternehmen die richtige Lösung.
            </p>
          </div>
        </div>
      </section> */}

      <section className="flex flex-col items-center justify-center w-full px-2 py-6 sm:px-8 sm:py-20">
        <div className="flex flex-col w-full max-w-[1200px] overflow-hidden">
          <h2 className="font-bold text-3xl sm:text-5xl text-center">
            {t("packages.title")}
          </h2>

          <PricingSection />
        </div>
      </section>
    </>
  );
}

export default withLocale(PricingPage);
