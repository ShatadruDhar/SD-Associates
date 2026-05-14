'use client';

import { useEffect, useMemo, useState } from 'react';

type EmployeeSummary = {
  id: string;
  fullName: string;
  email: string;
  attendanceCount: number;
  lastMarkedAt: string | null;
};

type AttendanceRecord = {
  id: string;
  date: string;
  markedAt: string;
};

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => {
  const date = new Date();
  date.setMonth(date.getMonth() - index);
  return date.toISOString().slice(0, 7);
});

function formatMonthLabel(month: string) {
  const [year, monthNumber] = month.split('-');
  const date = new Date(Number(year), Number(monthNumber) - 1, 1);
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
}

function formatDateValue(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(new Date(value));
}

function formatTimeValue(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(new Date(value));
}

export function BossDashboardPanel() {
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [employees, setEmployees] = useState<EmployeeSummary[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [error, setError] = useState('');

  const monthLabel = useMemo(() => formatMonthLabel(selectedMonth), [selectedMonth]);
  const selectedEmployee = employees.find((item) => item.id === selectedEmployeeId);

  useEffect(() => {
    async function loadEmployees() {
      setLoadingEmployees(true);
      setError('');

      try {
        const response = await fetch(`/api/users?month=${selectedMonth}`);
        const result = await response.json();

        if (!response.ok) {
          setError(result.error ?? 'Unable to load employees.');
          return;
        }

        setEmployees(result.users ?? []);
        setSelectedEmployeeId((current) => {
          if (result.users?.length === 0) {
            return null;
          }
          return current || result.users[0]?.id;
        });
      } catch {
        setError('Unable to load employees.');
      } finally {
        setLoadingEmployees(false);
      }
    }

    loadEmployees();
  }, [selectedMonth]);

  useEffect(() => {
    if (!selectedEmployeeId) {
      setAttendance([]);
      return;
    }

    async function loadAttendance() {
      setLoadingAttendance(true);
      setError('');

      try {
        const response = await fetch(`/api/attendance?userId=${selectedEmployeeId}&month=${selectedMonth}`);
        const result = await response.json();

        if (!response.ok) {
          setError(result.error ?? 'Unable to load attendance.');
          return;
        }

        setAttendance(result.attendance ?? []);
      } catch {
        setError('Unable to load attendance.');
      } finally {
        setLoadingAttendance(false);
      }
    }

    loadAttendance();
  }, [selectedEmployeeId, selectedMonth]);

  return (
    <div className="boss-report">
      <div className="dashboard__action">
        <div>
          <strong>Attendance report</strong>
          <p className="muted">Select an employee to view when they marked attendance in {monthLabel}.</p>
        </div>

        <label className="field">
          <span className="muted">Report month</span>
          <select value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
            {MONTH_OPTIONS.map((month) => (
              <option key={month} value={month}>
                {formatMonthLabel(month)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <div className="message message--error">{error}</div> : null}

      <div className="boss-report-grid">
        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Days marked</th>
                <th>Last marked</th>
              </tr>
            </thead>
            <tbody>
              {loadingEmployees ? (
                <tr>
                  <td colSpan={4} className="muted">
                    Loading employees...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={4} className="muted">No employees are available.</td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className={employee.id === selectedEmployeeId ? 'selected-row' : undefined}
                    onClick={() => setSelectedEmployeeId(employee.id)}
                  >
                    <td>{employee.fullName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.attendanceCount}</td>
                    <td>{employee.lastMarkedAt ? formatDateValue(employee.lastMarkedAt) : 'Never'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="attendance-table-wrapper">
          <div className="panel">
            <h3>{selectedEmployee ? `${selectedEmployee.fullName}'s attendance` : 'Select an employee'}</h3>
            <p className="muted" style={{ marginBottom: 16 }}>
              {selectedEmployee
                ? `Showing attendance records for ${selectedEmployee.fullName}.`
                : 'Choose an employee from the table to review their check-ins.'}
            </p>
          </div>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Marked at</th>
              </tr>
            </thead>
            <tbody>
              {loadingAttendance ? (
                <tr>
                  <td colSpan={2} className="muted">
                    Loading attendance...
                  </td>
                </tr>
              ) : !selectedEmployee ? (
                <tr>
                  <td colSpan={2} className="muted">No employee selected.</td>
                </tr>
              ) : attendance.length === 0 ? (
                <tr>
                  <td colSpan={2} className="muted">No attendance records found for this employee this month.</td>
                </tr>
              ) : (
                attendance.map((record) => (
                  <tr key={record.id}>
                    <td>{formatDateValue(record.date)}</td>
                    <td>{formatTimeValue(record.markedAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
