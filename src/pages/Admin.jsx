import React, { useState, useEffect, useRef } from 'react';
import { useFest } from '../context/FestContext';
import {
  Lock,
  ShieldCheck,
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Sparkles,
  QrCode,
  Calendar,
  Layers,
  Bell,
  Users,
  Copy,
  Download,
  AlertTriangle,
  Info,
  MapPin,
  Clock,
  Phone,
  Mail,
  Building2,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  HelpCircle,
  X,
  Compass,
  Target,
  Trophy,
} from 'lucide-react';

const ADMIN_PIN_DEFAULT = '$TechnoVista@2k26';

export default function Admin() {
  const {
    googleFormUrl,
    festData,
    eventsData,
    scheduleData,
    announcementsData,
    contactData,
    updateGoogleFormUrl,
    updateFestData,
    updateEvent,
    addEvent,
    deleteEvent,
    updateSchedule,
    updateScheduleInfo,
    addScheduleSlot,
    updateScheduleSlot,
    deleteScheduleSlot,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    updateContactData,
    addFacultyCoordinator,
    updateFacultyCoordinator,
    deleteFacultyCoordinator,
    addStudentCoordinator,
    updateStudentCoordinator,
    deleteStudentCoordinator,
    resetToDefaults,
    isCloudConnected,
  } = useFest();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('techno_vista_admin_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab: 'events' | 'core' | 'about' | 'schedule' | 'registration' | 'coordinators' | 'announcements' | 'qr'
  const [activeTab, setActiveTab] = useState('events');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Trigger Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Auth Submit
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (enteredPin === ADMIN_PIN_DEFAULT) {
      setIsAuthenticated(true);
      sessionStorage.setItem('techno_vista_admin_auth', 'true');
      setPinError('');
      showToast('Admin authenticated successfully');
    } else {
      setPinError('Incorrect Admin Passcode. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('techno_vista_admin_auth');
    setEnteredPin('');
  };

  // =========================================================================
  // TAB 1: CORE FEST & HERO FORM STATE
  // =========================================================================
  const [coreForm, setCoreForm] = useState({
    name: festData.name || '',
    shortName: festData.shortName || '',
    edition: festData.edition || '',
    tagline: festData.tagline || '',
    heroSubtitle: festData.heroSubtitle || 'JOIN THE EVENT',
    eventType: festData.eventType || 'National-Level Technical Fest',
    college: festData.college || '',
    organizedBy: festData.organizedBy || '',
    dateText: festData.dateText || '',
    timeText: festData.timeText || '',
    reportingTime: festData.reportingTime || '',
    venue: festData.venue || '',
    location: festData.location || '',
    address: festData.address || '',
    targetDate: festData.targetDate || '2026-11-26T09:30:00+05:30',
    googleFormUrl: googleFormUrl || '',
    highlights: festData.highlights || [],
  });

  const coreLoadedRef = useRef(false);
  useEffect(() => {
    if (!coreLoadedRef.current || activeTab === 'core') {
      setCoreForm({
        name: festData.name || '',
        shortName: festData.shortName || '',
        edition: festData.edition || '',
        tagline: festData.tagline || '',
        heroSubtitle: festData.heroSubtitle || 'JOIN THE EVENT',
        eventType: festData.eventType || 'National-Level Technical Fest',
        college: festData.college || '',
        organizedBy: festData.organizedBy || '',
        dateText: festData.dateText || '',
        timeText: festData.timeText || '',
        reportingTime: festData.reportingTime || '',
        venue: festData.venue || '',
        location: festData.location || '',
        address: festData.address || '',
        targetDate: festData.targetDate || '2026-11-26T09:30:00+05:30',
        googleFormUrl: googleFormUrl || '',
        highlights: festData.highlights || [],
      });
      coreLoadedRef.current = true;
    }
  }, [activeTab]);

  const handleSaveCore = (e) => {
    e.preventDefault();
    updateGoogleFormUrl(coreForm.googleFormUrl);
    updateFestData({
      name: coreForm.name,
      shortName: coreForm.shortName,
      edition: coreForm.edition,
      tagline: coreForm.tagline,
      heroSubtitle: coreForm.heroSubtitle,
      eventType: coreForm.eventType,
      college: coreForm.college,
      organizedBy: coreForm.organizedBy,
      dateText: coreForm.dateText,
      timeText: coreForm.timeText,
      reportingTime: coreForm.reportingTime,
      venue: coreForm.venue,
      location: coreForm.location,
      address: coreForm.address,
      targetDate: coreForm.targetDate,
      highlights: coreForm.highlights,
    });
    showToast('✓ Fest identity, hero subtitle & countdown timer saved!');
  };

  const handleUpdateHighlight = (index, field, value) => {
    const updated = [...coreForm.highlights];
    updated[index] = { ...updated[index], [field]: value };
    setCoreForm({ ...coreForm, highlights: updated });
  };

  // =========================================================================
  // TAB 2: ABOUT PAGE & INSTITUTIONAL LEGACY
  // =========================================================================
  const [aboutForm, setAboutForm] = useState({
    title: festData.aboutFest?.title || 'About TECHNO VISTA 2K26',
    subtitle: festData.aboutFest?.subtitle || '',
    description: festData.aboutFest?.description?.join('\n\n') || '',
    mission: festData.aboutFest?.mission || '',
    vision: festData.aboutFest?.vision || '',
    purposeParagraph:
      festData.aboutFest?.purposeParagraph ||
      'The purpose of organizing TECHNO VISTA 2K26 is to create an authentic bridge between classroom theoretical computer science and high-pressure industry-grade engineering environments.',
    purposePoints: festData.aboutFest?.purposePoints || [
      'Benchmarking technical acumen against students nationwide',
      'Promoting research orientation and paper defense standards',
      'Sharpening competitive programming speed and complexity analysis',
      'Cultivating hands-on cybersecurity and robotics skills',
    ],
    collegeName: festData.aboutCollege?.name || '',
    collegeAffiliation: festData.aboutCollege?.affiliation || '',
    collegeLocation: festData.aboutCollege?.location || '',
    collegeOverview: festData.aboutCollege?.overview || '',
    deptName: festData.aboutDepartment?.name || '',
    deptOverview: festData.aboutDepartment?.overview || '',
    takeaways: festData.takeaways || [],
  });

  const aboutLoadedRef = useRef(false);
  useEffect(() => {
    if (!aboutLoadedRef.current || activeTab === 'about') {
      setAboutForm({
        title: festData.aboutFest?.title || '',
        subtitle: festData.aboutFest?.subtitle || '',
        description: festData.aboutFest?.description?.join('\n\n') || '',
        mission: festData.aboutFest?.mission || '',
        vision: festData.aboutFest?.vision || '',
        purposeParagraph: festData.aboutFest?.purposeParagraph || '',
        purposePoints: festData.aboutFest?.purposePoints || [],
        collegeName: festData.aboutCollege?.name || '',
        collegeAffiliation: festData.aboutCollege?.affiliation || '',
        collegeLocation: festData.aboutCollege?.location || '',
        collegeOverview: festData.aboutCollege?.overview || '',
        deptName: festData.aboutDepartment?.name || '',
        deptOverview: festData.aboutDepartment?.overview || '',
        takeaways: festData.takeaways || [],
      });
      aboutLoadedRef.current = true;
    }
  }, [activeTab]);

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateFestData({
      aboutFest: {
        ...festData.aboutFest,
        title: aboutForm.title,
        subtitle: aboutForm.subtitle,
        description: aboutForm.description.split('\n\n').filter((p) => p.trim()),
        mission: aboutForm.mission,
        vision: aboutForm.vision,
        purposeParagraph: aboutForm.purposeParagraph,
        purposePoints: aboutForm.purposePoints,
      },
      aboutCollege: {
        name: aboutForm.collegeName,
        affiliation: aboutForm.collegeAffiliation,
        location: aboutForm.collegeLocation,
        overview: aboutForm.collegeOverview,
      },
      aboutDepartment: {
        name: aboutForm.deptName,
        overview: aboutForm.deptOverview,
      },
      takeaways: aboutForm.takeaways,
    });
    showToast('✓ About page narratives, vision, mission & college info saved!');
  };

  const handleUpdatePurposePoint = (idx, val) => {
    const updated = [...aboutForm.purposePoints];
    updated[idx] = val;
    setAboutForm({ ...aboutForm, purposePoints: updated });
  };

  const handleAddPurposePoint = () => {
    setAboutForm({
      ...aboutForm,
      purposePoints: [...aboutForm.purposePoints, 'New learning objective or symposium focus area'],
    });
  };

  const handleDeletePurposePoint = (idx) => {
    setAboutForm({
      ...aboutForm,
      purposePoints: aboutForm.purposePoints.filter((_, i) => i !== idx),
    });
  };

  const handleUpdateTakeaway = (idx, field, val) => {
    const updated = [...aboutForm.takeaways];
    updated[idx] = { ...updated[idx], [field]: val };
    setAboutForm({ ...aboutForm, takeaways: updated });
  };

  // =========================================================================
  // TAB 3: EVENTS STATE & OPERATIONS (FULL CRUD)
  // =========================================================================
  const [selectedEventId, setSelectedEventId] = useState(eventsData[0]?.id || '');
  const [eventEditForm, setEventEditForm] = useState(null);
  const [newRuleInput, setNewRuleInput] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const blankEvent = {
    id: `event-${Date.now()}`,
    name: 'New Technical Arena',
    subtitle: 'Event Subtitle',
    category: 'Competitive Programming',
    track: 'TECHNICAL',
    tagline: 'Design. Develop. Deploy.',
    number: '07',
    badge: 'Flagship',
    accentColor: '#00d4ff',
    image: '/assets/events/code-sprint.svg',
    shortDescription: 'Short summary displayed on cards across the event grid.',
    overview: 'Full comprehensive description displayed on the dedicated event page.',
    timing: '10:30 AM - 01:00 PM',
    venue: 'Computer Science Lab 3',
    teamSize: '1 to 2 Members',
    eligibility: 'Open to all engineering students with valid College ID.',
    registrationFee: 'Free Registration via Google Form',
    prizes: {
      first: 'Cash Prize + Certificate of Excellence',
      second: 'Runner-up Cash Prize + Trophy',
      perks: 'Participation Certificates for all attendees',
    },
    rules: [
      'Original work only; plagiarism leads to immediate disqualification.',
      'Participants must bring college ID cards on the fest day.',
    ],
    rounds: [
      {
        roundNumber: 'Round 1',
        title: 'Qualifying Challenge',
        description: 'Timed assessment testing core technical understanding and speed.',
      },
    ],
    coordinators: {
      faculty: [
        {
          name: 'Faculty Coordinator (ISE)',
          designation: 'Asst. Professor, Dept of ISE',
          contact: '+91 98765 43210',
          phone: '+91 98765 43210',
        },
      ],
      student: [
        {
          name: 'Student Lead',
          role: 'Event Head',
          contact: '+91 98765 43210',
          phone: '+91 98765 43210',
        },
      ],
    },
  };

  const loadedEventIdRef = useRef(null);

  useEffect(() => {
    if (isAddingEvent) return;

    if (loadedEventIdRef.current !== selectedEventId || !eventEditForm) {
      const current = eventsData.find((e) => e.id === selectedEventId) || eventsData[0];
      if (current) {
        const cloned = JSON.parse(JSON.stringify(current));
        if (Array.isArray(cloned.coordinators)) {
          cloned.coordinators = {
            faculty: [],
            student: cloned.coordinators.map((c) => {
              const num = c.phone || c.contact || '';
              return {
                name: c.name || '',
                role: c.role || 'Event Lead',
                phone: num,
                contact: num,
              };
            }),
          };
        } else if (!cloned.coordinators) {
          cloned.coordinators = { faculty: [], student: [] };
        } else {
          cloned.coordinators.faculty = (cloned.coordinators.faculty || []).map((f) => {
            const num = f.phone || f.contact || '';
            return {
              name: f.name || '',
              designation: f.designation || '',
              phone: num,
              contact: num,
            };
          });
          cloned.coordinators.student = (cloned.coordinators.student || []).map((s) => {
            const num = s.phone || s.contact || '';
            return {
              name: s.name || '',
              role: s.role || 'Event Lead',
              phone: num,
              contact: num,
            };
          });
        }
        setEventEditForm(cloned);
        loadedEventIdRef.current = current.id;
        if (!selectedEventId && current.id) {
          setSelectedEventId(current.id);
        }
      }
    }
  }, [selectedEventId, isAddingEvent]);

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventEditForm) return;

    if (isAddingEvent) {
      addEvent(eventEditForm);
      setIsAddingEvent(false);
      loadedEventIdRef.current = eventEditForm.id;
      setSelectedEventId(eventEditForm.id);
      showToast(`✓ Event "${eventEditForm.name}" created successfully!`);
    } else {
      updateEvent(eventEditForm.id, eventEditForm);
      loadedEventIdRef.current = eventEditForm.id;
      showToast(`✓ Event "${eventEditForm.name}" updated!`);
    }
  };

  const handleDeleteEventClick = (id, name) => {
    if (eventsData.length <= 1) {
      alert('Cannot delete the last remaining event.');
      return;
    }
    if (window.confirm(`Are you sure you want to permanently delete event "${name}"?`)) {
      deleteEvent(id);
      const remaining = eventsData.filter((e) => e.id !== id);
      setSelectedEventId(remaining[0]?.id || '');
      showToast(`Event "${name}" removed from catalogue.`);
    }
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRuleInput.trim()) return;
    setEventEditForm({
      ...eventEditForm,
      rules: [...(eventEditForm.rules || []), newRuleInput.trim()],
    });
    setNewRuleInput('');
  };

  const handleDeleteRule = (index) => {
    setEventEditForm({
      ...eventEditForm,
      rules: eventEditForm.rules.filter((_, idx) => idx !== index),
    });
  };

  const handleAddRound = () => {
    const nextNum = (eventEditForm.rounds?.length || 0) + 1;
    setEventEditForm({
      ...eventEditForm,
      rounds: [
        ...(eventEditForm.rounds || []),
        {
          roundNumber: `Round ${nextNum}`,
          title: 'Next Phase Challenge',
          description: 'Description of criteria and deliverables for this stage.',
        },
      ],
    });
  };

  const handleDeleteRound = (index) => {
    setEventEditForm({
      ...eventEditForm,
      rounds: eventEditForm.rounds.filter((_, idx) => idx !== index),
    });
  };

  const handleAddEventFacultyCoordinator = () => {
    if (!eventEditForm) return;
    const currentCoordinators = eventEditForm.coordinators || { faculty: [], student: [] };
    setEventEditForm({
      ...eventEditForm,
      coordinators: {
        ...currentCoordinators,
        faculty: [
          ...(currentCoordinators.faculty || []),
          { name: 'Dr./Prof. Faculty Name', designation: 'Dept. of ISE', contact: '+91 98765 43210', phone: '+91 98765 43210' },
        ],
      },
    });
  };

  const handleDeleteEventFacultyCoordinator = (idx) => {
    if (!eventEditForm) return;
    const currentCoordinators = eventEditForm.coordinators || { faculty: [], student: [] };
    setEventEditForm({
      ...eventEditForm,
      coordinators: {
        ...currentCoordinators,
        faculty: (currentCoordinators.faculty || []).filter((_, i) => i !== idx),
      },
    });
  };

  const handleUpdateEventFacultyCoordinator = (idx, field, val) => {
    setEventEditForm((prev) => {
      if (!prev) return prev;
      const currentCoordinators = prev.coordinators || { faculty: [], student: [] };
      const updated = [...(currentCoordinators.faculty || [])];
      const item = { ...(updated[idx] || {}) };
      if (field === 'phone' || field === 'contact') {
        item.phone = val;
        item.contact = val;
      } else {
        item[field] = val;
      }
      updated[idx] = item;
      return {
        ...prev,
        coordinators: {
          ...currentCoordinators,
          faculty: updated,
        },
      };
    });
  };

  const handleAddEventStudentCoordinator = () => {
    if (!eventEditForm) return;
    const currentCoordinators = eventEditForm.coordinators || { faculty: [], student: [] };
    setEventEditForm({
      ...eventEditForm,
      coordinators: {
        ...currentCoordinators,
        student: [
          ...(currentCoordinators.student || []),
          { name: 'Student Coordinator Name', role: 'Event Lead', contact: '+91 98765 43210', phone: '+91 98765 43210' },
        ],
      },
    });
  };

  const handleDeleteEventStudentCoordinator = (idx) => {
    if (!eventEditForm) return;
    const currentCoordinators = eventEditForm.coordinators || { faculty: [], student: [] };
    setEventEditForm({
      ...eventEditForm,
      coordinators: {
        ...currentCoordinators,
        student: (currentCoordinators.student || []).filter((_, i) => i !== idx),
      },
    });
  };

  const handleUpdateEventStudentCoordinator = (idx, field, val) => {
    setEventEditForm((prev) => {
      if (!prev) return prev;
      const currentCoordinators = prev.coordinators || { faculty: [], student: [] };
      const updated = [...(currentCoordinators.student || [])];
      const item = { ...(updated[idx] || {}) };
      if (field === 'phone' || field === 'contact') {
        item.phone = val;
        item.contact = val;
      } else {
        item[field] = val;
      }
      updated[idx] = item;
      return {
        ...prev,
        coordinators: {
          ...currentCoordinators,
          student: updated,
        },
      };
    });
  };

  // =========================================================================
  // TAB 4: SCHEDULE & TIMELINE STATE & CRUD
  // =========================================================================
  const [scheduleGeneralForm, setScheduleGeneralForm] = useState({
    festDate: scheduleData.festDate || '26 November 2026',
    dayTitle: scheduleData.dayTitle || 'Official Fest Day Timeline',
    note: scheduleData.note || '',
  });

  const [editingSlotId, setEditingSlotId] = useState(null);
  const [slotEditForm, setSlotEditForm] = useState(null);
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newSlotForm, setNewSlotForm] = useState({
    id: `slot-${Date.now()}`,
    time: '11:00 AM - 12:30 PM',
    title: 'New Event Slot / Session',
    category: 'Competitions',
    badge: 'Contests',
    venue: 'Seminar Hall & Computing Labs',
    description: 'Detailed description of activities during this timeline window.',
    isHighlight: false,
  });

  const scheduleLoadedRef = useRef(false);
  useEffect(() => {
    if (!scheduleLoadedRef.current || activeTab === 'schedule') {
      setScheduleGeneralForm({
        festDate: scheduleData.festDate || '26 November 2026',
        dayTitle: scheduleData.dayTitle || 'Official Fest Day Timeline',
        note: scheduleData.note || '',
      });
      scheduleLoadedRef.current = true;
    }
  }, [activeTab]);

  const handleSaveScheduleGeneral = (e) => {
    e.preventDefault();
    updateScheduleInfo(scheduleGeneralForm);
    showToast('✓ Schedule general notes and date updated!');
  };

  const handleAddSlotSubmit = (e) => {
    e.preventDefault();
    addScheduleSlot({ ...newSlotForm, id: `slot-${Date.now()}` });
    setIsAddingSlot(false);
    setNewSlotForm({
      id: `slot-${Date.now()}`,
      time: '11:00 AM - 12:30 PM',
      title: 'New Event Slot',
      category: 'Competitions',
      badge: 'Contests',
      venue: 'Designated Venue',
      description: 'Slot description...',
      isHighlight: false,
    });
    showToast('✓ New schedule slot added to timeline!');
  };

  const handleSaveSlotEdit = (e) => {
    e.preventDefault();
    if (!slotEditForm || !editingSlotId) return;
    updateScheduleSlot(editingSlotId, slotEditForm);
    setEditingSlotId(null);
    setSlotEditForm(null);
    showToast('✓ Schedule timeline slot updated!');
  };

  // =========================================================================
  // TAB 5: REGISTRATION PROCESS, RULES & FAQS
  // =========================================================================
  const [regSteps, setRegSteps] = useState(festData.registrationSteps || []);
  const [importantNotes, setImportantNotes] = useState(festData.importantNotes || []);
  const [faqsList, setFaqsList] = useState(festData.faqs || []);
  const [newRule, setNewRule] = useState('');
  const [newFaq, setNewFaq] = useState({ q: '', a: '' });

  const regLoadedRef = useRef(false);
  useEffect(() => {
    if (!regLoadedRef.current || activeTab === 'registration') {
      setRegSteps(festData.registrationSteps || []);
      setImportantNotes(festData.importantNotes || []);
      setFaqsList(festData.faqs || []);
      regLoadedRef.current = true;
    }
  }, [activeTab]);

  const handleSaveRegistrationSection = (e) => {
    e.preventDefault();
    updateFestData({
      registrationSteps: regSteps,
      importantNotes: importantNotes,
      faqs: faqsList,
    });
    showToast('✓ Registration steps, mandatory guidelines & FAQs updated!');
  };

  const handleUpdateStep = (idx, field, val) => {
    const updated = [...regSteps];
    updated[idx] = { ...updated[idx], [field]: val };
    setRegSteps(updated);
  };

  const handleAddRuleItem = (e) => {
    e.preventDefault();
    if (!newRule.trim()) return;
    setImportantNotes([...importantNotes, newRule.trim()]);
    setNewRule('');
  };

  const handleDeleteRuleItem = (idx) => {
    setImportantNotes(importantNotes.filter((_, i) => i !== idx));
  };

  const handleAddFaqItem = (e) => {
    e.preventDefault();
    if (!newFaq.q.trim() || !newFaq.a.trim()) return;
    setFaqsList([...faqsList, { ...newFaq }]);
    setNewFaq({ q: '', a: '' });
  };

  const handleDeleteFaqItem = (idx) => {
    setFaqsList(faqsList.filter((_, i) => i !== idx));
  };

  const handleUpdateFaqItem = (idx, field, val) => {
    const updated = [...faqsList];
    updated[idx] = { ...updated[idx], [field]: val };
    setFaqsList(updated);
  };

  // =========================================================================
  // TAB 6: COORDINATORS & CONTACT DETAILS
  // =========================================================================
  const [contactGeneralForm, setContactGeneralForm] = useState({
    officialEmail: contactData.generalContact?.officialEmail || '',
    festSupportEmail: contactData.generalContact?.festSupportEmail || '',
    helplinePhone: contactData.generalContact?.helplinePhone || '',
    alternatePhone: contactData.generalContact?.alternatePhone || '',
    collegeWebsite: contactData.generalContact?.collegeWebsite || '',
    instagram: contactData.socialLinks?.instagram || '',
    linkedin: contactData.socialLinks?.linkedin || '',
    departmentPage: contactData.socialLinks?.departmentPage || '',
    mapsViewLink: contactData.maps?.viewLink || '',
    mapsEmbedUrl: contactData.maps?.embedUrl || '',
    fullAddress: contactData.address?.fullAddress || '',
  });

  const contactLoadedRef = useRef(false);
  useEffect(() => {
    if (!contactLoadedRef.current || activeTab === 'coordinators') {
      setContactGeneralForm({
        officialEmail: contactData.generalContact?.officialEmail || '',
        festSupportEmail: contactData.generalContact?.festSupportEmail || '',
        helplinePhone: contactData.generalContact?.helplinePhone || '',
        alternatePhone: contactData.generalContact?.alternatePhone || '',
        collegeWebsite: contactData.generalContact?.collegeWebsite || '',
        instagram: contactData.socialLinks?.instagram || '',
        linkedin: contactData.socialLinks?.linkedin || '',
        departmentPage: contactData.socialLinks?.departmentPage || '',
        mapsViewLink: contactData.maps?.viewLink || '',
        mapsEmbedUrl: contactData.maps?.embedUrl || '',
        fullAddress: contactData.address?.fullAddress || '',
      });
      contactLoadedRef.current = true;
    }
  }, [activeTab]);

  const handleSaveContactGeneral = (e) => {
    e.preventDefault();
    updateContactData({
      generalContact: {
        officialEmail: contactGeneralForm.officialEmail,
        festSupportEmail: contactGeneralForm.festSupportEmail,
        helplinePhone: contactGeneralForm.helplinePhone,
        alternatePhone: contactGeneralForm.alternatePhone,
        collegeWebsite: contactGeneralForm.collegeWebsite,
      },
      socialLinks: {
        instagram: contactGeneralForm.instagram,
        linkedin: contactGeneralForm.linkedin,
        collegeWebsite: contactGeneralForm.collegeWebsite,
        departmentPage: contactGeneralForm.departmentPage,
      },
      maps: {
        viewLink: contactGeneralForm.mapsViewLink,
        embedUrl: contactGeneralForm.mapsEmbedUrl,
      },
      address: {
        ...contactData.address,
        fullAddress: contactGeneralForm.fullAddress,
      },
    });
    showToast('✓ Contact info, social channels & Google Maps updated!');
  };

  // =========================================================================
  // TAB 7: ANNOUNCEMENTS STATE & CRUD
  // =========================================================================
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnSummary, setNewAnnSummary] = useState('');
  const [newAnnBadge, setNewAnnBadge] = useState('Important');
  const [editingAnnId, setEditingAnnId] = useState(null);
  const [annEditForm, setAnnEditForm] = useState(null);

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnSummary.trim()) return;

    addAnnouncement({
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      summary: newAnnSummary.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      badge: newAnnBadge,
      isImportant: newAnnBadge === 'Important',
    });

    setNewAnnTitle('');
    setNewAnnSummary('');
    setNewAnnBadge('Important');
    showToast('✓ New announcement published!');
  };

  const handleSaveAnnEdit = (e) => {
    e.preventDefault();
    if (!annEditForm) return;
    updateAnnouncement(editingAnnId, annEditForm);
    setEditingAnnId(null);
    setAnnEditForm(null);
    showToast('✓ Announcement updated.');
  };

  // =========================================================================
  // TAB 8: QR CODES
  // =========================================================================
  const participantSiteUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://technovista.site';
  const qrDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(participantSiteUrl)}&color=00d4ff&bgcolor=040711&format=png`;
  const qrGoogleFormUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(googleFormUrl)}&color=8b5cf6&bgcolor=040711&format=png`;

  // =========================================================================
  // IF NOT AUTHENTICATED: LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div
          className="glass-card"
          style={{
            maxWidth: '460px',
            width: '100%',
            padding: '2.5rem',
            border: '1px solid rgba(0, 212, 255, 0.35)',
            boxShadow: '0 0 35px rgba(0, 212, 255, 0.15)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 212, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              color: '#00d4ff',
            }}
          >
            <Lock size={28} />
          </div>

          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#00d4ff',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            RESTRICTED ORGANIZER ACCESS
          </span>

          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.65rem' }}>
            Organizer Admin Portal
          </h2>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Enter your secret passcode to edit every section, schedule slot, coordinator, or event.
          </p>

          <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <input
                type="password"
                placeholder="Enter Admin Passcode..."
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError('');
                }}
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: pinError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  textAlign: 'center',
                }}
              />
              {pinError && (
                <span style={{ display: 'block', color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                  {pinError}
                </span>
              )}
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.8rem' }}>
              <span>Unlock Admin Portal</span>
              <ShieldCheck size={16} />
            </button>
          </form>

          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.78rem',
              color: '#64748b',
            }}
          >
            Authorized conveners &amp; technical leads of Dept. of ISE only.
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN ADMIN DASHBOARD
  // =========================================================================
  return (
    <div style={{ padding: '2.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 9999,
              backgroundColor: '#07132e',
              border: '1px solid #00f0ff',
              boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)',
              padding: '0.85rem 1.4rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#ffffff',
              fontSize: '0.92rem',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={18} style={{ color: '#00f0ff' }} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header & Security Status */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            paddingBottom: '1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(0, 212, 255, 0.15)',
                  border: '1px solid rgba(0, 212, 255, 0.4)',
                  fontSize: '0.75rem',
                  color: '#00d4ff',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                <ShieldCheck size={12} />
                ORGANIZER PORTAL // ACTIVE
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                  backgroundColor: isCloudConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                  border: isCloudConnected ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(234, 179, 8, 0.4)',
                  fontSize: '0.75rem',
                  color: isCloudConnected ? '#34d399' : '#facc15',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isCloudConnected ? '#10b981' : '#facc15',
                    boxShadow: isCloudConnected ? '0 0 8px #10b981' : 'none',
                  }}
                />
                {isCloudConnected ? 'Cloud Sync: Active (Firestore)' : 'Local Offline Mode'}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#ffffff' }}>
              Master Admin Control Center
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Edit, add, or delete any content on the website in real-time. Changes instantly sync to Firebase Cloud Database across all phones, laptops, and visitors.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => {
                if (window.confirm('Reset all website data to initial factory defaults?')) {
                  resetToDefaults();
                  showToast('All fest data reset to defaults.');
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#f87171',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <Lock size={14} />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.55rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1rem',
          }}
        >
          {[
            { id: 'events', label: '1. Events Catalog', icon: Layers },
            { id: 'core', label: '2. Fest Hero & Countdown', icon: Sparkles },
            { id: 'about', label: '3. About & Vision', icon: Compass },
            { id: 'schedule', label: '4. Timeline & Schedule', icon: Calendar },
            { id: 'registration', label: '5. Registration & FAQs', icon: ClipboardCheck },
            { id: 'coordinators', label: '6. Contacts & Leads', icon: Users },
            { id: 'announcements', label: '7. Notice Board', icon: Bell },
            { id: 'qr', label: '8. QR & Flyers', icon: QrCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  backgroundColor: isActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.03)',
                  border: isActive ? '1px solid #00d4ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#050914' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 16px rgba(0, 212, 255, 0.4)' : 'none',
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: MANAGE EVENTS (FULL CRUD: ADD, EDIT ALL, DELETE)
            ========================================================================= */}
        {activeTab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700, textTransform: 'uppercase' }}>
                  ACTIVE EVENTS IN CATALOGUE ({eventsData.length})
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                  Select an event to modify its guidelines, rounds, prizes, and contacts.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsAddingEvent(true);
                  loadedEventIdRef.current = 'NEW';
                  setEventEditForm(blankEvent);
                }}
                className="btn-primary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.86rem' }}
              >
                <Plus size={16} />
                <span>Add Brand New Event</span>
              </button>
            </div>

            {/* Event Selector Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {eventsData.map((ev) => {
                const isSelected = !isAddingEvent && selectedEventId === ev.id;
                return (
                  <button
                    key={ev.id}
                    onClick={() => {
                      setIsAddingEvent(false);
                      setSelectedEventId(ev.id);
                    }}
                    style={{
                      padding: '0.55rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: isSelected ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid #00d4ff' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#00d4ff' : '#cbd5e1',
                    }}
                  >
                    <span>{ev.number}.</span>
                    <span>{ev.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Event Form Editor */}
            {eventEditForm && (
              <form onSubmit={handleSaveEvent} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700, textTransform: 'uppercase' }}>
                      {isAddingEvent ? 'CREATE NEW EVENT' : `EDITING: ${eventEditForm.name}`}
                    </span>
                    <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginTop: '0.2rem' }}>
                      {isAddingEvent ? 'Add New Arena to Catalogue' : eventEditForm.name}
                    </h2>
                  </div>

                  {!isAddingEvent && (
                    <button
                      type="button"
                      onClick={() => handleDeleteEventClick(eventEditForm.id, eventEditForm.name)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 0.9rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.35)',
                        color: '#f87171',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete This Event</span>
                    </button>
                  )}
                </div>

                {/* Identity & Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.name}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, name: e.target.value })}
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Event Subtitle
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.subtitle || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, subtitle: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Category / Domain
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.category || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, category: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Track Tag (e.g. TECHNICAL / GAMING)
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.track || 'TECHNICAL'}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, track: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Logistics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Slot Timing
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.timing || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, timing: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Specific Venue / Lab
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.venue || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, venue: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Team Size
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.teamSize || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, teamSize: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Eligibility
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.eligibility || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, eligibility: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Prizes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      1st Prize (Winner)
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.prizes?.first || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, prizes: { ...eventEditForm.prizes, first: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      2nd Prize (Runner Up)
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.prizes?.second || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, prizes: { ...eventEditForm.prizes, second: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Participation Perks &amp; Certificates
                    </label>
                    <input
                      type="text"
                      value={eventEditForm.prizes?.perks || ''}
                      onChange={(e) => setEventEditForm({ ...eventEditForm, prizes: { ...eventEditForm.prizes, perks: e.target.value } })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Overviews */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Card Short Description (Shown in Event Grid)
                  </label>
                  <textarea
                    rows={2}
                    value={eventEditForm.shortDescription || ''}
                    onChange={(e) => setEventEditForm({ ...eventEditForm, shortDescription: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Detailed Overview (Shown on Dedicated Event Page)
                  </label>
                  <textarea
                    rows={4}
                    value={eventEditForm.overview || ''}
                    onChange={(e) => setEventEditForm({ ...eventEditForm, overview: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Rounds Section */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Competition Rounds ({eventEditForm.rounds?.length || 0})</h3>
                    <button type="button" onClick={handleAddRound} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}>
                      <Plus size={14} />
                      <span>Add Round</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {(eventEditForm.rounds || []).map((round, rIdx) => (
                      <div key={rIdx} style={{ padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>{round.roundNumber || `Round ${rIdx + 1}`}</span>
                          <button type="button" onClick={() => handleDeleteRound(rIdx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Round Title"
                          value={round.title || ''}
                          onChange={(e) => {
                            const updated = [...eventEditForm.rounds];
                            updated[rIdx] = { ...updated[rIdx], title: e.target.value };
                            setEventEditForm({ ...eventEditForm, rounds: updated });
                          }}
                          style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                        />
                        <textarea
                          rows={2}
                          placeholder="Round Description..."
                          value={round.description || ''}
                          onChange={(e) => {
                            const updated = [...eventEditForm.rounds];
                            updated[rIdx] = { ...updated[rIdx], description: e.target.value };
                            setEventEditForm({ ...eventEditForm, rounds: updated });
                          }}
                          style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontFamily: 'inherit' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules Section */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Specific Arena Rules ({eventEditForm.rules?.length || 0})</h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Add a new competition rule..."
                      value={newRuleInput}
                      onChange={(e) => setNewRuleInput(e.target.value)}
                      style={{ flexGrow: 1, padding: '0.7rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                    <button type="button" onClick={handleAddRule} className="btn-secondary" style={{ padding: '0.7rem 1.2rem' }}>
                      <Plus size={16} />
                      <span>Add Rule</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {(eventEditForm.rules || []).map((rule, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 1rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>{rule}</span>
                        <button type="button" onClick={() => handleDeleteRule(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coordinators Assigned to this Event */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Event Coordinators</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="button" onClick={handleAddEventFacultyCoordinator} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        + Faculty Lead
                      </button>
                      <button type="button" onClick={handleAddEventStudentCoordinator} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        + Student Lead
                      </button>
                    </div>
                  </div>

                  {/* Student leads */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>Student Leads</span>
                    {(eventEditForm.coordinators?.student || []).map((s, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.65rem', alignItems: 'center', padding: '0.65rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                        <input
                          type="text"
                          placeholder="Student Name"
                          value={s.name || ''}
                          onChange={(e) => handleUpdateEventStudentCoordinator(idx, 'name', e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontSize: '0.85rem' }}
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          value={s.role || ''}
                          onChange={(e) => handleUpdateEventStudentCoordinator(idx, 'role', e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontSize: '0.85rem' }}
                        />
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={s.phone ?? s.contact ?? ''}
                          onChange={(e) => handleUpdateEventStudentCoordinator(idx, 'phone', e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#00d4ff', fontSize: '0.85rem' }}
                        />
                        <button type="button" onClick={() => handleDeleteEventStudentCoordinator(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Faculty leads */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase' }}>Faculty Leads</span>
                    {(eventEditForm.coordinators?.faculty || []).map((f, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.65rem', alignItems: 'center', padding: '0.65rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                        <input
                          type="text"
                          placeholder="Faculty Name"
                          value={f.name || ''}
                          onChange={(e) => handleUpdateEventFacultyCoordinator(idx, 'name', e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontSize: '0.85rem' }}
                        />
                        <input
                          type="text"
                          placeholder="Designation"
                          value={f.designation || ''}
                          onChange={(e) => handleUpdateEventFacultyCoordinator(idx, 'designation', e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontSize: '0.85rem' }}
                        />
                        <input
                          type="text"
                          placeholder="Phone / Contact"
                          value={f.phone ?? f.contact ?? ''}
                          onChange={(e) => handleUpdateEventFacultyCoordinator(idx, 'phone', e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#00d4ff', fontSize: '0.85rem' }}
                        />
                        <button type="button" onClick={() => handleDeleteEventFacultyCoordinator(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2.5rem' }}>
                    <Save size={16} />
                    <span>{isAddingEvent ? 'Publish New Event' : 'Save Event Changes'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: FEST HERO, COUNTDOWN & IDENTITY
            ========================================================================= */}
        {activeTab === 'core' && (
          <form onSubmit={handleSaveCore} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700, textTransform: 'uppercase' }}>
                FEST IDENTITY, HERO &amp; COUNTDOWN TIMER
              </span>
              <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginTop: '0.2rem' }}>
                Core Fest &amp; Hero Section Settings
              </h2>
            </div>

            {/* Centralized Google Form Link */}
            <div style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.35)' }}>
              <label style={{ display: 'block', fontSize: '0.92rem', color: '#00d4ff', fontWeight: 800, marginBottom: '0.5rem' }}>
                Centralized Google Form Registration Link
              </label>
              <input
                type="url"
                value={coreForm.googleFormUrl}
                onChange={(e) => setCoreForm({ ...coreForm, googleFormUrl: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1.2rem',
                  borderRadius: '10px',
                  backgroundColor: '#070f26',
                  border: '1px solid #00d4ff',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  outline: 'none',
                }}
              />
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                Every single "Register Now" button across the entire site automatically redirects to this link.
              </span>
            </div>

            {/* Hero Subtitle & Tagline */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#00d4ff', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Hero Animated Subtitle (e.g. JOIN THE EVENT)
                </label>
                <input
                  type="text"
                  value={coreForm.heroSubtitle}
                  onChange={(e) => setCoreForm({ ...coreForm, heroSubtitle: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #00d4ff', color: '#00d4ff', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Official Fest Tagline
                </label>
                <input
                  type="text"
                  value={coreForm.tagline}
                  onChange={(e) => setCoreForm({ ...coreForm, tagline: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Fest Countdown Target (ISO 8601 with IST offset)
                </label>
                <input
                  type="text"
                  value={coreForm.targetDate}
                  onChange={(e) => setCoreForm({ ...coreForm, targetDate: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
                <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Format: YYYY-MM-DDTHH:MM:SS+05:30 (e.g. 2026-11-26T09:30:00+05:30)</span>
              </div>
            </div>

            {/* Basic Identity */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Fest Title
                </label>
                <input
                  type="text"
                  value={coreForm.name}
                  onChange={(e) => setCoreForm({ ...coreForm, name: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Short Name
                </label>
                <input
                  type="text"
                  value={coreForm.shortName}
                  onChange={(e) => setCoreForm({ ...coreForm, shortName: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Edition (e.g. 2K26)
                </label>
                <input
                  type="text"
                  value={coreForm.edition}
                  onChange={(e) => setCoreForm({ ...coreForm, edition: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Organized By Department
                </label>
                <input
                  type="text"
                  value={coreForm.organizedBy}
                  onChange={(e) => setCoreForm({ ...coreForm, organizedBy: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>
            </div>

            {/* Date, Time & Venue */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Event Date Text
                </label>
                <input
                  type="text"
                  value={coreForm.dateText}
                  onChange={(e) => setCoreForm({ ...coreForm, dateText: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Event Time Text
                </label>
                <input
                  type="text"
                  value={coreForm.timeText}
                  onChange={(e) => setCoreForm({ ...coreForm, timeText: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Reporting Window
                </label>
                <input
                  type="text"
                  value={coreForm.reportingTime}
                  onChange={(e) => setCoreForm({ ...coreForm, reportingTime: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Primary Venue
                </label>
                <input
                  type="text"
                  value={coreForm.venue}
                  onChange={(e) => setCoreForm({ ...coreForm, venue: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
              </div>
            </div>

            {/* Stat Highlights Cards */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.75rem' }}>
                Homepage Stat Highlights ({coreForm.highlights?.length || 0})
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {(coreForm.highlights || []).map((h, hIdx) => (
                  <div key={hIdx} style={{ padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#00d4ff', fontWeight: 700 }}>Card #{hIdx + 1}</span>
                    <input
                      type="text"
                      placeholder="Label (e.g. 6 Flagship Events)"
                      value={h.label || ''}
                      onChange={(e) => handleUpdateHighlight(hIdx, 'label', e.target.value)}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Subtext"
                      value={h.sub || ''}
                      onChange={(e) => handleUpdateHighlight(hIdx, 'sub', e.target.value)}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#cbd5e1', fontSize: '0.82rem' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2.5rem', alignSelf: 'flex-start' }}>
              <Save size={16} />
              <span>Save Core Fest &amp; Hero Settings</span>
            </button>
          </form>
        )}

        {/* =========================================================================
            TAB 3: ABOUT PAGE & INSTITUTIONAL LEGACY
            ========================================================================= */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveAbout} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700, textTransform: 'uppercase' }}>
                ABOUT PAGE &amp; INSTITUTIONAL LEGACY
              </span>
              <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginTop: '0.2rem' }}>
                Vision, Mission, College &amp; Department Narrative
              </h2>
            </div>

            {/* Vision & Mission */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', color: '#00d4ff', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Our Vision
                </label>
                <textarea
                  rows={4}
                  value={aboutForm.vision}
                  onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#ffffff', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', color: '#a855f7', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Our Mission
                </label>
                <textarea
                  rows={4}
                  value={aboutForm.mission}
                  onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#ffffff', fontFamily: 'inherit' }}
                />
              </div>
            </div>

            {/* Fest Overview Narrative */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '0.4rem' }}>
                About Fest Main Narrative (Separate paragraphs with double newlines)
              </label>
              <textarea
                rows={5}
                value={aboutForm.description}
                onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit', lineHeight: 1.6 }}
              />
            </div>

            {/* Purpose & Takeaways Checklist */}
            <div style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Symposium Purpose &amp; Focus Points</h3>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Checklist shown under "Symposium Purpose" card on the About page</p>
                </div>
                <button type="button" onClick={handleAddPurposePoint} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  <Plus size={14} />
                  <span>Add Focus Point</span>
                </button>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Purpose Summary Paragraph</label>
                <textarea
                  rows={2}
                  value={aboutForm.purposeParagraph}
                  onChange={(e) => setAboutForm({ ...aboutForm, purposeParagraph: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {(aboutForm.purposePoints || []).map((pt, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={16} className="text-cyan-400" style={{ flexShrink: 0 }} />
                    <input
                      type="text"
                      value={pt}
                      onChange={(e) => handleUpdatePurposePoint(idx, e.target.value)}
                      style={{ flexGrow: 1, padding: '0.6rem 0.8rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontSize: '0.88rem' }}
                    />
                    <button type="button" onClick={() => handleDeletePurposePoint(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* College & Department Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'rgba(0, 212, 255, 0.03)', border: '1px solid rgba(0, 212, 255, 0.15)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00d4ff' }}>
                  <Building2 size={20} />
                  <span style={{ fontWeight: 700 }}>About College</span>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.2rem' }}>College Name</label>
                  <input
                    type="text"
                    value={aboutForm.collegeName}
                    onChange={(e) => setAboutForm({ ...aboutForm, collegeName: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.2rem' }}>Affiliation Details</label>
                  <input
                    type="text"
                    value={aboutForm.collegeAffiliation}
                    onChange={(e) => setAboutForm({ ...aboutForm, collegeAffiliation: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.2rem' }}>Overview Narrative</label>
                  <textarea
                    rows={4}
                    value={aboutForm.collegeOverview}
                    onChange={(e) => setAboutForm({ ...aboutForm, collegeOverview: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontFamily: 'inherit' }}
                  />
                </div>
              </div>

              <div style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'rgba(168, 85, 247, 0.03)', border: '1px solid rgba(168, 85, 247, 0.15)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc' }}>
                  <GraduationCap size={20} />
                  <span style={{ fontWeight: 700 }}>About Department</span>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.2rem' }}>Department Name</label>
                  <input
                    type="text"
                    value={aboutForm.deptName}
                    onChange={(e) => setAboutForm({ ...aboutForm, deptName: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.2rem' }}>Department Overview Narrative</label>
                  <textarea
                    rows={5}
                    value={aboutForm.deptOverview}
                    onChange={(e) => setAboutForm({ ...aboutForm, deptOverview: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontFamily: 'inherit' }}
                  />
                </div>
              </div>
            </div>

            {/* Takeaways Cards */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.75rem' }}>
                "What Participants Can Expect" Takeaways ({aboutForm.takeaways?.length || 0})
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {(aboutForm.takeaways || []).map((t, idx) => (
                  <div key={idx} style={{ padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="Title"
                      value={t.title || ''}
                      onChange={(e) => handleUpdateTakeaway(idx, 'title', e.target.value)}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', fontWeight: 600, fontSize: '0.88rem' }}
                    />
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={t.desc || ''}
                      onChange={(e) => handleUpdateTakeaway(idx, 'desc', e.target.value)}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#cbd5e1', fontSize: '0.82rem', fontFamily: 'inherit' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2.5rem', alignSelf: 'flex-start' }}>
              <Save size={16} />
              <span>Save About Page Content</span>
            </button>
          </form>
        )}

        {/* =========================================================================
            TAB 4: TIMELINE & SCHEDULE (FULL CRUD)
            ========================================================================= */}
        {activeTab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* General Schedule Settings */}
            <form onSubmit={handleSaveScheduleGeneral} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700, textTransform: 'uppercase' }}>
                    SCHEDULE GENERAL SETTINGS
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginTop: '0.2rem' }}>
                    Schedule Header &amp; Organizer Notice
                  </h3>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
                  <Save size={15} />
                  <span>Save Schedule Info</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Fest Date</label>
                  <input
                    type="text"
                    value={scheduleGeneralForm.festDate}
                    onChange={(e) => setScheduleGeneralForm({ ...scheduleGeneralForm, festDate: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Day Title</label>
                  <input
                    type="text"
                    value={scheduleGeneralForm.dayTitle}
                    onChange={(e) => setScheduleGeneralForm({ ...scheduleGeneralForm, dayTitle: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Public Schedule Disclaimer / Organizer Note</label>
                <textarea
                  rows={2}
                  value={scheduleGeneralForm.note}
                  onChange={(e) => setScheduleGeneralForm({ ...scheduleGeneralForm, note: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                />
              </div>
            </form>

            {/* Timeline Slots CRUD */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                    Timeline Slots ({scheduleData.timeline?.length || 0})
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
                    Add, edit, or adjust the sequence of fest events, breaks, and ceremonies.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingSlot(true)}
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <Plus size={16} />
                  <span>Add Timeline Slot</span>
                </button>
              </div>

              {/* Add New Slot Inline Form */}
              {isAddingSlot && (
                <form onSubmit={handleAddSlotSubmit} style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'rgba(0, 212, 255, 0.06)', border: '1px solid #00d4ff', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#00d4ff' }}>Create New Timeline Slot</span>
                    <button type="button" onClick={() => setIsAddingSlot(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                      <X size={18} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Time (e.g. 09:30 AM - 10:15 AM)"
                      value={newSlotForm.time}
                      onChange={(e) => setNewSlotForm({ ...newSlotForm, time: e.target.value })}
                      required
                      style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      placeholder="Title (e.g. Grand Inauguration)"
                      value={newSlotForm.title}
                      onChange={(e) => setNewSlotForm({ ...newSlotForm, title: e.target.value })}
                      required
                      style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      placeholder="Venue (e.g. Main Seminar Hall)"
                      value={newSlotForm.venue}
                      onChange={(e) => setNewSlotForm({ ...newSlotForm, venue: e.target.value })}
                      style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
                    />
                    <select
                      value={newSlotForm.category}
                      onChange={(e) => setNewSlotForm({ ...newSlotForm, category: e.target.value })}
                      style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
                    >
                      <option value="Registration">Registration</option>
                      <option value="Ceremony">Ceremony</option>
                      <option value="Keynote">Keynote</option>
                      <option value="Competitions">Competitions</option>
                      <option value="Break">Break</option>
                      <option value="Finals">Finals</option>
                    </select>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Description of activities, presentations, or sessions during this time..."
                    value={newSlotForm.description}
                    onChange={(e) => setNewSlotForm({ ...newSlotForm, description: e.target.value })}
                    style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff', fontFamily: 'inherit' }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={newSlotForm.isHighlight}
                        onChange={(e) => setNewSlotForm({ ...newSlotForm, isHighlight: e.target.checked })}
                      />
                      <span>Highlight this slot on timeline</span>
                    </label>

                    <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.84rem' }}>
                      <Save size={14} />
                      <span>Add Slot</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Slot Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(scheduleData.timeline || []).map((slot, sIdx) => (
                  <div
                    key={slot.id || sIdx}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: slot.isHighlight ? 'rgba(0, 212, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      border: slot.isHighlight ? '1px solid rgba(0, 212, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ maxWidth: '75%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00d4ff', backgroundColor: 'rgba(0, 212, 255, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          {slot.time}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          {slot.category}
                        </span>
                        {slot.isHighlight && (
                          <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>★ Highlight</span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.25rem' }}>{slot.title}</h4>
                      <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: '0 0 0.4rem 0' }}>📍 {slot.venue}</p>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>{slot.description}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <button
                        onClick={() => {
                          setEditingSlotId(slot.id);
                          setSlotEditForm(JSON.parse(JSON.stringify(slot)));
                        }}
                        style={{ padding: '0.45rem 0.9rem', borderRadius: '6px', backgroundColor: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem' }}
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete slot "${slot.title}"?`)) {
                            deleteScheduleSlot(slot.id);
                            showToast('Timeline slot removed.');
                          }
                        }}
                        style={{ padding: '0.45rem 0.9rem', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem' }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Slot Edit Modal */}
            {editingSlotId && slotEditForm && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  zIndex: 9999,
                }}
                onClick={() => setEditingSlotId(null)}
              >
                <form
                  onSubmit={handleSaveSlotEdit}
                  onClick={(e) => e.stopPropagation()}
                  className="glass-card"
                  style={{ maxWidth: '650px', width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #00d4ff' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Edit Timeline Slot</h3>
                    <button type="button" onClick={() => setEditingSlotId(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                      <X size={20} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Time Range</label>
                      <input
                        type="text"
                        value={slotEditForm.time || ''}
                        onChange={(e) => setSlotEditForm({ ...slotEditForm, time: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Category</label>
                      <input
                        type="text"
                        value={slotEditForm.category || ''}
                        onChange={(e) => setSlotEditForm({ ...slotEditForm, category: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Slot Title</label>
                    <input
                      type="text"
                      value={slotEditForm.title || ''}
                      onChange={(e) => setSlotEditForm({ ...slotEditForm, title: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Venue</label>
                    <input
                      type="text"
                      value={slotEditForm.venue || ''}
                      onChange={(e) => setSlotEditForm({ ...slotEditForm, venue: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Description</label>
                    <textarea
                      rows={3}
                      value={slotEditForm.description || ''}
                      onChange={(e) => setSlotEditForm({ ...slotEditForm, description: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                    />
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={Boolean(slotEditForm.isHighlight)}
                      onChange={(e) => setSlotEditForm({ ...slotEditForm, isHighlight: e.target.checked })}
                    />
                    <span>Highlight this slot on timeline</span>
                  </label>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button type="button" onClick={() => setEditingSlotId(null)} className="btn-secondary" style={{ padding: '0.6rem 1.2rem' }}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                      <Save size={15} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 5: REGISTRATION PROCESS, MANDATORY RULES & FAQS
            ========================================================================= */}
        {activeTab === 'registration' && (
          <form onSubmit={handleSaveRegistrationSection} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700, textTransform: 'uppercase' }}>
                  REGISTRATION &amp; FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginTop: '0.2rem' }}>
                  4-Step Flow, Protocols &amp; Participant FAQs
                </h2>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                <Save size={16} />
                <span>Save All Registration Content</span>
              </button>
            </div>

            {/* 4 Steps */}
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#38bdf8', marginBottom: '1rem' }}>
                4-Step Registration Process Cards
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {regSteps.map((st, idx) => (
                  <div key={idx} style={{ padding: '1.25rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#00d4ff' }}>{st.number || `0${idx + 1}`}</span>
                    <input
                      type="text"
                      placeholder="Step Title"
                      value={st.title || ''}
                      onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', fontWeight: 600, fontSize: '0.88rem' }}
                    />
                    <textarea
                      rows={3}
                      placeholder="Step Instructions"
                      value={st.desc || ''}
                      onChange={(e) => handleUpdateStep(idx, 'desc', e.target.value)}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#cbd5e1', fontSize: '0.82rem', fontFamily: 'inherit' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Protocols */}
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
                Mandatory Fest Rules &amp; Protocols ({importantNotes.length})
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
                Displayed under "Mandatory Fest Rules &amp; Protocols" on the registration page and about page.
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Add a new mandatory guideline..."
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  style={{ flexGrow: 1, padding: '0.7rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
                <button type="button" onClick={handleAddRuleItem} className="btn-secondary" style={{ padding: '0.7rem 1.2rem' }}>
                  <Plus size={16} />
                  <span>Add Protocol</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {importantNotes.map((note, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 1rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>• {note}</span>
                    <button type="button" onClick={() => handleDeleteRuleItem(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs CRUD */}
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
                Frequently Asked Questions ({faqsList.length})
              </h3>

              <div style={{ padding: '1.25rem', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00d4ff' }}>Add New FAQ</span>
                <input
                  type="text"
                  placeholder="Question (e.g. Can members from different colleges form a single team?)"
                  value={newFaq.q}
                  onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })}
                  style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                />
                <textarea
                  rows={2}
                  placeholder="Answer..."
                  value={newFaq.a}
                  onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })}
                  style={{ padding: '0.7rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                />
                <button type="button" onClick={handleAddFaqItem} className="btn-secondary" style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem' }}>
                  <Plus size={14} />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {faqsList.map((faq, idx) => (
                  <div key={idx} style={{ padding: '1.25rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 700 }}>FAQ #{idx + 1}</span>
                      <button type="button" onClick={() => handleDeleteFaqItem(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.q || ''}
                      onChange={(e) => handleUpdateFaqItem(idx, 'q', e.target.value)}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', fontWeight: 600, fontSize: '0.88rem' }}
                    />
                    <textarea
                      rows={2}
                      value={faq.a || ''}
                      onChange={(e) => handleUpdateFaqItem(idx, 'a', e.target.value)}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#cbd5e1', fontSize: '0.84rem', fontFamily: 'inherit' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2.5rem', alignSelf: 'flex-start' }}>
              <Save size={16} />
              <span>Save All Registration Content</span>
            </button>
          </form>
        )}

        {/* =========================================================================
            TAB 6: COORDINATORS & CONTACT DETAILS
            ========================================================================= */}
        {activeTab === 'coordinators' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <form onSubmit={handleSaveContactGeneral} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>General Department Enquiries &amp; Social Links</h3>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Updated contact information reflects directly across Contact and Footer.</p>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
                  <Save size={15} />
                  <span>Save Info</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Department Official Email
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.officialEmail}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, officialEmail: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Fest Support Email
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.festSupportEmail}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, festSupportEmail: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Primary Helpline Phone
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.helplinePhone}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, helplinePhone: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Alternate Helpline Phone
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.alternatePhone}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, alternatePhone: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Instagram Handle / URL
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.instagram}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, instagram: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.linkedin}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, linkedin: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Google Maps Direct View Link
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.mapsViewLink}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, mapsViewLink: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Google Maps Embed Iframe URL
                  </label>
                  <input
                    type="text"
                    value={contactGeneralForm.mapsEmbedUrl}
                    onChange={(e) => setContactGeneralForm({ ...contactGeneralForm, mapsEmbedUrl: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />
                </div>
              </div>
            </form>

            {/* Faculty Coordinators CRUD */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                  Faculty Coordinators ({contactData.facultyCoordinators?.length || 0})
                </h3>
                <button
                  onClick={() => {
                    addFacultyCoordinator({
                      name: 'Faculty Coordinator Name',
                      designation: 'Assistant Professor, Dept. of ISE',
                      role: 'Faculty Convener',
                      phone: '+91 98765 43210',
                      email: 'faculty@sairamce.edu.in',
                    });
                    showToast('Added new faculty coordinator card.');
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  <Plus size={14} />
                  <span>Add Faculty Coordinator</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {(contactData.facultyCoordinators || []).map((fac, fIdx) => (
                  <div
                    key={fIdx}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: '#00d4ff', fontWeight: 700 }}>Faculty #{fIdx + 1}</span>
                      <button
                        onClick={() => {
                          deleteFacultyCoordinator(fIdx);
                          showToast('Faculty coordinator removed.');
                        }}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={fac.name}
                      placeholder="Full Name"
                      onChange={(e) => updateFacultyCoordinator(fIdx, { ...fac, name: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={fac.designation}
                      placeholder="Designation"
                      onChange={(e) => updateFacultyCoordinator(fIdx, { ...fac, designation: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={fac.role || 'Faculty Convener'}
                      placeholder="Role (e.g. Chief Convener)"
                      onChange={(e) => updateFacultyCoordinator(fIdx, { ...fac, role: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={fac.phone || fac.contact || ''}
                      placeholder="Contact Phone"
                      onChange={(e) => updateFacultyCoordinator(fIdx, { ...fac, phone: e.target.value, contact: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#00d4ff' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Student Coordinators CRUD */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                  Student Coordinators ({contactData.studentCoordinators?.length || 0})
                </h3>
                <button
                  onClick={() => {
                    addStudentCoordinator({
                      name: 'Student Convener Name',
                      role: 'Lead Student Organizer',
                      phone: '+91 98765 43210',
                      email: 'student@sairamce.edu.in',
                    });
                    showToast('Added new student coordinator card.');
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  <Plus size={14} />
                  <span>Add Student Coordinator</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {(contactData.studentCoordinators || []).map((stu, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>Student #{sIdx + 1}</span>
                      <button
                        onClick={() => {
                          deleteStudentCoordinator(sIdx);
                          showToast('Student coordinator removed.');
                        }}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={stu.name}
                      placeholder="Full Name"
                      onChange={(e) => updateStudentCoordinator(sIdx, { ...stu, name: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={stu.role}
                      placeholder="Role (e.g. Lead Student Convener)"
                      onChange={(e) => updateStudentCoordinator(sIdx, { ...stu, role: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={stu.phone || stu.contact || ''}
                      placeholder="Phone Number"
                      onChange={(e) => updateStudentCoordinator(sIdx, { ...stu, phone: e.target.value, contact: e.target.value })}
                      style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#00d4ff' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 7: ANNOUNCEMENTS & LIVE NOTICE BOARD (FULL CRUD)
            ========================================================================= */}
        {activeTab === 'announcements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <form onSubmit={handleCreateAnnouncement} className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1.25rem' }}>
                Publish New Notice or Live Update
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Announcement Title (e.g. Round 1 Results Announced)..."
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    required
                    style={{ padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />

                  <select
                    value={newAnnBadge}
                    onChange={(e) => setNewAnnBadge(e.target.value)}
                    style={{ padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  >
                    <option value="Important">Important</option>
                    <option value="Registration">Registration</option>
                    <option value="Event Guideline">Event Guideline</option>
                    <option value="Update">Update</option>
                    <option value="Certification">Certification</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  placeholder="Full summary details for participants..."
                  value={newAnnSummary}
                  onChange={(e) => setNewAnnSummary(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                />

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', padding: '0.75rem 1.8rem' }}
                >
                  <Plus size={16} />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>

            {/* List of Active Announcements with Edit & Delete */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                Active Announcements on Notice Board ({announcementsData.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {announcementsData.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ maxWidth: '80%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00d4ff', backgroundColor: 'rgba(0, 212, 255, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          {item.badge}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.date}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.3rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{item.summary}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <button
                        onClick={() => {
                          setEditingAnnId(item.id);
                          setAnnEditForm(JSON.parse(JSON.stringify(item)));
                        }}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', backgroundColor: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete notice "${item.title}"?`)) {
                            deleteAnnouncement(item.id);
                            showToast('Announcement deleted.');
                          }
                        }}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcement Edit Modal */}
            {editingAnnId && annEditForm && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  zIndex: 9999,
                }}
                onClick={() => setEditingAnnId(null)}
              >
                <form
                  onSubmit={handleSaveAnnEdit}
                  onClick={(e) => e.stopPropagation()}
                  className="glass-card"
                  style={{ maxWidth: '600px', width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>Edit Announcement</h3>
                    <button type="button" onClick={() => setEditingAnnId(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                      <X size={20} />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={annEditForm.title || ''}
                    onChange={(e) => setAnnEditForm({ ...annEditForm, title: e.target.value })}
                    style={{ padding: '0.75rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  />

                  <select
                    value={annEditForm.badge || 'Important'}
                    onChange={(e) => setAnnEditForm({ ...annEditForm, badge: e.target.value })}
                    style={{ padding: '0.75rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                  >
                    <option value="Important">Important</option>
                    <option value="Registration">Registration</option>
                    <option value="Event Guideline">Event Guideline</option>
                    <option value="Update">Update</option>
                    <option value="Certification">Certification</option>
                  </select>

                  <textarea
                    rows={4}
                    value={annEditForm.summary || ''}
                    onChange={(e) => setAnnEditForm({ ...annEditForm, summary: e.target.value })}
                    style={{ padding: '0.75rem', borderRadius: '6px', backgroundColor: '#070f26', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontFamily: 'inherit' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setEditingAnnId(null)} className="btn-secondary" style={{ padding: '0.6rem 1.2rem' }}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                      <Save size={15} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 8: PARTICIPANT QR CODES & DIRECT LINKS
            ========================================================================= */}
        {activeTab === 'qr' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid rgba(0, 212, 255, 0.35)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#00d4ff', marginBottom: '0.5rem' }}>
                <QrCode size={22} />
                <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>
                  Participant Official QR Codes &amp; Share Links
                </h2>
              </div>

              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                These high-resolution QR codes lead participants to the <strong>public website and registration form only</strong>. Use these on posters, banners, ID cards, and social media flyers.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                {/* QR 1: Public Website */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRadius: '16px' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '14px', boxShadow: '0 0 25px rgba(0, 212, 255, 0.25)', marginBottom: '1.5rem' }}>
                    <img src={qrDownloadUrl} alt="Participant Website QR" style={{ width: '220px', height: '220px', display: 'block' }} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.3rem' }}>
                    1. Public Fest Portal QR
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Scans directly to the public website home page
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                    <a href={qrDownloadUrl} download="TechnoVista_Portal_QR.png" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flexGrow: 1, padding: '0.65rem 0.8rem', fontSize: '0.84rem', justifyContent: 'center' }}>
                      <Download size={15} />
                      <span>Download QR</span>
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(participantSiteUrl);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                        showToast('Portal URL copied to clipboard!');
                      }}
                      className="btn-secondary"
                      style={{ padding: '0.65rem 1rem', fontSize: '0.84rem' }}
                    >
                      <Copy size={15} />
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>

                {/* QR 2: Google Form */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRadius: '16px' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '14px', boxShadow: '0 0 25px rgba(139, 92, 246, 0.25)', marginBottom: '1.5rem' }}>
                    <img src={qrGoogleFormUrl} alt="Google Form QR" style={{ width: '220px', height: '220px', display: 'block' }} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.3rem' }}>
                    2. Google Form Registration QR
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Scans directly to the centralized registration Google Form
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                    <a href={qrGoogleFormUrl} download="TechnoVista_GoogleForm_QR.png" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flexGrow: 1, padding: '0.65rem 0.8rem', fontSize: '0.84rem', justifyContent: 'center' }}>
                      <Download size={15} />
                      <span>Download QR</span>
                    </a>
                    <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.65rem 1rem', fontSize: '0.84rem' }}>
                      <ExternalLink size={15} />
                      <span>Open Form</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
