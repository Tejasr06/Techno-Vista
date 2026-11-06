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

  importantNotes: [
    "Every participant must carry their official College Identity Card on the day of the fest.",
    "All team members should register beforehand through the official Google Form.",
    "Participants can take part in multiple events provided event timings do not overlap.",
    "Certificates of Participation will be issued to all registered participants attending the fest.",
    "Decisions made by the judging panels and event coordinators will be final and binding."
  ]
};

