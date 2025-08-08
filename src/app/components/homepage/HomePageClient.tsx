"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Buttons from "../common/Buttons";
import InfoBox from "./InfoBox";
import CTACard from "../common/CTACard";
import FAQItem from "./FAQItem";
import ServiceCard from "./ServiceCard";
import StepItem from "./StepItem";
// import ReviewCard from "./ReviewCard";
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
  // const reviewsHeading = tHomepage("reviewsSection.heading");

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

  // some classes - removed stepsNumberClasses as it's now in StepItem component

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
          pt-20
          sm:pt-24 
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
            sm:bg-[url('/images/hero/preson.svg')] 
            sm:bg-[length:1300px_auto] 
            sm:bg-[position:right_-200px_bottom_0px]
            md:bg-bottom 
            md:bg-cover
            z-50
          "
        />

        {/* Sun */}
        {/* <div
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
        /> */}

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
        {/* <div
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
        /> */}

        {/* Moving clouds */}
        <div
          className="
            absolute 
            inset-0 
            w-full
            h-full
            bg-no-repeat
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

        <div className="w-full max-w-[1200px] z-50 pb-32">
          <div className="flex w-full lg:w-2/3 items-center ">
            <div className="flex flex-col max-w-max mr-5">
              {/* Heading */}
              <h1
                className="
              mb-1 
              text-3xl 
              sm:text-6xl 
              sm: pb-2
              text-darkNeutral
              font-eras_itc_demi 
              drop-shadow-lg
              max-w-max
              "
              >
                {heroHeading}
              </h1>

              <h2 className="mb-4 w-full text-sm  sm:text-xl ">
                {heroSubHeading}
              </h2>

              {/* List of bullet points */}
              <ul className="mb-4 text-sm sm:text-lg max-w-max">
                {listItems.map((item: string, index: number) => (
                  <li key={index} className="text-gray-700">
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
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full max-w-[1200px] flex flex-col items-center py-12 sm:py-32 gap-5">
          <h2 className="font-bold text-3xl sm:text-5xl">{servicesHeading}</h2>
          <h3 className=" text-xl sm:text-4xl font-light">
            {servicesSubheading}
          </h3>
          <div
            className="flex flex-col md:grid grid-cols-2 grid-rows-2 w-[900px] pt-10 gap-x-0 gap-y-8 "
            id="servicesGrid"
          >
            <ServiceCard
              href="/services/web-design"
              imageSrc="/images/web/webDesign.png"
              imageAlt=""
              title={tHomepage("services.web")}
            />

            <ServiceCard
              href="/services/online-ads"
              imageSrc="/images/ads/ads.png"
              imageAlt=""
              title={tHomepage("services.ads")}
              imageClassName="h-[80px] md:h-[150px] w-auto mb-5"
            />

            <ServiceCard
              href="/services/content-creation"
              imageSrc="/images/content/contentCreation.png"
              imageAlt=""
              title={tHomepage("services.content")}
            />

            <ServiceCard
              href="/services/social-media"
              imageSrc="/images/social/socialMedia.png"
              imageAlt=""
              title={tHomepage("services.social")}
            />
          </div>
        </div>
      </motion.section>

      {/* Steps Section */}
      <section
        id="stepsSection"
        className="flex flex-col items-center justify-center w-full max-w-full px-8"
      >
        <div className="w-full max-w-[1200px] flex flex-col items-center py-12 sm:py-32 gap-5">
          <div className="flex flex-col gap-y-8 lg:flex-row w-full items-stretch">
            <div className="flex sm:min-w-[353px] flex-col justify-between items-start flex-1 lg:bg-[url('/images/stepsSection.svg')] bg-bottom bg-fit bg-no-repeat">
              <h2 className="font-bold text-3xl sm:text-5xl">
                {stepsHeading}
                <div className="stepsSectionPic"></div>
              </h2>
            </div>
            <div className="flex w-full sm:w-auto flex-col justify-between sm:pl-5 overflow-hidden">
              {/* Render all steps dynamically */}
              {steps.map((step, index) => (
                <StepItem
                  key={index}
                  stepNumber={index + 1}
                  heading={step.heading}
                  text={step.text}
                  animationDelay={index * 20}
                />
              ))}
              
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
      {/* <section
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
      </section> */}

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
