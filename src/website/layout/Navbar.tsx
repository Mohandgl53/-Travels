import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bus, MapPin, User, LogOut, Menu, X, PhoneCall, Award, Ticket, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { BrandLogo, BrandEmblem } from '../components/BrandLogo';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/home', icon: Bus },
    { label: 'Bus Search', path: '/search', icon: MapPin },
    { label: 'My Bookings', path: '/bookings', icon: Ticket },
    { label: 'Destinations', path: '/destinations', icon: MapPin },
    { label: 'About Us', path: '/about', icon: Award },
    { label: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(15,23,42,0.06)] transition-all">
      {/* Top micro ribbon for live highway status & helpline */}
      <div className="bg-[#ede7dc] text-slate-600 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-300/60 font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span className="font-bold text-emerald-700">Live GPS Active</span>
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="hidden sm:inline">24x7 Helpline: <strong className="text-blue-700 font-mono">+91 044 2479 9999</strong></span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-slate-600">
            <span>Official Operator: <strong className="text-blue-800 font-tamil font-bold">மாரியம்மன் டிராவல்ஸ்</strong></span>
            <span>•</span>
            <span className="hidden sm:inline text-emerald-700 font-bold">Sanitized Sleeper Fleet</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Professional Brand Logo */}
          <BrandLogo size="md" theme="light" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5 bg-white/80 p-1.5 rounded-full border border-slate-200/80 shadow-sm">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              title="Experience Cinematic Animated Arrival"
              className="px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>Cinematic Intro</span>
            </Link>

            <Link
              to="/search"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-blue-600/25 active:scale-95 transition-all border border-blue-400/30"
            >
              <Ticket size={14} />
              <span>Book Ticket</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2.5 p-1 pr-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-800 text-xs font-bold shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
                </div>
                <div className="text-left hidden xl:block">
                  <div className="font-extrabold text-slate-900 leading-tight truncate max-w-[110px]">
                    {user?.name || 'Passenger'}
                  </div>
                  <div className="text-[10px] text-blue-600 font-bold">
                    {user?.loyaltyPoints || 450} Club pts
                  </div>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-64 rounded-3xl bg-white border border-slate-200 shadow-2xl py-2 z-50 text-slate-800 animate-slide-up"
                >
                  <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50 rounded-t-3xl">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">Signed in as</p>
                    <p className="text-sm font-black text-slate-900 truncate">{user?.name || 'Traveler'}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    <div className="mt-2 flex items-center justify-between text-xs bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl text-blue-800 font-bold">
                      <span>Reward Points:</span>
                      <span className="font-black text-blue-600">{user?.loyaltyPoints || 450} pts</span>
                    </div>
                  </div>

                  <Link
                    to="/account"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <User size={15} className="text-slate-400" />
                    <span>My Profile & Preferences</span>
                  </Link>

                  <Link
                    to="/bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <Ticket size={15} className="text-slate-400" />
                    <span>My Bookings & Tickets</span>
                  </Link>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 text-left transition-colors"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link
              to="/search"
              className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
            >
              <Ticket size={13} />
              <span>Book</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8f5] border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <div className="p-4 bg-white rounded-2xl mb-3 border border-slate-200 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs text-slate-500 font-bold">Passenger</p>
              <p className="text-sm font-black text-slate-900">{user?.name || 'Traveler'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-bold">Club Points</p>
              <p className="text-sm font-black text-blue-600">{user?.loyaltyPoints || 450} pts</p>
            </div>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-white hover:text-blue-600'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-white"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Cinematic Bus Intro</span>
          </Link>

          <Link
            to="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-white"
          >
            <User size={18} className="text-slate-400" />
            <span>My Profile</span>
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </header>
  );
};
