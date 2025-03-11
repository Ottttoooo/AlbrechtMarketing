import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import "../globals.css";
import Footer from "../components/common/Footer";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import NavBarWrapper from "../components/common/NavBarWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas_neue",
  weight: "400",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  console.log(locale, "is the current locale");

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${bebasNeue.variable}`}>
      <body className="bg-lightNeutral">
        <NextIntlClientProvider messages={messages}>
        <NavBarWrapper />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
