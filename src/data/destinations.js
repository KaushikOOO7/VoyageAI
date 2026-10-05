// Curated destination data, styles, companions, accommodation, and interests for VoyageAI

export const QUICK_DESTINATIONS = [
  { name: 'Goa', country: 'India', defaultDays: 5, budget: 15000, currency: 'INR', style: 'Balanced', startingFrom: 'Bengaluru' },
  { name: 'Tokyo', country: 'Japan', defaultDays: 5, budget: 2000, currency: 'USD', style: 'Packed', startingFrom: 'Delhi' },
  { name: 'Paris', country: 'France', defaultDays: 4, budget: 1800, currency: 'EUR', style: 'Balanced', startingFrom: 'Mumbai' },
  { name: 'Bali', country: 'Indonesia', defaultDays: 6, budget: 1200, currency: 'USD', style: 'Relaxed', startingFrom: 'Bengaluru' },
  { name: 'Swiss Alps', country: 'Switzerland', defaultDays: 5, budget: 2400, currency: 'EUR', style: 'Balanced', startingFrom: 'Delhi' },
  { name: 'Dubai', country: 'UAE', defaultDays: 4, budget: 1500, currency: 'USD', style: 'Packed', startingFrom: 'Mumbai' },
  { name: 'Singapore', country: 'Singapore', defaultDays: 4, budget: 1600, currency: 'USD', style: 'Balanced', startingFrom: 'Bengaluru' },
];

export const TRAVEL_STYLES = [
  {
    id: 'Relaxed',
    title: 'Relaxed',
    desc: 'Slow mornings and plenty of breathing room.'
  },
  {
    id: 'Balanced',
    title: 'Balanced',
    desc: 'A mix of exploration and downtime.'
  },
  {
    id: 'Packed',
    title: 'Packed',
    desc: 'See as much as possible.'
  }
];

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' }
];

export const BUDGET_TIERS = {
  INR: [
    { id: 'Budget', label: 'Budget', amount: 15000, desc: 'Hostels, local transit & street eats' },
    { id: 'Comfort', label: 'Comfort', amount: 35000, desc: '3-star hotels, cabs & dining' },
    { id: 'Premium', label: 'Premium', amount: 75000, desc: 'Boutique resorts, private tours' }
  ],
  USD: [
    { id: 'Budget', label: 'Budget', amount: 800, desc: 'Budget stays & public transit' },
    { id: 'Comfort', label: 'Comfort', amount: 2000, desc: 'Central hotels & curated dining' },
    { id: 'Premium', label: 'Premium', amount: 4500, desc: 'Luxury stays & premium experiences' }
  ],
  EUR: [
    { id: 'Budget', label: 'Budget', amount: 700, desc: 'Budget stays & regional rail' },
    { id: 'Comfort', label: 'Comfort', amount: 1800, desc: 'Charming boutique stays & bistros' },
    { id: 'Premium', label: 'Premium', amount: 4000, desc: 'Luxury heritage hotels & dining' }
  ],
  GBP: [
    { id: 'Budget', label: 'Budget', amount: 600, desc: 'B&Bs and public transit' },
    { id: 'Comfort', label: 'Comfort', amount: 1600, desc: 'Boutique hotels & gastropubs' },
    { id: 'Premium', label: 'Premium', amount: 3500, desc: '5-star accommodations' }
  ]
};

export const COMPANIONS = [
  { id: 'Solo', label: 'Solo', desc: 'Independent exploration' },
  { id: 'Couple', label: 'Couple', desc: 'Shared moments & romance' },
  { id: 'Friends', label: 'Friends', desc: 'Group adventures & energy' },
  { id: 'Family', label: 'Family', desc: 'Comfort & all-ages ease' }
];

export const ACCOMMODATION_TYPES = [
  'Budget Hotel',
  'Hotel',
  'Boutique',
  'Resort',
  'Hostel',
  'No Preference'
];

export const FOOD_PREFERENCES = [
  'Local Food',
  'Vegetarian',
  'Non-Vegetarian',
  'Vegan',
  'Halal',
  'No Preference'
];

export const INTEREST_OPTIONS = [
  'Nature',
  'Beaches',
  'Mountains',
  'Food',
  'Culture',
  'History',
  'Adventure',
  'Nightlife',
  'Shopping',
  'Photography',
  'Spiritual',
  'Hidden Gems',
  'Local Experiences',
  'Luxury'
];

export function getDestinationBackdrop(destinationName = '') {
  const dest = destinationName.toLowerCase();
  if (dest.includes('goa')) {
    return 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80';
  }
  if (dest.includes('tokyo') || dest.includes('japan')) {
    return 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80';
  }
  if (dest.includes('paris') || dest.includes('france')) {
    return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80';
  }
  if (dest.includes('bali')) {
    return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80';
  }
  if (dest.includes('swiss') || dest.includes('alps')) {
    return 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80';
  }
  if (dest.includes('dubai')) {
    return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80';
  }
  if (dest.includes('singapore')) {
    return 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80';
  }
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80';
}
