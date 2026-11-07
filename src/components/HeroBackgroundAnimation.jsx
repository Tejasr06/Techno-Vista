import React, { useEffect, useRef } from 'react';

/**
 * HeroBackgroundAnimation Component
 * Lightweight, simple, and visually attractive ambient background animation for the first page.
 * Features:
 * - Constellation particles with gentle drift and connecting micro-filaments
 * - Rotating celestial cyber astrolabe (slow 35s rotation)
 * - Counter-rotating geometric polygon core
 * - Top-left radar scanner with rotating sweep hand
 * - Concentric orbital rings on top-right
 */
export default function HeroBackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setSize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Particles count based on width
    const count = Math.min(Math.floor(canvas.width / 26), 45);
    const particles = [];
    const colors = ['#00f0ff', '#38bdf8', '#f2c438', '#8b5cf6'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.55 + 0.25,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      {/* 1. Canvas particle constellation */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.85,
        }}
      />

      {/* 2. Rotating Celestial Orbital Rings (Center-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-8%',
          transform: 'translateY(-50%)',
          width: 'min(760px, 85vw)',
          height: 'min(760px, 85vw)',
          opacity: 0.38,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 800 800"
          className="animate-spin-slow"
          style={{ width: '100%', height: '100%', display: 'block' }}
          fill="none"
        >
          <circle cx="400" cy="400" r="380" stroke="#00f0ff" strokeWidth="1.2" strokeDasharray="4 8" opacity="0.6" />
          <circle cx="400" cy="400" r="280" stroke="#f2c438" strokeWidth="1" strokeDasharray="10 10" opacity="0.45" />
          <circle cx="400" cy="400" r="180" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.4" />
          <line x1="400" y1="20" x2="400" y2="780" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.3" />
          <line x1="20" y1="400" x2="780" y2="400" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.3" />
          <circle cx="400" cy="20" r="5" fill="#00f0ff" opacity="0.8" />
          <circle cx="780" cy="400" r="5" fill="#f2c438" opacity="0.8" />
          <circle cx="400" cy="780" r="4" fill="#38bdf8" opacity="0.7" />
          <circle cx="20" cy="400" r="4" fill="#8b5cf6" opacity="0.7" />
        </svg>

        {/* Counter-rotating Inner Geometric Triangle */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 400 400" className="animate-spin-slow-reverse" style={{ width: '50%', height: '50%' }} fill="none">
            <polygon points="200,30 370,330 30,330" stroke="#f2c438" strokeWidth="1" opacity="0.5" strokeDasharray="8 8" />
            <polygon points="200,370 30,70 370,70" stroke="#00f0ff" strokeWidth="0.8" opacity="0.35" strokeDasharray="4 6" />
            <circle cx="200" cy="200" r="14" stroke="#00f0ff" strokeWidth="1" opacity="0.55" />
          </svg>
        </div>
      </div>

      {/* 3. Top-Left Corner Radar Scanner */}
      <div
        style={{
          position: 'absolute',
          top: '25px',
          left: '25px',
          width: '85px',
          height: '85px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            border: '1px dashed rgba(242, 196, 56, 0.4)',
          }}
        />
        <div
          className="animate-radar"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: '2px',
            transformOrigin: '0% 50%',
            background: 'linear-gradient(90deg, #00f0ff 0%, transparent 100%)',
            boxShadow: '0 0 8px #00f0ff',
          }}
        />
      </div>

      {/* 4. Top-Right Ambient Orbit Rings */}
      <div
        className="animate-spin-slow"
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="animate-spin-slow-reverse"
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          border: '1px dashed rgba(242, 196, 56, 0.35)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
