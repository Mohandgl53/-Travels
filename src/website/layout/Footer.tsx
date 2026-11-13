import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, Clock, Award } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ede7dc] border-t border-slate-300 text-slate-600 text-sm">
      {/* Top Highlights Banner */}
      <div className="py-10 bg-[#f7f4ed] border-b border-slate-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-sm">99.4% On-Time Record</h4>
              <p className="text-xs text-slate-500 font-medium">Punctual departures across South India</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Shield size={22} />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-sm">Live GPS & Telemetry</h4>
              <p className="text-xs text-slate-500 font-medium">Continuous tracking & women safety</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shrink-0">
              <Award size={22} />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-sm">Clean & Sanitized</h4>
              <p className="text-xs text-slate-500 font-medium">Fresh laundered linen & clean berths</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
              <Phone size={22} />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-sm">24x7 Help Desk</h4>
              <p className="text-xs text-slate-500 font-medium">Instant telephonic & WhatsApp support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo size="md" theme="light" />
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-medium">
            South India's most dependable intercity bus travel network. Operating modern BharatBenz and Volvo multi-axle sleeper coaches connecting Chennai, Madurai, Coimbatore, Trichy, Salem, Tirunelveli and Bangalore.
          </p>
          <div className="pt-2 text-xs space-y-2 font-medium">
            <div className="flex items-center space-x-2 text-slate-700">
              <Phone size={14} className="text-blue-600" />
              <span>Head Office: <strong>+91 044 2479 9999</strong> / <strong>+91 98421 23456</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <Mail size={14} className="text-blue-600" />
              <span>Support Email: <strong className="text-blue-600">helpdesk@mariammantravels.com</strong></span>
            </div>
          </div>
        </div>

        {/* Top Routes */}
        <div>
          <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider mb-4">Top Express Routes</h4>
          <ul className="space-y-2 text-xs font-semibold">
            <li>
              <Link to="/search?from=Chennai&to=Madurai" className="hover:text-blue-600 transition-colors">
                Chennai → Madurai
              </Link>
            </li>
            <li>
              <Link to="/search?from=Chennai&to=Coimbatore" className="hover:text-blue-600 transition-colors">
                Chennai → Coimbatore
              </Link>
            </li>
            <li>
              <Link to="/search?from=Chennai&to=Tirunelveli" className="hover:text-blue-600 transition-colors">
                Chennai → Tirunelveli
              </Link>
            </li>
            <li>
              <Link to="/search?from=Madurai&to=Chennai" className="hover:text-blue-600 transition-colors">
                Madurai → Chennai
              </Link>
            </li>
            <li>
              <Link to="/search?from=Coimbatore&to=Chennai" className="hover:text-blue-600 transition-colors">
                Coimbatore → Chennai
              </Link>
            </li>
            <li>
              <Link to="/search?from=Chennai&to=Tiruchirappalli" className="hover:text-blue-600 transition-colors">
                Chennai → Trichy
              </Link>
            </li>
          </ul>
        </div>

        {/* Passenger Services */}
        <div>
          <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider mb-4">Passenger Services</h4>
          <ul className="space-y-2 text-xs font-semibold">
            <li>
              <Link to="/search" className="hover:text-blue-600 transition-colors">
                Search & Book Buses
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="hover:text-blue-600 transition-colors">
                Print / Cancel Ticket
              </Link>
            </li>
            <li>
              <Link to="/destinations" className="hover:text-blue-600 transition-colors">
                Destinations Guide
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600 transition-colors">
                Safety Standards & Fleet
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">
                Terminal Counter Locations
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-blue-600 transition-colors">
                Mariamman Club Rewards
              </Link>
            </li>
          </ul>
        </div>

        {/* Major Terminals */}
        <div>
          <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider mb-4">Major Bus Terminals</h4>
          <ul className="space-y-2.5 text-xs font-medium text-slate-600">
            <li>
              <strong className="text-slate-900 block">Chennai</strong>
              Koyambedu Omni Stand & Tambaram
            </li>
            <li>
              <strong className="text-slate-900 block">Madurai</strong>
              Mattuthavani Omni Bus Stand
            </li>
            <li>
              <strong className="text-slate-900 block">Coimbatore</strong>
              Gandhipuram Omni Bus Stand
            </li>
            <li>
              <strong className="text-slate-900 block">Trichy</strong>
              Opp. Central Bus Stand, Rockins Rd
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-300 py-6 bg-[#e6dfd3] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-medium text-slate-600">
            © {new Date().getFullYear()} <strong>மாரியம்மன் Travels</strong>. All rights reserved. Licensed Tamil Nadu Intercity Luxury Carrier.
          </p>
          <div className="flex space-x-6 text-slate-500 font-semibold">
            <span className="hover:text-slate-800 cursor-pointer">Terms of Carriage</span>
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Refund Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
