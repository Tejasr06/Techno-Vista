import React, { useEffect, useState, useRef } from 'react';
import { useFest } from '../context/FestContext';
import FestChatBot from './FestChatBot';

/**
 * RobotFollower Component
 * An adorable 3D-styled white humanoid robot companion.
 * 
 * DESKTOP (Mouse / Fine Pointer):
 * - Follows the cursor at a calm, slow walking pace with running leg & arm strides.
 * - Waves hand cheerfully "Hi! 👋" when stopped, and displays speech bubble: "Just Register for it Guys! ⚡".
 * - Subtle stardust particles underneath its feet while walking.
 * - Clicking the mascot opens the interactive Fest Chatbot!
 * 
 * MOBILE (Touchscreen / Responsive):
 * - Floats gracefully in the bottom-right corner as an interactive companion.
 * - Continuously bobs up and down and waves its hand cheerfully.
 * - Displays speech bubble prompting users to chat or register.
 * - Tapping the robot or speech bubble opens the interactive TECHNO VISTA Chatbot with selectable questions and conversation flow!
 * - Includes a discreet minimize (×) button and a cute restore button.
 */
export default function RobotFollower() {
  const { googleFormUrl } = useFest();

  const [visible, setVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);

  // Mobile Floating Companion & Chatbot States
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [mobileSpeechOpen, setMobileSpeechOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const botRef = useRef(null);
  const visualWrapperRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const canvasRef = useRef(null);

  // Physics & Animation states
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const facingDirection = useRef(1); // 1 = right, -1 = left
  const walkStep = useRef(0);
  const hoverTime = useRef(0);
  const particles = useRef([]);
  const hasMoved = useRef(false);

  // Smooth limb angle interpolation refs
  const currentRightArmAngle = useRef(0);
  const currentLeftArmAngle = useRef(0);
  const currentLeftLegAngle = useRef(0);
  const currentRightLegAngle = useRef(0);

  // Idle tracking for speech bubble
  const idleFrames = useRef(0);
  const isSpeaking = useRef(false);

  useEffect(() => {
    // Detect mobile / touch environment
    const checkIsMobile = () => {
      const touchCoarse =
        window.matchMedia('(pointer: coarse)').matches &&
        !window.matchMedia('(pointer: fine)').matches;
      const narrow = window.innerWidth <= 768;
      const mobileStatus = touchCoarse || narrow;
      setIsMobile(mobileStatus);
      if (mobileStatus) {
        setVisible(true);
        setShowSpeech(true);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    // Natural eye blinking loop (blinks every 3.2 - 5.5 seconds)
    let blinkTimeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        blinkTimeout = setTimeout(triggerBlink, 3200 + Math.random() * 2500);
      }, 160);
    };
    blinkTimeout = setTimeout(triggerBlink, 2500);

    // Track mouse position on desktop
    const handleMouseMove = (e) => {
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches &&
        !window.matchMedia('(pointer: fine)').matches;
      if (isTouch || window.innerWidth <= 768) return;

      target.current.x = e.clientX + 16;
      target.current.y = e.clientY + 14;

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
      if (!isMobile) {
        setVisible(false);
        setShowSpeech(false);
        isSpeaking.current = false;
      }
    };

    const handleMouseEnter = () => {
      if (!isMobile && hasMoved.current) {
        setVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Canvas setup for footstep particle trails on desktop
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
      hoverTime.current += 0.04;

      // ==========================================
      // MOBILE COMPANION IDLE ANIMATION
      // ==========================================
      const narrowScreen = window.innerWidth <= 768;
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches &&
        !window.matchMedia('(pointer: fine)').matches;

      if (narrowScreen || isTouch) {
        const idleBob = Math.sin(hoverTime.current * 2.2) * 3.5;
        // Right hand waves cheerful "Hi! 👋" continuously
        const targetWave = -128 + Math.sin(hoverTime.current * 6.5) * 22;
        currentRightArmAngle.current += (targetWave - currentRightArmAngle.current) * 0.15;

        if (rightArmRef.current) {
          rightArmRef.current.style.transform = `rotate(${currentRightArmAngle.current}deg)`;
        }
        if (leftArmRef.current) {
          leftArmRef.current.style.transform = `rotate(6deg)`;
        }
        if (leftLegRef.current) {
          leftLegRef.current.style.transform = `rotate(0deg)`;
        }
        if (rightLegRef.current) {
          rightLegRef.current.style.transform = `rotate(0deg)`;
        }
        if (visualWrapperRef.current) {
          visualWrapperRef.current.style.transform = `translate3d(0, ${idleBob}px, 0)`;
        }

        animId = requestAnimationFrame(animate);
        return;
      }

      // ==========================================
      // DESKTOP CURSOR FOLLOWER PHYSICS
      // ==========================================
      const ease = 0.038; // Calm stroll
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      velocity.current.x = dx * ease;
      velocity.current.y = dy * ease;

      const speed = Math.hypot(dx, dy);

      // Facing direction flip
      if (dx > 2.5) {
        facingDirection.current = 1;
      } else if (dx < -2.5) {
        facingDirection.current = -1;
      }

      // Bank tilt based on movement
      const targetTilt = Math.max(-12, Math.min(12, dx * 0.25));
      rotation.current += (targetTilt - rotation.current) * 0.08;

      // Limb walking strides & waves
      const isWalking = speed > 0.9;
      let walkBob = 0;

      if (isWalking) {
        walkStep.current += Math.min(speed * 0.055, 0.085);
        const targetLeftLeg = Math.sin(walkStep.current) * 26;
        const targetRightLeg = -targetLeftLeg;
        const targetLeftArm = -targetLeftLeg * 0.7;
        const targetRightArm = -targetRightLeg * 0.7;
        walkBob = Math.abs(Math.sin(walkStep.current)) * 2.2;

        currentLeftLegAngle.current += (targetLeftLeg - currentLeftLegAngle.current) * 0.2;
        currentRightLegAngle.current += (targetRightLeg - currentRightLegAngle.current) * 0.2;
        currentLeftArmAngle.current += (targetLeftArm - currentLeftArmAngle.current) * 0.2;
        currentRightArmAngle.current += (targetRightArm - currentRightArmAngle.current) * 0.2;
      } else {
        currentLeftLegAngle.current += (0 - currentLeftLegAngle.current) * 0.15;
        currentRightLegAngle.current += (0 - currentRightLegAngle.current) * 0.15;
        currentLeftArmAngle.current += (6 - currentLeftArmAngle.current) * 0.15;

        // Wave when stopped
        const targetWave = -128 + Math.sin(hoverTime.current * 6.5) * 22;
        currentRightArmAngle.current += (targetWave - currentRightArmAngle.current) * 0.14;
      }

      // Apply transformations to SVG limb refs
      if (leftLegRef.current) {
        leftLegRef.current.style.transform = `rotate(${currentLeftLegAngle.current}deg)`;
      }
      if (rightLegRef.current) {
        rightLegRef.current.style.transform = `rotate(${currentRightLegAngle.current}deg)`;
      }
      if (leftArmRef.current) {
        leftArmRef.current.style.transform = `rotate(${currentLeftArmAngle.current}deg)`;
      }
      if (rightArmRef.current) {
        rightArmRef.current.style.transform = `rotate(${currentRightArmAngle.current}deg)`;
      }

      const idleBob = !isWalking ? Math.sin(hoverTime.current * 1.5) * 1.8 : 0;
      const verticalOffset = -walkBob + idleBob;

      if (botRef.current) {
        botRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + verticalOffset}px, 0)`;
      }

      if (visualWrapperRef.current) {
        visualWrapperRef.current.style.transform = `scaleX(${facingDirection.current}) rotate(${rotation.current}deg)`;
      }

      // Idle stop detection: show speech bubble when stationary
      if (hasMoved.current) {
        if (speed < 1.1) {
          idleFrames.current++;
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

      // Stardust particles under feet while walking
      if (isWalking && ctx && canvas) {
        particleSpawnCounter++;
        if (particleSpawnCounter % 3 === 0) {
          particles.current.push({
            x: pos.current.x + 24 + (Math.random() - 0.5) * 8,
            y: pos.current.y + 68 + verticalOffset,
            vx: (Math.random() - 0.5) * 0.5 - facingDirection.current * 0.3,
            vy: Math.random() * -0.6 - 0.2,
            radius: Math.random() * 1.8 + 1,
            color: Math.random() > 0.4 ? '#00f0ff' : '#38bdf8',
            alpha: 0.75,
          });
        }
      }

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.03;

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
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(blinkTimeout);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  // ==========================================
  // MOBILE: MINIMIZED RESTORE BUTTON
  // ==========================================
  if (isMobile && isDismissed) {
    return (
      <button
        onClick={() => {
          setIsDismissed(false);
          setMobileSpeechOpen(true);
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '18px',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: '#060e22',
          border: '1.5px solid #00f0ff',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.5), inset 0 0 10px rgba(0, 240, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          cursor: 'pointer',
          padding: 0,
          animation: 'bounceSubtle 2.5s ease-in-out infinite',
        }}
        aria-label="Open Techno Vista Mascot"
        title="Open Techno Vista Mascot"
      >
        <span style={{ fontSize: '20px', filter: 'drop-shadow(0 0 6px #00f0ff)' }}>🤖</span>
      </button>
    );
  }

  // ==========================================
  // MAIN COMPONENT RENDER
  // ==========================================
  return (
    <>
      {/* Background canvas for footsteps stardust particles (desktop only) */}
      {!isMobile && (
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
      )}

      {/* The Walking Cute Humanoid Robot Container */}
      <div
        ref={botRef}
        style={
          isMobile
            ? {
                position: 'fixed',
                bottom: '18px',
                right: '18px',
                width: '56px',
                height: '82px',
                zIndex: 99999,
                opacity: visible ? 1 : 0,
                cursor: 'pointer',
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }
            : {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '50px',
                height: '74px',
                pointerEvents: 'none',
                zIndex: 99999,
                willChange: 'transform',
                opacity: visible ? 1 : 0,
                transformOrigin: '50% 50%',
                transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }
        }
        onClick={() => {
          setIsChatOpen(true);
        }}
      >
        {/* =========================================================================
            SPEECH BUBBLE: "Chat with Fest Bot 💬" / "Just Register for it Guys! ⚡"
            - Desktop: Floats above head when stopped, click to open chatbot
            - Mobile: Tappable call-to-action opening the Fest Interactive Chatbot
            ========================================================================= */}
        <div
          style={
            isMobile
              ? {
                  position: 'absolute',
                  bottom: '100%',
                  right: '-4px',
                  marginBottom: '12px',
                  transform: mobileSpeechOpen ? 'scale(1)' : 'scale(0)',
                  transformOrigin: 'bottom right',
                  transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  opacity: mobileSpeechOpen ? 1 : 0,
                  whiteSpace: 'nowrap',
                  zIndex: 100,
                  cursor: 'pointer',
                }
              : {
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: showSpeech
                    ? 'translate(-50%, -12px) scale(1)'
                    : 'translate(-50%, 6px) scale(0)',
                  transformOrigin: 'bottom center',
                  transition: 'all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  opacity: showSpeech ? 1 : 0,
                  whiteSpace: 'nowrap',
                  zIndex: 100,
                  cursor: 'pointer',
                }
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsChatOpen(true);
          }}
        >
          {isMobile ? (
            /* Mobile Interactive Speech Bubble with Direct Chatbot Launcher & Close button */
            <div style={{ position: 'relative' }}>
              {/* Dismiss / Minimize button on mobile */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDismissed(true);
                }}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-6px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#070f26',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  color: '#94a3b8',
                  fontSize: '12px',
                  lineHeight: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 105,
                  padding: 0,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                }}
                aria-label="Minimize mascot"
                title="Minimize mascot"
              >
                ×
              </button>

              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 12, 28, 0.98), rgba(15, 23, 42, 0.96))',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid #00f0ff',
                  borderRadius: '14px',
                  padding: '7px 12px',
                  boxShadow:
                    '0 10px 30px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 240, 255, 0.55), 0 0 10px rgba(242, 196, 56, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#00f0ff',
                    boxShadow: '0 0 10px #00f0ff',
                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    fontFamily: "'Orbitron', 'Chakra Petch', 'Space Grotesk', sans-serif",
                    fontSize: '11px',
                    fontWeight: 900,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(90deg, #00f0ff 0%, #ffffff 45%, #ffd95a 80%, #f2c438 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.7))',
                  }}
                >
                  Chat with Fest Bot
                </span>

                <span style={{ fontSize: '13px' }}>
                  💬
                </span>
              </div>

              {/* Mobile speech bubble downward arrow */}
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '24px',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '7px solid #00f0ff',
                }}
              />
            </div>
          ) : (
            /* Desktop Speech Bubble */
            <>
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
                  Just Register for it Guys!
                </span>

                <span style={{ fontSize: '13px', filter: 'drop-shadow(0 0 6px #ffd95a)' }}>
                  ⚡
                </span>
              </div>

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
                }}
              />
            </>
          )}
        </div>

        {/* Mobile Glowing Ground Shadow / Ambient Beacon */}
        {isMobile && (
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '42px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 240, 255, 0.35)',
              filter: 'blur(4px)',
            }}
          />
        )}

        {/* =========================================================================
            WHITE HUMANOID ROBOT MASCOT SVG
            ========================================================================= */}
        <div
          ref={visualWrapperRef}
          style={{
            width: '100%',
            height: '100%',
            transformOrigin: '50% 65%',
            filter: isHoveringClickable
              ? 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.95)) drop-shadow(0 0 24px rgba(242, 196, 56, 0.5))'
              : 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 12px rgba(0, 240, 255, 0.45))',
            transition: 'filter 0.25s ease',
          }}
        >
          <svg
            viewBox="0 0 54 80"
            width="100%"
            height="100%"
            style={{ overflow: 'visible', display: 'block' }}
          >
            <defs>
              <linearGradient id="whiteCeramic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <linearGradient id="glossHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="darkVisor" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a1224" />
                <stop offset="50%" stopColor="#040814" />
                <stop offset="100%" stopColor="#01040a" />
              </linearGradient>

              <radialGradient id="cyanEyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#38bdf8" />
                <stop offset="85%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="mechJoint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Left Arm (Swings backward/forward) */}
            <g
              ref={leftArmRef}
              style={{
                transformOrigin: '16px 38px',
                transition: 'transform 0.08s linear',
              }}
            >
              <circle cx="16" cy="38" r="3.2" fill="url(#mechJoint)" />
              <rect x="13.8" y="38" width="4.4" height="7.5" rx="2.2" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="16" cy="46" r="2.2" fill="url(#mechJoint)" />
              <rect x="13.6" y="46.5" width="4.8" height="8" rx="2.4" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <ellipse cx="16" cy="56" rx="2.4" ry="3" fill="#cbd5e1" />
              <line x1="14.5" y1="58" x2="14.5" y2="60.5" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="16" y1="58.5" x2="16" y2="61" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="17.5" y1="58" x2="17.5" y2="60.5" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
            </g>

            {/* Left Leg (Swings backward/forward) */}
            <g
              ref={leftLegRef}
              style={{
                transformOrigin: '20px 50px',
                transition: 'transform 0.08s linear',
              }}
            >
              <circle cx="20" cy="50" r="3" fill="url(#mechJoint)" />
              <rect x="17.6" y="50" width="4.8" height="8.5" rx="2.4" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="20" cy="59" r="2.4" fill="url(#mechJoint)" />
              <rect x="17.4" y="59.5" width="5.2" height="8.5" rx="2.6" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <path d="M16 67.5 L25 67.5 L26.5 71.5 L15 71.5 Z" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.7" />
              <path d="M14.5 71.5 L27 71.5 Q28 73 26 73.5 L14 73.5 Z" fill="#0f172a" />
              <circle cx="18" cy="69.5" r="1" fill="#00f0ff" />
            </g>

            {/* Torso & Armor Vest */}
            <g>
              <rect x="18" y="32" width="12" height="4" rx="2" fill="url(#mechJoint)" />
              <rect x="16" y="34.5" width="16" height="15" rx="5" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.8" />
              <path d="M17.5 36 Q24 37.5 30.5 36" stroke="#94a3b8" strokeWidth="0.6" fill="none" />
              <rect x="19.5" y="38" width="9" height="6.5" rx="2" fill="#0f172a" stroke="#00d4ff" strokeWidth="0.6" />
              <circle cx="24" cy="41.25" r="1.6" fill="#00f0ff" filter="url(#softGlow)" />
              <circle cx="24" cy="41.25" r="0.7" fill="#ffffff" />
              <rect x="18.5" y="47.5" width="11" height="4" rx="2" fill="url(#mechJoint)" />
              <rect x="22" y="48" width="4" height="3" rx="1" fill="#f2c438" />
            </g>

            {/* Cute Glossy Squircle Head */}
            <g>
              <rect x="10" y="8" width="28" height="23" rx="10" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.9" />
              <path d="M13 11 Q24 8 35 11" stroke="url(#glossHighlight)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <circle cx="9" cy="19.5" r="3.2" fill="url(#mechJoint)" stroke="#00d4ff" strokeWidth="0.8" />
              <circle cx="9" cy="19.5" r="1.4" fill="#00f0ff" />
              <path d="M9 16.5 L7.5 11" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
              <circle cx="7" cy="10" r="1.6" fill="#00d4ff" filter="url(#softGlow)" />
              <circle cx="39" cy="19.5" r="3.2" fill="url(#mechJoint)" stroke="#00d4ff" strokeWidth="0.8" />
              <circle cx="39" cy="19.5" r="1.4" fill="#00f0ff" />
              <rect x="12.5" y="11.5" width="23" height="15" rx="6" fill="url(#darkVisor)" stroke="#38bdf8" strokeWidth="0.7" />
              <path d="M15 13.5 Q24 12 33 13.5" stroke="#ffffff" strokeWidth="0.9" strokeOpacity="0.45" strokeLinecap="round" fill="none" />

              {/* Glowing Electric Cyan Eyes (With Natural Blink) */}
              {!isBlinking ? (
                <>
                  <circle cx="18" cy="18" r="3" fill="none" stroke="#00f0ff" strokeWidth="1.4" filter="url(#softGlow)" />
                  <circle cx="18" cy="18" r="1.5" fill="#ffffff" />
                  <circle cx="30" cy="18" r="3" fill="none" stroke="#00f0ff" strokeWidth="1.4" filter="url(#softGlow)" />
                  <circle cx="30" cy="18" r="1.5" fill="#ffffff" />
                </>
              ) : (
                <>
                  <line x1="15.5" y1="18.5" x2="20.5" y2="18.5" stroke="#00f0ff" strokeWidth="1.6" strokeLinecap="round" filter="url(#softGlow)" />
                  <line x1="27.5" y1="18.5" x2="32.5" y2="18.5" stroke="#00f0ff" strokeWidth="1.6" strokeLinecap="round" filter="url(#softGlow)" />
                </>
              )}

              {/* Happy Digital Cyan Smile */}
              <path
                d="M21.5 22.5 Q24 24.5 26.5 22.5"
                stroke="#00f0ff"
                strokeWidth="1.1"
                strokeLinecap="round"
                fill="none"
                filter="url(#softGlow)"
              />
            </g>

            {/* Right Leg (Swings forward/backward) */}
            <g
              ref={rightLegRef}
              style={{
                transformOrigin: '28px 50px',
                transition: 'transform 0.08s linear',
              }}
            >
              <circle cx="28" cy="50" r="3" fill="url(#mechJoint)" />
              <rect x="25.6" y="50" width="4.8" height="8.5" rx="2.4" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="28" cy="59" r="2.4" fill="url(#mechJoint)" />
              <rect x="25.4" y="59.5" width="5.2" height="8.5" rx="2.6" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <path d="M24 67.5 L33 67.5 L34.5 71.5 L23 71.5 Z" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.7" />
              <path d="M22.5 71.5 L35 71.5 Q36 73 34 73.5 L22 73.5 Z" fill="#0f172a" />
              <circle cx="26" cy="69.5" r="1" fill="#00f0ff" />
            </g>

            {/* Right Arm (Swings forward/backward & waves) */}
            <g
              ref={rightArmRef}
              style={{
                transformOrigin: '32px 38px',
                transition: 'transform 0.08s linear',
              }}
            >
              <circle cx="32" cy="38" r="3.2" fill="url(#mechJoint)" />
              <rect x="29.8" y="38" width="4.4" height="7.5" rx="2.2" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="32" cy="46" r="2.2" fill="url(#mechJoint)" />
              <rect x="29.6" y="46.5" width="4.8" height="8" rx="2.4" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <ellipse cx="32" cy="56" rx="2.4" ry="3" fill="#cbd5e1" />
              <line x1="30.5" y1="58" x2="30.5" y2="60.5" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="32" y1="58.5" x2="32" y2="61" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="33.5" y1="58" x2="33.5" y2="60.5" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* Interactive Fest Chatbot Modal / Drawer */}
      <FestChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
