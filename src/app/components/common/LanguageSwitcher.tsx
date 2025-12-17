"use client";

import { useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";

import {
  Link,
  usePathname,
} from "@/i18n/routing";

const AVAILABLE_LANGUAGES = [
  { code: "de", label: "Deutsch", flagSrc: "/images/de.svg" },
  { code: "en", label: "English", flagSrc: "/images/gb.svg" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ next-intl–aware pathname
  const pathname = usePathname();

  const selectedLang =
    AVAILABLE_LANGUAGES.find((lang) =>
      pathname.startsWith(`/${lang.code}`)
    ) ?? AVAILABLE_LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200 transition-colors"
        onClick={() => setIsOpen((v) => !v)}
      >
        <Image
          src={selectedLang.flagSrc}
          alt={selectedLang.code}
          width={16}
          height={16}
        />
        <span className="text-base text-gray-600">
          {selectedLang.label}
        </span>
      </button>

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
          className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10"
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="py-1">
            {AVAILABLE_LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <Link
                  href={pathname}
                  locale={lang.code}
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
