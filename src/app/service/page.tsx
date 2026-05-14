export default function ServicePage() {
  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">Our Services</span>
        <h1>Cost Accounting, Audit, Compliance and Corporate Advisory</h1>
        <p>
          We offer a wide array of services for cost-conscious organizations, including statutory audits, accounting systems, regulatory filings, and financial management support.
        </p>

        <div className="section__grid" style={{ marginTop: 28 }}>
          <article className="panel glass">
            <h2>Audit & Assurance</h2>
            <ul className="checklist">
              <li>Cost Audit</li>
              <li>Internal Audit</li>
              <li>Stock Audit</li>
              <li>Warehouse Audit</li>
              <li>Compliance Audit</li>
            </ul>
          </article>

          <article className="panel glass">
            <h2>Commercial & Management Accounting</h2>
            <ul className="checklist">
              <li>Cost Accounting System Maintenance</li>
              <li>Performance Management</li>
              <li>Financial Reporting and Budgeting</li>
              <li>Resource Management and Procurement Planning</li>
              <li>Corporate and Financial Restructuring</li>
            </ul>
          </article>
        </div>

        <div className="section__grid" style={{ marginTop: 28 }}>
          <article className="panel glass">
            <h2>Compliance & Taxation</h2>
            <ul className="checklist">
              <li>GST Consultancy and E-filing</li>
              <li>ROC Forms and Corporate Compliance</li>
              <li>Central Excise, Customs and Tax Certification</li>
              <li>Professional Tax Guidance</li>
              <li>Statutory Returns and Filings</li>
            </ul>
          </article>

          <article className="panel glass">
            <h2>Training & Advisory</h2>
            <ul className="checklist">
              <li>Costing System Implementation</li>
              <li>Management Information Systems</li>
              <li>Online Advice and Continuous Support</li>
              <li>Management Reports and Project Evaluation</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
