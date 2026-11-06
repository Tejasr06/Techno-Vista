import React, { useState, useEffect } from 'react';
import { useFest } from '../context/FestContext';
import EventCard from '../components/EventCard';
import SectionTitle from '../components/SectionTitle';
import { Search, ExternalLink, Sparkles, Filter, Code2, Gamepad2, Layers } from 'lucide-react';

export default function Events() {
  const { eventsData, googleFormUrl } = useFest();
  const [selectedTrack, setSelectedTrack] = useState('ALL'); // 'ALL' | 'TECHNICAL' | 'NON-TECHNICAL'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = `Official Events | TECHNO VISTA 2K26 | Sri Sairam CE`;
  }, []);

  // Helper to determine track
  const getEventTrack = (event) => {
    if (event.track) return event.track.toUpperCase();
    if (
      ['frame-fusion', 'clash-of-squadz'].includes(event.id) ||
      event.category?.toLowerCase().includes('gaming') ||
      event.category?.toLowerCase().includes('design') ||
      event.category?.toLowerCase().includes('multimedia')
    ) {
      return 'NON-TECHNICAL';
    }
    return 'TECHNICAL';
  };

  // Filter events by Search Query
  const searchFilteredEvents = eventsData.filter((event) => {
    const q = searchQuery.toLowerCase();
    return (
      event.name.toLowerCase().includes(q) ||
      event.shortDescription?.toLowerCase().includes(q) ||
      event.category?.toLowerCase().includes(q) ||
      event.subtitle?.toLowerCase().includes(q)
    );
  });

  // Separate Technical and Non-Technical events
  const technicalEvents = searchFilteredEvents.filter(
    (ev) => getEventTrack(ev) === 'TECHNICAL'
  );
  const nonTechnicalEvents = searchFilteredEvents.filter(
    (ev) => getEventTrack(ev) === 'NON-TECHNICAL'
  );

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header */}
        <SectionTitle
          tag="Competitive Arenas"
          title="Official Events Catalogue"
          subtitle="Explore our flagship engineering battles and high-energy creative arenas. Each event features dedicated jury evaluation, cash awards, and certificates."
        />

        {/* Controls: Search Box & Track Switcher Tabs */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto 3.5rem auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                top: '50%',
                left: '1.25rem',
                transform: 'translateY(-50%)',
                color: '#64748b',
              }}
            />
            <input
              type="text"
              placeholder="Search by event name, category, or skill (e.g. Code, CTF, Paper, Bot, Film, BGMI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1.25rem 0.9rem 3.2rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(11, 19, 43, 0.75)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#ffffff',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                outline: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#00d4ff';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.25)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* PRIMARY TRACK SELECTOR: SEPARATING TECHNICAL & NON-TECHNICAL */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
            }}
          >
            {[
              { id: 'ALL', label: `ALL EVENTS (${eventsData.length})`, icon: Layers },
              {
                id: 'TECHNICAL',
                label: `⚡ TECHNICAL TRACK (${eventsData.filter((e) => getEventTrack(e) === 'TECHNICAL').length})`,
                icon: Code2,
              },
              {
                id: 'NON-TECHNICAL',
                label: `🎮 NON-TECHNICAL TRACK (${eventsData.filter((e) => getEventTrack(e) === 'NON-TECHNICAL').length})`,
                icon: Gamepad2,
              },
            ].map((tab) => {
              const isActive = selectedTrack === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTrack(tab.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.3rem',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    backgroundColor: isActive
                      ? '#00d4ff'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isActive
                      ? '1px solid #00d4ff'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isActive ? '#050914' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 18px rgba(0, 212, 255, 0.35)' : 'none',
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: TECHNICAL EVENTS ARENAS
            ========================================================================= */}
        {(selectedTrack === 'ALL' || selectedTrack === 'TECHNICAL') && technicalEvents.length > 0 && (
          <div style={{ marginBottom: '4.5rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.75rem',
                borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
                paddingBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#38bdf8',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                TRACK A
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                Technical Events &amp; Engineering Arenas
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {technicalEvents.map((event, idx) => (
                <EventCard key={event.id} event={event} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 2: NON-TECHNICAL EVENTS ARENAS
            ========================================================================= */}
        {(selectedTrack === 'ALL' || selectedTrack === 'NON-TECHNICAL') && nonTechnicalEvents.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.75rem',
                borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
                paddingBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.35)',
                  color: '#c084fc',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                TRACK B
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                Non-Technical &amp; Creative Esports Arenas
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {nonTechnicalEvents.map((event, idx) => (
                <EventCard key={event.id} event={event} index={technicalEvents.length + idx} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {technicalEvents.length === 0 && nonTechnicalEvents.length === 0 && (
          <div
            className="glass-card"
            style={{
              padding: '3rem',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              No events found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTrack('ALL');
              }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Centralized Registration Notice */}
        <div
          className="glass-panel"
          style={{
            marginTop: '4rem',
            padding: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 800 }}>
              Participating Across Multiple Tracks?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              Participants may enter both Technical and Non-Technical arenas provided lab schedules don't clash. All registrations route through the unified Google Form.
            </p>
          </div>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.75rem 1.8rem', flexShrink: 0 }}
          >
            <span>Open Centralized Google Form</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
