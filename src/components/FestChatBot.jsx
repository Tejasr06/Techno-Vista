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

  // Answer matching engine based on topic or user query
  const generateBotReply = (query) => {
    const q = query.toLowerCase();

    // 1. REGISTRATION
    if (q.includes('register') || q.includes('registration') || q.includes('form') || q.includes('apply') || q.includes('fee') || q.includes('cost')) {
      return {
        text: `Registrations for all 6 competitive tracks are processed through our unified official Google Form!\n\n• Centralized submission\n• Spot entry badge issued upon reporting\n• Authorized Certificate of Participation for all attendees`,
        action: {
          label: 'Open Official Google Form',
          url: googleFormUrl,
        },
        suggestions: ['What are the 6 events?', 'Team Rules & Eligibility', 'Date & Venue'],
      };
    }

    // 2. EVENTS
    if (q.includes('event') || q.includes('events') || q.includes('flagship') || q.includes('competition') || q.includes('track') || q.includes('game') || q.includes('coding')) {
      const eventList = eventsData.map((ev, i) => `${i + 1}. ${ev.name} (${ev.category})`).join('\n');
      return {
        text: `TECHNO VISTA 2K26 features 6 premier national-level competitions:\n\n${eventList}\n\nParticipants can take part in multiple events provided slot timings do not conflict!`,
        action: {
          label: 'Explore Event Details',
          link: '/events',
        },
        suggestions: ['How to Register?', 'Prizes & Perks', 'Team Rules & Eligibility'],
      };
    }

    // 3. DATE, TIME & VENUE
    if (q.includes('when') || q.includes('date') || q.includes('time') || q.includes('venue') || q.includes('where') || q.includes('location') || q.includes('place')) {
      return {
        text: `📅 Date: ${festData.dateText}\n⏰ Time: ${festData.timeText}\n🚪 Reporting Window: ${festData.reportingTime}\n🏛️ Venue: ${festData.venue}\n📍 Campus: ${festData.college}, ${festData.location}`,
        action: {
          label: 'View Campus on Google Maps',
          url: contactData.maps?.viewLink || 'https://maps.google.com/?q=Sri+Sairam+College+of+Engineering+Anekal',
        },
        suggestions: ['How to Reach Campus?', 'How to Register?', 'Contact Leads'],
      };
    }

    // 4. RULES & ELIGIBILITY
    if (q.includes('rule') || q.includes('eligib') || q.includes('allow') || q.includes('team') || q.includes('college id') || q.includes('cross')) {
      return {
        text: `Key Participation Protocols:\n\n1. Physical College ID Card is STRICTLY MANDATORY for campus entry.\n2. Cross-college teams are fully permitted for all team events!\n3. Every individual team member must register beforehand through the Google Form.\n4. Reporting time is 8:45 AM - 9:15 AM at the Seminar Hall desk.`,
        action: {
          label: 'Register Your Team Now',
          url: googleFormUrl,
        },
        suggestions: ['How to Register?', 'Prizes & Perks', 'Flagship Events'],
      };
    }

    // 5. PRIZES & CERTIFICATES
    if (q.includes('prize') || q.includes('award') || q.includes('certificate') || q.includes('cash') || q.includes('trophy') || q.includes('win')) {
      return {
        text: `🏆 Podium Rewards:\n\n• Winner & Runner-up Cash Prizes, Trophies & Medals awarded for every event track.\n• Authorized Certificates of Participation issued to ALL registered attendees.\n• Special perks and recognition for standout projects & performers!`,
        suggestions: ['Flagship Events', 'How to Register?', 'Contact Leads'],
      };
    }

    // 6. COORDINATORS & CONTACT
    if (q.includes('contact') || q.includes('coordinator') || q.includes('phone') || q.includes('call') || q.includes('lead') || q.includes('help') || q.includes('email')) {
      const studentLeads = (contactData.studentCoordinators || []).slice(0, 2).map((s) => `• ${s.name} (${s.role}): ${s.phone || s.contact}`).join('\n');
      const facultyLeads = (contactData.facultyCoordinators || []).slice(0, 1).map((f) => `• ${f.name} (${f.role || f.designation}): ${f.phone || f.contact}`).join('\n');
      return {
        text: `Organizing Conveners:\n\nStudent Leads:\n${studentLeads || 'Available at ISE Desk'}\n\nFaculty Conveners:\n${facultyLeads || 'Dept. of ISE'}\n\nOfficial Email: ${contactData.generalContact?.officialEmail || 'dept.ise@sairamce.edu.in'}`,
        suggestions: ['How to Register?', 'Date & Venue', 'Flagship Events'],
      };
    }

    // 7. TRAVEL & DIRECTIONS
    if (q.includes('travel') || q.includes('bus') || q.includes('reach') || q.includes('metro') || q.includes('route') || q.includes('transport')) {
      return {
        text: `Getting to Sri Sairam College of Engineering (Anekal, Bengaluru):\n\n🚌 By BMTC Bus: Direct buses run from Majestic, Banashankari, and Electronic City to Anekal Bus Stand. Auto-rickshaws connect Anekal town to the campus (approx. 3 km).\n\n🚇 By Metro: Alight at Silk Institute (Green Line) or Bommasandra (Yellow Line) and board connecting suburban feeder buses/cabs.`,
        action: {
          label: 'Open College in Google Maps',
          url: contactData.maps?.viewLink || 'https://maps.google.com/?q=Sri+Sairam+College+of+Engineering+Anekal',
        },
        suggestions: ['Date & Venue', 'How to Register?', 'Contact Leads'],
      };
    }

    // DEFAULT FALLBACK
    return {
      text: `Got it! For anything regarding registrations, tracks, schedules, or rules, I'm here to assist. Here are some quick topics you can explore:`,
      suggestions: [
        'How to Register?',
        'Flagship Events',
        'Date & Venue',
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
