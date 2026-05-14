import { NextRequest, NextResponse } from 'next/server';
import { getAttendanceForUserAndDate, getAllUsers, getAttendanceRecords, getUserById, storeAttendance } from '@/lib/data';
import { getSessionFromRequest } from '@/lib/session';

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
    const month = url.searchParams.get('month')?.trim();
    const userIdParam = url.searchParams.get('userId')?.trim() || undefined;
    const datePrefix = month ? month : undefined;

    if (user.role === 'boss') {
      const attendance = await getAttendanceRecords({ userId: userIdParam, datePrefix });
      const users = await getAllUsers();

      const attendanceWithNames = attendance.map((record) => {
        const owner = users.find((u) => u.id === record.userId);
        return {
          ...record,
          fullName: owner?.fullName ?? 'Unknown',
          email: owner?.email ?? 'unknown@company.local'
        };
      });

      return NextResponse.json({ attendance: attendanceWithNames, month: month ?? null });
    }

    const attendance = await getAttendanceRecords({ userId: user.id, datePrefix });
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
    const date = String(payload.date ?? new Date().toISOString().slice(0, 10));
    const markedAt = String(payload.markedAt ?? new Date().toISOString());

    const existing = await getAttendanceForUserAndDate(user.id, date);

    if (existing) {
      return NextResponse.json({ error: 'Attendance has already been marked for today.' }, { status: 409 });
    }

    const record = await storeAttendance({ userId: user.id, date, markedAt });

    return NextResponse.json({ attendance: record }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save attendance right now.' }, { status: 500 });
  }
}