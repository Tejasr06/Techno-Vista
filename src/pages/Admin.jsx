import React, { useState, useEffect } from 'react';
import { useFest } from '../context/FestContext';
import {
  Lock,
  Unlock,
  KeyRound,
  Save,
  RotateCcw,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  Download,
  AlertCircle,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Layers,
  Bell,
  Trash2,
  Plus,
  Users,
  ShieldCheck,
  CheckCircle2,
  Link as LinkIcon,
} from 'lucide-react';

const ADMIN_PIN_DEFAULT = 'ise2026';

export default function Admin() {
  const {
    googleFormUrl,
    festData,
    eventsData,
    scheduleData,
    announcementsData,
    contactData,
    updateGoogleFormUrl,
    updateFestData,
    updateEvent,
    updateSchedule,
    addAnnouncement,
    deleteAnnouncement,
    updateContactData,
    resetToDefaults,
  } = useFest();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('techno_vista_admin_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('qr'); // 'qr', 'core', 'events', 'schedule', 'announcements', 'contact'

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Form Editing Local States
  const [formUrlInput, setFormUrlInput] = useState(googleFormUrl);
  const [festForm, setFestForm] = useState({
    dateText: festData.dateText,
    timeText: festData.timeText,
    reportingTime: festData.reportingTime,
    venue: festData.venue,
    tagline: festData.tagline,
  });

  // Event editing state
  const [selectedEventId, setSelectedEventId] = useState(eventsData[0]?.id || 'intelli-talks');
  const currentEvent = eventsData.find((e) => e.id === selectedEventId) || eventsData[0];
  const [eventEditForm, setEventEditForm] = useState(currentEvent);

  useEffect(() => {
    const ev = eventsData.find((e) => e.id === selectedEventId);
    if (ev) setEventEditForm(ev);
  }, [selectedEventId, eventsData]);

  // Announcement Form State
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnSummary, setNewAnnSummary] = useState('');
  const [newAnnBadge, setNewAnnBadge] = useState('Important');

  // Trigger Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Auth Submit
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (enteredPin === ADMIN_PIN_DEFAULT) {
      setIsAuthenticated(true);
      sessionStorage.setItem('techno_vista_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Incorrect Admin Passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('techno_vista_admin_auth');
    setEnteredPin('');
  };

  // Participant Portal URL & QR URLs
  const participantSiteUrl = window.location.origin;
  const qrTarget = activeTab === 'qr_form' ? googleFormUrl : participantSiteUrl;
  const qrDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
    participantSiteUrl
  )}&bgcolor=ffffff&color=070b19&margin=15`;
  const qrGoogleFormUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
    googleFormUrl
  )}&bgcolor=ffffff&color=070b19&margin=15`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    showToast('Participant link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Save Core Fest Settings
  const handleSaveCore = (e) => {
    e.preventDefault();
    updateGoogleFormUrl(formUrlInput);
    updateFestData(festForm);
    showToast('Core fest details & Google Form link updated successfully!');
  };

  // Save Event Details
  const handleSaveEvent = (e) => {
    e.preventDefault();
    updateEvent(selectedEventId, eventEditForm);
    showToast(`Saved updates for ${eventEditForm.name}!`);
  };

  // Add Announcement
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnTitle.trim()) return;
    const newEntry = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      date: 'Live Notice',
      badge: newAnnBadge,
      isPinned: true,
      summary: newAnnSummary,
      actionText: 'Register Online',
      actionLink: '/registration',
    };
    addAnnouncement(newEntry);
    setNewAnnTitle('');
    setNewAnnSummary('');
    showToast('New announcement published to Notice Board!');
  };

  // =========================================================================
  // PASSCODE LOCK SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 150px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
        }}
      >
        <div
          className="glass-card"
          style={{
            maxWidth: '440px',
            width: '100%',
            padding: '2.5rem',
            textAlign: 'center',
            border: '1px solid rgba(0, 212, 255, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 212, 255, 0.2)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(0, 212, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              color: '#00d4ff',
            }}
          >
            <Lock size={26} />
          </div>

          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.4rem' }}>
            Organizer Access
          </h2>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Enter the department administrator passcode to configure fest information and generate participant QR passes.
          </p>

          <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Enter Passcode (Default: ise2026)"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  textAlign: 'center',
                  letterSpacing: '0.2em',
                  outline: 'none',
                }}
                autoFocus
              />
            </div>

            {pinError && (
              <div style={{ color: '#f87171', fontSize: '0.84rem' }}>
                {pinError}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              <span>Unlock Admin Panel</span>
              <Unlock size={16} />
            </button>
          </form>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.65rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              fontSize: '0.78rem',
              color: '#94a3b8',
            }}
          >
            🔒 Default Administrator PIN: <code style={{ color: '#00d4ff' }}>ise2026</code>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // ADMIN DASHBOARD
  // =========================================================================
  return (
    <div style={{ padding: '2.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Toast Alert Notification */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '90px',
              right: '2rem',
              zIndex: 9999,
              backgroundColor: '#0c2e26',
              border: '1px solid #10b981',
              color: '#a7f3d0',
              padding: '0.85rem 1.4rem',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dashboard Top Header */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem 2rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            border: '1px solid rgba(0, 212, 255, 0.35)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="badge badge-cyan">ADMIN PORTAL</span>
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>● Active Session</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', color: '#ffffff', marginTop: '0.35rem' }}>
              TECHNO VISTA 2K26 Control Center
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Manage fest rules, Google Form links, schedules, and generate participant QR passes.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => {
                if (window.confirm('Reset all details to default settings?')) {
                  resetToDefaults();
                  showToast('Reset all details to defaults!');
                }
              }}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                fontSize: '0.84rem',
                cursor: 'pointer',
              }}
            >
              Lock &amp; Exit
            </button>
          </div>
        </div>

        {/* Navigation Tabs for Admin */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '1rem',
          }}
        >
          {[
            { id: 'qr', label: 'Participant QR & Links', icon: QrCode },
            { id: 'core', label: 'Fest Info & Google Form', icon: Sparkles },
            { id: 'events', label: 'Manage 6 Events', icon: Layers },
            { id: 'schedule', label: 'Timeline & Venues', icon: Calendar },
            { id: 'announcements', label: 'Notice Board', icon: Bell },
            { id: 'contact', label: 'Coordinators', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  backgroundColor: isActive ? 'rgba(0, 212, 255, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                  border: isActive ? '1px solid #00d4ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#00d4ff' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: PARTICIPANT QR & LINK GENERATOR (MAIN REQUESTED FEATURE)
            ========================================================================= */}
        {activeTab === 'qr' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div
              className="glass-card"
              style={{
                padding: '2.5rem',
                border: '1px solid rgba(0, 212, 255, 0.35)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#00d4ff', marginBottom: '0.5rem' }}>
                <QrCode size={22} />
                <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>
                  Official Participant QR Codes &amp; Share Links
                </h2>
              </div>

              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                These high-resolution QR codes and direct links lead participants to the <strong>public website and registration form only</strong>. Participants will never see the admin panel. Use these QR codes on your fest posters, banners, ID cards, and social media flyers.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'stretch',
                }}
              >
                {/* QR Code 1: Participant Website */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                  }}
                >
                  <span className="badge badge-cyan" style={{ marginBottom: '1rem' }}>
                    FOR POSTERS &amp; BROCHURES
                  </span>

                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                    Participant Fest Portal QR
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                    Scans directly to the public TECHNO VISTA 2K26 website.
                  </p>

                  <div
                    style={{
                      padding: '0.9rem',
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <img
                      src={qrDownloadUrl}
                      alt="Website Participant QR Code"
                      style={{ width: '180px', height: '180px', display: 'block' }}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: '#38bdf8',
                      marginBottom: '1.25rem',
                      wordBreak: 'break-all',
                      background: 'rgba(0,0,0,0.3)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      width: '100%',
                    }}
                  >
                    {participantSiteUrl}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', width: '100%' }}>
                    <button
                      onClick={() => copyToClipboard(participantSiteUrl)}
                      className="btn-secondary"
                      style={{ padding: '0.6rem', fontSize: '0.82rem' }}
                    >
                      <Copy size={14} />
                      <span>Copy Link</span>
                    </button>

                    <a
                      href={qrDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="TECHNO_VISTA_2K26_Website_QR.png"
                      className="btn-primary"
                      style={{ padding: '0.6rem', fontSize: '0.82rem' }}
                    >
                      <Download size={14} />
                      <span>Download QR</span>
                    </a>
                  </div>
                </div>

                {/* QR Code 2: Direct Google Form QR */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                  }}
                >
                  <span className="badge badge-purple" style={{ marginBottom: '1rem' }}>
                    DIRECT REGISTRATION
                  </span>

                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                    Google Form Registration QR
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                    Scans directly to your configured Google Form.
                  </p>

                  <div
                    style={{
                      padding: '0.9rem',
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      boxShadow: '0 8px 25px rgba(168, 85, 247, 0.3)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <img
                      src={qrGoogleFormUrl}
                      alt="Google Form Registration QR Code"
                      style={{ width: '180px', height: '180px', display: 'block' }}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: '#c084fc',
                      marginBottom: '1.25rem',
                      wordBreak: 'break-all',
                      background: 'rgba(0,0,0,0.3)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      width: '100%',
                    }}
                  >
                    {googleFormUrl}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', width: '100%' }}>
                    <button
                      onClick={() => copyToClipboard(googleFormUrl)}
                      className="btn-secondary"
                      style={{ padding: '0.6rem', fontSize: '0.82rem' }}
                    >
                      <Copy size={14} />
                      <span>Copy Link</span>
                    </button>

                    <a
                      href={qrGoogleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="TECHNO_VISTA_2K26_Google_Form_QR.png"
                      className="btn-primary"
                      style={{ padding: '0.6rem', fontSize: '0.82rem' }}
                    >
                      <Download size={14} />
                      <span>Download QR</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: CORE FEST & GOOGLE FORM
            ========================================================================= */}
        {activeTab === 'core' && (
          <form onSubmit={handleSaveCore} className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              Core Fest Configuration &amp; Google Form URL
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Google Form Link */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', color: '#38bdf8', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Centralized Google Form Link (Every 'Register Now' button uses this URL)
                </label>
                <input
                  type="url"
                  value={formUrlInput}
                  onChange={(e) => setFormUrlInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              {/* Fest Tagline */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Fest Tagline
                </label>
                <input
                  type="text"
                  value={festForm.tagline}
                  onChange={(e) => setFestForm({ ...festForm, tagline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Grid 2 Columns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Event Date Text
                  </label>
                  <input
                    type="text"
                    value={festForm.dateText}
                    onChange={(e) => setFestForm({ ...festForm, dateText: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Event Time
                  </label>
                  <input
                    type="text"
                    value={festForm.timeText}
                    onChange={(e) => setFestForm({ ...festForm, timeText: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Reporting Time Window
                  </label>
                  <input
                    type="text"
                    value={festForm.reportingTime}
                    onChange={(e) => setFestForm({ ...festForm, reportingTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Primary Venue
                  </label>
                  <input
                    type="text"
                    value={festForm.venue}
                    onChange={(e) => setFestForm({ ...festForm, venue: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.85rem 2.2rem', marginTop: '1rem' }}>
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            TAB 3: MANAGE 6 EVENTS
            ========================================================================= */}
        {activeTab === 'events' && (
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '1.25rem' }}>
              Edit Event Rules, Timings &amp; Coordinators
            </h2>

            {/* Event Selector Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {eventsData.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEventId(ev.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    backgroundColor: selectedEventId === ev.id ? '#00d4ff' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedEventId === ev.id ? '#070b19' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {ev.name}
                </button>
              ))}
            </div>

            {/* Event Edit Form */}
            {eventEditForm && (
              <form onSubmit={handleSaveEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                      Event Timing
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.timing}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, timing: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                      Venue / Lab
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.venue}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, venue: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                      Team Size
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.teamSize}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, teamSize: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Eligibility
                  </label>
                  <input
                    type="text"
                    value={eventEditForm.eligibility}
                    onChange={(e) => setEventEditForm({ ...eventEditForm, eligibility: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Overview Description
                  </label>
                  <textarea
                    rows={4}
                    value={eventEditForm.overview}
                    onChange={(e) => setEventEditForm({ ...eventEditForm, overview: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.8rem 2rem' }}>
                  <Save size={16} />
                  <span>Save {eventEditForm.name} Details</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 4: TIMELINE & SCHEDULE
            ========================================================================= */}
        {activeTab === 'schedule' && (
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              Fest Day Schedule Slots
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {scheduleData.timeline.map((slot, index) => (
                <div
                  key={slot.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <div style={{ color: '#00d4ff', fontWeight: 700, fontSize: '0.85rem' }}>
                      {slot.time}
                    </div>
                    <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.05rem', margin: '0.2rem 0' }}>
                      {slot.title}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      📍 {slot.venue}
                    </div>
                  </div>
                  <span className="badge badge-cyan">{slot.badge || slot.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: NOTICE BOARD / ANNOUNCEMENTS
            ========================================================================= */}
        {activeTab === 'announcements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Create Announcement Form */}
            <form onSubmit={handleAddAnnouncement} className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1.2rem' }}>
                Post New Live Announcement
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Notice Title (e.g. Workshop Room Change / Spot Registration Status)"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                  required
                />

                <textarea
                  rows={3}
                  placeholder="Summary / Instructions for participants..."
                  value={newAnnSummary}
                  onChange={(e) => setNewAnnSummary(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontFamily: 'inherit',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <select
                    value={newAnnBadge}
                    onChange={(e) => setNewAnnBadge(e.target.value)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#0a1024',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                    }}
                  >
                    <option value="Important">Important</option>
                    <option value="Registration">Registration</option>
                    <option value="Update">Update</option>
                    <option value="Schedule">Schedule</option>
                  </select>

                  <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.8rem' }}>
                    <Plus size={16} />
                    <span>Publish Announcement</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Current Announcements List */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1rem' }}>
                Current Published Notices
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {announcementsData.map((ann) => (
                  <div
                    key={ann.id}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>
                        {ann.badge}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', color: '#ffffff' }}>{ann.title}</h4>
                      <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>{ann.summary}</p>
                    </div>

                    <button
                      onClick={() => {
                        deleteAnnouncement(ann.id);
                        showToast('Notice removed!');
                      }}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        cursor: 'pointer',
                      }}
                      title="Delete Announcement"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: COORDINATORS & CONTACTS
            ========================================================================= */}
        {activeTab === 'contact' && (
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              Faculty &amp; Student Coordinators
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {contactData.facultyCoordinators.map((fac, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <span className="badge badge-cyan">{fac.role}</span>
                  <h4 style={{ fontSize: '1.1rem', color: '#ffffff', margin: '0.5rem 0' }}>{fac.name}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{fac.designation}</div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.5rem' }}>📞 {fac.phone}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
