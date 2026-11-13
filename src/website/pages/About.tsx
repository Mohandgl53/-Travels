import React from 'react';
import { ShieldCheck, Award, Bus, HeartHandshake, Compass, Users, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-slate-800">
      {/* Porcelain Canvas Header matching Reference Theme */}
      <div className="porcelain-canvas rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative border border-slate-300/40 text-slate-900 overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold shadow-sm">
            <Award size={14} className="text-blue-600" />
            <span>Two Decades of Highway Excellence (2004 — Present)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-tamil tracking-tight">
            மாரியம்மன் Travels — Safe, Punctual, Prestigious
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Founded in 2004 with a single bus between Chennai and Madurai, மாரியம்மன் Travels has evolved to become Tamil Nadu's most revered private passenger network, operating over 120 premium sleeper coaches daily.
          </p>
        </div>
      </div>

      {/* Numbers that define us */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-7 rounded-[2.25rem] bg-white border border-slate-200/90 shadow-lg hover:-translate-y-1 transition-all">
          <div className="text-4xl font-black text-blue-600">20+</div>
          <div className="text-xs font-black text-slate-800 mt-1.5">Years of Service</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Pioneers in luxury AC sleeper berths</p>
        </div>
        <div className="p-7 rounded-[2.25rem] bg-white border border-slate-200/90 shadow-lg hover:-translate-y-1 transition-all">
          <div className="text-4xl font-black text-indigo-600">120+</div>
          <div className="text-xs font-black text-slate-800 mt-1.5">Modern Coaches</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">BharatBenz & Volvo 9600 Multi-Axle</p>
        </div>
        <div className="p-7 rounded-[2.25rem] bg-white border border-slate-200/90 shadow-lg hover:-translate-y-1 transition-all">
          <div className="text-4xl font-black text-emerald-600">1.2M+</div>
          <div className="text-xs font-black text-slate-800 mt-1.5">Happy Passengers</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Highest repeat booking rate in TN</p>
        </div>
        <div className="p-7 rounded-[2.25rem] bg-white border border-slate-200/90 shadow-lg hover:-translate-y-1 transition-all">
          <div className="text-4xl font-black text-blue-600">99.4%</div>
          <div className="text-xs font-black text-slate-800 mt-1.5">On-Time Departures</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Zero compromise on passenger schedules</p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-[2.25rem] bg-white border border-slate-200/90 shadow-lg space-y-4 hover:border-blue-500/40 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900">Passenger Safety First</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            All our long-distance routes employ dual certified captains who rotate shifts every 4 hours. Every sleeper berth is equipped with an emergency SOS button connected directly to our 24/7 central monitoring headquarters in Chennai.
          </p>
        </div>

        <div className="p-8 rounded-[2.25rem] bg-white border border-slate-200/90 shadow-lg space-y-4 hover:border-emerald-500/40 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <HeartHandshake size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900">Hygiene & Sanity</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            We operate in-house industrial laundry units. After every completed voyage, coaches undergo high-temperature steam sanitization, and freshly packaged bedrolls, pillows, and mineral water bottles are provisioned.
          </p>
        </div>

        <div className="p-8 rounded-[2.25rem] bg-white border border-slate-200/90 shadow-lg space-y-4 hover:border-sky-500/40 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
            <Bus size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900">State-of-the-Art Fleet</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Our luxury fleet boasts world-class Volvo 9600 Multi-Axle and BharatBenz Euro-6 coaches featuring air suspension, individual ergonomic berths, individual climate vents, and USB fast-charging ports for every passenger.
          </p>
        </div>
      </div>

      {/* Corporate Pledge */}
      <div className="rounded-[2.5rem] bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-blue-200 text-slate-900 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black font-tamil text-blue-900">
          எங்கள் நோக்கம்: உங்கள் பயணம் இனிதாக அமையட்டும்!
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium">
          Whether you are traveling home for Diwali, heading to a crucial morning corporate meeting, or exploring sacred South Indian shrines with your family, மாரியம்மன் Travels is dedicated to making every single kilometer comfortable, safe, and prestigious.
        </p>
      </div>
    </div>
  );
};
