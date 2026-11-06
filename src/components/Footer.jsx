import React from 'react';
import { Link } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import {
  Zap,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  Instagram,
  Linkedin,
  Globe,
  Mail,
  Heart,
} from 'lucide-react';

export default function Footer() {
  const { festData, googleFormUrl, eventsData, contactData } = useFest();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#040711',
        borderTop: '1px solid rgba(56, 189, 248, 0.15)',
        position: 'relative',
        marginTop: '6rem',
        overflow: 'hidden',
      }}
    >
      {/* Top subtle glow bar */}
      <div
        style={{
          height: '2px',
          width: '100%',
          background: 'linear-gradient(90deg, transparent, #00d4ff 30%, #8b5cf6 70%, transparent)',
        }}
      />

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Column 1: Fest Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1.5px solid #f2c438',
                  boxShadow: '0 0 12px rgba(242, 196, 56, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/assets/ise-logo.png"
                  alt="ISE Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                TECHNO VISTA <span style={{ color: '#00d4ff' }}>2K26</span>
              </span>
            </div>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}
            >
              {festData.tagline}. A premier National-Level Technical Fest organized by the Department of Information Science and Engineering, Sri Sairam College of Engineering.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
                <Calendar size={15} className="text-cyan-400" />
                <span>{festData.dateText} ({festData.timeText})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
                <MapPin size={15} className="text-cyan-400" />
                <span>{festData.venue}, {festData.college}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              <a
                href={contactData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ec4899';
                  e.currentTarget.style.borderColor = '#ec4899';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Instagram size={18} />
              </a>

              <a
                href={contactData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00d4ff';
                  e.currentTarget.style.borderColor = '#00d4ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Linkedin size={18} />
              </a>

              <a
                href={contactData.socialLinks.collegeWebsite}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="College Website"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#34d399';
                  e.currentTarget.style.borderColor = '#34d399';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'About Fest & College', path: '/about' },
                { name: 'Registration Process', path: '/registration' },
                { name: 'Live Announcements', path: '/announcements' },
                { name: 'Contact & Location', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    → {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: The 6 Events */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Official Events
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {eventsData.map((event) => (
                <li key={event.id}>
                  <Link
                    to={`/events/${event.id}`}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <span>{event.name}</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {event.badge}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Registration CTA */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Register for 2K26
            </h4>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: '1.2rem',
              }}
            >
              Slots are limited per event track. Register through the centralized Google Form to guarantee your team's entry.
            </p>

            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', padding: '0.75rem 1rem' }}
            >
              <span>Register Now</span>
              <ExternalLink size={16} />
            </a>

            <div
              style={{
                marginTop: '1.2rem',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '0.8rem',
                color: '#94a3b8',
              }}
            >
              <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.2rem' }}>
                Event Date:
              </div>
              <div>Thursday, 26 November 2026</div>
              <div style={{ color: '#00d4ff', marginTop: '0.2rem' }}>
                Reporting: 8:45 AM - 9:15 AM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & VTU Disclaimer */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.84rem',
            color: '#64748b',
          }}
        >
          <div>
            © {currentYear} TECHNO VISTA 2K26. Department of Information Science and Engineering,{' '}
            <span style={{ color: '#94a3b8' }}>Sri Sairam College of Engineering</span>. All rights reserved.
          </div>
          <div>
            Designed with futuristic aesthetics for National-Level Engineering Excellence.
          </div>
        </div>
      </div>
    </footer>
  );
}

