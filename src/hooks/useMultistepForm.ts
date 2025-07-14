"use client";
import { JSX, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface Step<T extends FieldValues> {
  component: (form: UseFormReturn<T>) => JSX.Element;
}

interface MultistepFormReturn<T extends FieldValues> {
  currentStepIndex: number;
  steps: Step<T>[];
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
}

export function useMultistepForm<T extends FieldValues>({
  steps,
}: {
  steps: Step<T>[];
}): MultistepFormReturn<T> {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
    steps,
  };
}
