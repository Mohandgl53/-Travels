import React from 'react';
import { ShieldCheck, Award, Bus, HeartHandshake } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
          <Award size={14} className="text-blue-400" />
          <span>Two Decades of Excellence on South Indian Highways</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-tamil">
          மாரியம்மன் Travels — Safe, Punctual, Prestigious
        </h1>
        <p className="text-xs sm:text-base text-slate-400 leading-relaxed font-normal">
          Founded in 2004 with a single bus between Chennai and Madurai, மாரியம்மன் Travels has grown to become Tamil Nadu's most revered private passenger transport enterprise, operating over 120 premium sleeper coaches daily.
        </p>
      </div>

      {/* Numbers that define us */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-6 rounded-3xl bg-[#111625] border border-white/10 shadow-xl">
          <div className="text-3xl font-black text-blue-400">20+</div>
          <div className="text-xs font-bold text-white mt-1">Years of Service</div>
          <p className="text-[11px] text-slate-400 mt-1">Pioneers in AC sleeper comfort</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#111625] border border-white/10 shadow-xl">
          <div className="text-3xl font-black text-indigo-400">120+</div>
          <div className="text-xs font-bold text-white mt-1">Modern Coaches</div>
          <p className="text-[11px] text-slate-400 mt-1">BharatBenz & Volvo 9600</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#111625] border border-white/10 shadow-xl">
          <div className="text-3xl font-black text-emerald-400">1.2 Million+</div>
          <div className="text-xs font-bold text-white mt-1">Happy Passengers</div>
          <p className="text-[11px] text-slate-400 mt-1">Highest repeat booking rate</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#111625] border border-white/10 shadow-xl">
          <div className="text-3xl font-black text-teal-400">99.4%</div>
          <div className="text-xs font-bold text-white mt-1">On-Time Departures</div>
          <p className="text-[11px] text-slate-400 mt-1">Zero compromise on schedule</p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-[#111625] border border-white/10 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Passenger Safety First</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            All our long-distance routes employ dual certified captains who rotate shifts every 4 hours. Every sleeper berth is equipped with an emergency SOS button connected directly to our 24/7 central monitoring headquarters in Chennai.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#111625] border border-white/10 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center">
            <HeartHandshake size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Hygiene & Sanity</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            We operate in-house industrial laundry units. After every completed voyage, coaches undergo high-temperature steam sanitization, and freshly packaged bedrolls, pillows, and mineral water bottles are provisioned.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#111625] border border-white/10 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <Bus size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">State-of-the-Art Fleet</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Our luxury fleet boasts world-class Volvo 9600 Multi-Axle and BharatBenz Euro-6 coaches featuring air suspension, individual ergonomic berths, individual climate vents, and USB fast-charging ports for every passenger.
          </p>
        </div>
      </div>

      {/* Corporate Pledge */}
      <div className="rounded-3xl bg-[#0a0d16] border border-white/10 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-2xl">
        <h2 className="text-2xl font-bold font-tamil text-blue-300">
          உலகம் ஒரு புத்தகம் — ஒவ்வொரு பக்கத்தையும் பயணியுங்கள்!
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto italic font-medium">
          "The world is a book, and those who do not travel read only one page." At மாரியம்மன் Travels, our mission is to ensure every journey you take is memorable, tranquil, and completely secure.
        </p>
        <div className="pt-2 text-xs font-bold text-blue-400 uppercase tracking-widest">
          — Board of Directors, மாரியம்மன் Travels Private Limited
        </div>
      </div>
    </div>
  );
};
