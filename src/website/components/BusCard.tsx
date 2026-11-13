import React, { useState } from 'react';
import { Star, Radio, Clock, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
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
      className={`rounded-3xl border transition-all ${
        isSelected
          ? 'bg-[#111625] border-blue-500 shadow-2xl ring-2 ring-blue-500/20'
          : 'bg-[#111625] hover:border-blue-500/40 border-white/10 shadow-xl'
      }`}
    >
      <div className="p-6 md:p-7">
        {/* Top Header: Operator & Service Type */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black font-tamil text-base shadow-md border border-blue-400/30">
              மா
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white font-tamil">
                  {trip.operator}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 font-bold border border-white/10">
                  {trip.busNumber}
                </span>
              </div>
              <p className="text-xs text-blue-400 font-bold mt-0.5">
                {trip.serviceType}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {trip.liveTracking && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Radio size={12} className="animate-pulse text-emerald-400" />
                <span>Live GPS</span>
              </span>
            )}

            <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{trip.rating}</span>
              <span className="text-slate-400 font-normal">({trip.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Schedule & Route Info */}
        <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Departure */}
          <div className="md:col-span-3">
            <div className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {trip.departureTime}
            </div>
            <div className="text-base font-bold text-slate-200 mt-0.5">{trip.from}</div>
            <p className="text-xs text-slate-400 truncate max-w-[200px] mt-0.5">
              {trip.boardingPoints[0]?.location}
            </p>
          </div>

          {/* Journey Duration Line */}
          <div className="md:col-span-3 flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-slate-400 mb-1 flex items-center space-x-1">
              <Clock size={13} />
              <span>{trip.duration}</span>
            </span>
            <div className="w-full flex items-center space-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <div className="flex-1 border-t border-dashed border-slate-600 relative">
                <span className="absolute left-1/2 -top-2.5 transform -translate-x-1/2 text-[10px] text-slate-300 bg-[#111625] px-1.5 font-bold uppercase">
                  Express
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-1">Non-stop Corridor</span>
          </div>

          {/* Arrival */}
          <div className="md:col-span-3">
            <div className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {trip.arrivalTime}
            </div>
            <div className="text-base font-bold text-slate-200 mt-0.5">{trip.to}</div>
            <p className="text-xs text-slate-400 truncate max-w-[200px] mt-0.5">
              {trip.droppingPoints[0]?.location}
            </p>
          </div>

          {/* Fare & CTA */}
          <div className="md:col-span-3 md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-white/[0.08]">
            <div className="text-xs text-slate-400 font-medium">Starting from</div>
            <div className="text-3xl font-black text-white">
              ₹{trip.fare}
            </div>
            <div className="text-xs text-emerald-400 font-semibold mb-2">
              {trip.availableSeats} Seats Available
            </div>

            <button
              onClick={() => onSelectSeats(trip)}
              className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 active:scale-95 transition-all border border-blue-400/30"
            >
              {isSelected ? 'Change Seats' : 'Select Seats'}
            </button>
          </div>
        </div>

        {/* Amenities Bar */}
        <div className="pt-3.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-1.5">
            {trip.amenities.slice(0, 4).map((amenity, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white/[0.05] text-slate-300 text-xs font-medium border border-white/10"
              >
                {amenity}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-semibold"
          >
            <span>{showDetails ? 'Hide Points' : 'Boarding & Dropping Points'}</span>
            {showDetails ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>

        {/* Expanded Boarding & Dropping Points */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fade-in bg-[#0a0d16] p-5 rounded-2xl border border-white/10">
            <div>
              <p className="font-bold text-white mb-2 flex items-center space-x-1.5 text-blue-400">
                <MapPin size={15} />
                <span>Boarding Points ({trip.from})</span>
              </p>
              <ul className="space-y-2 text-slate-400">
                {trip.boardingPoints.map((bp, idx) => (
                  <li key={idx} className="flex justify-between border-b border-white/[0.06] pb-1.5">
                    <span className="font-medium text-slate-300">{bp.location}</span>
                    <strong className="text-white font-mono">{bp.time}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-2 flex items-center space-x-1.5 text-teal-400">
                <MapPin size={15} />
                <span>Dropping Points ({trip.to})</span>
              </p>
              <ul className="space-y-2 text-slate-400">
                {trip.droppingPoints.map((dp, idx) => (
                  <li key={idx} className="flex justify-between border-b border-white/[0.06] pb-1.5">
                    <span className="font-medium text-slate-300">{dp.location}</span>
                    <strong className="text-white font-mono">{dp.time}</strong>
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
