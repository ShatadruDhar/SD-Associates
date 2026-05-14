import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, getAttendanceRecords, getUserById } from '@/lib/data';
import { getSessionFromRequest } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 });
    }

    const user = await getUserById(session.userId);

    if (!user || user.role !== 'boss') {
      return NextResponse.json({ error: 'Boss access is required.' }, { status: 403 });
    }

    const url = new URL(request.url);
    const month = url.searchParams.get('month')?.trim();
    const datePrefix = month ? month : undefined;

    const users = await getAllUsers();
    const attendance = await getAttendanceRecords({ datePrefix });

    const employees = users
      .filter((item) => item.role === 'employee')
      .map((employee) => {
        const matches = attendance.filter((record) => record.userId === employee.id);
        const sorted = [...matches].sort((a, b) => b.markedAt.localeCompare(a.markedAt));

        return {
          id: employee.id,
          fullName: employee.fullName,
          email: employee.email,
          attendanceCount: matches.length,
          lastMarkedAt: sorted[0]?.markedAt ?? null
        };
      });

    return NextResponse.json({ users: employees, month: month ?? null });
  } catch {
    return NextResponse.json({ error: 'Unable to load users.' }, { status: 500 });
  }
}
