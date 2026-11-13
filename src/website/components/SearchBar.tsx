import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowRightLeft, Search } from 'lucide-react';
import { TAMIL_NADU_CITIES } from '../data/travelData';

interface SearchBarProps {
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string;
  onSearch?: (from: string, to: string, date: string) => void;
  compact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialFrom = 'Chennai',
  initialTo = 'Madurai',
  initialDate,
  onSearch,
  compact = false,
}) => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [journeyDate, setJourneyDate] = useState(
    initialDate || new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );

  const handleSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(fromCity, toCity, journeyDate);
    } else {
      navigate(`/search?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${journeyDate}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-[#111625]/95 backdrop-blur-2xl rounded-3xl p-5 md:p-7 shadow-2xl border border-white/10 relative z-20 ${
        compact ? 'max-w-5xl mx-auto -mt-10' : 'w-full'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
        {/* From City */}
        <div className="md:col-span-4 relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            From (புறப்படும் இடம்)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-400">
              <MapPin size={18} />
            </span>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-[#0a0d16] hover:bg-[#0d121f] border border-white/10 rounded-2xl text-white font-semibold text-sm appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-inner"
            >
              {TAMIL_NADU_CITIES.map((city) => (
                <option key={city} value={city} disabled={city === toCity} className="bg-[#0f1422] text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="hidden md:flex md:col-span-1 justify-center pt-6">
          <button
            type="button"
            onClick={handleSwap}
            className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:rotate-180 shadow-md active:scale-90"
            title="Swap cities"
          >
            <ArrowRightLeft size={16} />
          </button>
        </div>

        {/* To City */}
        <div className="md:col-span-4 relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            To (சேரும் இடம்)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
              <MapPin size={18} />
            </span>
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-[#0a0d16] hover:bg-[#0d121f] border border-white/10 rounded-2xl text-white font-semibold text-sm appearance-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer shadow-inner"
            >
              {TAMIL_NADU_CITIES.map((city) => (
                <option key={city} value={city} disabled={city === fromCity} className="bg-[#0f1422] text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="md:col-span-3 relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Date of Journey
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-400">
              <Calendar size={18} />
            </span>
            <input
              type="date"
              value={journeyDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setJourneyDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-[#0a0d16] hover:bg-[#0d121f] border border-white/10 rounded-2xl text-white font-semibold text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Quick shortcuts and search action */}
      <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs text-slate-400 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="font-bold text-slate-400 shrink-0 uppercase tracking-wider text-[10px]">Popular:</span>
          {['Madurai', 'Coimbatore', 'Tirunelveli', 'Trichy'].map((dest) => (
            <button
              key={dest}
              type="button"
              onClick={() => {
                setFromCity('Chennai');
                setToCity(dest);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-blue-600/20 hover:text-blue-300 text-slate-300 font-medium text-xs shrink-0 transition-colors border border-white/10"
            >
              Chennai → {dest}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all border border-blue-400/30"
        >
          <Search size={18} />
          <span>Search Buses (பயணம் காண்க)</span>
        </button>
      </div>
    </form>
  );
};
