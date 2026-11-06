import React from 'react';
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
 * Recreates the exact brutalist cyber card layout from the uploaded reference:
 * - Numbered badge (01, 02, 03...) in amber rounded square
 * - Minimalist tech icon (<>, globe, antenna, bot, etc.)
 * - Outline category pill: TECHNICAL / NON-TECHNICAL
 * - Bold uppercase title
 * - Subtitle & Gold italic catchphrase (Find. Fix. Optimize.)
 * - Card summary description
 * - Embedded Event Coordinators with phone & role
 * - Dark "VIEW DETAILS >" button + "REGISTER NOW" action
 */
export default function EventCard({ event, index = 0 }) {
  const { googleFormUrl } = useFest();

  const {
    id,
    name,
    subtitle,
    category,
    badge,
    shortDescription,
    teamSize,
    venue,
    coordinators,
    tagline: customTagline,
    track: customTrack,
    number: customNumber,
  } = event;

  // Determine Track: TECHNICAL or NON-TECHNICAL
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
    'code-sprint': 'Code. Debug. Optimize.',
    'capture-the-flag': 'Penetrate. Defend. Conquer.',
    'build-a-bot': 'Design. Build. Automate.',
    'frame-fusion': 'Shoot. Edit. Create.',
    'clash-of-squadz': 'Aim. Survive. Dominate.',
  };
  const tagline = customTagline || defaultTaglines[id] || (track === 'TECHNICAL' ? 'Design. Develop. Deploy.' : 'Create. Compete. Conquer.');

  // Select minimalist vector tech icon
  const renderIcon = () => {
    if (id === 'intelli-talks' || category?.toLowerCase().includes('paper')) {
      return <FileText size={28} color="#ffffff" />;
    }
    if (id === 'code-sprint' || category?.toLowerCase().includes('program') || category?.toLowerCase().includes('code')) {
      return <Code2 size={28} color="#ffffff" />;
    }
    if (id === 'capture-the-flag' || category?.toLowerCase().includes('cyber') || category?.toLowerCase().includes('flag')) {
      return <ShieldAlert size={28} color="#ffffff" />;
    }
    if (id === 'build-a-bot' || category?.toLowerCase().includes('bot') || category?.toLowerCase().includes('robot')) {
      return <Bot size={28} color="#ffffff" />;
    }
    if (id === 'frame-fusion' || category?.toLowerCase().includes('design') || category?.toLowerCase().includes('video')) {
      return <Video size={28} color="#ffffff" />;
    }
    if (id === 'clash-of-squadz' || category?.toLowerCase().includes('game') || category?.toLowerCase().includes('esports')) {
      return <Gamepad2 size={28} color="#ffffff" />;
    }
    return <Cpu size={28} color="#ffffff" />;
  };

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2.2rem 2rem',
        borderRadius: '22px',
        backgroundColor: '#0c1322',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.65)',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 212, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.65)';
      }}
    >
      {/* 1. NUMBERED BADGE (Top-Left Amber Pill from screenshot) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '11px',
            backgroundColor: '#f59e0b',
            color: '#070b19',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.15rem',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
          }}
        >
          {number}
        </div>

        {badge && (
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#38bdf8',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* 2. MINIMALIST TECH ICON (<>, globe, antenna, bot...) */}
      <div style={{ marginBottom: '1.1rem', color: '#ffffff' }}>
        {renderIcon()}
      </div>

      {/* 3. TRACK OUTLINE PILL (TECHNICAL / NON-TECHNICAL) */}
      <div style={{ marginBottom: '0.85rem' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '0.22rem 0.7rem',
            borderRadius: '9999px',
            border: track === 'TECHNICAL'
              ? '1px solid rgba(56, 189, 248, 0.4)'
              : '1px solid rgba(168, 85, 247, 0.4)',
            color: track === 'TECHNICAL' ? '#38bdf8' : '#c084fc',
            backgroundColor: track === 'TECHNICAL' ? 'rgba(56, 189, 248, 0.08)' : 'rgba(168, 85, 247, 0.08)',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {track}
        </span>
      </div>

      {/* 4. EVENT NAME (Heavy Uppercase Display Font) */}
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.55rem',
          fontWeight: 900,
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          marginBottom: '0.25rem',
          lineHeight: 1.15,
        }}
      >
        <Link
          to={`/events/${id}`}
          style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
        >
          {name}
        </Link>
      </h3>

      {/* 5. SUBTITLE */}
      {subtitle && (
        <p
          style={{
            fontSize: '0.9rem',
            color: '#94a3b8',
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* 6. GOLDEN ITALIC CATCHPHRASE (Find. Fix. Optimize.) */}
      <p
        style={{
          fontSize: '0.92rem',
          fontStyle: 'italic',
          fontWeight: 700,
          color: '#fbbf24',
          marginBottom: '1rem',
          letterSpacing: '0.01em',
        }}
      >
        {tagline}
      </p>

      {/* 7. SHORT DESCRIPTION */}
      <p
        style={{
          fontSize: '0.88rem',
          color: '#cbd5e1',
          lineHeight: 1.6,
          marginBottom: '1.75rem',
          flexGrow: 1,
        }}
      >
        {shortDescription}
      </p>

      {/* 8. ACTION BUTTONS (VIEW DETAILS > matching reference design + Register) */}
      <div
        style={{
          marginTop: 'auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '0.75rem',
        }}
      >
        <Link
          to={`/events/${id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.8rem 1rem',
            borderRadius: '10px',
            backgroundColor: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#fbbf24',
            fontSize: '0.86rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1f2937';
            e.currentTarget.style.borderColor = '#fbbf24';
            e.currentTarget.style.color = '#fef08a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#111827';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
            e.currentTarget.style.color = '#fbbf24';
          }}
        >
          <span>VIEW DETAILS</span>
          <ChevronRight size={15} />
        </Link>

        <a
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            padding: '0.8rem 0.8rem',
            fontSize: '0.86rem',
            borderRadius: '10px',
            textAlign: 'center',
            justifyContent: 'center',
          }}
          title="Register via Official Google Form"
        >
          <span>Register</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
