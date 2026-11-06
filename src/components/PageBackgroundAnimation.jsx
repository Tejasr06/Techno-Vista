import React from 'react';

/**
 * PageBackgroundAnimation Component
 * Renders a vivid, visible, futuristic cyber ambient animation for all secondary pages
 * (Bright glowing cyan & violet aurora orbs, laser scanline beam, floating Phoenix watermark, and cyber sparks)
 * First page (Home) does NOT use this to keep its opening portal unique.
 */
export default function PageBackgroundAnimation() {
  const sparks = [
    { left: '15%', delay: '0s', duration: '7s', size: '4px', color: '#00f0ff' },
    { left: '30%', delay: '2.5s', duration: '9s', size: '3px', color: '#a78bfa' },
    { left: '55%', delay: '1.2s', duration: '8s', size: '5px', color: '#38bdf8' },
    { left: '72%', delay: '3.8s', duration: '10s', size: '3px', color: '#818cf8' },
    { left: '88%', delay: '1.8s', duration: '7.5s', size: '4px', color: '#00f0ff' },
  ];

  return (
    <div className="secondary-page-bg" aria-hidden="true">
      {/* Vivid Shifting Cyber Cyan Ambient Orb */}
      <div className="secondary-orb-cyan" />

      {/* Vivid Shifting Cyber Violet Ambient Orb */}
      <div className="secondary-orb-violet" />

      {/* Central Electric Blue Ambient Pulse */}
      <div className="secondary-orb-center" />

      {/* Soaring Phoenix Emblem Watermark (Branded, gently floating in background) */}
      <img
        src="/assets/phoenix-hero-bg.jpg"
        alt=""
        className="secondary-phoenix-watermark"
      />

      {/* Bright Glowing Laser Horizon Beam */}
      <div className="secondary-scanline-pulse" />

      {/* Rising Floating Cyber Energy Sparks */}
      {sparks.map((spark, idx) => (
        <div
          key={idx}
          className="secondary-spark"
          style={{
            left: spark.left,
            bottom: 0,
            width: spark.size,
            height: spark.size,
            backgroundColor: spark.color,
            boxShadow: `0 0 10px ${spark.color}, 0 0 20px ${spark.color}`,
            animationDelay: spark.delay,
            animationDuration: spark.duration,
          }}
        />
      ))}

      {/* Subtle Floating Tech Coordinate Reticles in Background */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '3%',
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: 'rgba(0, 240, 255, 0.45)',
          letterSpacing: '0.18em',
          pointerEvents: 'none',
          userSelect: 'none',
          textShadow: '0 0 8px rgba(0, 240, 255, 0.3)',
        }}
      >
        SYS_STATUS: ACTIVE // SECTOR_01
      </div>

      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '3%',
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: 'rgba(167, 139, 250, 0.45)',
          letterSpacing: '0.18em',
          pointerEvents: 'none',
          userSelect: 'none',
          textShadow: '0 0 8px rgba(167, 139, 250, 0.3)',
        }}
      >
        ENCRYPTION: 2048_BIT // ISE_TECHNO_VISTA
      </div>
    </div>
  );
}
