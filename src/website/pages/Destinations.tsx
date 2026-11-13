import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sun, Compass, Sparkles, Star, Calendar, Users } from 'lucide-react';

export const Destinations: React.FC = () => {
  const destinationList = [
    {
      id: 'madurai',
      name: 'Madurai',
      tamilName: 'மதுரை',
      category: 'Temple City & Cultural Capital',
      description:
        'Home to the historic Meenakshi Sundareswarar Temple, bustling midnight food markets, famous Jigarthanda, and 2,500 years of rich Tamil Sangam heritage.',
      popularFrom: 'Chennai, Coimbatore, Bangalore',
      frequency: '28 Daily Luxury Services',
      highlights: ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Mahal', 'Alagar Kovil', 'Gandhi Memorial Museum'],
      startingFare: 750,
      weather: '28° Sunny',
      imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    },
    {
      id: 'ooty',
      name: 'Ooty & Nilgiris',
      tamilName: 'ஊட்டி',
      category: 'Queen of Hill Stations • 7,500 ft',
      description:
        'Crisp mountain breeze, sprawling emerald tea estates, colonial architecture, and winding mountain roads in the Western Ghats pine peaks.',
      popularFrom: 'Chennai, Coimbatore, Madurai',
      frequency: '12 Daily Luxury Services',
      highlights: ['Botanical Gardens', 'Ooty Lake Boating', 'Doddabetta Peak', 'Tea Factory & Museum'],
      startingFare: 1050,
      weather: '17° Misty',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    },
    {
      id: 'rameswaram',
      name: 'Rameswaram',
      tamilName: 'ராமேஸ்வரம்',
      category: 'Sacred Island & Pamban Wonder',
      description:
        'One of the holiest Char Dham pilgrimage centers in India. Connected by the historic sea bridge, with crystalline waters at Dhanushkodi.',
      popularFrom: 'Chennai, Madurai, Trichy',
      frequency: '10 Daily Luxury Services',
      highlights: ['Ramanathaswamy Temple 1000 Pillars', 'Pamban Rail & Road Bridge', 'Dhanushkodi Ghost Town', 'APJ Abdul Kalam Memorial'],
      startingFare: 1100,
      weather: '29° Ocean Breeze',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    },
    {
      id: 'coimbatore',
      name: 'Coimbatore',
      tamilName: 'கோயம்புத்தூர்',
      category: 'Manchester of South India & Foothills',
      description:
        'A bustling industrial powerhouse nestled at the foothills of the Western Ghats. Gateway to Ooty and home to the iconic 112-ft Adiyogi Shiva Statue.',
      popularFrom: 'Chennai, Madurai, Tirunelveli',
      frequency: '22 Daily Luxury Services',
      highlights: ['Adiyogi Shiva / Isha Yoga', 'Marudhamalai Murugan Temple', 'Siruvani Waterfalls', 'GD Naidu Museum'],
      startingFare: 850,
      weather: '24° Sunny',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
    },
    {
      id: 'tirunelveli',
      name: 'Tirunelveli',
      tamilName: 'திருநெல்வேலி',
      category: 'City of Halwa & Mighty Nellaiappar',
      description:
        'Famous for its 2,000-year-old Nellaiappar Temple, the sacred Thamirabarani River, mouth-watering Iruttu Kadai Halwa, and nearby Courtallam falls.',
      popularFrom: 'Chennai, Coimbatore, Trichy',
      frequency: '14 Daily Luxury Services',
      highlights: ['Nellaiappar Temple Musical Pillars', 'Courtallam Waterfalls', 'Manimuthar Dam', 'Krishnapuram Sculptures'],
      startingFare: 950,
      weather: '29° Warm Ghats',
      imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
    },
    {
      id: 'trichy',
      name: 'Tiruchirappalli',
      tamilName: 'திருச்சிராப்பள்ளி',
      category: 'Fortress City & Ancient Shrines',
      description:
        'Centrally located on the banks of River Cauvery, renowned for the colossal Rockfort Temple perched atop a 3.8-billion-year-old rock, and holy Srirangam.',
      popularFrom: 'Chennai, Madurai, Coimbatore',
      frequency: '26 Daily Luxury Services',
      highlights: ['Rockfort Ucchi Pillayar Temple', 'Srirangam Ranganathaswamy', 'Samayapuram Mariamman Temple', 'Kallanai Grand Anicut'],
      startingFare: 650,
      weather: '30° Clear Skies',
      imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-slate-100">
      {/* Porcelain Canvas Header matching Reference Image Style */}
      <div className="porcelain-canvas rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative border border-slate-300/40 text-slate-900 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-sm">
              <Compass size={14} className="text-blue-600 animate-spin" style={{ animationDuration: '10s' }} />
              <span>South India Destination Guides</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-tamil">
              Top Destinations in South India
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">
              From sacred Dravidian temple towers to misty Nilgiri tea summits, மாரியம்மன் Travels connects you with supreme sleeper luxury and punctual overnight departures.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-blue-700 font-handwriting text-3xl sm:text-4xl font-bold -rotate-3 select-none">
            <span>Explore South India</span>
            <Sun size={26} className="text-amber-500 animate-spin" style={{ animationDuration: '16s' }} />
          </div>
        </div>
      </div>

      {/* Grid of Sculpted Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinationList.map((item) => (
          <div
            key={item.id}
            className="rounded-[2.25rem] bg-[#101524] border border-white/10 hover:border-blue-500/50 shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Top Organic Sculpted Image Frame */}
            <div className="relative h-56 overflow-hidden m-3.5 rounded-[1.75rem] border-4 border-white/15 shadow-inner">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

              {/* Floating Weather Pill */}
              <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md">
                <Sun size={13} className="text-amber-300" />
                <span>{item.weather}</span>
              </div>

              {/* Destination Title on Image */}
              <div className="absolute bottom-3.5 left-4 right-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-md ${item.badgeColor}`}>
                  {item.category}
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <h2 className="text-2xl font-black text-white drop-shadow-md">{item.name}</h2>
                  <span className="text-lg font-bold font-tamil text-sky-300">{item.tamilName}</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 pt-2 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Landmarks Tags */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  Must-Visit Landmarks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] text-slate-300 font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Fares starting</span>
                  <span className="text-2xl font-black text-white">₹{item.startingFare}</span>
                </div>

                <Link
                  to={`/search?from=Chennai&to=${item.name.split(' ')[0]}`}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center space-x-1.5 active:scale-95 transition-all border border-blue-400/30"
                >
                  <span>Find Buses</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
