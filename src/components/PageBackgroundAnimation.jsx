import React from 'react';

/**
 * PageBackgroundAnimation Component
 * High-visibility cyberpunk ambient animation system for all secondary pages.
 * Features:
 *  - High-contrast luminous Celestial Cyber Astrolabe (35s spinSlow) with concentric dashed orbital rings
 *  - Reverse-rotating inner sacred geometric polygon lattice (45s spinSlowReverse)
 *  - Top-Right concentric rotating orbital rings with orbiting satellite beacons
 *  - Top-Left tactical cyber radar scanner with 360° rotating radar sweep and blinking pings
 *  - Gliding horizontal cyber laser data beams streaming across the dark background
 *  - Floating upward quantum embers (staggered drifting cyber sparkles)
 *  - 3 vibrant floating cosmic nebula glow clouds (Electric Cyan, Cyber Violet, Canary Gold)
 *  - Soaring Phoenix festival watermark backdrop with gentle levitation
 *  - All elements set to pointerEvents: 'none' and zIndex: 0 so foreground content is 100% interactive
 */
export default function PageBackgroundAnimation() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '74px',
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 74px)',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* 1. Fine Comic Grain Background Texture */}
      <div
        className="comic-grain-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

      {/* 2. Vibrant Floating Cyber Nebula Glow Orbs */}
      {/* Cyan Nebula (Top-Left) */}
      <div
        className="animate-float-slow"
        style={{
          position: 'absolute',
          top: '10%',
          left: '8%',
          width: '540px',
          height: '540px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.28) 0%, rgba(0, 212, 255, 0.12) 45%, transparent 70%)',
          filter: 'blur(75px)',
        }}
      />

      {/* Purple / Violet Nebula (Center-Right) */}
      <div
        className="animate-float-slow"
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.26) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '-4s',
        }}
      />

      {/* Golden Cyber Amber Flare (Bottom-Left) */}
      <div
        className="animate-float-slow"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '25%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242, 196, 56, 0.15) 0%, rgba(242, 196, 56, 0.05) 45%, transparent 70%)',
          filter: 'blur(70px)',
          animationDelay: '-2s',
        }}
      />

      {/* 3. GLIDING HORIZONTAL CYBER LASER DATA BEAMS */}
      <div
        className="animate-laser-right"
        style={{
          position: 'absolute',
          top: '24%',
          left: 0,
          width: '320px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00f0ff 40%, #ffffff 70%, transparent)',
          boxShadow: '0 0 14px #00f0ff, 0 0 25px rgba(0, 240, 255, 0.8)',
          filter: 'blur(0.5px)',
        }}
      />

      <div
        className="animate-laser-left"
        style={{
          position: 'absolute',
          top: '68%',
          right: 0,
          width: '380px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #a855f7 35%, #00f0ff 70%, transparent)',
          boxShadow: '0 0 16px #a855f7, 0 0 28px rgba(168, 85, 247, 0.7)',
          animationDelay: '-4s',
          filter: 'blur(0.5px)',
        }}
      />

      {/* 4. FLOATING QUANTUM EMBERS (Upward floating cyber particles) */}
      {[
        { left: '15%', delay: '0s', dur: '9s', size: '3px', color: '#00f0ff' },
        { left: '28%', delay: '-2s', dur: '11s', size: '2.5px', color: '#38bdf8' },
        { left: '42%', delay: '-5s', dur: '8.5s', size: '3.5px', color: '#f2c438' },
        { left: '60%', delay: '-1s', dur: '10s', size: '2px', color: '#a855f7' },
        { left: '74%', delay: '-6s', dur: '12s', size: '3px', color: '#00f0ff' },
        { left: '88%', delay: '-3.5s', dur: '9.5s', size: '2.5px', color: '#8b5cf6' },
      ].map((p, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
            animation: `quantumDrift ${p.dur} linear infinite`,
            animationDelay: p.delay,
            opacity: 0.8,
          }}
        />
      ))}

      {/* 5. GIANT HIGH-VISIBILITY ROTATING CYBER ASTROLABE (Center-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-8%',
          transform: 'translateY(-50%)',
          width: 'min(820px, 92vw)',
          height: 'min(820px, 92vw)',
          opacity: 0.72,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.35))',
        }}
      >
        {/* Outer Rotating Astrolabe Clockwise (35s) */}
        <svg
          viewBox="0 0 800 800"
          className="animate-spin-slow"
          style={{ width: '100%', height: '100%', display: 'block' }}
          fill="none"
        >
          {/* Concentric Dashed Planetary Rings with Neon Glow */}
          <circle cx="400" cy="400" r="385" stroke="#00f0ff" strokeWidth="1.6" strokeDasharray="6 10" opacity="0.85" />
          <circle cx="400" cy="400" r="350" stroke="#38bdf8" strokeWidth="0.9" opacity="0.4" />
          <circle cx="400" cy="400" r="290" stroke="#f4fdff" strokeWidth="1.2" strokeDasharray="18 10" opacity="0.65" />
          <circle cx="400" cy="400" r="210" stroke="#8b5cf6" strokeWidth="1.4" strokeDasharray="8 8" opacity="0.75" />
          <circle cx="400" cy="400" r="140" stroke="#00f0ff" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.65" />
          
          {/* 12 Degree Graduation Ticks around perimeter */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = 400 + 372 * Math.cos(angle);
            const y1 = 400 + 372 * Math.sin(angle);
            const x2 = 400 + 384 * Math.cos(angle);
            const y2 = 400 + 384 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 2 === 0 ? '#00f0ff' : '#8b5cf6'}
                strokeWidth={i % 4 === 0 ? '2.5' : '1.2'}
                opacity={i % 4 === 0 ? '0.9' : '0.55'}
              />
            );
          })}

          {/* Coordinate Crosshair Axes */}
          <line x1="400" y1="12" x2="400" y2="788" stroke="#00f0ff" strokeWidth="1" strokeDasharray="8 8" opacity="0.55" />
          <line x1="12" y1="400" x2="788" y2="400" stroke="#00f0ff" strokeWidth="1" strokeDasharray="8 8" opacity="0.55" />
          
          {/* Cardinal Coordinate Beacons with Glow Halos */}
          <circle cx="400" cy="15" r="6" fill="#00f0ff" />
          <circle cx="400" cy="15" r="12" stroke="#00f0ff" strokeWidth="1.2" opacity="0.6" />
          
          <circle cx="785" cy="400" r="6" fill="#00f0ff" />
          <circle cx="785" cy="400" r="12" stroke="#00f0ff" strokeWidth="1.2" opacity="0.6" />

          <circle cx="400" cy="785" r="5" fill="#a855f7" />
          <circle cx="400" cy="785" r="10" stroke="#a855f7" strokeWidth="1.2" opacity="0.6" />

          <circle cx="15" cy="400" r="5" fill="#a855f7" />
          <circle cx="15" cy="400" r="10" stroke="#a855f7" strokeWidth="1.2" opacity="0.6" />
        </svg>

        {/* Inner Reverse-Rotating Geometric Polygon Core (Counter-Clockwise 45s) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            viewBox="0 0 400 400"
            className="animate-spin-slow-reverse"
            style={{ width: '56%', height: '56%', display: 'block', filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.45))' }}
            fill="none"
          >
            <polygon
              points="200,18 382,324 18,324"
              stroke="#00f0ff"
              strokeWidth="1.5"
              opacity="0.75"
              strokeDasharray="8 8"
            />
            <polygon
              points="200,382 18,76 382,76"
              stroke="#c084fc"
              strokeWidth="1.4"
              opacity="0.75"
              strokeDasharray="6 6"
            />
            <circle cx="200" cy="200" r="16" stroke="#f2c438" strokeWidth="1.5" opacity="0.8" />
            <circle cx="200" cy="200" r="4" fill="#00f0ff" />
          </svg>
        </div>
      </div>

      {/* 6. TOP-RIGHT CONCENTRIC ROTATING CYBER RINGS */}
      <div
        className="animate-spin-slow"
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 240, 255, 0.4)',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#00f0ff',
            boxShadow: '0 0 12px #00f0ff',
          }}
        />
      </div>

      <div
        className="animate-spin-slow-reverse"
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '290px',
          height: '290px',
          borderRadius: '50%',
          border: '1.5px dashed rgba(168, 85, 247, 0.45)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '25px',
            right: '40px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#c084fc',
            boxShadow: '0 0 10px #c084fc',
          }}
        />
      </div>

      {/* 7. TOP-LEFT TACTICAL RADAR SCANNER HUD */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 240, 255, 0.55)',
          boxShadow: '0 0 18px rgba(0, 240, 255, 0.25)',
          overflow: 'hidden',
          backgroundColor: 'rgba(3, 7, 18, 0.65)',
        }}
        className="secondary-radar-container"
      >
        {/* Inner concentric range circles */}
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '50%',
            border: '1px dashed rgba(56, 189, 248, 0.45)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(56, 189, 248, 0.35)',
          }}
        />
        {/* Crosshairs */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: 'rgba(0, 240, 255, 0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'rgba(0, 240, 255, 0.4)',
          }}
        />
        {/* Blinking Target Ping */}
        <div
          className="animate-target-ping"
          style={{
            position: 'absolute',
            top: '32%',
            left: '68%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#00f0ff',
            boxShadow: '0 0 8px #00f0ff',
          }}
        />
        {/* Sweeping Radar Hand (animate-radar 6s) */}
        <div
          className="animate-radar"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'conic-gradient(from 0deg, rgba(0, 240, 255, 0.5) 0deg, transparent 65deg)',
          }}
        />
      </div>

      {/* 8. BOTTOM-RIGHT RETRO CYBER HALFTONE PATTERN */}
      <div
        className="comic-halftone-pattern"
        style={{
          position: 'absolute',
          bottom: '25px',
          right: '25px',
          width: '260px',
          height: '260px',
          opacity: 0.28,
          pointerEvents: 'none',
          borderRadius: '16px',
          maskImage: 'radial-gradient(circle at 70% 70%, black 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 70% 70%, black 35%, transparent 75%)',
        }}
      />

      {/* 9. Soaring Phoenix Emblem Watermark (Branded Fest Identity) */}
      <img
        src="/assets/phoenix-hero-bg.jpg"
        alt=""
        className="secondary-phoenix-watermark"
        style={{
          opacity: 0.22,
          filter: 'drop-shadow(0 0 35px rgba(0, 212, 255, 0.25))',
        }}
      />

      {/* 10. Top Glowing Laser Horizon Beam Sweep */}
      <div className="secondary-scanline-pulse" />

      {/* 11. Subtle HUD Telemetry Coordinates (Bottom Left) */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '25px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'rgba(0, 240, 255, 0.45)',
          letterSpacing: '0.12em',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
        className="secondary-telemetry-tag"
      >
        <span>SYS // TECHNO_VISTA_2K26</span>
        <span>LAT: 12.68° N | LON: 77.69° E</span>
      </div>

      {/* Inline styles for responsive radar & telemetry display */}
      <style>{`
        @media (min-width: 640px) {
          .secondary-radar-container {
            display: block !important;
          }
          .secondary-telemetry-tag {
            display: flex !important;
          }
        }
        @media (max-width: 639px) {
          .secondary-radar-container {
            display: none !important;
          }
          .secondary-telemetry-tag {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
