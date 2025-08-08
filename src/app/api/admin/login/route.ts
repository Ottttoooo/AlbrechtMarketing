import { NextResponse } from 'next/server';
import { createSessionValue, SESSION_COOKIE_NAME } from '@/lib/session';

export async function POST(req: Request) {
  const url = new URL(req.url);
  const next = url.searchParams.get('next') || '/admin/newsletter';

  const contentType = req.headers.get('content-type') || '';
  let rawUser: unknown = undefined;
  let rawPass: unknown = undefined;
  if (contentType.includes('application/json')) {
    const body: unknown = await req.json().catch(() => ({}));
    if (body && typeof body === 'object') {
      rawUser = (body as Record<string, unknown>).user;
      rawPass = (body as Record<string, unknown>).pass;
    }
  } else {
    const form = await req.formData().catch(() => null);
    if (form) {
      rawUser = form.get('user');
      rawPass = form.get('pass');
    }
  }
  const user = typeof rawUser === 'string' ? rawUser.trim() : '';
  const pass = typeof rawPass === 'string' ? rawPass.trim() : '';

  if (user && pass && user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD) {
    const cookie = createSessionValue();
    const redirectURL = new URL(next, req.url);
    const res = NextResponse.redirect(redirectURL, { status: 303 });
    res.cookies.set(SESSION_COOKIE_NAME, cookie, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
    return res;
  }

  // On failure, redirect back with error flag (for form POST). If JSON expected, send JSON.
  const accept = req.headers.get('accept') || '';
  if (accept.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const back = new URL('/admin/login?error=1', req.url);
  return NextResponse.redirect(back, { status: 303 });
}
