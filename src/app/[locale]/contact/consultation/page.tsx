"use client";
import { AccountForm } from "@/app/components/contact/AccountForm";
import { AddressForm } from "@/app/components/contact/AddressForm";
import { UserFrom } from "@/app/components/contact/UserForm";
import { Button } from "@/components/ui/button";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { useTranslations } from "next-intl";
import React, { FormEvent, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function ConsultationContactPage() {
  const t = useTranslations("Contact.pricing.priceContactForm");
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, step, isFirstStep, isLastStep, next, back, goTo } =
    useMultistepForm([
      <UserFrom {...data} updateFields={updateFields} key={0} />,
      <AddressForm {...data} updateFields={updateFields} key={1} />,
      <AccountForm {...data} updateFields={updateFields} key={2} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creaion");
  }

  function handleGoTo(index: number) {
    return goTo(index);
  }
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="space-y-8">
        {/* steps buttons */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => {
            return (
              <button
                key={step.key}
                type="button"
                onClick={() => handleGoTo(index)}
                className="flex flex-col items-center focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 cursor-pointer border-gray-300 text-gray-400">
                  {index + 1}
                </div>
                <span className="text-xs mt-2 text-gray-400">
                  {t(`step${index + 1}`)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 pt-6">
            <form onSubmit={onSubmit}>
              {/* Step Content */}
              {step}

              {/* next/prev/submit */}
              <div className="flex justify-between mt-8">
                {!isFirstStep && (
                  <Button type="button" variant="outline" onClick={back}>
                    {t("previous")}
                  </Button>
                )}
                <div className="ml-auto space-x-2">
                  <Button type="submit">
                    {isLastStep ? t("submit") : t("next")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultationContactPage;
