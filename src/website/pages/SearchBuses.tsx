import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { BusCard } from '../components/BusCard';
import { SeatLayoutModal } from '../components/SeatLayoutModal';
import { BookingModal } from '../components/BookingModal';
import { TicketPass } from '../components/TicketPass';
import { MOCK_BUS_TRIPS, BusTrip, BookingRecord } from '../data/travelData';
import { ArrowUpDown, Bus, CheckCircle2, SlidersHorizontal, Radio, ShieldCheck } from 'lucide-react';

export const SearchBuses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get('from') || 'Chennai';
  const toParam = searchParams.get('to') || 'Madurai';
  const dateParam = searchParams.get('date') || new Date().toISOString().split('T')[0];

  // Filtering & Sorting State
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'fare-asc' | 'fare-desc' | 'rating' | 'departure'>('departure');
  const [onlyGps, setOnlyGps] = useState<boolean>(false);

  // Booking Flow State
  const [activeTripForSeats, setActiveTripForSeats] = useState<BusTrip | null>(null);
  const [bookingDetails, setBookingDetails] = useState<{
    trip: BusTrip;
    selectedSeats: string[];
    boardingPoint: string;
    droppingPoint: string;
    totalFare: number;
  } | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Filter trips based on search & options
  const filteredTrips = useMemo(() => {
    return MOCK_BUS_TRIPS.filter((t) => {
      const matchesRoute =
        (t.from.toLowerCase() === fromParam.toLowerCase() &&
          t.to.toLowerCase() === toParam.toLowerCase()) ||
        (t.from.toLowerCase() === fromParam.toLowerCase() || t.to.toLowerCase() === toParam.toLowerCase());

      const matchesType =
        selectedType === 'all' ||
        (selectedType === 'sleeper' && t.serviceType.includes('Sleeper')) ||
        (selectedType === 'volvo' && t.serviceType.includes('Volvo')) ||
        (selectedType === 'bharatbenz' && t.serviceType.includes('BharatBenz'));

      const matchesGps = !onlyGps || t.liveTracking;

      return matchesRoute && matchesType && matchesGps;
    }).sort((a, b) => {
      if (sortBy === 'fare-asc') return a.fare - b.fare;
      if (sortBy === 'fare-desc') return b.fare - a.fare;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.departureTime.localeCompare(b.departureTime);
    });
  }, [fromParam, toParam, selectedType, sortBy, onlyGps]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      {/* Top Search Adjustment Widget */}
      <SearchBar
        initialFrom={fromParam}
        initialTo={toParam}
        initialDate={dateParam}
        compact={false}
      />

      {/* Confirmed Booking Success Alert */}
      {confirmedBooking && (
        <div className="space-y-4 animate-slide-up">
          <div className="p-6 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-200 shadow-xl backdrop-blur-md">
            <div className="flex items-center space-x-3.5">
              <CheckCircle2 size={32} className="text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-black text-lg text-white">Ticket Confirmed Successfully!</h4>
                <p className="text-xs text-emerald-300 font-medium mt-0.5">
                  PNR: <strong className="font-mono text-white">{confirmedBooking.pnr}</strong>. Your luxury berths are reserved. View official boarding pass below.
                </p>
              </div>
            </div>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="text-xs px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md active:scale-95"
            >
              Dismiss
            </button>
          </div>

          <TicketPass booking={confirmedBooking} onClose={() => setConfirmedBooking(null)} />
        </div>
      )}

      {/* Results Header & Filters */}
      <div className="p-6 rounded-[2rem] bg-[#101524] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
            <Bus size={14} />
            <span>Scheduled Intercity Express</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-2">
            <span>{fromParam}</span>
            <span className="text-blue-400 font-bold">→</span>
            <span>{toParam}</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Showing <strong className="text-sky-400 font-black">{filteredTrips.length}</strong> verified departures on {dateParam}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Service Filter */}
          <div className="flex rounded-2xl bg-white/[0.05] border border-white/10 p-1 shadow-inner">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'volvo', label: 'Volvo Multi-Axle' },
              { id: 'bharatbenz', label: 'BharatBenz' },
              { id: 'sleeper', label: 'AC Sleeper' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedType(f.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedType === f.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white font-semibold text-xs focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm"
            >
              <option value="departure" className="bg-[#101524] text-white">Sort: Departure Time</option>
              <option value="fare-asc" className="bg-[#101524] text-white">Price: Low to High</option>
              <option value="fare-desc" className="bg-[#101524] text-white">Price: High to Low</option>
              <option value="rating" className="bg-[#101524] text-white">Highest Rated</option>
            </select>
          </div>

          {/* GPS Toggle Pill */}
          <button
            onClick={() => setOnlyGps(!onlyGps)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border transition-all ${
              onlyGps
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-white/[0.05] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            <Radio size={12} className={onlyGps ? 'animate-pulse text-emerald-400' : 'text-slate-400'} />
            <span>Live GPS Only</span>
          </button>
        </div>
      </div>

      {/* Bus Departure Cards List */}
      <div className="space-y-5">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <BusCard
              key={trip.id}
              trip={trip}
              onSelectSeats={(selected) => setActiveTripForSeats(selected)}
              isSelected={activeTripForSeats?.id === trip.id}
            />
          ))
        ) : (
          <div className="p-12 rounded-[2rem] bg-[#101524] border border-white/10 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
              <Bus size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">No Direct Coach Scheduled</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                No coaches matched the selected filter combination between {fromParam} and {toParam}. Try selecting "All Services" or searching for Chennai.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedType('all');
                setOnlyGps(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 1. Interactive Sleeper Seat Layout Modal */}
      {activeTripForSeats && (
        <SeatLayoutModal
          trip={activeTripForSeats}
          onClose={() => setActiveTripForSeats(null)}
          onProceedToBooking={(selectedSeats, boardingPoint, droppingPoint, totalFare) => {
            setBookingDetails({
              trip: activeTripForSeats,
              selectedSeats,
              boardingPoint,
              droppingPoint,
              totalFare,
            });
            setActiveTripForSeats(null);
          }}
        />
      )}

      {/* 2. Passenger Details & Instant Booking Modal */}
      {bookingDetails && (
        <BookingModal
          trip={bookingDetails.trip}
          selectedSeats={bookingDetails.selectedSeats}
          boardingPoint={bookingDetails.boardingPoint}
          droppingPoint={bookingDetails.droppingPoint}
          totalFare={bookingDetails.totalFare}
          journeyDate={dateParam}
          onClose={() => setBookingDetails(null)}
          onBookingSuccess={(newBooking: BookingRecord) => {
            setConfirmedBooking(newBooking);
            setBookingDetails(null);
          }}
        />
      )}
    </div>
  );
};
