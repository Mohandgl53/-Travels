import React, { useState } from 'react';
import { Star, Radio, Clock, ChevronDown, ChevronUp, MapPin, Zap, Wind, ShieldCheck, Coffee } from 'lucide-react';
import { BusTrip } from '../data/travelData';
import { BrandEmblem } from './BrandLogo';

interface BusCardProps {
  trip: BusTrip;
  onSelectSeats: (trip: BusTrip) => void;
  isSelected?: boolean;
}

export const BusCard: React.FC<BusCardProps> = ({ trip, onSelectSeats, isSelected = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={`rounded-[2.25rem] border-2 transition-all duration-300 overflow-hidden ${
        isSelected
          ? 'bg-white border-blue-500 shadow-2xl ring-4 ring-blue-500/10'
          : 'bg-white hover:border-blue-400/60 border-slate-200/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
      }`}
    >
      <div className="p-6 md:p-7 text-slate-800">
        {/* Top Header: Operator & Service Type */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3.5">
            <BrandEmblem size="md" />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-slate-900 font-tamil">
                  {trip.operator}
                </h3>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  {trip.busNumber}
                </span>
              </div>
              <p className="text-xs text-blue-600 font-bold mt-0.5 flex items-center space-x-2">
                <span>{trip.serviceType}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">Sanitized Sleeper Fleet</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {trip.liveTracking && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-sm">
                <Radio size={12} className="animate-pulse text-emerald-600" />
                <span>Live GPS</span>
              </span>
            )}

            <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-sm">
              <Star size={13} className="fill-amber-500 text-amber-500" />
              <span>{trip.rating}</span>
              <span className="text-slate-500 font-normal">({trip.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Schedule & Route Timeline */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Departure */}
          <div className="md:col-span-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {trip.departureTime}
            </div>
            <div className="text-base font-extrabold text-slate-800 mt-1">{trip.from}</div>
            <p className="text-xs text-slate-500 truncate max-w-[210px] mt-0.5 flex items-center gap-1 font-medium">
              <MapPin size={11} className="text-blue-600 shrink-0" />
              <span>{trip.boardingPoints[0]?.location}</span>
            </p>
          </div>

          {/* Journey Duration Line */}
          <div className="md:col-span-3 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-600 mb-1.5 flex items-center space-x-1.5">
              <Clock size={13} className="text-blue-600" />
              <span>{trip.duration}</span>
            </span>
            <div className="w-full flex items-center space-x-1 px-2">
              <div className="w-3 h-3 rounded-full bg-blue-600 shadow-sm ring-2 ring-blue-600/20" />
              <div className="flex-1 border-t-2 border-dashed border-slate-300 relative">
                <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 text-[10px] text-blue-700 bg-white px-2 font-black uppercase tracking-wider border border-slate-200 rounded-full shadow-xs">
                  Express
                </span>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm ring-2 ring-emerald-500/20" />
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-1.5">Non-stop Highway Corridor</span>
          </div>

          {/* Arrival */}
          <div className="md:col-span-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {trip.arrivalTime}
            </div>
            <div className="text-base font-extrabold text-slate-800 mt-1">{trip.to}</div>
            <p className="text-xs text-slate-500 truncate max-w-[210px] mt-0.5 flex items-center gap-1 font-medium">
              <MapPin size={11} className="text-emerald-600 shrink-0" />
              <span>{trip.droppingPoints[0]?.location}</span>
            </p>
          </div>

          {/* Fare & CTA */}
          <div className="md:col-span-3 md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Starting from</div>
            <div className="text-3xl font-black text-slate-900">
              ₹{trip.fare}
            </div>
            <div className="text-xs text-emerald-600 font-bold mb-3 flex items-center md:justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>{trip.availableSeats} Berths Available</span>
            </div>

            <button
              onClick={() => onSelectSeats(trip)}
              className="w-full py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 active:scale-95 transition-all border border-blue-400/30 hover:scale-[1.02]"
            >
              {isSelected ? 'Change Selected Seats' : 'Select Sleeper Berths'}
            </button>
          </div>
        </div>

        {/* Amenities Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
              <Zap size={12} className="text-amber-500" />
              <span>USB Fast Charging</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
              <Coffee size={12} className="text-emerald-600" />
              <span>Mineral Water & Blanket</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
              <Wind size={12} className="text-blue-600" />
              <span>Individual AC Climate</span>
            </span>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-slate-500 hover:text-blue-600 flex items-center space-x-1 font-bold transition-colors"
          >
            <span>{showDetails ? 'Hide Boarding Points' : 'View Boarding Points'}</span>
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Expandable Boarding & Dropping Points */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fade-in bg-slate-50 p-4 rounded-2xl">
            <div>
              <span className="font-bold text-blue-700 uppercase tracking-wider block mb-2">
                Boarding Points in {trip.from}:
              </span>
              <ul className="space-y-1.5">
                {trip.boardingPoints.map((bp, i) => (
                  <li key={i} className="flex justify-between text-slate-700 font-medium">
                    <span>{bp.location}</span>
                    <strong className="text-slate-900 font-bold">{bp.time}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                Dropping Points in {trip.to}:
              </span>
              <ul className="space-y-1.5">
                {trip.droppingPoints.map((dp, i) => (
                  <li key={i} className="flex justify-between text-slate-700 font-medium">
                    <span>{dp.location}</span>
                    <strong className="text-slate-900 font-bold">{dp.time}</strong>
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
