import React, { useEffect, useRef } from 'react';

/**
 * HeroBackgroundAnimation Component
 * Super-attractive, interactive cyber-cosmic ambient background animation for the first page.
 * Features:
 * - Multi-depth interactive constellation network with dynamic cyber filaments
 * - Traveling luminous data packets along network paths (living cyber grid)
 * - Interactive cursor magnetic energy field (particles react & glow near cursor)
 * - Cinematic diagonal shooting meteors / cyber data streams with fading particle trails
 * - Rotating celestial astrolabe with counter-rotating geometric polygons
 * - Tactical radar scanner and ambient orbital kinetic rings
 * - 100% GPU-accelerated and non-intrusive (pointer-events: none, z-index: 2)
 */
export default function HeroBackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = 0;
    let height = 0;

    const setSize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      } else {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Mouse tracking for magnetic cursor aura
    const mouse = { x: -9999, y: -9999, active: false };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particles: Multi-layer depth (foreground + background stars)
    const particleCount = Math.min(Math.floor(width / 22), 55);
    const particles = [];
    const colors = ['#00f0ff', '#38bdf8', '#ffd95a', '#818cf8', '#22d3ee'];

    for (let i = 0; i < particleCount; i++) {
      const isForeground = Math.random() > 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: 0,
        originY: 0,
        vx: (Math.random() - 0.5) * (isForeground ? 0.45 : 0.22),
        vy: (Math.random() - 0.5) * (isForeground ? 0.45 : 0.22),
        radius: isForeground ? Math.random() * 2 + 1.2 : Math.random() * 1.2 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: isForeground ? Math.random() * 0.55 + 0.35 : Math.random() * 0.3 + 0.15,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseVal: Math.random() * Math.PI * 2,
        isForeground,
      });
    }

    // Traveling Data Packets along connection filaments
    const packets = [];
    const maxPackets = 14;

    // Shooting Cyber Meteors
    const meteors = [];
    let nextMeteorTimer = 100 + Math.random() * 120;

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.85,
        y: Math.random() * (height * 0.35),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 7 + 8,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.15,
        color: Math.random() > 0.3 ? '#00f0ff' : '#ffd95a',
        opacity: 1,
      });
    };

    // Main Render Loop (60 FPS)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Spawning & Drawing Shooting Meteors
      nextMeteorTimer--;
      if (nextMeteorTimer <= 0) {
        spawnMeteor();
        nextMeteorTimer = 160 + Math.random() * 180;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, m.color);
        grad.addColorStop(0.3, m.color);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = m.opacity;
        ctx.shadowBlur = 12;
        ctx.shadowColor = m.color;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Sparkle head
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = m.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.016;

        if (m.opacity <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
        }
      }

      // 2. Connecting Lines between particles & Cursor
      const activeConnections = [];

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Connection to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          const maxDist = 135;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.24;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            // Track for data packet traveling
            activeConnections.push({ p1, p2, dist });
          }
        }

        // Interactive Magnetic Attraction & Connection to Cursor
        if (mouse.active) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mDist = Math.hypot(mdx, mdy);
          const mouseRadius = 150;

          if (mDist < mouseRadius) {
            // Subtle magnetic pull
            const force = (1 - mDist / mouseRadius) * 0.025;
            p1.x += mdx * force;
            p1.y += mdy * force;

            // Luminous web connecting to cursor
            const mouseLineAlpha = (1 - mDist / mouseRadius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(242, 196, 56, ${mouseLineAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#ffd95a';
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 3. Spawning & Moving Luminous Data Packets on network lines
      if (activeConnections.length > 0 && packets.length < maxPackets && Math.random() < 0.12) {
        const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        packets.push({
          p1: conn.p1,
          p2: conn.p2,
          progress: 0,
          speed: Math.random() * 0.025 + 0.015,
          color: Math.random() > 0.4 ? '#00f0ff' : '#ffd95a',
        });
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const px = pkt.p1.x + (pkt.p2.x - pkt.p1.x) * pkt.progress;
        const py = pkt.p1.y + (pkt.p2.y - pkt.p1.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = pkt.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Draw & Animate Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulseVal += p.pulseSpeed;
        const pulse = Math.sin(p.pulseVal) * 0.25;
        const currentAlpha = Math.max(0.1, Math.min(1, p.alpha + pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = p.isForeground ? 10 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
      {/* 1. Interactive Multi-Layer Canvas Network */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.95,
        }}
      />

      {/* 2. Rotating Celestial Cyber Astrolabe (Center-Right) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-8%',
          transform: 'translateY(-50%)',
          width: 'min(780px, 85vw)',
          height: 'min(780px, 85vw)',
          opacity: 0.42,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 800 800"
          className="animate-spin-slow"
          style={{ width: '100%', height: '100%', display: 'block' }}
          fill="none"
        >
          <circle cx="400" cy="400" r="380" stroke="#00f0ff" strokeWidth="1.2" strokeDasharray="4 8" opacity="0.65" />
          <circle cx="400" cy="400" r="280" stroke="#f2c438" strokeWidth="1" strokeDasharray="10 10" opacity="0.5" />
          <circle cx="400" cy="400" r="180" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.45" />
          <line x1="400" y1="20" x2="400" y2="780" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.35" />
          <line x1="20" y1="400" x2="780" y2="400" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.35" />
          <circle cx="400" cy="20" r="5" fill="#00f0ff" opacity="0.85" />
          <circle cx="780" cy="400" r="5" fill="#f2c438" opacity="0.85" />
          <circle cx="400" cy="780" r="4" fill="#38bdf8" opacity="0.75" />
          <circle cx="20" cy="400" r="4" fill="#8b5cf6" opacity="0.75" />
        </svg>

        {/* Counter-rotating Inner Geometric Polygons */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 400 400" className="animate-spin-slow-reverse" style={{ width: '52%', height: '52%' }} fill="none">
            <polygon points="200,30 370,330 30,330" stroke="#f2c438" strokeWidth="1.1" opacity="0.55" strokeDasharray="8 8" />
            <polygon points="200,370 30,70 370,70" stroke="#00f0ff" strokeWidth="0.9" opacity="0.4" strokeDasharray="4 6" />
            <circle cx="200" cy="200" r="16" stroke="#00f0ff" strokeWidth="1.2" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* 3. Top-Left Tactical Radar Scanner */}
      <div
        style={{
          position: 'absolute',
          top: '25px',
          left: '25px',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: '1.2px solid rgba(0, 240, 255, 0.45)',
          boxShadow: '0 0 16px rgba(0, 240, 255, 0.25)',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            border: '1px dashed rgba(242, 196, 56, 0.45)',
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
            boxShadow: '0 0 10px #00f0ff',
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
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="animate-spin-slow-reverse"
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          border: '1px dashed rgba(242, 196, 56, 0.4)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
