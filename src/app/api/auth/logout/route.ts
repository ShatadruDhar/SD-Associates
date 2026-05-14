import { NextRequest, NextResponse } from 'next/server';
import { deleteSessionByToken } from '@/lib/data';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('sd_session')?.value;

  if (token) {
    await deleteSessionByToken(token);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('sd_session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });

  return response;
}