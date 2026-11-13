import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import {
  Compass,
  ArrowRight,
  Sun,
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  Coffee,
  Wifi,
  Wind,
  Plus,
  Bus,
  Ticket,
  Award,
  PhoneCall,
  Clock,
  Radio,
} from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { BrandEmblem } from '../components/BrandLogo';

interface FeaturedSlide {
  id: string;
  name: string;
  tamilName: string;
  region: string;
  tag: string;
  description: string;
  temp: string;
  weatherCondition: string;
  locationLabel: string;
  upcomingRoute: string;
  upcomingDate: string;
  upcomingPassengers: string;
  startingFare: number;
  imageUrl: string;
  accentColor: string;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [headerSearch, setHeaderSearch] = useState('');

  const featuredDestinations: FeaturedSlide[] = [
    {
      id: 'madurai',
      name: 'Madurai',
      tamilName: 'மதுரை',
      region: 'Tamil Nadu, South India',
      tag: 'FEATURED DESTINATION • TEMPLE HERITAGE',
      description: 'Towering Dravidian gopurams, sacred night temple corridors, authentic midnight jigarthanda & serene overnight sleeper travel.',
      temp: '28°',
      weatherCondition: 'Sunny',
      locationLabel: 'Madurai, Tamil Nadu',
      upcomingRoute: 'Chennai → Madurai Express',
      upcomingDate: '18 Nov 2026 • 20:45',
      upcomingPassengers: '2 People • Sleeper L4, L5',
      startingFare: 1350,
      imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
      accentColor: 'from-blue-900/90 via-slate-950/60 to-transparent',
    },
    {
      id: 'ooty',
      name: 'Ooty',
      tamilName: 'ஊட்டி',
      region: 'Nilgiris, Western Ghats',
      tag: 'FEATURED DESTINATION • MISTY NILGIRIS',
      description: 'Rolling emerald tea gardens, crisp eucalyptus mountain breeze, misty pine forests & tranquil 7,500 ft elevation.',
      temp: '17°',
      weatherCondition: 'Misty',
      locationLabel: 'Ooty, Nilgiris',
      upcomingRoute: 'Chennai → Ooty Horizon',
      upcomingDate: '21 Nov 2026 • 21:30',
      upcomingPassengers: '2 People • Sleeper U2, U3',
      startingFare: 1450,
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      accentColor: 'from-emerald-950/90 via-slate-950/60 to-transparent',
    },
    {
      id: 'rameswaram',
      name: 'Rameswaram',
      tamilName: 'ராமேஸ்வரம்',
      region: 'Sacred Island Corridor',
      tag: 'FEATURED DESTINATION • OCEAN CORRIDOR',
      description: 'The legendary Pamban Sea Bridge, azure coastal horizons, ancient sacred wells & direct high-speed luxury highway cruising.',
      temp: '29°',
      weatherCondition: 'Ocean Breeze',
      locationLabel: 'Rameswaram, Tamil Nadu',
      upcomingRoute: 'Chennai → Rameswaram Sea Express',
      upcomingDate: '24 Nov 2026 • 19:45',
      upcomingPassengers: '2 People • Sleeper L1, L2',
      startingFare: 1550,
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      accentColor: 'from-cyan-950/90 via-slate-950/60 to-transparent',
    },
    {
      id: 'kodaikanal',
      name: 'Kodaikanal',
      tamilName: 'கொடைக்கானல்',
      region: 'Princess of Hill Stations',
      tag: 'FEATURED DESTINATION • MISTY PEAKS',
      description: 'Star-shaped lake reflections, pine forest canopy walks, silver cascades & restorative cool mountain air.',
      temp: '18°',
      weatherCondition: 'Pleasant Breeze',
      locationLabel: 'Kodaikanal, Dindigul',
      upcomingRoute: 'Chennai → Kodaikanal Night Rider',
      upcomingDate: '27 Nov 2026 • 21:15',
      upcomingPassengers: '2 People • Sleeper L7, L8',
      startingFare: 1400,
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
      accentColor: 'from-sky-950/90 via-slate-950/60 to-transparent',
    },
    {
      id: 'coimbatore',
      name: 'Coimbatore',
      tamilName: 'கோயம்புத்தூர்',
      region: 'Gateway to Western Ghats',
      tag: 'FEATURED DESTINATION • ADIYOGI SHIVA',
      description: 'Foothills of the sacred Western Ghats, the iconic Adiyogi Shiva monument, swift non-stop multi-axle sleeper transits.',
      temp: '24°',
      weatherCondition: 'Sunny',
      locationLabel: 'Coimbatore, Tamil Nadu',
      upcomingRoute: 'Chennai → Coimbatore Glider',
      upcomingDate: '30 Nov 2026 • 22:00',
      upcomingPassengers: '1 Person • Sleeper L12',
      startingFare: 1250,
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
      accentColor: 'from-indigo-950/90 via-slate-950/60 to-transparent',
    },
  ];

  // Auto-play destination carousel every 6 seconds (pause on hover)
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredDestinations.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, featuredDestinations.length]);

  const active = featuredDestinations[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredDestinations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredDestinations.length) % featuredDestinations.length);
  };

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      navigate(`/search?to=${encodeURIComponent(headerSearch.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="space-y-12 pb-24 text-slate-100 overflow-x-hidden">
      {/* =========================================================================
          HERO SHOWCASE CANVAS: EXACT REFERENCE IMAGE COMPOSITION & MOTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div
          className="porcelain-canvas rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative border border-slate-300/40 animate-hero-entrance"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* 1. Header Bar: "Hello, Explorer 👋" + Search + Profile (Exact Reference) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200/60 animate-hero-slide-down">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Hello, {user ? user.name.split(' ')[0] : 'Explorer'}</span>
                <span className="inline-block animate-bounce origin-bottom-right">👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Discover South India's scenic places, create unforgettable journeys.
              </p>
            </div>

            {/* Top Right: Pill Search Bar + User Avatar (Exact Reference) */}
            <div className="flex items-center space-x-3 self-end md:self-auto">
              <form onSubmit={handleHeaderSearch} className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  placeholder="Search destinations..."
                  className="clay-pill-input pl-10 pr-4 py-2.5 rounded-full text-xs font-semibold text-slate-800 placeholder-slate-400 w-52 sm:w-64 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                />
              </form>

              <Link
                to="/account"
                title="View Passenger Profile"
                className="hover:scale-105 transition-all"
              >
                <BrandEmblem size="sm" />
              </Link>
            </div>
          </div>

          {/* 2. Main Canvas Grid: Asymmetric Layout matching the Reference Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8 relative">
            
            {/* -------------------------------------------------------------
                LEFT / CENTER: Large Fluid Organic Showcase Card (Reference Blob)
                ------------------------------------------------------------- */}
            <div className="lg:col-span-8 relative">
              <div className="organic-blob-hero relative h-[420px] sm:h-[480px] overflow-hidden group">
                {/* Background Photo with smooth crossfade & gentle Ken-Burns zoom */}
                <img
                  key={active.id}
                  src={active.imageUrl}
                  alt={active.name}
                  className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Rich Atmospheric Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${active.accentColor} transition-opacity duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/30 to-transparent" />

                {/* Inner Content Layer */}
                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10 text-white">
                  
                  {/* Top Bar inside Card: Category Pill */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-bold tracking-wider uppercase text-white shadow-sm">
                      <Sparkles size={12} className="text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                      <span>{active.tag}</span>
                    </div>

                    {/* Reference Video Interactive Arrow Navigation */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handlePrev}
                        aria-label="Previous Destination"
                        className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-90"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={handleNext}
                        aria-label="Next Destination"
                        className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-90"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Middle Text: Destination, Tamil Name & Description */}
                  <div className="max-w-xl space-y-2">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                        {active.name}
                      </h2>
                      <span className="text-2xl sm:text-3xl font-extrabold font-tamil text-sky-300 drop-shadow">
                        {active.tamilName}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-slate-200 drop-shadow line-clamp-2 max-w-lg leading-relaxed">
                      {active.description}
                    </p>

                    {/* Action Pill Button (Exact "Explore Now ->" from Reference) */}
                    <div className="pt-3">
                      <Link
                        to={`/search?from=Chennai&to=${active.name}`}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-900/40 hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all border border-blue-400/40"
                      >
                        <span>Explore Now</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Bar inside Card: Circular Thumbnail Previews + `+` (Exact Reference Image) */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2.5">
                      {featuredDestinations.map((dest, idx) => (
                        <button
                          key={dest.id}
                          onClick={() => setCurrentIndex(idx)}
                          title={`${dest.name} (${dest.tamilName})`}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 transition-all transform ${
                            currentIndex === idx
                              ? 'border-white scale-110 shadow-lg ring-2 ring-blue-500'
                              : 'border-white/50 opacity-70 hover:opacity-100 hover:scale-105'
                          }`}
                        >
                          <img
                            src={dest.imageUrl}
                            alt={dest.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}

                      {/* Plus Pill to view all destinations */}
                      <Link
                        to="/destinations"
                        title="View All 14+ Destinations"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 border-2 border-white/60 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                      >
                        <Plus size={16} />
                      </Link>
                    </div>

                    {/* Pagination Indicators (Reference Video) */}
                    <div className="flex items-center space-x-1.5">
                      {featuredDestinations.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            currentIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: Script Accent + Weather Card + Upcoming Trip Card
                ------------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col space-y-6 animate-hero-slide-right">
              
              {/* Handwritten Script Accent: "Let's Explore ☀️" (Exact Reference) */}
              <div className="flex items-center justify-start lg:justify-center pt-2">
                <div className="flex items-center space-x-2 text-blue-700 font-handwriting text-3xl sm:text-4xl font-bold tracking-wide -rotate-3 select-none">
                  <span>Let's Explore</span>
                  <Sun size={26} className="text-amber-500 animate-spin" style={{ animationDuration: '16s' }} />
                </div>
              </div>

              {/* 1. Organic Fluid Weather Widget (Exact Reference Image) */}
              <div className="organic-blob-weather p-6 text-slate-800 relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                      {active.temp}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
                      {active.weatherCondition}
                    </div>
                  </div>

                  {/* Radiant Sun / Weather Illustration */}
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                    <Sun size={36} className="text-amber-500 animate-pulse" />
                  </div>
                </div>

                {/* Location Pill */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 text-slate-700">
                  <MapPin size={14} className="text-blue-600 shrink-0" />
                  <span className="text-xs font-bold truncate">{active.locationLabel}</span>
                </div>
              </div>

              {/* 2. Sculpted Upcoming Trip Card (Exact Reference Image) */}
              <div className="organic-blob-trip p-6 text-slate-800 relative group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-slate-900">Upcoming Trip</h3>
                  <Link
                    to="/bookings"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                      <img
                        src={active.imageUrl}
                        alt="Coach Tour"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-black text-slate-900 leading-tight">
                        {active.upcomingRoute}
                      </div>
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-medium">
                        <Calendar size={12} className="text-slate-400" />
                        <span>{active.upcomingDate}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-medium">
                        <Users size={12} className="text-slate-400" />
                        <span>{active.upcomingPassengers}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Arrow Button */}
                  <Link
                    to="/bookings"
                    title="Open Boarding Pass"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-95"
                  >
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SEARCH & ROUTE CONSOLE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-30">
        <SearchBar compact={false} />
      </section>

      {/* =========================================================================
          KEY FLEET METRICS & LIVE CORRIDOR STATUS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0f1422] border border-white/10 shadow-lg flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Bus size={22} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">120+</div>
              <div className="text-xs text-slate-400 font-medium">Daily Services</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f1422] border border-white/10 shadow-lg flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">4.8 ★</div>
              <div className="text-xs text-slate-400 font-medium">Passenger Rating</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f1422] border border-white/10 shadow-lg flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Zap size={22} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">1.2M+</div>
              <div className="text-xs text-slate-400 font-medium">Happy Travelers</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f1422] border border-white/10 shadow-lg flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">99.4%</div>
              <div className="text-xs text-slate-400 font-medium">Punctuality Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VOLVO 9600 & BHARATBENZ SLEEPER COMFORTS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0e1424] via-[#0b0e18] to-[#070910] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest font-black text-blue-400">
              Executive Sleeper Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Restorative Sleep on South Indian Highways
            </h2>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              Every berth in our Volvo 9600 Multi-Axle fleet is designed to feel like a private luxury capsule, ensuring you arrive refreshed and energized.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-sky-400 flex items-center justify-center mb-3">
                <Wind size={20} />
              </div>
              <h3 className="text-base font-bold text-white">Individual AC Vents</h3>
              <p className="text-xs text-slate-400 mt-1">
                Precision climate dial for personalized cooling comfort throughout your overnight voyage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold text-white">USB-C Fast Charging</h3>
              <p className="text-xs text-slate-400 mt-1">
                Dual fast-charge outlets per berth to keep your smartphone, laptop, and tablet powered.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                <Radio size={20} />
              </div>
              <h3 className="text-base font-bold text-white">Live Telemetry & GPS</h3>
              <p className="text-xs text-slate-400 mt-1">
                Real-time WhatsApp tracking and highway telemetry shared with families for peace of mind.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <Coffee size={20} />
              </div>
              <h3 className="text-base font-bold text-white">Laundered Linens</h3>
              <p className="text-xs text-slate-400 mt-1">
                Factory-sanitized bedsheets, sealed pillows, and premium mineral water bottles provided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE 6 COMPLETE WEBSITE GATEWAY TILES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0f1422] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] uppercase tracking-widest font-black text-blue-400">
              Passenger Portals
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 font-tamil">
              மாரியம்மன் Travels Gateway
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Instant access to live schedules, e-ticket downloads, city guides, and 24x7 helpdesk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/search"
              className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-blue-500/40 transition-all group flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Bus size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    Bus Search & Seats
                  </h3>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time seat availability, sleeper cabin layouts & live fares.
                </p>
              </div>
            </Link>

            <Link
              to="/bookings"
              className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 transition-all group flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Ticket size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    My Bookings & PNR
                  </h3>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Download official e-Ticket boarding pass, check PNR or reschedule.
                </p>
              </div>
            </Link>

            <Link
              to="/destinations"
              className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-sky-500/40 transition-all group flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MapPin size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    Destinations Guide
                  </h3>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Madurai, Ooty, Rameswaram, Coimbatore, Trichy & Tirunelveli.
                </p>
              </div>
            </Link>

            <Link
              to="/about"
              className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-amber-500/40 transition-all group flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Award size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Fleet Heritage
                  </h3>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  20+ years of punctual excellence on Tamil Nadu highways since 2004.
                </p>
              </div>
            </Link>

            <Link
              to="/contact"
              className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 transition-all group flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <PhoneCall size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    24x7 Helpdesk
                  </h3>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Terminal counters in Chennai, Madurai, Coimbatore & Trichy.
                </p>
              </div>
            </Link>

            <Link
              to="/login"
              className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 hover:from-blue-900/50 hover:to-indigo-900/50 border border-blue-500/30 transition-all group flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                <Sparkles size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    Cinematic Intro Video
                  </h3>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Re-watch the 4-phase luxury bus animation & highway journey.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
