"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Buttons from "../common/Buttons";
import InfoBox from "./InfoBox";
import CTACard from "../common/CTACard";
import FAQItem from "./FAQItem";
import ReviewCard from "./ReviewCard";
import Link from "next/link";
import { motion } from "framer-motion";

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

  const tHomepage = useTranslations("home");
  const tCommon = useTranslations("common");

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

  // Servcies heading
  const servicesHeading = tHomepage("services.heading");
  const servicesSubheading = tHomepage("services.subheading");

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

  // some classes
  const stepsNumberClasses =
    "flex items-center justify-center min-w-[50px] w-[50px] min-h-[50px] h-[50px] sm:w-[100px] sm:h-[100px] max-w-[100px] max-h-[100px] rounded-lg bg-darkNeutral";

  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  return (
    <div className=" flex center justify-center align-middle flex-col">
      {/* HERO SECTION */}
      <section
        id="Hero"
        className={`"
          box-border 
          flex 
          flex-col 
          items-center 
          w-full 
          px-8 
          pt-24 
          pb-36 
          sm:min-h-screen 
        bg-lightNeutral 
          relative
          "`}
      >
        {/* Static background */}
        <div
          className="
            absolute 
            inset-0 
            sm:min-h-screen 
            bg-[url('/images/hero/hero-bg-sm.svg')] 
            bg-[length:1000px_auto] 
            bg-[position:right_-150px_bottom_0px] 
            bg-no-repeat
            sm:bg-[url('/images/hero/man.svg')] 
            sm:bg-[length:1300px_auto] 
            sm:bg-[position:right_-200px_bottom_0px]
            md:bg-bottom 
            md:bg-cover
            z-50
          "
        />

        {/* Sun */}
        <div
          className="
            absolute 
            inset-0 
            sm:min-h-screen 
            bg-[length:1000px_auto] 
            bg-[position:right_-150px_bottom_0px] 
            bg-no-repeat
            sm:bg-[url('/images/hero/sun.svg')] 
            sm:bg-[length:1300px_auto] 
            sm:bg-[position:right_-200px_bottom_0px]
            md:bg-bottom 
            md:bg-cover
            z-20
            blur-[2px]
          "
        />

        {/* WaterFront */}
        <div
          className="
            absolute 
            inset-0 
            sm:min-h-screen 
            bg-[length:1000px_auto] 
            bg-[position:right_-150px_bottom_0px] 
            bg-no-repeat
            sm:bg-[url('/images/hero/waterFront.svg')] 
            sm:bg-[length:1300px_auto] 
            sm:bg-[position:right_-200px_bottom_0px]
            md:bg-bottom 
            md:bg-cover
            z-30
          "
        />

        {/* WaterMid */}
        <div
          className="
            absolute 
            inset-0 
            sm:min-h-screen 
            bg-[length:1000px_auto] 
            bg-[position:right_-150px_bottom_0px] 
            bg-no-repeat
            sm:bg-[url('/images/hero/waterMid.svg')] 
            sm:bg-[length:1300px_auto] 
            sm:bg-[position:right_-200px_bottom_0px]
            md:bg-bottom 
            md:bg-cover
            sm:animate-waterMidFloat
            z-20
          "
        />

        {/* WaterBack */}
        <div
          className="
            absolute 
            inset-0 
            sm:min-h-screen 
            bg-[length:1000px_auto] 
            bg-[position:right_-150px_bottom_0px] 
            sm:bg-[url('/images/hero/waterBack.svg')] 
            sm:bg-[length:110%_auto]
            sm:bg-center
            sm:bg-repeat-x
            z-10
            sm:animate-waterBackFloat
            sm:will-change-transform
            blur-[1px]
            opacity-70
          "
        />

        {/* Moving clouds */}
        <div
          className="
            absolute 
            inset-0 
            w-full
            h-full
            bg-no-repeat
            bg-[url('/images/hero/aaclouds.svg')]
            sm:bg-[url('/images/hero/movingClouds.svg')] 
            sm:bg-[length:200%_auto] 
            bg-center
            sm:animate-cloudFloat
            z-0
            sm:will-change-transform
            opacity-70
            blur-[2px]
          "
        />

        <div className="w-full max-w-[1200px] z-50">
          <div className="flex Hero-content w-full lg:w-2/3 items-center ">
            <div className="flex flex-col max-w-max mr-5">
              {/* Heading */}
              <h1 className="mb-1 text-3xl sm:text-5xl font-eras_itc_demi [text-shadow:_-1px_-1px_0_theme(colors.lightNeutral),_1px_-1px_0_theme(colors.lightNeutral),_-1px_1px_0_theme(colors.lightNeutral),_1px_1px_0_theme(colors.lightNeutral)]">
                {heroHeading}
              </h1>

              <h2 className="mb-4 w-3/4 text-lg  sm:text-xl [text-shadow:_-1px_-1px_0_theme(colors.lightNeutral),_1px_-1px_0_theme(colors.lightNeutral),_-1px_1px_0_theme(colors.lightNeutral),_1px_1px_0_theme(colors.lightNeutral)]">
                {heroSubHeading}
              </h2>

              {/* List of bullet points */}
              <ul className="mb-4 text-lg">
                {listItems.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="
                  [text-shadow:_-1px_-1px_0_theme(colors.lightNeutral),_1px_-1px_0_theme(colors.lightNeutral),_-1px_1px_0_theme(colors.lightNeutral),_1px_1px_0_theme(colors.lightNeutral)] 
                  sm:[text-shadow:_-1px_-1px_0_theme(colors.lightNeutral),_1px_-1px_0_theme(colors.lightNeutral),_-1px_1px_0_theme(colors.lightNeutral),_1px_1px_0_theme(colors.lightNeutral),_-2px_-2px_0_theme(colors.lightNeutral),_2px_-2px_0_theme(colors.lightNeutral),_-2px_2px_0_theme(colors.lightNeutral),_2px_2px_0_theme(colors.lightNeutral),_-3px_-3px_0_theme(colors.lightNeutral),_3px_-3px_0_theme(colors.lightNeutral),_-3px_3px_0_theme(colors.lightNeutral),_3px_3px_0_theme(colors.lightNeutral)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="w-2/3 sm:w-max sm:bg-lightNeutral rounded-lg">
                <Buttons
                  color="dark"
                  primary={primaryButtonText}
                  secondary={secondaryButtonText}
                  center={"no"}
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
            const textDirection = "left";
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

      {/* Services Section */}
      <motion.section
        id="packages"
        className="flex flex-col items-center justify-center w-full px-8"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-full max-w-[1200px] flex flex-col items-center py-32 gap-5">
          <h2 className="font-bold text-3xl sm:text-5xl">{servicesHeading}</h2>
          <h3 className=" text-xl sm:text-4xl font-light">
            {servicesSubheading}
          </h3>
          <div className="grid grid-cols-2 grid-rows-2 w-full pt-10 gap-8">
            <Link href={"/services/web-design"}>
              <div className="flex flex-col items-center justify-end h-full hover:bg-slate-200 rounded-xl">
                <Image
                  src="/images/web/webDesign.png"
                  alt={""}
                  width={200}
                  height={200}
                  className="w-[100px] md:w-[200px] h-auto mb-5"
                ></Image>
                <h2 className="font-bold text-lg sm:text-2xl text-center">
                  {tHomepage("services.web")}
                </h2>
              </div>
            </Link>

            <Link href={"/services/online-ads"}>
              <div className="flex flex-col items-center justify-end w-full h-full hover:bg-slate-200 rounded-xl">
                <Image
                  src="/images/ads/ads.png"
                  alt={""}
                  width={200}
                  height={200}
                  className="h-[80px] md:h-[200px] w-auto mb-5"
                ></Image>
                <h2 className="font-bold text-lg sm:text-2xl text-center">
                  {tHomepage("services.ads")}
                </h2>
              </div>
            </Link>

            <Link href={"/services/content-creation"}>
              <div className="flex flex-col items-center justify-end h-full hover:bg-slate-200 rounded-xl">
                <Image
                  src="/images/content/contentCreation.png"
                  alt={""}
                  width={200}
                  height={200}
                  className="w-[100px] md:w-[200px] h-auto mb-5"
                ></Image>
                <h2 className="font-bold text-lg sm:text-2xl text-center">
                  {tHomepage("services.content")}
                </h2>
              </div>
            </Link>

            <Link href={"/services/social-media"}>
              <div className="flex flex-col items-center justify-end h-full hover:bg-slate-200 rounded-xl">
                <Image
                  src="/images/social/socialMedia.png"
                  alt={""}
                  width={200}
                  height={200}
                  className="w-[100px] md:w-[200px] h-auto mb-5"
                ></Image>
                <h2 className="font-bold text-lg sm:text-2xl text-center">
                  {tHomepage("services.social")}
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Steps Section */}
      <section
        id="stepsSection"
        className="flex flex-col items-center justify-center w-full max-w-full px-8"
      >
        <div className="w-full max-w-[1200px] flex flex-col items-center py-32 gap-5">
          <div className="flex flex-col gap-y-8 lg:flex-row w-full items-stretch">
            <div className="flex sm:min-w-[353px] flex-col justify-between items-start flex-1 lg:bg-[url('/images/stepsSection.svg')] bg-bottom bg-fit bg-no-repeat">
              <h2 className="font-bold text-3xl sm:text-5xl">
                {stepsHeading}
                <div className="stepsSectionPic"></div>
              </h2>
            </div>
            <div className="flex w-full sm:w-auto flex-col justify-between sm:pl-5 overflow-hidden">
              {/* Step 1 */}
              <motion.div
                className="step1 flex w-full sm:w-auto sm:items-center gap-5 sm:p-3 mb-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className={`${stepsNumberClasses}`}>
                  <p className="font-bold text-3xl sm:text-5xl text-lightNeutral">
                    1
                  </p>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-2xl">{steps[0].heading}</h3>
                  <p className="sm:font-semibold text-[14px]">
                    {steps[0].text}
                  </p>
                </div>
              </motion.div>
              {/* Step 2 */}
              <motion.div
                className="step1 flex w-full sm:w-auto sm:items-center gap-5 sm:p-3 mb-6"
                initial={{ opacity: 0, x: 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <div className={`${stepsNumberClasses}`}>
                  <p className="font-bold text-3xl sm:text-5xl text-lightNeutral">
                    2
                  </p>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-2xl">{steps[1].heading}</h3>
                  <p className="sm:font-semibold text-[14px]">
                    {steps[1].text}
                  </p>
                </div>
              </motion.div>
              {/* Step 3 */}
              <motion.div
                className="step1 flex w-full sm:w-auto sm:items-center gap-5 sm:p-3 mb-6"
                initial={{ opacity: 0, x: 90 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className={`${stepsNumberClasses}`}>
                  <p className="font-bold text-3xl sm:text-5xl text-lightNeutral">
                    3
                  </p>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-2xl">{steps[2].heading}</h3>
                  <p className="sm:font-semibold text-[14px]">
                    {steps[2].text}
                  </p>
                </div>
              </motion.div>
              {/* Step 4 */}
              <motion.div
                className="step1 flex w-full sm:w-auto sm:items-center gap-5 sm:p-3 mb-6"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                <div className={`${stepsNumberClasses}`}>
                  <p className="font-bold text-3xl sm:text-5xl text-lightNeutral">
                    4
                  </p>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-2xl">{steps[3].heading}</h3>
                  <p className="sm:font-semibold text-[14px]">
                    {steps[3].text}
                  </p>
                </div>
              </motion.div>
              {/* Buttons */}
              <div className="flex w-auto items-center gap-5 pl-3 pt-12">
                <Buttons
                  color="dark"
                  primary={primaryButtonText}
                  secondary={secondaryButtonText}
                  center={"yes"}
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

          <div className="flex flex-col md:flex-row w-full sm:px-3 py-16 justify-center gap-6 min-h-0">
            <ReviewCard
              rating={"⭐️⭐️⭐️⭐️⭐️"}
              text={
                "Working with Albrecht Marketing was one of the best decisions we made for our business. Our old website was outdated and barely brought in any leads. They completely revamped it with a sleek, modern design that truly represents our brand. Within just a few months, we noticed a significant increase in website traffic and inquiries, thanks to their SEO strategy. The team was professional, responsive, and really took the time to understand our needs. Highly recommend them to any business looking to step up their online presence!"
              }
              name={"Lisa M."}
              position={"Founder of GreenWell Naturals"}
              image={"/images/Ellipse 1.jpg"}
            />
            <ReviewCard
              rating={"⭐️⭐️⭐️⭐️⭐️"}
              text={
                "Before working with Albrecht Marketing, we struggled to get real results from social media and online ads. Their team helped us refine our messaging, create engaging content, and run ad campaigns that actually convert. Within the first three months, we saw a 40% increase in engagement and our online sales nearly doubled. What I love most is their transparency—every decision is backed by data, and they always keep us in the loop. If you're looking for a marketing team that actually delivers results, look no further!"
              }
              name={"Mark S."}
              position={"Owner of FitZone Gym"}
              image={"/images/guy.jpg"}
            />
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
          <h2 className="font-bold text-3xl sm:text-5xl">
            {faqSection.heading}
          </h2>

          <div className="flex flex-col-reverse gap-y-5 items-center lg:flex-row w-full">
            {/* FAQ Questions */}
            <motion.div
              className="w-full flex-1 justify-center flex flex-col gap-4"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {faqSection.faqItems.map((faq: FAQItem, index: number) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </motion.div>

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
