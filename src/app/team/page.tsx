export default function TeamPage() {
  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">Our Team</span>
        <h1>Experienced Cost Accountants and Support Staff</h1>
        <p>
          A team of practising Cost Accountants, associates, and support personnel committed to precise accounting, rigorous audits, and professional compliance services.
        </p>

        <div className="team-grid" style={{ marginTop: 28 }}>
          <article className="team-card glass">
            <h3>CMA Samar Dhar</h3>
            <span>Proprietor</span>
            <p>
              A practicing Cost Accountant with long experience in cost accounting, audit, taxation, and corporate compliance. Leads the firm’s engagements and provides strategic guidance for clients across sectors.
            </p>
          </article>

          <article className="team-card glass">
            <h3>Cost Accounting Associates</h3>
            <span>Professional Support</span>
            <p>
              Supported by a dedicated team of finance professionals and cost accountants who assist with audit assignments, compliance filings, and management reporting.
            </p>
          </article>

          <article className="team-card glass">
            <h3>Office & Compliance Staff</h3>
            <span>Administrative Team</span>
            <p>
              Skilled support staff manage documentation, filing, and client coordination to ensure deadlines are met and every engagement is delivered smoothly.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
