import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = `404 - Page Not Found | TECHNO VISTA 2K26`;
  }, []);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <div className="glass-card" style={{ maxWidth: '580px', padding: '3.5rem 2rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '5.5rem',
            fontWeight: 800,
            lineHeight: 1,
            color: '#00d4ff',
            display: 'block',
            marginBottom: '1rem',
            textShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
          }}
        >
          404
        </span>

        <h1 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.85rem' }}>
          Signal Lost in Cyberspace
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The frequency or page you are attempting to access does not exist on the TECHNO VISTA 2K26 network grid.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary">
            <Home size={16} />
            <span>Return to Fest HQ</span>
          </Link>
          <Link to="/events" className="btn-secondary">
            <ArrowLeft size={16} />
            <span>Browse Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
