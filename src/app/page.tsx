'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const COMPANY_LOGOS = [
  { name: 'Coal India', src: '/coal-india-logo-png_seeklogo-304343.png' },
  { name: 'WBSEDCL', src: '/wbsedcl.jpg' },
  { name: 'BMW Industries', src: '/bmw_industries_ltd_logo.jpeg' },
  { name: 'Indian Bank', src: '/Indian Bank.png' },
  { name: 'State Bank of India', src: '/state-bank-of-india4988.logowik.com.webp' },
  { name: 'Allahabad Bank', src: '/Alahabad Bank.jpg' },
  { name: 'Indian Overseas Bank', src: '/Indian Overseas Bank.png' },
  { name: 'Village Financial', src: '/Logo-_VFS_Capital.webp' },
  { name: 'Rohan Gloves', src: '/Rohan Gloves.png' },
  { name: 'Ushasi Realstates', src: '/Usashi Realstates.jpeg' },
];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState({ proprietor: 0, cmas: 0, staff: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible['manpower']) {
      let propCount = 0,
        cmaCount = 0,
        staffCount = 0;
      const interval = setInterval(() => {
        if (propCount < 1) propCount++;
        if (cmaCount < 7) cmaCount++;
        if (staffCount < 15) staffCount++;
        setStats({ proprietor: propCount, cmas: cmaCount, staff: staffCount });
        if (propCount === 1 && cmaCount === 7 && staffCount === 15) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isVisible['manpower']]);

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="hero"
      >
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Strategic Cost Accounting & Management Advisory for Indian Businesses</h1>
            <p>
              Delivering confident audit, compliance and financial controls for manufacturers, banks, healthcare
              providers and institutional clients across West Bengal and India.
            </p>
            <div className="hero-buttons">
              <Link href="/service" className="cta-button">
                Explore More
              </Link>
              <Link href="#contact" className="secondary-button">
                Contact Us
              </Link>
              <Link href="/login/employee" className="secondary-button">
                Employee Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="section-title">
            <h2>About Us</h2>
            <p>Committed to delivering technical excellence and responsive advisory services</p>
          </div>
          <div className="card">
            <p>
              Samar Dhar & Associates is a firm of Cost and Management Accountants committed to delivering technical
              excellence, practical support, and responsive advisory services for businesses and institutions. We provide
              expert cost and management accounting services, audit support, compliance filing, corporate advisory, and
              specialized reports for industries across manufacturing, trade, education, healthcare, and services.
            </p>
            <br />
            <p>
              <strong>Mission:</strong> To empower businesses through responsible cost management, transparent reporting,
              and compliance-focused advisory that adds value to financial decisions.
            </p>
            <br />
            <p>
              <strong>Vision:</strong> To be a trusted partner for organizations seeking practical cost accounting
              solutions, robust control systems, and reliable statutory compliance support.
            </p>
            <br />
            <p>
              <strong>Core Values:</strong> Professional integrity, client-focused solutions, accuracy and timeliness,
              continuous improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>Comprehensive cost accounting and compliance solutions</p>
          </div>
          <div className="grid">
            <div className="card service-card">
              <i className="fas fa-calculator"></i>
              <h3>Cost Audit</h3>
              <p>Comprehensive cost audit services to meet statutory requirements and support management decisions.</p>
            </div>
            <div className="card service-card">
              <i className="fas fa-search"></i>
              <h3>Internal Audit</h3>
              <p>Internal audit, stock audit, and warehouse audit for operational efficiency.</p>
            </div>
            <div className="card service-card">
              <i className="fas fa-file-alt"></i>
              <h3>Compliance & Taxation</h3>
              <p>GST consultancy, ROC forms, central excise, and statutory filings.</p>
            </div>
            <div className="card service-card">
              <i className="fas fa-chart-line"></i>
              <h3>Management Consulting</h3>
              <p>Financial reporting, budgeting, resource optimization, and corporate restructuring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section with Animated Logos */}
      <section id="experience">
        <div className="container">
          <div className="section-title">
            <h2>Experience With</h2>
            <p>Trusted by leading organizations across industries</p>
          </div>
          <div className="logo-marquee">
            <div className="logo-marquee__track">
              {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, i) => (
                <div key={i} className="logo-marquee__item">
                  <img src={logo.src} alt={logo.name} />
                  <p>{logo.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proprietor Profile */}
      <section id="profile">
        <div className="container">
          <div className="section-title">
            <h2>Proprietor Profile</h2>
            <p>Meet CMA Samar Dhar</p>
          </div>
          <div className="card">
            <h3>CMA Samar Dhar</h3>
            <p>
              <strong>Qualifications:</strong> Cost Accountant (ICMAI Registration No. 101762)
            </p>
            <p>
              A practicing Cost Accountant with long experience in cost accounting, audit, taxation, and corporate
              compliance. Leads the firm's engagements and provides strategic guidance for clients across sectors.
            </p>
            <div style={{ display: 'inline-block', marginTop: '20px' }}>
              <span className="badge">
                <strong>22+ Years Experience</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Manpower Section */}
      <section id="manpower">
        <div className="container">
          <div className="section-title">
            <h2>Our Manpower</h2>
            <p>Dedicated team of professionals</p>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat-number">{stats.proprietor}</div>
              <p>Proprietor</p>
            </div>
            <div className="stat">
              <div className="stat-number">{stats.cmas}</div>
              <p>Qualified CMAs</p>
            </div>
            <div className="stat">
              <div className="stat-number">{stats.staff}</div>
              <p>Semi-Qualified Staff</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contact Us</h2>
            <p>Get in touch for your cost accounting needs</p>
          </div>
          <div className="contact-grid">
            <div className="card">
              <h3>Main Office</h3>
              <p>260, Grand Trunk Road, Kotrung, Uttarpara, Hooghly - 712258, West Bengal</p>
              <h3>Branch Office</h3>
              <p>12A/2, B. N. Road, Serampore, Hooghly - 712201, West Bengal</p>
              <p>
                <strong>Phone:</strong> 9830566068
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:sdconsultancy01@gmail.com">
                  sdconsultancy01@gmail.com
                </a>
              </p>
              <p>
                <strong>Registration:</strong> Cost Accountant No. 101762 (ICMAI)
              </p>
            </div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.123456789012!2d88.34567890123456!3d22.65432109876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM5JzE1LjUiTiA4OMKwMjAnNDQuMyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
