import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">Login</span>
        <h1>Choose how you want to sign in.</h1>

        <div className="page-shell" style={{ marginTop: 24 }}>
          <div className="login-choice-grid">
            <article className="panel glass">
              <h2>Employee access</h2>
              <p>
                Use this path to sign in as an employee and mark your daily attendance from an approved office IP address.
              </p>
              <Link href="/login/employee" className="button" style={{ marginTop: 20, display: 'inline-flex' }}>
                Employee login
              </Link>
            </article>
            <article className="panel glass">
              <h2>Boss access</h2>
              <p>
                Use this path to sign in as a boss and view attendance reports for all employees.
              </p>
              <Link href="/login/boss" className="button" style={{ marginTop: 20, display: 'inline-flex' }}>
                Boss login
              </Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}