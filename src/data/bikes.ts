// Easy Configuration File for Bike Fleet
// To change bike availability, simply change the 'status' field to 'available' or 'rented'

export interface Bike {
  id: string;
  name: string;
  model: string;
  dailyPrice: number;
  features: string[];
  specs: {
    engine: string;
    transmission: string;
    fuelCapacity: string;
  };
  status: 'available' | 'rented';
  image: string;
}

export const bikes: Bike[] = [
  {
    id: 'honda-beat',
    name: 'Honda Beat',
    model: 'Beat',
    dailyPrice: 5,
    features: ['Free Helmet', 'Lock Included', 'Fuel Efficient', 'Perfect for City'],
    specs: {
      engine: '110cc',
      transmission: 'Automatic',
      fuelCapacity: '4.2L'
    },
    status: 'available', // Change to 'rented' to mark as unavailable
    image: '/bikes/honda-beat.jpg'
  },
  {
    id: 'honda-street',
    name: 'Honda Street',
    model: 'Scoopy Street',
    dailyPrice: 6,
    features: ['Free Helmet', 'Lock Included', 'Comfortable Seat', 'Stylish Design'],
    specs: {
      engine: '110cc',
      transmission: 'Automatic',
      fuelCapacity: '4.2L'
    },
    status: 'available',
    image: '/bikes/honda-scoopy.jpg'
  },
  {
    id: 'honda-vario-125',
    name: 'Honda Vario 125',
    model: 'Vario 125',
    dailyPrice: 7,
    features: ['Free Helmet', 'Lock Included', 'USB Charger', 'Large Storage'],
    specs: {
      engine: '125cc',
      transmission: 'Automatic',
      fuelCapacity: '5.5L'
    },
    status: 'available',
    image: '/bikes/honda-vario-125.jpg'
  },
  {
    id: 'honda-vario-160',
    name: 'Honda Vario 160',
    model: 'Vario 160',
    dailyPrice: 9,
    features: ['Free Helmet', 'Lock Included', 'USB Charger', 'Premium Comfort'],
    specs: {
      engine: '160cc',
      transmission: 'Automatic',
      fuelCapacity: '5.5L'
    },
    status: 'available',
    image: '/bikes/honda-vario-160.jpg'
  },
  {
    id: 'honda-pcx',
    name: 'Honda PCX 160',
    model: 'PCX 160',
    dailyPrice: 12,
    features: ['Free Helmet', 'Lock Included', 'USB Charger', 'Premium Scooter', 'ABS Brakes'],
    specs: {
      engine: '160cc',
      transmission: 'Automatic',
      fuelCapacity: '8L'
    },
    status: 'rented', // Example of rented bike
    image: '/bikes/honda-pcx.jpg'
  },
  {
    id: 'yamaha-nmax',
    name: 'Yamaha NMAX 155',
    model: 'NMAX 155',
    dailyPrice: 12,
    features: ['Free Helmet', 'Lock Included', 'USB Charger', 'Sporty Design', 'ABS Brakes'],
    specs: {
      engine: '155cc',
      transmission: 'Automatic',
      fuelCapacity: '7.1L'
    },
    status: 'available',
    image: '/bikes/yamaha-nmax.jpg'
  }
];

// WhatsApp and Telegram Configuration
// Add your contact details here
export const contactConfig = {
  whatsappNumber: '62xxxxxxxxxx', // Replace with your WhatsApp number (with country code, no +)
  telegramUsername: 'lombookadventures', // Replace with your Telegram username
  businessName: 'Lombok Local',
  email: 'info@lombookadventures.com',
  address: 'Kuta, Lombok, Indonesia',
  googleMapsUrl: 'https://maps.google.com' // Add your Google Maps URL
};
