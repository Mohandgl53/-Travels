import React, { useState } from 'react';
import { Star, Radio, Clock, ChevronDown, ChevronUp, MapPin, Zap, Wind, ShieldCheck, Coffee } from 'lucide-react';
import { BusTrip } from '../data/travelData';

interface BusCardProps {
  trip: BusTrip;
  onSelectSeats: (trip: BusTrip) => void;
  isSelected?: boolean;
}

export const BusCard: React.FC<BusCardProps> = ({ trip, onSelectSeats, isSelected = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={`rounded-[2rem] border transition-all duration-300 overflow-hidden ${
        isSelected
          ? 'bg-[#101524] border-blue-500 shadow-2xl ring-2 ring-blue-500/30'
          : 'bg-[#101524] hover:border-blue-500/40 border-white/10 shadow-xl hover:-translate-y-0.5'
      }`}
    >
      <div className="p-6 md:p-7">
        {/* Top Header: Operator & Service Type */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black font-tamil text-lg shadow-lg border border-blue-400/30">
              மா
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-white font-tamil">
                  {trip.operator}
                </h3>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/[0.08] text-slate-200 font-bold border border-white/10">
                  {trip.busNumber}
                </span>
              </div>
              <p className="text-xs text-sky-400 font-bold mt-0.5 flex items-center space-x-2">
                <span>{trip.serviceType}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-normal">Sanitized Luxury Cabin</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {trip.liveTracking && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-sm">
                <Radio size={12} className="animate-pulse text-emerald-400" />
                <span>Live GPS</span>
              </span>
            )}

            <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{trip.rating}</span>
              <span className="text-slate-400 font-normal">({trip.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Schedule & Route Timeline */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Departure */}
          <div className="md:col-span-3">
            <div className="text-3xl font-black text-white tracking-tight">
              {trip.departureTime}
            </div>
            <div className="text-base font-bold text-slate-100 mt-1">{trip.from}</div>
            <p className="text-xs text-slate-400 truncate max-w-[210px] mt-0.5 flex items-center gap-1">
              <MapPin size={11} className="text-blue-400 shrink-0" />
              <span>{trip.boardingPoints[0]?.location}</span>
            </p>
          </div>

          {/* Journey Duration Line */}
          <div className="md:col-span-3 flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Clock size={13} className="text-sky-400" />
              <span>{trip.duration}</span>
            </span>
            <div className="w-full flex items-center space-x-1 px-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-md ring-2 ring-blue-500/30" />
              <div className="flex-1 border-t-2 border-dashed border-slate-600 relative">
                <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 text-[10px] text-sky-300 bg-[#101524] px-2 font-black uppercase tracking-wider">
                  Express
                </span>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-md ring-2 ring-emerald-400/30" />
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-1.5">Non-stop Highway Corridor</span>
          </div>

          {/* Arrival */}
          <div className="md:col-span-3">
            <div className="text-3xl font-black text-white tracking-tight">
              {trip.arrivalTime}
            </div>
            <div className="text-base font-bold text-slate-100 mt-1">{trip.to}</div>
            <p className="text-xs text-slate-400 truncate max-w-[210px] mt-0.5 flex items-center gap-1">
              <MapPin size={11} className="text-emerald-400 shrink-0" />
              <span>{trip.droppingPoints[0]?.location}</span>
            </p>
          </div>

          {/* Fare & CTA */}
          <div className="md:col-span-3 md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-white/[0.08]">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Starting from</div>
            <div className="text-3xl font-black text-white">
              ₹{trip.fare}
            </div>
            <div className="text-xs text-emerald-400 font-bold mb-3 flex items-center md:justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{trip.availableSeats} Berths Available</span>
            </div>

            <button
              onClick={() => onSelectSeats(trip)}
              className="w-full py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 active:scale-95 transition-all border border-blue-400/30 hover:scale-[1.02]"
            >
              {isSelected ? 'Change Selected Seats' : 'Select Sleeper Berths'}
            </button>
          </div>
        </div>

        {/* Amenities Bar */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 text-[11px]">
              <Zap size={12} className="text-amber-400" />
              <span>USB Fast Charging</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 text-[11px]">
              <Coffee size={12} className="text-emerald-400" />
              <span>Mineral Water & Blanket</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 text-[11px]">
              <Wind size={12} className="text-sky-400" />
              <span>Individual AC Climate</span>
            </span>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 font-semibold transition-colors"
          >
            <span>{showDetails ? 'Hide Boarding Points' : 'View Boarding Points'}</span>
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Expandable Boarding & Dropping Points */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fade-in bg-white/[0.02] p-4 rounded-2xl">
            <div>
              <span className="font-bold text-sky-300 uppercase tracking-wider block mb-2">
                Boarding Points in {trip.from}:
              </span>
              <ul className="space-y-1.5">
                {trip.boardingPoints.map((bp, i) => (
                  <li key={i} className="flex justify-between text-slate-300">
                    <span>{bp.location}</span>
                    <strong className="text-white">{bp.time}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-emerald-300 uppercase tracking-wider block mb-2">
                Dropping Points in {trip.to}:
              </span>
              <ul className="space-y-1.5">
                {trip.droppingPoints.map((dp, i) => (
                  <li key={i} className="flex justify-between text-slate-300">
                    <span>{dp.location}</span>
                    <strong className="text-white">{dp.time}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
