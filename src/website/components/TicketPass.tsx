import React from 'react';
import { QrCode, Printer, CheckCircle, Bus, Calendar, User } from 'lucide-react';
import { BookingRecord } from '../data/travelData';
import { BrandEmblem } from './BrandLogo';

interface TicketPassProps {
  booking: BookingRecord;
  onClose?: () => void;
}

export const TicketPass: React.FC<TicketPassProps> = ({ booking, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border-4 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-2xl mx-auto my-4 text-slate-800">
      {/* Top Banner */}
      <div className="bg-[#faf8f5] p-6 flex items-center justify-between text-slate-900 border-b border-slate-200">
        <div className="flex items-center space-x-3.5">
          <BrandEmblem size="md" />
          <div>
            <h3 className="font-black font-tamil text-xl text-slate-900">மாரியம்மன் Travels</h3>
            <p className="text-xs text-blue-600 font-bold">Official E-Ticket & Boarding Pass</p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle size={13} />
            <span>{booking.status}</span>
          </span>
          <p className="text-xs font-mono text-slate-700 mt-1 font-bold">PNR: {booking.pnr}</p>
        </div>
      </div>

      {/* Main Ticket Body */}
      <div className="p-7 space-y-6">
        {/* Route Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Origin</span>
            <div className="text-2xl font-black text-slate-900">{booking.from}</div>
            <div className="text-sm font-bold text-blue-600 mt-0.5">{booking.departureTime}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">{booking.boardingPoint}</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-blue-600 font-bold mb-1 flex items-center space-x-1">
              <Bus size={13} />
              <span>{booking.busType}</span>
            </span>
            <div className="w-full flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <div className="flex-1 border-t-2 border-dashed border-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[11px] text-slate-600 mt-1 font-mono font-bold">{booking.busNumber}</span>
          </div>

          <div className="md:text-right">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Destination</span>
            <div className="text-2xl font-black text-slate-900">{booking.to}</div>
            <div className="text-sm font-bold text-emerald-700 mt-0.5">{booking.arrivalTime}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">{booking.droppingPoint}</p>
          </div>
        </div>

        {/* Date & Passenger Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
              <Calendar size={15} className="text-blue-600" />
              <span>Date of Journey: <strong className="text-slate-900">{booking.journeyDate}</strong></span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                Reserved Berths ({booking.passengers.length})
              </span>
              <ul className="space-y-2 text-xs">
                {booking.passengers.map((p, i) => (
                  <li key={i} className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="flex items-center space-x-1.5">
                      <User size={13} className="text-slate-400" />
                      <span>{p.name} ({p.age}y, {p.gender})</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 font-mono font-bold">
                      Berth {p.seatNumber}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* QR Code & Total */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="w-28 h-28 bg-white p-2 rounded-2xl border border-slate-200 flex items-center justify-center shadow-md mb-2">
              <QrCode size={90} className="text-slate-900" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono font-bold">Fast-track boarding QR</span>
            <div className="mt-2 text-xs font-bold text-slate-700">
              <span>Total Paid: </span>
              <strong className="text-slate-900 text-lg font-black">₹{booking.totalAmount}</strong>
            </div>
          </div>
        </div>

        {/* Boarding Guidelines */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
          <p className="font-bold text-blue-900">Important Boarding Guidelines:</p>
          <ul className="list-disc list-inside space-y-0.5 text-blue-800/80 font-medium">
            <li>Please arrive at the boarding point at least 15 minutes before scheduled departure.</li>
            <li>Government-issued photo identification (Aadhaar or Driving License) required.</li>
            <li>Live GPS tracking SMS notification has been dispatched to your mobile.</li>
          </ul>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center space-x-2 transition-colors border border-slate-300 shadow-sm"
        >
          <Printer size={15} />
          <span>Print / Save PDF</span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md border border-blue-400/30"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};
