import React, { useEffect, useState, useRef } from 'react';

/**
 * RobotFollower Component
 * A delightful, futuristic mini robot companion that smoothly follows the cursor.
 * Features:
 * - Smooth lerp (linear interpolation) physics follow with realistic tilt/banking
 * - Interactive expressions: blinks naturally, smiles (^ ^) when hovering clickable elements or speaking
 * - When stopped in one place, cute neon speech bubble pops up: "Just Register it Guys! 🚀"
 * - Emits tiny luminous stardust/thruster particles while flying
 * - Floating hover oscillation when stationary
 * - Completely non-intrusive (pointer-events: none, auto-disabled on mobile touchscreens)
 */
export default function RobotFollower() {
  const [visible, setVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);

  const botRef = useRef(null);
  const canvasRef = useRef(null);

  // Physics states stored in refs to avoid React re-renders on every animation frame (60fps)
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const hoverTime = useRef(0);
  const particles = useRef([]);
  const hasMoved = useRef(false);

  // Idle tracking for speech bubble
  const idleFrames = useRef(0);
  const isSpeaking = useRef(false);

  useEffect(() => {
    // Only enable if pointer is fine (mouse/trackpad, not purely mobile touch)
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly) return;

    // Track mouse position
    const handleMouseMove = (e) => {
      target.current.x = e.clientX + 22; // Slight offset so it floats near cursor without covering click target
      target.current.y = e.clientY + 18;

      // Reset speech bubble when moving
      idleFrames.current = 0;
      if (isSpeaking.current) {
        isSpeaking.current = false;
        setShowSpeech(false);
      }

      if (!hasMoved.current) {
        hasMoved.current = true;
        pos.current.x = target.current.x;
        pos.current.y = target.current.y;
        setVisible(true);
      } else {
        setVisible(true);
      }

      // Check if mouse is hovering an interactive clickable element
      const targetElem = e.target;
      if (
        targetElem &&
        (targetElem.closest('a') ||
          targetElem.closest('button') ||
          targetElem.closest('input') ||
          targetElem.closest('textarea') ||
          targetElem.closest('select') ||
          targetElem.closest('[role="button"]') ||
          targetElem.closest('.btn-primary') ||
          targetElem.closest('.btn-secondary') ||
          window.getComputedStyle(targetElem).cursor === 'pointer')
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
      setShowSpeech(false);
      isSpeaking.current = false;
    };

    const handleMouseEnter = () => {
      if (hasMoved.current) {
        setVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Natural eye blinking loop (blinks every 3.5 - 5 seconds)
    let blinkTimeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        blinkTimeout = setTimeout(triggerBlink, 3200 + Math.random() * 2500);
      }, 160);
    };
    blinkTimeout = setTimeout(triggerBlink, 2500);

    // Canvas setup for particle trails
    const canvas = canvasRef.current;
    let ctx = null;
    if (canvas) {
      ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    }

    // Animation Loop (60 FPS)
    let animId;
    let particleSpawnCounter = 0;

    const animate = () => {
      hoverTime.current += 0.05;

      // Smooth Lerp movement
      const ease = 0.085;
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      velocity.current.x = dx * ease;
      velocity.current.y = dy * ease;

      // Bank tilt based on horizontal movement
      const targetTilt = Math.max(-22, Math.min(22, dx * 0.45));
      rotation.current += (targetTilt - rotation.current) * 0.12;

      // Speed of robot
      const speed = Math.hypot(dx, dy);

      // Idle stop detection: when robot stops in one place, show "Just Register it Guys!"
      if (hasMoved.current) {
        if (speed < 1.3) {
          idleFrames.current++;
          // After ~0.4s of being stationary (24 frames at 60fps)
          if (idleFrames.current >= 24 && !isSpeaking.current) {
            isSpeaking.current = true;
            setShowSpeech(true);
          }
        } else {
          idleFrames.current = 0;
          if (isSpeaking.current) {
            isSpeaking.current = false;
            setShowSpeech(false);
          }
        }
      }

      // Gentle vertical hover bobbing when resting
      const bobbing = speed < 2 ? Math.sin(hoverTime.current * 1.8) * 3.5 : 0;

      // Update bot DOM style directly for maximum performance
      if (botRef.current) {
        botRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + bobbing}px, 0) rotate(${rotation.current}deg)`;
      }

      // Stardust particle emissions when moving
      if (speed > 1.2 && ctx && canvas) {
        particleSpawnCounter++;
        if (particleSpawnCounter % 2 === 0) {
          particles.current.push({
            x: pos.current.x + 22 + (Math.random() - 0.5) * 6,
            y: pos.current.y + 44 + bobbing,
            vx: (Math.random() - 0.5) * 0.8,
            vy: Math.random() * 1.2 + 0.8,
            radius: Math.random() * 2 + 1.2,
            color: Math.random() > 0.4 ? '#00f0ff' : '#f2c438',
            alpha: 0.8,
          });
        }
      }

      // Draw and fade particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.028;

          if (p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(blinkTimeout);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Background canvas for cute glowing stardust/thruster particles */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      />

      {/* The Cute Mini Floating Robot */}
      <div
        ref={botRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '44px',
          height: '52px',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transformOrigin: '50% 50%',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: isHoveringClickable || showSpeech
            ? 'drop-shadow(0 0 12px rgba(242, 196, 56, 0.75))'
            : 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.65))',
        }}
        aria-hidden="true"
      >
        {/* Cute Speech Bubble Pop-up when stopped in one place */}
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: showSpeech
              ? 'translate(-50%, -12px) scale(1)'
              : 'translate(-50%, 0px) scale(0)',
            transformOrigin: 'bottom center',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            opacity: showSpeech ? 1 : 0,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(8, 15, 35, 0.96), rgba(15, 23, 42, 0.96))',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1.5px solid #00f0ff',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 240, 255, 0.4), 0 0 8px rgba(242, 196, 56, 0.3)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 800,
              fontFamily: 'var(--font-heading, inherit)',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                color: '#f2c438',
                textShadow: '0 0 8px rgba(242, 196, 56, 0.6)',
              }}
            >
              Just Register it Guys!
            </span>
            <span style={{ fontSize: '12px' }}>🚀</span>
          </div>

          {/* Speech bubble pointer tail */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '6px solid #00f0ff',
            }}
          />
        </div>

        {/* Robot SVG Graphics */}
        <svg
          width="44"
          height="52"
          viewBox="0 0 44 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Robot Body Ceramic Gradient */}
            <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Jet Propulsion Flame Gradient */}
            <linearGradient id="robotFlameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Glowing Antenna Orb */}
            <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd95a" />
              <stop offset="70%" stopColor="#f2c438" />
              <stop offset="100%" stopColor="rgba(242, 196, 56, 0)" />
            </radialGradient>
          </defs>

          {/* 1. Antenna stem & glowing pulsing orb */}
          <line
            x1="22"
            y1="3"
            x2="22"
            y2="11"
            stroke="#0284c7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="22"
            cy="3"
            r="3.5"
            fill="url(#antennaGlow)"
            stroke="#f2c438"
            strokeWidth="0.8"
            className="robot-antenna-tip"
          />

          {/* 2. Side Floating Ear Fins */}
          <path
            d="M5 21 L1 18 L1 26 Z"
            fill="#0284c7"
            stroke="#38bdf8"
            strokeWidth="0.8"
          />
          <path
            d="M39 21 L43 18 L43 26 Z"
            fill="#0284c7"
            stroke="#38bdf8"
            strokeWidth="0.8"
          />

          {/* 3. Floating Left Hand / Wing */}
          <ellipse
            cx="4"
            cy="29"
            rx="2.2"
            ry="4.5"
            fill="#e2e8f0"
            stroke="#38bdf8"
            strokeWidth="0.8"
            transform="rotate(10 4 29)"
          />

          {/* 4. Floating Right Hand / Wing */}
          <ellipse
            cx="40"
            cy="29"
            rx="2.2"
            ry="4.5"
            fill="#e2e8f0"
            stroke="#38bdf8"
            strokeWidth="0.8"
            transform="rotate(-10 40 29)"
          />

          {/* 5. Main Rounded Robot Body Capsule */}
          <rect
            x="6"
            y="10"
            width="32"
            height="30"
            rx="14"
            fill="url(#robotBodyGrad)"
            stroke={isHoveringClickable || showSpeech ? '#f2c438' : '#38bdf8'}
            strokeWidth="1.6"
          />

          {/* Forehead Gloss Highlight */}
          <path
            d="M13 14 Q22 11 31 14"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* 6. Dark Glassy Digital Visor Face */}
          <rect
            x="10"
            y="17"
            width="24"
            height="14"
            rx="7"
            fill="#060b18"
            stroke="rgba(56, 189, 248, 0.5)"
            strokeWidth="0.8"
          />

          {/* 7. Eyes: Happy Arcs (^ ^) when hovering or speaking, normal blinks otherwise */}
          {isBlinking && !showSpeech ? (
            // Blinking Flat Lines
            <>
              <line x1="14" y1="24" x2="18" y2="24" stroke="#00f0ff" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="26" y1="24" x2="30" y2="24" stroke="#00f0ff" strokeWidth="1.8" strokeLinecap="round" />
            </>
          ) : isHoveringClickable || showSpeech ? (
            // Excited Happy Arcs (^ ^) with golden shine
            <>
              <path
                d="M14 25 Q16 21 18 25"
                stroke="#f2c438"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M26 25 Q28 21 30 25"
                stroke="#f2c438"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            // Normal Cute Glowing Cyan Oval Eyes
            <>
              <ellipse
                cx="16"
                cy="23.5"
                rx="2"
                ry="3"
                fill="#00f0ff"
                style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
              />
              <circle cx="15.4" cy="22.5" r="0.8" fill="#ffffff" />

              <ellipse
                cx="28"
                cy="23.5"
                rx="2"
                ry="3"
                fill="#00f0ff"
                style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
              />
              <circle cx="27.4" cy="22.5" r="0.8" fill="#ffffff" />
            </>
          )}

          {/* 8. Rosy Pink Cheeks */}
          <circle cx="11.5" cy="27" r="1.5" fill="rgba(244, 114, 182, 0.6)" />
          <circle cx="32.5" cy="27" r="1.5" fill="rgba(244, 114, 182, 0.6)" />

          {/* 9. Cute Jet Thruster Flame underneath */}
          <path
            d="M18 40 Q22 49 26 40 Z"
            fill="url(#robotFlameGrad)"
            className="robot-thruster-flame"
          />
        </svg>
      </div>
    </>
  );
}
