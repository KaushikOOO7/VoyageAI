// =======================================================================
// VoyageAI — Unified AI Service Architecture
// =======================================================================

import { buildTravelPrompt } from '../utils/promptBuilder';
import { generateStructuredMockTrip } from './mockGenerator';

/**
 * Returns the active OpenAI API key safely from environment or browser storage.
 * Does not expose or commit keys in repo files.
 */
export function getActiveApiKey() {
  if (typeof window !== 'undefined') {
    const userKey = localStorage.getItem('voyage_openai_key');
    if (userKey && userKey.trim().startsWith('sk-')) {
      return userKey.trim();
    }
  }
  const envKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (envKey && envKey.trim().startsWith('sk-') && envKey !== 'your_api_key_here') {
    return envKey.trim();
  }
  return null;
}

export function saveUserApiKey(key) {
  if (typeof window !== 'undefined') {
    if (!key || !key.trim()) {
      localStorage.removeItem('voyage_openai_key');
    } else {
      localStorage.setItem('voyage_openai_key', key.trim());
    }
  }
}

export function isApiKeyConfigured() {
  return Boolean(getActiveApiKey());
}

/**
 * Parses and sanitizes OpenAI JSON response to match our structured schema
 */
function parseAiResponse(rawContent, params) {
  try {
    const jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```/) || rawContent.match(/```\s*([\s\S]*?)\s*```/);
    const textToParse = jsonMatch ? jsonMatch[1] : rawContent;
    const parsed = JSON.parse(textToParse);

    // Validate and guarantee exact days count
    const days = Array.isArray(parsed.days) ? parsed.days.slice(0, params.duration) : [];

    return {
      tripTitle: parsed.tripTitle || `${params.duration}-Day Journey to ${params.destination}`,
      destination: parsed.destination || params.destination,
      summary: parsed.summary || `Personalized ${params.duration}-day travel plan tailored to your preferences.`,
      totalDays: params.duration,
      startDate: params.startDate,
      endDate: params.endDate,
      travelStyle: params.travelStyle,
      travellers: params.travellers,
      interests: params.interests,
      estimatedBudget: parsed.estimatedBudget || {
        currency: params.currency,
        total: params.budget,
        breakdown: {
          accommodation: Math.round(params.budget * 0.36),
          food: Math.round(params.budget * 0.24),
          transport: Math.round(params.budget * 0.16),
          activities: Math.round(params.budget * 0.14),
          miscellaneous: Math.round(params.budget * 0.1)
        }
      },
      days: days.length > 0 ? days : generateStructuredMockTrip(params).days,
      stay: parsed.stay || {
        recommendation: `${params.destination} Central Boutique Stay`,
        reason: 'Well situated for exploration and daily transit.',
        budgetGuidance: 'Within your designated stay budget'
      },
      foodRecommendations: parsed.foodRecommendations || [],
      transportTips: parsed.transportTips || [],
      packingTips: parsed.packingTips || [],
      travelTips: parsed.travelTips || [],
      hiddenGems: parsed.hiddenGems || [],
      thingsToAvoid: parsed.thingsToAvoid || [],
      source: 'openai'
    };
  } catch (err) {
    console.warn('Failed to parse AI output as JSON, using structured dynamic fallback:', err);
    return generateStructuredMockTrip(params);
  }
}

/**
 * Main travel generation pipeline
 */
export async function planTripWithAi(params, onProgress) {
  const prompt = buildTravelPrompt(params);
  const apiKey = getActiveApiKey();

  const progressSteps = [
    { step: 1, message: 'Finding the best places...' },
    { step: 2, message: 'Balancing your days...' },
    { step: 3, message: 'Building your itinerary...' },
    { step: 4, message: 'Adding local experiences...' },
    { step: 5, message: 'Working within your budget...' },
    { step: 6, message: 'Almost ready...' }
  ];

  if (!apiKey) {
    // Elegant simulated AI reasoning delay
    for (let i = 0; i < progressSteps.length; i++) {
      if (onProgress) onProgress(progressSteps[i]);
      await new Promise((r) => setTimeout(r, 450));
    }

    const mockResult = generateStructuredMockTrip(params);
    return {
      ...mockResult,
      usedPrompt: prompt,
      source: 'dynamic_mock'
    };
  }

  // Real API call
  if (onProgress) onProgress(progressSteps[0]);

  try {
    const systemInstruction = `You are VoyageAI, an expert personalized travel planner.
You must respond with ONLY valid JSON strictly adhering to this schema:
{
  "tripTitle": "Concise trip title",
  "destination": "Destination name",
  "summary": "1-2 sentence overview",
  "totalDays": ${params.duration},
  "estimatedBudget": {
    "currency": "${params.currency}",
    "total": ${params.budget},
    "breakdown": {
      "accommodation": 0,
      "food": 0,
      "transport": 0,
      "activities": 0,
      "miscellaneous": 0
    }
  },
  "days": [
    {
      "day": 1,
      "title": "Day focus",
      "summary": "Short day description",
      "morning": {
        "time": "09:00",
        "activity": "Activity title",
        "description": "Details",
        "estimatedCost": "Cost with currency"
      },
      "afternoon": {
        "time": "13:30",
        "activity": "Activity title",
        "description": "Details",
        "estimatedCost": "Cost with currency"
      },
      "evening": {
        "time": "18:00",
        "activity": "Activity title",
        "description": "Details",
        "estimatedCost": "Cost with currency"
      },
      "food": ["Dish or dining spot 1", "Dish or dining spot 2"],
      "transport": "Specific transit suggestion",
      "estimatedCost": "Total day cost"
    }
  ],
  "stay": {
    "recommendation": "Stay area and hotel type",
    "reason": "Why it fits the trip pace and budget",
    "budgetGuidance": "Nightly guidance"
  },
  "foodRecommendations": ["Spot or dish 1", "Spot or dish 2"],
  "transportTips": ["Tip 1", "Tip 2"],
  "packingTips": ["Packing item 1", "Packing item 2"],
  "travelTips": ["Tip 1", "Tip 2"],
  "hiddenGems": ["Gem 1", "Gem 2"],
  "thingsToAvoid": ["Avoidance tip 1"]
}
CRITICAL RULE: "days" array MUST have EXACTLY ${params.duration} items (Day 1 through Day ${params.duration}). Never produce more or fewer days.`;

    if (onProgress) onProgress(progressSteps[2]);

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 3800,
        response_format: { type: 'json_object' }
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    if (onProgress) onProgress(progressSteps[4]);

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content returned from AI API.');
    }

    if (onProgress) onProgress(progressSteps[5]);

    const parsedPlan = parseAiResponse(content, params);
    return {
      ...parsedPlan,
      usedPrompt: prompt,
      source: 'openai'
    };
  } catch (error) {
    console.error('AI Service request failed, falling back to dynamic itinerary:', error);
    const fallback = generateStructuredMockTrip(params);
    return {
      ...fallback,
      usedPrompt: prompt,
      source: 'fallback_error',
      apiError: error.message
    };
  }
}
