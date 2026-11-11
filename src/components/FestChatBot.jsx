import React, { useState, useEffect, useRef } from 'react';
import { useFest } from '../context/FestContext';
import {
  X,
  Send,
  ExternalLink,
  RotateCcw,
  RefreshCw,
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

const STORAGE_KEY = 'techno_vista_2k26_custom_data';

export default function FestChatBot({ isOpen, onClose }) {
  const {
    festData,
    eventsData,
    contactData,
    scheduleData,
    announcementsData,
    googleFormUrl,
    reloadFromStorage,
    isCloudConnected,
  } = useFest();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [syncToast, setSyncToast] = useState('');
  const messagesEndRef = useRef(null);

  // Directly reads the freshest data from localStorage to eliminate any stale closures or delay
  const getLiveFestState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          currentFest: parsed.festData || festData,
          currentEvents: Array.isArray(parsed.eventsData) ? parsed.eventsData : eventsData,
          currentSchedule: parsed.scheduleData || scheduleData,
          currentAnnouncements: Array.isArray(parsed.announcementsData) ? parsed.announcementsData : announcementsData,
          currentContact: parsed.contactData || contactData,
          currentFormUrl: parsed.googleFormUrl || googleFormUrl,
        };
      }
    } catch (e) {
      console.error('Error fetching live fest state in bot:', e);
    }
    return {
      currentFest: festData,
      currentEvents: eventsData,
      currentSchedule: scheduleData,
      currentAnnouncements: announcementsData,
      currentContact: contactData,
      currentFormUrl: googleFormUrl,
    };
  };

  // Helper to sanitize placeholder brackets if an admin hasn't edited a field yet
  const cleanText = (str) => {
    if (!str) return '';
    return str
      .replace(/\s*\((?:Tentative\s*\/)?\s*Editable(?:\s+Placeholder|\s+in\s+eventsData\.js)?\)/gi, '')
      .replace(/\[Phone\/Email\s+Placeholder\]/gi, 'Contact available at ISE Desk')
      .replace(/\[Phone\s+Placeholder\]/gi, 'Available at Registration Desk')
      .replace(/\[\+91\s+XXXXX\s+XXXXX\s*-\s*Editable\]/gi, '+91 (Dept. of ISE Helpline)')
      .replace(/\[Editable(?:\s+Placeholder)?:\s*[^\]]+\]/gi, '')
      .trim();
  };

  // Whenever the chatbot is opened, immediately refresh data from localStorage
  useEffect(() => {
    if (isOpen) {
      if (reloadFromStorage) {
        reloadFromStorage();
      }
      const { currentFest, currentEvents } = getLiveFestState();
      // If no messages yet, load initial greeting
      if (messages.length === 0) {
        setMessages([
          {
            id: 'welcome-1',
            sender: 'bot',
            text: `Hi there! 👋 I am your live ${currentFest?.name || 'Techno Vista'} assistant. Every detail I give comes directly from this website's real-time data.\n\nTap any topic or event below to explore!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: [
              'Show all flagship events',
              'How to register for the fest?',
              'When and where is the fest?',
              ...(currentEvents || []).slice(0, 3).map((e) => `Tell me about ${e.name}`),
            ],
          },
        ]);
      }
    }
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Dynamic quick-action chips generated directly from live state
  const { currentEvents, currentSchedule, currentAnnouncements } = getLiveFestState();
  const quickQuestions = [
    { id: 'register', label: '📝 Registration Form', query: 'How to register for the fest?' },
    { id: 'events', label: `🏆 All Events (${currentEvents?.length || 0})`, query: 'Show all flagship events' },
    { id: 'datetime', label: '📍 Date & Venue', query: 'When and where is the fest?' },
    { id: 'schedule', label: `📅 Schedule (${(currentSchedule?.timeline || []).length} slots)`, query: 'Show the event schedule and timeline' },
    { id: 'rules', label: '👥 Rules & Eligibility', query: 'What are the team rules and eligibility criteria?' },
    { id: 'prizes', label: '🎁 Prizes & Perks', query: 'What are the prizes and takeaways?' },
    { id: 'coordinators', label: '📞 Contact Leads', query: 'Who are the faculty and student coordinators?' },
    { id: 'travel', label: '🚌 How to Reach', query: 'How to reach Sri Sairam College of Engineering?' },
    ...(currentAnnouncements && currentAnnouncements.length > 0
      ? [{ id: 'announcements', label: `📢 Live Alerts (${currentAnnouncements.length})`, query: 'Show live announcements' }]
      : []),
    // Individual live event chips
    ...(currentEvents || []).map((ev) => ({
      id: `ev-${ev.id}`,
      label: `⚡ ${ev.name}`,
      query: `Tell me about ${ev.name}`,
    })),
  ];

  // Answer matching engine based 100% on live state
  const generateBotReply = (query) => {
    // Re-fetch live state at the exact moment this query is executed
    const {
      currentFest,
      currentEvents,
      currentSchedule,
      currentAnnouncements,
      currentContact,
      currentFormUrl,
    } = getLiveFestState();

    const rawQ = query.toLowerCase().trim();
    // Strip common filler prefixes
    const q = rawQ.replace(/^(tell me about|what is|info on|details about|show me|explain|can you tell me about)\s+/i, '').trim();

    // 1. SPECIFIC EVENT MATCHING (Completely dynamic: checks every event currently in eventsData)
    const matchedEvent = (currentEvents || []).find((ev) => {
      const name = (ev.name || '').toLowerCase();
      const id = (ev.id || '').toLowerCase();
      const cat = (ev.category || '').toLowerCase();
      const sub = (ev.subtitle || '').toLowerCase();

      // Direct exact match
      if (q === name || rawQ.includes(name) || (name.length >= 4 && q.includes(name))) return true;
      if (q === id || rawQ.includes(id)) return true;

      // Smart semantic aliases
      if (id.includes('intelli') || name.includes('intelli')) {
        if (q.includes('intelli') || q.includes('paper') || q.includes('presentation')) return true;
      }
      if (id.includes('code') || id.includes('sprint') || name.includes('code')) {
        if (q.includes('code sprint') || q.includes('coding') || q.includes('debug') || q.includes('sprint')) return true;
      }
      if (id.includes('flag') || id.includes('ctf') || name.includes('flag')) {
        if (q.includes('ctf') || q.includes('capture the flag') || q.includes('cyber') || q.includes('hack')) return true;
      }
      if (id.includes('bot') || name.includes('bot')) {
        if (q.includes('build a bot') || q.includes('robotics') || q.includes('robot') || q.includes('line follower')) return true;
      }
      if (id.includes('frame') || id.includes('fusion') || name.includes('fusion')) {
        if (q.includes('frame fusion') || q.includes('ui/ux') || q.includes('ui ux') || q.includes('figma') || q.includes('design')) return true;
      }
      if (id.includes('squad') || id.includes('clash') || name.includes('squad')) {
        if (q.includes('clash of squadz') || q.includes('esports') || q.includes('bgmi') || q.includes('gaming') || q.includes('lan')) return true;
      }

      // Check category or subtitle match
      if (cat && cat.length >= 5 && (q.includes(cat) || (q.length >= 5 && cat.includes(q)))) return true;
      if (sub && sub.length >= 5 && (q.includes(sub) || (q.length >= 5 && sub.includes(q)))) return true;

      return false;
    });

    if (matchedEvent) {
      let details = `⚡ ${matchedEvent.name.toUpperCase()}`;
      if (matchedEvent.subtitle) details += ` — ${cleanText(matchedEvent.subtitle)}`;
      if (matchedEvent.tagline) details += `\n"${cleanText(matchedEvent.tagline)}"`;
      if (matchedEvent.category) details += `\n\n📌 Category: ${cleanText(matchedEvent.category)}`;
      if (matchedEvent.shortDescription || matchedEvent.overview) {
        details += `\n📖 Overview: ${cleanText(matchedEvent.shortDescription || matchedEvent.overview)}`;
      }
      if (matchedEvent.teamSize) details += `\n👥 Team Size: ${cleanText(matchedEvent.teamSize)}`;
      if (matchedEvent.venue) details += `\n📍 Venue: ${cleanText(matchedEvent.venue)}`;
      if (matchedEvent.timing) details += `\n⏰ Timing: ${cleanText(matchedEvent.timing)}`;
      if (matchedEvent.eligibility) details += `\n🎓 Eligibility: ${cleanText(matchedEvent.eligibility)}`;

      if (matchedEvent.rounds && matchedEvent.rounds.length > 0) {
        const roundsList = matchedEvent.rounds
          .map((r) => `  • ${r.roundNumber ? `${r.roundNumber}: ` : ''}${cleanText(r.title)}${r.description ? ` (${cleanText(r.description)})` : ''}`)
          .join('\n');
        details += `\n\n🏆 Competition Rounds:\n${roundsList}`;
      }

      if (matchedEvent.rules && matchedEvent.rules.length > 0) {
        const rulesList = matchedEvent.rules.map((r, i) => `  ${i + 1}. ${cleanText(r)}`).filter((r) => r.trim()).join('\n');
        details += `\n\n📋 Event Rules:\n${rulesList}`;
      }

      if (matchedEvent.judgingCriteria && matchedEvent.judgingCriteria.length > 0) {
        const criteriaList = matchedEvent.judgingCriteria.map((j) => `  • ${cleanText(j.parameter)}: ${j.weight}`).join('\n');
        details += `\n\n⚖️ Judging Criteria:\n${criteriaList}`;
      }

      const otherEvents = (currentEvents || [])
        .filter((e) => e.id !== matchedEvent.id)
        .slice(0, 3)
        .map((e) => `Tell me about ${e.name}`);

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
    if (q.includes('event') || q.includes('compet') || q.includes('track') || q.includes('flagship') || q.includes('contest') || q.includes('all')) {
      const eventList = (currentEvents || [])
        .map((ev, i) => {
          let line = `${i + 1}. ⚡ ${ev.name}`;
          if (ev.subtitle) line += ` — ${cleanText(ev.subtitle)}`;
          if (ev.category) line += `\n   • Track: ${cleanText(ev.category)}`;
          if (ev.teamSize) line += `\n   • Team: ${cleanText(ev.teamSize)}`;
          if (ev.venue) line += `\n   • Venue: ${cleanText(ev.venue)}`;
          if (ev.timing) line += `\n   • Timing: ${cleanText(ev.timing)}`;
          return line;
        })
        .join('\n\n');

      return {
        text: `${currentFest?.name || 'Techno Vista'} currently features ${currentEvents?.length || 0} premier national-level competitions organized by the ${currentFest?.organizedBy || 'Dept. of ISE'}:\n\n${eventList}\n\n💡 Participants can join multiple events provided their slot timings do not conflict!`,
        action: {
          label: 'View All Events on Website',
          link: '/events',
        },
        suggestions: (currentEvents || []).map((e) => `Tell me about ${e.name}`),
      };
    }

    // 3. SCHEDULE & TIMELINE (Dynamically maps current scheduleData.timeline)
    if (q.includes('schedule') || q.includes('agenda') || q.includes('timeline') || q.includes('inaugur') || q.includes('lunch') || q.includes('slot') || q.includes('session')) {
      const dateHeader = currentSchedule?.festDate || currentFest?.dateText || 'Fest Day';
      const slots = (currentSchedule?.timeline || []).map((s) => {
        let str = `• ${cleanText(s.time)}: ${cleanText(s.title)}`;
        if (s.venue) str += ` [📍 ${cleanText(s.venue)}]`;
        if (s.description) str += `\n  ${cleanText(s.description)}`;
        if (s.subEvents && s.subEvents.length > 0) {
          str += '\n' + s.subEvents.map((se) => `    - ${cleanText(se.name)} (${cleanText(se.time)}) @ ${cleanText(se.venue)}`).join('\n');
        }
        return str;
      }).join('\n\n');

      return {
        text: `Official Event Schedule (${dateHeader}):\n\n${slots}\n\n${cleanText(currentSchedule?.note) || ''}`,
        action: {
          label: 'View Full Schedule Page',
          link: '/schedule',
        },
        suggestions: ['When and where is the fest?', 'How to register for the fest?', 'Show all flagship events'],
      };
    }

    // 4. REGISTRATION & GOOGLE FORM (Dynamically pulls registrationSteps and googleFormUrl)
    if (q.includes('register') || q.includes('registration') || q.includes('form') || q.includes('apply') || q.includes('enroll') || q.includes('fee') || q.includes('cost') || q.includes('price')) {
      const steps = (currentFest?.registrationSteps || []).map((s) => `${s.number}. ${cleanText(s.title)}:\n   ${cleanText(s.desc)}`).join('\n\n');

      return {
        text: `How to Register for ${currentFest?.name || 'Techno Vista'}:\n\n${steps || 'Please click the button below to register through the official Google Form.'}\n\n📌 Centralized Form Link: All event tracks are registered through our unified portal.`,
        action: {
          label: 'Open Official Registration Form',
          url: currentFormUrl,
        },
        suggestions: ['What are the team rules and eligibility criteria?', 'Show all flagship events', 'When and where is the fest?'],
      };
    }

    // 5. DATE, TIME & VENUE (Dynamically pulls from festData and contactData)
    if (q.includes('when') || q.includes('date') || q.includes('time') || q.includes('venue') || q.includes('where') || q.includes('location') || q.includes('place') || q.includes('college') || q.includes('address')) {
      return {
        text: `${currentFest?.name || 'Techno Vista'} Official Venue & Date Details:\n\n📅 Date: ${cleanText(currentFest?.dateText) || 'TBA'}\n⏰ Main Timing: ${cleanText(currentFest?.timeText) || '9:30 AM onwards'}\n🚪 Reporting Window: ${cleanText(currentFest?.reportingTime) || '8:45 AM - 9:15 AM'}\n🏛️ Institution: ${cleanText(currentFest?.college) || 'Sri Sairam College of Engineering'}\n🏢 Organized By: ${cleanText(currentFest?.organizedBy) || 'Department of ISE'}\n📍 Full Address: ${cleanText(currentContact?.address?.fullAddress || currentFest?.address) || ''}\n🎯 Campus Venue: ${cleanText(currentFest?.venue) || 'Seminar Hall & ISE Labs'}`,
        action: {
          label: 'View Campus on Google Maps',
          url: currentContact?.maps?.viewLink || 'https://maps.google.com/?q=Sri+Sairam+College+of+Engineering+Anekal+Bengaluru',
        },
        suggestions: ['How to reach Sri Sairam College of Engineering?', 'Show all flagship events', 'How to register for the fest?'],
      };
    }

    // 6. RULES, ELIGIBILITY & ID CARD (Dynamically pulls importantNotes and faqs)
    if (q.includes('rule') || q.includes('eligib') || q.includes('allow') || q.includes('id card') || q.includes('cross') || q.includes('team') || q.includes('usn') || q.includes('guideline')) {
      const notes = (currentFest?.importantNotes || []).map((note, i) => `${i + 1}. ${cleanText(note)}`).join('\n');
      const teamFaq = (currentFest?.faqs || []).find((f) => f.q.toLowerCase().includes('team') || f.q.toLowerCase().includes('college'));

      let responseText = `Official Participation Guidelines:\n\n${notes}`;
      if (teamFaq) {
        responseText += `\n\n❓ ${cleanText(teamFaq.q)}\n👉 ${cleanText(teamFaq.a)}`;
      }

      return {
        text: responseText,
        action: {
          label: 'Register in Google Form',
          url: currentFormUrl,
        },
        suggestions: ['How to register for the fest?', 'Show all flagship events', 'What are the prizes and takeaways?'],
      };
    }

    // 7. PRIZES, AWARDS & CERTIFICATES (Dynamically pulls takeaways and highlights)
    if (q.includes('prize') || q.includes('award') || q.includes('certificate') || q.includes('cash') || q.includes('trophy') || q.includes('win') || q.includes('perk') || q.includes('takeaway')) {
      const takeawaysList = (currentFest?.takeaways || []).map((t) => `🏆 ${cleanText(t.title)}:\n   ${cleanText(t.desc)}`).join('\n\n');
      const highlightsList = (currentFest?.highlights || []).map((h) => `• ${cleanText(h.label)}: ${cleanText(h.sub)}`).join('\n');

      return {
        text: `Awards & Takeaways at ${currentFest?.name || 'Techno Vista'}:\n\n${takeawaysList || '• Winner & Runner-up Cash Awards, Trophies & Medals\n• Authorized Certificates of Participation for ALL registered attendees'}\n\n🌟 Fest Highlights:\n${highlightsList}`,
        suggestions: ['Show all flagship events', 'How to register for the fest?', 'Who are the faculty and student coordinators?'],
      };
    }

    // 8. LIVE ANNOUNCEMENTS (Dynamically pulls announcementsData)
    if (q.includes('announcement') || q.includes('announcements') || q.includes('update') || q.includes('updates') || q.includes('news') || q.includes('alert') || q.includes('notice')) {
      if (currentAnnouncements && currentAnnouncements.length > 0) {
        const annList = currentAnnouncements
          .map((a, i) => `${i + 1}. [${cleanText(a.badge || a.category || 'Live Update')}] ${cleanText(a.title)} (${cleanText(a.date || a.timestamp || 'Latest')})\n   ${cleanText(a.content || a.message || a.desc || '')}`)
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
      const faculty = (currentContact?.facultyCoordinators || [])
        .map((f) => `• ${cleanText(f.name)} (${cleanText(f.designation || f.role || 'Faculty Convener')})${f.phone || f.contact ? ` | 📞 ${cleanText(f.phone || f.contact)}` : ''}`)
        .join('\n');

      const students = (currentContact?.studentCoordinators || [])
        .map((s) => `• ${cleanText(s.name)} (${cleanText(s.role || 'Student Lead')})${s.phone || s.contact ? ` | 📞 ${cleanText(s.phone || s.contact)}` : ''}`)
        .join('\n');

      return {
        text: `Official Event Coordinators:\n\n🏢 Department: ${cleanText(currentContact?.department || currentFest?.organizedBy || 'Dept. of ISE')}\n🏛️ Institution: ${cleanText(currentContact?.collegeName || currentFest?.college || 'Sri Sairam College of Engineering')}\n\nFaculty Coordinators:\n${faculty || 'Dept. of ISE Faculty'}\n\nStudent Coordinators:\n${students || 'ISE Student Leads'}\n\n📧 Official Email: ${cleanText(currentContact?.generalContact?.officialEmail || 'dept.ise@sairamce.edu.in')}\n🌐 College Website: ${cleanText(currentContact?.generalContact?.collegeWebsite || 'https://sairamce.edu.in')}`,
        suggestions: ['How to register for the fest?', 'When and where is the fest?', 'Show all flagship events'],
      };
    }

    // 10. TRAVEL & TRANSPORTATION (Dynamically pulls travelInfo)
    if (q.includes('travel') || q.includes('bus') || q.includes('reach') || q.includes('metro') || q.includes('route') || q.includes('transport') || q.includes('direction')) {
      const travelPoints = (currentContact?.travelInfo || []).map((t) => `🚌 ${cleanText(t.mode)}:\n   ${cleanText(t.details)}`).join('\n\n');

      return {
        text: `How to Reach ${cleanText(currentContact?.collegeName || currentFest?.college || 'Sri Sairam College of Engineering')}:\n\n${travelPoints || 'Direct BMTC buses connect Majestic, Banashankari, and Electronic City to Anekal town. The campus is 3 km from Anekal bus stand.'}`,
        action: {
          label: 'Open Campus in Google Maps',
          url: currentContact?.maps?.viewLink || 'https://maps.google.com/?q=Sri+Sairam+College+of+Engineering+Anekal+Bengaluru',
        },
        suggestions: ['When and where is the fest?', 'How to register for the fest?', 'Who are the faculty and student coordinators?'],
      };
    }

    // 11. ABOUT FEST, COLLEGE & DEPARTMENT (Dynamically pulls aboutFest, aboutCollege, aboutDepartment)
    if (q.includes('about') || q.includes('mission') || q.includes('vision') || q.includes('department') || q.includes('ise') || q.includes('sairam')) {
      const aboutFestDesc = Array.isArray(currentFest?.aboutFest?.description)
        ? currentFest.aboutFest.description.map(cleanText).join('\n\n')
        : cleanText(currentFest?.aboutFest?.description) || '';

      return {
        text: `About ${currentFest?.name || 'Techno Vista'}:\n\n${aboutFestDesc}\n\n🎯 Mission: ${cleanText(currentFest?.aboutFest?.mission) || ''}\n👁️ Vision: ${cleanText(currentFest?.aboutFest?.vision) || ''}\n\n🏛️ ${cleanText(currentFest?.aboutCollege?.name) || 'College'}:\n${cleanText(currentFest?.aboutCollege?.overview) || ''}\n\n🏢 ${cleanText(currentFest?.aboutDepartment?.name) || 'Department'}:\n${cleanText(currentFest?.aboutDepartment?.overview) || ''}`,
        suggestions: ['Show all flagship events', 'When and where is the fest?', 'How to register for the fest?'],
      };
    }

    // 12. DYNAMIC FAQ LOOKUP (Matches any question in festData.faqs)
    const matchedFaq = (currentFest?.faqs || []).find((f) => {
      const qWords = q.split(/\s+/).filter((w) => w.length >= 3);
      const fWords = f.q.toLowerCase().split(/\s+/);
      const overlap = qWords.filter((w) => fWords.some((fw) => fw.includes(w) || w.includes(fw)));
      return overlap.length >= 2;
    });

    if (matchedFaq) {
      return {
        text: `❓ ${cleanText(matchedFaq.q)}\n\n👉 ${cleanText(matchedFaq.a)}`,
        suggestions: ['How to register for the fest?', 'Show all flagship events', 'What are the team rules and eligibility criteria?'],
      };
    }

    // DEFAULT FALLBACK (Uses real live entities)
    return {
      text: `Welcome to the live assistant for ${currentFest?.name || 'Techno Vista'}! Here are the active topics available right now:`,
      suggestions: [
        'Show all flagship events',
        'How to register for the fest?',
        'When and where is the fest?',
        'Show the event schedule and timeline',
        'What are the team rules and eligibility criteria?',
        ...(currentEvents || []).slice(0, 2).map((e) => `Tell me about ${e.name}`),
      ],
    };
  };

  // Handle user selecting an option or submitting text
  const handleUserMessage = (text) => {
    if (!text || !text.trim()) return;
    const cleanUserText = text.trim();

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cleanUserText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic typing delay for conversational charm
    setTimeout(() => {
      const reply = generateBotReply(cleanUserText);
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
    }, 450);
  };

  // Manual Sync Live Website Data button handler
  const handleManualSync = () => {
    if (reloadFromStorage) {
      reloadFromStorage();
    }
    const { currentFest, currentEvents } = getLiveFestState();
    setMessages([
      {
        id: `sync-${Date.now()}`,
        sender: 'bot',
        text: `🔄 Data Synchronized! I've refreshed all details directly from the website.\n\nWhat would you like to explore about ${currentFest?.name || 'Techno Vista'}?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Show all flagship events',
          'How to register for the fest?',
          'When and where is the fest?',
          ...(currentEvents || []).slice(0, 3).map((e) => `Tell me about ${e.name}`),
        ],
      },
    ]);
    setSyncToast('✓ Website data synchronized!');
    setTimeout(() => setSyncToast(''), 2500);
  };

  const handleResetChat = () => {
    const { currentFest, currentEvents } = getLiveFestState();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Conversation restarted! 👋 What would you like to know about ${currentFest?.name || 'Techno Vista'}?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Show all flagship events',
          'How to register for the fest?',
          'When and where is the fest?',
          ...(currentEvents || []).slice(0, 3).map((e) => `Tell me about ${e.name}`),
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
          position: 'relative',
        }}
      >
        {/* Sync Toast Notification */}
        {syncToast && (
          <div
            style={{
              position: 'absolute',
              top: '68px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#00f0ff',
              color: '#050a1b',
              padding: '0.4rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.76rem',
              fontWeight: 800,
              zIndex: 100,
              boxShadow: '0 4px 15px rgba(0, 240, 255, 0.5)',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            {syncToast}
          </div>
        )}

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
                  LIVE
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                <span
                  style={{
                    width: '6.5px',
                    height: '6.5px',
                    borderRadius: '50%',
                    backgroundColor: isCloudConnected ? '#10b981' : '#facc15',
                    boxShadow: isCloudConnected ? '0 0 8px #10b981' : '0 0 8px #facc15',
                  }}
                />
                <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                  {isCloudConnected ? 'Live Cloud Synced (Firestore) // Online' : 'Website Synced // Online'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={handleManualSync}
              title="Sync Live Website Data"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                color: '#00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={13} />
            </button>

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
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: inputValue.trim() ? '#00d4ff' : 'rgba(255, 255, 255, 0.08)',
              color: inputValue.trim() ? '#050a1b' : '#64748b',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputValue.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              boxShadow: inputValue.trim() ? '0 0 14px rgba(0, 212, 255, 0.4)' : 'none',
            }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
