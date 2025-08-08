import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET not set');
  return secret;
}

interface SessionPayload { iat: number; exp: number; }

export function createSessionValue(): string {
  const payload: SessionPayload = { iat: Date.now(), exp: Date.now() + TTL_MS };
  const json = JSON.stringify(payload);
  const secret = getSecret();
  const sig = crypto.createHmac('sha256', secret).update(json).digest('hex');
  return Buffer.from(json).toString('base64') + '.' + sig;
}

export function validateSessionValue(value?: string | null): boolean {
  if (!value) return false;
  const [b64, sig] = value.split('.');
  if (!b64 || !sig) return false;
  try {
    const json = Buffer.from(b64, 'base64').toString('utf8');
    const secret = getSecret();
    const expected = crypto.createHmac('sha256', secret).update(json).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    const payload = JSON.parse(json) as SessionPayload;
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export async function setSessionCookie() {
  const value = createSessionValue();
  (await cookies()).set(COOKIE_NAME, value, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: TTL_MS / 1000 });
}

export async function clearSessionCookie() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function hasValidSession(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return validateSessionValue(value);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
