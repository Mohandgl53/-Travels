import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, ShieldCheck, User, Mail, CreditCard } from 'lucide-react';
import { BusTrip, BookingRecord } from '../data/travelData';
import { useAuth } from '../../auth/AuthContext';

interface BookingModalProps {
  trip: BusTrip;
  selectedSeats: string[];
  boardingPoint: string;
  droppingPoint: string;
  totalFare: number;
  journeyDate: string;
  onClose: () => void;
  onBookingSuccess: (record: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  trip,
  selectedSeats,
  boardingPoint,
  droppingPoint,
  totalFare,
  journeyDate,
  onClose,
  onBookingSuccess,
}) => {
  const { user } = useAuth();
  const [passengers, setPassengers] = useState(
    selectedSeats.map((seat, index) => ({
      name: index === 0 ? user?.name || '' : '',
      age: index === 0 ? 25 : 24,
      gender: 'Male' as 'Male' | 'Female' | 'Other',
      seatNumber: seat,
    }))
  );
  const [contactEmail, setContactEmail] = useState(user?.email || 'mohan@mariammantravels.com');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+91 98421 23456');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePassengerChange = (index: number, field: string, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise((r) => setTimeout(r, 1000));

    const pnr = 'MT-' + Math.floor(1000000 + Math.random() * 9000000);

    const booking: BookingRecord = {
      pnr,
      tripId: trip.id,
      from: trip.from,
      to: trip.to,
      journeyDate,
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      busType: trip.serviceType,
      busNumber: trip.busNumber,
      boardingPoint,
      droppingPoint,
      passengers,
      totalAmount: totalFare,
      bookedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'CONFIRMED',
      qrCode: `PNR:${pnr}|BUS:${trip.busNumber}|FROM:${trip.from}|TO:${trip.to}|SEATS:${selectedSeats.join(',')}`,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mariamman_bookings') || '[]');
      localStorage.setItem('mariamman_bookings', JSON.stringify([booking, ...existing]));
    } catch (e) {
      console.error(e);
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    setIsProcessing(false);
    onBookingSuccess(booking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in text-slate-100">
      <div className="bg-[#111625] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#0a0d16] text-white">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">Step 2 of 2</span>
            <h3 className="text-xl font-bold font-tamil">Passenger Details & Instant Payment</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Trip: {trip.from} → {trip.to} on {journeyDate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleConfirmPayment} className="p-6 md:p-8 space-y-6">
          {/* Passenger Input Fields */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <User size={15} className="text-blue-400" />
              <span>Seat & Passenger Information</span>
            </h4>

            {passengers.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#0a0d16] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 border-b border-white/[0.08] pb-2">
                  <span>Passenger {idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono font-bold">
                    Berth: {p.seatNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={p.name}
                      onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                      placeholder="e.g. Mohan Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111625] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Age</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={110}
                      value={p.age}
                      onChange={(e) => handlePassengerChange(idx, 'age', parseInt(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111625] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Gender</label>
                    <select
                      value={p.gender}
                      onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111625] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner cursor-pointer"
                    >
                      <option value="Male" className="bg-[#111625]">Male</option>
                      <option value="Female" className="bg-[#111625]">Female</option>
                      <option value="Other" className="bg-[#111625]">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Mail size={15} className="text-blue-400" />
              <span>Contact for Ticket & SMS Updates</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0d16] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">WhatsApp / Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0d16] border border-white/10 text-xs text-white font-medium focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <CreditCard size={15} className="text-emerald-400" />
              <span>Payment Mode</span>
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md'
                    : 'bg-[#0a0d16] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                GPay / PhonePe / UPI
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md'
                    : 'bg-[#0a0d16] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'wallet'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md'
                    : 'bg-[#0a0d16] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Club Wallet
              </button>
            </div>
          </div>

          {/* Fare Summary & CTA */}
          <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-medium">Total Payable</span>
              <div className="text-2xl font-black text-white">₹{totalFare}</div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all disabled:opacity-50 border border-blue-400/30"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Confirming Reservation...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Pay ₹{totalFare} & Confirm Ticket</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
