import React, { useEffect } from 'react';
import { useFest } from '../context/FestContext';
import CyberTunnelHero from '../components/CyberTunnelHero';

export default function Home() {
  const { festData } = useFest();

  useEffect(() => {
    document.title = `${festData.name} | ${festData.tagline} | Sri Sairam College of Engineering`;
  }, [festData]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* =========================================================================
          FIRST OPENING PAGE: CINEMATIC CYBER PHOENIX HERO PORTAL
          (No vertical scroll on home page - "Explore Events" button redirects directly to Events page)
          ========================================================================= */}
      <CyberTunnelHero />
    </div>
  );
}
