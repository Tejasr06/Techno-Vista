/**
 * TECHNO VISTA 2K26 - Centralized Fest Configuration
 * Edit this file to update overall fest details, dates, venue, and the common Google Form URL.
 */

// CENTRALIZED GOOGLE FORM REGISTRATION LINK
// Every 'Register Now' button across the entire website automatically uses this URL.
export const GOOGLE_FORM_URL = "https://forms.gle/Lji4KKgnRdzk4Gw97";

// Check if a real link has been pasted or if it's still the placeholder
export const isGoogleFormConfigured = () => {
  return (
    GOOGLE_FORM_URL &&
    GOOGLE_FORM_URL !== "PASTE_GOOGLE_FORM_LINK_HERE" &&
    GOOGLE_FORM_URL.startsWith("http")
  );
};

export const FEST_DATA = {
  name: "TECHNO VISTA 2K26",
  shortName: "TechnoVista",
  edition: "2K26",
  tagline: "Vision Beyond Innovation",
  heroSubtitle: "JOIN THE EVENT",
  eventType: "National-Level Technical Fest",
  organizedBy: "Department of Information Science and Engineering",
  college: "Sri Sairam College of Engineering",
  location: "Anekal, Bengaluru, Karnataka",
  address: "Sai Leo Nagar, Guddanahalli, Anekal, Bengaluru, Karnataka 562106",
  dateText: "26 November 2026",
  timeText: "9:30 AM onwards",
  reportingTime: "8:45 AM - 9:15 AM",
  venue: "Seminar Hall & ISE Labs",
  
  // Target date for the countdown timer in ISO 8601 format with IST timezone offset (+05:30)
  targetDate: "2026-11-26T09:30:00+05:30",

  highlights: [
    {
      label: "6 Flagship Events",
      sub: "Coding, AI, Cyber, Design & Gaming",
    },
    {
      label: "National Level",
      sub: "Participants across top colleges",
    },
    {
      label: "Cash Prizes & Awards",
      sub: "Exciting trophies, certificates & perks",
    },
    {
      label: "Certificates for All",
      sub: "Authorized participation certificates",
    },
  ],

  aboutFest: {
    title: "About TECHNO VISTA 2K26",
    subtitle: "A convergence of visionary minds, groundbreaking code, and relentless engineering.",
    description: [
      "TECHNO VISTA 2K26 is the flagship National-Level Technical Fest proudly organized by the Department of Information Science and Engineering at Sri Sairam College of Engineering, Bengaluru.",
      "Rooted in our ethos 'Vision Beyond Innovation', TECHNO VISTA serves as a premier arena where passionate student technocrats, problem-solvers, developers, and designers from across the country congregate to showcase their prowess, cross-pollinate ideas, and solve real-world challenges.",
      "Featuring 6 meticulously curated competitive tracks spanning research paper presentations, algorithmic coding battles, cyber security challenges, autonomous bot construction, UI/UX creativity, and tactical esports, this festival is engineered to push the boundaries of technical excellence."
    ],
    mission: "To foster an ecosystem of innovation, technical curiosity, and collaborative learning by challenging participants with industry-aligned technical arenas.",
    vision: "To establish TECHNO VISTA as South India's benchmark technical symposium, bridging academic knowledge with technological innovation.",
    purposeParagraph: "The purpose of organizing TECHNO VISTA 2K26 is to create an authentic bridge between classroom theoretical computer science and high-pressure industry-grade engineering environments.",
    purposePoints: [
      "Benchmarking technical acumen against students nationwide",
      "Promoting research orientation and paper defense standards",
      "Sharpening competitive programming speed and complexity analysis",
      "Cultivating hands-on cybersecurity and robotics skills",
    ],
  },

  aboutCollege: {
    name: "Sri Sairam College of Engineering",
    affiliation: "Affiliated to Visvesvaraya Technological University (VTU), Belagavi & Approved by AICTE, New Delhi",
    location: "Anekal, Bengaluru, Karnataka - 562106",
    overview:
      "Sri Sairam College of Engineering, Bengaluru, established under the visionary guidance of MJF. Lion Leo Muthu, stands as a premier institution committed to imparting world-class technical education, ethical values, and holistic development. With state-of-the-art infrastructure, advanced research labs, and distinguished faculty, the institution cultivates engineers ready to lead global technological advancements.",
  },

  aboutDepartment: {
    name: "Department of Information Science and Engineering",
    overview:
      "The Department of Information Science and Engineering (ISE) is dedicated to producing high-caliber software engineers, data scientists, cybersecurity specialists, and researchers. Equipped with cutting-edge computing laboratories and active student chapters, the department consistently encourages innovation through hackathons, technical symposiums, research publications, and industry mentorship programs.",
  },

  takeaways: [
    {
      title: "Podium Honors & Cash Rewards",
      desc: "Winners receive cash awards, prestigious trophies, and commemorative medals in front of the assembled audience.",
    },
    {
      title: "Industry & Academic Jury Feedback",
      desc: "Constructive evaluations from experienced professors and technology professionals to hone your project defense skills.",
    },
    {
      title: "Peer Cross-Pollination",
      desc: "Collaborate and network with engineering peers passionate about full-stack dev, AI, ethical hacking, and robotics.",
    },
    {
      title: "Official VTU-Affiliated Certificates",
      desc: "Valid, authorized participation certificates recognizing your engagement in a national-level symposium.",
    },
  ],

  registrationSteps: [
    {
      number: "01",
      title: "Review Event Rules & Eligibility",
      desc: "Browse through the official events, verify team size requirements, and ensure all team members meet the eligibility criteria.",
    },
    {
      number: "02",
      title: "Assemble Your Team & Credentials",
      desc: "Collect each member's full name, valid email address, phone number, college USN/Roll number, and official college affiliation.",
    },
    {
      number: "03",
      title: "Fill Out The Official Google Form",
      desc: "Click the button below to access our centralized Google Form. Select your chosen competitive tracks and submit your team roster.",
    },
    {
      number: "04",
      title: "Bring College ID & Report on Fest Day",
      desc: "Carry your original physical College Identity Card on 26 November 2026. Report between 8:45 AM and 9:15 AM at the Seminar Hall desk.",
    },
  ],

  faqs: [
    {
      q: "Can members from different colleges form a single team?",
      a: "Yes, cross-college teams are permitted for all team-based events (Intelli Talks, Build a Bot, CTF, Clash of Squadz). Every individual member must present a valid college ID from their respective institution.",
    },
    {
      q: "Can one person participate in more than one event?",
      a: "Yes! Participants can register for multiple tracks, provided the event timings and laboratory sessions do not conflict. Check individual event details for slot timings.",
    },
    {
      q: "Will all participants receive certificates?",
      a: "Yes, authorized Certificates of Participation from the Department of Information Science and Engineering, Sri Sairam College of Engineering will be awarded to all registered attendees.",
    },
    {
      q: "Is on-spot registration available on the day of the fest?",
      a: "While limited on-spot slots may be available based on workstation and arena capacity, online pre-registration via Google Form is strongly recommended to guarantee participation.",
    },
    {
      q: "What is the registration fee policy?",
      a: "Registration fee details (if applicable for specific tracks or all-access passes) are outlined directly within the official Google Form. Please refer to the form instructions upon clicking the link.",
    },
  ],

  importantNotes: [
    "Every participant must carry their official College Identity Card on the day of the fest.",
    "All team members should register beforehand through the official Google Form.",
    "Participants can take part in multiple events provided event timings do not overlap.",
    "Certificates of Participation will be issued to all registered participants attending the fest.",
    "Decisions made by the judging panels and event coordinators will be final and binding."
  ]
};
