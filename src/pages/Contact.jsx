import React, { useEffect } from 'react';
import { CONTACT_DATA } from '../data/contactData';
import { FEST_DATA, GOOGLE_FORM_URL } from '../data/festData';
import SectionTitle from '../components/SectionTitle';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  ExternalLink,
  Bus,
  Car,
  Train,
  UserCheck,
  GraduationCap,
  Sparkles,
  Info,
} from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    document.title = `Contact & Location | TECHNO VISTA 2K26 | Sri Sairam CE`;
  }, []);

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header */}
        <SectionTitle
          tag="Connect With Us"
          title="Contact &amp; Campus Location"
          subtitle="Reach out to our organizing conveners or navigate to the Sri Sairam College of Engineering campus."
        />

        {/* Organizer Editable Notice */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '900px',
            margin: '0 auto 3rem auto',
            padding: '1.1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            fontSize: '0.86rem',
            color: 'var(--text-secondary)',
          }}
        >
          <Info size={20} className="text-cyan-400" style={{ flexShrink: 0 }} />
          <span>
            <strong>Editable Placeholders:</strong> Phone numbers, coordinator names, emails, and social channels can be updated without altering UI code by opening <code style={{ color: '#38bdf8' }}>src/data/contactData.js</code>.
          </span>
        </div>

        {/* =========================================================================
            COORDINATORS SECTION (FACULTY & STUDENT)
            ========================================================================= */}
        <div style={{ marginBottom: '4.5rem' }}>
          {/* Faculty Coordinators */}
          <div style={{ marginBottom: '3rem' }}>
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
              <GraduationCap size={18} />
              <span>FACULTY CONVENERS (EDITABLE)</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {CONTACT_DATA.facultyCoordinators.map((fac, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  <span className="badge badge-cyan" style={{ alignSelf: 'flex-start' }}>
                    {fac.role}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                    {fac.name}
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                    {fac.designation}
                  </div>

                  <div
                    style={{
                      marginTop: '0.5rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      fontSize: '0.86rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                      <Phone size={14} className="text-cyan-400" />
                      <span>{fac.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                      <Mail size={14} className="text-cyan-400" />
                      <span>{fac.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Coordinators */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#c084fc',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              <UserCheck size={18} />
              <span>STUDENT COORDINATORS (EDITABLE)</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {CONTACT_DATA.studentCoordinators.map((stu, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
                >
                  <span className="badge badge-purple" style={{ alignSelf: 'flex-start' }}>
                    {stu.role}
                  </span>
                  <h4 style={{ fontSize: '1.15rem', color: '#ffffff' }}>
                    {stu.name}
                  </h4>

                  <div
                    style={{
                      marginTop: '0.5rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      fontSize: '0.84rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                      <Phone size={14} className="text-purple-400" />
                      <span>{stu.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                      <Mail size={14} className="text-purple-400" />
                      <span>{stu.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAP & VENUE ADDRESS SECTION
            ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Address & College Information */}
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#38bdf8', marginBottom: '1rem' }}>
                <MapPin size={24} />
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                  Venue &amp; Campus Location
                </h3>
              </div>

              <h4 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                {CONTACT_DATA.collegeName}
              </h4>

              <p style={{ fontSize: '0.92rem', color: '#38bdf8', fontWeight: 600, marginBottom: '1rem' }}>
                {CONTACT_DATA.department}
              </p>

              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {CONTACT_DATA.address.fullAddress}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.88rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <Mail size={16} className="text-cyan-400" />
                  <span>{CONTACT_DATA.generalContact.officialEmail}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <Phone size={16} className="text-cyan-400" />
                  <span>{CONTACT_DATA.generalContact.helplinePhone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
                  <Globe size={16} className="text-cyan-400" />
                  <a
                    href={CONTACT_DATA.socialLinks.collegeWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#38bdf8', textDecoration: 'underline' }}
                  >
                    sairamce.edu.in
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <a
                href={CONTACT_DATA.maps.viewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: '100%' }}
              >
                <span>Open in Google Maps App</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Google Maps Embed Container */}
          <div
            className="glass-card"
            style={{
              overflow: 'hidden',
              minHeight: '380px',
              position: 'relative',
              borderRadius: '16px',
            }}
          >
            <iframe
              title="Sri Sairam College of Engineering Campus Map"
              src={CONTACT_DATA.maps.embedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: '380px',
                filter: 'invert(90%) hue-rotate(180deg) contrast(90%)',
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* =========================================================================
            HOW TO REACH / TRANSPORTATION GUIDE
            ========================================================================= */}
        <div>
          <SectionTitle
            tag="Transit Guide"
            title="How to Reach Campus"
            subtitle="Guidance for outstation and local Bengaluru delegates traveling to Sri Sairam College of Engineering."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {CONTACT_DATA.travelInfo.map((item, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                  }}
                >
                  {idx === 0 ? <Bus size={22} /> : idx === 1 ? <Train size={22} /> : <Car size={22} />}
                </div>

                <h4 style={{ fontSize: '1.15rem', color: '#ffffff' }}>
                  {item.mode}
                </h4>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

