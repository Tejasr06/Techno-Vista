import React from 'react';

/**
 * PageBackgroundAnimation Component
 * Faithful implementation of the kinetic cyber animations from Sai Intelliverse 2K26
 * Features:
 *  - Rotating Celestial Cyber Astrolabe (35s spinSlow) with concentric dashed orbital rings
 *  - Reverse-rotating inner geometric polygons (45s spinSlowReverse)
 *  - Top-Right nested rotating orbital rings
 *  - Corner radar scanner with rotating 360-deg sweep hand (radarSweep)
 *  - Floating cyber nebula glow blobs (animate-float-slow)
 *  - Halftone dot matrix pattern and comic grain overlay
 *  - Clean, non-intrusive z-index so content remains perfectly readable and interactive
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
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* 2. Floating Cyber Nebula Glow Blobs (animate-float-slow) */}
      <div
        className="animate-float-slow"
        style={{
          position: 'absolute',
          top: '15%',
          left: '12%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.22) 0%, rgba(0, 212, 255, 0.08) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div
        className="animate-float-slow"
        style={{
          position: 'absolute',
          top: '35%',
          right: '8%',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.07) 50%, transparent 70%)',
          filter: 'blur(65px)',
          animationDelay: '-4s',
        }}
      />

      {/* 3. GIANT ROTATING CELESTIAL CYBER ASTROLABE (Center-Right Background) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-10%',
          transform: 'translateY(-50%)',
          width: 'min(780px, 90vw)',
          height: 'min(780px, 90vw)',
          opacity: 0.32,
          pointerEvents: 'none',
        }}
      >
        {/* Outer Rotating Orbits (Clockwise 35s) */}
        <svg
          viewBox="0 0 800 800"
          className="animate-spin-slow"
          style={{ width: '100%', height: '100%', display: 'block' }}
          fill="none"
        >
          {/* Concentric Dashed Planetary Rings */}
          <circle cx="400" cy="400" r="380" stroke="#00f0ff" strokeWidth="1.2" strokeDasharray="4 8" opacity="0.6" />
          <circle cx="400" cy="400" r="300" stroke="#f4fdff" strokeWidth="0.8" opacity="0.25" />
          <circle cx="400" cy="400" r="220" stroke="#38bdf8" strokeWidth="1" strokeDasharray="12 12" opacity="0.45" />
          <circle cx="400" cy="400" r="140" stroke="#8b5cf6" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.4" />
          
          {/* Axis Crosshairs */}
          <line x1="400" y1="20" x2="400" y2="780" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.3" />
          <line x1="20" y1="400" x2="780" y2="400" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.3" />
          
          {/* Cardinal Coordinate Beacons */}
          <circle cx="400" cy="20" r="5" fill="#00f0ff" opacity="0.8" />
          <circle cx="780" cy="400" r="5" fill="#00f0ff" opacity="0.8" />
          <circle cx="400" cy="780" r="4" fill="#8b5cf6" opacity="0.7" />
          <circle cx="20" cy="400" r="4" fill="#8b5cf6" opacity="0.7" />
        </svg>

        {/* Inner Reverse-Rotating Geometric Polygon (Counter-Clockwise 45s) */}
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
            style={{ width: '50%', height: '50%', display: 'block' }}
            fill="none"
          >
            <polygon
              points="200,20 380,320 20,320"
              stroke="#00f0ff"
              strokeWidth="1"
              opacity="0.45"
              strokeDasharray="8 8"
            />
            <polygon
              points="200,380 20,80 380,80"
              stroke="#f4fdff"
              strokeWidth="0.8"
              opacity="0.3"
              strokeDasharray="4 6"
            />
            <circle cx="200" cy="200" r="12" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* 4. TOP-RIGHT CONCENTRIC ROTATING CYBER RINGS */}
      <div
        className="animate-spin-slow"
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 240, 255, 0.22)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="animate-spin-slow-reverse"
        style={{
          position: 'absolute',
          top: '-70px',
          right: '-70px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '1px dashed rgba(139, 92, 246, 0.28)',
          pointerEvents: 'none',
        }}
      />

      {/* 5. TOP-LEFT ROTATING RADAR SCANNER WITH SWEEPING BEAM */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: '25px',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          opacity: 0.6,
          overflow: 'hidden',
          display: 'none',
        }}
        className="secondary-radar-container"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px dashed rgba(56, 189, 248, 0.25)',
          }}
        />
        {/* Sweeping Radar Hand (animate-radar 6s) */}
        <div
          className="animate-radar"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'conic-gradient(from 0deg, rgba(0, 240, 255, 0.35) 0deg, transparent 60deg)',
          }}
        />
      </div>

      {/* 6. BOTTOM-RIGHT RETRO CYBER HALFTONE PATTERN */}
      <div
        className="comic-halftone-pattern"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '240px',
          height: '240px',
          opacity: 0.18,
          pointerEvents: 'none',
          borderRadius: '16px',
          maskImage: 'radial-gradient(circle at 70% 70%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 70% 70%, black 30%, transparent 75%)',
        }}
      />

      {/* 7. Soaring Phoenix Emblem Watermark (Branded Fest Identity) */}
      <img
        src="/assets/phoenix-hero-bg.jpg"
        alt=""
        className="secondary-phoenix-watermark"
        style={{ opacity: 0.14 }}
      />

      {/* 8. Top Glowing Laser Horizon Beam Sweep */}
      <div className="secondary-scanline-pulse" />

      {/* Inline styles for responsive radar display */}
      <style>{`
        @media (min-width: 768px) {
          .secondary-radar-container {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
