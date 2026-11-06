import React, { useState, useEffect } from 'react';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '../data/galleryData';
import SectionTitle from '../components/SectionTitle';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
  Sparkles,
  Info,
} from 'lucide-react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  useEffect(() => {
    document.title = `Photo Gallery | TECHNO VISTA 2K26 | Sri Sairam CE`;
  }, []);

  const filteredImages = GALLERY_DATA.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight' && activeImageIndex !== null) handleNext();
      if (e.key === 'ArrowLeft' && activeImageIndex !== null) handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredImages.length]);

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header */}
        <SectionTitle
          tag="Memories & Highlights"
          title="TECHNO VISTA Gallery"
          subtitle="Glimpses into our vibrant technical symposiums, hackathons, robotics arenas, and award ceremonies."
        />

        {/* Organizer Notice */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '850px',
            margin: '0 auto 2.5rem auto',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            fontSize: '0.86rem',
            color: 'var(--text-secondary)',
          }}
        >
          <Info size={20} className="text-cyan-400" style={{ flexShrink: 0 }} />
          <span>
            <strong>Note:</strong> Photos and captions can be customized or replaced with your actual college fest photos by editing <code style={{ color: '#38bdf8' }}>src/data/galleryData.js</code> and placing images into <code style={{ color: '#38bdf8' }}>public/assets/gallery/</code>.
          </span>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3rem',
          }}
        >
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  backgroundColor: isActive
                    ? 'rgba(0, 212, 255, 0.2)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isActive
                    ? '1px solid #00d4ff'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#00d4ff' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Responsive Image Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filteredImages.map((item, index) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
              onClick={() => setActiveImageIndex(index)}
            >
              {/* Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '62%', // 16:10 Aspect Ratio
                  backgroundColor: '#070c1d',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Hover Eye Overlay Icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(6, 9, 19, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <Maximize2 size={16} />
                </div>

                {/* Badge */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span className="badge badge-cyan">{item.tag}</span>
                </div>
              </div>

              {/* Caption */}
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.35rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {item.caption}
                </p>
                <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginTop: '0.75rem', fontWeight: 600 }}>
                  {item.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            LIGHTBOX MODAL
            ========================================================================= */}
        {activeImageIndex !== null && filteredImages[activeImageIndex] && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(3, 6, 15, 0.94)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Lightbox Container */}
            <div
              style={{
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(11, 19, 43, 0.95)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 212, 255, 0.25)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 10,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Close image modal"
              >
                <X size={20} />
              </button>

              {/* Large Image */}
              <div
                style={{
                  width: '100%',
                  maxHeight: '62vh',
                  backgroundColor: '#040711',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={filteredImages[activeImageIndex].image}
                  alt={filteredImages[activeImageIndex].title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '62vh',
                    objectFit: 'contain',
                  }}
                />

                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Lightbox Footer Details */}
              <div
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  backgroundColor: '#091024',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="badge badge-cyan">
                    {filteredImages[activeImageIndex].tag}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {activeImageIndex + 1} of {filteredImages.length}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                  {filteredImages[activeImageIndex].title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {filteredImages[activeImageIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
