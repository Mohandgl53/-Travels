export interface BusTrip {
  id: string;
  busNumber: string;
  operator: string;
  serviceType: 'AC Sleeper 2+1' | 'AC Semi-Sleeper 2+2' | 'Volvo Multi-Axle AC Sleeper' | 'BharatBenz Executive Sleeper';
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  rating: number;
  reviewsCount: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
  boardingPoints: { location: string; time: string }[];
  droppingPoints: { location: string; time: string }[];
  liveTracking: boolean;
}

export interface Seat {
  id: string;
  deck: 'lower' | 'upper';
  row: number;
  col: number;
  type: 'sleeper' | 'seater';
  status: 'available' | 'booked' | 'ladies';
  price: number;
}

export interface BookingRecord {
  pnr: string;
  tripId: string;
  from: string;
  to: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  busType: string;
  busNumber: string;
  boardingPoint: string;
  droppingPoint: string;
  passengers: {
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    seatNumber: string;
  }[];
  totalAmount: number;
  bookedAt: string;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  qrCode: string;
}

export const TAMIL_NADU_CITIES = [
  'Chennai',
  'Madurai',
  'Coimbatore',
  'Tiruchirappalli',
  'Salem',
  'Tirunelveli',
  'Kanyakumari',
  'Thanjavur',
  'Rameswaram',
  'Ooty',
  'Kodaikanal',
  'Vellore',
  'Erode',
  'Dindigul',
  'Bangalore',
  'Pondicherry',
];

export const MOCK_BUS_TRIPS: BusTrip[] = [
  {
    id: 'MT-101',
    busNumber: 'TN 58 AB 1008',
    operator: 'மாரியம்மன் Travels',
    serviceType: 'Volvo Multi-Axle AC Sleeper',
    from: 'Chennai',
    to: 'Madurai',
    departureTime: '21:30',
    arrivalTime: '05:30',
    duration: '8h 00m',
    fare: 1150,
    rating: 4.8,
    reviewsCount: 1420,
    availableSeats: 16,
    totalSeats: 36,
    amenities: ['Individual USB Charging', 'Deep Cleaned Blankets', 'Water Bottle', 'Live GPS Tracking', 'WiFi', 'Snacks'],
    boardingPoints: [
      { location: 'Koyambedu CMBT Platform 4', time: '21:30' },
      { location: 'Ashok Pillar', time: '21:50' },
      { location: 'Guindy', time: '22:05' },
      { location: 'Tambaram East', time: '22:40' },
      { location: 'Perungalathur Bypass', time: '23:00' },
    ],
    droppingPoints: [
      { location: 'Samayanallur Toll', time: '05:00' },
      { location: 'Madurai Mattuthavani Bus Stand', time: '05:30' },
      { location: 'Periyar Bus Stand', time: '05:50' },
    ],
    liveTracking: true,
  },
  {
    id: 'MT-102',
    busNumber: 'TN 38 BX 4545',
    operator: 'மாரியம்மன் Travels',
    serviceType: 'BharatBenz Executive Sleeper',
    from: 'Chennai',
    to: 'Coimbatore',
    departureTime: '22:00',
    arrivalTime: '06:15',
    duration: '8h 15m',
    fare: 1250,
    rating: 4.9,
    reviewsCount: 980,
    availableSeats: 12,
    totalSeats: 36,
    amenities: ['Individual USB Charging', 'Sanitized Bedrolls', 'Water Bottle', 'Live GPS Tracking', 'Personal Screen', 'Emergency SOS'],
    boardingPoints: [
      { location: 'Koyambedu Omni Bus Terminal', time: '22:00' },
      { location: 'Koyambedu Rohini Silver Screens', time: '22:15' },
      { location: 'Porur Toll', time: '22:45' },
      { location: 'Sriperumbudur', time: '23:20' },
    ],
    droppingPoints: [
      { location: 'Avinashi Bypass', time: '05:45' },
      { location: 'Hopes College', time: '06:05' },
      { location: 'Gandhipuram Omni Bus Stand', time: '06:15' },
    ],
    liveTracking: true,
  },
  {
    id: 'MT-103',
    busNumber: 'TN 72 CD 7777',
    operator: 'மாரியம்மன் Travels',
    serviceType: 'AC Sleeper 2+1',
    from: 'Chennai',
    to: 'Tirunelveli',
    departureTime: '20:45',
    arrivalTime: '06:45',
    duration: '10h 00m',
    fare: 1350,
    rating: 4.7,
    reviewsCount: 840,
    availableSeats: 9,
    totalSeats: 36,
    amenities: ['Individual USB Charging', 'Pillow & Blanket', 'Mineral Water', 'GPS Tracking', 'Reading Lamp'],
    boardingPoints: [
      { location: 'Koyambedu', time: '20:45' },
      { location: 'Tambaram', time: '21:30' },
      { location: 'Chengalpattu Toll', time: '22:15' },
    ],
    droppingPoints: [
      { location: 'Tirunelveli New Bus Stand', time: '06:30' },
      { location: 'Vannarpettai', time: '06:45' },
    ],
    liveTracking: true,
  },
  {
    id: 'MT-104',
    busNumber: 'TN 45 EF 8822',
    operator: 'மாரியம்மன் Travels',
    serviceType: 'AC Semi-Sleeper 2+2',
    from: 'Chennai',
    to: 'Tiruchirappalli',
    departureTime: '23:15',
    arrivalTime: '05:00',
    duration: '5h 45m',
    fare: 750,
    rating: 4.6,
    reviewsCount: 1650,
    availableSeats: 22,
    totalSeats: 44,
    amenities: ['Pushback Seats', 'Charging Points', 'Movie Screen', 'Water Bottle'],
    boardingPoints: [
      { location: 'Koyambedu CMBT', time: '23:15' },
      { location: 'Tambaram', time: '23:55' },
    ],
    droppingPoints: [
      { location: 'Trichy Central Bus Stand', time: '05:00' },
      { location: 'Tollgate Trichy', time: '05:15' },
    ],
    liveTracking: false,
  },
  {
    id: 'MT-105',
    busNumber: 'TN 58 Z 9999',
    operator: 'மாரியம்மன் Travels',
    serviceType: 'Volvo Multi-Axle AC Sleeper',
    from: 'Madurai',
    to: 'Chennai',
    departureTime: '21:45',
    arrivalTime: '05:45',
    duration: '8h 00m',
    fare: 1150,
    rating: 4.8,
    reviewsCount: 1210,
    availableSeats: 14,
    totalSeats: 36,
    amenities: ['Individual USB Charging', 'Deep Cleaned Blankets', 'Water Bottle', 'Live GPS Tracking', 'WiFi'],
    boardingPoints: [
      { location: 'Madurai Mattuthavani Bus Stand', time: '21:45' },
      { location: 'Fathima College', time: '22:05' },
      { location: 'Samayanallur Toll', time: '22:25' },
    ],
    droppingPoints: [
      { location: 'Perungalathur', time: '04:50' },
      { location: 'Tambaram', time: '05:10' },
      { location: 'Guindy', time: '05:30' },
      { location: 'Koyambedu CMBT', time: '05:45' },
    ],
    liveTracking: true,
  },
  {
    id: 'MT-106',
    busNumber: 'TN 38 M 3311',
    operator: 'மாரியம்மன் Travels',
    serviceType: 'BharatBenz Executive Sleeper',
    from: 'Coimbatore',
    to: 'Chennai',
    departureTime: '22:15',
    arrivalTime: '06:30',
    duration: '8h 15m',
    fare: 1250,
    rating: 4.9,
    reviewsCount: 1040,
    availableSeats: 18,
    totalSeats: 36,
    amenities: ['Individual USB Charging', 'Sanitized Bedrolls', 'Water Bottle', 'Live GPS Tracking', 'Personal Screen'],
    boardingPoints: [
      { location: 'Gandhipuram Omni Bus Stand', time: '22:15' },
      { location: 'Lakshmi Mills', time: '22:30' },
      { location: 'Hopes College', time: '22:45' },
      { location: 'KMCH / Airport Junction', time: '23:00' },
    ],
    droppingPoints: [
      { location: 'Sriperumbudur', time: '05:30' },
      { location: 'Poonamallee Bypass', time: '05:50' },
      { location: 'Koyambedu Omni Bus Stand', time: '06:30' },
    ],
    liveTracking: true,
  },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    pnr: 'MT-8849203',
    tripId: 'MT-101',
    from: 'Chennai',
    to: 'Madurai',
    journeyDate: '2026-11-18',
    departureTime: '21:30',
    arrivalTime: '05:30',
    busType: 'Volvo Multi-Axle AC Sleeper',
    busNumber: 'TN 58 AB 1008',
    boardingPoint: 'Koyambedu CMBT Platform 4 (21:30)',
    droppingPoint: 'Madurai Mattuthavani Bus Stand (05:30)',
    passengers: [
      { name: 'Mohan Kumar', age: 24, gender: 'Male', seatNumber: 'L4' },
      { name: 'Kavitha S', age: 23, gender: 'Female', seatNumber: 'L5' },
    ],
    totalAmount: 2300,
    bookedAt: '2026-11-12 18:30',
    status: 'CONFIRMED',
    qrCode: 'PNR:MT-8849203|BUS:TN58AB1008|DATE:2026-11-18|SEATS:L4,L5',
  },
];

