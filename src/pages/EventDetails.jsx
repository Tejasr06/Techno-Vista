import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import {
  ArrowLeft,
  ExternalLink,
  Users,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  UserCheck,
  Sparkles,
  Layers,
  ShieldAlert,
} from 'lucide-react';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { getEventById, eventsData, googleFormUrl } = useFest();
  const event = getEventById(eventId);

  useEffect(() => {
    if (event) {
      document.title = `${event.name} | Events | TECHNO VISTA 2K26`;
    } else {
      document.title = `Event Not Found | TECHNO VISTA 2K26`;
    }
  }, [event]);

  if (!event) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <AlertCircle size={48} className="text-red-400" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Event Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            The requested event ID "{eventId}" does not exist in our catalog.
          </p>
          <Link to="/events" className="btn-primary">
            <span>Browse All 6 Events</span>
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Breadcrumb / Back Link */}
        <div style={{ marginBottom: '2rem' }}>
          <Link
            to="/events"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#38bdf8',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(-3px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
          >
            <ArrowLeft size={16} />
            <span>Back to All Events</span>
          </Link>
        </div>

        {/* Hero Banner Card */}
        <div
          className="glass-card"
          style={{
            overflow: 'hidden',
            marginBottom: '3.5rem',
            position: 'relative',
          }}
        >
          {/* Banner Graphic Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(240px, 35vw, 420px)',
              backgroundColor: '#0a0f24',
              overflow: 'hidden',
            }}
          >
            <img
              src={event.image}
              alt={event.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Dark Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(11, 19, 43, 0.95) 10%, rgba(11, 19, 43, 0.4) 60%, transparent 100%)',
              }}
            />

            {/* Floating Top Badge */}
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
              }}
            >
              <span className="badge badge-cyan">{event.badge}</span>
            </div>
          </div>

          {/* Banner Details Overlay */}
          <div
            style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              marginTop: '-4rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#38bdf8',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              <Sparkles size={14} />
              <span>{event.category}</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '0.4rem',
                lineHeight: 1.15,
              }}
            >
              {event.name}
            </h1>

            {event.subtitle && (
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  color: '#94a3b8',
                  marginBottom: '1.5rem',
                  fontWeight: 500,
                }}
              >
                {event.subtitle}
              </p>
            )}

            {/* Quick Metadata Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: '12px',
                background: 'rgba(6, 9, 19, 0.75)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  <Users size={14} />
                  <span>Team Size</span>
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, marginTop: '0.2rem' }}>
                  {event.teamSize}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  <Clock size={14} />
                  <span>Timing</span>
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, marginTop: '0.2rem' }}>
                  {event.timing}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  <MapPin size={14} />
                  <span>Venue</span>
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, marginTop: '0.2rem' }}>
                  {event.venue}
                </div>
              </div>
            </div>

            {/* Action Call */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.85rem 2.2rem', fontSize: '1rem' }}
              >
                <span>Register for {event.name}</span>
                <ExternalLink size={16} />
              </a>

              <Link to="/events" className="btn-secondary" style={{ padding: '0.85rem 1.8rem' }}>
                <span>Explore All Events</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Overview Section */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '1rem' }}>
                Event Overview
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {event.overview}
              </p>

              {/* Suggested Tracks / Tools if present */}
              {event.suggestedTracks && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                    Suggested Paper Presentation Tracks:
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {event.suggestedTracks.map((trk, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: '#cbd5e1' }}>
                        <span style={{ color: '#38bdf8' }}>▹</span>
                        <span>{trk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.supportedLanguages && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                    Supported Programming Languages:
                  </h4>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {event.supportedLanguages.map((lang, i) => (
                      <span key={i} className="badge badge-green">{lang}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rounds Breakdown */}
            {event.rounds && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Layers size={20} className="text-cyan-400" />
                  <span>Competition Rounds</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {event.rounds.map((rnd, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span className="badge badge-purple">{rnd.roundNumber}</span>
                        <h4 style={{ fontSize: '1.05rem', color: '#ffffff' }}>{rnd.title}</h4>
                      </div>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {rnd.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules and Regulations Section */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <ShieldAlert size={20} className="text-cyan-400" />
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                  Rules &amp; Regulations
                </h3>
              </div>

              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  fontSize: '0.84rem',
                  color: '#38bdf8',
                  marginBottom: '1.25rem',
                }}
              >
                ℹ️ Note to Organizers: Rules and guidelines can be edited directly in <code style={{ color: '#ffffff' }}>src/data/eventsData.js</code>.
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {event.rules.map((rule, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      fontSize: '0.94rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckCircle2 size={16} className="text-cyan-400" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Judging Criteria */}
            {event.judgingCriteria && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <Award size={20} className="text-cyan-400" />
                  <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                    Judging Criteria
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {event.judgingCriteria.map((crit, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: 500 }}>
                        {crit.parameter}
                      </span>
                      <span
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: '#00d4ff',
                          marginTop: '0.5rem',
                          fontFamily: 'var(--font-heading)',
                        }}
                      >
                        {crit.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Quick Registration Card */}
            <div
              className="glass-card"
              style={{
                padding: '2rem',
                border: '1px solid rgba(0, 212, 255, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                Ready to Compete?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Registrations are handled exclusively through our official Google Form. Select <strong>{event.name}</strong> as your chosen event track.
              </p>

              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <span>Register Now</span>
                <ExternalLink size={16} />
              </a>

              <div style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                Opens in a secure new tab
              </div>
            </div>

            {/* Eligibility & Team Info */}
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                <UserCheck size={18} />
                <h4 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Eligibility Criteria</h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {event.eligibility}
              </p>
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '0.84rem',
                  color: '#94a3b8',
                }}
              >
                📌 <strong>Team Size:</strong> {event.teamSize}
              </div>
            </div>

            {/* Event Coordinators */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h4 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '1.25rem' }}>
                Event Coordinators
              </h4>

              {/* Faculty Coordinators */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.76rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Faculty Coordinators (Editable)
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
                  {event.coordinators.faculty.map((fac, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>
                        {fac.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {fac.designation} • {fac.contact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Coordinators */}
              <div>
                <span style={{ fontSize: '0.76rem', color: '#c084fc', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Student Leads (Editable)
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
                  {event.coordinators.student.map((stu, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>
                        {stu.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {stu.role} • {stu.contact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Events Quick Navigation */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                Other Fest Tracks
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {eventsData.filter((e) => e.id !== event.id).map((other) => (
                  <Link
                    key={other.id}
                    to={`/events/${other.id}`}
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      padding: '0.4rem 0',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    → {other.name} ({other.badge})
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

