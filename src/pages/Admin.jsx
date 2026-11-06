import React, { useState, useEffect } from 'react';
import { useFest } from '../context/FestContext';
import {
  Lock,
  ShieldCheck,
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Sparkles,
  QrCode,
  Calendar,
  Layers,
  Bell,
  Users,
  Copy,
  Download,
  AlertTriangle,
  Info,
  MapPin,
  Clock,
  Phone,
  Mail,
  Building2,
  FileText,
  X,
} from 'lucide-react';

const ADMIN_PIN_DEFAULT = '$TechnoVista@2k26';

export default function Admin() {
  const {
    googleFormUrl,
    festData,
    eventsData,
    announcementsData,
    contactData,
    updateGoogleFormUrl,
    updateFestData,
    updateEvent,
    addEvent,
    deleteEvent,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    updateContactData,
    addFacultyCoordinator,
    updateFacultyCoordinator,
    deleteFacultyCoordinator,
    addStudentCoordinator,
    updateStudentCoordinator,
    deleteStudentCoordinator,
    resetToDefaults,
  } = useFest();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('techno_vista_admin_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab: 'core' | 'events' | 'announcements' | 'coordinators' | 'qr'
  const [activeTab, setActiveTab] = useState('events');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

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
      showToast('Admin authenticated successfully');
    } else {
      setPinError('Incorrect Admin Passcode. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('techno_vista_admin_auth');
    setEnteredPin('');
  };

  // =========================================================================
  // TAB 1: CORE FEST FORM STATE
  // =========================================================================
  const [coreForm, setCoreForm] = useState({
    name: festData.name,
    edition: festData.edition,
    tagline: festData.tagline,
    college: festData.college,
    organizedBy: festData.organizedBy,
    dateText: festData.dateText,
    timeText: festData.timeText,
    reportingTime: festData.reportingTime,
    venue: festData.venue,
    location: festData.location,
    googleFormUrl: googleFormUrl,
    aboutFestTitle: festData.aboutFest?.title || 'About TECHNO VISTA 2K26',
    aboutFestSubtitle: festData.aboutFest?.subtitle || '',
    aboutFestDesc: festData.aboutFest?.description?.join('\n\n') || '',
    mission: festData.aboutFest?.mission || '',
  });

  useEffect(() => {
    setCoreForm({
      name: festData.name,
      edition: festData.edition,
      tagline: festData.tagline,
      college: festData.college,
      organizedBy: festData.organizedBy,
      dateText: festData.dateText,
      timeText: festData.timeText,
      reportingTime: festData.reportingTime,
      venue: festData.venue,
      location: festData.location,
      googleFormUrl: googleFormUrl,
      aboutFestTitle: festData.aboutFest?.title || '',
      aboutFestSubtitle: festData.aboutFest?.subtitle || '',
      aboutFestDesc: festData.aboutFest?.description?.join('\n\n') || '',
      mission: festData.aboutFest?.mission || '',
    });
  }, [festData, googleFormUrl]);

  const handleSaveCore = (e) => {
    e.preventDefault();
    updateGoogleFormUrl(coreForm.googleFormUrl);
    updateFestData({
      name: coreForm.name,
      edition: coreForm.edition,
      tagline: coreForm.tagline,
      college: coreForm.college,
      organizedBy: coreForm.organizedBy,
      dateText: coreForm.dateText,
      timeText: coreForm.timeText,
      reportingTime: coreForm.reportingTime,
      venue: coreForm.venue,
      location: coreForm.location,
      aboutFest: {
        ...festData.aboutFest,
        title: coreForm.aboutFestTitle,
        subtitle: coreForm.aboutFestSubtitle,
        description: coreForm.aboutFestDesc.split('\n\n').filter((p) => p.trim()),
        mission: coreForm.mission,
      },
    });
    showToast('✓ Core fest text & Google Form updated across website!');
  };

  // =========================================================================
  // TAB 2: EVENTS STATE & OPERATIONS (FULL CRUD)
  // =========================================================================
  const [selectedEventId, setSelectedEventId] = useState(eventsData[0]?.id || '');
  const [eventEditForm, setEventEditForm] = useState(null);
  const [newRuleInput, setNewRuleInput] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // New Event Blank Template
  const blankEvent = {
    id: `event-${Date.now()}`,
    name: 'New Technical Arena',
    subtitle: 'Event Subtitle',
    category: 'Competitive Programming',
    badge: 'Flagship',
    accentColor: '#00d4ff',
    image: '/assets/events/code-sprint.svg',
    shortDescription: 'Short summary displayed on cards across the event grid.',
    overview: 'Full comprehensive description displayed on the dedicated event page.',
    timing: '10:30 AM - 01:00 PM',
    venue: 'Computer Science Lab 3',
    teamSize: '1 to 2 Members',
    eligibility: 'Open to all engineering students with valid College ID.',
    registrationFee: 'Free Registration via Google Form',
    prizes: {
      first: 'Cash Prize + Certificate of Excellence',
      second: 'Runner-up Cash Prize + Trophy',
      perks: 'Participation Certificates for all attendees',
    },
    rules: [
      'Original work only; plagiarism leads to immediate disqualification.',
      'Participants must bring college ID cards on the fest day.',
    ],
    rounds: [
      {
        roundNumber: 'Round 1',
        title: 'Qualifying Challenge',
        description: 'Timed assessment testing core technical understanding and speed.',
      },
    ],
    coordinators: [
      {
        name: 'Student Lead',
        role: 'Event Head',
        phone: '+91 98765 43210',
      },
    ],
  };

  useEffect(() => {
    const current = eventsData.find((e) => e.id === selectedEventId) || eventsData[0];
    if (current) {
      setEventEditForm(JSON.parse(JSON.stringify(current)));
      setSelectedEventId(current.id);
    } else {
      setEventEditForm(null);
    }
  }, [selectedEventId, eventsData]);

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventEditForm) return;
    updateEvent(eventEditForm.id, eventEditForm);
    showToast(`✓ Saved changes for "${eventEditForm.name}"!`);
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    addEvent(eventEditForm);
    setIsAddingEvent(false);
    setSelectedEventId(eventEditForm.id);
    showToast(`✓ Created new event "${eventEditForm.name}"!`);
  };

  const handleDeleteCurrentEvent = () => {
    if (!eventEditForm) return;
    if (eventsData.length <= 1) {
      alert('You must have at least one event in the catalogue.');
      return;
    }
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${eventEditForm.name}"? This will remove it from all participant pages.`
    );
    if (confirmDelete) {
      deleteEvent(eventEditForm.id);
      const remaining = eventsData.filter((ev) => ev.id !== eventEditForm.id);
      if (remaining.length > 0) {
        setSelectedEventId(remaining[0].id);
      }
      showToast(`Deleted event "${eventEditForm.name}".`);
    }
  };

  // Rule Helpers
  const handleAddRule = () => {
    if (!newRuleInput.trim() || !eventEditForm) return;
    setEventEditForm({
      ...eventEditForm,
      rules: [...(eventEditForm.rules || []), newRuleInput.trim()],
    });
    setNewRuleInput('');
  };

  const handleDeleteRule = (index) => {
    if (!eventEditForm) return;
    setEventEditForm({
      ...eventEditForm,
      rules: eventEditForm.rules.filter((_, idx) => idx !== index),
    });
  };

  // Round Helpers
  const handleAddRound = () => {
    if (!eventEditForm) return;
    const newRound = {
      roundNumber: `Round ${(eventEditForm.rounds?.length || 0) + 1}`,
      title: 'New Round Title',
      description: 'Round description and format details.',
    };
    setEventEditForm({
      ...eventEditForm,
      rounds: [...(eventEditForm.rounds || []), newRound],
    });
  };

  const handleDeleteRound = (index) => {
    if (!eventEditForm) return;
    setEventEditForm({
      ...eventEditForm,
      rounds: eventEditForm.rounds.filter((_, idx) => idx !== index),
    });
  };

  // =========================================================================
  // TAB 3: ANNOUNCEMENTS STATE (FULL CRUD)
  // =========================================================================
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnSummary, setNewAnnSummary] = useState('');
  const [newAnnBadge, setNewAnnBadge] = useState('Important');
  const [editingAnnId, setEditingAnnId] = useState(null);
  const [annEditForm, setAnnEditForm] = useState(null);

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnSummary.trim()) return;
    const item = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      summary: newAnnSummary.trim(),
      badge: newAnnBadge,
      date: 'Live Just Now',
      isPinned: true,
    };
    addAnnouncement(item);
    setNewAnnTitle('');
    setNewAnnSummary('');
    showToast('✓ New announcement published to Notice Board!');
  };

  const handleSaveAnnEdit = (e) => {
    e.preventDefault();
    if (!annEditForm) return;
    updateAnnouncement(annEditForm.id, annEditForm);
    setEditingAnnId(null);
    setAnnEditForm(null);
    showToast('✓ Announcement updated successfully!');
  };

  // =========================================================================
  // TAB 4: COORDINATORS & CONTACTS STATE
  // =========================================================================
  const [contactGeneralForm, setContactGeneralForm] = useState({
    helplinePhone: contactData.generalContact?.helplinePhone || '',
    alternatePhone: contactData.generalContact?.alternatePhone || '',
    officialEmail: contactData.generalContact?.officialEmail || '',
    festSupportEmail: contactData.generalContact?.festSupportEmail || '',
    instagram: contactData.socialLinks?.instagram || '',
    linkedin: contactData.socialLinks?.linkedin || '',
    collegeWebsite: contactData.socialLinks?.collegeWebsite || '',
  });

  const handleSaveContactGeneral = (e) => {
    e.preventDefault();
    updateContactData({
      generalContact: {
        ...contactData.generalContact,
        helplinePhone: contactGeneralForm.helplinePhone,
        alternatePhone: contactGeneralForm.alternatePhone,
        officialEmail: contactGeneralForm.officialEmail,
        festSupportEmail: contactGeneralForm.festSupportEmail,
      },
      socialLinks: {
        ...contactData.socialLinks,
        instagram: contactGeneralForm.instagram,
        linkedin: contactGeneralForm.linkedin,
        collegeWebsite: contactGeneralForm.collegeWebsite,
      },
    });
    showToast('✓ Contact & social links updated!');
  };

  // Participant Portal URL & QR URLs
  const participantSiteUrl = window.location.origin;
  const qrDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
    participantSiteUrl
  )}&bgcolor=ffffff&color=070b19&margin=15`;
  const qrGoogleFormUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
    googleFormUrl
  )}&bgcolor=ffffff&color=070b19&margin=15`;

  // =========================================================================
  // AUTHENTICATION GUARD SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '80vh',
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
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 212, 255, 0.15)',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.2))',
              border: '1px solid rgba(0, 212, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <Lock size={28} style={{ color: '#00d4ff' }} />
          </div>

          <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 800 }}>
            Techno Vista Admin Panel
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Authorized ISE Faculty &amp; Student Conveners Only
          </p>

          <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={enteredPin}
              onChange={(e) => {
                setEnteredPin(e.target.value);
                setPinError('');
              }}
              autoFocus
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: pinError ? '1px solid #ef4444' : '1px solid rgba(0, 212, 255, 0.3)',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                textAlign: 'center',
              }}
            />

            {pinError && (
              <span style={{ fontSize: '0.82rem', color: '#f87171' }}>
                {pinError}
              </span>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.85rem', width: '100%', justifyContent: 'center' }}
            >
              <ShieldCheck size={18} />
              <span>Unlock Admin Panel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN AUTHENTICATED ADMIN CONSOLE
  // =========================================================================
  return (
    <div style={{ padding: '2.5rem 0 6rem 0', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '90px',
              right: '25px',
              zIndex: 9999,
              backgroundColor: '#061a2b',
              border: '1px solid #00f0ff',
              boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)',
              padding: '0.85rem 1.4rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#ffffff',
              fontSize: '0.92rem',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={18} style={{ color: '#00f0ff' }} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header & Security Status */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            paddingBottom: '1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(0, 212, 255, 0.15)',
                  border: '1px solid rgba(0, 212, 255, 0.4)',
                  fontSize: '0.75rem',
                  color: '#00d4ff',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                <ShieldCheck size={12} />
                ORGANIZER PORTAL // ACTIVE
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#ffffff' }}>
              Master Admin Control Center
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Edit, add, or delete any content on the participant portal. All changes update instantly.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => {
                if (window.confirm('Reset all website data to initial factory defaults?')) {
                  resetToDefaults();
                  showToast('All fest data reset to defaults.');
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#f87171',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <Lock size={14} />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1rem',
          }}
        >
          {[
            { id: 'events', label: '1. Events Catalog (A-Z Edit & Delete)', icon: Layers },
            { id: 'core', label: '2. Fest Info & Registration URL', icon: Sparkles },
            { id: 'announcements', label: '3. Notice Board & Updates', icon: Bell },
            { id: 'coordinators', label: '4. Coordinators & Contacts', icon: Users },
            { id: 'qr', label: '5. Participant QR & Flyers', icon: QrCode },
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
                  gap: '0.55rem',
                  padding: '0.7rem 1.3rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  backgroundColor: isActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.03)',
                  border: isActive ? '1px solid #00d4ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#050914' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 16px rgba(0, 212, 255, 0.4)' : 'none',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: MANAGE EVENTS (FULL CRUD: ADD, EDIT ALL, DELETE)
            ========================================================================= */}
        {activeTab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Action Bar: Event Selectors & Add New Event Button */}
            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700, textTransform: 'uppercase' }}>
                  ACTIVE EVENTS IN CATALOGUE ({eventsData.length})
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.6rem' }}>
                  {eventsData.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => {
                        setIsAddingEvent(false);
                        setSelectedEventId(ev.id);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        backgroundColor:
                          !isAddingEvent && selectedEventId === ev.id ? '#00d4ff' : 'rgba(255, 255, 255, 0.05)',
                        color: !isAddingEvent && selectedEventId === ev.id ? '#050914' : '#cbd5e1',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {ev.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setEventEditForm(JSON.parse(JSON.stringify(blankEvent)));
                  setIsAddingEvent(true);
                }}
                className="btn-primary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.86rem' }}
              >
                <Plus size={16} />
                <span>+ Add New Event</span>
              </button>
            </div>

            {/* Event Edit / Create Form */}
            {eventEditForm && (
              <form
                onSubmit={isAddingEvent ? handleCreateEvent : handleSaveEvent}
                className="glass-card"
                style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  border: isAddingEvent
                    ? '1px solid #10b981'
                    : '1px solid rgba(0, 212, 255, 0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        backgroundColor: isAddingEvent ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 212, 255, 0.15)',
                        color: isAddingEvent ? '#10b981' : '#00d4ff',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                      }}
                    >
                      {isAddingEvent ? 'CREATE NEW EVENT' : `EDITING: ${eventEditForm.name.toUpperCase()}`}
                    </div>
                  </div>

                  {!isAddingEvent && (
                    <button
                      type="button"
                      onClick={handleDeleteCurrentEvent}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 0.9rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete This Event</span>
                    </button>
                  )}
                </div>

                {/* Section 1: Basic Event Details */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.5rem' }}>
                    1. Identity &amp; Descriptions
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Event Name (Title)
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.name}
                        onChange={(e) => setEventEditForm({ ...eventEditForm, name: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Subtitle / Tagline
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.subtitle || ''}
                        onChange={(e) => setEventEditForm({ ...eventEditForm, subtitle: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Category
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.category || ''}
                        onChange={(e) => setEventEditForm({ ...eventEditForm, category: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Badge Label (e.g. Flagship, Esports Arena)
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.badge || ''}
                        onChange={(e) => setEventEditForm({ ...eventEditForm, badge: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Short Card Summary (Displayed on Events Grid)
                    </label>
                    <textarea
                      rows={2}
                      value={eventEditForm.shortDescription || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, shortDescription: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Full Comprehensive Overview Description (Displayed on Event Details Page)
                    </label>
                    <textarea
                      rows={4}
                      value={eventEditForm.overview || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, overview: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>

                {/* Section 2: Logistics & Schedule */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.5rem' }}>
                    2. Logistics &amp; Constraints
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Session Timing
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.timing || ''}
                        onChange={(e) => setEventEditForm({ ...eventEditForm, timing: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Venue / Lab Location
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.venue || ''}
                        onChange={(e) => setEventEditForm({ ...eventEditForm, venue: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Team Size
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.teamSize || ''}
                        onChange={(e) => setEventEditForm({ ...eventEditForm, teamSize: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Eligibility
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.eligibility || ''}
                        onChange={(e) => setEventEditForm({ ...eventEditForm, eligibility: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Prizes & Rewards */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.5rem' }}>
                    3. Prizes &amp; Rewards
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#00d4ff', marginBottom: '0.4rem', fontWeight: 700 }}>
                        1st Prize Award
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.prizes?.first || ''}
                        onChange={(e) =>
                          setEventEditForm({
                            ...eventEditForm,
                            prizes: { ...eventEditForm.prizes, first: e.target.value },
                          })
                        }
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#ffffff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#a78bfa', marginBottom: '0.4rem', fontWeight: 700 }}>
                        2nd Prize Award
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.prizes?.second || ''}
                        onChange={(e) =>
                          setEventEditForm({
                            ...eventEditForm,
                            prizes: { ...eventEditForm.prizes, second: e.target.value },
                          })
                        }
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#ffffff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                        Certificates / Other Perks
                      </label>
                      <input
                        type="text"
                        value={eventEditForm.prizes?.perks || ''}
                        onChange={(e) =>
                          setEventEditForm({
                            ...eventEditForm,
                            prizes: { ...eventEditForm.prizes, perks: e.target.value },
                          })
                        }
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Rules List Editor */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.5rem' }}>
                    4. Official Event Rules
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                    {(eventEditForm.rules || []).map((rule, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.65rem 1rem',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700 }}>#{idx + 1}</span>
                        <span style={{ fontSize: '0.88rem', color: '#cbd5e1', flexGrow: 1 }}>{rule}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteRule(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#f87171',
                            cursor: 'pointer',
                            padding: '4px',
                          }}
                          title="Delete this rule"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Type a new event rule and click Add..."
                      value={newRuleInput}
                      onChange={(e) => setNewRuleInput(e.target.value)}
                      style={{ flexGrow: 1, padding: '0.75rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddRule}
                      className="btn-secondary"
                      style={{ padding: '0.75rem 1.25rem' }}
                    >
                      <Plus size={16} />
                      <span>Add Rule</span>
                    </button>
                  </div>
                </div>

                {/* Section 5: Rounds Manager */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                      5. Competition Rounds Structure
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddRound}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
                    >
                      <Plus size={14} />
                      <span>Add Round</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(eventEditForm.rounds || []).map((round, rIdx) => (
                      <div
                        key={rIdx}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
                            {round.roundNumber || `Round ${rIdx + 1}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteRound(rIdx)}
                            style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Round Title (e.g. Abstract Screening / Live Code Battle)"
                          value={round.title || ''}
                          onChange={(e) => {
                            const updatedRounds = [...eventEditForm.rounds];
                            updatedRounds[rIdx] = { ...updatedRounds[rIdx], title: e.target.value };
                            setEventEditForm({ ...eventEditForm, rounds: updatedRounds });
                          }}
                          style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                        />

                        <textarea
                          rows={2}
                          placeholder="Round format and guidelines description..."
                          value={round.description || ''}
                          onChange={(e) => {
                            const updatedRounds = [...eventEditForm.rounds];
                            updatedRounds[rIdx] = { ...updatedRounds[rIdx], description: e.target.value };
                            setEventEditForm({ ...eventEditForm, rounds: updatedRounds });
                          }}
                          style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontFamily: 'inherit' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Submit Button */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem' }}
                  >
                    <Save size={16} />
                    <span>{isAddingEvent ? 'Publish New Event' : `Save Changes for ${eventEditForm.name}`}</span>
                  </button>

                  {isAddingEvent && (
                    <button
                      type="button"
                      onClick={() => setIsAddingEvent(false)}
                      className="btn-secondary"
                      style={{ padding: '0.85rem 1.8rem' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: CORE FEST INFO & CENTRAL GOOGLE FORM URL
            ========================================================================= */}
        {activeTab === 'core' && (
          <form onSubmit={handleSaveCore} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 800 }}>
                Core Fest Identity &amp; Central Google Form
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                These texts define the overall symposium branding, hero subtitles, dates, venue, and universal registration link.
              </p>
            </div>

            {/* Centralized Google Form Link */}
            <div style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.35)' }}>
              <label style={{ display: 'block', fontSize: '0.92rem', color: '#00d4ff', fontWeight: 800, marginBottom: '0.5rem' }}>
                Centralized Google Form Link (All 'Register Now' Buttons Across Entire Site Use This)
              </label>
              <input
                type="url"
                value={coreForm.googleFormUrl}
                onChange={(e) => setCoreForm({ ...coreForm, googleFormUrl: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1.2rem',
                  borderRadius: '10px',
                  backgroundColor: '#070f26',
                  border: '1px solid #00d4ff',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  outline: 'none',
                }}
              />
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                Example: https://forms.gle/your-official-form-id
              </span>
            </div>

            {/* Basic Identity */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Fest Title
                </label>
                <input
                  type="text"
                  value={coreForm.name}
                  onChange={(e) => setCoreForm({ ...coreForm, name: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Edition Tag (e.g. 2K26 / 2.0)
                </label>
                <input
                  type="text"
                  value={coreForm.edition}
                  onChange={(e) => setCoreForm({ ...coreForm, edition: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Official Fest Tagline
                </label>
                <input
                  type="text"
                  value={coreForm.tagline}
                  onChange={(e) => setCoreForm({ ...coreForm, tagline: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Organized By Department
                </label>
                <input
                  type="text"
                  value={coreForm.organizedBy}
                  onChange={(e) => setCoreForm({ ...coreForm, organizedBy: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>
            </div>

            {/* Date & Location */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Event Date
                </label>
                <input
                  type="text"
                  value={coreForm.dateText}
                  onChange={(e) => setCoreForm({ ...coreForm, dateText: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Event Time
                </label>
                <input
                  type="text"
                  value={coreForm.timeText}
                  onChange={(e) => setCoreForm({ ...coreForm, timeText: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Participant Reporting Window
                </label>
                <input
                  type="text"
                  value={coreForm.reportingTime}
                  onChange={(e) => setCoreForm({ ...coreForm, reportingTime: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Primary Venue
                </label>
                <input
                  type="text"
                  value={coreForm.venue}
                  onChange={(e) => setCoreForm({ ...coreForm, venue: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>
            </div>

            {/* About & Mission Paragraphs */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                About Fest Overview Paragraph
              </label>
              <textarea
                rows={3}
                value={coreForm.aboutFestDesc}
                onChange={(e) => setCoreForm({ ...coreForm, aboutFestDesc: e.target.value })}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.85rem 2.5rem', alignSelf: 'flex-start' }}
            >
              <Save size={16} />
              <span>Save Core Configuration</span>
            </button>
          </form>
        )}

        {/* =========================================================================
            TAB 3: ANNOUNCEMENTS & LIVE NOTICE BOARD (FULL CRUD)
            ========================================================================= */}
        {activeTab === 'announcements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Create Announcement Form */}
            <form onSubmit={handleCreateAnnouncement} className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1.25rem' }}>
                Publish New Notice or Live Update
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Announcement Title (e.g. Round 1 Results Announced)..."
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    required
                    style={{ padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />

                  <select
                    value={newAnnBadge}
                    onChange={(e) => setNewAnnBadge(e.target.value)}
                    style={{ padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  >
                    <option value="Important">Important</option>
                    <option value="Registration">Registration</option>
                    <option value="Event Guideline">Event Guideline</option>
                    <option value="Update">Update</option>
                    <option value="Certification">Certification</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  placeholder="Full summary details for participants..."
                  value={newAnnSummary}
                  onChange={(e) => setNewAnnSummary(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                />

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', padding: '0.75rem 1.8rem' }}
                >
                  <Plus size={16} />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>

            {/* List of Active Announcements with Edit & Delete */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                Active Announcements on Notice Board ({announcementsData.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {announcementsData.map((item) => (
                  <div
                    key={item.id}
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
                    <div style={{ maxWidth: '80%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00d4ff', backgroundColor: 'rgba(0, 212, 255, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          {item.badge}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.date}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.3rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{item.summary}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <button
                        onClick={() => {
                          setEditingAnnId(item.id);
                          setAnnEditForm(JSON.parse(JSON.stringify(item)));
                        }}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', backgroundColor: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete notice "${item.title}"?`)) {
                            deleteAnnouncement(item.id);
                            showToast('Announcement deleted.');
                          }
                        }}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcement Edit Modal */}
            {editingAnnId && annEditForm && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  zIndex: 9999,
                }}
                onClick={() => setEditingAnnId(null)}
              >
                <form
                  onSubmit={handleSaveAnnEdit}
                  onClick={(e) => e.stopPropagation()}
                  className="glass-card"
                  style={{ maxWidth: '600px', width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>Edit Announcement</h3>
                    <button type="button" onClick={() => setEditingAnnId(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                      <X size={20} />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={annEditForm.title}
                    onChange={(e) => setAnnEditForm({ ...annEditForm, title: e.target.value })}
                    style={{ padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />

                  <textarea
                    rows={4}
                    value={annEditForm.summary}
                    onChange={(e) => setAnnEditForm({ ...annEditForm, summary: e.target.value })}
                    style={{ padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                  />

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.8rem' }}>
                      <Save size={16} />
                      <span>Save Changes</span>
                    </button>
                    <button type="button" onClick={() => setEditingAnnId(null)} className="btn-secondary" style={{ padding: '0.75rem 1.4rem' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 4: COORDINATORS & CONTACT DETAILS (FULL CRUD)
            ========================================================================= */}
        {activeTab === 'coordinators' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* General Helplines & Socials */}
            <form onSubmit={handleSaveContactGeneral} className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1.25rem' }}>
                Helpline Numbers, Official Emails &amp; Social Links
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Primary Helpline Phone
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.helplinePhone}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, helplinePhone: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Alternate Helpline Phone
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.alternatePhone}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, alternatePhone: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Department Official Email
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.officialEmail}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, officialEmail: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Fest Support Email
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.festSupportEmail}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, festSupportEmail: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Instagram Link
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.instagram}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, instagram: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    LinkedIn Link
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.linkedin}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, linkedin: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1.25rem', padding: '0.75rem 2rem' }}>
                <Save size={16} />
                <span>Save Helplines &amp; Socials</span>
              </button>
            </form>

            {/* Faculty Coordinators CRUD */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                  Faculty Coordinators ({contactData.facultyCoordinators?.length || 0})
                </h3>
                <button
                  onClick={() => {
                    addFacultyCoordinator({
                      name: 'Faculty Coordinator Name',
                      designation: 'Assistant Professor, Dept. of ISE',
                      role: 'Faculty Convener',
                      phone: '+91 98765 43210',
                      email: 'faculty@sairamce.edu.in',
                    });
                    showToast('Added new faculty coordinator card.');
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  <Plus size={14} />
                  <span>Add Faculty Coordinator</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {(contactData.facultyCoordinators || []).map((fac, fIdx) => (
                  <div
                    key={fIdx}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700 }}>Faculty #{fIdx + 1}</span>
                      <button
                        onClick={() => {
                          deleteFacultyCoordinator(fIdx);
                          showToast('Faculty coordinator removed.');
                        }}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={fac.name}
                      placeholder="Full Name"
                      onChange={(e) => updateFacultyCoordinator(fIdx, { ...fac, name: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={fac.designation}
                      placeholder="Designation"
                      onChange={(e) => updateFacultyCoordinator(fIdx, { ...fac, designation: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={fac.phone}
                      placeholder="Contact Phone"
                      onChange={(e) => updateFacultyCoordinator(fIdx, { ...fac, phone: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Student Coordinators CRUD */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                  Student Coordinators ({contactData.studentCoordinators?.length || 0})
                </h3>
                <button
                  onClick={() => {
                    addStudentCoordinator({
                      name: 'Student Convener Name',
                      role: 'Lead Student Organizer',
                      phone: '+91 98765 43210',
                      email: 'student@sairamce.edu.in',
                    });
                    showToast('Added new student coordinator card.');
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  <Plus size={14} />
                  <span>Add Student Coordinator</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {(contactData.studentCoordinators || []).map((stu, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>Student #{sIdx + 1}</span>
                      <button
                        onClick={() => {
                          deleteStudentCoordinator(sIdx);
                          showToast('Student coordinator removed.');
                        }}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={stu.name}
                      placeholder="Full Name"
                      onChange={(e) => updateStudentCoordinator(sIdx, { ...stu, name: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={stu.role}
                      placeholder="Role (e.g. Lead Student Convener)"
                      onChange={(e) => updateStudentCoordinator(sIdx, { ...stu, role: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={stu.phone}
                      placeholder="Phone Number"
                      onChange={(e) => updateStudentCoordinator(sIdx, { ...stu, phone: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: PARTICIPANT QR CODES & DIRECT LINKS
            ========================================================================= */}
        {activeTab === 'qr' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid rgba(0, 212, 255, 0.35)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#00d4ff', marginBottom: '0.5rem' }}>
                <QrCode size={22} />
                <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>
                  Participant Official QR Codes &amp; Share Links
                </h2>
              </div>

              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                These high-resolution QR codes lead participants to the <strong>public website and registration form only</strong>. Use these on posters, banners, ID cards, and social media flyers.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                {/* QR 1: Public Website */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRadius: '16px' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '14px', boxShadow: '0 0 25px rgba(0, 212, 255, 0.25)', marginBottom: '1.5rem' }}>
                    <img src={qrDownloadUrl} alt="Participant Website QR" style={{ width: '220px', height: '220px', display: 'block' }} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.3rem' }}>
                    1. Public Fest Portal QR
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Scans directly to the public website home page
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                    <a href={qrDownloadUrl} download="TechnoVista_Portal_QR.png" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flexGrow: 1, padding: '0.65rem 0.8rem', fontSize: '0.84rem', justifyContent: 'center' }}>
                      <Download size={15} />
                      <span>Download QR</span>
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(participantSiteUrl);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                        showToast('Portal URL copied to clipboard!');
                      }}
                      className="btn-secondary"
                      style={{ padding: '0.65rem 1rem', fontSize: '0.84rem' }}
                    >
                      <Copy size={15} />
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>

                {/* QR 2: Google Form */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRadius: '16px' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '14px', boxShadow: '0 0 25px rgba(139, 92, 246, 0.25)', marginBottom: '1.5rem' }}>
                    <img src={qrGoogleFormUrl} alt="Google Form QR" style={{ width: '220px', height: '220px', display: 'block' }} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.3rem' }}>
                    2. Google Form Registration QR
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Scans directly to the centralized registration Google Form
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                    <a href={qrGoogleFormUrl} download="TechnoVista_GoogleForm_QR.png" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flexGrow: 1, padding: '0.65rem 0.8rem', fontSize: '0.84rem', justifyContent: 'center' }}>
                      <Download size={15} />
                      <span>Download QR</span>
                    </a>
                    <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.65rem 1rem', fontSize: '0.84rem' }}>
                      <ExternalLink size={15} />
                      <span>Open Form</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
