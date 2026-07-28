export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  telegram?: string;
  role: 'GUEST'  | 'MEMBER' | 'ADMIN';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  totalSeats: number;
  availableSeats: number;
  price: string;
  imageUrl?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  qrCodeUrl: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}