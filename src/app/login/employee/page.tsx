import { AuthForm } from '@/components/auth-form';
import { getClientIp, isAllowedLoginIp, parseAllowedIps } from '@/lib/ip';
import { headers } from 'next/headers';

export default async function EmployeeLoginPage() {
  const headerStore = await headers();
  const clientIp = getClientIp(headerStore);
  const allowed = parseAllowedIps(process.env.ALLOWED_LOGIN_IPS);
  const ipAllowed = isAllowedLoginIp(clientIp, allowed);

  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">Employee Login</span>
        <h1>Sign in to mark attendance.</h1>

        <div className="content-grid" style={{ marginTop: 22 }}>
          <article className="panel glass">
            {ipAllowed ? (
              <>
                <h3>Access allowed</h3>
                <p>
                  Your current request IP is allowed. Complete your login and continue to the attendance dashboard.
                </p>
              </>
            ) : (
              <>
                <h3>Access blocked</h3>
                <p>
                  This login page requires an approved office IP address. If you are on the company network, make sure
                  <span className="muted"> ALLOWED_LOGIN_IPS</span> includes your public IP.
                </p>
                <p className="notice notice--warn" style={{ marginTop: 18 }}>
                  Detected IP: {clientIp || 'unknown'}
                </p>
              </>
            )}
          </article>
          <article className="panel glass">
            <AuthForm mode="login" role="employee" disabled={!ipAllowed} />
          </article>
        </div>
      </div>
    </section>
  );
}
