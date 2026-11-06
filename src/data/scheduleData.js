/**
 * TECHNO VISTA 2K26 - Centralized Schedule Configuration
 * Contains fest day timeline, sessions, breaks, and venues.
 * Edit this file directly in VS Code to adjust timings or event slots.
 */

export const SCHEDULE_DATA = {
  festDate: "26 November 2026",
  dayTitle: "Official Fest Day Timeline",
  note: "All timings are in Indian Standard Time (IST). The schedule is tentative and subject to minor adjustments on the event day. Check announcements for live updates.",
  
  timeline: [
    {
      id: "slot-1",
      time: "08:45 AM - 09:30 AM",
      title: "Participant Reporting & Desk Verification",
      category: "Registration",
      badge: "Reporting",
      venue: "Fest Registration Desk (Seminar Hall Entrance)",
      description:
        "Registered participants verify their credentials, show college ID cards, collect participant identity badges, fest kits, and event slot details.",
      isHighlight: false,
    },
    {
      id: "slot-2",
      time: "09:30 AM - 10:15 AM",
      title: "Grand Inauguration Ceremony",
      category: "Ceremony",
      badge: "Main Event",
      venue: "Main Seminar Hall",
      description:
        "Invocational prayer, traditional lamp lighting ceremony, welcoming address by HOD - ISE, presidential address by Principal & Management Dignitaries, and official fest teaser reveal.",
      isHighlight: true,
    },
    {
      id: "slot-3",
      time: "10:15 AM - 10:45 AM",
      title: "Keynote Address: Emerging Frontiers in AI & Computing",
      category: "Keynote",
      badge: "Special Session",
      venue: "Main Seminar Hall",
      description:
        "Inspiring technical discourse by our distinguished chief guest / industry veteran on real-world engineering challenges, AI breakthroughs, and career trajectories.",
      isHighlight: false,
    },
    {
      id: "slot-4",
      time: "11:00 AM - 01:00 PM",
      title: "Competitive Events - Phase 1 (Morning Track)",
      category: "Competitions",
      badge: "Contests",
      venue: "Multiple Designated Venues Across Campus",
      description:
        "Concurrent kick-off of morning events across campus labs and seminar zones:",
      subEvents: [
        {
          name: "Intelli Talks (Round 1 & Presentations)",
          venue: "Seminar Hall Stage A",
          time: "11:00 AM - 01:30 PM",
        },
        {
          name: "Code Sprint (Prelims & Bug-Hunt)",
          venue: "ISE Computing Lab 1",
          time: "11:00 AM - 12:45 PM",
        },
        {
          name: "Capture the Flag (Cybersecurity Quest)",
          venue: "Cyber Systems Lab",
          time: "11:15 AM - 03:00 PM (Continuous)",
        },
        {
          name: "Build a Bot (Arena Inspection & Heats)",
          venue: "Indoor Arena Complex",
          time: "11:30 AM - 01:00 PM",
        },
        {
          name: "Frame Fusion (Design Prompt Reveal)",
          venue: "Design Lab 2",
          time: "11:00 AM - 01:30 PM",
        },
        {
          name: "Clash of Squadz (Group Knockouts)",
          venue: "Student Activity Center",
          time: "11:30 AM onwards",
        },
      ],
      isHighlight: true,
    },
    {
      id: "slot-5",
      time: "01:00 PM - 02:00 PM",
      title: "Lunch Break & Networking Hub",
      category: "Break",
      badge: "Refreshment",
      venue: "College Food Court & Quadrangle",
      description:
        "Sumptuous lunch served to all registered delegates, jury members, and organizers. Opportunities for cross-college networking and team strategy discussions.",
      isHighlight: false,
    },
    {
      id: "slot-6",
      time: "02:00 PM - 04:00 PM",
      title: "Competitive Events - Phase 2 & Championship Finals",
      category: "Finals",
      badge: "High Stakes",
      venue: "Finals Arenas & Labs",
      description:
        "The heat turns up as qualifiers battle in final rounds:",
      subEvents: [
        {
          name: "Code Sprint: The Grand Algorithmic Final",
          venue: "Computing Lab 1",
          time: "02:00 PM - 03:30 PM",
        },
        {
          name: "Build a Bot: The Championship Gauntlet",
          venue: "Indoor Arena Complex",
          time: "02:00 PM - 03:30 PM",
        },
        {
          name: "Frame Fusion: Prototype Walkthrough & Pitch",
          venue: "Design Lab 2",
          time: "02:00 PM - 03:15 PM",
        },
        {
          name: "Clash of Squadz: Grand Championship Finale",
          venue: "Main Stage Screen",
          time: "02:15 PM - 03:45 PM",
        },
      ],
      isHighlight: true,
    },
    {
      id: "slot-7",
      time: "04:15 PM - 05:15 PM",
      title: "Grand Valedictory Ceremony & Prize Distribution",
      category: "Valedictory",
      badge: "Awards",
      venue: "Main Seminar Hall",
      description:
        "Announcement of winners across all 6 events, awarding of cash prizes, prestigious trophies, and certificates of excellence. Address by chief guest and concluding vote of thanks.",
      isHighlight: true,
    },
    {
      id: "slot-8",
      time: "05:15 PM onwards",
      title: "Certificate Collection & Celebration Photo Session",
      category: "Conclusion",
      badge: "Wrap Up",
      venue: "Registration Zone & Photo Booth",
      description:
        "Distribution of official Participation Certificates to all attendees and group photo sessions with event winners, faculty, and student organizers.",
      isHighlight: false,
    },
  ],
};
