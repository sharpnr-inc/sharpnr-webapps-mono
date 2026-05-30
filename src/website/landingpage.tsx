"use client";

import { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    "All",
    "Manufacturing",
    "Raw Materials",
    "Electronics",
    "Logistics",
    "Industrial",
    "Chemicals",
    "Textiles",
  ];

  const features = [
    {
      icon: "◈",
      title: "Verified Supplier Network",
      desc: "Every supplier undergoes rigorous vetting — financials, certifications, and on-site audits before listing.",
    },
    {
      icon: "⬡",
      title: "Smart RFQ Engine",
      desc: "Automate procurement with AI-driven quote matching across thousands of qualified vendors instantly.",
    },
    {
      icon: "◇",
      title: "Escrow & Secure Payments",
      desc: "Multi-currency escrow with milestone-based releases. Backed by tier-1 banking infrastructure.",
    },
    {
      icon: "△",
      title: "Real-time Trade Analytics",
      desc: "Track market pricing, supplier performance, and procurement velocity on a single dashboard.",
    },
    {
      icon: "○",
      title: "Compliance Automation",
      desc: "Automated checks for customs, tariffs, and regulatory requirements across 180+ countries.",
    },
    {
      icon: "□",
      title: "Enterprise API Access",
      desc: "Deep ERP and procurement system integrations via REST and GraphQL APIs with 99.98% uptime SLA.",
    },
  ];

  const testimonials = [
    {
      quote:
        "SharpNR cut our procurement cycle from 30 days to under 72 hours. The supplier verification alone saved us from three costly mistakes.",
      name: "Arjun Mehta",
      role: "VP Supply Chain",
      company: "TechForge Industries",
      avatar: "AM",
    },
    {
      quote:
        "We've processed $40M through the platform in 18 months. The escrow system and compliance automation are genuinely world-class.",
      name: "Sarah Lindqvist",
      role: "Chief Procurement Officer",
      company: "Nordic Industrials",
      avatar: "SL",
    },
    {
      quote:
        "As a supplier, our qualified lead volume tripled within 60 days of listing. The buyer quality is unmatched.",
      name: "Rohan Kapoor",
      role: "Director of Business Development",
      company: "Kapoor Materials Group",
      avatar: "RK",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Create Your Account",
      desc: "Set up your buyer or seller profile in minutes. Verification typically completes within 24 hours.",
    },
    {
      step: "02",
      title: "Browse or List",
      desc: "Post procurement needs or list your products. Our matching algorithm surfaces the right counterparties instantly.",
    },
    {
      step: "03",
      title: "Negotiate & Transact",
      desc: "Communicate, negotiate terms, and finalize deals — all within the platform with full audit trails.",
    },
    {
      step: "04",
      title: "Fulfill & Scale",
      desc: "Track shipments, manage payments via escrow, and automate repeat orders to grow your trade volume.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .snr-page {
          background: #080C16;
          color: #F0F4FF;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .snr-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 2rem 5rem;
          position: relative;
          overflow: hidden;
        }

        .snr-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(180,145,60,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 100% 60%, rgba(180,145,60,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 0% 80%, rgba(30,50,100,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .snr-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(180,145,60,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,145,60,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        .snr-hero-inner {
          max-width: 900px;
          text-align: center;
          position: relative;
          z-index: 1;
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? 0 : "24px"});
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .snr-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          background: rgba(180, 145, 60, 0.08);
          border: 1px solid rgba(180, 145, 60, 0.2);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #B4913C;
          margin-bottom: 2rem;
        }

        .snr-hero-eyebrow::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #B4913C;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .snr-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 9vw, 7.5rem);
          letter-spacing: 0.02em;
          line-height: 0.95;
          color: #F0F4FF;
          margin-bottom: 1.5rem;
        }

        .snr-hero-title .gold {
          background: linear-gradient(135deg, #B4913C 0%, #E8C96D 50%, #B4913C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .snr-hero-subtitle {
          font-size: 1.1rem;
          color: #6B7A99;
          line-height: 1.7;
          max-width: 580px;
          margin: 0 auto 2.5rem;
          font-weight: 400;
        }

        .snr-hero-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .snr-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #080C16;
          background: linear-gradient(135deg, #B4913C 0%, #E8C96D 100%);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.02em;
          text-decoration: none;
        }

        .snr-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(180, 145, 60, 0.4);
        }

        .snr-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #8A95B0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
        }

        .snr-cta-secondary:hover {
          color: #F0F4FF;
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
        }

        .snr-hero-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .snr-trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #3D4A63;
          font-weight: 500;
        }

        .snr-trust-item::before {
          content: '✓';
          color: #B4913C;
          font-weight: 700;
        }

        /* ── SECTION SHARED ── */
        .snr-section {
          padding: 6rem 2rem;
          position: relative;
        }

        .snr-section-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .snr-section-label {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #B4913C;
          margin-bottom: 0.75rem;
        }

        .snr-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          letter-spacing: 0.03em;
          line-height: 1;
          color: #F0F4FF;
          margin-bottom: 1rem;
        }

        .snr-section-desc {
          font-size: 1rem;
          color: #4A5568;
          line-height: 1.7;
          max-width: 520px;
        }

        /* ── CATEGORIES ── */
        .snr-categories {
          background: #04070F;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          padding: 2rem;
          overflow-x: auto;
        }

        .snr-categories-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .snr-cat-pill {
          padding: 0.5rem 1.25rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          border: 1px solid rgba(255,255,255,0.07);
          background: none;
          color: #4A5568;
          letter-spacing: 0.01em;
        }

        .snr-cat-pill:hover { color: #8A95B0; border-color: rgba(255,255,255,0.15); }

        .snr-cat-pill.active {
          background: rgba(180, 145, 60, 0.12);
          border-color: rgba(180, 145, 60, 0.35);
          color: #B4913C;
        }

        /* ── FEATURES ── */
        .snr-features-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3.5rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .snr-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px;
          overflow: hidden;
        }

        .snr-feature-card {
          background: #080C16;
          padding: 2.5rem;
          transition: background 0.3s;
          position: relative;
          overflow: hidden;
        }

        .snr-feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 80% at 0% 0%, rgba(180,145,60,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .snr-feature-card:hover::before { opacity: 1; }
        .snr-feature-card:hover { background: rgba(8, 12, 22, 0.7); }

        .snr-feature-icon {
          font-size: 1.5rem;
          color: #B4913C;
          margin-bottom: 1.25rem;
          line-height: 1;
          display: block;
        }

        .snr-feature-title {
          font-size: 1rem;
          font-weight: 600;
          color: #C8D3EB;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }

        .snr-feature-desc {
          font-size: 0.875rem;
          color: #3D4A63;
          line-height: 1.65;
        }

        /* ── HOW IT WORKS ── */
        .snr-how-bg {
          background: #04070F;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .snr-how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 3.5rem;
          position: relative;
        }

        .snr-how-grid::before {
          content: '';
          position: absolute;
          top: 28px;
          left: calc(12.5% + 20px);
          right: calc(12.5% + 20px);
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,145,60,0.3), rgba(180,145,60,0.3), transparent);
        }

        .snr-how-step {
          text-align: center;
          position: relative;
        }

        .snr-step-number-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .snr-step-number {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(180, 145, 60, 0.08);
          border: 1px solid rgba(180, 145, 60, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          color: #B4913C;
        }

        .snr-step-title {
          font-size: 1rem;
          font-weight: 600;
          color: #C8D3EB;
          margin-bottom: 0.6rem;
        }

        .snr-step-desc {
          font-size: 0.85rem;
          color: #3D4A63;
          line-height: 1.65;
        }

        /* ── TESTIMONIALS ── */
        .snr-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3.5rem;
        }

        .snr-testimonial-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 2rem;
          transition: border-color 0.3s;
        }

        .snr-testimonial-card:hover {
          border-color: rgba(180, 145, 60, 0.2);
        }

        .snr-quote-mark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          color: rgba(180, 145, 60, 0.2);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .snr-quote-text {
          font-size: 0.9rem;
          color: #6B7A99;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .snr-quote-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .snr-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(180, 145, 60, 0.1);
          border: 1px solid rgba(180, 145, 60, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: #B4913C;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }

        .snr-author-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #C8D3EB;
        }

        .snr-author-role {
          font-size: 0.775rem;
          color: #3D4A63;
          margin-top: 0.1rem;
        }

        /* ── CTA BANNER ── */
        .snr-cta-banner {
          margin: 0 2rem 6rem;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(180,145,60,0.08) 0%, rgba(180,145,60,0.04) 50%, rgba(30,50,100,0.1) 100%);
          border: 1px solid rgba(180, 145, 60, 0.2);
          padding: 4rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .snr-cta-banner::before {
          content: '';
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(180,145,60,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .snr-cta-banner-max {
          max-width: 1400px;
          margin: 0 auto;
        }

        .snr-cta-banner-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          letter-spacing: 0.03em;
          color: #F0F4FF;
          margin-bottom: 0.75rem;
        }

        .snr-cta-banner-sub {
          font-size: 1rem;
          color: #4A5568;
          margin-bottom: 2rem;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.65;
        }

        .snr-cta-banner-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .snr-cta-banner-note {
          margin-top: 1rem;
          font-size: 0.775rem;
          color: #2D3748;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .snr-features-grid { grid-template-columns: repeat(2, 1fr); }
          .snr-testimonials-grid { grid-template-columns: repeat(2, 1fr); }
          .snr-how-grid { grid-template-columns: repeat(2, 1fr); }
          .snr-how-grid::before { display: none; }
        }

        @media (max-width: 640px) {
          .snr-features-grid { grid-template-columns: 1fr; }
          .snr-testimonials-grid { grid-template-columns: 1fr; }
          .snr-how-grid { grid-template-columns: 1fr; }
          .snr-cta-banner { margin: 0 1rem 4rem; padding: 3rem 1.5rem; }
        }
      `}</style>

      <div className="snr-page">
        <Header />

        {/* ── HERO ── */}
        <section className="snr-hero">
          <div className="snr-hero-bg" />
          <div className="snr-hero-grid" />
          <div className="snr-hero-inner">
            <span className="snr-hero-eyebrow">B2B Marketplace Platform</span>
            <h1 className="snr-hero-title">
              TRADE AT
              <br />
              <span className="gold">ENTERPRISE</span>
              <br />
              VELOCITY
            </h1>
            <p className="snr-hero-subtitle">
              SharpNR connects verified buyers and suppliers across industries.
              Streamline procurement, negotiate with confidence, and scale your
              business operations globally.
            </p>
            <div className="snr-hero-cta">
              <a href="#" className="snr-cta-primary">
                Start Buying or Selling →
              </a>
              <a href="#" className="snr-cta-secondary">
                ▷ Watch Platform Demo
              </a>
            </div>
            <div className="snr-hero-trust">
              {[
                "No setup fees",
                "Verified counterparties",
                "Escrow-protected payments",
                "24/7 Support",
              ].map((t) => (
                <span key={t} className="snr-trust-item">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORY FILTER ── */}
        <div className="snr-categories">
          <div className="snr-categories-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`snr-cat-pill${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section className="snr-section">
          <div className="snr-section-inner">
            <div className="snr-features-header">
              <div>
                <span className="snr-section-label">Platform Capabilities</span>
                <h2 className="snr-section-title">
                  BUILT FOR
                  <br />
                  SERIOUS COMMERCE
                </h2>
              </div>
              <p className="snr-section-desc">
                Every feature was designed with high-volume B2B transactions in
                mind — from first contact to final fulfillment.
              </p>
            </div>
            <div className="snr-features-grid">
              {features.map((f) => (
                <div key={f.title} className="snr-feature-card">
                  <span className="snr-feature-icon">{f.icon}</span>
                  <div className="snr-feature-title">{f.title}</div>
                  <p className="snr-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="snr-section snr-how-bg">
          <div className="snr-section-inner">
            <span className="snr-section-label">Process</span>
            <h2 className="snr-section-title">HOW IT WORKS</h2>
            <div className="snr-how-grid">
              {howItWorks.map((step) => (
                <div key={step.step} className="snr-how-step">
                  <div className="snr-step-number-wrap">
                    <div className="snr-step-number">{step.step}</div>
                  </div>
                  <div className="snr-step-title">{step.title}</div>
                  <p className="snr-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="snr-section">
          <div className="snr-section-inner">
            <span className="snr-section-label">Social Proof</span>
            <h2 className="snr-section-title">
              TRUSTED BY
              <br />
              INDUSTRY LEADERS
            </h2>
            <div className="snr-testimonials-grid">
              {testimonials.map((t) => (
                <div key={t.name} className="snr-testimonial-card">
                  <div className="snr-quote-mark">"</div>
                  <p className="snr-quote-text">{t.quote}</p>
                  <div className="snr-quote-author">
                    <div className="snr-avatar">{t.avatar}</div>
                    <div>
                      <div className="snr-author-name">{t.name}</div>
                      <div className="snr-author-role">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <div className="snr-cta-banner">
          <div className="snr-cta-banner-max">
            <h2 className="snr-cta-banner-title">READY TO TRADE SMARTER?</h2>
            <p className="snr-cta-banner-sub">
              Join 12,000+ verified companies already using SharpNR to
              streamline their B2B procurement and grow their supplier network.
            </p>
            <div className="snr-cta-banner-actions">
              <a href="#" className="snr-cta-primary">
                Create Free Account →
              </a>
              <a href="#" className="snr-cta-secondary">
                Talk to Enterprise Sales
              </a>
            </div>
            <p className="snr-cta-banner-note">
              Free to join · No credit card required · Enterprise plans from
              $999/mo
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
