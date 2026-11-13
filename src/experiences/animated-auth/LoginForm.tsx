import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoginFormProps {
  onSuccess: (emailOrPhone: string, password: string) => Promise<void>;
  onSwitchToRegister: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
  isLoading,
  isSuccess,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('mohan@mariammantravels.com');
  const [password, setPassword] = useState('Mariamman@2026');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setError('Please enter your email or 10-digit mobile number');
      return;
    }
    setError(null);
    try {
      await onSuccess(emailOrPhone, password);
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please check credentials.');
    }
  };

  const handleFillDemo = (name: string, email: string) => {
    setEmailOrPhone(email);
    setPassword('TravelSecure#99');
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel-luxury rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden border border-white/20">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center justify-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold mb-3">
            <Sparkles size={13} className="text-sky-400" />
            <span>Passenger Portal</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-tamil text-white drop-shadow-sm">
            மாரியம்மன் Travels
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            Welcome aboard! Sign in to access trips & bookings
          </p>
        </div>

        {/* Success State Overlay */}
        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/40 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-white font-tamil">பயணம் தொடங்குகிறது!</h3>
            <p className="text-xs text-emerald-300 font-medium tracking-wide">
              Credentials verified. Preparing bus departure...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Email or Phone Input */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email or Mobile Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="e.g. mohan@travels.com or 9842100000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white placeholder-slate-400 text-sm outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => handleFillDemo('Traveler', 'traveler@mariammantravels.com')}
                  className="text-[11px] text-sky-300 hover:text-sky-200 underline font-medium"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white placeholder-slate-400 text-sm outline-none"
                  required
                />
              </div>
            </div>

            {/* Quick Demo Fill Buttons */}
            <div className="pt-1">
              <p className="text-[11px] text-slate-400 mb-1.5 flex items-center space-x-1">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>Quick Demo Accounts:</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillDemo('Mohan Kumar', 'mohan@mariammantravels.com')}
                  className="text-left px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] text-slate-200 truncate transition-colors"
                >
                  👤 Mohan Kumar
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('Kavitha S', 'kavitha@chennaitravels.in')}
                  className="text-left px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] text-slate-200 truncate transition-colors"
                >
                  👤 Kavitha S
                </button>
              </div>
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
                  <span>Verifying Passenger...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Board Bus</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Switch to Register */}
            <div className="pt-2 text-center text-xs text-slate-300">
              New passenger?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-semibold text-sky-300 hover:text-sky-200 underline"
              >
                Create Account (பதிவு செய்க)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
