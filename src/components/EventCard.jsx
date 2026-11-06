import React from 'react';
import { Link } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import { ArrowRight, ExternalLink, Users, MapPin } from 'lucide-react';

export default function EventCard({ event }) {
  const { googleFormUrl } = useFest();
  const {
    id,
    name,
    subtitle,
    category,
    badge,
    image,
    shortDescription,
    teamSize,
    venue,
  } = event;

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        position: 'relative',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Event Banner Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 Aspect Ratio
          overflow: 'hidden',
          backgroundColor: '#0a0f24',
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />

        {/* Badge Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '0.9rem',
            left: '0.9rem',
            zIndex: 2,
          }}
        >
          <span className="badge badge-cyan">{badge || 'Official Event'}</span>
        </div>

        {/* Gradient Overlay at Bottom of Image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to top, var(--bg-card), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        {/* Category Tag */}
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#38bdf8',
            marginBottom: '0.4rem',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {category}
        </span>

        {/* Event Title */}
        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            marginBottom: '0.35rem',
            color: '#ffffff',
          }}
        >
          <Link
            to={`/events/${id}`}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            {name}
          </Link>
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: '0.85rem',
              color: '#94a3b8',
              marginBottom: '0.9rem',
              fontWeight: 500,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.92rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: '1.25rem',
            flexGrow: 1,
          }}
        >
          {shortDescription}
        </p>

        {/* Quick Metadata Snippets */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={14} className="text-cyan-400" />
            <span>Team: {teamSize}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={14} className="text-cyan-400" />
            <span>Venue: {venue}</span>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
          }}
        >
          <Link
            to={`/events/${id}`}
            className="btn-secondary"
            style={{
              padding: '0.65rem 0.8rem',
              fontSize: '0.85rem',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              padding: '0.65rem 0.8rem',
              fontSize: '0.85rem',
              borderRadius: '10px',
              textAlign: 'center',
            }}
            title="Register via Official Google Form"
          >
            <span>Register Now</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

