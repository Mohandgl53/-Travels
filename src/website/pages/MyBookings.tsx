import React, { useState, useEffect } from 'react';
import { TicketPass } from '../components/TicketPass';
import { BookingRecord, INITIAL_BOOKINGS } from '../data/travelData';
import { Ticket, Search, Calendar, AlertCircle, ArrowRight, CheckCircle2, Clock, MapPin, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandEmblem } from '../components/BrandLogo';

export const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<BookingRecord | null>(null);
  const [searchPnr, setSearchPnr] = useState('');
  const [cancelModalPnr, setCancelModalPnr] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mariamman_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookings(parsed);
      } else {
        setBookings(INITIAL_BOOKINGS);
        localStorage.setItem('mariamman_bookings', JSON.stringify(INITIAL_BOOKINGS));
      }
    } catch (e) {
      setBookings(INITIAL_BOOKINGS);
    }
  }, []);

  const handleCancelBooking = (pnr: string) => {
    const updated = bookings.map((b) => (b.pnr === pnr ? { ...b, status: 'CANCELLED' as const } : b));
    setBookings(updated);
    localStorage.setItem('mariamman_bookings', JSON.stringify(updated));
    setCancelModalPnr(null);
  };

  const filteredBookings = bookings.filter((b) =>
    searchPnr ? b.pnr.toLowerCase().includes(searchPnr.toLowerCase()) : true
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-100">
      {/* Page Header Banner */}
      <div className="porcelain-canvas rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative border border-slate-300/40 text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold mb-2 shadow-sm">
            <Ticket size={13} className="text-blue-600" />
            <span>Passenger Portal & Verified E-Tickets</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-tamil tracking-tight">
            My Bookings & E-Tickets (என் பயணங்கள்)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Access, view, download or print your official verified digital boarding pass.
          </p>
        </div>

        {/* PNR Search Box */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchPnr}
            onChange={(e) => setSearchPnr(e.target.value)}
            placeholder="Search by PNR Number..."
            className="clay-pill-input w-full pl-11 pr-4 py-3 rounded-full text-xs font-bold text-slate-800 placeholder-slate-400 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Ticket Modal if Selected */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl my-auto">
            <TicketPass booking={selectedTicket} onClose={() => setSelectedTicket(null)} />
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalPnr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#101524] border border-white/10 rounded-[2rem] p-8 max-w-md w-full shadow-2xl space-y-4 text-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle size={30} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black text-white">Cancel Booking {cancelModalPnr}?</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">
                According to our cancellation policy, 100% refund will be credited back to your original payment method within 24 hours.
              </p>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => setCancelModalPnr(null)}
                className="flex-1 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-bold transition-all active:scale-95"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(cancelModalPnr)}
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all active:scale-95"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookings List Cards */}
      <div className="space-y-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <div
              key={b.pnr}
              className="p-7 rounded-[2rem] bg-[#101524] border border-white/10 hover:border-blue-500/40 shadow-xl transition-all duration-300"
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
                <div className="flex items-center space-x-3">
                  <BrandEmblem size="md" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400 font-bold">PNR:</span>
                      <span className="text-sm font-mono font-black text-white px-2 py-0.5 rounded bg-white/[0.08] border border-white/10">
                        {b.pnr}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          b.status === 'CONFIRMED'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : b.status === 'CANCELLED'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Booked on {b.bookedAt} • {b.busType} ({b.busNumber})
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Fare Paid</span>
                  <span className="text-2xl font-black text-white">₹{b.totalAmount}</span>
                </div>
              </div>

              {/* Journey Route Info */}
              <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-4">
                  <div className="text-2xl font-black text-white">{b.from}</div>
                  <div className="text-xs font-bold text-sky-400 mt-0.5">{b.departureTime}</div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin size={11} className="text-blue-400 shrink-0" />
                    <span>{b.boardingPoint}</span>
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                    <Calendar size={13} className="text-blue-400" />
                    <span>{b.journeyDate}</span>
                  </span>
                  <div className="w-full flex items-center space-x-1 px-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <div className="flex-1 border-t-2 border-dashed border-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1">
                    {b.passengers.length} Passenger{b.passengers.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="md:col-span-4 md:text-right">
                  <div className="text-2xl font-black text-white">{b.to}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{b.arrivalTime}</div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center md:justify-end gap-1">
                    <MapPin size={11} className="text-emerald-400 shrink-0" />
                    <span>{b.droppingPoint}</span>
                  </p>
                </div>
              </div>

              {/* Passengers & Action Buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-400 font-bold">Reserved Berths:</span>
                  <div className="flex items-center space-x-1.5">
                    {b.passengers.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-sky-300 font-bold"
                      >
                        {p.seatNumber} ({p.name})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => setSelectedTicket(b)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center space-x-1.5 active:scale-95 transition-all border border-blue-400/30"
                  >
                    <Printer size={13} />
                    <span>View E-Ticket</span>
                  </button>

                  {b.status === 'CONFIRMED' && (
                    <button
                      onClick={() => setCancelModalPnr(b.pnr)}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-rose-600/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 font-bold text-xs transition-all active:scale-95"
                    >
                      Cancel Ticket
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 rounded-[2rem] bg-[#101524] border border-white/10 text-center space-y-4 shadow-xl">
            <Ticket size={36} className="text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Bookings Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-normal">
              No reservation found matching "{searchPnr}". Search across South India routes to book your next voyage.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider"
            >
              <span>Book a Sleeper Bus</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
