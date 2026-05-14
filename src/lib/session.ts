import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { getSessionByToken } from '@/lib/data';

export async function getSessionFromCookieValue(token: string | undefined) {
  if (!token) {
    return null;
  }

  return getSessionByToken(token);
}

export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get('sd_session')?.value;

  if (!token) {
    return null;
  }

  return getSessionByToken(token);
}

export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sd_session')?.value;

  return getSessionFromCookieValue(token);
}