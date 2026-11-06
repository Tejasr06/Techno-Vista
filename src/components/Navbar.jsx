import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { GOOGLE_FORM_URL, FEST_DATA } from '../data/festData';
import { Menu, X, ExternalLink, Zap } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Add background blur effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Registration', path: '/registration' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transition: 'all 0.3s ease',
          backgroundColor: isScrolled
            ? 'rgba(6, 9, 19, 0.92)'
            : 'rgba(6, 9, 19, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled
            ? '1px solid rgba(56, 189, 248, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.6)' : 'none',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '74px',
          }}
        >
          {/* Logo & Brand Identity */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              textDecoration: 'none',
            }}
          >
            {/* Cyber Logo Icon */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(0, 212, 255, 0.45)',
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              <Zap size={22} fill="#ffffff" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    lineHeight: 1.1,
                  }}
                >
                  TECHNO VISTA
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: '#00d4ff',
                    background: 'rgba(0, 212, 255, 0.15)',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                  }}
                >
                  2K26
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.02em',
                  fontWeight: 500,
                }}
              >
                Dept. of ISE • Sri Sairam CE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.5rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#00d4ff' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color 0.2s ease',
                })}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '2px',
                          background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
                          borderRadius: '2px',
                          boxShadow: '0 0 8px #00d4ff',
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Register Now Primary Button */}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'none',
                padding: '0.55rem 1.3rem',
                fontSize: '0.88rem',
              }}
              id="desktop-register-btn"
              title="Open Official Google Form"
            >
              <span>Register Now</span>
              <ExternalLink size={14} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
              className="mobile-toggle-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '74px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 74px)',
            backgroundColor: 'rgba(6, 9, 19, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 99,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(56, 189, 248, 0.2)',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#38bdf8',
                marginBottom: '0.5rem',
              }}
            >
              NAVIGATION MENU
            </span>

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: isActive
                    ? 'rgba(0, 212, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isActive
                    ? '1px solid rgba(0, 212, 255, 0.4)'
                    : '1px solid transparent',
                  color: isActive ? '#00d4ff' : '#ffffff',
                  fontSize: '1rem',
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: 'none',
                })}
              >
                <span>{link.name}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>→</span>
              </NavLink>
            ))}
          </div>

          <div
            style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <span>Register Now (Google Form)</span>
              <ExternalLink size={16} />
            </a>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
              Sri Sairam College of Engineering • Anekal
            </div>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS helper for media queries */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          #desktop-register-btn {
            display: inline-flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

