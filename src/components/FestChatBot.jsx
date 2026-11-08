import React, { useState, useEffect, useRef } from 'react';
import { useFest } from '../context/FestContext';
import {
  X,
  Send,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Phone,
  Calendar,
  MapPin,
  Trophy,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  Shield,
  Layers,
  Award,
} from 'lucide-react';

export default function FestChatBot({ isOpen, onClose }) {
  const { festData, eventsData, contactData, scheduleData, googleFormUrl } = useFest();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Pre-curated Quick Question Chips
  const quickQuestions = [
    { id: 'register', label: '📝 How to Register?', icon: '📝' },
    { id: 'events', label: '🏆 Flagship Events', icon: '🏆' },
    { id: 'datetime', label: '📍 Date & Venue', icon: '📍' },
    { id: 'rules', label: '👥 Team Rules & Eligibility', icon: '👥' },
    { id: 'prizes', label: '🎁 Prizes & Perks', icon: '🎁' },
    { id: 'coordinators', label: '📞 Contact Leads', icon: '📞' },
    { id: 'travel', label: '🚌 How to Reach Campus?', icon: '🚌' },
  ];

  // Initialize conversation with welcoming message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: `Hi there! 👋 I'm your TECHNO VISTA 2K26 companion bot. How can I help you today? Tap any topic below or ask me a question!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            'How to Register?',
            'What are the 6 events?',
            'When & where is the fest?',
            'Are cross-college teams allowed?',
          ],
        },
      ]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Answer matching engine based strictly on actual website data from FestContext
  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();

    // 1. SPECIFIC EVENT MATCHING (Intelli Talks, Code Sprint, CTF, Build a Bot, Frame Fusion, Clash of Squadz)
    // Check if query targets a specific event from eventsData
    const matchedEvent = eventsData.find((ev) => {
      const name = ev.name.toLowerCase();
      const id = ev.id.toLowerCase();
      if (q === name || q.includes(name) || q.includes(id)) return true;
      if (id === 'intelli-talks' && (q.includes('intelli') || q.includes('paper presentation') || q.includes('paper'))) return true;
      if (id === 'code-sprint' && (q.includes('sprint') || q.includes('coding contest') || q.includes('competitive programming') || q.includes('bug'))) return true;
      if (id === 'capture-the-flag' && (q.includes('capture the flag') || q.includes('ctf') || q.includes('cyber') || q.includes('ethical hack') || q.includes('hacking'))) return true;
      if (id === 'build-a-bot' && (q.includes('build a bot') || q.includes('robotics') || q.includes('line follower') || q.includes('autonomous bot'))) return true;
      if (id === 'frame-fusion' && (q.includes('frame fusion') || q.includes('ui/ux') || q.includes('ui ux') || q.includes('figma') || q.includes('multimedia design'))) return true;
      if (id === 'clash-of-squadz' && (q.includes('clash of squadz') || q.includes('esports') || q.includes('bgmi') || q.includes('gaming') || q.includes('lan'))) return true;
      return false;
    });

    if (matchedEvent) {
      const roundsText = matchedEvent.rounds && matchedEvent.rounds.length > 0
        ? matchedEvent.rounds.map((r) => `  • ${r.roundNumber || ''}: ${r.title}`).join('\n')
        : 'See event page for round breakdown';

      const keyRulesText = matchedEvent.rules && matchedEvent.rules.length > 0
        ? matchedEvent.rules.slice(0, 3).map((rule, idx) => `  ${idx + 1}. ${rule}`).join('\n')
        : 'Standard fest guidelines apply';

      return {
        text: `⚡ ${matchedEvent.name.toUpperCase()} (${matchedEvent.badge || matchedEvent.category})\n"${matchedEvent.tagline}"\n\n📌 Subtitle: ${matchedEvent.subtitle}\n👥 Team Size: ${matchedEvent.teamSize}\n📍 Venue: ${matchedEvent.venue}\n⏰ Timing: ${matchedEvent.timing}\n🎓 Eligibility: ${matchedEvent.eligibility}\n\n🏆 Event Format:\n${roundsText}\n\n📋 Key Rules:\n${keyRulesText}`,
        action: {
          label: `View ${matchedEvent.name} Details`,
          link: `/events`,
        },
        suggestions: ['What are the other events?', 'How to Register?', 'Team Rules & Eligibility'],
      };
    }

    // 2. ALL EVENTS OVERVIEW
    if (q.includes('event') || q.includes('compet') || q.includes('track') || q.includes('flagship') || q.includes('contest')) {
      const eventList = eventsData
        .map((ev, i) => `${i + 1}. ${ev.name} — ${ev.subtitle}\n   • Category: ${ev.category}\n   • Team: ${ev.teamSize}\n   • Venue: ${ev.venue}`)
        .join('\n\n');

      return {
        text: `TECHNO VISTA 2K26 features 6 official national-level competitions organized by the Dept. of ISE:\n\n${eventList}\n\n💡 Participants can join multiple events as long as the timings do not overlap!`,
        action: {
          label: 'Explore All Events',
          link: '/events',
        },
        suggestions: [
          'Intelli Talks',
          'Code Sprint',
          'Capture the Flag',
          'Build a Bot',
          'Frame Fusion',
          'Clash of Squadz',
        ],
      };
    }

    // 3. SCHEDULE & TIMELINE
    if (q.includes('schedule') || q.includes('agenda') || q.includes('timeline') || q.includes('inaugur') || q.includes('lunch') || q.includes('slot')) {
      const slots = (scheduleData?.timeline || []).slice(0, 5).map((s) => `• ${s.time}: ${s.title} (${s.venue})`).join('\n');
      return {
        text: `Official Fest Day Schedule (${scheduleData?.festDate || festData.dateText}):\n\n${slots}\n\nCheck the complete live schedule for details on individual rounds and afternoon finals!`,
        action: {
          label: 'View Full Timeline',
          link: '/schedule',
        },
        suggestions: ['Date & Venue', 'Flagship Events', 'How to Register?'],
      };
    }

    // 4. REGISTRATION
    if (q.includes('register') || q.includes('registration') || q.includes('form') || q.includes('apply') || q.includes('fee') || q.includes('cost') || q.includes('price')) {
      const steps = festData.registrationSteps && festData.registrationSteps.length > 0
        ? festData.registrationSteps.map((s) => `${s.number}. ${s.title}: ${s.desc}`).join('\n\n')
        : 'Fill out the centralized Google Form to secure your team slot.';

      return {
        text: `How to Register for TECHNO VISTA 2K26:\n\n${steps}\n\n📌 Registration Fee Policy: Details (if applicable) are outlined directly within the official Google Form.`,
        action: {
          label: 'Open Official Google Form',
          url: googleFormUrl,
        },
        suggestions: ['Flagship Events', 'Team Rules & Eligibility', 'Date & Venue'],
      };
    }

    // 5. DATE, TIME & VENUE
    if (q.includes('when') || q.includes('date') || q.includes('time') || q.includes('venue') || q.includes('where') || q.includes('location') || q.includes('place') || q.includes('college')) {
      return {
        text: `TECHNO VISTA 2K26 Event Details:\n\n📅 Date: ${festData.dateText}\n⏰ Event Time: ${festData.timeText}\n🚪 Reporting Window: ${festData.reportingTime}\n🏛️ Campus: ${festData.college}\n🏢 Department: ${festData.organizedBy}\n📍 Address: ${festData.address}\n🎯 Venue on Campus: ${festData.venue}`,
        action: {
          label: 'View Campus on Google Maps',
          url: contactData.maps?.viewLink || 'https://maps.google.com/?q=Sri+Sairam+College+of+Engineering+Anekal+Bengaluru',
        },
        suggestions: ['How to Reach Campus?', 'Flagship Events', 'How to Register?'],
      };
    }

    // 6. RULES, ELIGIBILITY & ID CARD
    if (q.includes('rule') || q.includes('eligib') || q.includes('allow') || q.includes('id card') || q.includes('cross') || q.includes('team') || q.includes('usn')) {
      const notes = (festData.importantNotes || []).map((note, i) => `${i + 1}. ${note}`).join('\n');
      return {
        text: `Official Participation Guidelines:\n\n${notes}\n\n• Cross-college teams are permitted for all team events with valid IDs.\n• Ensure every member brings their physical college ID card on the fest day.`,
        action: {
          label: 'Register in Google Form',
          url: googleFormUrl,
        },
        suggestions: ['How to Register?', 'Flagship Events', 'Prizes & Perks'],
      };
    }

    // 7. PRIZES, AWARDS & CERTIFICATES
    if (q.includes('prize') || q.includes('award') || q.includes('certificate') || q.includes('cash') || q.includes('trophy') || q.includes('win') || q.includes('perk') || q.includes('takeaway')) {
      const takeawaysList = (festData.takeaways || []).map((t) => `• ${t.title}: ${t.desc}`).join('\n\n');
      return {
        text: `Prizes & Recognition at TECHNO VISTA 2K26:\n\n${takeawaysList || '• Winner & Runner-up Cash Awards, Trophies & Medals\n• Authorized Certificates of Participation for ALL registered attendees'}`,
        suggestions: ['Flagship Events', 'How to Register?', 'Contact Leads'],
      };
    }

    // 8. CONTACT & COORDINATORS
    if (q.includes('contact') || q.includes('coordinator') || q.includes('phone') || q.includes('call') || q.includes('lead') || q.includes('help') || q.includes('email') || q.includes('faculty') || q.includes('student')) {
      const faculty = (contactData.facultyCoordinators || []).map((f) => `• ${f.name} (${f.designation || f.role}): ${f.phone || f.email || 'Dept. of ISE'}`).join('\n');
      const students = (contactData.studentCoordinators || []).map((s) => `• ${s.name} (${s.role}): ${s.phone || 'Available at desk'}`).join('\n');

      return {
        text: `Event Organization Leads:\n\nDepartment: ${contactData.department}\nCollege: ${contactData.collegeName}\n\nFaculty Coordinators:\n${faculty || 'Dept. of ISE Faculty'}\n\nStudent Coordinators:\n${students || 'ISE Student Leads'}\n\n📧 Official Email: ${contactData.generalContact?.officialEmail || 'dept.ise@sairamce.edu.in'}\n🌐 Website: ${contactData.generalContact?.collegeWebsite || 'https://sairamce.edu.in'}`,
        suggestions: ['How to Register?', 'Date & Venue', 'Flagship Events'],
      };
    }

    // 9. TRAVEL & TRANSPORTATION
    if (q.includes('travel') || q.includes('bus') || q.includes('reach') || q.includes('metro') || q.includes('route') || q.includes('transport') || q.includes('direction')) {
      const travelPoints = (contactData.travelInfo || []).map((t) => `• ${t.mode}: ${t.details}`).join('\n\n');
      return {
        text: `How to Reach Sri Sairam College of Engineering (Anekal, Bengaluru):\n\n${travelPoints || 'Direct BMTC buses connect Majestic, Banashankari, and Electronic City to Anekal town. The campus is 3 km from Anekal bus stand.'}`,
        action: {
          label: 'Open Campus in Google Maps',
          url: contactData.maps?.viewLink || 'https://maps.google.com/?q=Sri+Sairam+College+of+Engineering+Anekal+Bengaluru',
        },
        suggestions: ['Date & Venue', 'How to Register?', 'Contact Leads'],
      };
    }

    // 10. FAQ CHECK
    const matchedFaq = (festData.faqs || []).find((f) => q.includes(f.q.toLowerCase().slice(0, 20)));
    if (matchedFaq) {
      return {
        text: `❓ ${matchedFaq.q}\n\n${matchedFaq.a}`,
        suggestions: ['How to Register?', 'Flagship Events', 'Team Rules & Eligibility'],
      };
    }

    // DEFAULT FALLBACK
    return {
      text: `Welcome to TECHNO VISTA 2K26 Assistant! Here are the official topics you can explore from our website:`,
      suggestions: [
        'Flagship Events',
        'How to Register?',
        'Date & Venue',
        'Team Rules & Eligibility',
        'Prizes & Perks',
        'Contact Leads',
      ],
    };
  };

  // Handle user selecting an option or submitting text
  const handleUserMessage = (text) => {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cleanText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic typing delay for conversational charm
    setTimeout(() => {
      const reply = generateBotReply(cleanText);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        action: reply.action,
        suggestions: reply.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Conversation restarted! 👋 What would you like to know about TECHNO VISTA 2K26?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'How to Register?',
          'What are the 6 events?',
          'When & where is the fest?',
          'Contact Leads',
        ],
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          height: 'min(640px, 88vh)',
          margin: '0 16px 16px 0',
          backgroundColor: '#050a1b',
          borderRadius: '20px',
          border: '1.5px solid rgba(0, 212, 255, 0.45)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 212, 255, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'chatModalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* =========================================================================
            HEADER: ROBOT BRANDING, ONLINE STATUS & CONTROLS
            ========================================================================= */}
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, rgba(8, 16, 38, 0.95), rgba(15, 23, 42, 0.9))',
            borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Robot Head Badge */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#0a1738',
                border: '1.5px solid #00f0ff',
                boxShadow: '0 0 14px rgba(0, 240, 255, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}
            >
              🤖
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-cyber)',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                  }}
                >
                  VISTA BOT
                </span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(0, 240, 255, 0.15)',
                    color: '#00f0ff',
                    fontWeight: 700,
                    border: '1px solid rgba(0, 240, 255, 0.35)',
                  }}
                >
                  2K26
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                <span
                  style={{
                    width: '6.5px',
                    height: '6.5px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                  }}
                />
                <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                  Fest Guide Assistant // Online
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={handleResetChat}
              title="Restart Conversation"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
            </button>

            <button
              onClick={onClose}
              title="Close Chat"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            MESSAGES SCROLL AREA
            ========================================================================= */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '88%',
                  alignSelf: isBot ? 'flex-start' : 'flex-end',
                }}
              >
                <div
                  style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    backgroundColor: isBot ? 'rgba(15, 26, 56, 0.85)' : 'linear-gradient(135deg, #00d4ff, #2563eb)',
                    background: isBot
                      ? 'rgba(15, 26, 56, 0.9)'
                      : 'linear-gradient(135deg, #00d4ff, #2563eb)',
                    border: isBot ? '1px solid rgba(0, 212, 255, 0.25)' : 'none',
                    color: isBot ? '#e2e8f0' : '#ffffff',
                    fontSize: '0.9rem',
                    lineHeight: 1.55,
                    boxShadow: isBot
                      ? '0 4px 15px rgba(0, 0, 0, 0.35)'
                      : '0 4px 18px rgba(0, 212, 255, 0.35)',
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}

                  {/* Contextual Action Button (e.g. Open Google Form) */}
                  {msg.action && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <a
                        href={msg.action.url || msg.action.link}
                        target={msg.action.url ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 1rem',
                          borderRadius: '8px',
                          backgroundColor: '#00d4ff',
                          color: '#050a1b',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          textDecoration: 'none',
                          boxShadow: '0 0 14px rgba(0, 212, 255, 0.5)',
                        }}
                      >
                        <span>{msg.action.label}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </div>

                <span style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px', padding: '0 4px' }}>
                  {msg.timestamp}
                </span>

                {/* Follow-up question suggestion chips */}
                {isBot && msg.suggestions && msg.suggestions.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.45rem',
                      marginTop: '0.65rem',
                    }}
                  >
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleUserMessage(sug)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '20px',
                          backgroundColor: 'rgba(0, 212, 255, 0.08)',
                          border: '1px solid rgba(0, 212, 255, 0.3)',
                          color: '#38bdf8',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <span>{sug}</span>
                        <ChevronRight size={12} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div
              style={{
                alignSelf: 'flex-start',
                padding: '0.7rem 1rem',
                borderRadius: '16px 16px 16px 4px',
                backgroundColor: 'rgba(15, 26, 56, 0.85)',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00d4ff', animation: 'typingPulse 1.2s infinite' }} />
              <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8', animation: 'typingPulse 1.2s infinite 0.2s' }} />
              <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7', animation: 'typingPulse 1.2s infinite 0.4s' }} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* =========================================================================
            QUICK QUESTION PILLS TRAY (Top Picks)
            ========================================================================= */}
        <div
          style={{
            padding: '0.65rem 1rem',
            backgroundColor: 'rgba(7, 14, 34, 0.85)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
          }}
        >
          {quickQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => handleUserMessage(q.label.replace(/^[^\s]+\s/, ''))}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>{q.label}</span>
            </button>
          ))}
        </div>

        {/* =========================================================================
            INPUT BAR: TEXT FIELD & SEND BUTTON
            ========================================================================= */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserMessage(inputValue);
          }}
          style={{
            padding: '0.85rem 1rem',
            backgroundColor: '#040816',
            borderTop: '1px solid rgba(0, 212, 255, 0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <input
            type="text"
            placeholder="Ask about events, rules, registration..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flexGrow: 1,
              padding: '0.7rem 1rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '0.88rem',
              outline: 'none',
            }}
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: inputValue.trim() ? '#00d4ff' : 'rgba(255, 255, 255, 0.08)',
              color: inputValue.trim() ? '#050a1b' : '#64748b',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputValue.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes chatModalSlideUp {
          from {
            transform: translateY(40px) scale(0.96);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes typingPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

