import React, { useEffect } from 'react';
import { FEST_DATA, GOOGLE_FORM_URL } from '../data/festData';
import SectionTitle from '../components/SectionTitle';
import {
  Sparkles,
  Target,
  Compass,
  GraduationCap,
  Building2,
  CheckCircle2,
  Trophy,
  Users2,
  ExternalLink,
  Cpu,
  BookOpen,
} from 'lucide-react';

export default function About() {
  useEffect(() => {
    document.title = `About TECHNO VISTA 2K26 | Department of ISE, Sri Sairam CE`;
  }, []);

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Page Header */}
        <SectionTitle
          tag="About The Symposium"
          title="Vision Beyond Innovation"
          subtitle="Discover the heritage, purpose, and institutional legacy powering TECHNO VISTA 2K26."
        />

        {/* =========================================================================
            ABOUT FEST & PURPOSE SECTION
            ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#38bdf8',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={16} />
              <span>THE FEST ESSENCE</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.85rem, 3vw, 2.4rem)',
                marginBottom: '1.25rem',
                lineHeight: 1.25,
              }}
            >
              A National Platform For Next-Gen Technocrats
            </h2>

            {FEST_DATA.aboutFest.description.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}
              >
                {paragraph}
              </p>
            ))}

            <div style={{ marginTop: '2rem' }}>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Register for Fest</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                }}
              >
                <Cpu size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                  Symposium Purpose
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                  Fostering Competitive Excellence
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              The purpose of organizing TECHNO VISTA 2K26 is to create an authentic bridge between classroom theoretical computer science and high-pressure industry-grade engineering environments.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {[
                'Benchmarking technical acumen against students nationwide',
                'Promoting research orientation and paper defense standards',
                'Sharpening competitive programming speed and complexity analysis',
                'Cultivating hands-on cybersecurity and robotics skills',
              ].map((text, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={16} className="text-cyan-400" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            VISION & MISSION SECTION
            ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem',
          }}
        >
          {/* Vision Card */}
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderLeft: '4px solid #00d4ff',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00d4ff',
              }}
            >
              <Compass size={24} />
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Our Vision</h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {FEST_DATA.aboutFest.vision}
            </p>
          </div>

          {/* Mission Card */}
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderLeft: '4px solid #a855f7',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a855f7',
              }}
            >
              <Target size={24} />
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Our Mission</h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {FEST_DATA.aboutFest.mission}
            </p>
          </div>
        </div>

        {/* =========================================================================
            ABOUT COLLEGE & ABOUT DEPARTMENT SECTION
            ========================================================================= */}
        <div style={{ marginBottom: '5rem' }}>
          <SectionTitle
            tag="Institutional Legacy"
            title="Sri Sairam College of Engineering"
            subtitle="An institution dedicated to academic excellence, value-based education, and modern engineering."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {/* About College */}
            <div
              className="glass-card"
              style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Building2 size={24} className="text-cyan-400" />
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                  {FEST_DATA.aboutCollege.name}
                </h3>
              </div>

              <span
                style={{
                  fontSize: '0.84rem',
                  color: '#38bdf8',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {FEST_DATA.aboutCollege.affiliation}
              </span>

              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {FEST_DATA.aboutCollege.overview}
              </p>

              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                📍 {FEST_DATA.aboutCollege.location}
              </div>
            </div>

            {/* About Department of ISE */}
            <div
              className="glass-card"
              style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <GraduationCap size={24} className="text-purple-400" />
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                  {FEST_DATA.aboutDepartment.name}
                </h3>
              </div>

              <span
                style={{
                  fontSize: '0.84rem',
                  color: '#c084fc',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                Pioneering Software, Data &amp; Security Engineering
              </span>

              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {FEST_DATA.aboutDepartment.overview}
              </p>

              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                🏛️ Hosted at Seminar Hall &amp; Dept. Computing Centers
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            WHAT PARTICIPANTS CAN EXPECT SECTION
            ========================================================================= */}
        <div>
          <SectionTitle
            tag="Takeaways"
            title="What Participants Can Expect"
            subtitle="More than a competition — a rewarding festival celebrating passion and talent."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                icon: Trophy,
                title: 'Podium Honors & Cash Rewards',
                desc: 'Winners receive cash awards, prestigious trophies, and commemorative medals in front of the assembled audience.',
              },
              {
                icon: BookOpen,
                title: 'Industry & Academic Jury Feedback',
                desc: 'Constructive evaluations from experienced professors and technology professionals to hone your project defense skills.',
              },
              {
                icon: Users2,
                title: 'Peer Cross-Pollination',
                desc: 'Collaborate and network with engineering peers passionate about full-stack dev, AI, ethical hacking, and robotics.',
              },
              {
                icon: CheckCircle2,
                title: 'Official VTU-Affiliated Certificates',
                desc: 'Valid, authorized participation certificates recognizing your engagement in a national-level symposium.',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  <Icon size={24} className="text-cyan-400" />
                  <h4 style={{ fontSize: '1.15rem', color: '#ffffff' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

