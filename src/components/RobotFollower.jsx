import React, { useEffect, useState, useRef } from 'react';

/**
 * RobotFollower Component
 * A delightful mini robot companion with animated walking legs that follows the cursor.
 * Features:
 * - Animated walking/running legs and arms when the cursor moves
 * - Dynamic facing flip (turns in the direction of travel)
 * - When stopped in one place, a high-tech styled cyber badge pops up: "Just Register it Guys! 🚀"
 * - Custom Orbitron/Space Grotesk typography with vibrant electric cyan-gold holographic gradient
 * - Rosy cheeks, blinking cyber eyes, and joyful (^ ^) facial expressions when speaking
 * - Non-intrusive (pointer-events: none, auto-disabled on touch-only devices)
 */
export default function RobotFollower() {
  const [visible, setVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);

  const botRef = useRef(null);
  const visualWrapperRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const canvasRef = useRef(null);

  // Physics & Animation states stored in refs for 60 FPS performance
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const facingDirection = useRef(1); // 1 = right, -1 = left
  const walkStep = useRef(0);
  const hoverTime = useRef(0);
  const particles = useRef([]);
  const hasMoved = useRef(false);

  // Idle tracking for speech bubble
  const idleFrames = useRef(0);
  const isSpeaking = useRef(false);

  useEffect(() => {
    // Only enable if pointer is fine (mouse/trackpad, not purely mobile touch)
    const isTouchOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly) return;

    // Track mouse position
    const handleMouseMove = (e) => {
      target.current.x = e.clientX + 20;
      target.current.y = e.clientY + 18;

      // Reset speech bubble when cursor moves
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

    // Main Animation Loop (60 FPS)
    let animId;
    let particleSpawnCounter = 0;

    const animate = () => {
      hoverTime.current += 0.05;

      // Smooth Lerp movement
      const ease = 0.088;
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      velocity.current.x = dx * ease;
      velocity.current.y = dy * ease;

      const speed = Math.hypot(dx, dy);

      // Facing direction flip (smoothly face travel direction)
      if (dx > 2) {
        facingDirection.current = 1;
      } else if (dx < -2) {
        facingDirection.current = -1;
      }

      // Bank tilt based on horizontal movement
      const targetTilt = Math.max(-18, Math.min(18, dx * 0.38));
      rotation.current += (targetTilt - rotation.current) * 0.12;

      // ==========================================
      // ANIMATED WALKING LEGS & ARMS
      // ==========================================
      const isWalking = speed > 1.1;
      let walkBob = 0;

      if (isWalking) {
        // Stride frequency scales with velocity
        walkStep.current += Math.min(speed * 0.22, 0.45);
        const legAngle = Math.sin(walkStep.current) * 34; // -34deg to +34deg stride
        const armAngle = -legAngle * 0.75;
        walkBob = Math.abs(Math.sin(walkStep.current)) * 2.8;

        if (leftLegRef.current) {
          leftLegRef.current.style.transform = `rotate(${legAngle}deg)`;
        }
        if (rightLegRef.current) {
          rightLegRef.current.style.transform = `rotate(${-legAngle}deg)`;
        }
        if (leftArmRef.current) {
          leftArmRef.current.style.transform = `rotate(${armAngle}deg)`;
        }
        if (rightArmRef.current) {
          rightArmRef.current.style.transform = `rotate(${-armAngle}deg)`;
        }
      } else {
        // Return smoothly to standing posture
        if (leftLegRef.current) {
          leftLegRef.current.style.transform = 'rotate(0deg)';
        }
        if (rightLegRef.current) {
          rightLegRef.current.style.transform = 'rotate(0deg)';
        }
        if (leftArmRef.current) {
          leftArmRef.current.style.transform = 'rotate(0deg)';
        }
        if (rightArmRef.current) {
          rightArmRef.current.style.transform = 'rotate(0deg)';
        }
      }

      // Resting idle bobbing
      const idleBob = !isWalking ? Math.sin(hoverTime.current * 1.8) * 2.2 : 0;
      const verticalOffset = -walkBob + idleBob;

      // Update bot DOM container
      if (botRef.current) {
        botRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + verticalOffset}px, 0)`;
      }

      // Update robot visual facing & bank angle
      if (visualWrapperRef.current) {
        visualWrapperRef.current.style.transform = `scaleX(${facingDirection.current}) rotate(${rotation.current}deg)`;
      }

      // Idle stop detection: show "Just Register it Guys!" when stopped in one place
      if (hasMoved.current) {
        if (speed < 1.3) {
          idleFrames.current++;
          // After ~0.35s of standing in one place
          if (idleFrames.current >= 20 && !isSpeaking.current) {
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

      // Stardust particle emission under feet while walking
      if (isWalking && ctx && canvas) {
        particleSpawnCounter++;
        if (particleSpawnCounter % 2 === 0) {
          particles.current.push({
            x: pos.current.x + 22 + (Math.random() - 0.5) * 8,
            y: pos.current.y + 48 + verticalOffset,
            vx: (Math.random() - 0.5) * 0.7 - facingDirection.current * 0.5,
            vy: Math.random() * -0.8 - 0.2,
            radius: Math.random() * 2 + 1.2,
            color: Math.random() > 0.4 ? '#00f0ff' : '#f2c438',
            alpha: 0.85,
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
          p.alpha -= 0.035;

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
      {/* Background canvas for footsteps stardust particles */}
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

      {/* The Walking Cute Mini Robot Container */}
      <div
        ref={botRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '44px',
          height: '56px',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transformOrigin: '50% 50%',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden="true"
      >
        {/* =========================================================================
            SPEECH BUBBLE: "Just Register it Guys!"
            Features: Orbitron/Chakra Petch gaming font, electric cyan-gold gradient,
            glowing cyber glassmorphism border and spring entrance animation
            ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: showSpeech
              ? 'translate(-50%, -14px) scale(1)'
              : 'translate(-50%, 4px) scale(0)',
            transformOrigin: 'bottom center',
            transition: 'all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
            opacity: showSpeech ? 1 : 0,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(6, 12, 28, 0.98), rgba(15, 23, 42, 0.96))',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid #00f0ff',
              borderRadius: '14px',
              padding: '7px 14px',
              boxShadow:
                '0 10px 30px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 240, 255, 0.55), 0 0 10px rgba(242, 196, 56, 0.35), inset 0 0 12px rgba(0, 240, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {/* Pulsing neon notification ping dot */}
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#f2c438',
                boxShadow: '0 0 10px #f2c438',
                flexShrink: 0,
              }}
            />

            {/* Custom Styled High-Tech Font & Gradient */}
            <span
              style={{
                fontFamily: "'Orbitron', 'Chakra Petch', 'Space Grotesk', sans-serif",
                fontSize: '11.5px',
                fontWeight: 900,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #00f0ff 0%, #ffffff 45%, #ffd95a 80%, #f2c438 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.7)) drop-shadow(0 0 14px rgba(242, 196, 56, 0.5))',
              }}
            >
              Just Register it Guys!
            </span>

            <span style={{ fontSize: '13px', filter: 'drop-shadow(0 0 6px #ffd95a)' }}>
              ⚡
            </span>
          </div>

          {/* Speech bubble pointer arrow */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '7px solid #00f0ff',
              filter: 'drop-shadow(0 2px 4px rgba(0, 240, 255, 0.6))',
            }}
          />
        </div>

        {/* =========================================================================
            ROBOT VISUAL WRAPPER (Handles scaleX direction flip & bank tilt)
            ========================================================================= */}
        <div
          ref={visualWrapperRef}
          style={{
            width: '100%',
            height: '100%',
            transformOrigin: '50% 60%',
            willChange: 'transform',
            filter:
              isHoveringClickable || showSpeech
                ? 'drop-shadow(0 0 14px rgba(242, 196, 56, 0.8))'
                : 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.65))',
          }}
        >
          <svg
            width="44"
            height="56"
            viewBox="0 0 44 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Robot Body Ceramic Gradient */}
              <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Robot Limb Metallic Gradient */}
              <linearGradient id="robotLimbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
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
              y1="2"
              x2="22"
              y2="9"
              stroke="#0284c7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="22"
              cy="2.5"
              r="3.5"
              fill="url(#antennaGlow)"
              stroke="#f2c438"
              strokeWidth="0.8"
              className="robot-antenna-tip"
            />

            {/* 2. Side Floating Ear Fins */}
            <path
              d="M5 18 L1 15 L1 23 Z"
              fill="#0284c7"
              stroke="#38bdf8"
              strokeWidth="0.8"
            />
            <path
              d="M39 18 L43 15 L43 23 Z"
              fill="#0284c7"
              stroke="#38bdf8"
              strokeWidth="0.8"
            />

            {/* 3. Left Leg (Walks with stride) */}
            <g
              ref={leftLegRef}
              style={{
                transformOrigin: '15px 35px',
                transition: 'transform 0.05s linear',
              }}
            >
              {/* Leg rod */}
              <rect
                x="13.2"
                y="35"
                width="3.6"
                height="12"
                rx="1.8"
                fill="url(#robotLimbGrad)"
                stroke="#38bdf8"
                strokeWidth="0.7"
              />
              {/* Robotic shoe/foot */}
              <ellipse
                cx="14.5"
                cy="48"
                rx="4.8"
                ry="2.6"
                fill="#0284c7"
                stroke="#38bdf8"
                strokeWidth="0.8"
              />
              {/* Glowing cyan sole pad */}
              <line
                x1="11"
                y1="49.6"
                x2="18.5"
                y2="49.6"
                stroke="#00f0ff"
                strokeWidth="1.2"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
              />
            </g>

            {/* 4. Right Leg (Walks in opposite phase) */}
            <g
              ref={rightLegRef}
              style={{
                transformOrigin: '29px 35px',
                transition: 'transform 0.05s linear',
              }}
            >
              {/* Leg rod */}
              <rect
                x="27.2"
                y="35"
                width="3.6"
                height="12"
                rx="1.8"
                fill="url(#robotLimbGrad)"
                stroke="#38bdf8"
                strokeWidth="0.7"
              />
              {/* Robotic shoe/foot */}
              <ellipse
                cx="29.5"
                cy="48"
                rx="4.8"
                ry="2.6"
                fill="#0284c7"
                stroke="#38bdf8"
                strokeWidth="0.8"
              />
              {/* Glowing cyan sole pad */}
              <line
                x1="26"
                y1="49.6"
                x2="33.5"
                y2="49.6"
                stroke="#00f0ff"
                strokeWidth="1.2"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
              />
            </g>

            {/* 5. Left Arm / Hand (Swings opposite to left leg) */}
            <g
              ref={leftArmRef}
              style={{
                transformOrigin: '5px 23px',
                transition: 'transform 0.05s linear',
              }}
            >
              <ellipse
                cx="4"
                cy="26"
                rx="2.4"
                ry="5"
                fill="#e2e8f0"
                stroke="#38bdf8"
                strokeWidth="0.8"
              />
            </g>

            {/* 6. Right Arm / Hand (Swings opposite to right leg) */}
            <g
              ref={rightArmRef}
              style={{
                transformOrigin: '39px 23px',
                transition: 'transform 0.05s linear',
              }}
            >
              <ellipse
                cx="40"
                cy="26"
                rx="2.4"
                ry="5"
                fill="#e2e8f0"
                stroke="#38bdf8"
                strokeWidth="0.8"
              />
            </g>

            {/* 7. Main Rounded Robot Body Capsule */}
            <rect
              x="6"
              y="8"
              width="32"
              height="28"
              rx="13"
              fill="url(#robotBodyGrad)"
              stroke={isHoveringClickable || showSpeech ? '#f2c438' : '#38bdf8'}
              strokeWidth="1.6"
            />

            {/* Forehead Gloss Highlight */}
            <path
              d="M13 12 Q22 9 31 12"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            {/* 8. Dark Glassy Digital Visor Face */}
            <rect
              x="10"
              y="14"
              width="24"
              height="14"
              rx="6.5"
              fill="#060b18"
              stroke="rgba(56, 189, 248, 0.5)"
              strokeWidth="0.8"
            />

            {/* 9. Eyes: Happy Arcs (^ ^) when hovering or speaking, normal blinks otherwise */}
            {isBlinking && !showSpeech ? (
              // Blinking Flat Lines
              <>
                <line
                  x1="14"
                  y1="21"
                  x2="18"
                  y2="21"
                  stroke="#00f0ff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="26"
                  y1="21"
                  x2="30"
                  y2="21"
                  stroke="#00f0ff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </>
            ) : isHoveringClickable || showSpeech ? (
              // Excited Happy Arcs (^ ^) with golden shine
              <>
                <path
                  d="M14 22 Q16 18 18 22"
                  stroke="#f2c438"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M26 22 Q28 18 30 22"
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
                  cy="20.5"
                  rx="2"
                  ry="2.8"
                  fill="#00f0ff"
                  style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
                />
                <circle cx="15.4" cy="19.5" r="0.75" fill="#ffffff" />

                <ellipse
                  cx="28"
                  cy="20.5"
                  rx="2"
                  ry="2.8"
                  fill="#00f0ff"
                  style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
                />
                <circle cx="27.4" cy="19.5" r="0.75" fill="#ffffff" />
              </>
            )}

            {/* 10. Rosy Pink Cheeks */}
            <circle cx="11.5" cy="24" r="1.5" fill="rgba(244, 114, 182, 0.6)" />
            <circle cx="32.5" cy="24" r="1.5" fill="rgba(244, 114, 182, 0.6)" />
          </svg>
        </div>
      </div>
    </>
  );
}
