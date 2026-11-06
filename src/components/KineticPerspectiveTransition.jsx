import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Cpu, Zap, ArrowRight, RotateCw } from 'lucide-react';

/**
 * KineticPerspectiveTransition Component
 * Recreates the iconic 3D perspective kinetic typography from Sai Intelliverse:
 * - Geometric perspective guide lines crossing in 3D
 * - Interactive beacon tracking orb following mouse/touch coordinates
 * - Fragmented brutalist typography scattering and tilting along perspective axes
 * - Morphing transition between "TECHNO VISTA 2.0" and "DEPARTMENT OF INFORMATION SCIENCE AND ENGINEERING"
 */
export default function KineticPerspectiveTransition() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentMode, setCurrentMode] = useState('techno'); // 'techno' | 'department'

  // Letters for Mode 1: TECHNO VISTA 2.0
  const technoLetters = ['T', 'E', 'C', 'H', 'N', 'O', ' ', 'V', 'I', 'S', 'T', 'A', ' ', '2', '.', '0'];

  // Handle Mouse movement across the perspective stage
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setMousePos({ x, y });
  };

  // Auto-cycle modes every 7 seconds if not manually hovered
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMode((prev) => (prev === 'techno' ? 'department' : 'techno'));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Compute beacon coordinates along perspective lines
  const beaconX = isHovered ? mousePos.x * 100 : 50 + Math.sin(Date.now() / 1200) * 25;
  const beaconY = isHovered ? mousePos.y * 100 : 50 + Math.cos(Date.now() / 1500) * 18;

  // Normalized displacement from center (-1 to 1)
  const normX = (mousePos.x - 0.5) * 2;
  const normY = (mousePos.y - 0.5) * 2;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '460px',
        backgroundColor: '#050811',
        borderRadius: '24px',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 212, 255, 0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '4rem 0',
        padding: '3rem 1.5rem',
        cursor: 'crosshair',
        userSelect: 'none',
      }}
    >
      {/* 1. Fine Comic Grain & Mesh Background Texture */}
      <div
        className="comic-grain-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      />

      {/* 2. Top Status HUD Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.74rem',
          fontFamily: 'monospace',
          color: 'rgba(56, 189, 248, 0.65)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
          <span>PERSPECTIVE_VECTOR // {currentMode === 'techno' ? 'TECHNO_VISTA_2.0' : 'DEPT_ISE_ORIGIN'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="hidden sm:inline">COORDS: [{(mousePos.x * 100).toFixed(0)}°, {(mousePos.y * 100).toFixed(0)}°]</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentMode((prev) => (prev === 'techno' ? 'department' : 'techno'));
            }}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: '#00f0ff',
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <RotateCw size={12} />
            <span>SWITCH STAGE</span>
          </button>
        </div>
      </div>

      {/* 3. SVG 3D PERSPECTIVE CROSSING GUIDE LINES (Exact match to screenshot) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Converging Primary Diagonal (Cyan) */}
        <line
          x1="5%"
          y1="18%"
          x2="95%"
          y2="82%"
          stroke="#00f0ff"
          strokeWidth="1.2"
          strokeDasharray="6 12"
          opacity="0.45"
        />

        {/* Crossing Inverted Diagonal (White) */}
        <line
          x1="5%"
          y1="82%"
          x2="95%"
          y2="18%"
          stroke="#f4fdff"
          strokeWidth="0.9"
          strokeDasharray="8 16"
          opacity="0.3"
        />

        {/* Central Horizontal Guide (Sapphire / Violet) */}
        <line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="#8b5cf6"
          strokeWidth="1.2"
          strokeDasharray="10 20"
          opacity="0.35"
        />

        {/* Secondary Upper Perspective Ray */}
        <line
          x1="10%"
          y1="34%"
          x2="90%"
          y2="66%"
          stroke="#38bdf8"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          opacity="0.2"
        />

        {/* Secondary Lower Perspective Ray */}
        <line
          x1="10%"
          y1="66%"
          x2="90%"
          y2="34%"
          stroke="#38bdf8"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          opacity="0.2"
        />

        {/* INTERACTIVE TRACKING BEACON (The glowing cursor particle with outer ring from screenshot) */}
        <g style={{ transition: isHovered ? 'none' : 'all 0.4s ease-out' }}>
          {/* Outer Target Ring */}
          <circle
            cx={`${beaconX}%`}
            cy={`${beaconY}%`}
            r="16"
            stroke="#00f0ff"
            strokeWidth="1"
            fill="none"
            opacity="0.75"
          />
          {/* Inner Glowing Beacon */}
          <circle
            cx={`${beaconX}%`}
            cy={`${beaconY}%`}
            r="4.5"
            fill="#ffffff"
            style={{
              filter: 'drop-shadow(0 0 8px #00f0ff)',
            }}
          />
        </g>
      </svg>

      {/* 4. LASER LIGHT BEAM SWEEP */}
      <motion.div
        animate={{
          x: ['-120%', '120%'],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 1.5,
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '120%',
          height: '110px',
          transform: 'translateY(-50%) skewX(-25deg)',
          background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.15) 50%, transparent)',
          pointerEvents: 'none',
          zIndex: 6,
        }}
      />

      {/* 5. TYPOGRAPHY CONTENT ARENA */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          {currentMode === 'techno' ? (
            /* =========================================================================
               MODE 1: BRUTALIST KINETIC PERSPECTIVE "TECHNO VISTA 2.0"
               (Scattered 3D letters along perspective rays matching screenshot)
               ========================================================================= */
            <motion.div
              key="techno-vista"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.08em',
                maxWidth: '1100px',
                margin: '0 auto',
                perspective: '1200px',
              }}
            >
              {technoLetters.map((char, index) => {
                const total = technoLetters.length;
                const offset = index - total / 2;
                
                // 3D Perspective Displacements
                const tiltX = (normY * 18) + (index % 2 === 0 ? -12 : 12);
                const tiltY = -(normX * 22) + offset * 3;
                const tiltZ = offset * 2.8 + (normX * 8);
                const shiftY = (index % 2 === 0 ? -1 : 1) * (14 + Math.abs(offset) * 2.5) + (normY * 20);

                if (char === ' ') {
                  return <span key={index} style={{ width: 'clamp(0.8rem, 2vw, 1.8rem)' }} />;
                }

                return (
                  <motion.span
                    key={index}
                    animate={{
                      rotateX: tiltX,
                      rotateY: tiltY,
                      rotateZ: tiltZ,
                      y: shiftY,
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-cyber), "Syne", "Space Grotesk", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(2.4rem, 6.5vw, 6.2rem)',
                      lineHeight: 0.9,
                      color: index >= 13 ? '#00f0ff' : '#f4fdff',
                      textShadow: index >= 13
                        ? '0 0 25px rgba(0, 240, 255, 0.7), -3px -1px #00f0ff, 3px 2px #040915'
                        : '-2px -1px #38bdf8, 2px 1px #040915, 0 0 20px rgba(56, 189, 248, 0.3)',
                      transformStyle: 'preserve-3d',
                      letterSpacing: '-0.03em',
                      cursor: 'pointer',
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}

              <div
                style={{
                  width: '100%',
                  marginTop: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: '#00f0ff',
                    textTransform: 'uppercase',
                  }}
                >
                  [ 3D PERSPECTIVE TYPOGRAPHY // MOVE CURSOR TO INTERACT ]
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Click "Switch Stage" or wait for automatic morph into Academic Origin
                </div>
              </div>
            </motion.div>
          ) : (
            /* =========================================================================
               MODE 2: REVEALED CYBER NODE // "DEPARTMENT OF INFORMATION SCIENCE AND ENGINEERING"
               ========================================================================= */
            <motion.div
              key="department-ise"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                padding: '2.5rem 2rem',
                backgroundColor: 'rgba(10, 16, 36, 0.9)',
                borderRadius: '20px',
                border: '1px solid #00f0ff',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Node Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#00f0ff',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  background: 'rgba(0, 240, 255, 0.12)',
                  padding: '0.35rem 1rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 240, 255, 0.35)',
                }}
              >
                <Cpu size={14} />
                <span>// TRANSITION_CH01 // ACADEMIC GENESIS</span>
              </div>

              {/* Department Title in Heavy Futuristic Display Font */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.4rem, 3.5vw, 2.7rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  textShadow: '0 0 25px rgba(255, 255, 255, 0.3)',
                }}
              >
                DEPARTMENT OF INFORMATION SCIENCE AND ENGINEERING
              </h3>

              {/* College & University Affiliation */}
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'clamp(0.82rem, 1.5vw, 1.05rem)',
                  color: '#38bdf8',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                }}
              >
                SRI SAIRAM COLLEGE OF ENGINEERING • ANEKAL, BENGALURU
              </p>

              {/* Tagline / Division Metrics */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.25rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  color: '#94a3b8',
                }}
              >
                <div>AFFILIATED TO: <span style={{ color: '#ffffff' }}>VTU BELAGAVI</span></div>
                <div>•</div>
                <div>APPROVED BY: <span style={{ color: '#ffffff' }}>AICTE NEW DELHI</span></div>
                <div>•</div>
                <div>NAAC ACCREDITED: <span style={{ color: '#00f0ff' }}>GRADE A+</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Bottom Navigation Line */}
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          left: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          fontFamily: 'monospace',
          color: 'rgba(148, 163, 184, 0.65)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        <span>SCROLL_VECTOR // ACTIVE</span>
        <span style={{ color: '#00f0ff' }}>CHAPTER_01 ➔ CHAPTER_02 // SYSTEM ONLINE</span>
      </div>
    </div>
  );
}
