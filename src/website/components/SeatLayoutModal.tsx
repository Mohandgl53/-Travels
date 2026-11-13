import React, { useState } from 'react';
import { X, ArrowRight, CircleDot } from 'lucide-react';
import { BusTrip } from '../data/travelData';

interface SeatLayoutModalProps {
  trip: BusTrip;
  onClose: () => void;
  onProceedToBooking: (
    selectedSeats: string[],
    boardingPoint: string,
    droppingPoint: string,
    totalFare: number
  ) => void;
}

export const SeatLayoutModal: React.FC<SeatLayoutModalProps> = ({
  trip,
  onClose,
  onProceedToBooking,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['L4']);
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');
  const [boardingPoint, setBoardingPoint] = useState(
    trip.boardingPoints[0] ? `${trip.boardingPoints[0].location} (${trip.boardingPoints[0].time})` : ''
  );
  const [droppingPoint, setDroppingPoint] = useState(
    trip.droppingPoints[0] ? `${trip.droppingPoints[0].location} (${trip.droppingPoints[0].time})` : ''
  );

  const lowerDeckSeats = [
    { id: 'L1', type: 'single', status: 'available' },
    { id: 'L2', type: 'double-1', status: 'booked' },
    { id: 'L3', type: 'double-2', status: 'booked' },
    { id: 'L4', type: 'single', status: 'available' },
    { id: 'L5', type: 'double-1', status: 'available' },
    { id: 'L6', type: 'double-2', status: 'ladies' },
    { id: 'L7', type: 'single', status: 'available' },
    { id: 'L8', type: 'double-1', status: 'available' },
    { id: 'L9', type: 'double-2', status: 'available' },
    { id: 'L10', type: 'single', status: 'booked' },
    { id: 'L11', type: 'double-1', status: 'available' },
    { id: 'L12', type: 'double-2', status: 'available' },
    { id: 'L13', type: 'single', status: 'available' },
    { id: 'L14', type: 'double-1', status: 'booked' },
    { id: 'L15', type: 'double-2', status: 'booked' },
  ];

  const upperDeckSeats = [
    { id: 'U1', type: 'single', status: 'available' },
    { id: 'U2', type: 'double-1', status: 'available' },
    { id: 'U3', type: 'double-2', status: 'available' },
    { id: 'U4', type: 'single', status: 'available' },
    { id: 'U5', type: 'double-1', status: 'ladies' },
    { id: 'U6', type: 'double-2', status: 'ladies' },
    { id: 'U7', type: 'single', status: 'booked' },
    { id: 'U8', type: 'double-1', status: 'available' },
    { id: 'U9', type: 'double-2', status: 'available' },
    { id: 'U10', type: 'single', status: 'available' },
    { id: 'U11', type: 'double-1', status: 'available' },
    { id: 'U12', type: 'double-2', status: 'available' },
    { id: 'U13', type: 'single', status: 'available' },
    { id: 'U14', type: 'double-1', status: 'available' },
    { id: 'U15', type: 'double-2', status: 'available' },
  ];

  const toggleSeat = (id: string, status: string) => {
    if (status === 'booked') return;
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== id));
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can select up to 6 seats per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, id]);
    }
  };

  const totalFare = selectedSeats.length * trip.fare;

  const renderSeatButton = (seat: { id: string; status: string }) => {
    const isSelected = selectedSeats.includes(seat.id);
    let bg = 'bg-[#161d30] border-white/10 text-slate-200 hover:border-blue-400 shadow-sm';

    if (seat.status === 'booked') {
      bg = 'bg-[#0b0e17] border-white/5 text-slate-600 cursor-not-allowed';
    } else if (seat.status === 'ladies') {
      bg = 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300 hover:border-indigo-400';
    }

    if (isSelected) {
      bg = 'bg-blue-600 border-blue-400 text-white font-bold shadow-lg shadow-blue-600/30 scale-105';
    }

    return (
      <button
        key={seat.id}
        type="button"
        disabled={seat.status === 'booked'}
        onClick={() => toggleSeat(seat.id, seat.status)}
        className={`w-14 h-24 rounded-2xl border flex flex-col justify-between p-2 text-xs transition-all relative ${bg}`}
      >
        <span className="text-[11px] font-mono font-bold tracking-tight opacity-90">{seat.id}</span>
        {/* Pillow contour */}
        <div className={`w-full h-3 rounded-md ${isSelected ? 'bg-white/30' : 'bg-white/10'} mx-auto`} />
        <span className="text-[10px] font-bold">
          {seat.status === 'booked' ? 'Booked' : isSelected ? 'Selected' : `₹${trip.fare}`}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-[#111625] border border-white/10 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto text-slate-100">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#0a0d16] text-white">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black font-tamil">{trip.operator}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 font-semibold border border-blue-500/20">
                {trip.serviceType}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              {trip.from} → {trip.to} • {trip.departureTime} departure
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Deck & Seat Grid Area */}
          <div className="lg:col-span-7 space-y-5">
            {/* Deck Selector Tabs */}
            <div className="flex rounded-2xl bg-[#0a0d16] p-1.5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveDeck('lower')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  activeDeck === 'lower'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lower Deck (கீழ் அடுக்கு)
              </button>
              <button
                type="button"
                onClick={() => setActiveDeck('upper')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  activeDeck === 'upper'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Upper Deck (மேல் அடுக்கு)
              </button>
            </div>

            {/* Bus Cabin Visual Layout */}
            <div className="p-5 rounded-3xl bg-[#0a0d16] border border-white/10">
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-white/[0.08] text-xs font-bold text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <CircleDot size={14} className="text-blue-400" />
                  <span>Driver Cabin / Front</span>
                </span>
                <span className="font-extrabold text-blue-400 uppercase tracking-wider">{activeDeck} Deck</span>
              </div>

              {/* Rows of Sleeper Berths */}
              <div className="grid grid-cols-3 gap-3 justify-items-center">
                {/* Column 1: Single Berth */}
                <div className="flex flex-col space-y-3">
                  <span className="text-[11px] font-bold text-slate-400 text-center">Single</span>
                  {(activeDeck === 'lower' ? lowerDeckSeats : upperDeckSeats)
                    .filter((s) => s.type === 'single')
                    .map(renderSeatButton)}
                </div>

                {/* Column 2: Gangway / Aisle */}
                <div className="w-10 border-x border-dashed border-white/10 flex items-center justify-center bg-white/[0.02] rounded-lg">
                  <span className="text-[11px] font-black text-slate-500 transform -rotate-90 tracking-widest uppercase">
                    Aisle
                  </span>
                </div>

                {/* Column 3: Double Berths */}
                <div className="flex flex-col space-y-3">
                  <span className="text-[11px] font-bold text-slate-400 text-center">Double Shared</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(activeDeck === 'lower' ? lowerDeckSeats : upperDeckSeats)
                      .filter((s) => s.type.startsWith('double'))
                      .map(renderSeatButton)}
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Legend */}
            <div className="flex flex-wrap items-center justify-around gap-2 text-xs font-medium text-slate-400 p-3 rounded-2xl bg-[#0a0d16] border border-white/10">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-[#161d30] border border-white/20 shadow-sm" />
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-blue-600 border border-blue-400" />
                <span>Selected</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-indigo-950/60 border border-indigo-400/40" />
                <span>Ladies Only</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-[#0b0e17] border border-white/10" />
                <span>Booked</span>
              </div>
            </div>
          </div>

          {/* Right Side: Boarding Selection & Price Summary */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Selected Seats Banner */}
              <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Selected Berths:</span>
                <div className="flex items-center space-x-2 mt-1.5">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs shadow-md border border-blue-400/30"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-blue-400 font-medium">Please select a berth from the cabin layout</span>
                  )}
                </div>
              </div>

              {/* Boarding Point Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Boarding Point ({trip.from})
                </label>
                <select
                  value={boardingPoint}
                  onChange={(e) => setBoardingPoint(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#0a0d16] border border-white/10 text-xs font-medium text-white focus:outline-none focus:border-blue-500 shadow-inner cursor-pointer"
                >
                  {trip.boardingPoints.map((bp, i) => (
                    <option key={i} value={`${bp.location} (${bp.time})`} className="bg-[#0f1422] text-white">
                      {bp.location} — {bp.time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropping Point Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Dropping Point ({trip.to})
                </label>
                <select
                  value={droppingPoint}
                  onChange={(e) => setDroppingPoint(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#0a0d16] border border-white/10 text-xs font-medium text-white focus:outline-none focus:border-blue-500 shadow-inner cursor-pointer"
                >
                  {trip.droppingPoints.map((dp, i) => (
                    <option key={i} value={`${dp.location} (${dp.time})`} className="bg-[#0f1422] text-white">
                      {dp.location} — {dp.time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Calculation Table */}
              <div className="p-4 rounded-2xl bg-[#0a0d16] border border-white/10 space-y-2.5 text-xs font-medium">
                <div className="flex justify-between text-slate-400">
                  <span>Base Berth Fare ({selectedSeats.length} berth)</span>
                  <span className="text-white font-bold">₹{totalFare}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Toll & Highway Maintenance</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST & Passenger Insurance (5%)</span>
                  <span className="text-white font-bold">₹{Math.round(totalFare * 0.05)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-300">Total Payable Amount</span>
                  <span className="text-blue-400 text-xl font-black">₹{Math.round(totalFare * 1.05)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="button"
                disabled={selectedSeats.length === 0}
                onClick={() =>
                  onProceedToBooking(
                    selectedSeats,
                    boardingPoint,
                    droppingPoint,
                    Math.round(totalFare * 1.05)
                  )
                }
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 active:scale-98 transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-blue-400/30"
              >
                <span>Continue to Passenger Details</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
