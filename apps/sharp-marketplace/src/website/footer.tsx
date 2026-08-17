export function Footer() {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: "Marketplace",
      links: [
        "Browse Categories",
        "Featured Suppliers",
        "New Arrivals",
        "Bulk Orders",
        "RFQ Board",
      ],
    },
    {
      title: "Solutions",
      links: [
        "For Buyers",
        "For Sellers",
        "Enterprise",
        "API & Integrations",
        "White Label",
      ],
    },
    {
      title: "Company",
      links: ["About SharpNR", "Careers", "Press Kit", "Blog", "Contact Us"],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Documentation",
        "Status Page",
        "Trust & Safety",
        "Compliance",
      ],
    },
  ];

  const stats = [
    { value: "12K+", label: "Verified Suppliers" },
    { value: "$2.4B", label: "GMV Processed" },
    { value: "180+", label: "Countries Served" },
    { value: "99.98%", label: "Platform Uptime" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .snr-footer {
          background: #04070F;
          font-family: 'DM Sans', sans-serif;
          border-top: 1px solid rgba(180, 145, 60, 0.15);
        }

        /* Stats Band */
        .snr-footer-stats {
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 3rem 2rem;
        }

        .snr-footer-stats-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .snr-stat-item {
          text-align: center;
          padding: 1.5rem;
          position: relative;
        }

        .snr-stat-item::after {
          content: '';
          position: absolute;
          right: 0;
          top: 25%;
          height: 50%;
          width: 1px;
          background: rgba(255,255,255,0.07);
        }

        .snr-stat-item:last-child::after { display: none; }

        .snr-stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, #B4913C, #E8C96D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .snr-stat-label {
          font-size: 0.8rem;
          color: #4A5568;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Main Footer Grid */
        .snr-footer-main {
          padding: 4rem 2rem;
        }

        .snr-footer-main-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 3rem;
        }

        .snr-footer-brand .snr-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
          text-decoration: none;
        }

        .snr-footer-brand .snr-logo-mark {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #B4913C 0%, #E8C96D 50%, #B4913C 100%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          flex-shrink: 0;
        }

        .snr-footer-brand .snr-logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.08em;
          color: #F0F4FF;
          line-height: 1;
        }

        .snr-footer-brand .snr-logo-text span { color: #B4913C; }

        .snr-footer-tagline {
          font-size: 0.875rem;
          color: #4A5568;
          line-height: 1.65;
          max-width: 260px;
          margin-bottom: 1.75rem;
        }

        .snr-footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .snr-badge {
          padding: 0.3rem 0.75rem;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 3px;
          color: #B4913C;
          border: 1px solid rgba(180, 145, 60, 0.25);
          background: rgba(180, 145, 60, 0.06);
        }

        .snr-social-links {
          display: flex;
          gap: 0.75rem;
        }

        .snr-social-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.08);
          color: #4A5568;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          background: none;
          font-family: 'DM Sans', sans-serif;
        }

        .snr-social-btn:hover {
          border-color: rgba(180, 145, 60, 0.4);
          color: #B4913C;
        }

        /* Column */
        .snr-footer-col-title {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #F0F4FF;
          margin-bottom: 1.25rem;
        }

        .snr-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .snr-footer-links li a {
          font-size: 0.875rem;
          color: #4A5568;
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1.4;
        }

        .snr-footer-links li a:hover { color: #8A95B0; }

        /* Bottom Bar */
        .snr-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 1.5rem 2rem;
        }

        .snr-footer-bottom-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .snr-copyright {
          font-size: 0.8rem;
          color: #2D3748;
        }

        .snr-copyright span { color: #4A5568; }

        .snr-footer-legal {
          display: flex;
          gap: 1.5rem;
        }

        .snr-footer-legal a {
          font-size: 0.8rem;
          color: #2D3748;
          text-decoration: none;
          transition: color 0.2s;
        }

        .snr-footer-legal a:hover { color: #4A5568; }

        /* Responsive */
        @media (max-width: 1100px) {
          .snr-footer-main-inner {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .snr-footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 700px) {
          .snr-footer-stats-inner {
            grid-template-columns: repeat(2, 1fr);
          }
          .snr-footer-main-inner {
            grid-template-columns: 1fr 1fr;
          }
          .snr-footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .snr-footer-main-inner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <footer className="snr-footer">
        {/* Stats Band */}
        <div className="snr-footer-stats">
          <div className="snr-footer-stats-inner">
            {stats.map((s) => (
              <div key={s.label} className="snr-stat-item">
                <div className="snr-stat-value">{s.value}</div>
                <div className="snr-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="snr-footer-main">
          <div className="snr-footer-main-inner">
            {/* Brand Col */}
            <div className="snr-footer-brand">
              <a href="/" className="snr-logo">
                <div className="snr-logo-mark" />
                <span className="snr-logo-text">
                  SHARP<span>NR</span>
                </span>
              </a>
              <p className="snr-footer-tagline">
                The B2B marketplace built for serious commerce. Connect with
                verified suppliers, streamline procurement, and scale your
                business operations globally.
              </p>
              <div className="snr-footer-badges">
                <span className="snr-badge">ISO 27001</span>
                <span className="snr-badge">SOC 2 Type II</span>
                <span className="snr-badge">GDPR Ready</span>
              </div>
              <div className="snr-social-links">
                {["in", "𝕏", "YT", "GH"].map((s) => (
                  <button key={s} className="snr-social-btn">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {columns.map((col) => (
              <div key={col.title}>
                <div className="snr-footer-col-title">{col.title}</div>
                <ul className="snr-footer-links">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="snr-footer-bottom">
          <div className="snr-footer-bottom-inner">
            <p className="snr-copyright">
              © {currentYear} SharpNR Technologies, Inc.{" "}
              <span>All rights reserved.</span>
            </p>
            <nav className="snr-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Preferences</a>
              <a href="#">Accessibility</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
