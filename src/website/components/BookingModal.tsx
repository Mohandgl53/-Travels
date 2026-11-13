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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fade-in text-slate-800">
      <div className="bg-white border-4 border-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden my-auto ring-1 ring-slate-900/5">
        {/* Header */}
        <div className="p-6 md:p-7 border-b border-slate-100 flex items-center justify-between bg-[#faf8f5]">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-600 font-extrabold">Step 2 of 2</span>
            <h3 className="text-xl font-bold font-tamil text-slate-900">Passenger Details & Instant Payment</h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Trip: {trip.from} → {trip.to} on {journeyDate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleConfirmPayment} className="p-6 md:p-8 space-y-6 bg-white">
          {/* Passenger Input Fields */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <User size={15} className="text-blue-600" />
              <span>Seat & Passenger Information</span>
            </h4>

            {passengers.map((p, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 border-b border-slate-200 pb-2">
                  <span>Passenger {idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-700 border border-blue-200 font-mono font-bold">
                    Berth: {p.seatNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={p.name}
                      onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                      placeholder="e.g. Mohan Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Age</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={110}
                      value={p.age}
                      onChange={(e) => handlePassengerChange(idx, 'age', parseInt(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gender</label>
                    <select
                      value={p.gender}
                      onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-sm cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <Mail size={15} className="text-blue-600" />
              <span>Contact for Ticket & SMS Updates</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">WhatsApp / Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <CreditCard size={15} className="text-emerald-600" />
              <span>Payment Mode</span>
            </h4>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                GPay / PhonePe / UPI
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'wallet'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Club Wallet
              </button>
            </div>
          </div>

          {/* Fare Summary & CTA */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-medium">Total Payable</span>
              <div className="text-2xl font-black text-slate-900">₹{totalFare}</div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-all disabled:opacity-50"
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
