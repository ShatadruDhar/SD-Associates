import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="hero hero--construction">
        <div className="page-shell hero__panel glass">
          <span className="eyebrow">Practising Cost & Management Accountants</span>
          <h1>Samar Dhar & Associates</h1>
          <p className="hero__summary">
            Chartered Practising Cost Accountants offering cost audit, management accounting, tax compliance, corporate governance, and financial advisory services from our headquarters in Kotrung, Uttarpara.
          </p>

          <div className="hero__stats">
            <div>
              <strong>Since 2004</strong>
              <p>Firm established to support corporate cost management and statutory compliance.</p>
            </div>
            <div>
              <strong>7+ CMAs</strong>
              <p>A team of experienced cost accountants and finance professionals.</p>
            </div>
            <div>
              <strong>15+ staff</strong>
              <p>Dedicated support for audit, tax, accounting, and advisory services.</p>
            </div>
          </div>

          <div className="hero__cta">
            <Link href="/service" className="button">
              Explore Services
            </Link>
            <Link href="/contact" className="button button--ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--welcome">
        <div className="page-shell section__grid">
          <div>
            <span className="eyebrow">About the Firm</span>
            <h2>Trusted CMA expertise built for businesses and institutions.</h2>
            <p>
              We provide expert cost and management accounting services, audit support, compliance filing, corporate advisory, and specialized reports for industries across manufacturing, trade, education, healthcare, and services.
            </p>
            <p>
              Our firm combines deep technical knowledge with practical implementation experience to help organizations improve financial performance, sustain operations, and meet regulatory requirements.
            </p>
          </div>

          <div className="hero__visual">
            <div className="hero__visual__image"></div>
          </div>
        </div>
      </section>

      <section className="section section--cards">
        <div className="page-shell">
          <div className="hero-cards">
            <article className="project-card glass">
              <span className="eyebrow">Cost and Audit</span>
              <h3>Cost Audit & Internal Audit</h3>
              <p>
                Comprehensive cost audit, internal audit, stock audit, and warehouse audit services designed to meet statutory requirements and support management decision making.
              </p>
            </article>
            <article className="project-card glass">
              <span className="eyebrow">Corporate Compliance</span>
              <h3>ROC, GST and Statutory Filings</h3>
              <p>
                Expert support for ROC forms, GST compliance, e-filing returns, central excise, customs certification, and payroll compliance across different business structures.
              </p>
            </article>
            <article className="project-card glass">
              <span className="eyebrow">Management Consulting</span>
              <h3>Performance & Financial Advisory</h3>
              <p>
                Advisory services for budgeting, cost control, resource optimization, pricing, financial reporting, and corporate restructuring.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--news">
        <div className="page-shell section__grid">
          <div>
            <span className="eyebrow">Firm Strength</span>
            <h2>Experience and structure to serve growing businesses.</h2>
            <p>
              We maintain structured workflows for audit and compliance assignments while providing hands-on support for management systems, training, and online advisory services.
            </p>
            <ul className="checklist">
              <li>Registered Cost Accountants with ICMAI registration no. 101762</li>
              <li>Specialized in cost accounting systems, financial management, and statutory certification</li>
              <li>Trusted by clients across trade, manufacturing, healthcare, education, and service industries</li>
            </ul>
          </div>
          <article className="project-card glass project-card__image--large">
            <div className="project-card__image"></div>
          </article>
        </div>
      </section>
    </>
  );
}
