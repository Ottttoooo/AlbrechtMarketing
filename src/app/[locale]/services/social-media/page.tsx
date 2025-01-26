import { getTranslations } from "next-intl/server";
import { withLocale } from "@/utils/withLocale";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.social" });

  return {
    title: t("MetaData.title"),
  };
}

function SocialPage() {
  const tContnet = useTranslations("Services.social");
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full px-8 py-56 bg-slate-300">
        <div className="flex flex-col max-w-[1200px] w-full ">
          <h1 className="font-bold text-5xl">{tContnet("title")}</h1>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full px-8 pt-56">
        <div className="flex flex-col max-w-[1200px] w-full h-[400px] ">
          <h1 className="font-bold text-5xl">{tContnet("title")}</h1>
        </div>
      </section>
    </>
  );
}

// Wrap the page component with the HOC
export default withLocale(SocialPage);
