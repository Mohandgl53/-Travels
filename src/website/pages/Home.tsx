import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import {
  Clock,
  Radio,
  Sparkles,
  ArrowRight,
  Star,
  ChevronRight,
  Bus,
  MapPin,
  Ticket,
  Award,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_BUS_TRIPS } from '../data/travelData';

export const Home: React.FC = () => {
  const quickPortals = [
    {
      title: 'Home',
      subtitle: 'Official Passenger Portal & Fleet Overview',
      path: '/home',
      icon: Bus,
      tag: 'Current View',
      active: true,
    },
    {
      title: 'Bus Search',
      subtitle: 'Real-time seat availability & live fares',
      path: '/search',
      icon: MapPin,
      tag: 'Live Schedules',
      active: false,
    },
    {
      title: 'My Bookings',
      subtitle: 'Download boarding pass, track PNR & cancel',
      path: '/bookings',
      icon: Ticket,
      tag: 'E-Ticket Pass',
      active: false,
    },
    {
      title: 'Destinations',
      subtitle: 'Chennai, Madurai, Coimbatore & sacred temples',
      path: '/destinations',
      icon: MapPin,
      tag: 'City Guides',
      active: false,
    },
    {
      title: 'About Us',
      subtitle: '20+ years of luxury highway heritage',
      path: '/about',
      icon: Award,
      tag: 'Fleet Heritage',
      active: false,
    },
    {
      title: 'Contact',
      subtitle: '24x7 customer support & station terminals',
      path: '/contact',
      icon: PhoneCall,
      tag: '24x7 Helpline',
      active: false,
    },
  ];

  return (
    <div className="space-y-16 pb-24 text-slate-100">
      {/* 1. Hero Section - Deep Atmospheric Obsidian & Sapphire Blue */}
      <section className="relative pt-14 pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#06080e] via-[#0d1424] to-[#090a0f] text-white overflow-hidden border-b border-white/[0.08]">
        {/* Subtle patterned background ambient glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-400 text-xs font-semibold mb-4 backdrop-blur-md shadow-sm">
              <Sparkles size={14} className="text-sky-400" />
              <span>South India's Most Trusted Luxury Coach Network</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight font-tamil">
              மாரியம்மன் Travels
            </h1>
            <p className="mt-2 text-xl sm:text-2xl font-bold text-sky-400 drop-shadow">
              Travel in Comfort • Arrive on Time
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              Daily luxury Volvo Multi-Axle and BharatBenz AC sleeper express routes connecting Chennai, Madurai, Coimbatore, Trichy, Tirunelveli and Bangalore.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-sky-400">120+</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Daily Coach Services</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white">4.8 ★</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Passenger Rating</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">1.2M+</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Happy Travelers</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">99.4%</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Punctuality Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Search Bar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <SearchBar compact={true} />
      </div>

      {/* 2. Architectural Flow Showcase: The 6 Website Portals (Matching Design Specification) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0f1422] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] uppercase tracking-widest font-black text-blue-400">
              Complete Travel Website
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 font-tamil">
              மாரியம்மன் Travels Gateway
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
              Direct access to all services, booking schedules, account management and contact desks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickPortals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.path}
                  to={portal.path}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                    portal.active
                      ? 'bg-blue-600/15 border-blue-500/40 shadow-lg shadow-blue-500/10'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 border border-white/10">
                      {portal.tag}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                      <span>{portal.title}</span>
                      <ChevronRight size={16} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {portal.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Popular Routes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-black text-blue-400 mb-1">
              Guaranteed Daily Departures
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Popular Express Routes
            </h2>
          </div>
          <Link
            to="/search"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Explore All Schedules</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BUS_TRIPS.slice(0, 3).map((trip) => (
            <div
              key={trip.id}
              className="rounded-3xl bg-[#111625] border border-white/10 p-6 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-2xl transition-all group shadow-xl"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {trip.serviceType}
                  </span>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <Star size={13} className="fill-emerald-400 text-emerald-400" />
                    <span>{trip.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between my-4 bg-white/[0.03] p-4 rounded-2xl border border-white/[0.06]">
                  <div>
                    <h3 className="text-xl font-black text-white">{trip.from}</h3>
                    <p className="text-sm text-blue-400 font-extrabold mt-0.5">{trip.departureTime}</p>
                  </div>
                  <div className="flex flex-col items-center px-2">
                    <span className="text-[11px] text-slate-400 font-semibold">{trip.duration}</span>
                    <div className="w-16 border-t border-dashed border-slate-600 my-1 relative">
                      <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">Express Corridor</span>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-black text-white">{trip.to}</h3>
                    <p className="text-sm text-emerald-400 font-extrabold mt-0.5">{trip.arrivalTime}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 truncate">
                  Boarding: <strong className="text-slate-200">{trip.boardingPoints[0]?.location}</strong>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium block">Seat Fare</span>
                  <span className="text-2xl font-black text-white">₹{trip.fare}</span>
                </div>
                <Link
                  to={`/search?from=${encodeURIComponent(trip.from)}&to=${encodeURIComponent(trip.to)}`}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center space-x-1 border border-blue-400/30"
                >
                  <span>Select Seat</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Travel with மாரியம்மன் Travels */}
      <section className="bg-[#0c101a] border-y border-white/[0.08] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-black text-blue-400">
              The Gold Standard of Intercity Travel
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Why 12 Lakh+ Passengers Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
              Engineered for restful overnight sleep and stress-free intercity connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-[#111625] border border-white/10 space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                <Radio size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Live Telemetry & Safety</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Satellite GPS telemetry with continuous speed monitoring, emergency SOS button on every single berth, and CCTV surveillance for woman travelers.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#111625] border border-white/10 space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Fresh Bedrolls & Hospitality</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Steam-sanitized pillows, freshly laundered blankets in sealed pouches, bottled drinking water, reading lamps, and individual fast USB phone chargers.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#111625] border border-white/10 space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Strict Punctuality</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dual certified captains operating on direct 4-lane highway corridors ensure you reach your destination well in time for morning temple visits or business meetings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Destinations Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-black text-blue-400">
            Explore Tamil Nadu
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Featured Destinations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Madurai', tag: 'Temple City', buses: '24 Daily Services', desc: 'Meenakshi Amman Temple & Heritage Food' },
            { name: 'Coimbatore', tag: 'Textile Capital', buses: '18 Daily Services', desc: 'Adiyogi Shiva & Siruvani Waterfalls' },
            { name: 'Ooty', tag: 'Queen of Hills', buses: '10 Daily Services', desc: 'Nilgiris, Tea Gardens & Pine Forests' },
            { name: 'Rameswaram', tag: 'Holy Island', buses: '8 Daily Services', desc: 'Pamban Bridge & Ramanathaswamy Shrine' },
          ].map((dest, i) => (
            <div
              key={i}
              className="rounded-3xl bg-[#111625] border border-white/10 p-6 hover:border-blue-500/40 hover:shadow-xl transition-all group shadow-lg flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {dest.tag}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">{dest.desc}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-4 border-t border-white/[0.08]">
                <span className="text-slate-400 font-medium">{dest.buses}</span>
                <Link
                  to={`/search?from=Chennai&to=${dest.name}`}
                  className="font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>Book</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
