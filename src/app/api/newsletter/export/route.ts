import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RowShape {
  email: string;
  locale: string | null;
  sources: string | null;
  consentAt: Date | string;
  unsubscribedAt: Date | string | null;
}

function toCSV(rows: RowShape[]) {
  const header = ['email','locale','sources','consentAt','unsubscribedAt'];
  const escape = (v: unknown) => {
    if (v == null) return '';
    const s = String(v);
    if (s.includes('"') || s.includes(',') || s.includes('\n')) {
      return '"' + s.replace(/"/g,'""') + '"';
    }
    return s;
  };
  const lines = [header.join(',')];
  for (const r of rows) {
    const consent = r.consentAt instanceof Date ? r.consentAt.toISOString() : String(r.consentAt);
    const unsub = r.unsubscribedAt ? (r.unsubscribedAt instanceof Date ? r.unsubscribedAt.toISOString() : String(r.unsubscribedAt)) : '';
    lines.push([
      escape(r.email),
      escape(r.locale || ''),
      escape(r.sources || ''),
      escape(consent),
      escape(unsub)
    ].join(','));
  }
  return lines.join('\n');
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const format = url.searchParams.get('format') || 'json';
  const limit = parseInt(url.searchParams.get('limit') || '0', 10);
  const take = !isNaN(limit) && limit > 0 ? limit : undefined;
  const active = url.searchParams.get('active'); // '1' to filter active only
  const from = url.searchParams.get('from'); // YYYY-MM-DD
  const to = url.searchParams.get('to'); // YYYY-MM-DD
  // Simple shared-secret guard
  const token = url.searchParams.get('token');
  const expected = process.env.NEWSLETTER_EXPORT_TOKEN;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const where: {
    unsubscribedAt?: null;
    createdAt?: { gte?: Date; lte?: Date };
  } = {};
  if (active === '1') where.unsubscribedAt = null;
  if (from) {
    const d = new Date(from + 'T00:00:00.000Z');
    if (!isNaN(d.getTime())) where.createdAt = { ...(where.createdAt||{}), gte: d };
  }
  if (to) {
    const d = new Date(to + 'T23:59:59.999Z');
    if (!isNaN(d.getTime())) where.createdAt = { ...(where.createdAt||{}), lte: d };
  }

  const subs = await prisma.newsletterSubscriber.findMany({
    where: Object.keys(where).length ? where : undefined,
    orderBy: { createdAt: 'desc' },
    take
  });

  if (format === 'csv') {
    const csv = toCSV(subs);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="newsletter_export.csv"'
      }
    });
  }

  return NextResponse.json(subs);
}
