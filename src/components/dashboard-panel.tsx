"use client";

import { useEffect, useMemo, useState, useTransition } from 'react';

type AttendanceRecord = {
  id: string;
  userId: string;
  date: string;
  markedAt: string;
};

type Props = {
  userId: string;
  userName: string;
};

function formatClock(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date);
}

export function DashboardPanel({ userId, userName }: Props) {
  const [currentTime, setCurrentTime] = useState(() => formatClock(new Date()));
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isPending, startTransition] = useTransition();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(formatClock(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  async function markAttendance() {
    setMessage('');

    const response = await fetch('/api/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        date: today,
        markedAt: new Date().toISOString()
      })
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error ?? 'Unable to mark attendance.');
      return;
    }

    setAttendance((current) => [result.attendance, ...current]);
    setMessage('Attendance marked for today.');
  }

  return (
    <div className="dashboard">
      <div className="dashboard__action">
        <div className="dashboard__time">{currentTime}</div>
        <p className="muted">Live time for {userName} on {today}</p>
        <button
          type="button"
          className="button--soft"
          onClick={() => startTransition(() => void markAttendance())}
          disabled={isPending}
        >
          {isPending ? 'Saving attendance...' : 'Mark attendance'}
        </button>
      </div>

      {message ? <div className="message message--success">{message}</div> : null}

      <div>
        <h3>Recent attendance</h3>
        <div className="attendance-log">
          {attendance.length > 0 ? (
            attendance.map((item) => (
              <div key={item.id} className="attendance-item">
                <strong>{item.date}</strong>
                <div className="muted">Marked at {new Date(item.markedAt).toLocaleString()}</div>
              </div>
            ))
          ) : (
            <div className="attendance-item muted">No attendance has been marked yet in this session.</div>
          )}
        </div>
      </div>
    </div>
  );
}