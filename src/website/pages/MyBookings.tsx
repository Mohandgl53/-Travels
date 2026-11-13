import React, { useState, useEffect } from 'react';
import { TicketPass } from '../components/TicketPass';
import { BookingRecord, INITIAL_BOOKINGS } from '../data/travelData';
import { Ticket, Search, Calendar, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-black text-blue-400">
            Passenger Portal
          </span>
          <h1 className="text-3xl font-black text-white font-tamil">
            My Bookings & E-Tickets (என் பயணங்கள்)
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Access, view, download or reschedule your verified travel bookings.
          </p>
        </div>

        {/* PNR Search Box */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={15} />
          </span>
          <input
            type="text"
            value={searchPnr}
            onChange={(e) => setSearchPnr(e.target.value)}
            placeholder="Search by PNR Number..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#111625] border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-inner"
          />
        </div>
      </div>

      {/* Ticket Modal if Selected */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl my-auto">
            <TicketPass booking={selectedTicket} onClose={() => setSelectedTicket(null)} />
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalPnr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#111625] border border-white/10 rounded-3xl p-7 max-w-md w-full shadow-2xl space-y-4 text-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle size={26} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">Cancel Booking {cancelModalPnr}?</h3>
              <p className="text-xs text-slate-400 mt-1">
                According to our cancellation policy, 100% refund is initiated within 24 hours back to your original payment method.
              </p>
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setCancelModalPnr(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-semibold transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(cancelModalPnr)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <div
              key={b.pnr}
              className={`rounded-3xl border p-6 transition-all ${
                b.status === 'CANCELLED'
                  ? 'bg-[#0a0d16] border-white/5 opacity-60'
                  : 'bg-[#111625] border-white/10 hover:border-blue-500/40 shadow-xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-tamil text-sm">
                    மா
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-white text-sm">PNR: {b.pnr}</span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          b.status === 'CONFIRMED'
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                            : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Booked on {b.bookedAt} • {b.busType} ({b.busNumber})
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 font-medium">Total Paid</span>
                  <div className="text-xl font-black text-white">₹{b.totalAmount}</div>
                </div>
              </div>

              {/* Journey Details */}
              <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-3">
                  <div className="text-xl font-black text-white">{b.from}</div>
                  <p className="text-xs text-blue-400 font-bold mt-0.5">{b.departureTime}</p>
                  <p className="text-xs text-slate-400 truncate max-w-[200px] mt-0.5 font-medium">
                    {b.boardingPoint}
                  </p>
                </div>

                <div className="md:col-span-3 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
                    <Calendar size={13} className="text-blue-400" />
                    <span>{b.journeyDate}</span>
                  </span>
                  <div className="w-24 border-t border-dashed border-slate-600 my-1 relative">
                    <span className="absolute -top-1 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {b.passengers.length} Passenger(s)
                  </span>
                </div>

                <div className="md:col-span-3">
                  <div className="text-xl font-black text-white">{b.to}</div>
                  <p className="text-xs text-emerald-400 font-bold mt-0.5">{b.arrivalTime}</p>
                  <p className="text-xs text-slate-400 truncate max-w-[200px] mt-0.5 font-medium">
                    {b.droppingPoint}
                  </p>
                </div>

                {/* Actions */}
                <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-2 justify-end">
                  <button
                    onClick={() => setSelectedTicket(b)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-md text-center transition-all border border-blue-400/30"
                  >
                    View E-Ticket
                  </button>

                  {b.status === 'CONFIRMED' && (
                    <button
                      onClick={() => setCancelModalPnr(b.pnr)}
                      className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-white/10 text-xs font-semibold text-center transition-colors"
                    >
                      Cancel Ticket
                    </button>
                  )}
                </div>
              </div>

              {/* Passengers Bar */}
              <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Reserved Berths:</span>
                {b.passengers.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 font-mono font-bold text-[11px]"
                  >
                    {p.seatNumber} ({p.name})
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-[#111625] rounded-3xl border border-white/10 p-8 space-y-4 shadow-xl">
            <Ticket size={44} className="mx-auto text-slate-600" />
            <h3 className="text-lg font-bold text-white">No Bookings Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You do not have any bookings matching this criteria. Search our daily bus routes and reserve your luxury sleeper berth.
            </p>
            <Link
              to="/search"
              className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md border border-blue-400/30"
            >
              Book a Bus Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
