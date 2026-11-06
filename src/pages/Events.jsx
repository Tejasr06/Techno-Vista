import React, { useState, useEffect } from 'react';
import { EVENTS_DATA } from '../data/eventsData';
import { GOOGLE_FORM_URL } from '../data/festData';
import EventCard from '../components/EventCard';
import SectionTitle from '../components/SectionTitle';
import { Search, ExternalLink, Sparkles, Filter } from 'lucide-react';

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = `Official Events | TECHNO VISTA 2K26 | Sri Sairam CE`;
  }, []);

  const categories = [
    'All',
    'Research & Paper Presentation',
    'Competitive Programming',
    'Cybersecurity & Ethical Hacking',
    'Robotics & Hardware',
    'Design & Multimedia',
    'Gaming & Esports',
  ];

  const filteredEvents = EVENTS_DATA.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header */}
        <SectionTitle
          tag="Competitive Arenas"
          title="Explore the 6 Official Events"
          subtitle="Select your domain of mastery. Each event features dedicated jury evaluation, cash awards, and certificates."
        />

        {/* Search & Category Filter Controls */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto 3rem auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
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
              placeholder="Search by event name, category, or skills (e.g. Code, CTF, Bot, UI/UX)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1.25rem 0.9rem 3.2rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(11, 19, 43, 0.7)',
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

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              justifyContent: 'center',
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
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
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.color = '#94a3b8';
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
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
              No events match your search "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
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
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.4rem' }}>
              Participating in Multiple Events?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              Participants may enter multiple tracks as long as event session timings don't clash. All registrations route through the same unified Google Form.
            </p>
          </div>

          <a
            href={GOOGLE_FORM_URL}
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
