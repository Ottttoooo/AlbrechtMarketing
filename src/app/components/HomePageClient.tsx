"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Buttons from "./Buttons";
import InfoBox from "./InfoBox";
import CTACard from "./CTACard";
import PackageCard from "./PackageCard";
import FAQItem from "./FAQItem";
import ReviewCard from "./ReviewCard";

interface InfoBoxItem {
  title: string;
  description1: string;
  descriptionBold: string;
  description2: string;
  description3: string;
}

interface Step {
  heading: string;
  text: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  heading: string;
  faqItems: FAQItem[];
}

export default function HomePageClient() {
  // Access translations from 'homepage' and 'common' namespaces
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tHomepage = useTranslations("HomePage");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tCommon = useTranslations("Common");

  // Hero data
  const heroHeading = tHomepage("hero.heading");

  const heroSubHeading = tHomepage("hero.subHeading");

  const listItems: string[] = [];
  let i = 0;
  while (true) {
    const key = `hero.listItems.${i}`;
    if (!tHomepage.has(key)) break; // Explicitly check if the key exists
    const item = tHomepage(key);
    listItems.push(item);
    i++;
  }
  // Fetch info boxes
  const infoBoxes: InfoBoxItem[] = [];
  let j = 0;
  while (true) {
    const baseKey = `infoBoxes.${j}`;
    if (!tHomepage.has(`${baseKey}.title`)) break; // Stop if the title doesn't exist

    const infoBox: InfoBoxItem = {
      title: tHomepage(`${baseKey}.title`),
      description1: tHomepage(`${baseKey}.description1`),
      descriptionBold: tHomepage(`${baseKey}.descriptionBold`),
      description2: tHomepage(`${baseKey}.description2`),
      description3: tHomepage(`${baseKey}.description3`),
    };
    infoBoxes.push(infoBox);
    j++;
  }

  // Steps section
  const stepsHeading = tHomepage("stepsSection.heading");
  const steps: Step[] = [];
  let k = 0;
  while (true) {
    const baseKey = `steps.${k}`;
    if (!tHomepage.has(`stepsSection.${baseKey}.heading`)) break; // Stop if the title doesn't exist

    const step: Step = {
      heading: tHomepage(`stepsSection.${baseKey}.heading`),
      text: tHomepage(`stepsSection.${baseKey}.text`),
    };
    steps.push(step);
    k++;
  }

  // Packages heading
  const packagesHeading = tHomepage("packages.heading");
  const packagesSubheading = tHomepage("packages.subheading");

  // CTA Card heading
  const ctaCardHeading = tCommon("CTACard.heading");

  // Buttons
  const primaryButtonText = tCommon("primaryButton.text");
  const secondaryButtonText = tCommon("secondaryButton.text");

  // Reviews section
  const reviewsHeading = tHomepage("reviewsSection.heading");

  // FAQ section
  const faqSection: FAQSection = {
    heading: tHomepage("faqSection.heading"),
    faqItems: [],
  };

  let l = 0;
  while (true) {
    const baseKey = `faqItems.${l}`;
    if (!tHomepage.has(`faqSection.${baseKey}.question`)) break; // Stop if the title doesn't exist
    const faqItem: FAQItem = {
      question: tHomepage(`faqSection.${baseKey}.question`),
      answer: tHomepage(`faqSection.${baseKey}.answer`),
    };
    faqSection.faqItems.push(faqItem);
    l++;
  }

  return (
    <div className="flex center justify-center align-middle flex-col">
      {/* HERO SECTION */}
      <section
        id="Hero"
        className="flex flex-col items-center w-full sm:min-h-screen px-8 pt-44 pb-48 bg-[url('/images/hero-bg-sm.svg')] bg-[length:1000px_auto] bg-[position:right_-100px_bottom_0px] bg-no-repeat
        sm:bg-[url('/images/hero-bg.svg')] sm:bg-[length:1300px_auto] sm:bg-[position:right_-200px_bottom_0px]
        md:bg-bottom md:bg-[1600px_auto]"
        
      >
        <div className="w-full max-w-[1200px]">
          <div className="flex Hero-content w-full lg:w-2/3 items-center ">
            <div className="flex flex-col max-w-max mr-5">
              {/* Heading */}
              <h1 className="mb-1 text-4xl font-extrabold sm:text-5xl">
                {heroHeading}
              </h1>

              <h2 className="mb-4 w-3/4 text-lg italic sm:text-xl ">
                {heroSubHeading}
              </h2>

              {/* List of bullet points */}
              <ul className="mb-4 text-lg font-normal">
                {listItems.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="w-1/2 sm:w-full">
                <Buttons
                  color="dark"
                  primary={primaryButtonText}
                  secondary={secondaryButtonText}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARAGRAPHS SECTION WITH INFOBOXES */}
      <section
        id="Paragraphs"
        className="flex flex-col items-center justify-center w-full min-h-[600px] px-8 py-20"
      >
        <div className="max-w-[1200px] w-full flex flex-col gap-16">
          {infoBoxes.map((box: InfoBoxItem, i: number) => {
            // Alternate left/right positioning
            const imagePosition = i % 2 === 0 ? "left" : "right";
            const textDirection = i % 2 === 0 ? "right" : "left";

            return (
              <InfoBox
                key={i}
                title={box.title}
                description={
                  <>
                    {box.description1}
                    <br />
                    <br />
                    <span className="font-bold">{box.descriptionBold}</span>
                    {box.description2}
                    <br />
                    <br />
                    {box.description3}
                  </>
                }
                imageSrc={`/images/p${i + 1}v2.svg`}
                imageAlt="placeholder"
                imagePosition={imagePosition}
                textDirection={textDirection}
              />
            );
          })}
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="Paragraphs"
        className="flex flex-col items-center justify-center w-full"
      >
        <CTACard
          color="light"
          heading={ctaCardHeading}
          primary={primaryButtonText}
          secondary={secondaryButtonText}
        />
      </section>

      {/* PACKAGES Section */}
      <section
        id="packages"
        className="flex flex-col items-center justify-center w-full px-8"
      >
        <div className="w-full max-w-[1200px] flex flex-col items-center py-32 gap-5">
          <h2 className="font-bold text-3xl sm:text-5xl">{packagesHeading}</h2>
          <h3 className=" text-xl sm:text-4xl font-light">{packagesSubheading}</h3>
          <div className="w-full flex flex-col items-center lg:flex-row justify-center py-10 gap-10">
            <PackageCard
              title="Webstart"
              description="Der perfekte Einstieg in die Online-Welt."
              price="980"
              list={
                <>
                  <li>Website Entwicklung</li>
                  <li>Domain / Webhosting Einrichtung</li>
                  <li>Erstellung von Inhalten</li>
                  <li>Einrichtung von Social-Media Kanälen</li>
                </>
              }
              monthly={false}
            />
            <PackageCard
              title="Wachstum"
              description="Der perfekte Einstieg in die Online-Welt."
              price="600"
              list={
                <>
                  <li>Website Entwicklung</li>
                  <li>Domain / Webhosting Einrichtung</li>
                  <li>Erstellung von Inhalten</li>
                  <li>Einrichtung von Social-Media Kanälen</li>
                </>
              }
              monthly={true}
            />

            <PackageCard
              title="Pflege"
              description="Der perfekte Einstieg in die Online-Welt."
              price="300"
              list={
                <>
                  <li>Website Entwicklung</li>
                  <li>Domain / Webhosting Einrichtung</li>
                  <li>Erstellung von Inhalten</li>
                  <li>Einrichtung von Social-Media Kanälen</li>
                </>
              }
              monthly={true}
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section
        id="stepsSection"
        className="flex flex-col items-center justify-center w-full px-8"
      >
        <div className="w-full max-w-[1200px] flex flex-col items-center py-32 gap-5">
          <div className="flex flex-col gap-y-8 lg:flex-row w-full items-stretch">
            <div className="flex min-w-[353px] flex-col justify-between items-start flex-1 lg:bg-[url('/images/stepsSection.svg')] bg-bottom bg-fit bg-no-repeat">
              <h2 className="font-bold text-3xl sm:text-5xl">
                {stepsHeading}
                <div className="stepsSectionPic"></div>
              </h2>
            </div>
            <div className="flex w-auto flex-col justify-between pl-5">
              {/* Step 1 */}
              <div className="step1 flex w-auto items-center gap-5 p-3">
                <div className="flex items-center justify-center min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] rounded-lg bg-darkNeutral">
                  <p className="font-bold text-5xl text-lightNeutral">1</p>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl">{steps[0].heading}</h3>
                  <p className="font-semibold text-[14px]">{steps[0].text}</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="step1 flex w-auto items-center gap-5 p-3">
                <div className="flex items-center justify-center min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] rounded-lg bg-darkNeutral">
                  <p className="font-bold text-5xl text-lightNeutral">2</p>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl">{steps[1].heading}</h3>
                  <p className="font-semibold text-[14px]">{steps[1].text}</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="step1 flex w-auto items-center gap-5 p-3">
                <div className="flex items-center justify-center min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] rounded-lg bg-darkNeutral">
                  <p className="font-bold text-5xl text-lightNeutral">3</p>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl">{steps[2].heading}</h3>
                  <p className="font-semibold text-[14px]">{steps[2].text}</p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="step1 flex w-auto items-center gap-5 p-3">
                <div className="flex items-center justify-center min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] rounded-lg bg-darkNeutral">
                  <p className="font-bold text-5xl text-lightNeutral">4</p>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl">{steps[3].heading}</h3>
                  <p className="font-semibold text-[14px]">{steps[3].text}</p>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex w-auto items-center gap-5 pl-3 pt-12">
                <Buttons
                  color="dark"
                  primary={primaryButtonText}
                  secondary={secondaryButtonText}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section
        id="reviewsSection"
        className="flex flex-col items-center justify-center w-full px-8 py-32 bg-slate-200"
      >
        <div className="w-full max-w-[1200px] flex flex-col items-center gap-5">
          <h2 className="font-bold text-3xl sm:text-5xl">{reviewsHeading}</h2>

          <div className="flex flex-col md:flex-row w-full px-3 py-16 items-center justify-center gap-6">
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="FAQ"
        className="flex flex-col items-center justify-center w-full px-8"
      >
        <div className="w-full max-w-[1200px] flex flex-col items-center py-32 gap-12">
          {/* Heading */}
          <h2 className="font-bold text-3xl sm:text-5xl">{faqSection.heading}</h2>

          <div className="flex flex-col-reverse gap-y-5 items-center lg:flex-row w-full">
            {/* FAQ Questions */}
            <div className="w-full flex-1 justify-center flex flex-col gap-4">
              {faqSection.faqItems.map((faq: FAQItem, index: number) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>

            {/* Illustration */}
            <div className="ml-12">
              <Image
                src="/images/FAQ.svg"
                alt="FAQ Illustration"
                width={300}
                height={300}
                className="h-auto w-[150px] sm:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="Paragraphs"
        className="flex flex-col items-center justify-center w-full"
      >
        <CTACard
          color="light"
          heading={ctaCardHeading}
          primary={primaryButtonText}
          secondary={secondaryButtonText}
        />
      </section>
    </div>
  );
}
