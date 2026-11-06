/**
 * TECHNO VISTA 2K26 - Centralized Events Configuration
 * Contains official specifications for all 6 events.
 * Clearly marked placeholders are provided for organizers to plug in final rules,
 * coordinators, team sizes, and timings without altering component code.
 */

export const EVENTS_DATA = [
  {
    id: "intelli-talks",
    name: "Intelli Talks",
    subtitle: "National-Level Paper Presentation",
    category: "Research & Paper Presentation",
    badge: "Flagship",
    icon: "Presentation",
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
    accentColor: "#38bdf8",
    image: "/assets/events/intelli-talks.svg",
    shortDescription:
      "Present your cutting-edge technical research, innovative ideas, and visionary engineering concepts to a panel of academic and industry jury members.",
    tagline: "Where Research Sparks Real-World Innovation",
    
    // Editable Placeholders
    timing: "11:00 AM - 01:30 PM (Tentative / Editable in eventsData.js)",
    venue: "Seminar Hall - Presentation Zone (Editable)",
    teamSize: "1 to 3 Members per Team (Editable Placeholder)",
    eligibility: "Open to all enrolled B.E / B.Tech / M.Tech / MCA / BCA students with valid college ID.",
    registrationFee: "Refer to official registration details in Google Form (Editable)",
    
    overview:
      "Intelli Talks invites aspiring student researchers, innovators, and scholars to present their technical papers covering emerging domains in Computer Science, Information Science, Artificial Intelligence, Cybersecurity, IoT, and Cloud Computing. Stand before an esteemed jury, articulate your methodology, defend your findings, and compete for top honors.",

    suggestedTracks: [
      "Artificial Intelligence, Machine Learning & Deep Learning",
      "Cybersecurity, Cryptography & Blockchain Architecture",
      "Cloud Computing, Distributed Systems & DevOps",
      "IoT, Embedded Systems & Smart Automation",
      "Data Science, Big Data Analytics & NLP",
      "Open Innovation & Sustainable Computing Technologies"
    ],

    rounds: [
      {
        roundNumber: "Round 1",
        title: "Abstract & Paper Screening (Pre-Fest)",
        description:
          "[Organizer Note: Teams submit their paper/abstract via the Google Form prior to the deadline. Shortlisted teams are notified for offline presentation.]"
      },
      {
        roundNumber: "Round 2",
        title: "On-Stage Technical Presentation (Fest Day)",
        description:
          "Teams present their work (PPT format) in front of the jury. Total time per team: 8 minutes presentation + 2 minutes Q&A with the jury."
      }
    ],

    rules: [
      "All presentations must be brought in PPT / PPTX or PDF format on a USB drive.",
      "The paper should be original work; plagiarism above the permissible limit (e.g., >15%) will lead to disqualification.",
      "Maximum of 3 participants allowed per team. Cross-college teams are permitted with valid college IDs.",
      "Presentation duration: Strictly 8 minutes presentation followed by 2 minutes Q&A.",
      "Dress code: Formal / Decent college attire.",
      "[Editable Placeholder: Additional rules, formatting standards (IEEE format, etc.) can be updated here in eventsData.js]."
    ],

    judgingCriteria: [
      { parameter: "Innovation & Originality", weight: "25%" },
      { parameter: "Technical Depth & Methodology", weight: "25%" },
      { parameter: "Presentation & Communication Skills", weight: "25%" },
      { parameter: "Defense during Q&A Session", weight: "25%" }
    ],

    coordinators: {
      faculty: [
        { name: "Faculty Coordinator 1 (To be updated)", designation: "Dept. of ISE", contact: "[Phone/Email Placeholder]" },
        { name: "Faculty Coordinator 2 (To be updated)", designation: "Dept. of ISE", contact: "[Phone/Email Placeholder]" }
      ],
      student: [
        { name: "Student Lead 1 (To be updated)", role: "Event Lead", contact: "[Phone Placeholder]" },
        { name: "Student Lead 2 (To be updated)", role: "Co-Lead", contact: "[Phone Placeholder]" }
      ]
    }
  },

  {
    id: "code-sprint",
    name: "Code Sprint",
    subtitle: "High-Octane Algorithmic Code Contest",
    category: "Competitive Programming",
    badge: "Coding Challenge",
    icon: "Code2",
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
    accentColor: "#10b981",
    image: "/assets/events/code-sprint.svg",
    shortDescription:
      "A fast-paced algorithmic coding battle that tests problem-solving speed, data structures, dynamic programming, and clean code optimization under time constraints.",
    tagline: "Think Fast, Code Faster, Rank First",

    timing: "11:00 AM - 01:00 PM (Round 1) | 02:00 PM - 03:30 PM (Finals) (Editable)",
    venue: "Advanced Computing Lab 1 & 2 (Editable)",
    teamSize: "Individual or 2 Members per Team (Editable Placeholder)",
    eligibility: "Open to all engineering students with valid College ID.",
    registrationFee: "Refer to official registration details in Google Form (Editable)",

    overview:
      "Code Sprint tests the ultimate coding grit of participants. Tackling algorithmic puzzles ranging from arrays and trees to graph algorithms and dynamic programming, coders will battle against the clock and their peers on an online judge platform to claim the title of Master Coder.",

    supportedLanguages: ["C++", "Java", "Python 3", "C"],

    rounds: [
      {
        roundNumber: "Round 1",
        title: "Speed Debugging & Algorithmic Prelims",
        description:
          "45-minute sprint with time-penalized MCQs and rapid debugging problems testing syntax, edge cases, and algorithmic complexity."
      },
      {
        roundNumber: "Round 2",
        title: "The Ultimate Sprint (Finals)",
        description:
          "90-minute competitive programming arena featuring hard-level algorithmic problem statements. Scoreboard live until the last 15 minutes."
      }
    ],

    rules: [
      "Allowed programming languages: C, C++, Java, and Python 3.",
      "Participants must solve problems individually or as a registered duo (based on final guidelines).",
      "Use of external AI code assistants (ChatGPT, Copilot, etc.) or unauthorized tabs is strictly prohibited.",
      "Ties will be broken based on submission timestamps and minimal penalty points.",
      "[Editable Placeholder: Final platform link (HackerRank/LeetCode/CodeChef) and specific penalty points to be updated here]."
    ],

    judgingCriteria: [
      { parameter: "Test Cases Passed (Correctness)", weight: "50%" },
      { parameter: "Time Complexity & Optimization", weight: "25%" },
      { parameter: "Speed of Submission", weight: "25%" }
    ],

    coordinators: {
      faculty: [
        { name: "Faculty Coordinator (To be updated)", designation: "Dept. of ISE", contact: "[Phone/Email Placeholder]" }
      ],
      student: [
        { name: "Student Lead 1 (To be updated)", role: "Technical Lead", contact: "[Phone Placeholder]" },
        { name: "Student Lead 2 (To be updated)", role: "Contest Lead", contact: "[Phone Placeholder]" }
      ]
    }
  },

  {
    id: "capture-the-flag",
    name: "Capture the Flag",
    subtitle: "Offensive Security & Cyber Quest",
    category: "Cybersecurity & Ethical Hacking",
    badge: "Cyber Arena",
    icon: "ShieldAlert",
    gradient: "from-red-500 via-rose-600 to-purple-600",
    accentColor: "#f43f5e",
    image: "/assets/events/capture-the-flag.svg",
    shortDescription:
      "Dive into the digital battlefield. Exploit vulnerabilities, decrypt ciphers, analyze packet captures, and capture flags in an adrenaline-pumping cybersecurity arena.",
    tagline: "Hack, Exploit, Decrypt, Conquer",

    timing: "11:30 AM - 03:00 PM (Editable)",
    venue: "Cyber Security & Systems Lab (Editable)",
    teamSize: "2 to 3 Members per Team (Editable Placeholder)",
    eligibility: "Open to all UG/PG college students fascinated by cybersecurity.",
    registrationFee: "Refer to official registration details in Google Form (Editable)",

    overview:
      "Capture the Flag (CTF) is TECHNO VISTA 2K26's flagship cybersecurity tournament. Designed jeopardy-style, teams face a spectrum of authentic cyber challenges spanning web penetration testing, reverse engineering, cryptography, digital forensics, and binary exploitation.",

    challengeCategories: [
      "Web Application Security & OWASP Top 10",
      "Modern & Classical Cryptography",
      "Network Packet Forensics & Steganography",
      "Reverse Engineering & Binary Analysis",
      "OSINT (Open Source Intelligence)"
    ],

    rounds: [
      {
        roundNumber: "Live Arena",
        title: "Jeopardy-Style CTF Arena",
        description:
          "Teams access an isolated competition network and flag submission dashboard. Challenges award points dynamically based on solve count."
      }
    ],

    rules: [
      "Any attack against the competition infrastructure, server hosting the CTF, or organizers' network will result in immediate disqualification.",
      "Sharing flags or solutions between distinct teams is strictly forbidden.",
      "Teams are encouraged to bring their own laptops with Kali Linux / Parrot OS or required penetration testing tools installed.",
      "The decision of the CTF game masters is final.",
      "[Editable Placeholder: VPN/LAN configuration instructions and flag format e.g. TECHNOVISTA{...} to be inserted here]."
    ],

    judgingCriteria: [
      { parameter: "Total Accumulated Points", weight: "70%" },
      { parameter: "Time Taken to Capture Hard-Tier Flags", weight: "20%" },
      { parameter: "Write-up / Solution Clarity (Tiebreaker)", weight: "10%" }
    ],

    coordinators: {
      faculty: [
        { name: "Faculty Coordinator (To be updated)", designation: "Dept. of ISE", contact: "[Phone/Email Placeholder]" }
      ],
      student: [
        { name: "Student Lead 1 (To be updated)", role: "CTF Lead", contact: "[Phone Placeholder]" },
        { name: "Student Lead 2 (To be updated)", role: "Infra Lead", contact: "[Phone Placeholder]" }
      ]
    }
  },

  {
    id: "build-a-bot",
    name: "Build a Bot",
    subtitle: "Robotics, Autonomous Hardware & AI Arena",
    category: "Robotics & Hardware",
    badge: "Hardware & AI",
    icon: "Bot",
    gradient: "from-amber-500 via-orange-600 to-yellow-500",
    accentColor: "#f59e0b",
    image: "/assets/events/build-a-bot.svg",
    shortDescription:
      "Showcase your hardware ingenuity. Unleash line-followers, obstacle-avoiding bots, or AI-integrated robotic prototypes in our challenging arena track.",
    tagline: "From Silicon and Motors to Autonomous Glory",

    timing: "11:30 AM - 02:30 PM (Editable)",
    venue: "Main Indoor Sports Complex / Open Arena (Editable)",
    teamSize: "2 to 4 Members per Team (Editable Placeholder)",
    eligibility: "Open to all engineering students passionate about robotics and embedded systems.",
    registrationFee: "Refer to official registration details in Google Form (Editable)",

    overview:
      "Build a Bot provides an electrifying stage for young robotics engineers and makers. Whether your bot uses computer vision, ultrasonic sensors, or PID line-tracking algorithms, test its agility, speed, and precision across obstacle courses, checkpoints, and task-based arena challenges.",

    arenaHighlights: [
      "Precision Line Follower Track with acute twists and crossovers",
      "Dynamic Obstacle Avoidance & Grid Navigation Zone",
      "Task-based pick and place / payload delivery segment",
      "AI / Computer-Vision bot demonstration track"
    ],

    rounds: [
      {
        roundNumber: "Round 1",
        title: "Technical Inspection & Arena Time Trial",
        description:
          "Bots are measured for weight and dimension compliance, followed by a timed run on the preliminary track."
      },
      {
        roundNumber: "Round 2",
        title: "The Championship Gauntlet",
        description:
          "Top qualifying bots enter the complex arena featuring unknown dynamic obstacles and bonus checkpoint tasks."
      }
    ],

    rules: [
      "Maximum bot dimensions and weight limits: [Editable Placeholder: e.g., 30cm x 30cm x 30cm, max 3.5 kg].",
      "Voltage across any two points must not exceed [Editable Placeholder: e.g., 24V DC].",
      "No ready-made LEGO kits or pre-assembled toy cars are allowed; chassis and circuit must show student craftsmanship.",
      "Human intervention during the arena run will incur time penalties.",
      "[Editable Placeholder: Final arena dimensions, track surface material, and penalty details to be finalized here]."
    ],

    judgingCriteria: [
      { parameter: "Track Completion Time", weight: "40%" },
      { parameter: "Checkpoints Successfully Cleared", weight: "30%" },
      { parameter: "Hardware Design & Engineering Innovation", weight: "20%" },
      { parameter: "Minimum Penalties Incurred", weight: "10%" }
    ],

    coordinators: {
      faculty: [
        { name: "Faculty Coordinator (To be updated)", designation: "Dept. of ISE", contact: "[Phone/Email Placeholder]" }
      ],
      student: [
        { name: "Student Lead 1 (To be updated)", role: "Robotics Lead", contact: "[Phone Placeholder]" },
        { name: "Student Lead 2 (To be updated)", role: "Arena Manager", contact: "[Phone Placeholder]" }
      ]
    }
  },

  {
    id: "frame-fusion",
    name: "Frame Fusion",
    subtitle: "UI/UX, Digital Design & Creative Media Challenge",
    category: "Design & Multimedia",
    badge: "Creative Tech",
    icon: "Palette",
    gradient: "from-pink-500 via-purple-600 to-indigo-600",
    accentColor: "#ec4899",
    image: "/assets/events/frame-fusion.svg",
    shortDescription:
      "Blend aesthetics with functionality. Design intuitive UI/UX prototypes, brand identities, or captivating digital motion graphics under given design prompts.",
    tagline: "Where Creative Imagination Meets Intuitive Design",

    timing: "11:00 AM - 02:00 PM (Editable)",
    venue: "Design & Multimedia Computing Lab (Editable)",
    teamSize: "1 or 2 Members per Team (Editable Placeholder)",
    eligibility: "Open to all students interested in UI/UX, product design, and creative media.",
    registrationFee: "Refer to official registration details in Google Form (Editable)",

    overview:
      "In a world powered by digital interfaces, great design sets world-class products apart. Frame Fusion invites UI/UX designers, visual storytellers, and graphic innovators to tackle a live problem statement, producing user journey flows, wireframes, high-fidelity prototypes, and design presentations.",

    toolsSupported: ["Figma", "Adobe XD", "Illustrator / Photoshop", "Blender / After Effects"],

    rounds: [
      {
        roundNumber: "Phase 1",
        title: "Prompt Reveal & Rapid Prototyping (2 Hours)",
        description:
          "Theme statement revealed on the spot (e.g. Next-Gen Green Energy App, AI Health Companion). Teams craft wireframes and interactive prototypes in Figma."
      },
      {
        roundNumber: "Phase 2",
        title: "Design Pitch & Interactive Walkthrough",
        description:
          "3-minute pitch where designers walk the jury through their user personas, design system, accessibility choices, and prototype flows."
      }
    ],

    rules: [
      "All design assets and components must be created during the event timeframe.",
      "Use of standard UI kits (Material Design, iOS Human Interface) is allowed, but primary components must be customized.",
      "Submissions must include a viewable Figma link or exported high-res prototype.",
      "[Editable Placeholder: Allowed assets, royalty-free stock imagery rules, and presentation criteria to be detailed here]."
    ],

    judgingCriteria: [
      { parameter: "User Experience (UX) & Usability Flow", weight: "35%" },
      { parameter: "Visual Hierarchy & Aesthetic Polish (UI)", weight: "35%" },
      { parameter: "Originality of Concept & Problem Solving", weight: "20%" },
      { parameter: "Design Pitch & Presentation", weight: "10%" }
    ],

    coordinators: {
      faculty: [
        { name: "Faculty Coordinator (To be updated)", designation: "Dept. of ISE", contact: "[Phone/Email Placeholder]" }
      ],
      student: [
        { name: "Student Lead 1 (To be updated)", role: "Design Lead", contact: "[Phone Placeholder]" },
        { name: "Student Lead 2 (To be updated)", role: "Coordinator", contact: "[Phone Placeholder]" }
      ]
    }
  },

  {
    id: "clash-of-squadz",
    name: "Clash of Squadz",
    subtitle: "Tactical LAN Esports & Squad Championship",
    category: "Gaming & Esports",
    badge: "Esports Arena",
    icon: "Gamepad2",
    gradient: "from-violet-600 via-fuchsia-600 to-rose-600",
    accentColor: "#a855f7",
    image: "/assets/events/clash-of-squadz.svg",
    shortDescription:
      "Assemble your squad, coordinate tactical maneuvers, and battle across custom lobby match-ups in a battle royale and tactical showdown.",
    tagline: "Form Up. Call the Shots. Claim Victory.",

    timing: "11:30 AM onwards (Knockouts & Grand Finals) (Editable)",
    venue: "Seminar Hall Arena / Esports Gaming Zone (Editable)",
    teamSize: "Squad of 4 Players (Editable Placeholder)",
    eligibility: "Open to all enrolled college students with verified ID.",
    registrationFee: "Refer to official registration details in Google Form (Editable)",

    overview:
      "Clash of Squadz brings intense competitive esports action to TECHNO VISTA 2K26. Teams enter custom room matches, executing team synergy, precision aim, and quick strategic decision-making to emerge as the supreme squad of the tournament.",

    tournamentFormat: [
      "Custom Room lobbies hosted by official tournament administrators",
      "Qualifying bracket stages followed by intense Grand Finale matches",
      "Official spectator screens with live casting for spectators"
    ],

    rounds: [
      {
        roundNumber: "Stage 1",
        title: "Qualifier Knockout Matches",
        description:
          "Squads compete in multi-lobby bracket matches. Points awarded for placement rankings and confirmed eliminations."
      },
      {
        roundNumber: "Stage 2",
        title: "Grand Championship Finals",
        description:
          "Top qualifying squads battle across consecutive maps to decide the final podium winners."
      }
    ],

    rules: [
      "Players must use their own personal smartphones or approved laptops (depending on game title).",
      "Emulators, third-party triggers, hacks, or modified game clients are strictly prohibited and will lead to an immediate ban.",
      "Stable Wi-Fi / Hotspot setup is recommended (organizer backup network subject to availability).",
      "All squad members must be physically present at the venue during match callouts.",
      "[Editable Placeholder: Specific game titles (e.g. BGMI, Valorant, Free Fire), map pool, point distribution table to be finalized here]."
    ],

    judgingCriteria: [
      { parameter: "Match Placement Points", weight: "50%" },
      { parameter: "Total Elimination / Kill Points", weight: "50%" }
    ],

    coordinators: {
      faculty: [
        { name: "Faculty Coordinator (To be updated)", designation: "Dept. of ISE", contact: "[Phone/Email Placeholder]" }
      ],
      student: [
        { name: "Student Lead 1 (To be updated)", role: "Esports Lead", contact: "[Phone Placeholder]" },
        { name: "Student Lead 2 (To be updated)", role: "Referee Lead", contact: "[Phone Placeholder]" }
      ]
    }
  }
];

export const getEventById = (id) => {
  return EVENTS_DATA.find((e) => e.id === id);
};

