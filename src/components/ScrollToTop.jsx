import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

/**
 * ScrollToTop Component
 * 1. Resets scroll position to (0, 0) upon route change.
 * 2. Provides a floating button to smoothly scroll to top.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top automatically when navigating between pages
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Track scroll position to show/hide the floating button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 90,
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        backgroundColor: 'rgba(11, 19, 43, 0.85)',
        border: '1px solid rgba(56, 189, 248, 0.5)',
        boxShadow: '0 4px 20px rgba(0, 212, 255, 0.35)',
        color: '#38bdf8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#0284c7';
        e.currentTarget.style.color = '#ffffff';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 212, 255, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(11, 19, 43, 0.85)';
        e.currentTarget.style.color = '#38bdf8';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.35)';
      }}
    >
      <ChevronUp size={22} />
    </button>
  );
}

