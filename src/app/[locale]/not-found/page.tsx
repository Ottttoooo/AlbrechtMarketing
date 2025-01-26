"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const tCommon = useTranslations('Common');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">{tCommon('notFound.heading') || 'Page Not Found'}</h1>
      <p className="mt-4 text-xl">{tCommon('notFound.message') || 'Sorry, the page you are looking for does not exist.'}</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
        {tCommon('notFound.homeButton') || 'Go to Home'}
      </Link>
    </div>
  );
}
