import React, { useState } from 'react';
import { PhoneCall, MapPin, Mail, Clock, Send, CheckCircle2, Headphones, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  const terminalLocations = [
    {
      city: 'Chennai (Head Office)',
      tamilCity: 'சென்னை தலைமை அலுவலகம்',
      address: 'Platform No. 4 & 5, Koyambedu Omni Bus Terminal, Chennai - 600107',
      phones: ['+91 044 2479 9999', '+91 98421 23456'],
      hours: 'Open 24 Hours / 7 Days',
    },
    {
      city: 'Madurai',
      tamilCity: 'மதுரை பேருந்து நிலையம்',
      address: 'Shop No. 12, Mattuthavani Integrated Bus Terminal, Madurai - 625007',
      phones: ['+91 0452 258 4444', '+91 98421 88990'],
      hours: '06:00 AM - 11:30 PM',
    },
    {
      city: 'Coimbatore',
      tamilCity: 'கோயம்புத்தூர் காந்திபுரம்',
      address: 'Gandhipuram Omni Bus Stand, Cross Cut Road, Coimbatore - 641012',
      phones: ['+91 0422 249 7777', '+91 98421 55667'],
      hours: '06:00 AM - 11:30 PM',
    },
    {
      city: 'Tiruchirappalli',
      tamilCity: 'திருச்சி மத்திய பேருந்து நிலையம்',
      address: 'Opp. Central Bus Stand, Rockins Road, Cantonment, Trichy - 620001',
      phones: ['+91 0431 241 3333', '+91 98421 11223'],
      hours: '07:00 AM - 11:00 PM',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-slate-100">
      {/* Porcelain Canvas Header Banner */}
      <div className="porcelain-canvas rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative border border-slate-300/40 text-slate-900 overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold shadow-sm">
            <Headphones size={14} className="text-blue-600" />
            <span>24/7 Passenger Support & Highway Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-tamil tracking-tight">
            Contact மாரியம்மன் Travels
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Have an inquiry regarding seat availability, bus boarding points, or lost luggage? Reach out to our 24/7 centralized dispatch team.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Terminal Counters (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <MapPin size={20} className="text-blue-400" />
            <span>Major Bus Terminals & Booking Counters</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {terminalLocations.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[2rem] bg-[#101524] border border-white/10 hover:border-blue-500/40 shadow-xl space-y-3 transition-all"
              >
                <div>
                  <h3 className="text-base font-black text-white">{t.city}</h3>
                  <p className="text-xs text-sky-400 font-tamil font-bold">{t.tamilCity}</p>
                </div>
                <p className="text-xs text-slate-300 font-normal leading-relaxed">{t.address}</p>
                <div className="space-y-1 text-xs text-slate-400">
                  {t.phones.map((p, i) => (
                    <div key={i} className="flex items-center space-x-2 text-white font-mono font-bold">
                      <PhoneCall size={12} className="text-blue-400" />
                      <span>{p}</span>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2 text-slate-400 pt-1">
                    <Clock size={12} />
                    <span>{t.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Assistance Callout */}
          <div className="p-6 rounded-[2rem] bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 flex items-center justify-between shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white">Emergency On-Road Assistance</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                For in-transit bus breakdown, medical support, or driver assistance:
              </p>
            </div>
            <a
              href="tel:18004259999"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 shrink-0 transition-all active:scale-95 border border-blue-400/30"
            >
              1800 425 9999 (Toll Free)
            </a>
          </div>
        </div>

        {/* Message Form (Right 5 Cols) */}
        <div className="lg:col-span-5 p-7 rounded-[2rem] bg-[#101524] border border-white/10 shadow-2xl space-y-5">
          <div>
            <h3 className="text-xl font-black text-white">Send Us a Message</h3>
            <p className="text-xs text-slate-400 mt-1 font-normal">
              We respond to all passenger queries within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-center space-y-3 animate-fade-in">
              <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
              <h4 className="font-bold text-base text-white">Message Transmitted!</h4>
              <p className="text-xs text-emerald-300 font-normal">
                Our support desk in Chennai has received your dispatch and will call you on <strong>{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', message: '' });
                }}
                className="text-xs text-emerald-400 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mohan Kumar"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98421 00000"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Message or Query
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can assist your travel..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all active:scale-95 border border-blue-400/30"
              >
                <Send size={14} />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
