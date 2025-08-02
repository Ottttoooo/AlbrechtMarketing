import { getTranslations } from "next-intl/server";
import { withLocale } from "@/utils/withLocale";
import ServiceHero from "@/app/components/services/ServiceHero";
import OfferCardSection from "@/app/components/services/OfferCardSection";
import { useTranslations } from "next-intl";
import Intro from "@/app/components/services/Intro";
import StepsSection from "@/app/components/services/StepsSection";
import Why from "@/app/components/services/Why";
import CTACard from "@/app/components/common/CTACard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.social" });

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

function SocialPage() {
  const tServicePage = useTranslations("services.social");
  const tCommon = useTranslations("common");
  const ctaCardHeading = tCommon("CTACard.heading");
  const primaryButtonText = tCommon("primaryButton.text");
  const secondaryButtonText = tCommon("secondaryButton.text");

  const cardList: OfferCardList = [
    {
      pictureUrl: "/images/social/setup.png",
      pictureAlt: tServicePage("OfferCardSection.1.title"),
      title: tServicePage("OfferCardSection.1.title"),
      text: tServicePage("OfferCardSection.1.text"),
    },
    {
      pictureUrl: "/images/social/schedule.png",
      pictureAlt: tServicePage("OfferCardSection.2.title"),
      title: tServicePage("OfferCardSection.2.title"),
      text: tServicePage("OfferCardSection.2.text"),
    },
    {
      pictureUrl: "/images/social/visual.png",
      pictureAlt: tServicePage("OfferCardSection.3.title"),
      title: tServicePage("OfferCardSection.3.title"),
      text: tServicePage("OfferCardSection.3.text"),
    },
    {
      pictureUrl: "/images/social/chat.png",
      pictureAlt: tServicePage("OfferCardSection.4.title"),
      title: tServicePage("OfferCardSection.4.title"),
      text: tServicePage("OfferCardSection.4.text"),
    },
    {
      pictureUrl: "/images/social/gallery.png",
      pictureAlt: tServicePage("OfferCardSection.5.title"),
      title: tServicePage("OfferCardSection.5.title"),
      text: tServicePage("OfferCardSection.5.text"),
    },
  ];

  const stepsList: stepsList = [
    {
      title: tServicePage("StepsSection.steps.1.title"),
      text: tServicePage("StepsSection.steps.1.text"),
    },
    {
      title: tServicePage("StepsSection.steps.2.title"),
      text: tServicePage("StepsSection.steps.2.text"),
    },
    {
      title: tServicePage("StepsSection.steps.3.title"),
      text: tServicePage("StepsSection.steps.3.text"),
    },
  ];

  const whyList: whyList = [
    {
      title: tServicePage("Why.list.1.title"),
      text: tServicePage("Why.list.1.text"),
    },
    {
      title: tServicePage("Why.list.2.title"),
      text: tServicePage("Why.list.2.text"),
    },
    {
      title: tServicePage("Why.list.3.title"),
      text: tServicePage("Why.list.3.text"),
    },
    {
      title: tServicePage("Why.list.4.title"),
      text: tServicePage("Why.list.4.text"),
    },
  ];

  return (
    <>
      <ServiceHero title={tServicePage("Hero.title")} subTitle={tServicePage("Hero.subTitle")} imageUrl={"/images/social/socialMedia.png"} />
      <Intro title={tServicePage("Intro.title")} text={tServicePage("Intro.text")} />
      <OfferCardSection
        title={tServicePage("OfferCardSection.title")}
        offerCards={cardList}
      />
      <StepsSection
        title={tServicePage("StepsSection.title")}
        subTitle={tServicePage("StepsSection.subTitle")}
        stepsList={stepsList}
      />
      <Why title={tServicePage("Why.title")} whyList={whyList} />
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
export default withLocale(SocialPage);
