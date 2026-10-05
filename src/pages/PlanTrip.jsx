import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Heart, 
  Users, 
  Hotel, 
  Utensils, 
  Sparkles, 
  Check, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { 
  QUICK_DESTINATIONS, 
  TRAVEL_STYLES, 
  CURRENCIES, 
  BUDGET_TIERS, 
  COMPANIONS, 
  ACCOMMODATION_TYPES, 
  FOOD_PREFERENCES, 
  INTEREST_OPTIONS 
} from '../data/destinations';
import { formatDisplayDate, formatCurrencyValue } from '../utils/format';
import LoadingState from '../components/LoadingState';
import Footer from '../components/Footer';

export default function PlanTrip({ onOpenApiKeyModal }) {
  const navigate = useNavigate();
  const { formValues, updateFormValues, generateTrip, isGenerating, loadingState } = useTrip();

  const [validationErrors, setValidationErrors] = useState({});
  const [customDurationActive, setCustomDurationActive] = useState(formValues.duration > 7);
  const [customDurationValue, setCustomDurationValue] = useState(String(formValues.duration > 7 ? formValues.duration : 10));
  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const [customBudgetInput, setCustomBudgetInput] = useState(String(formValues.budget));

  const quickDaysList = [1, 2, 3, 4, 5, 6, 7];
  const activeCurrency = formValues.currency || 'INR';
  const currencySymbol = CURRENCIES.find((c) => c.code === activeCurrency)?.symbol || '₹';
  const currentBudgetTiers = BUDGET_TIERS[activeCurrency] || BUDGET_TIERS.INR;

  const handleSelectQuickDestination = (dest) => {
    updateFormValues({
      destination: dest.name,
      currency: dest.currency,
      duration: dest.defaultDays,
      budget: dest.budget,
      travelStyle: dest.style,
      startingLocation: dest.startingFrom
    });
    setCustomDurationActive(false);
    setIsCustomBudget(false);
    setValidationErrors((prev) => ({ ...prev, destination: null }));
  };

  const handleQuickDurationClick = (days) => {
    setCustomDurationActive(false);
    updateFormValues({ duration: days });
    setValidationErrors((prev) => ({ ...prev, duration: null }));
  };

  const handleCustomDurationToggle = () => {
    setCustomDurationActive(true);
    const parsed = Math.max(1, Math.min(21, parseInt(customDurationValue, 10) || 10));
    updateFormValues({ duration: parsed });
  };

  const handleCustomDurationChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomDurationValue(val);
    const parsed = parseInt(val, 10);
    if (parsed && parsed >= 1 && parsed <= 21) {
      updateFormValues({ duration: parsed });
    }
  };

  const handleSelectBudgetTier = (tier) => {
    setIsCustomBudget(false);
    updateFormValues({ budget: tier.amount });
    setValidationErrors((prev) => ({ ...prev, budget: null }));
  };

  const handleCustomBudgetToggle = () => {
    setIsCustomBudget(true);
    const parsed = parseInt(customBudgetInput.replace(/[^0-9]/g, ''), 10) || 15000;
    updateFormValues({ budget: parsed });
  };

  const handleCustomBudgetChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomBudgetInput(val);
    const parsed = parseInt(val, 10);
    if (parsed && parsed > 0) {
      updateFormValues({ budget: parsed });
      setValidationErrors((prev) => ({ ...prev, budget: null }));
    }
  };

  const toggleInterest = (interestName) => {
    const current = formValues.interests || [];
    if (current.includes(interestName)) {
      if (current.length === 1) return; // Keep at least one
      updateFormValues({ interests: current.filter((i) => i !== interestName) });
    } else {
      updateFormValues({ interests: [...current, interestName] });
    }
  };

  const toggleFoodPreference = (foodName) => {
    const current = formValues.foodPreferences || [];
    if (foodName === 'No Preference') {
      updateFormValues({ foodPreferences: ['No Preference'] });
      return;
    }
    const filtered = current.filter((f) => f !== 'No Preference');
    if (filtered.includes(foodName)) {
      if (filtered.length === 1) {
        updateFormValues({ foodPreferences: ['No Preference'] });
      } else {
        updateFormValues({ foodPreferences: filtered.filter((f) => f !== foodName) });
      }
    } else {
      updateFormValues({ foodPreferences: [...filtered, foodName] });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formValues.destination || !formValues.destination.trim()) {
      errors.destination = 'Where are you heading? Please enter a destination.';
    }
    if (!formValues.startDate) {
      errors.startDate = 'Choose a start date.';
    }
    if (!formValues.duration || formValues.duration < 1) {
      errors.duration = "Select how long you'd like to travel.";
    }
    if (!formValues.budget || formValues.budget <= 0) {
      errors.budget = 'Add a budget so we can plan realistically.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    try {
      await generateTrip(formValues, () => {
        navigate('/trip');
      });
    } catch (err) {
      // Error handled via state
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col justify-center items-center py-20 px-4">
        <LoadingState
          destination={formValues.destination}
          stepInfo={loadingState}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#08090e]/85 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to VoyageAI</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-cyan-400">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white font-display">
              Voyage<span className="text-cyan-400">AI</span>
            </span>
          </Link>

          <button
            onClick={onOpenApiKeyModal}
            className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            API Settings
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full animate-fade-in">
        {/* Progress indicator */}
        <div className="flex items-center justify-between max-w-xl mx-auto mb-10 text-[11px] font-mono text-slate-500 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span>01</span>
            <span className="text-white">Destination</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span>02</span>
            <span className="text-white">Dates</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span>03</span>
            <span className="text-white">Preferences</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>04</span>
            <span>Generate</span>
          </div>
        </div>

        {/* Page Titles */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display mb-2">
            Plan your journey
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Tell us a little about your trip. We'll handle the rest.
          </p>
        </div>

        {/* Main Planning Container with subtle 3D card perspective */}
        <div className="perspective-container">
          <form
            onSubmit={handleSubmit}
            className="surface-card rounded-2xl p-6 sm:p-10 border border-white/[0.08] space-y-12 shadow-2xl card-3d-interactive"
          >
            {/* ========================================================= */}
            {/* 1. DESTINATION */}
            {/* ========================================================= */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                    Step 01
                  </span>
                  <h2 className="text-base sm:text-lg font-semibold text-white font-display">
                    Where are you going?
                  </h2>
                </div>
              </div>

              {/* Large Destination Input */}
              <div className="space-y-1">
                <div className="relative">
                  <MapPin className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Search a destination (e.g. Goa, Tokyo, Paris, Bali, Swiss Alps)"
                    value={formValues.destination}
                    onChange={(e) => {
                      updateFormValues({ destination: e.target.value });
                      setValidationErrors((prev) => ({ ...prev, destination: null }));
                    }}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#10121b] border border-white/10 rounded-xl text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                {validationErrors.destination && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{validationErrors.destination}</span>
                  </p>
                )}
              </div>

              {/* Quick Destination Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-500 font-medium">Quick suggestions:</span>
                {QUICK_DESTINATIONS.map((d) => {
                  const isSelected = formValues.destination.toLowerCase() === d.name.toLowerCase();
                  return (
                    <button
                      key={d.name}
                      type="button"
                      onClick={() => handleSelectQuickDestination(d)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-white/15 text-white border-white/30 shadow-sm'
                          : 'bg-[#10121b] text-slate-400 border-white/5 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      {d.name}
                    </button>
                  );
                })}
              </div>

              {/* Optional: Starting From */}
              <div className="pt-2">
                <label className="block text-xs text-slate-400 mb-1">
                  Starting from <span className="text-slate-500 font-normal">(optional — helps tailor airport / train transport)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru, Mumbai, Delhi, London..."
                  value={formValues.startingLocation || ''}
                  onChange={(e) => updateFormValues({ startingLocation: e.target.value })}
                  className="w-full sm:w-80 px-3.5 py-2 bg-[#10121b] border border-white/10 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. DATES AND DURATION */}
            {/* ========================================================= */}
            <div className="space-y-4 pt-6 border-t border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Step 02
                </span>
                <h2 className="text-base sm:text-lg font-semibold text-white font-display">
                  When and for how long?
                </h2>
              </div>

              {/* Start Date & End Date calculation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formValues.startDate}
                    onChange={(e) => {
                      updateFormValues({ startDate: e.target.value });
                      setValidationErrors((prev) => ({ ...prev, startDate: null }));
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#10121b] border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                  <span className="text-[11px] text-slate-500 block">
                    {formatDisplayDate(formValues.startDate)}
                  </span>
                  {validationErrors.startDate && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{validationErrors.startDate}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Calculated End Date
                  </label>
                  <div className="px-3.5 py-2.5 bg-[#10121b]/60 border border-white/5 rounded-xl text-sm text-slate-300 flex items-center justify-between">
                    <span>{formatDisplayDate(formValues.endDate)}</span>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                      Exact {formValues.duration} {formValues.duration === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    Itinerary will strictly contain Day 1 to Day {formValues.duration}
                  </span>
                </div>
              </div>

              {/* Duration Buttons [1 day] [2 days] ... [7 days] [Custom] */}
              <div className="space-y-2 pt-2">
                <span className="text-xs text-slate-300 font-medium block">
                  Select Trip Duration:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {quickDaysList.map((d) => {
                    const isSelected = !customDurationActive && formValues.duration === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleQuickDurationClick(d)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-white text-slate-950 font-semibold shadow-sm'
                            : 'bg-[#10121b] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {d} {d === 1 ? 'day' : 'days'}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={handleCustomDurationToggle}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      customDurationActive
                        ? 'bg-white text-slate-950 font-semibold'
                        : 'bg-[#10121b] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    Custom
                  </button>

                  {customDurationActive && (
                    <div className="flex items-center gap-2 pl-2">
                      <input
                        type="number"
                        min="1"
                        max="21"
                        value={customDurationValue}
                        onChange={handleCustomDurationChange}
                        className="w-16 py-2 px-2 bg-[#10121b] border border-cyan-500/40 rounded-xl text-xs text-center text-white focus:outline-none"
                      />
                      <span className="text-xs text-slate-400">days (max 21)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. TRAVEL STYLE & PACE */}
            {/* ========================================================= */}
            <div className="space-y-4 pt-6 border-t border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Step 03
                </span>
                <h2 className="text-base sm:text-lg font-semibold text-white font-display">
                  How do you like to travel?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TRAVEL_STYLES.map((style) => {
                  const isSelected = formValues.travelStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => updateFormValues({ travelStyle: style.id })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/30 text-white shadow-sm'
                          : 'bg-[#10121b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">{style.title}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{style.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================= */}
            {/* 4. BUDGET */}
            {/* ========================================================= */}
            <div className="space-y-4 pt-6 border-t border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Step 04
                </span>
                <h2 className="text-base sm:text-lg font-semibold text-white font-display">
                  What's your budget?
                </h2>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 mr-1">Currency:</span>
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      updateFormValues({ currency: c.code });
                      // Set default for currency
                      const defaultAmt = BUDGET_TIERS[c.code]?.[0]?.amount || 15000;
                      updateFormValues({ budget: defaultAmt });
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeCurrency === c.code
                        ? 'bg-white text-slate-950'
                        : 'bg-[#10121b] text-slate-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Budget Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                {currentBudgetTiers.map((tier) => {
                  const isSelected = !isCustomBudget && formValues.budget === tier.amount;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleSelectBudgetTier(tier)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/30 text-white'
                          : 'bg-[#10121b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-200">{tier.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-sm font-mono font-bold text-emerald-400 mb-1">
                        {currencySymbol}{tier.amount.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">{tier.desc}</p>
                    </button>
                  );
                })}

                {/* Custom Budget Card */}
                <div
                  onClick={handleCustomBudgetToggle}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isCustomBudget
                      ? 'bg-white/[0.08] border-white/30 text-white'
                      : 'bg-[#10121b] border-white/5 text-slate-400 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-200">Custom Budget</span>
                    {isCustomBudget && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs font-mono text-slate-400">{currencySymbol}</span>
                    <input
                      type="text"
                      value={customBudgetInput}
                      onChange={handleCustomBudgetChange}
                      onFocus={handleCustomBudgetToggle}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-cyan-500/50"
                      placeholder="Amount"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 5. COMPANIONS */}
            {/* ========================================================= */}
            <div className="space-y-4 pt-6 border-t border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Step 05
                </span>
                <h2 className="text-base sm:text-lg font-semibold text-white font-display">
                  Who are you travelling with?
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COMPANIONS.map((comp) => {
                  const isSelected = formValues.travellers === comp.id;
                  return (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => updateFormValues({ travellers: comp.id })}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/30 text-white'
                          : 'bg-[#10121b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-200">{comp.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">{comp.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================= */}
            {/* 6. ACCOMMODATION & FOOD PREFERENCES */}
            {/* ========================================================= */}
            <div className="space-y-6 pt-6 border-t border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Step 06
                </span>
                <h2 className="text-base sm:text-lg font-semibold text-white font-display">
                  Stay & Dining Preferences
                </h2>
              </div>

              {/* Stay preference */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Where would you like to stay?
                </label>
                <div className="flex flex-wrap gap-2">
                  {ACCOMMODATION_TYPES.map((type) => {
                    const isSelected = formValues.accommodation === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateFormValues({ accommodation: type })}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-colors ${
                          isSelected
                            ? 'bg-white/15 text-white border-white/30'
                            : 'bg-[#10121b] text-slate-400 border-white/5 hover:border-white/15 hover:text-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Food preference */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  What kind of food do you prefer?
                </label>
                <div className="flex flex-wrap gap-2">
                  {FOOD_PREFERENCES.map((food) => {
                    const isSelected = (formValues.foodPreferences || []).includes(food);
                    return (
                      <button
                        key={food}
                        type="button"
                        onClick={() => toggleFoodPreference(food)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-colors ${
                          isSelected
                            ? 'bg-white/15 text-white border-white/30'
                            : 'bg-[#10121b] text-slate-400 border-white/5 hover:border-white/15 hover:text-slate-200'
                        }`}
                      >
                        {food}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 7. INTERESTS */}
            {/* ========================================================= */}
            <div className="space-y-4 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                    Step 07
                  </span>
                  <h2 className="text-base sm:text-lg font-semibold text-white font-display">
                    What are you interested in?
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {formValues.interests?.length || 0} selected
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INTEREST_OPTIONS.map((item) => {
                  const isSelected = (formValues.interests || []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item)}
                      className={`px-3 py-2 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/25 text-white'
                          : 'bg-[#10121b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                      }`}
                    >
                      <span>{item}</span>
                      {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================= */}
            {/* 8. SPECIAL REQUESTS */}
            {/* ========================================================= */}
            <div className="space-y-2 pt-6 border-t border-white/[0.06]">
              <label className="block text-xs font-medium text-slate-300">
                Anything else we should know? <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Beachfront stay, sunrise spots, avoid expensive restaurants, traveling with parents..."
                value={formValues.specialRequests || ''}
                onChange={(e) => updateFormValues({ specialRequests: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#10121b] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 resize-none"
              />
            </div>

            {/* ========================================================= */}
            {/* SMART TRIP SUMMARY (LIVE UPDATE) */}
            {/* ========================================================= */}
            <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                Live Trip Summary
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold uppercase tracking-wider font-display">
                  {formValues.destination.toUpperCase() || 'DESTINATION'}
                </span>
                <span className="px-2 py-1 rounded-lg bg-white/5 text-cyan-300 font-mono">
                  {formValues.duration} DAYS
                </span>
                <span className="px-2 py-1 rounded-lg bg-white/5 text-slate-300">
                  {formValues.travelStyle.toUpperCase()}
                </span>
                <span className="px-2 py-1 rounded-lg bg-emerald-950/40 text-emerald-400 font-mono border border-emerald-800/40">
                  {currencySymbol}{formValues.budget?.toLocaleString()}
                </span>
                <span className="px-2 py-1 rounded-lg bg-white/5 text-slate-400 truncate max-w-xs">
                  {formValues.interests?.slice(0, 3).join(' • ').toUpperCase()}
                </span>
                <span className="px-2 py-1 rounded-lg bg-white/5 text-slate-400">
                  {formValues.travellers.toUpperCase()}
                </span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* GENERATE BUTTON */}
            {/* ========================================================= */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-white/10 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Generate My Trip</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
