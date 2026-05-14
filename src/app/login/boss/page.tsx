import { AuthForm } from '@/components/auth-form';

export default function BossLoginPage() {
  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">Boss Login</span>
        <h1>Sign in to view employee attendance reports.</h1>

        <div className="content-grid" style={{ marginTop: 22 }}>
          <article className="panel glass">
            <h3>Boss access</h3>
            <p>
              Enter your boss account credentials to open the attendance report dashboard. The site will show employee attendance in a tabular format.
            </p>
          </article>
          <article className="panel glass">
            <AuthForm mode="login" />
          </article>
        </div>
      </div>
    </section>
  );
}
