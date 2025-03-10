import { getTranslations } from "next-intl/server";
import { withLocale } from "@/utils/withLocale";
import ServiceHero from "@/app/components/services/ServiceHero";
import OfferCardSection from "@/app/components/services/OfferCardSection";
import { useTranslations } from "next-intl";
import Intro from "@/app/components/services/Intro";
import StepsSection from "@/app/components/services/StepsSection";
import Why from "@/app/components/services/Why";
import CTACard from "@/app/components/CTACard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.web" });

  return {
    title: t("MetaData.title"),
  };
}

type OfferCard = {
  pictureUrl: string;
  pictureAlt: string;
  title: string;
  text: string;
};

type step = {
  title: string;
  text: string;
};

type stepsList = step[];

type why = {
  title: string;
  text: string;
};

type whyList = why[];

type OfferCardList = OfferCard[];

function WebPage() {
  const tWebPage = useTranslations("Services.web");
  const tCommon = useTranslations("Common");
  const ctaCardHeading = tCommon("CTACard.heading");
  const primaryButtonText = tCommon("primaryButton.text");
  const secondaryButtonText = tCommon("secondaryButton.text");

  const cardList: OfferCardList = [
    {
      pictureUrl: "/images/web/custom.png",
      pictureAlt: tWebPage("OfferCardSection.1.title"),
      title: tWebPage("OfferCardSection.1.title"),
      text: tWebPage("OfferCardSection.1.text"),
    },
    {
      pictureUrl: "/images/web/responsive.png",
      pictureAlt: tWebPage("OfferCardSection.2.title"),
      title: tWebPage("OfferCardSection.2.title"),
      text: tWebPage("OfferCardSection.2.text"),
    },
    {
      pictureUrl: "/images/web/shop.png",
      pictureAlt: tWebPage("OfferCardSection.3.title"),
      title: tWebPage("OfferCardSection.3.title"),
      text: tWebPage("OfferCardSection.3.text"),
    },
    {
      pictureUrl: "/images/web/app.png",
      pictureAlt: tWebPage("OfferCardSection.4.title"),
      title: tWebPage("OfferCardSection.4.title"),
      text: tWebPage("OfferCardSection.4.text"),
    },
    {
      pictureUrl: "/images/web/support.png",
      pictureAlt: tWebPage("OfferCardSection.5.title"),
      title: tWebPage("OfferCardSection.5.title"),
      text: tWebPage("OfferCardSection.5.text"),
    },
  ];

  const stepsList: stepsList = [
    {
      title: tWebPage("StepsSection.steps.1.title"),
      text: tWebPage("StepsSection.steps.1.text"),
    },
    {
      title: tWebPage("StepsSection.steps.2.title"),
      text: tWebPage("StepsSection.steps.2.text"),
    },
    {
      title: tWebPage("StepsSection.steps.3.title"),
      text: tWebPage("StepsSection.steps.3.text"),
    },
    {
      title: tWebPage("StepsSection.steps.4.title"),
      text: tWebPage("StepsSection.steps.4.text"),
    },
  ];

  const whyList: whyList = [
    {
      title: tWebPage("Why.list.1.title"),
      text: tWebPage("Why.list.1.text"),
    },
    {
      title: tWebPage("Why.list.2.title"),
      text: tWebPage("Why.list.2.text"),
    },
    {
      title: tWebPage("Why.list.3.title"),
      text: tWebPage("Why.list.3.text"),
    },
    {
      title: tWebPage("Why.list.4.title"),
      text: tWebPage("Why.list.4.text"),
    },
  ];

  return (
    <>
      <ServiceHero title={tWebPage("Hero.title")} subTitle={tWebPage("Hero.subTitle")} imageUrl={"/images/web/webDesign.png"} />
      <Intro title={tWebPage("Intro.title")} text={tWebPage("Intro.text")} />
      <OfferCardSection
        title={tWebPage("OfferCardSection.title")}
        offerCards={cardList}
      />
      <StepsSection
        title={tWebPage("StepsSection.title")}
        subTitle={tWebPage("StepsSection.subTitle")}
        stepsList={stepsList}
      />
      <Why title={tWebPage("Why.title")} whyList={whyList} />
      <CTACard
        color="light"
        heading={ctaCardHeading}
        primary={primaryButtonText}
        secondary={secondaryButtonText}
      />
    </>
  );
}

// Wrap the page component with the HOC
export default withLocale(WebPage);
