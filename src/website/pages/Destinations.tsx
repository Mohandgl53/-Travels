import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Destinations: React.FC = () => {
  const destinationList = [
    {
      name: 'Madurai (மதுரை)',
      category: 'Temple City & Cultural Capital',
      description:
        'Home to the historic Meenakshi Sundareswarar Temple, bustling midnight food markets, famous Jigarthanda, and rich Tamil Sangam heritage.',
      popularFrom: 'Chennai, Coimbatore, Bangalore',
      frequency: '28 Daily Luxury Services',
      highlights: ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Mahal', 'Alagar Kovil', 'Gandhi Memorial Museum'],
      startingFare: 750,
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    },
    {
      name: 'Coimbatore (கோயம்புத்தூர்)',
      category: 'Manchester of South India & Gateway to Nilgiris',
      description:
        'A bustling industrial powerhouse nestled at the foothills of the Western Ghats. Gateway to Ooty and home to the iconic Adiyogi Shiva Statue.',
      popularFrom: 'Chennai, Madurai, Tirunelveli',
      frequency: '22 Daily Luxury Services',
      highlights: ['Adiyogi Shiva / Isha Yoga', 'Marudhamalai Murugan Temple', 'Siruvani Waterfalls', 'GD Naidu Museum'],
      startingFare: 850,
      badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    },
    {
      name: 'Tirunelveli (திருநெல்வேலி)',
      category: 'City of Halwa & Mighty Nellaiappar',
      description:
        'Famous for its 2,000-year-old Nellaiappar Temple, the sacred Thamirabarani River, mouth-watering Iruttu Kadai Halwa, and nearby Courtallam falls.',
      popularFrom: 'Chennai, Coimbatore, Trichy',
      frequency: '14 Daily Luxury Services',
      highlights: ['Nellaiappar Temple Musical Pillars', 'Courtallam Waterfalls', 'Manimuthar Dam', 'Krishnapuram Sculptures'],
      startingFare: 950,
      badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    },
    {
      name: 'Rameswaram (ராமேஸ்வரம்)',
      category: 'Sacred Island & Pamban Wonder',
      description:
        'One of the holiest Char Dham pilgrimage centers in India. Connected by the historic sea bridge, with crystalline waters at Dhanushkodi.',
      popularFrom: 'Chennai, Madurai, Trichy',
      frequency: '10 Daily Luxury Services',
      highlights: ['Ramanathaswamy Temple 1000 Pillars', 'Pamban Rail & Road Bridge', 'Dhanushkodi Ghost Town', 'APJ Abdul Kalam Memorial'],
      startingFare: 1100,
      badgeColor: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    },
    {
      name: 'Ooty & Nilgiris (ஊட்டி)',
      category: 'Queen of Hill Stations',
      description:
        'Crisp mountain breeze, sprawling emerald tea estates, colonial architecture, and winding mountain roads in the Western Ghats.',
      popularFrom: 'Chennai, Coimbatore, Madurai',
      frequency: '12 Daily Luxury Services',
      highlights: ['Botanical Gardens', 'Ooty Lake Boating', 'Doddabetta Peak', 'Tea Factory & Museum'],
      startingFare: 1050,
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    },
    {
      name: 'Tiruchirappalli (திருச்சிராப்பள்ளி)',
      category: 'Fortress City & Ancient Shrines',
      description:
        'Centrally located on the banks of River Cauvery, renowned for the colossal Rockfort Temple perched atop a 3.8-billion-year-old rock, and Srirangam.',
      popularFrom: 'Chennai, Madurai, Coimbatore',
      frequency: '26 Daily Luxury Services',
      highlights: ['Rockfort Ucchi Pillayar Temple', 'Srirangam Ranganathaswamy', 'Samayapuram Mariamman Temple', 'Kallanai Grand Anicut'],
      startingFare: 650,
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-black text-blue-400">
          Where Do You Wish to Go?
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1 font-tamil">
          Top Destinations in South India
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
          From ancient Dravidian temples to misty Nilgiri peaks, மாரியம்மன் Travels connects you with luxury, safety, and punctual overnight departures.
        </p>
      </div>

      {/* Grid of destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinationList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-white/10 bg-[#111625] p-7 flex flex-col justify-between shadow-xl hover:border-blue-500/40 transition-all group"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${item.badgeColor}`}>
                  {item.category}
                </span>
                <span className="text-xs font-bold text-emerald-400">{item.frequency}</span>
              </div>

              <h2 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                {item.name}
              </h2>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{item.description}</p>

              {/* Highlights */}
              <div className="mt-4 pt-3 border-t border-white/[0.08]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Must-Visit Landmarks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] text-slate-300 text-xs font-medium border border-white/10"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Fare & Action */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Fares starting</span>
                <span className="text-2xl font-black text-white">₹{item.startingFare}</span>
              </div>

              <Link
                to={`/search?from=Chennai&to=${encodeURIComponent(item.name.split(' ')[0])}`}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center space-x-1 transition-colors border border-blue-400/30"
              >
                <span>Find Buses</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
