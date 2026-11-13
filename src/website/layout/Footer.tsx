import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, Clock, Award } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07090e] border-t border-white/[0.08] text-slate-400 text-sm">
      {/* Top Highlights Banner */}
      <div className="border-b border-white/[0.05] py-8 bg-[#0a0d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Clock size={22} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">99.4% On-Time Record</h4>
              <p className="text-xs text-slate-400">Punctual departures & arrivals across South India</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield size={22} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Live GPS & Telemetry</h4>
              <p className="text-xs text-slate-400">Continuous telemetry tracking and women safety</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Award size={22} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Clean & Sanitized</h4>
              <p className="text-xs text-slate-400">Fresh laundered linen and clean sleeper berths</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Phone size={22} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24x7 Help Desk</h4>
              <p className="text-xs text-slate-400">Instant telephonic and WhatsApp boarding support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo size="md" />
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            South India's most dependable intercity bus travel network. Operating modern BharatBenz and Volvo multi-axle sleeper buses connecting Chennai, Madurai, Coimbatore, Trichy, Salem, Tirunelveli and beyond.
          </p>
          <div className="pt-2 text-xs space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-300">
              <Phone size={14} className="text-blue-400" />
              <span>Head Office: +91 044 2479 9999 / +91 98421 23456</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail size={14} className="text-blue-400" />
              <span>care@mariammantravels.com</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <MapPin size={14} className="text-blue-400" />
              <span>Platform 4, Omni Bus Terminal, Koyambedu, Chennai - 600107</span>
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
            Top Express Routes
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/search?from=Chennai&to=Madurai" className="hover:text-blue-400 transition-colors">Chennai → Madurai</Link></li>
            <li><Link to="/search?from=Chennai&to=Coimbatore" className="hover:text-blue-400 transition-colors">Chennai → Coimbatore</Link></li>
            <li><Link to="/search?from=Chennai&to=Tirunelveli" className="hover:text-blue-400 transition-colors">Chennai → Tirunelveli</Link></li>
            <li><Link to="/search?from=Madurai&to=Chennai" className="hover:text-blue-400 transition-colors">Madurai → Chennai</Link></li>
            <li><Link to="/search?from=Coimbatore&to=Chennai" className="hover:text-blue-400 transition-colors">Coimbatore → Chennai</Link></li>
            <li><Link to="/search?from=Chennai&to=Tiruchirappalli" className="hover:text-blue-400 transition-colors">Chennai → Trichy</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
            Passenger Services
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/search" className="hover:text-blue-400 transition-colors">Search & Book Buses</Link></li>
            <li><Link to="/bookings" className="hover:text-blue-400 transition-colors">Print / Cancel Ticket</Link></li>
            <li><Link to="/destinations" className="hover:text-blue-400 transition-colors">Destinations Guide</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">Safety Standards & Fleet</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Terminal Counter Locations</Link></li>
            <li><Link to="/account" className="hover:text-blue-400 transition-colors">Mariamman Club Rewards</Link></li>
          </ul>
        </div>

        {/* Major Counters */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
            Major Bus Terminals
          </h4>
          <div className="space-y-2.5 text-xs">
            <div>
              <p className="font-semibold text-slate-200">Chennai</p>
              <p className="text-[11px] text-slate-500">Koyambedu Omni Stand & Tambaram</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">Madurai</p>
              <p className="text-[11px] text-slate-500">Mattuthavani Omni Bus Stand</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">Coimbatore</p>
              <p className="text-[11px] text-slate-500">Gandhipuram Omni Bus Stand</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">Trichy</p>
              <p className="text-[11px] text-slate-500">Central Bus Stand & Tollgate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.05] bg-[#05060a] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} மாரியம்மன் Travels Private Limited. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Cancellation Rules</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
