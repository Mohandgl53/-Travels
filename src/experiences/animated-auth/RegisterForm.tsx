import React, { useState } from 'react';
import { User as UserIcon, Mail, Phone, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface RegisterFormProps {
  onSuccess: (name: string, email: string, phone: string, password: string) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
  isLoading,
  isSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('Please provide a valid 10-digit mobile number');
      return;
    }
    setError(null);
    try {
      await onSuccess(name, email, phone, password);
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Please try again.');
    }
  };

  const handlePreFill = () => {
    setName('Mohan Kumar');
    setEmail('mohan@mariammantravels.com');
    setPhone('+91 98421 88990');
    setPassword('SecurePass2026');
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel-luxury rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden border border-white/20">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-5 relative z-10">
          <div className="inline-flex items-center justify-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold mb-2">
            <Sparkles size={13} className="text-sky-400" />
            <span>Passenger Registration</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-tamil text-white drop-shadow-sm">
            மாரியம்மன் Travels
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Register your passenger profile & enjoy 100 welcome reward points
          </p>
        </div>

        {/* Success State Overlay */}
        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/40 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-white font-tamil">பதிவு வெற்றிகரமானது!</h3>
            <p className="text-xs text-emerald-300 font-medium tracking-wide">
              Passenger profile registered. Boarding bus now...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name (முழு பெயர்)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <UserIcon size={16} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohan Kumar"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white placeholder-slate-400 text-sm outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. mohan@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white placeholder-slate-400 text-sm outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Mobile Number (அலைபேசி)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98421 00000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white placeholder-slate-400 text-sm outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white placeholder-slate-400 text-sm outline-none"
                  required
                />
              </div>
            </div>

            {/* Quick Fill Button */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={handlePreFill}
                className="text-[11px] text-sky-300 hover:text-sky-200 underline font-medium"
              >
                ⚡ Autofill Demo Information
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-blue-950/60 border border-blue-400/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering Passenger...</span>
                </>
              ) : (
                <>
                  <span>Register & Board Bus</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Switch to Login */}
            <div className="pt-2 text-center text-xs text-slate-300">
              Already have a ticket or account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-semibold text-sky-300 hover:text-sky-200 underline"
              >
                Sign In (உள்நுழைக)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
