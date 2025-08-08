"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type NavProps = {
  bgColor: string;
};

const NavBar: React.FC<NavProps> = (bgColor) => {
  const t = useTranslations("common.NavBar");
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [showConsultationButton, setShowConsultationButton] = useState(false);

  const bgcolor = bgColor;

  // Check if we're on the homepage
  const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/de";

  useEffect(() => {
    if (!isHomePage) {
      setShowConsultationButton(true);
      return;
    }

    const handleScroll = () => {
      // Assuming hero section is about 100vh (viewport height)
      // You can adjust this value based on your actual hero section height
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > heroHeight * 0.8) { // Show button when 80% past hero
        setShowConsultationButton(true);
      } else {
        setShowConsultationButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <nav className={`${bgcolor.bgColor} py-3 sticky top-0 w-full z-[1000]`}>
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={"/"}>
              <Image
                src="/images/AM_Logo.svg"
                alt="Albrecht Marketing"
                width={150}
                height={100}
                className="cursor-pointer h-auto w-[150px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 font-medium items-center">
            {/* Services Dropdown */}
            <div
              className="relative py-1"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">
                {t("links.services")}
              </span>
              {isServicesDropdownOpen && (
                <div className="absolute left-1/2 w-48  transform -translate-x-1/2 z-10">
                  <div className="w-full mt-2 bg-white shadow-lg rounded-lg">
                    <ul className="py-2">
                      <li>
                        <Link
                          href={"/services/web-design"}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {t("links.webDesign")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/services/online-ads"}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {t("links.onlineAds")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/services/content-creation"}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {t("links.contentCreation")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/services/social-media"}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {t("links.socialMedia")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link href={"/pricing"} className="py-1">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">
                {t("links.pricing")}
              </span>
            </Link>

            {/* <Link href={"about"} className="py-1">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">
                {t("links.about")}
              </span>
            </Link> */}
            <Link href={"/contact/general"} className="py-1">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">
                {t("links.contact")}
              </span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Consultation Button - Show only after scrolling past hero on homepage */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showConsultationButton 
                ? 'opacity-100 max-w-[220px] ml-8' 
                : 'opacity-0 max-w-0 ml-0'
            }`}>
              <Link href={"/contact/consultation"}>
                <div className="flex justify-center items-center bg-accent hover:bg-accentHover transition-all duration-300 radius py-2 px-5 rounded-lg w-max max-w-max h-max text-lightNeutral font-bold text-xs sm:text-sm cursor-pointer lg: md:text-base box-border border border-transparent whitespace-nowrap">
                  <p>{t("links.consultation")}</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-lightNeutral shadow-lg absolute w-full top-20 left-0">
          <ul className="py-2 text-center space-y-4">
            <li>
              <Link
                href={"/services/web-design"}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("links.webDesign")}
              </Link>
            </li>
            <li>
              <Link
                href={"/services/online-ads"}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("links.onlineAds")}
              </Link>
            </li>
            <li>
              <Link
                href={"/services/content-creation"}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("links.contentCreation")}
              </Link>
            </li>
            <li>
              <Link
                href={"/services/social-media"}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("links.socialMedia")}
              </Link>
            </li>
            <li>
              <Link
                href={"/pricing"}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("links.pricing")}
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("links.about")}
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("links.contact")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
