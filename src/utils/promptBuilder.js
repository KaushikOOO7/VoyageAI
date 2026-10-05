// Structured Prompt Builder for VoyageAI

import { formatDisplayDate } from './format';

export function buildTravelPrompt(params) {
  const {
    destination,
    startingLocation,
    startDate,
    endDate,
    duration,
    budget,
    currency,
    travelStyle = 'Balanced',
    travellers = 'Couple',
    interests = [],
    accommodation = 'Boutique',
    foodPreferences = ['Local Food'],
    specialRequests = ''
  } = params;

  const readableStart = formatDisplayDate(startDate);
  const readableEnd = formatDisplayDate(endDate);
  const formattedInterests = Array.isArray(interests) && interests.length > 0 ? interests.join(', ') : 'Culture, Food, Sights';
  const formattedFood = Array.isArray(foodPreferences) && foodPreferences.length > 0 ? foodPreferences.join(', ') : 'Local Food';

  return `You are VoyageAI, an expert personalized travel planner.

Create a realistic, practical, and highly personalized travel itinerary based on:

Destination: ${destination}
${startingLocation ? `Starting from (Origin): ${startingLocation}` : ''}
Start date: ${readableStart}
End date: ${readableEnd}
Trip duration: exactly ${duration} days
Budget: ${currency} ${budget}
Travel pace & style: ${travelStyle}
Companions / Travellers: ${travellers}
Interests: ${formattedInterests}
Preferred accommodation: ${accommodation}
Food preferences: ${formattedFood}
${specialRequests && specialRequests.trim() ? `Special requests: ${specialRequests.trim()}` : ''}

REQUIREMENTS:
1. You MUST generate EXACTLY ${duration} days in the "days" array (Day 1 through Day ${duration}). Do NOT add extra days or omit any day.
2. Respect the user's budget (${currency} ${budget}) and ensure estimated costs are realistic.
3. Respect the travel pace:
   - "Relaxed": fewer activities, slow mornings, ample free time.
   - "Balanced": moderate activities, good balance of exploration and leisure.
   - "Packed": high-energy, seeing as much as possible with minimal downtime.
4. Align with selected companions (${travellers}) and prioritized interests (${formattedInterests}).
5. Keep activities geographically sensible (avoid putting distant places together in one half-day).
6. Provide specific, practical transportation recommendations${startingLocation ? ` including arrival from ${startingLocation}` : ''}.
7. Return ONLY valid JSON adhering to the exact schema provided.`;
}
