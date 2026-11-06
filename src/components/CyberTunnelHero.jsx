import React from 'react';
import { Link } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import CyberPhoenix from './CyberPhoenix';
import Countdown from './Countdown';
import {
  Cpu,
  Calendar,
  MapPin,
  ExternalLink,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

export default function CyberTunnelHero({ onExploreClick }) {
  const { festData, googleFormUrl } = useFest();

  const handleExplore = (e) => {
    if (onExploreClick) {
      e.preventDefault();
      onExploreClick(e);
    } else {
      const el = document.getElementById('events-arena');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="cyber-hero-stage">
      {/* =========================================================================
          SIMPLE, GORGEOUS AMBIENT COLOR ANIMATION
          (Fluid shifting aurora mesh in Electric Cyan, Royal Sapphire & Cyber Violet)
          ========================================================================= */}
      <div className="ambient-aurora-canvas">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb-2" />
        <div className="aurora-orb-3" />
        <div className="aurora-orb-4" />
      </div>

      {/* =========================================================================
          CENTER HERO CONTENT: ANIMATED PHOENIX & CLEAN CYBER FEST STAGE
          ========================================================================= */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1050px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Glowing Microchip Icon Badge */}
        <div className="cyber-chip-badge" title="Information Science & Engineering">
          <Cpu size={24} />
        </div>

        {/* College Name in Sci-Fi Uppercase */}
        <h2 className="cyber-college-text">
          {festData.college}, {festData.location}
        </h2>

        {/* Department Name */}
        <div className="cyber-dept-text">
          DEPARTMENT OF INFORMATION SCIENCE AND ENGINEERING
        </div>

        {/* PRESENTS Divider with Tech Lines */}
        <div className="cyber-presents-divider">
          <div className="cyber-presents-line" />
          <span className="cyber-presents-text">PRESENTS</span>
          <div className="cyber-presents-line" />
        </div>

        {/* =====================================================================
            ANIMATED CYBER PHOENIX MASCOT (ORIGINAL EMBLEM - ZERO YELLOW)
            ===================================================================== */}
        <CyberPhoenix />

        {/* Refined, Razor-Sharp Futuristic Cyber Title in Electric Cyan & Ice White */}
        <div style={{ marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 7.5vw, 5.4rem)',
              lineHeight: 1.05,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.35em',
            }}
          >
            <span className="cyber-title-perfect">TECHNO</span>
            <span className="cyber-title-accent">VISTA</span>
          </h1>

          <div style={{ marginTop: '0.2rem' }}>
            <span
              className="cyber-year-badge"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                lineHeight: 1,
              }}
            >
              2K26
            </span>
          </div>
        </div>

        {/* Tagline / Subtitle with Sci-Fi Spacing */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.45rem',
            marginBottom: '1.75rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cyber)',
              fontSize: 'clamp(0.88rem, 1.8vw, 1.25rem)',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#00f0ff',
              textShadow: '0 0 14px rgba(0, 240, 255, 0.5)',
            }}
          >
            JOIN THE CYBER BATTLE
          </div>

          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.85rem, 1.4vw, 1.02rem)',
              color: '#cbd5e1',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {festData.tagline} • NATIONAL-LEVEL TECHNICAL FEST
          </div>
        </div>

        {/* Center Cyber Shield Emblem (SSCE / ISE Crest) */}
        <div
          style={{
            marginBottom: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.45rem 1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'rgba(6, 16, 38, 0.75)',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.2)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cyber)',
              fontWeight: 800,
              fontSize: '0.88rem',
              letterSpacing: '0.22em',
              background: 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            [ ISE // SSCE ]
          </div>
        </div>

        {/* Glowing Cyber Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Main Glowing Electric Cyber Pill Button */}
          <button
            onClick={handleExplore}
            className="btn-cyber-primary"
            style={{ cursor: 'pointer' }}
            title="Click to reveal all events & fest schedule"
          >
            <span>EXPLORE EVENTS</span>
            <ArrowRight size={18} />
          </button>

          {/* Secondary Register Now Button */}
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber-cyan"
            title="Open Official Google Form"
          >
            <span>REGISTER NOW</span>
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Fest Date & Venue Badge Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
            fontSize: '0.88rem',
            color: '#cbd5e1',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(0, 240, 255, 0.05)',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.1)',
            }}
          >
            <Calendar size={15} style={{ color: '#00f0ff' }} />
            <span>{festData.dateText} ({festData.timeText})</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(0, 240, 255, 0.05)',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.1)',
            }}
          >
            <MapPin size={15} style={{ color: '#38bdf8' }} />
            <span>{festData.venue}</span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div style={{ width: '100%', maxWidth: '780px', marginBottom: '2.5rem' }}>
          <Countdown />
        </div>

        {/* Scroll / Explore Downward Cue */}
        <a
          href="#events-arena"
          onClick={handleExplore}
          className="scroll-indicator-pill"
          title="Scroll or click to explore events"
        >
          <span>ENTER ARENA & EXPLORE</span>
          <ChevronDown size={14} />
        </a>
      </div>
    </div>
  );
}

