import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Coins,
  LineChart,
  Wallet,
  Newspaper,
  Search,
  Bell,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Markets", path: "/markets", icon: Coins },
    { name: "Portfolio", path: "/portfolio", icon: Wallet },
    { name: "Charts", path: "/charts", icon: LineChart },
    { name: "News", path: "/news", icon: Newspaper },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@500;600&display=swap');

        .cp-nav-root {
          --cp-glass: rgba(8, 16, 20, 0.72);
          --cp-glass-border: rgba(255, 255, 255, 0.08);
          --cp-glass-hover: rgba(255, 255, 255, 0.05);
          --cp-accent: #a3e635;
          --cp-accent-dim: rgba(163, 230, 53, 0.12);
          --cp-accent-glow: rgba(163, 230, 53, 0.25);
          --cp-text: #f0f4f8;
          --cp-muted: rgba(160, 180, 195, 0.6);
          --cp-surface: rgba(15, 25, 32, 0.9);
          font-family: 'DM Sans', sans-serif;
        }

        .cp-header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cp-header.scrolled .cp-glass-bar {
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          background: var(--cp-glass);
          border-bottom: 1px solid var(--cp-glass-border);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .cp-glass-bar {
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          background: rgba(8, 16, 20, 0.5);
          border-bottom: 1px solid transparent;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cp-inner {
          max-width: 1200px;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }

        /* Logo */
        .cp-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .cp-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--cp-accent-dim);
          border: 1px solid rgba(163, 230, 53, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .cp-logo:hover .cp-logo-icon {
          background: var(--cp-accent-glow);
          border-color: rgba(163, 230, 53, 0.4);
          transform: rotate(-6deg) scale(1.05);
        }

        .cp-logo-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--cp-text);
          letter-spacing: -0.3px;
        }

        .cp-logo-text span {
          color: var(--cp-accent);
        }

        /* Pill nav */
        .cp-nav-pill {
          display: none;
          align-items: center;
          gap: 2px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--cp-glass-border);
          border-radius: 14px;
          padding: 4px;
        }

        @media (min-width: 900px) {
          .cp-nav-pill { display: flex; }
        }

        .cp-nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--cp-muted);
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
          position: relative;
        }

        .cp-nav-link:hover {
          color: var(--cp-text);
          background: var(--cp-glass-hover);
        }

        .cp-nav-link.active {
          color: var(--cp-accent);
          background: var(--cp-accent-dim);
        }

        .cp-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--cp-accent);
          border-radius: 2px;
          opacity: 0.6;
        }

        /* Right actions */
        .cp-actions {
          display: none;
          align-items: center;
          gap: 8px;
        }

        @media (min-width: 680px) {
          .cp-actions { display: flex; }
        }

        /* Search */
        .cp-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          height: 36px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--cp-glass-border);
          border-radius: 10px;
          transition: all 0.3s ease;
          width: 140px;
        }

        .cp-search.focused {
          background: rgba(255,255,255,0.07);
          border-color: rgba(163,230,53,0.25);
          width: 200px;
          box-shadow: 0 0 0 3px rgba(163,230,53,0.08);
        }

        .cp-search input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 13px;
          color: var(--cp-text);
          width: 100%;
          font-family: 'DM Sans', sans-serif;
        }

        .cp-search input::placeholder {
          color: var(--cp-muted);
        }

        /* Bell */
        .cp-bell {
          position: relative;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--cp-glass-border);
          border-radius: 10px;
          cursor: pointer;
          color: var(--cp-muted);
          transition: all 0.25s ease;
        }

        .cp-bell:hover {
          background: rgba(255,255,255,0.08);
          color: var(--cp-text);
          border-color: rgba(255,255,255,0.12);
        }

        .cp-bell-dot {
          position: absolute;
          top: 7px;
          right: 8px;
          width: 6px;
          height: 6px;
          background: var(--cp-accent);
          border-radius: 50%;
          border: 1.5px solid var(--cp-surface);
        }

        /* CTA Button */
        .cp-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 36px;
          padding: 0 16px;
          background: var(--cp-accent);
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #0a1a0a;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.25s ease;
          letter-spacing: 0.1px;
        }

        .cp-cta:hover {
          background: #bef264;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px var(--cp-accent-glow);
        }

        .cp-cta:active {
          transform: translateY(0);
        }

        /* Mobile toggle */
        .cp-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--cp-glass-border);
          border-radius: 10px;
          cursor: pointer;
          color: var(--cp-text);
          transition: all 0.25s ease;
        }

        .cp-toggle:hover {
          background: rgba(255,255,255,0.08);
        }

        @media (min-width: 900px) {
          .cp-toggle { display: none; }
        }

        /* Mobile drawer */
        .cp-drawer {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        .cp-drawer.open {
          max-height: 520px;
          opacity: 1;
        }

        .cp-drawer-inner {
          background: var(--cp-glass);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid var(--cp-glass-border);
          padding: 16px 20px 20px;
        }

        .cp-drawer-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          height: 40px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--cp-glass-border);
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .cp-drawer-search input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          color: var(--cp-text);
          width: 100%;
          font-family: 'DM Sans', sans-serif;
        }

        .cp-drawer-search input::placeholder { color: var(--cp-muted); }

        .cp-drawer-links {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 14px;
        }

        .cp-drawer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: var(--cp-muted);
          text-decoration: none;
          background: rgba(255,255,255,0.03);
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .cp-drawer-link:hover {
          color: var(--cp-text);
          background: rgba(255,255,255,0.06);
          border-color: var(--cp-glass-border);
        }

        .cp-drawer-link.active {
          color: var(--cp-accent);
          background: var(--cp-accent-dim);
          border-color: rgba(163,230,53,0.15);
        }

        .cp-drawer-cta {
          width: 100%;
          height: 42px;
          background: var(--cp-accent);
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #0a1a0a;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.25s ease;
        }

        .cp-drawer-cta:hover { background: #bef264; }

        .cp-divider {
          width: 1px;
          height: 20px;
          background: var(--cp-glass-border);
        }
      `}</style>

      <div className="cp-nav-root">
        <header className={`cp-header ${scrolled ? "scrolled" : ""}`}>
          <div className="cp-glass-bar">
            <div className="cp-inner">

              {/* Logo */}
              <NavLink to="/" className="cp-logo">
                <div className="cp-logo-icon">
                  <Coins size={18} color="#a3e635" strokeWidth={2} />
                </div>
                <span className="cp-logo-text">
                  Coin<span>Pulse</span>
                </span>
              </NavLink>

              {/* Desktop Nav Pill */}
              <nav className="cp-nav-pill">
                {navLinks.map(({ name, path, icon: Icon }) => (
                  <NavLink
                    key={name}
                    to={path}
                    className={({ isActive }) =>
                      `cp-nav-link${isActive ? " active" : ""}`
                    }
                  >
                    <Icon size={14} strokeWidth={2} />
                    {name}
                  </NavLink>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="cp-actions">
                <div className={`cp-search ${searchFocused ? "focused" : ""}`}>
                  <Search size={14} color="rgba(160,180,195,0.6)" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>

                <div className="cp-divider" />

                <button className="cp-bell" aria-label="Notifications">
                  <Bell size={16} strokeWidth={2} />
                  <span className="cp-bell-dot" />
                </button>

                <button className="cp-cta">
                  <Zap size={13} strokeWidth={2.5} />
                  Connect
                </button>
              </div>

              {/* Mobile Toggle */}
              <button
                className="cp-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          <div className={`cp-drawer ${isOpen ? "open" : ""}`}>
            <div className="cp-drawer-inner">
              <div className="cp-drawer-search">
                <Search size={15} color="rgba(160,180,195,0.6)" strokeWidth={2} />
                <input type="text" placeholder="Search coins..." />
              </div>

              <div className="cp-drawer-links">
                {navLinks.map(({ name, path, icon: Icon }) => (
                  <NavLink
                    key={name}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `cp-drawer-link${isActive ? " active" : ""}`
                    }
                  >
                    <Icon size={16} strokeWidth={2} />
                    {name}
                  </NavLink>
                ))}
              </div>

              <button className="cp-drawer-cta">
                <Zap size={15} strokeWidth={2.5} />
                Connect Wallet
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;