import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import {
  Code2,
  FileText,
  ShieldAlert,
  Bot,
  Video,
  Gamepad2,
  Cpu,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

/**
 * EventCard Component
 * Recreates the exact clean, modern, and high-impact UI from https://ssceieee.vercel.app/:
 * - Top Row: Number Badge (amber/gold gradient with rotate on hover) & Category outline pill
 * - Minimalist Vector Icon Box with blue glow
 * - Event Title in bold font (turns gold on card hover)
 * - Subtitle & Gold italic catchphrase (e.g. Find. Fix. Optimize.)
 * - Concise description with clamp
 * - Full-width "VIEW DETAILS" button with arrow and subtle shine effect
 */
export default function EventCard({ event, index = 0 }) {
  const { googleFormUrl } = useFest();
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    name,
    subtitle,
    category,
    shortDescription,
    tagline: customTagline,
    track: customTrack,
    number: customNumber,
  } = event;

  // Track Classification: TECHNICAL or NON-TECHNICAL
  const track =
    customTrack ||
    (['frame-fusion', 'clash-of-squadz'].includes(id) ||
    category?.toLowerCase().includes('gaming') ||
    category?.toLowerCase().includes('design') ||
    category?.toLowerCase().includes('multimedia')
      ? 'NON-TECHNICAL'
      : 'TECHNICAL');

  // Formatted Number: 01, 02, 03...
  const number = customNumber || String(index + 1).padStart(2, '0');

  // Default Catchy Taglines if not explicitly defined
  const defaultTaglines = {
    'intelli-talks': 'Research. Present. Inspire.',
    'code-sprint': 'Find. Fix. Optimize.',
    'capture-the-flag': 'Penetrate. Defend. Conquer.',
    'build-a-bot': 'Design. Build. Automate.',
    'frame-fusion': 'Shoot. Edit. Create.',
    'clash-of-squadz': 'Aim. Survive. Dominate.',
  };
  const tagline =
    customTagline !== undefined
      ? customTagline
      : (defaultTaglines[id] || (track === 'TECHNICAL' ? 'Design. Develop. Deploy.' : 'Create. Compete. Conquer.'));

  // Select minimalist vector tech icon
  const renderIcon = () => {
    if (id === 'intelli-talks' || category?.toLowerCase().includes('paper')) {
      return <FileText size={28} />;
    }
    if (id === 'code-sprint' || category?.toLowerCase().includes('program') || category?.toLowerCase().includes('code')) {
      return <Code2 size={28} />;
    }
    if (id === 'capture-the-flag' || category?.toLowerCase().includes('cyber') || category?.toLowerCase().includes('flag')) {
      return <ShieldAlert size={28} />;
    }
    if (id === 'build-a-bot' || category?.toLowerCase().includes('bot') || category?.toLowerCase().includes('robot')) {
      return <Bot size={28} />;
    }
    if (id === 'frame-fusion' || category?.toLowerCase().includes('design') || category?.toLowerCase().includes('video')) {
      return <Video size={28} />;
    }
    if (id === 'clash-of-squadz' || category?.toLowerCase().includes('game') || category?.toLowerCase().includes('esports')) {
      return <Gamepad2 size={28} />;
    }
    return <Cpu size={28} />;
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1.85rem 1.65rem',
        borderRadius: '1.25rem',
        backgroundColor: isHovered ? '#172344' : '#111b38',
        border: `1px solid ${isHovered ? '#f2c438' : 'rgba(130, 155, 210, 0.18)'}`,
        boxShadow: isHovered
          ? '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(242, 196, 56, 0.2)'
          : '0 15px 35px rgba(0, 0, 0, 0.4)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(14px)',
        overflow: 'hidden',
      }}
    >
      {/* 1. TOP ROW: NUMBER BADGE & CATEGORY PILL */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f2c438 0%, #d4a827 100%)',
            color: '#070d1d',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isHovered ? '0 0 20px rgba(242, 196, 56, 0.5)' : '0 4px 12px rgba(242, 196, 56, 0.25)',
            transform: isHovered ? 'scale(1.08) rotate(4deg)' : 'scale(1) rotate(0)',
            transition: 'all 0.3s ease',
          }}
        >
          {number}
        </div>

        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(47, 111, 255, 0.12)',
            color: '#25c9ff',
            border: '1px solid rgba(130, 155, 210, 0.25)',
            textTransform: 'uppercase',
          }}
        >
          {track}
        </span>
      </div>

      {/* 2. MINIMALIST VECTOR ICON BOX */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          backgroundColor: 'rgba(47, 111, 255, 0.1)',
          border: '1px solid rgba(130, 155, 210, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          color: isHovered ? '#f2c438' : '#25c9ff',
          transition: 'color 0.3s ease',
        }}
      >
        {renderIcon()}
      </div>

      {/* 3. EVENT TITLE */}
      <h3
        style={{
          fontSize: '1.45rem',
          fontWeight: 800,
          color: isHovered ? '#f2c438' : '#f5f7fb',
          letterSpacing: '0.02em',
          marginBottom: '0.25rem',
          lineHeight: 1.2,
          transition: 'color 0.25s ease',
          fontFamily: 'var(--font-heading)',
        }}
      >
        <Link to={`/events/${id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {name}
        </Link>
      </h3>

      {/* 4. SUBTITLE */}
      {subtitle && (
        <p style={{ fontSize: '0.88rem', color: '#a7afc2', marginBottom: '0.4rem', fontWeight: 500 }}>
          {subtitle}
        </p>
      )}

      {/* 5. GOLDEN ITALIC CATCHPHRASE */}
      {tagline ? (
        <p
          style={{
            fontSize: '0.92rem',
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#f2c438',
            marginBottom: '1rem',
            letterSpacing: '0.01em',
          }}
        >
          {tagline}
        </p>
      ) : null}

      {/* 6. SHORT DESCRIPTION */}
      <p
        style={{
          fontSize: '0.88rem',
          color: '#707896',
          lineHeight: 1.6,
          marginBottom: '1.75rem',
          flexGrow: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {shortDescription}
      </p>

      {/* 7. ACTION BUTTON: "VIEW DETAILS >" */}
      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
        <Link
          to={`/events/${id}`}
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            background: isHovered
              ? 'linear-gradient(135deg, #f2c438 0%, #ffd95a 100%)'
              : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${isHovered ? '#f2c438' : 'rgba(255, 255, 255, 0.1)'}`,
            color: isHovered ? '#070d1d' : '#f2c438',
            fontSize: '0.86rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isHovered ? '0 10px 25px rgba(242, 196, 56, 0.35)' : 'none',
          }}
        >
          <span>VIEW DETAILS</span>
          <ChevronRight size={16} />
        </Link>

        {googleFormUrl && (
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(37, 201, 255, 0.1)',
              border: '1px solid rgba(37, 201, 255, 0.3)',
              color: '#25c9ff',
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#25c9ff';
              e.currentTarget.style.color = '#070d1d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(37, 201, 255, 0.1)';
              e.currentTarget.style.color = '#25c9ff';
            }}
            title="Register Now"
          >
            <span>Register</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
