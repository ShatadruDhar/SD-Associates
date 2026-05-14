import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/data';
import { hashPassword, normalizeEmail } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const fullName = String(payload.fullName ?? '').trim();
    const email = normalizeEmail(String(payload.email ?? ''));
    const password = String(payload.password ?? '');

    if (fullName.length < 2 || !email.includes('@') || password.length < 8) {
      return NextResponse.json(
        { error: 'Please provide a valid name, email, and a password with at least 8 characters.' },
        { status: 400 }
      );
    }

    // Prevent signing up with the reserved boss email.
    const bossEmail = normalizeEmail(String(process.env.BOSS_EMAIL ?? ''));
    if (bossEmail && email === bossEmail) {
      return NextResponse.json(
        { error: 'An account with that email already exists.' },
        { status: 409 }
      );
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with that email already exists.' },
        { status: 409 }
      );
    }

    const { passwordHash, salt } = hashPassword(password);

    // Signup always creates employee accounts. The boss account is managed
    // exclusively through the BOSS_EMAIL / BOSS_PASSWORD env vars and is
    // upserted atomically on first login via upsertBossUser().
    const user = await createUser({ fullName, email, passwordHash, salt, role: 'employee' });

    return NextResponse.json(
      { user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Unable to create the account right now.' }, { status: 500 });
  }
}