import React, { useState, useEffect } from 'react';
import { useFest } from '../context/FestContext';
import SectionTitle from '../components/SectionTitle';
import {
  Clock,
  MapPin,
  Calendar,
  ExternalLink,
  Sparkles,
  Info,
  Layers,
  Award,
  Coffee,
  CheckCircle,
  Filter,
} from 'lucide-react';

export default function Schedule() {
  const { scheduleData, googleFormUrl } = useFest();
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    document.title = `Event Schedule | TECHNO VISTA 2K26 | Sri Sairam College of Engineering`;
  }, []);

  const filterCategories = [
    'All',
    'Ceremony',
    'Competitions',
    'Finals',
    'Registration',
  ];

  const filteredTimeline = scheduleData.timeline.filter((slot) => {
    if (selectedFilter === 'All') return true;
    return slot.category === selectedFilter;
  });

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Header */}
        <SectionTitle
          tag="Program Timeline"
          title="TECHNO VISTA 2K26 Schedule"
          subtitle={`Detailed timeline of activities, sessions, and championship finals for ${scheduleData.festDate}.`}
        />

        {/* Schedule Disclaimer / Editable Notice */}
        <div
          className="glass-panel"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}
        >
          <Info size={22} className="text-cyan-400" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong>Event Schedule Notice:</strong> {scheduleData.note || 'All timings are in Indian Standard Time (IST). The schedule is tentative and subject to minor adjustments on the event day. Check announcements for live updates.'}
          </div>
        </div>

        {/* Filter Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '2.5rem',
            alignItems: 'center',
          }}
        >
          <Filter size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              style={{
                padding: '0.35rem 1rem',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor:
                  selectedFilter === cat ? 'rgba(0, 212, 255, 0.18)' : 'rgba(255,255,255,0.04)',
                border:
                  selectedFilter === cat
                    ? '1px solid #00d4ff'
                    : '1px solid rgba(255,255,255,0.1)',
                color: selectedFilter === cat ? '#00d4ff' : '#94a3b8',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline List */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Subtle Vertical Timeline Guide Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, #00d4ff, #8b5cf6, transparent)',
              opacity: 0.3,
              zIndex: 0,
            }}
            className="timeline-guide-line"
          />

          {filteredTimeline.length === 0 && (
            <div
              className="glass-panel"
              style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}
            >
              No schedule slots match the selected filter.
            </div>
          )}

          {filteredTimeline.map((slot, index) => (
            <div
              key={slot.id}
              className="glass-card"
              style={{
                padding: '1.75rem 2rem',
                position: 'relative',
                zIndex: 1,
                border: slot.isHighlight
                  ? '1px solid rgba(56, 189, 248, 0.35)'
                  : '1px solid var(--border-subtle)',
                boxShadow: slot.isHighlight
                  ? '0 8px 30px rgba(0, 212, 255, 0.12)'
                  : 'none',
              }}
            >
              {/* Header of Slot */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '0.75rem',
                }}
              >
                {/* Time Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '8px',
                    color: '#38bdf8',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  <Clock size={15} />
                  <span>{slot.time}</span>
                </div>

                {/* Category Badge */}
                <span className={`badge ${slot.isHighlight ? 'badge-purple' : 'badge-cyan'}`}>
                  {slot.badge || slot.category}
                </span>
              </div>

              {/* Slot Title */}
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                }}
              >
                {slot.title}
              </h3>

              {/* Venue */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.86rem',
                  color: '#94a3b8',
                  marginBottom: '0.85rem',
                }}
              >
                <MapPin size={15} className="text-cyan-400" />
                <span>{slot.venue}</span>
              </div>

              {/* Slot Description */}
              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: slot.subEvents ? '1.25rem' : 0,
                }}
              >
                {slot.description}
              </p>

              {/* Sub-Events List if concurrent sessions */}
              {slot.subEvents && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '0.85rem',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {slot.subEvents.map((sub, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.92rem',
                          color: '#ffffff',
                          fontWeight: 600,
                          marginBottom: '0.2rem',
                        }}
                      >
                        {sub.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#38bdf8' }}>
                        📍 {sub.venue}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                        ⏱️ {sub.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div
          className="glass-panel"
          style={{
            marginTop: '4rem',
            padding: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
            Ready to Join the Action?
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
            Be present on time to ensure smooth registration and orientation. Register your team through the Google Form now.
          </p>
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            <span>Register for Events</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

