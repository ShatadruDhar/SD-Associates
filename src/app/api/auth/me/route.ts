import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/lib/data';
import { getSessionFromRequest } from '@/lib/session';

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await getUserById(session.userId);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user: { id: user.id, fullName: user.fullName, email: user.email } }, { status: 200 });
}