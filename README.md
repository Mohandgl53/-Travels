# மாரியம்மன் Travels (Mariamman Travels)
### Premium Intercity Coach Booking & Cinematic Boarding Experience

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-teal.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

---

## 🌟 Executive Overview

**மாரியம்மன் Travels** is a full-featured, production-ready intercity luxury travel booking platform engineered with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. 

The application is built upon a **Strict Dual-Experience Architecture**:
1. **Part A — Cinematic Animated Authentication Experience** (`/login`, `/register`): An immersive 4-phase cinematic video sequence that pauses seamlessly at the interior passenger window view, unveiling a frosted glass authentication portal.
2. **Part B — Independent Luxury Travel Website** (`/home`, `/search`, `/bookings`, etc.): A completely independent executive obsidian travel portal with interactive sleeper berth selection, live schedule filtering, instant checkout, downloadable/printable e-Ticket passes with QR codes, and 24/7 passenger assistance.

---

## 🏛️ Architectural Design & Route Isolation

```
                                  +------------------------------------+
                                  |     /login or /register Route      |
                                  |   Cinematic Animated Experience    |
                                  | (Four video scenes in sequence)    |
                                  +------------------------------------+
                                                    |
                                      [ Successful Authentication ]
                                                    |
                                                    v  (Complete Unmount of Auth Experience)
  +-------------------------------------------------------------------------------------------------------+
  |                                   Independent Travel Booking Portal                                  |
  |                                        மாரியம்மன் Travels                                             |
  |                                                                                                       |
  |   +-------------------+  +-------------------+  +-------------------+  +--------------------------+   |
  |   |    /home          |  |    /search        |  |    /bookings      |  |   /destinations          |   |
  |   | Executive Gateway |  | Coach Schedules   |  | E-Tickets & PNR   |  | Sacred Shrines & Cities  |   |
  |   +-------------------+  +-------------------+  +-------------------+  +--------------------------+   |
  |   +-------------------+  +-------------------+  +-------------------+                                 |
  |   |    /about         |  |    /contact       |  |    /account       |                                 |
  |   | Fleet Heritage    |  | Terminal Counters |  | Club Loyalty Pts  |                                 |
  |   +-------------------+  +-------------------+  +-------------------+                                 |
  +-------------------------------------------------------------------------------------------------------+
```

---

## ✨ Feature Highlights

### Part A: Cinematic Animated Authentication
- **Integrated 4-Scene Cinematic Sequence**:
  - `Scene 1`: Luxury coach arrival and highway stop (`0.0s – 5.5s`).
  - `Scene 2`: Smooth camera zoom into the passenger cabin window (`5.5s – 10.8s`).
  - `Scene 3`: Window pause and entrance of glassmorphic login & registration forms (`10.8s`).
  - `Scene 4`: Interior-to-exterior pull-back and bus departure down the highway bearing the banner *"THE WORLD IS A BOOK - EXPLORE EVERY PAGE."* (`10.8s – 23.0s`).
- **User Experience Controls**: Skip intro shortcut, replay arrival, and mute/unmute audio toggling.
- **Form Controls & Validation**: Email/Phone login, quick demo account autofill buttons, and password validation.

### Part B: Luxury Travel Booking Portal
- **Executive Obsidian Design System**: Deep obsidian `#090a0f` canvas, frosted glass surfaces (`#111625`), sapphire blue (`#3b82f6`) and emerald mint highlights. Zero red/orange palette clashes.
- **Direct 6-Gateway Navigation Hub**: Immediate access to `Home`, `Bus Search`, `My Bookings`, `Destinations`, `About Us`, and `Contact`.
- **Real-Time Bus Search & Filter**:
  - Search routes between Chennai, Madurai, Coimbatore, Tirunelveli, Trichy, Salem, and Bangalore.
  - Interactive city-swap mechanism and dynamic departure date calendar.
  - Multi-criteria filtering by coach type (Volvo Multi-Axle, BharatBenz AC Sleeper) and Live GPS status.
  - Multi-tier sorting by departure time, fare (asc/desc), and passenger rating.
- **Interactive Sleeper Berth Layout Modal**:
  - Dual-deck visualization (**Lower Deck** & **Upper Deck**).
  - Single window berths and double shared berths with ergonomic contours.
  - Color-coded berth states: *Available*, *Selected*, *Ladies-Only*, and *Booked*.
  - Live fare breakdown (Base Berth Fare + 5% GST & Passenger Insurance + Free Highway Toll).
  - Boarding & dropping point selector with scheduled terminal timestamps.
- **Two-Step Checkout & Payment Simulation**:
  - Multi-passenger information capture (Name, Age, Gender, Seat assignment).
  - Contact information for SMS & WhatsApp live GPS notifications.
  - Payment modes: UPI (Google Pay / PhonePe), Credit/Debit Card, and Mariamman Club Wallet.
  - Confetti celebration upon confirmation with automated PNR generation.
- **Printable E-Ticket Pass**:
  - Official passenger boarding pass with scannable QR Code and PNR number.
  - Print / Save as PDF functionality (`window.print()`).
  - Boarding guidelines and live helpline contact.
- **Booking Management & Cancellations**:
  - Instant PNR search and filter.
  - View e-tickets anytime from local storage.
  - 1-click booking cancellation with policy confirmation.
- **Destination Guides & Fleet Safety**:
  - Comprehensive landmark guides for Madurai, Coimbatore, Tirunelveli, Rameswaram, Ooty, and Trichy.
  - Fleet safety standards: Dual-driver 4-hour rotation, emergency berth SOS buttons, steam-sanitized linen.

---

## 📁 Repository Structure

```
மாரியம்மன் Travels/
│
├── public/
│   ├── favicon.svg                     # Brand vector favicon
│   └── videos/
│       └── Travel_bus_Animation_compressed.mp4  # Single merged 4K cinematic animation asset
│
├── src/
│   ├── auth/                           # Authentication layer
│   │   ├── AuthContext.tsx             # Context provider with localStorage sync
│   │   ├── ProtectedRoute.tsx          # Route guard directing unauthenticated users to /login
│   │   └── types.ts                    # User and Auth interface types
│   │
│   ├── experiences/
│   │   └── animated-auth/              # PART A: Cinematic Auth Experience
│   │       ├── AnimatedAuth.tsx        # Orchestrator & timecode state machine
│   │       ├── VideoSequence.tsx       # Video player with controls & phase triggers
│   │       ├── LoginForm.tsx           # Glassmorphic sign-in panel
│   │       ├── RegisterForm.tsx        # Glassmorphic registration panel
│   │       └── animations.ts           # GSAP timeline animations
│   │
│   ├── website/                        # PART B: Independent Booking Website
│   │   ├── components/                 # Reusable UI widgets
│   │   │   ├── SearchBar.tsx           # City selector & search widget
│   │   │   ├── BusCard.tsx             # Bus card with timings & boarding points
│   │   │   ├── SeatLayoutModal.tsx     # Lower/Upper sleeper deck layout
│   │   │   ├── BookingModal.tsx        # Passenger details & checkout modal
│   │   │   └── TicketPass.tsx          # Printable e-Ticket boarding pass
│   │   │
│   │   ├── data/
│   │   │   └── travelData.ts           # Intercity routes, schedules & mock data
│   │   │
│   │   ├── layout/                     # Layout shells
│   │   │   ├── Navbar.tsx              # Dark glass header with live telemetry
│   │   │   ├── Footer.tsx              # Terminal counters & 24x7 help desk
│   │   │   └── WebsiteLayout.tsx       # Outlet wrapper for protected pages
│   │   │
│   │   └── pages/                      # Application route views
│   │       ├── Home.tsx                # Gateway hub & popular routes
│   │       ├── SearchBuses.tsx         # Results, filters, sorting & modals
│   │       ├── MyBookings.tsx          # Ticket history & cancellations
│   │       ├── Destinations.tsx        # South Indian city guides
│   │       ├── About.tsx               # 20-year fleet heritage
│   │       ├── Contact.tsx             # Counter locations & emergency hotline
│   │       └── Account.tsx             # Profile & Mariamman Club points
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx               # React Router v7 configuration
│   │
│   ├── App.tsx                         # Top-level provider wrapper
│   ├── main.tsx                        # Application mount point
│   └── index.css                       # Global Tailwind CSS & glassmorphic tokens
│
├── .gitignore                          # Clean production ignore rules
├── index.html                          # HTML5 template with Noto Sans Tamil & Inter
├── package.json                        # Dependencies and scripts
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.js                  # Custom luxury color palette & typography
├── tsconfig.json                       # TypeScript compiler options
├── vercel.json                         # SPA routing rewrite configuration
└── vite.config.ts                      # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mohandgl53/-Travels.git
   cd -Travels
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment

The repository includes a ready-to-use `vercel.json` configuration for seamless Single Page Application (SPA) client-side routing.

### Vercel
1. Push your repository to GitHub.
2. Import the repository into your Vercel Dashboard.
3. Framework Preset: **Vite**.
4. Click **Deploy**.

### Netlify
1. Connect the GitHub repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add a `_redirects` file in `public/` containing `/* /index.html 200` for client-side routing.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE). All media assets and branding elements are reserved by **மாரியம்மன் Travels Private Limited**.
