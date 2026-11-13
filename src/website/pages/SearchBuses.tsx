import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { BusCard } from '../components/BusCard';
import { SeatLayoutModal } from '../components/SeatLayoutModal';
import { BookingModal } from '../components/BookingModal';
import { TicketPass } from '../components/TicketPass';
import { MOCK_BUS_TRIPS, BusTrip, BookingRecord } from '../data/travelData';
import { ArrowUpDown, Bus, CheckCircle2 } from 'lucide-react';

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
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-200 shadow-xl backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <CheckCircle2 size={28} className="text-emerald-400" />
              <div>
                <h4 className="font-bold text-base text-white">Ticket Confirmed Successfully!</h4>
                <p className="text-xs text-emerald-300 font-medium">
                  PNR: <strong>{confirmedBooking.pnr}</strong>. Your luxury berth is reserved. E-ticket generated below.
                </p>
              </div>
            </div>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="text-xs px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
            >
              Dismiss
            </button>
          </div>

          <TicketPass booking={confirmedBooking} onClose={() => setConfirmedBooking(null)} />
        </div>
      )}

      {/* Results Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-2">
            <span>{fromParam}</span>
            <span className="text-blue-400 font-bold">→</span>
            <span>{toParam}</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Showing <strong className="text-blue-400 font-black">{filteredTrips.length}</strong> available coach departures on {dateParam}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Service Filter */}
          <div className="flex rounded-xl bg-[#111625] border border-white/10 p-1 shadow-md">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'volvo', label: 'Volvo Multi-Axle' },
              { id: 'bharatbenz', label: 'BharatBenz' },
              { id: 'sleeper', label: 'AC Sleeper' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedType(f.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedType === f.id
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-1.5 bg-[#111625] border border-white/10 px-3 py-1.5 rounded-xl text-slate-300 shadow-md font-medium">
            <ArrowUpDown size={14} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-slate-200 font-medium outline-none cursor-pointer"
            >
              <option value="departure" className="bg-[#111625] text-white">Departure Time</option>
              <option value="fare-asc" className="bg-[#111625] text-white">Fare: Low to High</option>
              <option value="fare-desc" className="bg-[#111625] text-white">Fare: High to Low</option>
              <option value="rating" className="bg-[#111625] text-white">Highest Rated</option>
            </select>
          </div>

          {/* Live GPS Toggle */}
          <button
            onClick={() => setOnlyGps(!onlyGps)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md ${
              onlyGps
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                : 'bg-[#111625] border-white/10 text-slate-300 hover:bg-white/[0.05]'
            }`}
          >
            <span>Live GPS Only</span>
          </button>
        </div>
      </div>

      {/* Bus Listing */}
      <div className="space-y-4">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <BusCard
              key={trip.id}
              trip={trip}
              isSelected={activeTripForSeats?.id === trip.id}
              onSelectSeats={(selected) => setActiveTripForSeats(selected)}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-[#111625] rounded-3xl border border-white/10 p-8 space-y-3 shadow-xl">
            <Bus size={44} className="mx-auto text-slate-600" />
            <h3 className="text-lg font-bold text-white">No Services Found for this Filter</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Please reset your filters to view all scheduled luxury departures between Chennai, Madurai, Coimbatore and Trichy.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setOnlyGps(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-md border border-blue-400/30"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Step 1 Modal: Seat Selection */}
      {activeTripForSeats && (
        <SeatLayoutModal
          trip={activeTripForSeats}
          onClose={() => setActiveTripForSeats(null)}
          onProceedToBooking={(selectedSeats, boardingPoint, droppingPoint, totalFare) => {
            const trip = activeTripForSeats;
            setActiveTripForSeats(null);
            setBookingDetails({
              trip,
              selectedSeats,
              boardingPoint,
              droppingPoint,
              totalFare,
            });
          }}
        />
      )}

      {/* Step 2 Modal: Passenger Information & Instant Payment */}
      {bookingDetails && (
        <BookingModal
          trip={bookingDetails.trip}
          selectedSeats={bookingDetails.selectedSeats}
          boardingPoint={bookingDetails.boardingPoint}
          droppingPoint={bookingDetails.droppingPoint}
          totalFare={bookingDetails.totalFare}
          journeyDate={dateParam}
          onClose={() => setBookingDetails(null)}
          onBookingSuccess={(record) => {
            setBookingDetails(null);
            setConfirmedBooking(record);
            window.scrollTo({ top: 200, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};
