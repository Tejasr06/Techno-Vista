import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFest } from '../context/FestContext';
import CyberTunnelHero from '../components/CyberTunnelHero';
import EventCard from '../components/EventCard';
import SectionTitle from '../components/SectionTitle';
import {
  Calendar,
  MapPin,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Award,
  Users,
  Lightbulb,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export default function Home() {
  const { festData, googleFormUrl, eventsData } = useFest();

  useEffect(() => {
    document.title = `${festData.name} | ${festData.tagline} | Sri Sairam College of Engineering`;
  }, [festData]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* =========================================================================
          CYBER TUNNEL OPENING / HERO SECTION (MATCHING REFERENCE DESIGN)
          ========================================================================= */}
      <CyberTunnelHero />

      {/* =========================================================================
          KEY STATS / HIGHLIGHTS BAR
          ========================================================================= */}
      <section
        style={{
          borderTop: '1px solid rgba(56, 189, 248, 0.15)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          background: 'rgba(10, 16, 36, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: '2.5rem 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            {festData.highlights.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED EVENTS SECTION
          ========================================================================= */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <SectionTitle
            tag="Flagship Arenas"
            title="6 High-Caliber Technical Events"
            subtitle="Engineered to challenge algorithms, test cybersecurity defense, inspire robotics, celebrate multimedia design, and spark visionary research."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {eventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link
              to="/events"
              className="btn-secondary"
              style={{ padding: '0.85rem 2rem' }}
            >
              <span>View All Event Details & Rules</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT THE FEST SECTION
          ========================================================================= */}
      <section
        style={{
          padding: '5rem 0',
          background: 'linear-gradient(180deg, transparent 0%, rgba(11, 19, 43, 0.45) 50%, transparent 100%)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#38bdf8',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                <Cpu size={16} />
                <span>ABOUT TECHNO VISTA 2K26</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.2,
                }}
              >
                Elevating Technical Excellence Through Visionary Competition
              </h2>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}
              >
                {festData.aboutFest.description[0]}
              </p>

              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                {festData.aboutFest.description[1]}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn-secondary">
                  <span>Learn More About Us</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/schedule" className="btn-secondary">
                  <span>View Timeline</span>
                </Link>
              </div>
            </div>

            {/* Right Card / Department Highlight */}
            <div
              className="glass-card"
              style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#c084fc',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <Award size={18} />
                <span>ACADEMIC FOUNDATION</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>
                {festData.aboutDepartment.name}
              </h3>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {festData.aboutDepartment.overview}
              </p>

              <div
                style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  fontSize: '0.88rem',
                  color: '#94a3b8',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Affiliated to VTU, Belagavi & Approved by AICTE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>State-of-the-Art Computing Laboratories & Seminar Facilities</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Active IEEE, CSI & Tech Incubation Ecosystems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHY PARTICIPATE SECTION
          ========================================================================= */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <SectionTitle
            tag="Participant Value"
            title="Why Compete in TECHNO VISTA 2K26?"
            subtitle="Step beyond conventional textbook engineering and benchmark your capabilities against peers nationwide."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {[
              {
                icon: Trophy,
                title: 'Exciting Cash Prizes',
                desc: 'Top podium finishers across all six competitive tracks receive attractive cash awards and championship trophies.',
                color: '#f59e0b',
              },
              {
                icon: Award,
                title: 'Authorized Certificates',
                desc: 'Official Certificates of Participation and Merit signed by the college leadership and Department of ISE.',
                color: '#38bdf8',
              },
              {
                icon: Users,
                title: 'National Networking',
                desc: 'Connect with hundreds of passionate student developers, ethical hackers, bot builders, and faculty mentors.',
                color: '#a855f7',
              },
              {
                icon: Lightbulb,
                title: 'Real-World Problem Solving',
                desc: 'Experience time-pressured environments that simulate real-world industry hackathons and research symposiums.',
                color: '#10b981',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${card.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                    {card.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          IMPORTANT INFORMATION SECTION
          ========================================================================= */}
      <section
        style={{
          padding: '5rem 0',
          background: 'rgba(8, 14, 32, 0.6)',
          borderTop: '1px solid rgba(56, 189, 248, 0.1)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
        }}
      >
        <div className="container">
          <SectionTitle
            tag="Guidelines & Protocol"
            title="Important Participation Instructions"
            subtitle="Please review these essential guidelines before arriving on campus."
          />

          <div
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {festData.importantNotes.map((note, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <ShieldCheck
                  size={20}
                  className="text-cyan-400"
                  style={{ flexShrink: 0, marginTop: '2px' }}
                />
                <span style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {note}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Central CTA */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem' }}
            >
              <span>Proceed to Registration Form</span>
              <ExternalLink size={18} />
            </a>
            <span style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
              One common Google Form for all 6 events. Choose your tracks inside!
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

