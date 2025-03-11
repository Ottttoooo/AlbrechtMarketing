import { getTranslations } from "next-intl/server";
import HomePageClient from "../components/homepage/HomePageClient";
import { withLocale } from "@/utils/withLocale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: t("MetaData.title"),
  };
}

function HomePage() {
  return <HomePageClient/>;
}

// Wrap the page component with the HOC
export default withLocale(HomePage);