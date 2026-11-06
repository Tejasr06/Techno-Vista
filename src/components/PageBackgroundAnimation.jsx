import React from 'react';

/**
 * PageBackgroundAnimation Component
 * Renders a subtle, futuristic ambient animation for all secondary pages
 * (Floating cyan and violet energy orbs, glowing scanline sweep, and cyber accents)
 * First page (Home) does NOT use this to keep its opening portal unique.
 */
export default function PageBackgroundAnimation() {
  return (
    <div className="secondary-page-bg" aria-hidden="true">
      {/* Shifting Cyber Cyan Ambient Orb */}
      <div className="secondary-orb-cyan" />

      {/* Shifting Cyber Violet Ambient Orb */}
      <div className="secondary-orb-violet" />

      {/* Central Cyber Energy Core */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Glowing Horizon Sweep Beam */}
      <div className="secondary-scanline-pulse" />

      {/* Subtle Floating Tech Coordinate Reticles in Background */}
      <div
        style={{
          position: 'absolute',
          top: '35px',
          left: '4%',
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          color: 'rgba(56, 189, 248, 0.25)',
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        SYS_STATUS: ACTIVE // SECTOR_01
      </div>

      <div
        style={{
          position: 'absolute',
          top: '35px',
          right: '4%',
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          color: 'rgba(139, 92, 246, 0.25)',
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        ENCRYPTION: 2048_BIT // ISE_TECHNO_VISTA
      </div>
    </div>
  );
}
