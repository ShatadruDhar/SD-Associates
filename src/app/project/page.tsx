const experience = [
  { client: 'Indian Refractories Ltd.', scope: 'Cost Audit of Refractory Manufacturing', sector: 'Manufacturing' },
  { client: 'Shalimar Engineering Works Ltd.', scope: 'Cost Audit of FeCr and Silico Mn Production', sector: 'Metallurgy' },
  { client: 'Premier Poly & Cast Pvt. Ltd.', scope: 'Cost Audit of Plastic Product Manufacturing', sector: 'Plastic Production' },
  { client: 'Quilon Medicos Pvt. Ltd.', scope: 'Cost Audit of Pharmaceutical Units', sector: 'Pharma' },
  { client: 'RTW Group', scope: 'Cost Audit of Garment Production and Exports', sector: 'Textiles' },
  { client: 'OFA & Co. (India) Pvt. Ltd.', scope: 'Cost Statements and Audit', sector: 'Packaging' },
  { client: 'Surana Udyog India Pvt. Ltd.', scope: 'Cost Audit and Risk Review', sector: 'Manufacturing' },
  { client: 'Amlai Industrial Development Corporation', scope: 'Cost Audit and Costing Systems', sector: 'Infrastructure' },
  { client: 'P. Chandra & Co.', scope: 'Cost Audit of Mining & Minerals', sector: 'Mining' },
  { client: 'Agrawal Alloys Pvt. Ltd.', scope: 'Cost Audit of Alloy Production', sector: 'Engineering' },
  { client: 'Sri Ganesh Surekha Agro Foods', scope: 'Cost Audit of Agro Processing', sector: 'Food Processing' },
  { client: 'Shree Jay Govind Industries', scope: 'Cost Audit of Alloy Steel Plant', sector: 'Steel' },
  { client: 'Bengal Overseas Plywood Co. Pvt. Ltd.', scope: 'Cost Audit of Plywood and Veneers', sector: 'Timber Products' },
  { client: 'Java Insulations Ltd.', scope: 'Cost Audit and Cost Certification', sector: 'Electrical' },
  { client: 'Amrita Glass and Industries', scope: 'Cost Audit of Glass and Float Glass Plant', sector: 'Glass Manufacturing' },
];

export default function ProjectPage() {
  return (
    <section className="page-banner">
      <div className="page-shell page-banner__box glass">
        <span className="eyebrow">Work Experience</span>
        <h1>Professional Engagements and Cost Audit Assignments</h1>
        <p>
          Our experience includes cost audit, internal audit, management accounting, and statutory compliance services for manufacturing, export, trading, and service firms.
        </p>

        <div className="experience-grid" style={{ marginTop: 28 }}>
          {experience.map((item) => (
            <article key={item.client} className="project-card glass">
              <h3>{item.client}</h3>
              <p>{item.scope}</p>
              <p className="testimonial-meta">Sector: {item.sector}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
