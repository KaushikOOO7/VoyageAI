// High-fidelity structured mock travel plan generator matching VoyageAI schema

import { calculateEndDate, formatDisplayDate, formatCurrencyValue } from '../utils/format';

export function generateStructuredMockTrip(params) {
  const {
    destination = 'Goa',
    startingLocation = '',
    startDate = '2026-10-12',
    duration = 5,
    budget = 15000,
    currency = 'INR',
    travelStyle = 'Balanced',
    travellers = 'Couple',
    interests = ['Beaches', 'Food', 'Culture'],
    accommodation = 'Boutique',
    foodPreferences = ['Local Food'],
    specialRequests = ''
  } = params;

  const destClean = destination.trim() || 'Goa';
  const totalDays = Math.max(1, Math.min(21, Number(duration) || 5));
  const endDate = calculateEndDate(startDate, totalDays);

  const numericBudget = typeof budget === 'number' ? budget : parseInt(String(budget).replace(/[^0-9]/g, ''), 10) || 15000;
  const currSymbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';

  // Budget category breakdown
  const stayCost = Math.round(numericBudget * 0.36);
  const foodCost = Math.round(numericBudget * 0.24);
  const transportCost = Math.round(numericBudget * 0.16);
  const activitiesCost = Math.round(numericBudget * 0.14);
  const miscCost = numericBudget - (stayCost + foodCost + transportCost + activitiesCost);

  const dailyAverage = Math.round(numericBudget / totalDays);

  const isGoa = /goa/i.test(destClean);
  const isTokyo = /tokyo/i.test(destClean);
  const isParis = /paris/i.test(destClean);
  const isBali = /bali/i.test(destClean);

  // Curated day templates for Goa
  const goaDays = [
    {
      title: 'Arrival, Coastal Check-In & Sunset Cliff',
      summary: 'Arrive in North Goa, settle into your boutique stay in Vagator, and witness the golden hour over the Arabian Sea.',
      morning: {
        time: '10:00',
        activity: 'Arrival & Scooter Rental',
        description: `Land at airport/station${startingLocation ? ` from ${startingLocation}` : ''}. Pick up a geared scooter or prepaid cab to Vagator. Fresh coconut water on arrival.`,
        estimatedCost: `${currSymbol}800`
      },
      afternoon: {
        time: '14:00',
        activity: 'Cliff Walk & Ocean Breeze',
        description: 'Unpack at your coastal stay, followed by a relaxed stroll along the red sandstone cliffs overlooking Little Vagator beach.',
        estimatedCost: `${currSymbol}400`
      },
      evening: {
        time: '18:00',
        activity: 'Chapora Fort Sunset & Coastal Dining',
        description: 'Hike up to the ramparts of Chapora Fort for a classic 360-degree sunset, followed by seaside dining with live acoustic rhythms.',
        estimatedCost: `${currSymbol}1,200`
      },
      food: [
        'Vinayak Family Restaurant for Kingfish Thali and Sol Kadhi',
        'Beach shack coconut feni cocktails or fresh lime soda'
      ],
      transport: 'Scooter rental (₹450/day) or on-demand cab',
      estimatedCost: `${currSymbol}${dailyAverage}`
    },
    {
      title: 'Morjim Shores & Watersport Adventures',
      summary: 'Serene morning along turtle-nesting sands, followed by thrilling coastal water sports and a cozy French bakery brunch.',
      morning: {
        time: '08:30',
        activity: 'Sunrise Beach Walk & Baba Au Rhum Brunch',
        description: 'Peaceful stroll along Morjim’s soft sands. Savor warm almond croissants, shakshuka, and iced cold brew under the bamboo groves.',
        estimatedCost: `${currSymbol}750`
      },
      afternoon: {
        time: '13:30',
        activity: 'Parasailing & Jet Ski Ride',
        description: 'Glide over the sapphire sea with certified operators near Calangute/Anjuna, or lounge under thatched umbrellas.',
        estimatedCost: `${currSymbol}1,800`
      },
      evening: {
        time: '18:30',
        activity: 'Sunset at Titlie Culinary Bar',
        description: 'Cliffside golden hour with progressive Mediterranean-Goan fusion tapas and twilight ocean views.',
        estimatedCost: `${currSymbol}1,400`
      },
      food: [
        'Artjuna Cafe for Mediterranean hummus platters',
        'Butter garlic prawns and wood-fired sourdough pizza'
      ],
      transport: 'Scooter along coastal internal village roads',
      estimatedCost: `${currSymbol}${Math.round(dailyAverage * 1.15)}`
    },
    {
      title: 'Portuguese Heritage & Latin Quarter',
      summary: 'Step back in time through the 16th-century basilicas of Old Goa and the cobalt-blue villas of Fontainhas.',
      morning: {
        time: '09:30',
        activity: 'Basilica of Bom Jesus & Se Cathedral',
        description: 'Explore UNESCO World Heritage baroque basilicas holding the mortal remains of St. Francis Xavier.',
        estimatedCost: `${currSymbol}300`
      },
      afternoon: {
        time: '13:30',
        activity: 'Fontainhas Photography Walk',
        description: 'Wander through Asia’s only Latin Quarter in Panaji with cobblestone lanes, wooden balconies, and boutique art galleries.',
        estimatedCost: `${currSymbol}600`
      },
      evening: {
        time: '17:30',
        activity: 'Mandovi River Sunset Cruise',
        description: 'Board a 1-hour open-air deck cruise on the Mandovi River with traditional Goan folk performances.',
        estimatedCost: `${currSymbol}900`
      },
      food: [
        'Viva Panjim for traditional Pork Vindaloo or Veg Xacuti with Poi bread',
        'Confeitaria 31 de Janeiro for authentic multi-layered Bebinca'
      ],
      transport: 'Highway drive to Old Goa & Panaji (scooter or private cab)',
      estimatedCost: `${currSymbol}${Math.round(dailyAverage * 0.95)}`
    },
    {
      title: 'South Goa Serenity & Cabo de Rama',
      summary: 'Journey south to untouched turquoise coves, dramatic sea cliffs, and secluded crescent beaches.',
      morning: {
        time: '09:00',
        activity: 'Scenic Southern Drive to Cabo de Rama',
        description: 'Drive along lush paddy fields to the medieval clifftop bastion of Cabo de Rama with untouched views.',
        estimatedCost: `${currSymbol}600`
      },
      afternoon: {
        time: '13:00',
        activity: 'Palolem Beach & Tandem Kayaking',
        description: 'Paddle through calm mangrove estuaries to Butterfly Beach, spotting playful dolphins along the shoreline.',
        estimatedCost: `${currSymbol}1,100`
      },
      evening: {
        time: '18:30',
        activity: 'Candlelight Seafood Dinner on the Sand',
        description: 'Dine under coconut palms with your toes in the cool sand while listening to the rhythmic surf.',
        estimatedCost: `${currSymbol}1,600`
      },
      food: [
        'Dropadi Restaurant at Palolem Beach for grilled red snapper with garlic butter',
        'Fresh mango lassi and tender coconut pudding'
      ],
      transport: 'Scenic coastal highway road trip',
      estimatedCost: `${currSymbol}${Math.round(dailyAverage * 1.1)}`
    },
    {
      title: 'Spice Farm Aromas & Farewell Souvenirs',
      summary: 'Experience aromatic botanical plantations, authentic Goan spice buffets, and local bazaar treasures.',
      morning: {
        time: '09:30',
        activity: 'Sahakari Spice Farm Guided Tour',
        description: 'Walk through vanilla, pepper, and cardamom groves with herbal welcome tea and an organic feast served on banana leaves.',
        estimatedCost: `${currSymbol}800`
      },
      afternoon: {
        time: '14:00',
        activity: 'Local Artisan Bazaar & Cashew Shopping',
        description: 'Explore Panaji or Mapusa market for handcrafted ceramic azulejo tiles, freshly roasted Goan cashews, and spices.',
        estimatedCost: `${currSymbol}700`
      },
      evening: {
        time: '18:00',
        activity: 'Sinquerim Beach Sunset & Farewell',
        description: 'Final sunset contemplation near Fort Aguada lighthouse before transfer to the airport.',
        estimatedCost: `${currSymbol}500`
      },
      food: [
        'Spice plantation banana-leaf buffet with kokum curry',
        'Ritz Classic for authentic coastal thali'
      ],
      transport: 'Airport departure taxi (regulated GoaMiles fare)',
      estimatedCost: `${currSymbol}${Math.round(dailyAverage * 0.85)}`
    }
  ];

  // Build EXACT totalDays items in `days` array
  const days = [];
  for (let i = 0; i < totalDays; i++) {
    const dayNumber = i + 1;
    let dayObj;

    if (isGoa && i < goaDays.length) {
      dayObj = { ...goaDays[i], day: dayNumber };
    } else {
      const currentInterest = interests[i % interests.length] || 'Local Sights';
      const secondaryInterest = interests[(i + 1) % interests.length] || 'Dining';

      dayObj = {
        day: dayNumber,
        title: dayNumber === 1
          ? `Arrival & Settling into ${destClean}`
          : dayNumber === totalDays
          ? `Final Discoveries & Departure from ${destClean}`
          : `Day ${dayNumber}: ${currentInterest} & Hidden Corners`,
        summary: `Tailored for ${travellers.toLowerCase()} travel at a ${travelStyle.toLowerCase()} pace, highlighting ${currentInterest.toLowerCase()}.`,
        morning: {
          time: '09:00',
          activity: dayNumber === 1 ? `Arrival in ${destClean} & Check-in` : `Morning Exploration: ${currentInterest}`,
          description: dayNumber === 1
            ? `Arrive at destination${startingLocation ? ` from ${startingLocation}` : ''}, transfer to your ${accommodation.toLowerCase()} stay, and enjoy breakfast.`
            : `Beat the midday crowds at premier landmarks and viewpoints celebrating ${currentInterest.toLowerCase()}.`,
          estimatedCost: `${currSymbol}${Math.round(dailyAverage * 0.25)}`
        },
        afternoon: {
          time: '13:30',
          activity: `Curated Afternoon: ${secondaryInterest}`,
          description: travelStyle === 'Relaxed'
            ? `Slow-paced afternoon wandering local lanes, browsing artisan workshops, or resting at a courtyard cafe.`
            : `Immersive exploration of cultural landmarks, interactive markets, or scenic walks.`,
          estimatedCost: `${currSymbol}${Math.round(dailyAverage * 0.35)}`
        },
        evening: {
          time: '18:00',
          activity: `Golden Hour Sunset & Evening Dining`,
          description: `Prime sunset vantage point followed by signature dinner showcasing regional culinary specialties.`,
          estimatedCost: `${currSymbol}${Math.round(dailyAverage * 0.4)}`
        },
        food: [
          `Top-rated regional dish in ${destClean} honoring ${foodPreferences.join(', ')}`,
          `Artisanal cafe or bakery for specialty coffee`
        ],
        transport: `Local metro pass, bicycle rental, or on-demand cab`,
        estimatedCost: `${currSymbol}${dailyAverage}`
      };
    }
    days.push(dayObj);
  }

  return {
    tripTitle: `${totalDays}-Day Personalized Journey to ${destClean}`,
    destination: destClean,
    summary: `A carefully paced ${totalDays}-day itinerary for a ${travelStyle.toLowerCase()} trip with ${travellers.toLowerCase()} companions. Focuses on ${interests.slice(0, 3).join(', ')}, curated stays, and authentic local experiences.`,
    totalDays,
    startDate,
    endDate,
    travelStyle,
    travellers,
    interests,
    estimatedBudget: {
      currency,
      total: numericBudget,
      breakdown: {
        accommodation: stayCost,
        food: foodCost,
        transport: transportCost,
        activities: activitiesCost,
        miscellaneous: miscCost
      }
    },
    days,
    stay: {
      recommendation: isGoa
        ? 'Boutique Heritage Coastal Villa in Vagator or Morjim'
        : `${destClean} Central Boutique Hotel in the Historic District`,
      reason: isGoa
        ? 'Prime proximity to red cliff viewpoints, calm cafes, and beach access while remaining peaceful at night.'
        : `Centrally positioned for walkability, safe evening dining, and seamless transit links.`,
      budgetGuidance: `${currSymbol}${Math.round(stayCost / totalDays)} / night average`
    },
    foodRecommendations: isGoa ? [
      'Vinayak Family Restaurant in Assagao — renowned for Kingfish Thali and Crab Masala',
      'Baba Au Rhum in Anjuna — artisanal French croissants, cold brew, and wood-fired sourdough pizzas',
      'Titlie Culinary Bar in Small Vagator — progressive Indian-Mediterranean sunset tapas',
      'Viva Panjim in Fontainhas — classic Portuguese Goan Xacuti and Bebinca'
    ] : [
      `Signature seasonal dish of ${destClean} at historic town taverns`,
      `Artisan courtyard cafe for freshly roasted coffee and pastries`,
      `Panoramic viewpoint restaurant for twilight dining`
    ],
    transportTips: isGoa ? [
      'Scooters are the most efficient option (₹400–600/day). Photograph pre-existing scratches upon handover.',
      'For airport transfers from Mopa or Dabolim, use the official GoaMiles app for government-regulated fixed fares.',
      'Evening traffic bottlenecks near Calangute and Baga — commute before 6:00 PM or after 8:30 PM.'
    ] : [
      `Purchase a multi-day tourist transit pass for unlimited hops across local stations in ${destClean}.`,
      `Download offline maps on Google Maps prior to daily excursions to avoid data dead zones.`,
      `Keep small cash on hand for street food stalls and local market artisans.`
    ],
    packingTips: [
      'Comfortable walking shoes with cushioned soles for cobblestone streets and coastal trails.',
      'Light breathable linen clothing, polarized sunglasses, and broad-spectrum sunscreen.',
      'Universal power adapter and compact fast-charging power bank for day trips.'
    ],
    travelTips: [
      'Early mornings (before 09:30 AM) offer the most peaceful atmosphere and crowd-free photography.',
      'Reserve popular dinner venues 1–2 days in advance, especially during golden hour sunsets.',
      'Respect local dress etiquette when entering historic basilicas, shrines, or temples.'
    ],
    hiddenGems: isGoa ? [
      'Cabo de Rama wild cliffside beach in South Goa — dramatic sea views and zero commercial shacks.',
      'Chorao Island mangrove backwaters — silent kayak tours among kingfishers and otters.',
      'Confeitaria 31 de Janeiro in Fontainhas — Goa’s oldest bakery baking traditional Portuguese tea cakes.'
    ] : [
      `Quiet residential courtyard gardens tucked behind the central cathedral in ${destClean}.`,
      `Sunset viewpoint frequented by local photographers overlooking the river valley.`
    ],
    thingsToAvoid: isGoa ? [
      'Avoid driving through Baga-Calangute strip during peak sunset hours (bottlenecks heavily).',
      'Do not swim in the sea near red flag areas or after sunset when undercurrents strengthen.',
      'Avoid unmetered unauthorized private cabs; always verify fares beforehand.'
    ] : [
      `Avoid dining directly adjacent to primary tourist landmarks where prices are inflated and quality drops.`,
      `Avoid carrying large amounts of cash in crowded night bazaars.`
    ],
    isMock: true
  };
}
