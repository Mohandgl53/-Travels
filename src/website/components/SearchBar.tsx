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
      className={`bg-white/95 backdrop-blur-2xl rounded-[2.25rem] p-6 md:p-8 shadow-2xl border-4 border-white relative z-20 ${
        compact ? 'max-w-5xl mx-auto -mt-6' : 'w-full'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* From City */}
        <div className="md:col-span-4 relative">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
            From (புறப்படும் இடம்)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-600">
              <MapPin size={18} />
            </span>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-inner"
            >
              {TAMIL_NADU_CITIES.map((city) => (
                <option key={city} value={city} disabled={city === toCity} className="bg-white text-slate-900 font-medium">
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
            className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-50 border border-slate-200 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-all hover:rotate-180 shadow-md active:scale-90"
            title="Swap origin and destination"
          >
            <ArrowRightLeft size={16} />
          </button>
        </div>

        {/* To City */}
        <div className="md:col-span-4 relative">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
            To (சேரும் இடம்)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600">
              <MapPin size={18} />
            </span>
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm appearance-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer shadow-inner"
            >
              {TAMIL_NADU_CITIES.map((city) => (
                <option key={city} value={city} disabled={city === fromCity} className="bg-white text-slate-900 font-medium">
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Journey Date */}
        <div className="md:col-span-3 relative">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
            Date of Journey
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-600">
              <Calendar size={18} />
            </span>
            <input
              type="date"
              value={journeyDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setJourneyDate(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Row: Popular Route Pills + Search Button */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">Popular:</span>
          {[
            { from: 'Chennai', to: 'Madurai' },
            { from: 'Chennai', to: 'Coimbatore' },
            { from: 'Chennai', to: 'Tirunelveli' },
            { from: 'Chennai', to: 'Tiruchirappalli', label: 'Chennai → Trichy' },
          ].map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setFromCity(r.from);
                setToCity(r.to);
              }}
              className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-all hover:scale-105"
            >
              {r.label || `${r.from} → ${r.to}`}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all active:scale-95 border border-blue-400/40"
        >
          <Search size={16} />
          <span>Search Buses (பயணம் காண்க)</span>
        </button>
      </div>
    </form>
  );
};
