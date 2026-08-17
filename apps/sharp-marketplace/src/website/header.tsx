"use client";

import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Marketplace");

  const navItems = ["Marketplace", "Solutions", "Pricing", "Enterprise", "Resources"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .snr-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(8, 12, 22, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(180, 145, 60, 0.15);
          font-family: 'DM Sans', sans-serif;
        }

        .snr-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .snr-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .snr-logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #B4913C 0%, #E8C96D 50%, #B4913C 100%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .snr-logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.08em;
          color: #F0F4FF;
          line-height: 1;
        }

        .snr-logo-text span {
          color: #B4913C;
        }

        .snr-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }

        .snr-nav-item {
          position: relative;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #8A95B0;
          cursor: pointer;
          transition: color 0.2s;
          letter-spacing: 0.02em;
          white-space: nowrap;
          background: none;
          border: none;
        }

        .snr-nav-item:hover {
          color: #F0F4FF;
        }

        .snr-nav-item.active {
          color: #F0F4FF;
        }

        .snr-nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, #B4913C, #E8C96D);
          border-radius: 1px;
        }

        .snr-header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .snr-btn-ghost {
          padding: 0.5rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #8A95B0;
          background: none;
          border: 1px solid rgba(138, 149, 176, 0.2);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }

        .snr-btn-ghost:hover {
          color: #F0F4FF;
          border-color: rgba(180, 145, 60, 0.4);
        }

        .snr-btn-primary {
          padding: 0.5rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #080C16;
          background: linear-gradient(135deg, #B4913C 0%, #E8C96D 100%);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        .snr-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(180, 145, 60, 0.35);
        }

        .snr-divider {
          width: 1px;
          height: 20px;
          background: rgba(138, 149, 176, 0.2);
        }

        .snr-mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
        }

        .snr-mobile-toggle span {
          display: block;
          width: 22px;
          height: 2px;
          background: #8A95B0;
          transition: all 0.3s;
        }

        .snr-mobile-menu {
          display: none;
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: rgba(8, 12, 22, 0.98);
          border-bottom: 1px solid rgba(180, 145, 60, 0.15);
          padding: 1rem 2rem 1.5rem;
          flex-direction: column;
          gap: 0.25rem;
        }

        .snr-mobile-menu.open {
          display: flex;
        }

        .snr-mobile-nav-item {
          padding: 0.75rem 0;
          font-size: 1rem;
          font-weight: 500;
          color: #8A95B0;
          cursor: pointer;
          border-bottom: 1px solid rgba(138, 149, 176, 0.08);
          font-family: 'DM Sans', sans-serif;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          text-align: left;
          width: 100%;
          transition: color 0.2s;
        }

        .snr-mobile-nav-item:hover { color: #F0F4FF; }

        .snr-mobile-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .snr-mobile-actions .snr-btn-ghost,
        .snr-mobile-actions .snr-btn-primary {
          flex: 1;
          text-align: center;
        }

        @media (max-width: 900px) {
          .snr-nav { display: none; }
          .snr-header-actions { display: none; }
          .snr-mobile-toggle { display: flex; }
        }
      `}</style>

      <header className="snr-header">
        <div className="snr-header-inner">
          {/* Logo */}
          <a href="/" className="snr-logo">
            <div className="snr-logo-mark" />
            <span className="snr-logo-text">
              SHARP<span>NR</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="snr-nav">
            {navItems.map((item) => (
              <button
                key={item}
                className={`snr-nav-item${activeNav === item ? " active" : ""}`}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="snr-header-actions">
            <button className="snr-btn-ghost">Sign In</button>
            <div className="snr-divider" />
            <button className="snr-btn-primary">Get Started →</button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="snr-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`snr-mobile-menu${menuOpen ? " open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item}
            className="snr-mobile-nav-item"
            onClick={() => { setActiveNav(item); setMenuOpen(false); }}
          >
            {item}
          </button>
        ))}
        <div className="snr-mobile-actions">
          <button className="snr-btn-ghost">Sign In</button>
          <button className="snr-btn-primary">Get Started →</button>
        </div>
      </div>
    </>
  );
}