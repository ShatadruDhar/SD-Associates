import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, storeSession, upsertBossUser } from '@/lib/data';
import { hashPassword, normalizeEmail, verifyPassword } from '@/lib/auth';
import { getClientIp, isAllowedLoginIp, parseAllowedIps } from '@/lib/ip';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request.headers);
    const allowedIps = parseAllowedIps(process.env.ALLOWED_LOGIN_IPS);

    if (!isAllowedLoginIp(clientIp, allowedIps)) {
      return NextResponse.json(
        { error: 'Login is only allowed from approved IP addresses.' },
        { status: 403 }
      );
    }

    const payload = await request.json();
    const email = normalizeEmail(String(payload.email ?? ''));
    const password = String(payload.password ?? '');

    const bossEmail = normalizeEmail(String(process.env.BOSS_EMAIL ?? ''));
    const bossPassword = String(process.env.BOSS_PASSWORD ?? '');

    // If the request is for the boss account, atomically upsert it so there
    // is never a window where two concurrent logins both try to create it.
    if (bossEmail && bossPassword && email === bossEmail) {
      if (password !== bossPassword) {
        return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
      }

      const { passwordHash, salt } = hashPassword(bossPassword);
      const boss = await upsertBossUser({ fullName: 'Boss', email: bossEmail, passwordHash, salt });

      const session = await storeSession(boss.id);
      const response = NextResponse.json({
        user: { id: boss.id, fullName: boss.fullName, email: boss.email },
      });
      response.cookies.set('sd_session', session.token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    const user = await findUserByEmail(email);

    if (!user || !verifyPassword(password, user.passwordHash, user.salt)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const session = await storeSession(user.id);
    const response = NextResponse.json({
      user: { id: user.id, fullName: user.fullName, email: user.email },
    });
    response.cookies.set('sd_session', session.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Unable to sign in right now.' }, { status: 500 });
  }
}