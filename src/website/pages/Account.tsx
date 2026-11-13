import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { User, Check, LogOut, Ticket, Heart, Award, ShieldCheck, Sparkles, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Account: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-800">
      {/* Porcelain Canvas Header matching Reference Theme */}
      <div className="porcelain-canvas rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative border border-slate-300/40 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="flex items-center space-x-5">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 border-4 border-white text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl font-tamil shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-black uppercase tracking-wider mb-1.5 shadow-sm">
              <Sparkles size={11} className="text-amber-600" />
              <span>Gold Tier Passenger</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-tamil tracking-tight">
              {user?.name || 'Mohan Kumar'}
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-0.5">{user?.email}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Member since {user?.memberSince || '2024'} • Verified Identity
            </p>
          </div>
        </div>

        {/* Loyalty Points Card */}
        <div className="organic-blob-weather p-6 text-center min-w-[220px] shadow-lg">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-bold">
            Mariamman Club Points
          </span>
          <div className="text-4xl font-black text-blue-600 mt-1">
            {user?.loyaltyPoints || 450}
          </div>
          <p className="text-xs text-emerald-600 font-bold mt-1">
            ₹{(user?.loyaltyPoints || 450) * 0.5} Instant Discount Available
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Information Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[2.25rem] p-7 md:p-8 space-y-6 shadow-xl text-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <User size={18} className="text-blue-600" />
              <span>Personal Details</span>
            </h2>
            {isSaved && (
              <span className="text-xs text-emerald-600 flex items-center space-x-1 font-bold animate-fade-in">
                <Check size={14} />
                <span>Changes Saved!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address (Permanent)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 cursor-not-allowed font-medium"
              />
              <span className="text-[10px] text-slate-400 mt-1 block font-medium">Verified contact email</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number (SMS & WhatsApp Telemetry)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all active:scale-95 border border-blue-400/30"
              >
                Save Profile Updates
              </button>
            </div>
          </form>
        </div>

        {/* Quick Shortcuts & Security */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-slate-200/90 rounded-[2.25rem] p-7 space-y-4 shadow-xl text-slate-800">
            <h3 className="text-base font-black text-slate-900">Traveler Dashboard</h3>
            
            <div className="space-y-2">
              <Link
                to="/bookings"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 transition-all text-xs font-bold text-slate-800 group"
              >
                <div className="flex items-center space-x-2.5">
                  <Ticket size={16} className="text-emerald-600" />
                  <span>My Active & Past Bookings</span>
                </div>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                to="/search"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 transition-all text-xs font-bold text-slate-800 group"
              >
                <div className="flex items-center space-x-2.5">
                  <Award size={16} className="text-blue-600" />
                  <span>Explore Sleeper Routes</span>
                </div>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                to="/login"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 transition-all text-xs font-bold text-slate-800 group"
              >
                <div className="flex items-center space-x-2.5">
                  <Sparkles size={16} className="text-amber-500" />
                  <span>Re-watch Cinematic Intro Video</span>
                </div>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <LogOut size={14} />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
