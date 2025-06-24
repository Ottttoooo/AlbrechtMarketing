"use client";
import { AccountForm } from "@/app/components/contact/AccountForm";
import { AddressForm } from "@/app/components/contact/AddressForm";
import { UserFrom } from "@/app/components/contact/UserForm";
import { useMultistepForm } from "@/hooks/useMultistepForm";
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
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    next,
    back,
    goTo,
  } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
    <div className="w-full flex justify-center py-20">
      <div className="relative  border-solid-1 border-black p-8 m-4 max-w-max">
        <form onSubmit={onSubmit}>
          {/* Step Counter */}
          <div className="absolute top-2 right-2">
            {currentStepIndex + 1} / {steps.length}
          </div>

          <div className="flex justify-around flex-row">
            {steps.map((step, index) => {
              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => handleGoTo(index)}
                >
                  <div className="flex justify-center align-middle p-4 bg-slate-400 rounded-full">
                    {index + 1}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step Content */}
          {step}

          {/* Step Navigation */}
          <div className="mt-4 flex gap-6 justify-end">
            {!isFirstStep && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConsultationContactPage;
