import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });

  return {
    title: `${t("title")} | Albrecht Marketing`,
    description: t("MetaData.description"),
  };
}

export default function PrivacyPolicy() {
  const t = useTranslations("legal.privacy");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

        {/* Overview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("overview.title")}</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{t("overview.generalInfo.title")}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{t("overview.generalInfo.text")}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t("overview.dataCollection.title")}</h3>
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">{t("overview.dataCollection.responsible.title")}</h4>
              <p className="text-gray-700 leading-relaxed">{t("overview.dataCollection.responsible.text")}</p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">{t("overview.dataCollection.howWeCollect.title")}</h4>
              <p className="text-gray-700 leading-relaxed">{t("overview.dataCollection.howWeCollect.text")}</p>
            </div>
          </div>
        </section>

        {/* Hosting Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("hosting.title")}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t("hosting.text")}</p>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("hosting.externalHosting.title")}</h3>
            <p className="text-gray-700 leading-relaxed">{t("hosting.externalHosting.text")}</p>
          </div>
        </section>

        {/* Responsible Party Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("responsibleParty.title")}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t("responsibleParty.text")}</p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="font-medium">{t("responsibleParty.company.name")}</p>
            <p>{t("responsibleParty.company.type")}</p>
            <p>{t("responsibleParty.company.address")}</p>
            <p>{t("responsibleParty.company.city")}</p>
            <p>{t("responsibleParty.company.country")}</p>
            <p className="mt-4">
              <span className="font-medium">Phone:</span> {t("responsibleParty.company.phone")}
            </p>
            <p>
              <span className="font-medium">Email:</span> {t("responsibleParty.company.email")}
            </p>
          </div>
        </section>

        {/* Storage Duration */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("storageDuration.title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("storageDuration.text")}</p>
        </section>

        {/* Rights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("rights.title")}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("rights.dataAccess.title")}</h3>
              <p className="text-gray-700 leading-relaxed">{t("rights.dataAccess.text")}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("rights.revocation.title")}</h3>
              <p className="text-gray-700 leading-relaxed">{t("rights.revocation.text")}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("rights.complaint.title")}</h3>
              <p className="text-gray-700 leading-relaxed">{t("rights.complaint.text")}</p>
            </div>
          </div>
        </section>

        {/* Data Collection */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("dataCollection.title")}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("dataCollection.cookies.title")}</h3>
              <p className="text-gray-700 leading-relaxed">{t("dataCollection.cookies.text")}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("dataCollection.serverLogs.title")}</h3>
              <p className="text-gray-700 leading-relaxed">{t("dataCollection.serverLogs.text")}</p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                {t("dataCollection.serverLogs.items").split(",").map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("dataCollection.contactForm.title")}</h3>
              <p className="text-gray-700 leading-relaxed">{t("dataCollection.contactForm.text")}</p>
            </div>
          </div>
        </section>

        {/* Tools and Third-Party Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t("tools.title")}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("tools.googleFonts.title")}</h3>
              <p className="text-gray-700 leading-relaxed">{t("tools.googleFonts.text")}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("tools.reCaptcha.title")}</h3>
              <p className="text-gray-700 leading-relaxed">{t("tools.reCaptcha.text")}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
