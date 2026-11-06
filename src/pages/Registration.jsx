import React, { useEffect } from 'react';
import { useFest } from '../context/FestContext';
import SectionTitle from '../components/SectionTitle';
import {
  ExternalLink,
  ClipboardCheck,
  Users,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  FileText,
  Calendar,
  CheckCircle2,
  Info,
} from 'lucide-react';

export default function Registration() {
  const { googleFormUrl, festData } = useFest();
  const isConfigured =
    googleFormUrl &&
    googleFormUrl !== 'PASTE_GOOGLE_FORM_LINK_HERE' &&
    googleFormUrl.startsWith('http');

  useEffect(() => {
    document.title = `Registration | TECHNO VISTA 2K26 | Sri Sairam College of Engineering`;
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Review Event Rules & Eligibility',
      desc: 'Browse through the 6 official events, verify team size requirements, and ensure all team members meet the eligibility criteria.',
    },
    {
      number: '02',
      title: 'Assemble Your Team & Credentials',
      desc: 'Collect each member’s full name, valid email address, phone number, college USN/Roll number, and official college affiliation.',
    },
    {
      number: '03',
      title: 'Fill Out The Official Google Form',
      desc: 'Click the button below to access our centralized Google Form. Select your chosen competitive tracks and submit your team roster.',
    },
    {
      number: '04',
      title: 'Bring College ID & Report on Fest Day',
      desc: 'Carry your original physical College Identity Card on 26 November 2026. Report between 8:45 AM and 9:15 AM at the Seminar Hall desk.',
    },
  ];

  const faqs = [
    {
      q: 'Can members from different colleges form a single team?',
      a: 'Yes, cross-college teams are permitted for all team-based events (Intelli Talks, Build a Bot, CTF, Clash of Squadz). Every individual member must present a valid college ID from their respective institution.',
    },
    {
      q: 'Can one person participate in more than one event?',
      a: 'Yes! Participants can register for multiple tracks, provided the event timings and laboratory sessions do not conflict. Check individual event details for slot timings.',
    },
    {
      q: 'Will all participants receive certificates?',
      a: 'Yes, authorized Certificates of Participation from the Department of Information Science and Engineering, Sri Sairam College of Engineering will be awarded to all registered attendees.',
    },
    {
      q: 'Is on-spot registration available on the day of the fest?',
      a: 'While limited on-spot slots may be available based on workstation and arena capacity, online pre-registration via Google Form is strongly recommended to guarantee participation.',
    },
    {
      q: 'What is the registration fee policy?',
      a: 'Registration fee details (if applicable for specific tracks or all-access passes) are outlined directly within the official Google Form. Please refer to the form instructions upon clicking the link.',
    },
  ];

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Header */}
        <SectionTitle
          tag="Fest Registration"
          title="Official Registration Portal"
          subtitle="All registrations for TECHNO VISTA 2K26 are processed through our unified official Google Form."
        />

        {/* Organizer Notice Banner if URL is not yet configured */}
        {!isConfigured && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <AlertTriangle size={24} className="text-amber-400" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 700, marginBottom: '0.3rem' }}>
                Organizer Configuration Note
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#fde68a', lineHeight: 1.55 }}>
                The registration link is currently set to the default placeholder <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>"{GOOGLE_FORM_URL}"</code>. To connect your live form, simply paste your Google Form link in <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>src/data/festData.js</code>. All buttons across the site will immediately redirect to it!
              </p>
            </div>
          </div>
        )}

        {/* Central Registration Hero Card */}
        <div
          className="glass-card"
          style={{
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(0, 212, 255, 0.3)',
          }}
        >
          {/* Background Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#38bdf8',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <ClipboardCheck size={16} />
            <span>DIRECT GOOGLE FORM ACCESS</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
              color: '#ffffff',
              marginBottom: '1rem',
            }}
          >
            Register Now for TECHNO VISTA 2K26
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.6,
            }}
          >
            Click the button below to open the official registration form in a new tab. You can select single or multiple events and register individual entries or teams.
          </p>

          {/* Big CTA Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: '1.1rem 3rem',
                fontSize: '1.15rem',
                boxShadow: '0 8px 30px rgba(0, 212, 255, 0.45)',
              }}
            >
              <span>Open Official Google Form</span>
              <ExternalLink size={20} />
            </a>

            {/* Direct Form Link Display & Copy */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#38bdf8',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Direct Link:</span>
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'underline' }}
              >
                {googleFormUrl}
              </a>
            </div>
          </div>

          <div
            style={{
              marginTop: '1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
              fontSize: '0.85rem',
              color: '#94a3b8',
            }}
          >
            <span>🔒 Secure Google Form Submission</span>
            <span>⚡ Instant Response Confirmation</span>
            <span>🎫 Spot Entry Pass on Fest Morning</span>
          </div>
        </div>

        {/* Step-by-Step Registration Process */}
        <div style={{ marginBottom: '4.5rem' }}>
          <SectionTitle
            tag="Roadmap"
            title="4 Simple Steps to Register"
            subtitle="Follow this streamlined flow to confirm your team participation."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {steps.map((st) => (
              <div
                key={st.number}
                className="glass-card"
                style={{
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#00d4ff',
                    lineHeight: 1,
                    marginBottom: '1rem',
                  }}
                >
                  {st.number}
                </span>

                <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.6rem' }}>
                  {st.title}
                </h4>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Participation Rules */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            marginBottom: '4.5rem',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <ShieldCheck size={24} className="text-cyan-400" />
            <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
              Mandatory Fest Rules &amp; Protocols
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              'Physical College ID Card is STRICTLY MANDATORY for campus entry and kit collection.',
              'Cross-college teams are permitted; all team members must possess their respective institution ID cards.',
              'Reporting Time: Participants must report between 8:45 AM and 9:15 AM at Sri Sairam College of Engineering.',
              'Teams arriving after the event commencement may forfeit preliminary round scores at the jury’s discretion.',
              'Discipline, code of conduct, and campus decorum must be maintained throughout the fest.',
            ].map((rule, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={16} className="text-cyan-400" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div>
          <SectionTitle
            tag="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Common queries regarding registration, teams, and fest day protocol."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{ padding: '1.75rem' }}
              >
                <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={18} className="text-purple-400" />
                  <span>{faq.q}</span>
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, paddingLeft: '1.65rem' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

