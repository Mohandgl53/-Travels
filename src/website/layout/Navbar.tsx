import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bus, MapPin, User, LogOut, Menu, X, PhoneCall, Award, Ticket, Sparkles } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

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
    <header className="sticky top-0 z-50 bg-[#0d121f]/95 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      {/* Top micro bar for emergency / helpline */}
      <div className="bg-[#06080d] text-slate-400 text-xs py-1.5 px-4 sm:px-8 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-semibold text-emerald-400">Live GPS Active</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="hidden sm:inline">24x7 Helpline: <strong className="text-sky-300 font-mono">+91 044 2479 9999</strong></span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span>Official Operator: <strong className="text-blue-300 font-tamil">மாரியம்மன் டிராவல்ஸ்</strong></span>
            <span>•</span>
            <span className="hidden sm:inline text-emerald-400">Sanitized Sleeper Fleet</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform border border-blue-400/20">
              <span className="text-2xl font-black font-tamil">மா</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black font-tamil tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  மாரியம்மன்
                </span>
                <span className="text-2xl font-black tracking-wider text-blue-400">
                  TRAVELS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center space-x-1">
                <span>Intercity Luxury Express</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-blue-400' : 'text-slate-400'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/search"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-blue-600/25 active:scale-95 transition-all border border-blue-400/30"
            >
              <Ticket size={15} />
              <span>Book Ticket</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white text-xs font-semibold transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-xs shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left hidden xl:block">
                  <div className="font-bold text-slate-100 leading-tight truncate max-w-[110px]">
                    {user?.name || 'Passenger'}
                  </div>
                  <div className="text-[10px] text-blue-400 font-semibold flex items-center space-x-1">
                    <span>{user?.loyaltyPoints || 100} Club pts</span>
                  </div>
                </div>
              </button>

              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#111625] border border-white/10 shadow-2xl py-2 z-50 text-slate-200 animate-slide-up backdrop-blur-2xl"
                >
                  <div className="px-4 py-3 border-b border-white/10 bg-white/[0.03] rounded-t-2xl">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">{user?.name || 'Traveler'}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    <div className="mt-2 flex items-center justify-between text-xs bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg text-blue-300 font-semibold">
                      <span>Reward Points:</span>
                      <span className="font-black text-blue-400">{user?.loyaltyPoints || 100} pts</span>
                    </div>
                  </div>

                  <Link
                    to="/account"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    <User size={15} className="text-slate-400" />
                    <span>My Profile & Preferences</span>
                  </Link>

                  <Link
                    to="/bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    <Ticket size={15} className="text-slate-400" />
                    <span>My Bookings & Tickets</span>
                  </Link>

                  <div className="border-t border-white/10 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 text-left transition-colors"
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
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center space-x-1"
            >
              <Ticket size={13} />
              <span>Book</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.06] text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d121f] border-t border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <div className="p-3.5 bg-white/[0.04] rounded-2xl mb-3 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Passenger</p>
              <p className="text-sm font-bold text-white">{user?.name || 'Traveler'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium">Club Points</p>
              <p className="text-sm font-black text-blue-400">{user?.loyaltyPoints || 100} pts</p>
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
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-400' : 'text-slate-400'} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <Link
            to="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/[0.05] hover:text-white"
          >
            <User size={18} className="text-slate-400" />
            <span>My Profile</span>
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </header>
  );
};
