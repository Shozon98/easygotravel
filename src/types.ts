export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  slug: string;
}

export interface Package {
  id: string;
  title: string;
  destinationId: string;
  price: number;
  duration: string;
  image: string;
  highlights: string[];
  itinerary: { day: number; activity: string }[];
  featured: boolean;
  slug: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  image: string;
  rating: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  expiry: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageId: string;
  travelDate: string;
  travelers: number;
  specialRequests: string;
  status: 'pending' | 'confirmed' | 'canceled';
  createdAt: string;
  deleted?: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  deleted?: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
  deleted?: boolean;
}

export interface Settings {
  siteName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export interface AppData {
  destinations: Destination[];
  packages: Package[];
  blogs: Blog[];
  testimonials: Testimonial[];
  offers: Offer[];
  bookings: Booking[];
  inquiries: Inquiry[];
  subscribers: Subscriber[];
  settings: Settings;
}
