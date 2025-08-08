"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PricingSection() {
  const t = useTranslations("pricing");
  const [selectedPackage, setSelectedPackage] = useState<
    "start" | "grow" | "maintain"
  >("start");
  const [isSixMonths, setIsSixMonths] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto px-2 sm:px-4 sm:py-12">
      {/* Toggle for 3/6 Months Pricing - Only for Grow & Maintain */}
      <div
        className={`flex justify-center items-center mb-6 transition-all duration-300 ${
          selectedPackage === "start"
            ? "opacity-0 invisible"
            : "opacity-100 visible"
        }`}
      >
        <span className="text-gray-600 text-sm">{t("packages.3months")}</span>

        {/* Toggle Button */}
        <button
          className={`relative mx-2 w-14 h-6 flex items-center 
      ${isSixMonths ? "justify-end bg-blue-600" : "justify-start bg-gray-400"}
      rounded-full p-1 transition-colors`}
          onClick={() => setIsSixMonths(!isSixMonths)}
        >
          {/* The Circle */}
          <div
            className={`w-5 h-5 bg-lightNeutral rounded-full shadow-md transform transition-transform`}
          />
        </button>

        <span className="text-gray-600 text-sm">{t("packages.6months")}</span>
      </div>

      {/* Package Switcher */}
      <div className="flex justify-center space-x-4 mb-8">
        {(["start", "grow", "maintain"] as const).map((pkg) => (
          <button
            key={pkg}
            className={`px-6 py-2 rounded-md font-medium transition ${
              selectedPackage === pkg
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            {t(`packages.${pkg}.title`)}
          </button>
        ))}
      </div>

      {/* Package Description */}
      <h2 className="text-center text-2xl font-bold mb-4">
        {t(`packages.${selectedPackage}.title`)}
      </h2>
      <p className="text-center text-gray-500 mb-6">
        {t(`packages.${selectedPackage}.description`)}
      </p>

      {/* Pricing Cards with Animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <AnimatePresence mode="wait" key={selectedPackage}>
          {(["Basic", "Advanced", "Custom"] as const).map((tier) => (
            <motion.div
              key={tier}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative border rounded-lg p-6 shadow-md text-center flex flex-col justify-between h-full"
            >
              {tier === "Advanced" && (
                <div className="absolute top-0 left-[50%] translate-x-[-50%] -translate-y-[50%] bg-accent text-white text-xs font-bold px-3 py-1 rounded-md">
                  {t("packages.popular")}
                </div>
              )}
              <h3 className="text-xl font-bold">
                {t(`packages.${selectedPackage}.tiers.${tier}.title`)}
              </h3>

              {/* Monthly/Yearly Pricing */}
              <p className="text-gray-600 text-lg font-semibold my-2">
                {selectedPackage === "start"
                  ? t(`packages.${selectedPackage}.tiers.${tier}.price`)
                  : isSixMonths
                  ? t(`packages.${selectedPackage}.tiers.${tier}.sixMonthPrice`)
                  : t(
                      `packages.${selectedPackage}.tiers.${tier}.threeMonthPrice`
                    )}
              </p>

              <p className="text-gray-400 italic mb-2">
                {t(`packages.${selectedPackage}.tiers.${tier}.applicableFor`)}
              </p>

              {/* Feature List with Icons */}
              <ul className="text-gray-500 mb-4 text-left flex-grow">
                {Object.keys(
                  t.raw(`packages.${selectedPackage}.tiers.${tier}.features`)
                ).map((key, idx) => (
                  <li key={idx} className="mb-2 flex items-start text-sm sm:text-base">
                    <span className="mr-2">✅</span>{" "}
                    {t(
                      `packages.${selectedPackage}.tiers.${tier}.features.${key}`
                    )}
                  </li>
                ))}
              </ul>
              <Link href={`/contact/pricing?package=${selectedPackage}&tier=${tier.toLowerCase()}`}>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition">
                  {t("cta.select")}
                </button>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
