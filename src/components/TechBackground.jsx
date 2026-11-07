import React, { useEffect, useRef } from 'react';

/**
 * TechBackground Component
 * Renders an interactive, futuristic cyber particle constellation canvas across the application.
 * Features:
 * - Multi-layer cosmic node network with breathing luminescence
 * - Interactive cursor magnetic energy attraction
 * - Moving cyber data packets along active filament lines
 * - Optimized with requestAnimationFrame for smooth 60fps performance
 */
export default function TechBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for magnetic cursor web
    const mouse = { x: -9999, y: -9999, active: false };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Number of particles based on screen width
    const particleCount = Math.min(Math.floor(width / 26), 50);
    const particles = [];
    const colors = ['#00f0ff', '#38bdf8', '#ffd95a', '#8b5cf6', '#06b6d4'];

    for (let i = 0; i < particleCount; i++) {
      const isForeground = Math.random() > 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isForeground ? 0.38 : 0.2),
        vy: (Math.random() - 0.5) * (isForeground ? 0.38 : 0.2),
        radius: isForeground ? Math.random() * 2 + 1.2 : Math.random() * 1.2 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: isForeground ? Math.random() * 0.55 + 0.3 : Math.random() * 0.3 + 0.15,
        pulseVal: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        isForeground,
      });
    }

    // Traveling Data Packets along network filaments
    const packets = [];
    const maxPackets = 12;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const activeConnections = [];

      // 1. Draw connecting lines between close particles & to cursor
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          const maxDist = 135;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            activeConnections.push({ p1, p2 });
          }
        }

        // Magnetic Attraction & Web to Cursor
        if (mouse.active) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mDist = Math.hypot(mdx, mdy);
          const mouseRadius = 140;

          if (mDist < mouseRadius) {
            const force = (1 - mDist / mouseRadius) * 0.02;
            p1.x += mdx * force;
            p1.y += mdy * force;

            const mouseLineAlpha = (1 - mDist / mouseRadius) * 0.38;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(242, 196, 56, ${mouseLineAlpha})`;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#ffd95a';
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 2. Data Packets traveling along lines
      if (activeConnections.length > 0 && packets.length < maxPackets && Math.random() < 0.1) {
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
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = pkt.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulseVal += p.pulseSpeed;
        const pulse = Math.sin(p.pulseVal) * 0.2;
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

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at bounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.88,
      }}
    />
  );
}
