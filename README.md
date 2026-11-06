# TECHNO VISTA 2K26 – Official Technical Fest Website

> **Vision Beyond Innovation**  
> National-Level Technical Fest organized by the **Department of Information Science and Engineering**,  
> **Sri Sairam College of Engineering**, Anekal, Bengaluru, Karnataka.  
> **Date:** 26 November 2026 | **Time:** 9:30 AM onwards | **Venue:** Seminar Hall

---

## 🚀 Quick Start (Running Locally)

To run the website on your local computer using VS Code:

1. **Open the project folder in VS Code:**
   ```bash
   cd c:\Users\Poshi\Downloads\fest
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **View in browser:**
   Open [http://localhost:3000](http://localhost:3000) (or the URL printed in your terminal).

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚡ Where to Paste Your Google Form URL

The website uses a **single centralized configuration variable** for all registration buttons:

1. Open `src/data/festData.js` in VS Code.
2. Locate line 9:
   ```javascript
   export const GOOGLE_FORM_URL = "PASTE_GOOGLE_FORM_LINK_HERE";
   ```
3. Replace `"PASTE_GOOGLE_FORM_LINK_HERE"` with your actual Google Form URL:
   ```javascript
   export const GOOGLE_FORM_URL = "https://forms.gle/yourActualFormLinkHere";
   ```
4. Save the file (`Ctrl + S`).
5. **Every 'Register Now' button** on the Navbar, Hero section, Event Cards, Individual Event Detail pages, Schedule page, and Registration page will **instantly and automatically** redirect participants to your form in a new tab!

---

## 📁 Centralized Content Management Guide

You do **not** need to search through React component or page files to update fest details. All content is organized cleanly in `src/data/`:

| File | What you can edit in this file |
| :--- | :--- |
| **`src/data/festData.js`** | • `GOOGLE_FORM_URL`<br>• Fest Name, Tagline, Date & Reporting Time<br>• Countdown Timer target date (`targetDate`)<br>• College & Department descriptions<br>• Important fest notes & highlights |
| **`src/data/eventsData.js`** | • All 6 Official Events details:<br>&nbsp;&nbsp;1. Intelli Talks (Paper Presentation)<br>&nbsp;&nbsp;2. Code Sprint (Coding Contest)<br>&nbsp;&nbsp;3. Capture the Flag (CTF)<br>&nbsp;&nbsp;4. Build a Bot (Robotics)<br>&nbsp;&nbsp;5. Frame Fusion (UI/UX & Design)<br>&nbsp;&nbsp;6. Clash of Squadz (Esports)<br>• Rules & regulations, team sizes, eligibility, and judging weights<br>• Event coordinators (faculty & student) |
| **`src/data/scheduleData.js`** | • Fest day timeline slots (Inauguration, sessions, lunch, finals, valedictory)<br>• Slot timings and room/lab venues<br>• Concurrent morning & afternoon sub-event tracks |
| **`src/data/announcementsData.js`** | • Add, edit, or remove live announcements<br>• Pin important notices to the top<br>• Set badges (Registration, Guideline, Important, Deadline) |
| **`src/data/contactData.js`** | • Faculty and Student coordinators names, phone numbers, and emails<br>• Department email and helpline phone numbers<br>• College address & Google Maps link<br>• Social media handles (Instagram, LinkedIn, Website) |
| **`src/data/galleryData.js`** | • Image paths, titles, categories, and captions for the photo gallery<br>• Place your actual photos in `public/assets/gallery/` and reference their file names here |

---

## 📂 Project Architecture

```
fest/
├── public/
│   ├── favicon.svg                   # Custom cybernetic fest logo
│   └── assets/
│       ├── events/                   # High-res vector banners for 6 events
│       │   ├── intelli-talks.svg
│       │   ├── code-sprint.svg
│       │   ├── capture-the-flag.svg
│       │   ├── build-a-bot.svg
│       │   ├── frame-fusion.svg
│       │   └── clash-of-squadz.svg
│       └── gallery/                  # Gallery images & visual archives
│           ├── coding-hackathon.svg
│           ├── robotics-arena.svg
│           ├── inauguration-hall.svg
│           ├── paper-presentation.svg
│           ├── ctf-warroom.svg
│           ├── valedictory-awards.svg
│           ├── uiux-design.svg
│           ├── esports-arena.svg
│           └── organizing-team.svg
├── src/
│   ├── assets/                       # Static components & styles
│   ├── components/                   # Reusable UI components
│   │   ├── Navbar.jsx                # Responsive navbar + mobile drawer + Register CTA
│   │   ├── Footer.jsx                # Reusable comprehensive fest footer
│   │   ├── Countdown.jsx             # Live countdown to 26 Nov 2026 (IST)
│   │   ├── EventCard.jsx             # Reusable card with view details & register buttons
│   │   ├── SectionTitle.jsx          # Reusable section header with cyber badges
│   │   ├── ScrollToTop.jsx           # Floating scroll-to-top & route change reset
│   │   └── TechBackground.jsx        # Subtle animated constellation canvas
│   ├── data/                         # Centralized content files (Edit here!)
│   │   ├── festData.js               # Core fest settings & GOOGLE_FORM_URL
│   │   ├── eventsData.js             # Detailed rules & info for all 6 events
│   │   ├── scheduleData.js           # Fest day timeline
│   │   ├── announcementsData.js      # Notice board items
│   │   ├── contactData.js            # Coordinators, contact info & map
│   │   └── galleryData.js            # Gallery photo items & categories
│   ├── pages/                        # React Router page views
│   │   ├── Home.jsx                  # Hero, countdown, highlights, featured cards
│   │   ├── About.jsx                 # Fest, Department, College, Vision & Mission
│   │   ├── Events.jsx                # Searchable, filterable 6 events grid
│   │   ├── EventDetails.jsx          # Deep dive for each individual event
│   │   ├── Registration.jsx          # Google Form guide, steps & FAQs
│   │   ├── Schedule.jsx              # Timeline with session breakdowns
│   │   ├── Gallery.jsx               # Filterable gallery with full Lightbox modal
│   │   ├── Announcements.jsx         # Live announcement updates & pinned notes
│   │   ├── Contact.jsx               # Coordinators, college map & transit guide
│   │   └── NotFound.jsx              # Futuristic 404 signal lost page
│   ├── App.jsx                       # Main application shell & router
│   ├── main.jsx                      # React 18 DOM root entry point
│   └── index.css                     # Design system (Electric Blue & Dark Tech)
├── index.html                        # Meta tags, fonts (Space Grotesk & Inter)
├── package.json                      # Dependencies and build scripts
├── vercel.json                       # Client-side SPA routing rewrites for Vercel
├── vite.config.js                    # Vite build configuration
└── README.md                         # Project documentation
```

---

## 🌐 GitHub & Automatic Vercel Deployment

The project is pre-configured with `vercel.json` so that client-side routes (`/events`, `/about`, `/schedule`, etc.) reload flawlessly without 404 errors.

### Step 1: Initialize Git and Commit Your Code
Run these commands in your VS Code terminal:
```bash
git init
git add .
git commit -m "Initial commit: Complete TECHNO VISTA 2K26 website"
```

### Step 2: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `techno-vista-2k26`.
2. Link and push your local code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/techno-vista-2k26.git
   git push -u origin main
   ```

### Step 3: Connect to Vercel for Instant Live Deployment
1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your `techno-vista-2k26` repository and click **"Import"**.
4. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Deploy"**.
6. Within ~30 seconds, your website is live with a global SSL certificate (e.g., `https://techno-vista-2k26.vercel.app`)!

### Step 4: Automatic Continuous Deployment (CI/CD)
Whenever you update event details, timings, or paste a new Google Form URL in VS Code:
```bash
git add .
git commit -m "Update fest registration link and schedule"
git push
```
Vercel will **automatically build and deploy** the changes to your live site within seconds!

---

## 📱 Mobile-First & QR Code Scanning Ready
- Engineered specifically for delegates scanning event posters on Android & iOS devices.
- Zero horizontal scrolling with clean touch-friendly navigation drawer.
- High-contrast, dark mode futuristic theme designed for outdoor and indoor visibility.
