import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, createSessionValue } from './lib/session';

const intlMiddleware = createMiddleware(routing);

function unauthorized(realm = 'Admin') {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"` }
  });
}

function verifyBasicAuth(req: NextRequest) {
  const header = req.headers.get('authorization');
  if (!header?.startsWith('Basic ')) return false;
  try {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx === -1) return false;
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    return user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminPath = pathname.startsWith('/admin');
  const newsletterApi = pathname.startsWith('/api/newsletter');
  const isProtected = adminPath || newsletterApi;

  if (isProtected) {
    // Edge runtime: keep validation lightweight (trust presence of cookie)
    const cookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (cookie) return NextResponse.next();
    // If API (not login page), allow Basic Auth fallback
    if (newsletterApi) {
      if (verifyBasicAuth(req)) {
        const res = NextResponse.next();
        res.cookies.set(SESSION_COOKIE_NAME, createSessionValue(), { httpOnly: true, sameSite: 'lax', path: '/' });
        return res;
      }
      return unauthorized();
    }
    // For admin UI, redirect to login
    if (!pathname.startsWith('/admin/login')) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Skip i18n for API, static and next internals
  if (pathname.startsWith('/api')) return NextResponse.next();
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};
