import React, { createContext, useContext, useState, useEffect } from 'react';
import { planTripWithAi } from '../services/aiService';
import { toISODate, calculateEndDate } from '../utils/format';

const TripContext = createContext(null);

const DEFAULT_START_DAYS = 7;
const today = new Date();
const defaultStartDate = new Date(today);
defaultStartDate.setDate(today.getDate() + DEFAULT_START_DAYS);

const initialFormValues = {
  destination: 'Goa',
  startingLocation: 'Bengaluru',
  startDate: toISODate(defaultStartDate),
  duration: 5,
  endDate: calculateEndDate(toISODate(defaultStartDate), 5),
  budget: 15000,
  currency: 'INR',
  travelStyle: 'Balanced',
  travellers: 'Couple',
  accommodation: 'Boutique',
  foodPreferences: ['Local Food'],
  interests: ['Beaches', 'Food', 'Culture', 'Adventure'],
  specialRequests: ''
};

export function TripProvider({ children }) {
  const [formValues, setFormValues] = useState(() => {
    try {
      const saved = sessionStorage.getItem('voyage_form_values');
      return saved ? JSON.parse(saved) : initialFormValues;
    } catch (e) {
      return initialFormValues;
    }
  });

  const [tripPlan, setTripPlan] = useState(() => {
    try {
      const saved = sessionStorage.getItem('voyage_trip_plan');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingState, setLoadingState] = useState({ step: 1, message: 'Planning your journey...' });
  const [error, setError] = useState(null);

  // Sync with session storage so refresh preserves results
  useEffect(() => {
    try {
      sessionStorage.setItem('voyage_form_values', JSON.stringify(formValues));
    } catch (e) {}
  }, [formValues]);

  useEffect(() => {
    try {
      if (tripPlan) {
        sessionStorage.setItem('voyage_trip_plan', JSON.stringify(tripPlan));
      } else {
        sessionStorage.removeItem('voyage_trip_plan');
      }
    } catch (e) {}
  }, [tripPlan]);

  const updateFormValues = (updates) => {
    setFormValues((prev) => {
      const next = { ...prev, ...updates };
      if (updates.startDate || updates.duration) {
        const start = updates.startDate || prev.startDate;
        const dur = updates.duration !== undefined ? updates.duration : prev.duration;
        next.endDate = calculateEndDate(start, dur);
      }
      return next;
    });
  };

  const generateTrip = async (customParams = null, onSuccess = null) => {
    const paramsToUse = customParams || formValues;
    setIsGenerating(true);
    setError(null);

    try {
      const result = await planTripWithAi(paramsToUse, (progress) => {
        setLoadingState(progress);
      });
      setTripPlan(result);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      console.error('Generation failed:', err);
      setError(err.message || 'Something went wrong while planning your trip.');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateTrip = async () => {
    return generateTrip(formValues);
  };

  const startOver = (navigate) => {
    setTripPlan(null);
    setFormValues(initialFormValues);
    if (navigate) navigate('/plan');
  };

  const modifyTrip = (navigate) => {
    if (navigate) navigate('/plan');
  };

  return (
    <TripContext.Provider
      value={{
        formValues,
        updateFormValues,
        tripPlan,
        setTripPlan,
        isGenerating,
        loadingState,
        error,
        setError,
        generateTrip,
        regenerateTrip,
        startOver,
        modifyTrip
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return ctx;
}
