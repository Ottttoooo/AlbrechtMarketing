import React from "react";
import { useTranslations } from "next-intl";
import { withLocale } from "@/utils/withLocale";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("MetaData.title"),
  };
}

function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full px-8 py-56 bg-slate-300">
        <div className="flex flex-col max-w-[1200px] w-full ">
          <h1 className="font-bold text-5xl">{t('title')}</h1>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full px-8 pt-56">
        <div className="flex flex-col max-w-[1200px] w-full h-[400px] ">
          <h1 className="font-bold text-5xl">{t('title')}</h1>
        </div>
      </section>
    </>
  );
}

export default withLocale(AboutPage);
