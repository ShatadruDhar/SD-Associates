import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/data';
import { getSessionFromCookieValue } from '@/lib/session';
import { DashboardPanel } from '@/components/dashboard-panel';
import { BossDashboardPanel } from '@/components/boss-dashboard-panel';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sd_session')?.value;
  const session = await getSessionFromCookieValue(token);

  if (!session) {
    redirect('/login');
  }

  const user = await getUserById(session.userId);

  if (!user) {
    redirect('/login');
  }

  const isBoss = user.role === 'boss';

  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">Attendance dashboard</span>
        <h1>Welcome back, {user.fullName}.</h1>
        <div className="content-grid" style={{ marginTop: 22 }}>
          <article className="panel glass">
            <h3>Session summary</h3>
            <p>Email: {user.email}</p>
            <p>
              Signed in as an active {isBoss ? 'manager' : 'employee'} account.
            </p>
            <p className="notice" style={{ marginTop: 18 }}>
              {isBoss
                ? 'Review employee attendance reports for the selected month.'
                : 'Attendance can only be marked once per calendar day.'}
            </p>
          </article>
          <article className="panel glass">
            {isBoss ? (
              <BossDashboardPanel />
            ) : (
              <DashboardPanel userId={user.id} userName={user.fullName} />
            )}
          </article>
        </div>
      </div>
    </section>
  );
}