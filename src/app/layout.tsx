import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Samar Dhar & Associates | Practising Cost & Management Accountants',
  description: 'Samar Dhar & Associates provides professional cost and management accounting, audit, tax, and corporate compliance services for businesses across West Bengal.'
};

function Header() {
  return (
    <header className="site-header">
      <div className="page-shell site-header__inner">
        <Link href="/" className="brand" aria-label="Samar Dhar & Associates home">
          <span className="brand__mark">SD</span>
          <span>Samar Dhar & Associates</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <Link href="/about">About Us</Link>
          <Link href="/service">Services</Link>
          <Link href="/project">Experience</Link>
          <Link href="/team">Team</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="actions">
          <Link href="/login" className="button--ghost">
            Login
          </Link>
          <Link href="/signup" className="button">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <span>Samar Dhar & Associates</span>
        <span>Cost & Management Accountants | Audit, Compliance, Tax, and Financial Advisory.</span>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
