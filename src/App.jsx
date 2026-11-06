import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FestProvider } from './context/FestContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TechBackground from './components/TechBackground';
import ScrollToTop from './components/ScrollToTop';

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

        {/* Navigation Bar (Public Only - Admin is never visible to participants) */}
        <Navbar />

        {/* Scroll restoration helper */}
        <ScrollToTop />

        {/* Page Content Viewport */}
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/contact" element={<Contact />} />
            {/* Secret Passcode-Protected Admin Portal */}
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Reusable Footer (Hidden on Home page so the opening portal stays crisp and scroll-free) */}
        {!isHomePage && <Footer />}
      </div>
    </FestProvider>
  );
}

