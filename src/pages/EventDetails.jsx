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
  Layers,
  Sparkles,
} from 'lucide-react';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { getEventById, eventsData, googleFormUrl } = useFest();
  const event = getEventById(eventId);

  useEffect(() => {
    if (event) {
      document.title = `${event.name} | Official Events | TECHNO VISTA 2K26`;
    } else {
      document.title = `Event Not Found | TECHNO VISTA 2K26`;
    }
    window.scrollTo(0, 0);
  }, [event]);

  if (!event) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <AlertCircle size={48} color="#f87171" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff' }}>Event Not Found</h2>
          <p style={{ color: '#a7afc2', marginBottom: '2rem' }}>
            The requested event arena does not exist or may have been renamed in the catalogue.
          </p>
          <button
            onClick={() => navigate('/events')}
            className="btn-primary"
            style={{ padding: '0.85rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft size={16} />
            <span>Return to Events Directory</span>
          </button>
        </div>
      </div>
    );
  }

  // Determine track
  const track =
    event.track ||
    (['frame-fusion', 'clash-of-squadz'].includes(event.id) ||
    event.category?.toLowerCase().includes('gaming') ||
    event.category?.toLowerCase().includes('design') ||
    event.category?.toLowerCase().includes('multimedia')
      ? 'NON-TECHNICAL'
      : 'TECHNICAL');

  // Extract coordinators
  const facList = Array.isArray(event.coordinators?.faculty)
    ? event.coordinators.faculty
    : [];
  const stuList = Array.isArray(event.coordinators?.student)
    ? event.coordinators.student
    : Array.isArray(event.coordinators)
    ? event.coordinators
    : [];

  return (
    <div style={{ padding: '2.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Link
            to="/events"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#a7afc2',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(130, 155, 210, 0.15)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#f2c438';
              e.currentTarget.style.borderColor = '#f2c438';
              e.currentTarget.style.transform = 'translateX(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#a7afc2';
              e.currentTarget.style.borderColor = 'rgba(130, 155, 210, 0.15)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Events</span>
          </Link>
        </div>

        {/* 1. HERO HEADER CARD (Styled matching ssceieee.vercel.app) */}
        <div
          style={{
            position: 'relative',
            padding: '2.5rem 2rem',
            borderRadius: '1.25rem',
            backgroundColor: '#111b38',
            border: '1px solid rgba(130, 155, 210, 0.2)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(47, 111, 255, 0.1)',
            marginBottom: '2.5rem',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(242, 196, 56, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Top Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(47, 111, 255, 0.15)',
                  color: '#25c9ff',
                  border: '1px solid rgba(130, 155, 210, 0.3)',
                  textTransform: 'uppercase',
                }}
              >
                {track} TRACK
              </span>

              {event.badge && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, rgba(242, 196, 56, 0.2) 0%, rgba(212, 168, 39, 0.1) 100%)',
                    color: '#f2c438',
                    border: '1px solid rgba(242, 196, 56, 0.4)',
                    textTransform: 'uppercase',
                  }}
                >
                  ★ {event.badge}
                </span>
              )}
            </div>

            {/* Event Name */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 900,
                color: '#f5f7fb',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {event.name}
            </h1>

            {/* Subtitle */}
            {event.subtitle && (
              <p style={{ fontSize: '1.15rem', color: '#a7afc2', fontWeight: 600, marginBottom: '0.6rem' }}>
                {event.subtitle}
              </p>
            )}

            {/* Golden Italic Slogan / Tagline */}
            {event.tagline && (
              <p
                style={{
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  color: '#f2c438',
                  marginBottom: '1.5rem',
                }}
              >
                {event.tagline}
              </p>
            )}

            {/* Overview Paragraph */}
            <p
              style={{
                fontSize: '1rem',
                color: '#cbd5e1',
                lineHeight: 1.7,
                maxWidth: '850px',
                marginBottom: '2rem',
              }}
            >
              {event.overview || event.shortDescription}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 2.2rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f2c438 0%, #ffd95a 100%)',
                  color: '#070d1d',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 24px rgba(242, 196, 56, 0.35)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(242, 196, 56, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 196, 56, 0.35)';
                }}
              >
                <span>Register for {event.name}</span>
                <ExternalLink size={16} />
              </a>

              <Link
                to="/events"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.8rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(130, 155, 210, 0.25)',
                  color: '#f5f7fb',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#f2c438';
                  e.currentTarget.style.color = '#f2c438';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(130, 155, 210, 0.25)';
                  e.currentTarget.style.color = '#f5f7fb';
                }}
              >
                <span>Explore Other Events</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. QUICK STATS 4-CARD GRID (Timing, Venue, Team Size, Prizes) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Timing Card */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              backgroundColor: '#111b38',
              border: '1px solid rgba(130, 155, 210, 0.18)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#25c9ff', marginBottom: '0.5rem' }}>
              <Clock size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Schedule & Timing
              </span>
            </div>
            <div style={{ color: '#f5f7fb', fontSize: '1rem', fontWeight: 700 }}>
              {event.timing || 'Fest Day Timing'}
            </div>
          </div>

          {/* Venue Card */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              backgroundColor: '#111b38',
              border: '1px solid rgba(130, 155, 210, 0.18)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#25c9ff', marginBottom: '0.5rem' }}>
              <MapPin size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Venue / Hall
              </span>
            </div>
            <div style={{ color: '#f5f7fb', fontSize: '1rem', fontWeight: 700 }}>
              {event.venue || 'Dept. of ISE Labs'}
            </div>
          </div>

          {/* Team Size Card */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              backgroundColor: '#111b38',
              border: '1px solid rgba(130, 155, 210, 0.18)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#25c9ff', marginBottom: '0.5rem' }}>
              <Users size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Team Size
              </span>
            </div>
            <div style={{ color: '#f5f7fb', fontSize: '1rem', fontWeight: 700 }}>
              {event.teamSize || 'Individual or Teams'}
            </div>
          </div>

          {/* Prizes Card */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              backgroundColor: '#111b38',
              border: '1px solid rgba(242, 196, 56, 0.3)',
              boxShadow: '0 4px 20px rgba(242, 196, 56, 0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f2c438', marginBottom: '0.5rem' }}>
              <Award size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Awards & Recognition
              </span>
            </div>
            <div style={{ color: '#f5f7fb', fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.4 }}>
              {event.prizes?.first || 'Cash Prize + Certificate of Excellence'}
            </div>
          </div>
        </div>

        {/* 3. COMPETITION FORMAT / ROUNDS (If Defined) */}
        {event.rounds && event.rounds.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#f5f7fb',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              <Layers size={22} color="#f2c438" />
              <span>Competition Format &amp; Rounds</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {event.rounds.map((rnd, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    backgroundColor: '#111b38',
                    border: '1px solid rgba(130, 155, 210, 0.18)',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, #f2c438, #d4a827)',
                        color: '#070d1d',
                      }}
                    >
                      {rnd.roundNumber || `Round ${i + 1}`}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', color: '#f5f7fb', fontWeight: 700 }}>
                      {rnd.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.94rem', color: '#a7afc2', lineHeight: 1.6 }}>
                    {rnd.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. RULES & REGULATIONS */}
        {event.rules && event.rules.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#f5f7fb',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Rules &amp; Guidelines
            </h2>

            <div
              style={{
                padding: '1.75rem',
                borderRadius: '1rem',
                backgroundColor: '#111b38',
                border: '1px solid rgba(130, 155, 210, 0.18)',
              }}
            >
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {event.rules.map((rule, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      fontSize: '0.95rem',
                      color: '#cbd5e1',
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(242, 196, 56, 0.15)',
                        color: '#f2c438',
                        border: '1px solid rgba(242, 196, 56, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        marginTop: '2px',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 5. EVENT COORDINATORS SECTION (Neat, clean, and clickable) */}
        {(facList.length > 0 || stuList.length > 0) && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#f5f7fb',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Event Coordinators
            </h2>

            <div
              style={{
                padding: '2rem',
                borderRadius: '1rem',
                backgroundColor: '#111b38',
                border: '1px solid rgba(130, 155, 210, 0.18)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
              }}
            >
              {/* Faculty Coordinators Column */}
              <div>
                <h3
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: '#25c9ff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '1rem',
                  }}
                >
                  Faculty In-Charge
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {facList.map((fac, idx) => {
                    const contactInfo = fac.contact || fac.phone;
                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '1rem 1.15rem',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(130, 155, 210, 0.12)',
                        }}
                      >
                        <div style={{ fontSize: '0.98rem', color: '#f5f7fb', fontWeight: 700 }}>
                          {fac.name}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#a7afc2', marginTop: '0.2rem' }}>
                          {fac.designation}
                        </div>
                        {contactInfo && (
                          <div style={{ marginTop: '0.5rem' }}>
                            <a
                              href={contactInfo.includes('@') ? `mailto:${contactInfo}` : `tel:${contactInfo}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: '#25c9ff',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                              }}
                            >
                              {contactInfo.includes('@') ? <Mail size={13} /> : <Phone size={13} />}
                              <span>{contactInfo}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Student Leads Column */}
              <div>
                <h3
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: '#f2c438',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '1rem',
                  }}
                >
                  Student Leads &amp; Organizers
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {stuList.map((stu, idx) => {
                    const phoneInfo = stu.phone || stu.contact;
                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '1rem 1.15rem',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(130, 155, 210, 0.12)',
                        }}
                      >
                        <div style={{ fontSize: '0.98rem', color: '#f5f7fb', fontWeight: 700 }}>
                          {stu.name}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#a7afc2', marginTop: '0.2rem' }}>
                          {stu.role || 'Event Lead'}
                        </div>
                        {phoneInfo && (
                          <div style={{ marginTop: '0.5rem' }}>
                            <a
                              href={`tel:${phoneInfo}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: '#f2c438',
                                fontSize: '0.84rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                padding: '0.3rem 0.7rem',
                                borderRadius: '6px',
                                backgroundColor: 'rgba(242, 196, 56, 0.1)',
                                border: '1px solid rgba(242, 196, 56, 0.25)',
                              }}
                            >
                              <Phone size={13} />
                              <span>{phoneInfo}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. BOTTOM REGISTER CTA BANNER */}
        <div
          style={{
            padding: '2.5rem 2rem',
            borderRadius: '1.25rem',
            background: 'linear-gradient(135deg, rgba(17, 27, 56, 0.9) 0%, rgba(7, 13, 29, 0.95) 100%)',
            border: '1px solid rgba(242, 196, 56, 0.3)',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(242, 196, 56, 0.15)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f5f7fb', fontFamily: 'var(--font-heading)' }}>
            Ready to Take Part in {event.name}?
          </h2>
          <p style={{ color: '#a7afc2', maxWidth: '600px', fontSize: '0.98rem', lineHeight: 1.6 }}>
            Grab your team, confirm your spot through the centralized registration portal, and showcase your innovation on the fest day.
          </p>
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.95rem 2.5rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f2c438 0%, #ffd95a 100%)',
              color: '#070d1d',
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              boxShadow: '0 10px 25px rgba(242, 196, 56, 0.35)',
            }}
          >
            <span>Register Now</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
