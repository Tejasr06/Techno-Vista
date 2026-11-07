import React, { useEffect, useState, useRef } from 'react';

/**
 * RobotFollower Component
 * An adorable 3D-styled white humanoid robot companion with interactive click reactions:
 * - 360° backflip celebration spin
 * - Vibrant colorful confetti particle explosion
 * - Melodic 8-bit cyber chime sound synthesized with Web Audio API (zero external assets)
 * - Animated walking stride & friendly hand wave greeting when stopped
 * - Cyber speech bubble with Orbitron typography
 */
export default function RobotFollower() {
  const [visible, setVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [speechText, setSpeechText] = useState('Just Register for it Guys!');

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
  const confetti = useRef([]);
  const hasMoved = useRef(false);

  // Smooth limb angle interpolation refs
  const currentRightArmAngle = useRef(0);
  const currentLeftArmAngle = useRef(0);
  const currentLeftLegAngle = useRef(0);
  const currentRightLegAngle = useRef(0);

  // Idle tracking for speech bubble
  const idleFrames = useRef(0);
  const isSpeaking = useRef(false);
  const clickTimeout = useRef(null);

  // =========================================================================
  // 1. CUTE 8-BIT CYBER CHIME ARPEGGIO (Synthesized via Web Audio API)
  // =========================================================================
  const playCyberChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();

      // Cheerful ascending 8-bit arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.075);

        gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.075);
        gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + idx * 0.075 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.075 + 0.28);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.075);
        osc.stop(audioCtx.currentTime + idx * 0.075 + 0.3);
      });
    } catch (e) {
      // Audio fallback if user hasn't interacted or audio is muted
    }
  };

  // =========================================================================
  // 2. ROBOT CLICK HANDLER: BACKFLIP, CONFETTI & SOUND REACTION
  // =========================================================================
  const handleRobotClick = (e) => {
    e.stopPropagation();
    if (isFlipping) return;

    // Trigger backflip
    setIsFlipping(true);

    // Play cyber chime
    playCyberChime();

    // Launch festive confetti explosion around robot
    const colors = ['#00f0ff', '#ffd95a', '#ec4899', '#a855f7', '#10b981', '#38bdf8', '#ffffff'];
    const originX = pos.current.x + 25;
    const originY = pos.current.y + 35;

    for (let i = 0; i < 42; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      confetti.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4, // Upward initial velocity
        gravity: 0.24,
        width: Math.random() * 7 + 4,
        height: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
      });
    }

    // Celebratory speech bubbles on click
    const celebratoryMessages = [
      'WOOHOO! SEE YOU THERE! 🚀',
      'YAY! LET’S GO TECHNO VISTA! 🎉',
      'LET’S WIN THIS TOGETHER! 🏆',
      'JUST REGISTER FOR IT GUYS! ⚡',
    ];
    const nextMsg =
      celebratoryMessages[Math.floor(Math.random() * celebratoryMessages.length)];
    setSpeechText(nextMsg);
    setShowSpeech(true);

    clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      setIsFlipping(false);
      setSpeechText('Just Register for it Guys!');
    }, 900);
  };

  useEffect(() => {
    // Only enable if pointer is fine (mouse/trackpad, not purely mobile touch)
    const isTouchOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly) return;

    // Track mouse position
    const handleMouseMove = (e) => {
      target.current.x = e.clientX + 16;
      target.current.y = e.clientY + 14;

      // Reset speech bubble when cursor moves (unless currently celebrating flip)
      if (!isFlipping) {
        idleFrames.current = 0;
        if (isSpeaking.current) {
          isSpeaking.current = false;
          setShowSpeech(false);
        }
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

    // Canvas setup for footstep particles & confetti
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

      // Slow & gentle follow physics
      const ease = 0.038;
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

      // Limb walking animation vs hand waving
      const isWalking = speed > 0.9 && !isFlipping;
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

        // Wave hand when stationary
        const targetWave = -128 + Math.sin(hoverTime.current * 6.5) * 22;
        currentRightArmAngle.current += (targetWave - currentRightArmAngle.current) * 0.14;
      }

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

      // Resting idle bobbing
      const idleBob = !isWalking ? Math.sin(hoverTime.current * 1.5) * 1.8 : 0;
      const verticalOffset = -walkBob + idleBob;

      // Update bot DOM container
      if (botRef.current) {
        botRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + verticalOffset}px, 0)`;
      }

      // Update robot visual facing & bank angle
      if (visualWrapperRef.current && !isFlipping) {
        visualWrapperRef.current.style.transform = `scaleX(${facingDirection.current}) rotate(${rotation.current}deg)`;
      }

      // Idle stop detection: show speech bubble when stationary
      if (hasMoved.current && !isFlipping) {
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

      // Draw canvas particles & celebratory confetti
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Footstep stardust particles
        if (isWalking) {
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

        // 2. Confetti Explosion when clicked
        for (let i = confetti.current.length - 1; i >= 0; i--) {
          const c = confetti.current[i];
          c.x += c.vx;
          c.y += c.vy;
          c.vy += c.gravity;
          c.vx *= 0.98;
          c.rotation += c.vRot;
          c.alpha -= 0.015;

          if (c.alpha <= 0 || c.y > canvas.height) {
            confetti.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate((c.rotation * Math.PI) / 180);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = c.alpha;
          ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
          ctx.restore();
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
      clearTimeout(clickTimeout.current);
      cancelAnimationFrame(animId);
    };
  }, [isFlipping]);

  return (
    <>
      {/* Background canvas for footsteps & celebratory confetti */}
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

      {/* The Walking Cute Humanoid Robot Container */}
      <div
        ref={botRef}
        style={{
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
        }}
        aria-hidden="true"
      >
        {/* =========================================================================
            SPEECH BUBBLE: "Just Register for it Guys! / Celebrations"
            ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: showSpeech
              ? 'translate(-50%, -12px) scale(1)'
              : 'translate(-50%, 6px) scale(0)',
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
            {/* Pulsing indicator beacon */}
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

            {/* Typography */}
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
              {speechText}
            </span>

            <span style={{ fontSize: '13px', filter: 'drop-shadow(0 0 6px #ffd95a)' }}>
              {isFlipping ? '🎉' : '⚡'}
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
            3D-STYLED WHITE HUMANOID ROBOT (Clickable to trigger backflip & confetti)
            ========================================================================= */}
        <div
          ref={visualWrapperRef}
          onClick={handleRobotClick}
          className={isFlipping ? 'robot-backflipping' : ''}
          style={{
            width: '100%',
            height: '100%',
            transformOrigin: '50% 60%',
            willChange: 'transform',
            pointerEvents: 'auto', // Enable clicking!
            cursor: 'pointer',
            filter:
              isHoveringClickable || showSpeech || isFlipping
                ? 'drop-shadow(0 0 14px rgba(242, 196, 56, 0.85))'
                : 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 8px rgba(0, 240, 255, 0.4))',
          }}
          title="Click to interact with Techno Vista Robot! 🤖"
        >
          <svg
            width="50"
            height="74"
            viewBox="0 0 50 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Glossy White Ceramic Armor Gradient */}
              <linearGradient id="whiteCeramic" x1="15%" y1="10%" x2="85%" y2="90%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f1f5f9" />
                <stop offset="85%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Glossy Curved Visor Screen */}
              <linearGradient id="darkVisor" x1="20%" y1="10%" x2="80%" y2="90%">
                <stop offset="0%" stopColor="#080e1e" />
                <stop offset="70%" stopColor="#02050d" />
                <stop offset="100%" stopColor="#0a1226" />
              </linearGradient>

              {/* Dark Mechanical Joints */}
              <linearGradient id="mechJoint" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* ===================================================
                1. BACK LIMBS (Left Arm & Left Leg - in perspective)
                =================================================== */}
            <g
              ref={leftArmRef}
              style={{
                transformOrigin: '14px 38px',
                transition: 'transform 0.08s linear',
              }}
            >
              <circle cx="14" cy="38" r="3.2" fill="url(#mechJoint)" />
              <rect x="11.8" y="38" width="4.4" height="7.5" rx="2.2" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="14" cy="46" r="2.2" fill="url(#mechJoint)" />
              <rect x="11.6" y="46.5" width="4.8" height="8" rx="2.4" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <ellipse cx="14" cy="56" rx="2.4" ry="3" fill="#cbd5e1" />
              <line x1="12.5" y1="58" x2="12.5" y2="60.5" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="14" y1="58.5" x2="14" y2="61" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="15.5" y1="58" x2="15.5" y2="60.5" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
            </g>

            <g
              ref={leftLegRef}
              style={{
                transformOrigin: '18px 50px',
                transition: 'transform 0.08s linear',
              }}
            >
              <circle cx="18" cy="50" r="3" fill="url(#mechJoint)" />
              <rect x="15.6" y="50" width="4.8" height="8.5" rx="2.4" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="18" cy="59" r="2.4" fill="url(#mechJoint)" />
              <rect x="15.4" y="59.5" width="5.2" height="8.5" rx="2.6" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.6" />
              <path d="M14 67.5 L23 67.5 L24.5 71.5 L13 71.5 Z" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.7" />
              <path d="M12.5 71.5 L25 71.5 Q26 73 24 73.5 L12 73.5 Z" fill="#0f172a" />
              <circle cx="16" cy="69.5" r="1" fill="#00f0ff" />
            </g>

            {/* ===================================================
                2. TORSO & PELVIS
                =================================================== */}
            <rect x="16" y="47" width="16" height="5" rx="2.5" fill="url(#mechJoint)" />

            <rect
              x="14"
              y="34"
              width="20"
              height="15"
              rx="7.5"
              fill="url(#whiteCeramic)"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            />
            <circle cx="24" cy="41" r="2.8" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.6" />
            <circle cx="24" cy="41" r="1.2" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }} />
            <rect x="21" y="31.5" width="6" height="3.5" rx="1.5" fill="url(#mechJoint)" />

            {/* ===================================================
                3. HEAD & HELMET
                =================================================== */}
            <rect
              x="8"
              y="5"
              width="32"
              height="28"
              rx="10"
              fill="url(#whiteCeramic)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />

            <path
              d="M14 8 Q24 6 34 8"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            <rect
              x="10.5"
              y="7.5"
              width="24"
              height="23"
              rx="7.5"
              fill="url(#darkVisor)"
              stroke="#1e293b"
              strokeWidth="0.8"
            />

            <path
              d="M13 10 L19 10 Q14 15 13 20 Z"
              fill="rgba(255, 255, 255, 0.12)"
            />

            {/* ===================================================
                4. ELECTRIC BLUE GLOWING RING EYES & DIGITAL SMILE
                =================================================== */}
            {isBlinking && !showSpeech && !isFlipping ? (
              <>
                <line x1="14" y1="18.5" x2="19" y2="18.5" stroke="#00f0ff" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="23" y1="18.5" x2="28" y2="18.5" stroke="#00f0ff" strokeWidth="1.8" strokeLinecap="round" />
              </>
            ) : isHoveringClickable || showSpeech || isFlipping ? (
              <>
                <path
                  d="M14 20 Q16.5 16 19 20"
                  stroke="#00f0ff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                  style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }}
                />
                <path
                  d="M23 20 Q25.5 16 28 20"
                  stroke="#00f0ff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                  style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }}
                />
              </>
            ) : (
              <>
                <circle
                  cx="16.5"
                  cy="18.5"
                  r="3.6"
                  stroke="#00f0ff"
                  strokeWidth="1.4"
                  fill="#031b33"
                  style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
                />
                <circle cx="16.5" cy="18.5" r="1.4" fill="#ffffff" />

                <circle
                  cx="25.5"
                  cy="18.5"
                  r="3.6"
                  stroke="#00f0ff"
                  strokeWidth="1.4"
                  fill="#031b33"
                  style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
                />
                <circle cx="25.5" cy="18.5" r="1.4" fill="#ffffff" />
              </>
            )}

            <path
              d="M19 24.5 Q21 26.5 23 24.5"
              stroke="#00f0ff"
              strokeWidth="1.1"
              strokeLinecap="round"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }}
            />

            {/* ===================================================
                5. SIDE EAR MODULE & ANGLED ANTENNA
                =================================================== */}
            <ellipse
              cx="38.5"
              cy="16"
              rx="3"
              ry="5.5"
              fill="#0f172a"
              stroke="#00f0ff"
              strokeWidth="1.1"
              style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
            />
            <line x1="37.5" y1="14" x2="39.5" y2="14" stroke="#64748b" strokeWidth="0.8" />
            <line x1="37.5" y1="16" x2="39.5" y2="16" stroke="#64748b" strokeWidth="0.8" />
            <line x1="37.5" y1="18" x2="39.5" y2="18" stroke="#64748b" strokeWidth="0.8" />

            <line
              x1="39"
              y1="12"
              x2="45"
              y2="5"
              stroke="url(#mechJoint)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="45" cy="5" r="1.4" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }} />

            {/* ===================================================
                6. FOREGROUND LIMBS (Right Arm & Right Leg)
                =================================================== */}
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
    </>
  );
}
