import { NextRequest, NextResponse } from 'next/server';
import {
  getAttendanceForUserAndDate,
  getAllUsers,
  getAttendanceRecords,
  getUserById,
  storeAttendance,
} from '@/lib/data';
import { getSessionFromRequest } from '@/lib/session';

/** Accepts only YYYY-MM-DD strings that are valid calendar dates. */
function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !isNaN(d.getTime()) && d.toISOString().startsWith(value);
}

/** Accepts only YYYY-MM strings. */
function isValidMonth(value: string): boolean {
  return /^\d{4}-\d{2}$/.test(value);
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 });
    }

    const user = await getUserById(session.userId);

    if (!user) {
      return NextResponse.json({ error: 'User account not found.' }, { status: 404 });
    }

    const url = new URL(request.url);
    const monthParam = url.searchParams.get('month')?.trim() ?? '';
    const month = monthParam && isValidMonth(monthParam) ? monthParam : undefined;
    const userIdParam = url.searchParams.get('userId')?.trim() || undefined;

    if (user.role === 'boss') {
      const attendance = await getAttendanceRecords({ userId: userIdParam, datePrefix: month });
      const users = await getAllUsers();

      const attendanceWithNames = attendance.map((record) => {
        const owner = users.find((u) => u.id === record.userId);
        return {
          ...record,
          fullName: owner?.fullName ?? 'Unknown',
          email: owner?.email ?? 'unknown@company.local',
        };
      });

      return NextResponse.json({ attendance: attendanceWithNames, month: month ?? null });
    }

    const attendance = await getAttendanceRecords({ userId: user.id, datePrefix: month });
    return NextResponse.json({ attendance, month: month ?? null });
  } catch {
    return NextResponse.json({ error: 'Unable to load attendance report.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 });
    }

    const user = await getUserById(session.userId);

    if (!user) {
      return NextResponse.json({ error: 'Employee account not found.' }, { status: 404 });
    }

    const payload = await request.json().catch(() => ({}));

    // Validate date: must be a real YYYY-MM-DD and must be today (UTC) to
    // prevent clients from backdating attendance.
    const todayUtc = new Date().toISOString().slice(0, 10);
    const rawDate = String(payload.date ?? '');

    if (!isValidDate(rawDate)) {
      return NextResponse.json(
        { error: 'Invalid date. Expected format: YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    if (rawDate !== todayUtc) {
      return NextResponse.json(
        { error: 'Attendance can only be marked for today.' },
        { status: 400 }
      );
    }

    // Use server time for markedAt — never trust the client timestamp.
    const markedAt = new Date().toISOString();

    const existing = await getAttendanceForUserAndDate(user.id, rawDate);

    if (existing) {
      return NextResponse.json(
        { error: 'Attendance has already been marked for today.' },
        { status: 409 }
      );
    }

    const record = await storeAttendance({ userId: user.id, date: rawDate, markedAt });

    return NextResponse.json({ attendance: record }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save attendance right now.' }, { status: 500 });
  }
}