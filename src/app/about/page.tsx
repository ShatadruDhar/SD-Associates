export default function AboutPage() {
  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">About Our Firm</span>
        <h1>Samar Dhar & Associates</h1>
        <p>
          Samar Dhar & Associates is a firm of Cost and Management Accountants committed to delivering technical excellence, practical support, and responsive advisory services for businesses and institutions.
        </p>

        <div className="section__grid" style={{ marginTop: 28 }}>
          <article className="panel glass">
            <h2>Firm Profile</h2>
            <p>
              We are assisted by a team of competent financial engineers and cost accountants with long experience in related fields. Our principal has served as a practising Cost Accountant and offers expert guidance on both direct and indirect taxation matters.
            </p>
            <p>
              The firm provides specialised services in cost audit, internal audit, financial reporting, corporate governance, ROC compliance, GST consultancy, and statutory certification.
            </p>
          </article>

          <article className="panel glass">
            <h2>Mission</h2>
            <p>
              To empower businesses through responsible cost management, transparent reporting, and compliance-focused advisory that adds value to financial decisions.
            </p>
            <h2>Vision</h2>
            <p>
              To be a trusted partner for organizations seeking practical cost accounting solutions, robust control systems, and reliable statutory compliance support.
            </p>
          </article>
        </div>

        <div className="section__grid" style={{ marginTop: 28 }}>
          <article className="panel glass">
            <h2>Core Values</h2>
            <ul className="checklist">
              <li>Professional integrity in every assignment</li>
              <li>Client-focused solutions tailored to specific business needs</li>
              <li>Accuracy, timeliness, and full regulatory compliance</li>
              <li>Continuous improvement through training and advisory</li>
            </ul>
          </article>

          <article className="panel glass">
            <h2>Offices</h2>
            <p>
              Head Office: 260, Grand Trunk Road, Kotrung, Uttarpara, Hooghly - 712258, West Bengal.
            </p>
            <p>
              Branch Office: 12A/2, B. N. Road, Serampore, Hooghly - 712201, West Bengal.
            </p>
            <p>
              Registration No: 101762 (ICMAI)
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
