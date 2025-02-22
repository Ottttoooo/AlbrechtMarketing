'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
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

            <p className="text-gray-300">{t('column1.text1')}</p>
            <p className="text-gray-300 mb-4 font-semibold">
              {t('column1.text2')}
            </p>
            <div className="flex space-x-4">
              <Link href="#">
                <FaFacebookF className="text-gray-400 hover:text-white transition-colors" aria-label={t('socialMedia.facebook')} />
              </Link>
              <Link href="#">
                <FaTwitter className="text-gray-400 hover:text-white transition-colors" aria-label={t('socialMedia.twitter')} />
              </Link>
              <Link href="#">
                <FaInstagram className="text-gray-400 hover:text-white transition-colors" aria-label={t('socialMedia.instagram')} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('column2.heading')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column2.link1')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/servicesAM">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column2.link2')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/aboutAM">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column2.link3')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contactAM">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column2.link4')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: More Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('column3.heading')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column3.link1')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column3.link2')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column3.link3')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column3.link4')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column3.link5')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {t('column3.link6')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('column4.heading')}</h3>
            <p className="text-gray-300 mb-4">
              {t('column4.text1')}
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder={t('column4.placeholder')}
                className="px-3 py-2 w-full rounded focus:outline-none text-gray-800"
                aria-label={t('column4.placeholder')}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded"
              >
                {t('column4.button')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t('bottomSection.text')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
