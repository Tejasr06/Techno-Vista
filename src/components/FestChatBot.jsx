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
  const { festData, eventsData, contactData, scheduleData, announcementsData, googleFormUrl } = useFest();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Dynamic quick-action chips generated directly from live FestContext data
  const quickQuestions = [
    { id: 'register', label: '📝 Registration Form', query: 'How to register for the fest?' },
    { id: 'events', label: `🏆 All Events (${eventsData?.length || 0})`, query: 'Show all flagship events' },
    { id: 'datetime', label: '📍 Date & Venue', query: 'When and where is the fest?' },
    { id: 'schedule', label: `📅 Schedule (${(scheduleData?.timeline || []).length} slots)`, query: 'Show the event schedule and timeline' },
    { id: 'rules', label: '👥 Rules & Eligibility', query: 'What are the team rules and eligibility criteria?' },
    { id: 'prizes', label: '🎁 Prizes & Perks', query: 'What are the prizes and takeaways?' },
    { id: 'coordinators', label: '📞 Contact Leads', query: 'Who are the faculty and student coordinators?' },
    { id: 'travel', label: '🚌 How to Reach', query: 'How to reach Sri Sairam College of Engineering?' },
    ...(announcementsData && announcementsData.length > 0
      ? [{ id: 'announcements', label: `📢 Live Alerts (${announcementsData.length})`, query: 'Show live announcements' }]
      : []),
    // Individual live event chips
    ...(eventsData || []).map((ev) => ({
      id: `ev-${ev.id}`,
      label: `⚡ ${ev.name}`,
      query: `Tell me about ${ev.name}`,
    })),
  ];

  // Initialize conversation with live greeting derived from current festData
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: `Hi there! 👋 I am your live ${festData?.name || 'Techno Vista'} assistant. Every answer I provide comes directly from this website's real-time information.\n\nTap any topic or event below to explore!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            'Show all flagship events',
            'How to register for the fest?',
            'When and where is the fest?',
            ...(eventsData || []).slice(0, 3).map((e) => `Tell me about ${e.name}`),
          ],
        },
      ]);
    }
  }, [isOpen, festData?.name, eventsData]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Answer matching engine based 100% on actual live data from FestContext
  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();

    // 1. SPECIFIC EVENT MATCHING (Completely dynamic: checks every event currently in eventsData)
    const matchedEvent = (eventsData || []).find((ev) => {
      const name = (ev.name || '').toLowerCase();
      const id = (ev.id || '').toLowerCase();
      const cat = (ev.category || '').toLowerCase();
      const sub = (ev.subtitle || '').toLowerCase();
      if (q === name || q.includes(name) || name.includes(q)) return true;
      if (q === id || q.includes(id)) return true;
      if (cat && (q.includes(cat) || cat.includes(q))) return true;
      if (sub && (q.includes(sub) || sub.includes(q))) return true;
      return false;
    });

    if (matchedEvent) {
      let details = `⚡ ${matchedEvent.name.toUpperCase()}`;
      if (matchedEvent.subtitle) details += ` — ${matchedEvent.subtitle}`;
      if (matchedEvent.tagline) details += `\n"${matchedEvent.tagline}"`;
      if (matchedEvent.category) details += `\n\n📌 Category: ${matchedEvent.category}`;
      if (matchedEvent.shortDescription || matchedEvent.overview) {
        details += `\n📖 Overview: ${matchedEvent.shortDescription || matchedEvent.overview}`;
      }
      if (matchedEvent.teamSize) details += `\n👥 Team Size: ${matchedEvent.teamSize}`;
      if (matchedEvent.venue) details += `\n📍 Venue: ${matchedEvent.venue}`;
      if (matchedEvent.timing) details += `\n⏰ Timing: ${matchedEvent.timing}`;
      if (matchedEvent.eligibility) details += `\n🎓 Eligibility: ${matchedEvent.eligibility}`;

      if (matchedEvent.rounds && matchedEvent.rounds.length > 0) {
        const roundsList = matchedEvent.rounds
          .map((r) => `  • ${r.roundNumber ? `${r.roundNumber}: ` : ''}${r.title}${r.description ? ` (${r.description})` : ''}`)
          .join('\n');
        details += `\n\n🏆 Competition Rounds:\n${roundsList}`;
      }

      if (matchedEvent.rules && matchedEvent.rules.length > 0) {
        const rulesList = matchedEvent.rules.map((r, i) => `  ${i + 1}. ${r}`).join('\n');
        details += `\n\n📋 Event Rules:\n${rulesList}`;
      }

      if (matchedEvent.judgingCriteria && matchedEvent.judgingCriteria.length > 0) {
        const criteriaList = matchedEvent.judgingCriteria.map((j) => `  • ${j.parameter}: ${j.weight}`).join('\n');
        details += `\n\n⚖️ Judging Criteria:\n${criteriaList}`;
      }

      const otherEvents = (eventsData || []).filter((e) => e.id !== matchedEvent.id).slice(0, 3).map((e) => `Tell me about ${e.name}`);

      return {
        text: details,
        action: {
          label: `Explore ${matchedEvent.name} Page`,
          link: `/events`,
        },
        suggestions: [...otherEvents, 'How to register for the fest?', 'When and where is the fest?'],
      };
    }

    // 2. ALL EVENTS OVERVIEW (Dynamically maps current eventsData)
    if (q.includes('event') || q.includes('compet') || q.includes('track') || q.includes('flagship') || q.includes('contest') || q.includes('game') || q.includes('all')) {
      const eventList = (eventsData || [])
        .map((ev, i) => {
          let line = `${i + 1}. ⚡ ${ev.name}`;
          if (ev.subtitle) line += ` — ${ev.subtitle}`;
          if (ev.category) line += `\n   • Track: ${ev.category}`;
          if (ev.teamSize) line += `\n   • Team: ${ev.teamSize}`;
          if (ev.venue) line += `\n   • Venue: ${ev.venue}`;
          if (ev.timing) line += `\n   • Timing: ${ev.timing}`;
          return line;
        })
        .join('\n\n');

      return {
        text: `${festData?.name || 'Techno Vista'} currently features ${eventsData?.length || 0} premier national-level competitions organized by the ${festData?.organizedBy || 'Dept. of ISE'}:\n\n${eventList}\n\n💡 Participants can join multiple events provided their slot timings do not conflict!`,
        action: {
          label: 'View All Events on Website',
          link: '/events',
        },
        suggestions: (eventsData || []).map((e) => `Tell me about ${e.name}`),
      };
    }

    // 3. SCHEDULE & TIMELINE (Dynamically maps current scheduleData.timeline)
    if (q.includes('schedule') || q.includes('agenda') || q.includes('timeline') || q.includes('inaugur') || q.includes('lunch') || q.includes('slot') || q.includes('session')) {
      const dateHeader = scheduleData?.festDate || festData?.dateText || 'Fest Day';
      const slots = (scheduleData?.timeline || []).map((s) => {
        let str = `• ${s.time}: ${s.title}`;
        if (s.venue) str += ` [📍 ${s.venue}]`;
        if (s.description) str += `\n  ${s.description}`;
        if (s.subEvents && s.subEvents.length > 0) {
          str += '\n' + s.subEvents.map((se) => `    - ${se.name} (${se.time}) @ ${se.venue}`).join('\n');
        }
        return str;
      }).join('\n\n');

      return {
        text: `Official Event Schedule (${dateHeader}):\n\n${slots}\n\n${scheduleData?.note || ''}`,
        action: {
          label: 'View Full Schedule Page',
          link: '/schedule',
        },
        suggestions: ['When and where is the fest?', 'How to register for the fest?', 'Show all flagship events'],
      };
    }

    // 4. REGISTRATION & GOOGLE FORM (Dynamically pulls registrationSteps and googleFormUrl)
    if (q.includes('register') || q.includes('registration') || q.includes('form') || q.includes('apply') || q.includes('enroll') || q.includes('fee') || q.includes('cost') || q.includes('price')) {
      const steps = (festData?.registrationSteps || []).map((s) => `${s.number}. ${s.title}:\n   ${s.desc}`).join('\n\n');

      return {
        text: `How to Register for ${festData?.name || 'Techno Vista'}:\n\n${steps || 'Please click the button below to register through the official Google Form.'}\n\n📌 Centralized Form Link: All event tracks are registered through our unified portal.`,
        action: {
          label: 'Open Official Registration Form',
          url: googleFormUrl,
        },
        suggestions: ['What are the team rules and eligibility criteria?', 'Show all flagship events', 'When and where is the fest?'],
      };
    }

    // 5. DATE, TIME & VENUE (Dynamically pulls from festData and contactData)
    if (q.includes('when') || q.includes('date') || q.includes('time') || q.includes('venue') || q.includes('where') || q.includes('location') || q.includes('place') || q.includes('college') || q.includes('address')) {
      return {
        text: `${festData?.name || 'Techno Vista'} Official Venue & Date Details:\n\n📅 Date: ${festData?.dateText || 'TBA'}\n⏰ Main Timing: ${festData?.timeText || '9:30 AM onwards'}\n🚪 Reporting Window: ${festData?.reportingTime || '8:45 AM - 9:15 AM'}\n🏛️ Institution: ${festData?.college || 'Sri Sairam College of Engineering'}\n🏢 Organized By: ${festData?.organizedBy || 'Department of ISE'}\n📍 Full Address: ${contactData?.address?.fullAddress || festData?.address || ''}\n🎯 Campus Venue: ${festData?.venue || 'Seminar Hall & ISE Labs'}`,
        action: {
          label: 'View Campus on Google Maps',
          url: contactData?.maps?.viewLink || 'https://maps.google.com/?q=Sri+Sairam+College+of+Engineering+Anekal+Bengaluru',
        },
        suggestions: ['How to reach Sri Sairam College of Engineering?', 'Show all flagship events', 'How to register for the fest?'],
      };
    }

    // 6. RULES, ELIGIBILITY & ID CARD (Dynamically pulls importantNotes and faqs)
    if (q.includes('rule') || q.includes('eligib') || q.includes('allow') || q.includes('id card') || q.includes('cross') || q.includes('team') || q.includes('usn') || q.includes('guideline')) {
      const notes = (festData?.importantNotes || []).map((note, i) => `${i + 1}. ${note}`).join('\n');
      const teamFaq = (festData?.faqs || []).find((f) => f.q.toLowerCase().includes('team') || f.q.toLowerCase().includes('college'));

      let responseText = `Official Participation Guidelines:\n\n${notes}`;
      if (teamFaq) {
        responseText += `\n\n❓ ${teamFaq.q}\n👉 ${teamFaq.a}`;
      }

      return {
        text: responseText,
        action: {
          label: 'Register in Google Form',
          url: googleFormUrl,
        },
        suggestions: ['How to register for the fest?', 'Show all flagship events', 'What are the prizes and takeaways?'],
      };
    }

    // 7. PRIZES, AWARDS & CERTIFICATES (Dynamically pulls takeaways and highlights)
    if (q.includes('prize') || q.includes('award') || q.includes('certificate') || q.includes('cash') || q.includes('trophy') || q.includes('win') || q.includes('perk') || q.includes('takeaway')) {
      const takeawaysList = (festData?.takeaways || []).map((t) => `🏆 ${t.title}:\n   ${t.desc}`).join('\n\n');
      const highlightsList = (festData?.highlights || []).map((h) => `• ${h.label}: ${h.sub}`).join('\n');

      return {
        text: `Awards & Takeaways at ${festData?.name || 'Techno Vista'}:\n\n${takeawaysList || '• Winner & Runner-up Cash Awards, Trophies & Medals\n• Authorized Certificates of Participation for ALL registered attendees'}\n\n🌟 Fest Highlights:\n${highlightsList}`,
        suggestions: ['Show all flagship events', 'How to register for the fest?', 'Who are the faculty and student coordinators?'],
      };
    }

    // 8. LIVE ANNOUNCEMENTS (Dynamically pulls announcementsData)
    if (q.includes('announcement') || q.includes('announcements') || q.includes('update') || q.includes('updates') || q.includes('news') || q.includes('alert') || q.includes('notice')) {
      if (announcementsData && announcementsData.length > 0) {
        const annList = announcementsData
          .map((a, i) => `${i + 1}. [${a.badge || a.category || 'Live Update'}] ${a.title} (${a.date || a.timestamp || 'Latest'})\n   ${a.content || a.message || a.desc || ''}`)
          .join('\n\n');

        return {
          text: `📢 Official Live Announcements:\n\n${annList}`,
          suggestions: ['Show the event schedule and timeline', 'Show all flagship events', 'How to register for the fest?'],
        };
      } else {
        return {
          text: `There are currently no active live announcements posted. Any updates published by the fest organizers will automatically appear here!`,
          suggestions: ['Show all flagship events', 'When and where is the fest?', 'How to register for the fest?'],
        };
      }
    }

    // 9. CONTACT & COORDINATORS (Dynamically pulls contactData)
    if (q.includes('contact') || q.includes('coordinator') || q.includes('phone') || q.includes('call') || q.includes('lead') || q.includes('help') || q.includes('email') || q.includes('faculty') || q.includes('student')) {
      const faculty = (contactData?.facultyCoordinators || [])
        .map((f) => `• ${f.name} (${f.designation || f.role || 'Faculty Convener'})${f.phone ? ` | 📞 ${f.phone}` : ''}${f.email ? ` | ✉️ ${f.email}` : ''}`)
        .join('\n');

      const students = (contactData?.studentCoordinators || [])
        .map((s) => `• ${s.name} (${s.role || 'Student Lead'})${s.phone ? ` | 📞 ${s.phone}` : ''}${s.email ? ` | ✉️ ${s.email}` : ''}`)
        .join('\n');

      return {
        text: `Official Event Coordinators:\n\n🏢 Department: ${contactData?.department || festData?.organizedBy || 'Dept. of ISE'}\n🏛️ Institution: ${contactData?.collegeName || festData?.college || 'Sri Sairam College of Engineering'}\n\nFaculty Coordinators:\n${faculty || 'Dept. of ISE Faculty'}\n\nStudent Coordinators:\n${students || 'ISE Student Leads'}\n\n📧 Official Email: ${contactData?.generalContact?.officialEmail || 'dept.ise@sairamce.edu.in'}\n🌐 College Website: ${contactData?.generalContact?.collegeWebsite || 'https://sairamce.edu.in'}`,
        suggestions: ['How to register for the fest?', 'When and where is the fest?', 'Show all flagship events'],
      };
    }

    // 10. TRAVEL & TRANSPORTATION (Dynamically pulls travelInfo)
    if (q.includes('travel') || q.includes('bus') || q.includes('reach') || q.includes('metro') || q.includes('route') || q.includes('transport') || q.includes('direction')) {
      const travelPoints = (contactData?.travelInfo || []).map((t) => `🚌 ${t.mode}:\n   ${t.details}`).join('\n\n');

      return {
        text: `How to Reach ${contactData?.collegeName || festData?.college || 'Sri Sairam College of Engineering'}:\n\n${travelPoints || 'Direct BMTC buses connect Majestic, Banashankari, and Electronic City to Anekal town. The campus is 3 km from Anekal bus stand.'}`,
        action: {
          label: 'Open Campus in Google Maps',
          url: contactData?.maps?.viewLink || 'https://maps.google.com/?q=Sri+Sairam+College+of+Engineering+Anekal+Bengaluru',
        },
        suggestions: ['When and where is the fest?', 'How to register for the fest?', 'Who are the faculty and student coordinators?'],
      };
    }

    // 11. ABOUT FEST, COLLEGE & DEPARTMENT (Dynamically pulls aboutFest, aboutCollege, aboutDepartment)
    if (q.includes('about') || q.includes('mission') || q.includes('vision') || q.includes('department') || q.includes('ise') || q.includes('sairam')) {
      const aboutFestDesc = Array.isArray(festData?.aboutFest?.description)
        ? festData.aboutFest.description.join('\n\n')
        : festData?.aboutFest?.description || '';

      return {
        text: `About ${festData?.name || 'Techno Vista'}:\n\n${aboutFestDesc}\n\n🎯 Mission: ${festData?.aboutFest?.mission || ''}\n👁️ Vision: ${festData?.aboutFest?.vision || ''}\n\n🏛️ ${festData?.aboutCollege?.name || 'College'}:\n${festData?.aboutCollege?.overview || ''}\n\n🏢 ${festData?.aboutDepartment?.name || 'Department'}:\n${festData?.aboutDepartment?.overview || ''}`,
        suggestions: ['Show all flagship events', 'When and where is the fest?', 'How to register for the fest?'],
      };
    }

    // 12. DYNAMIC FAQ LOOKUP (Matches any question in festData.faqs)
    const matchedFaq = (festData?.faqs || []).find((f) => {
      const qWords = q.split(/\s+/).filter((w) => w.length >= 3);
      const fWords = f.q.toLowerCase().split(/\s+/);
      const overlap = qWords.filter((w) => fWords.some((fw) => fw.includes(w) || w.includes(fw)));
      return overlap.length >= 2;
    });

    if (matchedFaq) {
      return {
        text: `❓ ${matchedFaq.q}\n\n👉 ${matchedFaq.a}`,
        suggestions: ['How to register for the fest?', 'Show all flagship events', 'What are the team rules and eligibility criteria?'],
      };
    }

    // DEFAULT FALLBACK (Uses real live entities)
    return {
      text: `Welcome to the live assistant for ${festData?.name || 'Techno Vista'}! Here are the active topics available right now:`,
      suggestions: [
        'Show all flagship events',
        'How to register for the fest?',
        'When and where is the fest?',
        'Show the event schedule and timeline',
        'What are the team rules and eligibility criteria?',
        ...(eventsData || []).slice(0, 2).map((e) => `Tell me about ${e.name}`),
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
              onClick={() => handleUserMessage(q.query || q.label.replace(/^[^\s]+\s/, ''))}
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

