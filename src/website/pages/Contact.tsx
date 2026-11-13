import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
    }, 1500);
  };

  const branches = [
    {
      city: 'Chennai (Head Office)',
      address: 'Platform No. 4 & 5, Koyambedu Omni Bus Terminal, Chennai - 600107',
      phone: '+91 044 2479 9999 / +91 98421 23456',
      hours: 'Open 24 Hours / 7 Days',
    },
    {
      city: 'Madurai',
      address: 'Shop No. 12, Mattuthavani Integrated Bus Terminal, Madurai - 625007',
      phone: '+91 0452 258 4444 / +91 98421 88990',
      hours: '06:00 AM - 11:30 PM',
    },
    {
      city: 'Coimbatore',
      address: 'Gandhipuram Omni Bus Stand, Cross Cut Road, Coimbatore - 641012',
      phone: '+91 0422 249 7777 / +91 98421 55667',
      hours: '06:00 AM - 11:30 PM',
    },
    {
      city: 'Tiruchirappalli',
      address: 'Opp. Central Bus Stand, Rockins Road, Cantonment, Trichy - 620001',
      phone: '+91 0431 241 3333 / +91 98421 11223',
      hours: '07:00 AM - 11:00 PM',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-black text-blue-400">
          24/7 Passenger Assistance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1 font-tamil">
          Contact மாரியம்மன் Travels
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
          Have an inquiry regarding seat availability, bus boarding points, or lost luggage? Reach out to our 24/7 centralized dispatch team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Terminal Counters List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <MapPin size={20} className="text-blue-400" />
            <span>Major Bus Terminals & Booking Counters</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {branches.map((b, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#111625] border border-white/10 shadow-xl space-y-2">
                <h3 className="text-base font-bold text-white">{b.city}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">{b.address}</p>
                <div className="pt-2 text-xs space-y-1 text-slate-300 font-semibold">
                  <div className="flex items-center space-x-1.5 font-mono text-blue-400 font-bold">
                    <Phone size={13} />
                    <span>{b.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                    <Clock size={13} />
                    <span>{b.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Hotline Box */}
          <div className="p-6 rounded-3xl bg-[#0a0d16] border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 shadow-2xl">
            <div>
              <h4 className="text-base font-bold text-white">Emergency On-Road Assistance</h4>
              <p className="text-xs text-slate-400 mt-0.5 font-normal">
                For in-transit bus breakdown, medical support, or driver assistance:
              </p>
            </div>
            <a
              href="tel:18004259999"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-sm tracking-wider shadow-lg shadow-blue-600/30 flex items-center space-x-2 shrink-0 transition-colors border border-blue-400/30"
            >
              <Phone size={16} />
              <span>1800 425 9999 (Toll Free)</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-5 bg-[#111625] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">Send Us a Message</h3>
            <p className="text-xs text-slate-400 mt-1 font-normal">
              We respond to all passenger queries within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 size={44} className="mx-auto text-emerald-400 animate-bounce" />
              <h4 className="text-lg font-bold text-white">Message Delivered!</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium">
                Thank you for contacting us. A passenger service executive will connect with you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-blue-400 font-bold underline pt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohan Kumar"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0d16] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98421 00000"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0d16] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message or Query</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can assist your travel..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0d16] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all border border-blue-400/30"
              >
                <Send size={15} />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
