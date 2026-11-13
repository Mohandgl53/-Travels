import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { User, Check, LogOut, Ticket, Heart } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-100">
      {/* Account Hero Bar */}
      <div className="rounded-3xl bg-[#0a0d16] border border-white/10 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-400/30 text-white font-black text-2xl flex items-center justify-center shadow-lg">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-tamil">{user?.name || 'Valued Passenger'}</h1>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                Gold Member
              </span>
              <span className="text-[11px] text-slate-400">Member since {user?.memberSince || '2024'}</span>
            </div>
          </div>
        </div>

        {/* Loyalty Points Card */}
        <div className="bg-[#111625] border border-white/10 rounded-2xl p-4 text-center min-w-[200px]">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">
            Mariamman Club Points
          </span>
          <div className="text-3xl font-black text-blue-400 mt-1">
            {user?.loyaltyPoints || 450}
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Worth ₹{(user?.loyaltyPoints || 450) * 0.5} on next ticket</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Information Form */}
        <div className="lg:col-span-7 bg-[#111625] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <User size={18} className="text-blue-400" />
              <span>Personal Details</span>
            </h2>
            {isSaved && (
              <span className="text-xs text-emerald-400 flex items-center space-x-1 animate-fade-in font-bold">
                <Check size={14} />
                <span>Saved!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0d16] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address (Registered)</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Email address cannot be changed</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (WhatsApp Enabled)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0d16] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/30 border border-blue-400/30"
            >
              Update Profile
            </button>
          </form>
        </div>

        {/* Quick Shortcuts & Preferences */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#111625] border border-white/10 rounded-3xl p-6 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Account Shortcuts
            </h3>
            <Link
              to="/bookings"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0a0d16] hover:bg-white/[0.05] border border-white/10 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <Ticket size={18} className="text-blue-400" />
                <span className="text-xs font-semibold text-slate-200">View Active Bookings</span>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-blue-400 font-bold">→</span>
            </Link>

            <Link
              to="/search"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0a0d16] hover:bg-white/[0.05] border border-white/10 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <Heart size={18} className="text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200">Book New Express Route</span>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-emerald-400 font-bold">→</span>
            </Link>
          </div>

          {/* Sign Out Card */}
          <div className="bg-[#111625] border border-white/10 rounded-3xl p-6 text-center space-y-3 shadow-xl">
            <h4 className="text-sm font-bold text-white">Sign Out of Session</h4>
            <p className="text-xs text-slate-400">
              You will be navigated back to the animated login experience.
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/30 text-rose-400 text-xs font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
