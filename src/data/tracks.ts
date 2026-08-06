import { Beat } from '../types';

export const PERMANENT_TRACKS: Beat[] = [
  {
    id: 'permanent-1',
    title: 'Club gone crazy',
    producer: 'KRYPSIDE',
    bpm: 115,
    key: 'Minor',
    price: 66.00,
    audioUrl: '', // Add permanent audio link here
    coverArtUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60',
    visibility: 'Public',
    trackType: 'Beat',
    isHumanUploaded: true,
    isLocal: true,
    licenses: {
      mp3Lease: { enabled: true, price: 66.00 },
      wavLease: { enabled: false, price: 75.00 },
      premiumLease: { enabled: false, price: 150.00 },
      unlimitedLease: { enabled: false, price: 250.00 },
      exclusive: { enabled: false, price: 500.00 },
    }
  },
  {
    id: 'permanent-2',
    title: 'Keep on going',
    producer: 'KRYPSIDE',
    bpm: 180,
    key: 'A flat minor',
    price: 66.00,
    audioUrl: '',
    coverArtUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60',
    visibility: 'Public',
    trackType: 'Beat',
    isHumanUploaded: true,
    isLocal: true,
    licenses: {
      mp3Lease: { enabled: true, price: 66.00 },
      wavLease: { enabled: false, price: 75.00 },
      premiumLease: { enabled: false, price: 150.00 },
      unlimitedLease: { enabled: false, price: 250.00 },
      exclusive: { enabled: false, price: 500.00 },
    }
  }
];
