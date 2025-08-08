import { prisma } from '@/lib/prisma';
import { DarkModeToggle } from './DarkModeToggle';
import { ClientTable } from './ClientTable';

export const revalidate = 0; // always fresh

async function getData() {
  return prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } });
}

export default async function NewsletterAdminPage() {
  const subs = await getData();
  const exportToken = process.env.NEWSLETTER_EXPORT_TOKEN || '';
  const serialized = subs.map(s => ({
    email: s.email,
    sources: s.sources,
    consentAt: s.consentAt.toISOString(),
    unsubscribedAt: s.unsubscribedAt ? s.unsubscribedAt.toISOString() : null
  }));

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 px-4 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Header subsCount={subs.length} />
  <ClientTable initialSubs={serialized} exportToken={exportToken} />
      </div>
    </div>
  );
}

// Header section
function Header({ subsCount }: { subsCount: number }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">Newsletter Subscribers</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Monitor sign‑ups, export data, and manage unsubscribes.</p>
      </div>
      <div className="flex gap-2 items-center">
        <DarkModeToggle />
        <form action="/api/admin/logout" method="POST">
          <button className="text-xs font-medium px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">Logout</button>
        </form>
        <span className="hidden sm:inline-flex text-xs font-medium items-center gap-1 rounded-full bg-neutral-200/60 dark:bg-neutral-700/60 px-3 py-1 text-neutral-700 dark:text-neutral-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Total: {subsCount}
        </span>
      </div>
    </div>
  );
}

// Presentational helper only (table now in client component still needs these server side? removed)
