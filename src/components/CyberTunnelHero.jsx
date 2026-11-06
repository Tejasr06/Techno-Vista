import React from 'react';
import { Link } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import Countdown from './Countdown';
import {
  Cpu,
  Calendar,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Terminal,
  Activity,
  Radio,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function CyberTunnelHero() {
  const { festData, googleFormUrl } = useFest();

  return (
    <div className="cyber-hero-stage">
      {/* 3D Perspective Virtual Corridor (Ceiling & Floor Laser Rails + Animated Grid) */}
      <div className="cyber-tunnel-wrapper">
        {/* Converging Corner Light Rails */}
        <div className="cyber-rail-top-left" />
        <div className="cyber-rail-top-right" />
        <div className="cyber-rail-bottom-left" />
        <div className="cyber-rail-bottom-right" />

        {/* Central Vanishing Point Glow Horizon */}
        <div className="cyber-horizon-glow" />

        {/* 3D Floor Grid receding into the distance */}
        <div className="cyber-perspective-floor" />
      </div>

      {/* =========================================================================
          LEFT HOLOGRAPHIC HUD WALL (ANGLED IN 3D PERSPECTIVE)
          ========================================================================= */}
      <div className="cyber-hud-wall cyber-hud-wall-left">
        {/* Screen 1: Radar Scanning Telemetry */}
        <div className="cyber-hud-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '0.4rem',
              color: '#00f0ff',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Radio size={12} className="animate-pulse" />
              ARENA RADAR
            </span>
            <span style={{ color: '#ff9e00' }}>12.79° N, 77.70° E</span>
          </div>

          {/* SVG Radar Visual */}
          <div style={{ position: 'relative', width: '100%', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ width: '70px', height: '70px' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0, 240, 255, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" />
              {/* Rotating Sweep Beam */}
              <line x1="50" y1="50" x2="85" y2="20" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite" />
              </line>
              {/* Target Dot */}
              <circle cx="68" cy="38" r="2.5" fill="#ff7700">
                <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
            <div style={{ marginLeft: '0.75rem', fontSize: '0.66rem', color: '#94a3b8', lineHeight: 1.35 }}>
              <div>SECTOR: ISE_DEPT</div>
              <div>LOC: ANEKAL_BLR</div>
              <div style={{ color: '#00f0ff', fontWeight: 600 }}>STATUS: ARMED</div>
            </div>
          </div>
        </div>

        {/* Screen 2: System Telemetry & Kernel */}
        <div className="cyber-hud-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '0.4rem',
              color: '#00f0ff',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Terminal size={12} />
              CYBER CORE
            </span>
            <span style={{ color: '#10b981' }}>ONLINE</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              lineHeight: 1.45,
              color: '#67e8f9',
              background: 'rgba(0,0,0,0.3)',
              padding: '0.4rem 0.5rem',
              borderRadius: '4px',
            }}
          >
            <div>&gt; INIT: TECHNO_VISTA_2K26</div>
            <div>&gt; PROTOCOL: SECURE_EVENT_NET</div>
            <div>&gt; HOST: SRI_SAIRAM_ENGG</div>
            <div style={{ color: '#ff9e00' }}>&gt; ACCESS_PORT: 26.11.2026</div>
          </div>
        </div>

        {/* Screen 3: Waveform & Spectrum */}
        <div className="cyber-hud-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '0.3rem',
              color: '#00f0ff',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Activity size={12} />
              QUANTUM TELEMETRY
            </span>
            <span style={{ color: '#38bdf8' }}>98.4 GHz</span>
          </div>
          {/* Animated Spectrum Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '24px', padding: '2px 0' }}>
            {[45, 80, 60, 95, 30, 75, 90, 50, 70, 85, 40, 100, 65, 85, 55].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: 'linear-gradient(to top, #00d4ff, #ff9e00)',
                  borderRadius: '1px',
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT HOLOGRAPHIC HUD WALL (ANGLED IN 3D PERSPECTIVE)
          ========================================================================= */}
      <div className="cyber-hud-wall cyber-hud-wall-right">
        {/* Screen 1: Arena Events Matrix */}
        <div className="cyber-hud-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '0.4rem',
              color: '#00f0ff',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Layers size={12} />
              EVENT MATRICES
            </span>
            <span style={{ color: '#ff9e00' }}>6 ARENAS</span>
          </div>
          <div style={{ fontSize: '0.66rem', color: '#cbd5e1', lineHeight: 1.45 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>• INTELLI TALKS</span> <span style={{ color: '#00f0ff' }}>ACTIVE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>• CODE SPRINT</span> <span style={{ color: '#00f0ff' }}>ACTIVE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>• CAPTURE THE FLAG</span> <span style={{ color: '#ff9e00' }}>HOT</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>• BUILD A BOT</span> <span style={{ color: '#00f0ff' }}>ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Screen 2: Defense Security Shield */}
        <div className="cyber-hud-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '0.4rem',
              color: '#00f0ff',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldAlert size={12} />
              SECURITY LEVEL
            </span>
            <span style={{ color: '#10b981' }}>MAXIMUM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '2px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#ff9e00',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)',
              }}
            >
              2K26
            </div>
            <div style={{ fontSize: '0.66rem', color: '#94a3b8' }}>
              <div>FIREWALL: ENFORCED</div>
              <div>LEVEL: NATIONAL FEST</div>
              <div style={{ color: '#00f0ff' }}>REGISTRATIONS: OPEN</div>
            </div>
          </div>
        </div>

        {/* Screen 3: System Frequency & Live Load */}
        <div className="cyber-hud-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '0.3rem',
              color: '#00f0ff',
            }}
          >
            <span>ENERGY GRID</span>
            <span style={{ color: '#10b981' }}>99.9% SYNC</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(0, 240, 255, 0.1)',
              borderRadius: '9999px',
              overflow: 'hidden',
              border: '1px solid rgba(0, 240, 255, 0.3)',
            }}
          >
            <div
              style={{
                width: '88%',
                height: '100%',
                background: 'linear-gradient(90deg, #00f0ff, #ff7700)',
                boxShadow: '0 0 8px #ff7700',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#64748b', marginTop: '0.25rem' }}>
            <span>PWR: NOMINAL</span>
            <span>FREQ: 144Hz</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CENTER HERO CONTENT (EXACT RECREATION OF USER'S REFERENCE DESIGN)
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

        {/* Refined, Razor-Sharp Futuristic Cyber Title in Electric Cyan & Ice White */}
        <div style={{ marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 5.8rem)',
              lineHeight: 1.05,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.4em',
            }}
          >
            <span className="cyber-title-perfect">TECHNO</span>
            <span className="cyber-title-accent">VISTA</span>
          </h1>

          <div style={{ marginTop: '0.2rem' }}>
            <span
              className="cyber-year-badge"
              style={{
                fontSize: 'clamp(2.2rem, 6.5vw, 4.4rem)',
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
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cyber)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.25rem)',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#38bdf8',
              textShadow: '0 0 14px rgba(56, 189, 248, 0.5)',
            }}
          >
            JOIN THE CYBER BATTLE
          </div>

          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.85rem, 1.4vw, 1.02rem)',
              color: '#94a3b8',
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
            marginBottom: '2.25rem',
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
          <Link to="/events" className="btn-cyber-primary">
            <span>EXPLORE EVENTS</span>
            <ArrowRight size={18} />
          </Link>

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
            <MapPin size={15} style={{ color: '#ff9e00' }} />
            <span>{festData.venue}</span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div style={{ width: '100%', maxWidth: '780px' }}>
          <Countdown />
        </div>
      </div>
    </div>
  );
}

