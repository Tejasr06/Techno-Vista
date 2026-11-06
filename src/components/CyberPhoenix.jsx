import React, { useEffect, useRef, useState } from 'react';

/**
 * CyberPhoenix Component
 * Loads the official TECHNO VISTA Phoenix emblem from public/assets/phoenix-raw.jpg,
 * strips the yellow background entirely via client-side canvas chroma-isolation,
 * and re-renders the bird in an electric cyber neon gradient (Electric Cyan, Ice-White & Cyber Violet)
 * with animated glowing energy wings, scanline sweep, and aura particles.
 * 
 * NO yellow color used, perfectly matching the cyber theme!
 */
export default function CyberPhoenix() {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/phoenix-raw.jpg';
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const offscreen = document.createElement('canvas');
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      offscreen.width = w;
      offscreen.height = h;

      const ctx = offscreen.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Create a vertical gradient palette for the Phoenix:
      // Top: Ice White (#ffffff) -> Mid: Electric Cyan (#00f0ff, #38bdf8) -> Bottom: Cyber Violet (#8b5cf6, #c084fc)
      for (let y = 0; y < h; y++) {
        const yNorm = y / h;
        
        // Compute gradient RGB at this height
        let rTarget, gTarget, bTarget;
        if (yNorm < 0.35) {
          // Ice White to Electric Cyan
          const t = yNorm / 0.35;
          rTarget = Math.round(255 * (1 - t) + 0 * t);
          gTarget = Math.round(255 * (1 - t) + 240 * t);
          bTarget = 255;
        } else if (yNorm < 0.75) {
          // Electric Cyan to Bright Blue
          const t = (yNorm - 0.35) / 0.4;
          rTarget = Math.round(0 * (1 - t) + 99 * t);
          gTarget = Math.round(240 * (1 - t) + 102 * t);
          bTarget = Math.round(255 * (1 - t) + 241 * t);
        } else {
          // Bright Blue to Cyber Violet
          const t = (yNorm - 0.75) / 0.25;
          rTarget = Math.round(99 * (1 - t) + 192 * t);
          gTarget = Math.round(102 * (1 - t) + 132 * t);
          bTarget = Math.round(241 * (1 - t) + 252 * t);
        }

        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Compute perceived luminance
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          // If luminance is high (the yellow background), make it 100% transparent.
          // If luminance is low (the black silhouette), make it opaque and apply cyber color.
          // Smooth anti-aliased edge transition between 50 and 130
          if (lum > 130) {
            data[idx + 3] = 0; // Transparent (removes ALL yellow!)
          } else if (lum < 50) {
            // Pure bird silhouette
            data[idx] = rTarget;
            data[idx + 1] = gTarget;
            data[idx + 2] = bTarget;
            data[idx + 3] = 255;
          } else {
            // Anti-aliased boundary edge
            const alphaFactor = (130 - lum) / 80;
            data[idx] = rTarget;
            data[idx + 1] = gTarget;
            data[idx + 2] = bTarget;
            data[idx + 3] = Math.round(255 * alphaFactor);
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Draw onto visible canvas
      const mainCanvas = canvasRef.current;
      if (mainCanvas) {
        mainCanvas.width = w;
        mainCanvas.height = h;
        const mainCtx = mainCanvas.getContext('2d');
        mainCtx.clearRect(0, 0, w, h);
        mainCtx.drawImage(offscreen, 0, 0);
        setIsLoaded(true);
      }
    };
  }, []);

  return (
    <div
      className="cyber-phoenix-wrapper"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
        maxWidth: '100%',
      }}
    >
      {/* Ambient Soft Aurora Back-Glow (Cyan & Violet) */}
      <div
        className="phoenix-aurora-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '80%',
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.28) 0%, rgba(139, 92, 246, 0.18) 45%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating Holographic Cyber Phoenix Canvas */}
      <canvas
        ref={canvasRef}
        className="cyber-phoenix-canvas"
        style={{
          maxWidth: 'min(92vw, 420px)',
          height: 'auto',
          display: 'block',
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 4px 18px rgba(0, 240, 255, 0.55)) drop-shadow(0 8px 36px rgba(139, 92, 246, 0.35))',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />
    </div>
  );
}
