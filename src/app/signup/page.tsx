import { AuthForm } from '@/components/auth-form';

export default function SignupPage() {
  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">Employee sign up</span>
        <h1>Create an employee account before logging in.</h1>
        <div className="content-grid" style={{ marginTop: 22 }}>
          <article className="panel glass">
            <h3>Account details</h3>
            <p>
              Add your name, email, and password. The login flow uses those details to create a session cookie after successful authentication.
            </p>
            <p className="notice notice--warn" style={{ marginTop: 18 }}>
              Login is restricted to approved IP addresses, but signup stays open for onboarding.
            </p>
          </article>
          <article className="panel glass">
            <AuthForm mode="signup" />
          </article>
        </div>
      </div>
    </section>
  );
}