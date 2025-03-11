"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PricingSection() {
  const t = useTranslations("Pricing");
  const [selectedPackage, setSelectedPackage] = useState<
    "start" | "grow" | "maintain"
  >("start");

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Switcher */}
      <div className="flex justify-center space-x-4 mb-8">
        {(["start", "grow", "maintain"] as const).map((pkg) => (
          <button
            key={pkg}
            className={`px-6 py-2 rounded-md font-medium transition ${
              selectedPackage === pkg
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
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

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["Basic", "Advanced", "Custom"] as const).map((tier) => (
          <div
            key={tier}
            className="border rounded-lg p-6 shadow-md text-center"
          >
            <h3 className="text-xl font-bold">
              {t(`packages.${selectedPackage}.tiers.${tier}.title`)}
            </h3>
            <p className="text-gray-600 text-lg font-semibold my-2">
              {t(`packages.${selectedPackage}.tiers.${tier}.price`)}
            </p>
            <p className="text-gray-400 italic mb-2">
              {t(`packages.${selectedPackage}.tiers.${tier}.applicableFor`)}
            </p>
            <ul className="text-gray-500 mb-4">
              {["feature1", "feature2", "feature3"].map((key, idx) => (
                <li key={idx} className="mb-1">
                  ✅{" "}
                  {t(
                    `packages.${selectedPackage}.tiers.${tier}.features.${key}`
                  )}
                </li>
              ))}
            </ul>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              {t("cta.select")}{" "}
              {t(`packages.${selectedPackage}.tiers.${tier}.title`)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
