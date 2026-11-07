import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FestProvider } from './context/FestContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TechBackground from './components/TechBackground';
import ScrollToTop from './components/ScrollToTop';
import PageBackgroundAnimation from './components/PageBackgroundAnimation';
import PageTransition from './components/PageTransition';
import RobotFollower from './components/RobotFollower';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Registration from './pages/Registration';
import Schedule from './pages/Schedule';
import Gallery from './pages/Gallery';
import Announcements from './pages/Announcements';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <FestProvider>
      <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Background Interactive Tech Canvas & Grid Overlay */}
        <TechBackground />
        <div className="cyber-grid-overlay" />

        {/* Cute Interactive Robot Cursor Companion */}
        <RobotFollower />

        {/* Navigation Bar (Public Only - Admin is never visible to participants) */}
        <Navbar />

        {/* Scroll restoration helper */}
        <ScrollToTop />

        {/* Page Content Viewport */}
        <main style={{ flexGrow: 1, position: 'relative' }}>
          {/* Simple, gorgeous ambient animation on all secondary pages (Home page untouched) */}
          {!isHomePage && <PageBackgroundAnimation />}

          <Routes location={location} key={location.pathname}>
            {/* First Page (Home) is untouched */}
            <Route path="/" element={<Home />} />

            {/* Secondary Pages wrapped with smooth entrance animation */}
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
            <Route path="/events/:eventId" element={<PageTransition><EventDetails /></PageTransition>} />
            <Route path="/registration" element={<PageTransition><Registration /></PageTransition>} />
            {/* Schedule redirected to events */}
            <Route path="/schedule" element={<Navigate to="/events" replace />} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/announcements" element={<PageTransition><Announcements /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            {/* Secret Passcode-Protected Admin Portal */}
            <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </main>

        {/* Reusable Footer (Hidden on Home page so the opening portal stays crisp and scroll-free) */}
        {!isHomePage && <Footer />}
      </div>
    </FestProvider>
  );
}

