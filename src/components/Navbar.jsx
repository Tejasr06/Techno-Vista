import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import { Menu, X, ExternalLink, Zap, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = '$TechnoVista@2k26';

export default function Navbar() {
  const { googleFormUrl } = useFest();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      sessionStorage.setItem('techno_vista_admin_auth', 'true');
      setAdminModalOpen(false);
      setAdminPassword('');
      setAdminError('');
      setShowPassword(false);
      setMobileMenuOpen(false);
      navigate('/admin');
    } else {
      setAdminError('Incorrect password. Access denied.');
      setAdminPassword('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Registration', path: '/registration' },
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
                borderRadius: '50%',
                border: '1.5px solid #f2c438',
                boxShadow: '0 0 14px rgba(242, 196, 56, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                backgroundColor: '#000000',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                src="/assets/ise-logo.png"
                alt="ISE Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Admin Panel Trigger */}
            <button
              onClick={() => {
                setAdminModalOpen(true);
                setAdminError('');
                setAdminPassword('');
                setShowPassword(false);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 0.9rem',
                fontSize: '0.84rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                color: '#a78bfa',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Admin Panel"
              aria-label="Open Admin Panel"
            >
              <ShieldCheck size={16} />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Register Now Primary Button */}
            <a
              href={googleFormUrl}
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
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <span>Register Now (Google Form)</span>
              <ExternalLink size={16} />
            </a>

            <button
              onClick={() => {
                setAdminModalOpen(true);
                setAdminError('');
                setAdminPassword('');
                setShowPassword(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                color: '#a78bfa',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ShieldCheck size={18} />
              <span>Admin Panel</span>
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
              Sri Sairam College of Engineering • Anekal
            </div>
          </div>
        </div>
      )}

      {/* Admin Password Modal */}
      {adminModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(3, 7, 18, 0.9)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => {
            setAdminModalOpen(false);
            setAdminPassword('');
            setAdminError('');
            setShowPassword(false);
          }}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '420px',
              width: '100%',
              backgroundColor: '#0a1024',
              border: '1px solid rgba(139, 92, 246, 0.45)',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.2)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(0, 212, 255, 0.15))',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <Lock size={28} style={{ color: '#a78bfa' }} />
            </div>

            <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 700 }}>
              Admin Access
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
              Enter the admin password to continue
            </p>

            <form onSubmit={handleAdminLogin}>
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    setAdminError('');
                  }}
                  placeholder="Enter password"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '0.85rem 3rem 0.85rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: adminError
                      ? '1px solid rgba(239, 68, 68, 0.6)'
                      : '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {adminError && (
                <div
                  style={{
                    fontSize: '0.84rem',
                    color: '#f87171',
                    marginBottom: '1rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                  }}
                >
                  {adminError}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setAdminModalOpen(false);
                    setAdminPassword('');
                    setAdminError('');
                    setShowPassword(false);
                  }}
                  className="btn-secondary"
                  style={{
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    borderRadius: '10px',
                    width: '100%',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    borderRadius: '10px',
                    width: '100%',
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Enter</span>
                </button>
              </div>
            </form>
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

