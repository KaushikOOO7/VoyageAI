// Backwards-compatible bridge to unified aiService
export {
  getActiveApiKey,
  saveUserApiKey,
  isApiKeyConfigured,
  planTripWithAi as generateTravelPlan
} from './aiService';
