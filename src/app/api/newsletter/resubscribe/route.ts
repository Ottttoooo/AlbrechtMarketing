import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ }));
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  try {
    const updated = await prisma.newsletterSubscriber.update({
      where: { email },
      data: { unsubscribedAt: null, consentAt: new Date() }
    });
    return NextResponse.json({ success: true, subscriber: updated });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
