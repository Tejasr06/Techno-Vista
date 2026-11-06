import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import SectionTitle from '../components/SectionTitle';
import {
  Bell,
  Pin,
  Calendar,
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function Announcements() {
  const { announcementsData } = useFest();
  const [filterBadge, setFilterBadge] = useState('All');

  useEffect(() => {
    document.title = `Live Announcements | TECHNO VISTA 2K26 | Sri Sairam College of Engineering`;
  }, []);

  const badges = ['All', 'Registration', 'Event Guideline', 'Important', 'Update', 'Certification'];

  const filteredAnnouncements = announcementsData.filter(
    (item) => filterBadge === 'All' || item.badge === filterBadge
  );

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '940px' }}>
        {/* Header */}
        <SectionTitle
          tag="Notice Board"
          title="Announcements &amp; Live Updates"
          subtitle="Stay informed with real-time updates regarding registrations, submission deadlines, and fest logistics."
        />

        {/* Organizer Notice */}
        <div
          className="glass-panel"
          style={{
            padding: '1.1rem 1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            fontSize: '0.86rem',
            color: 'var(--text-secondary)',
          }}
        >
          <Info size={20} className="text-cyan-400" style={{ flexShrink: 0 }} />
          <span>
            <strong>Centralized Updates:</strong> Add, edit, or remove announcements directly in <code style={{ color: '#38bdf8' }}>src/data/announcementsData.js</code>. No database or admin panel required.
          </span>
        </div>

        {/* Badge Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3rem',
          }}
        >
          {badges.map((badge) => {
            const isActive = filterBadge === badge;
            return (
              <button
                key={badge}
                onClick={() => setFilterBadge(badge)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
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
                {badge}
              </button>
            );
          })}
        </div>

        {/* Announcements List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="glass-card"
              style={{
                padding: '2rem',
                border: ann.isPinned
                  ? '1px solid rgba(56, 189, 248, 0.4)'
                  : '1px solid var(--border-subtle)',
                boxShadow: ann.isPinned
                  ? '0 8px 30px rgba(0, 212, 255, 0.12)'
                  : 'none',
                position: 'relative',
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {ann.isPinned && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#00d4ff',
                        background: 'rgba(0, 212, 255, 0.12)',
                        border: '1px solid rgba(0, 212, 255, 0.35)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                      }}
                    >
                      <Pin size={12} />
                      <span>PINNED</span>
                    </span>
                  )}
                  <span className="badge badge-cyan">{ann.badge}</span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.82rem',
                    color: '#94a3b8',
                  }}
                >
                  <Calendar size={14} />
                  <span>{ann.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.35rem',
                  color: '#ffffff',
                  marginBottom: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {ann.title}
              </h3>

              {/* Summary */}
              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '0.85rem',
                }}
              >
                {ann.summary}
              </p>

              {/* Extended Content */}
              {ann.content && (
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    marginBottom: ann.actionLink ? '1.25rem' : 0,
                  }}
                >
                  {ann.content}
                </p>
              )}

              {/* Action Link if provided */}
              {ann.actionLink && (
                <div style={{ marginTop: '1rem' }}>
                  {ann.actionLink.startsWith('http') ? (
                    <a
                      href={ann.actionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '0.6rem 1.2rem', fontSize: '0.86rem' }}
                    >
                      <span>{ann.actionText || 'Read More'}</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <Link
                      to={ann.actionLink}
                      className="btn-secondary"
                      style={{ padding: '0.6rem 1.2rem', fontSize: '0.86rem' }}
                    >
                      <span>{ann.actionText || 'Read More'}</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

