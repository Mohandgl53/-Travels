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
    { id: 'U15', type: 'double-2', status: 'booked' },
  ];

  const toggleSeat = (seatId: string, status: string) => {
    if (status === 'booked') return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        alert('Maximum 6 sleeper berths can be selected per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalFare = selectedSeats.length * trip.fare;

  const renderSeatButton = (seat: { id: string; type: string; status: string }) => {
    const isSelected = selectedSeats.includes(seat.id);
    const isBooked = seat.status === 'booked';
    const isLadies = seat.status === 'ladies';

    let btnStyle = 'bg-white border-2 border-slate-300 text-slate-700 hover:border-blue-500 shadow-sm';
    if (isBooked) {
      btnStyle = 'bg-slate-100 border-2 border-slate-200 text-slate-400 cursor-not-allowed opacity-60';
    } else if (isSelected) {
      btnStyle = 'bg-blue-600 border-2 border-blue-600 text-white shadow-lg shadow-blue-600/30 font-black scale-105';
    } else if (isLadies) {
      btnStyle = 'bg-pink-50 border-2 border-pink-300 text-pink-700 hover:border-pink-500';
    }

    return (
      <button
        key={seat.id}
        type="button"
        disabled={isBooked}
        onClick={() => toggleSeat(seat.id, seat.status)}
        className={`w-14 h-24 rounded-2xl flex flex-col justify-between p-2 font-mono text-xs font-bold transition-all ${btnStyle}`}
      >
        <span className="text-[10px] text-right font-bold opacity-75">{seat.id}</span>
        <div className="w-full h-1 bg-current opacity-25 rounded-full" />
        <span className="text-[9px] uppercase tracking-tighter text-center">
          {isBooked ? 'Sold' : isSelected ? 'Picked' : isLadies ? 'Ladies' : '₹' + trip.fare}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white border-4 border-slate-200/90 rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden my-auto text-slate-800">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#faf8f5] text-slate-900">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black font-tamil">{trip.operator}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                {trip.serviceType}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              {trip.from} → {trip.to} • {trip.departureTime} departure
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Deck & Seat Grid Area */}
          <div className="lg:col-span-7 space-y-5">
            {/* Deck Selector Tabs */}
            <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveDeck('lower')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  activeDeck === 'lower'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
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
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upper Deck (மேல் அடுக்கு)
              </button>
            </div>

            {/* Bus Cabin Visual Layout */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-200 text-xs font-bold text-slate-600">
                <span className="flex items-center space-x-1.5">
                  <CircleDot size={14} className="text-blue-600" />
                  <span>Driver Cabin / Front</span>
                </span>
                <span className="font-extrabold text-blue-600 uppercase tracking-wider">{activeDeck} Deck</span>
              </div>

              {/* Rows of Sleeper Berths */}
              <div className="grid grid-cols-3 gap-3 justify-items-center">
                {/* Column 1: Single Berth */}
                <div className="flex flex-col space-y-3">
                  <span className="text-[11px] font-bold text-slate-500 text-center">Single</span>
                  {(activeDeck === 'lower' ? lowerDeckSeats : upperDeckSeats)
                    .filter((s) => s.type === 'single')
                    .map(renderSeatButton)}
                </div>

                {/* Column 2: Gangway / Aisle */}
                <div className="w-10 border-x border-dashed border-slate-300 flex items-center justify-center bg-slate-100/50 rounded-lg">
                  <span className="text-[11px] font-black text-slate-400 transform -rotate-90 tracking-widest uppercase">
                    Aisle
                  </span>
                </div>

                {/* Column 3: Double Berths */}
                <div className="flex flex-col space-y-3">
                  <span className="text-[11px] font-bold text-slate-500 text-center">Double Shared</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(activeDeck === 'lower' ? lowerDeckSeats : upperDeckSeats)
                      .filter((s) => s.type.startsWith('double'))
                      .map(renderSeatButton)}
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Legend */}
            <div className="flex flex-wrap items-center justify-around gap-2 text-xs font-bold text-slate-600 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-white border-2 border-slate-300 shadow-xs" />
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-blue-600 border border-blue-600" />
                <span>Selected</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-pink-50 border-2 border-pink-300" />
                <span>Ladies Only</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-slate-200 border border-slate-300" />
                <span>Booked</span>
              </div>
            </div>
          </div>

          {/* Right Side: Boarding Selection & Price Summary */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Selected Seats Banner */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Selected Berths:</span>
                <div className="flex items-center space-x-2 mt-1.5">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-xl bg-blue-600 text-white font-mono font-black text-xs shadow-md border border-blue-500"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-blue-600 font-medium">Please select a berth from the cabin layout</span>
                  )}
                </div>
              </div>

              {/* Boarding Point Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Boarding Point ({trip.from})
                </label>
                <select
                  value={boardingPoint}
                  onChange={(e) => setBoardingPoint(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 shadow-inner cursor-pointer"
                >
                  {trip.boardingPoints.map((bp, i) => (
                    <option key={i} value={`${bp.location} (${bp.time})`} className="bg-white text-slate-900">
                      {bp.location} — {bp.time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropping Point Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Dropping Point ({trip.to})
                </label>
                <select
                  value={droppingPoint}
                  onChange={(e) => setDroppingPoint(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 shadow-inner cursor-pointer"
                >
                  {trip.droppingPoints.map((dp, i) => (
                    <option key={i} value={`${dp.location} (${dp.time})`} className="bg-white text-slate-900">
                      {dp.location} — {dp.time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Calculation Table */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs font-bold">
                <div className="flex justify-between text-slate-600">
                  <span>Base Berth Fare ({selectedSeats.length} berth)</span>
                  <span className="text-slate-900 font-black">₹{totalFare}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Toll & Highway Maintenance</span>
                  <span className="text-emerald-700 font-black">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST & Passenger Insurance (5%)</span>
                  <span className="text-slate-900 font-black">₹{Math.round(totalFare * 0.05)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Total Payable Amount</span>
                  <span className="text-blue-600 text-2xl font-black">₹{Math.round(totalFare * 1.05)}</span>
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
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 active:scale-98 transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-blue-400/30"
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
