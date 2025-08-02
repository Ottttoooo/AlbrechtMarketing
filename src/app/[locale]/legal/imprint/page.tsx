import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.imprint" });

  return {
    title: `${t("title")} | Albrecht Marketing`,
    description: t("MetaData.description"),
  };
}

export default function Imprint() {
  const t = useTranslations("legal.imprint");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

        {/* Company Information Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("companyInfo.title")}</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="font-medium">{t("companyInfo.name")}</p>
            <p>{t("companyInfo.type")}</p>
            <p>{t("companyInfo.address")}</p>
            <p>{t("companyInfo.city")}</p>
            <p>{t("companyInfo.country")}</p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("contact.title")}</h2>
          <div className="space-y-2">
            <p>{t("contact.phone")}</p>
            <p>{t("contact.email")}</p>
          </div>
        </section>

        {/* Representatives */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("representatives.title")}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t("representatives.members.0")}</li>
            <li>{t("representatives.members.1")}</li>
          </ul>
        </section>

        {/* VAT ID */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("vatId.title")}</h2>
          <p className="mb-2">{t("vatId.text")}</p>
          <p className="font-medium">{t("vatId.id")}</p>
        </section>

        {/* Editorial Responsibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("responsibility.title")}</h2>
          <div className="space-y-2">
            <p>{t("responsibility.name")}</p>
            <p>{t("responsibility.address")}</p>
            <p>{t("responsibility.city")}</p>
          </div>
        </section>

        {/* EU Dispute Resolution */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("disputeResolution.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("disputeResolution.text")}</p>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("disclaimer.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("disclaimer.content")}</p>
        </section>
      </div>
    </div>
  );
}
