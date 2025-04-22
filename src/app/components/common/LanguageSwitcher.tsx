"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Transition } from "@headlessui/react"; // For smooth enter/leave animations
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

// Suppose we track the user's current locale in local state,
// or get it from Next.js routing, or a global store:
const AVAILABLE_LANGUAGES = [
  { code: "de", label: "Deutsch", flagSrc: "/images/de.svg" },
  { code: "en", label: "English", flagSrc: "/images/gb.svg" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const { locale } = useParams(); // "de" or "en", etc.

  // The flag + label for the currently selected language
  const selectedLang =
    AVAILABLE_LANGUAGES.find((lang) => lang.code === locale) ||
    AVAILABLE_LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      {/* The Button: shows only the current locale’s flag */}
      <button
        type="button"
        className="flex items-center gap-2 rounded-md px-2 py-1  hover:bg-gray-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={selectedLang.flagSrc}
          alt={selectedLang.code}
          width={24}
          height={24}
        />
        {/* You could show the label too, if you like */}
        {/* <span>{selectedLang.label}</span> */}
      </button>

      {/* The Dropdown Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          onMouseLeave={() => setIsOpen(false)}
          /* optional: hide menu on mouse leave */
        >
          <ul className="py-1">
            {AVAILABLE_LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <Link
                  href={`/${lang.code}${pathname.replace(/^\/(de|en)/, "")}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={lang.flagSrc}
                    alt={lang.code}
                    width={20}
                    height={20}
                  />
                  <span>{lang.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
}
