"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState, useTransition } from "react";
import { subscribeNewsletter } from "@/app/actions";

const Footer = () => {
  const t = useTranslations("common.Footer");
  const [hovered, setHovered] = useState<boolean>(false); // ✅ Define type explicitly
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");
    const trimmed = email.trim();
    if (!trimmed) return;
    startTransition(async () => {
      const res = await subscribeNewsletter(trimmed);
      if (res.success) {
        setStatus("success");
        setMessage(t("column4.success"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(t("column4.error"));
      }
    });
  };
  return (
    <footer className="bg-darkNeutral text-lightNeutral">
      <div className="max-w-7xl mx-auto py-8 px-8 sm:px-6 lg:px-8">
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand and Social Media */}
          <div className="mr-3">
            <Image
              src="/images/AM_Logo_light.svg"
              alt="Albrecht Marketing"
              width={150}
              height={100}
              className="h-auto w-[150px] mb-4"
            />

            <p className="text-gray-300">{t("column1.text1")}</p>
            <p className="text-gray-300 mb-4 font-semibold">
              {t("column1.text2")}
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/people/Albrecht-Marketing/100090449678717/" target="_blank" rel="noopener noreferrer">
                <FaFacebookF
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={t("socialMedia.facebook")}
                />
              </Link>
              <Link href="https://x.com/AlbrMarketing" target="_blank" rel="noopener noreferrer" className="flex items-start">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  style={{
                    color: hovered ? "white" : "#9ca3af",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                />
              </Link>
              <Link
                href="https://www.instagram.com/albrechtmarketing/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={t("socialMedia.instagram")}
                />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("column2.heading")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column2.link1")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column2.link2")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/preise">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column2.link3")}
                  </span>
                </Link>
              </li>
              {/* <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column2.link4")}
                  </span>
                </Link>
              </li> */}
              <li>
                <Link href="/contact/general">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column2.link5")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/legal/imprint">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column2.link6")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column2.link7")}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: More Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("column3.heading")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column3.link1")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/web-design">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column3.link2")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/online-ads">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column3.link3")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/content-creation">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column3.link4")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/social-media">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t("column3.link5")}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("column4.heading")}</h3>
            <p className="text-gray-300 mb-4">{t("column4.text1")}</p>
            <form className="flex flex-wrap gap-2" onSubmit={onSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("column4.placeholder")}
                className="px-3 py-2 w-1/2 md:w-full rounded focus:outline-none text-gray-800"
                aria-label={t("column4.placeholder")}
                required
              />
              <button
                type="submit"
                disabled={isPending}
                className="bg-primary disabled:opacity-60 hover:bg-opacity-90 text-white px-4 py-2 rounded"
              >
                {isPending ? t("column4.submitting") : t("column4.button")}
              </button>
              {message && (
                <p className={`w-full text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message}</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t("bottomSection.text")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
