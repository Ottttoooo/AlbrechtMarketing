// utils/withLocale.tsx
import { setRequestLocale } from "next-intl/server";
import { ComponentType } from "react";

export function withLocale<P extends object>(Component: ComponentType<P>) {
  return async function WrappedComponent({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    // Enable static rendering
    setRequestLocale(locale);

    // Pass the locale to the wrapped component
    return <Component locale={locale} {...({} as P)} />;
  };
}
