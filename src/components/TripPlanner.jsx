import React, { useState } from 'react';
import { MapPin, Sparkles, Check, AlertCircle } from 'lucide-react';
import TripDuration from './TripDuration';
import { 
  POPULAR_DESTINATIONS, 
  TRAVEL_STYLES, 
  TRAVEL_PACES, 
  INTEREST_OPTIONS, 
  BUDGET_PRESETS 
} from '../data/destinations';
import { calculateEndDate, toISODate, formatCurrencyValue } from '../utils/format';

export default function TripPlanner({ onSubmit, isLoading, presetData }) {
  // Compute default start date (7 days from now)
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() + 7);

  const [destination, setDestination] = useState(presetData?.destination || 'Goa');
  const [startDate, setStartDate] = useState(presetData?.startDate || toISODate(defaultStartDate));
  const [durationDays, setDurationDays] = useState(presetData?.durationDays || 5);
  const [currency, setCurrency] = useState(presetData?.currency || '₹');
  const [budgetAmount, setBudgetAmount] = useState(presetData?.budgetAmount || '25,000');
  const [travelStyle, setTravelStyle] = useState(presetData?.travelStyle || 'Couple');
  const [travelPace, setTravelPace] = useState(presetData?.travelPace || 'Balanced');
  const [interests, setInterests] = useState(presetData?.interests || ['Beaches', 'Food', 'Adventure']);
  const [specialPreferences, setSpecialPreferences] = useState(presetData?.specialPreferences || '');
  const [validationError, setValidationError] = useState('');

  const activePresets = BUDGET_PRESETS[currency] || BUDGET_PRESETS['₹'];

  const toggleInterest = (id) => {
    if (interests.includes(id)) {
      if (interests.length === 1) return; // Keep at least one
      setInterests(interests.filter((i) => i !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleApplyPresetDestination = (p) => {
    setDestination(p.name);
    setCurrency(p.currency);
    setBudgetAmount(p.defaultBudget);
    setDurationDays(p.defaultDays);
    setTravelStyle(p.style);
    setTravelPace(p.pace);
    setInterests(p.interests);
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      setValidationError('Please enter a destination.');
      return;
    }
    if (!startDate) {
      setValidationError('Please choose a start date.');
      return;
    }
    setValidationError('');

    const calculatedEndDate = calculateEndDate(startDate, durationDays);
    const cleanedBudget = formatCurrencyValue(budgetAmount, currency);

    onSubmit({
      destination: destination.trim(),
      startDate,
      endDate: calculatedEndDate,
      durationDays,
      currency,
      budgetAmount,
      budget: cleanedBudget,
      travelStyle,
      travelPace,
      interests,
      specialPreferences: specialPreferences.trim()
    });
  };

  return (
    <section id="planner" className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="surface-card rounded-2xl p-6 sm:p-10 border border-white/[0.08] relative">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left border-b border-white/[0.06] pb-8">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
            Trip Preferences
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Plan Your Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
            Complete the steps below. VoyageAI constructs a structured travel prompt to craft your tailored itinerary.
          </p>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-white/[0.04]">
            <span className="text-[11px] text-slate-500 mr-1">Popular:</span>
            {POPULAR_DESTINATIONS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleApplyPresetDestination(p)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                  destination.toLowerCase() === p.name.toLowerCase()
                    ? 'bg-white/10 text-white border-white/20'
                    : 'bg-white/[0.02] text-slate-400 border-white/5 hover:text-slate-200 hover:border-white/15'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {validationError && (
          <div className="mb-6 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* STEP 01: Destination */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-semibold">
                STEP 01
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Where are you dreaming of going?
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Goa, Tokyo, Paris, Bali, New York..."
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (validationError) setValidationError('');
                }}
                className="w-full px-4 py-3 bg-[#10121b] border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>

          {/* STEP 02: Dates & Duration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-semibold">
                STEP 02
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                How long are you staying?
              </label>
            </div>
            <TripDuration
              startDate={startDate}
              onStartDateChange={setStartDate}
              durationDays={durationDays}
              onDurationChange={setDurationDays}
            />
          </div>

          {/* STEP 03: Budget */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-semibold">
                STEP 03
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                What's your travel budget?
              </label>
            </div>

            <div className="flex gap-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-20 px-2 py-2.5 bg-[#10121b] border border-white/10 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500/50"
              >
                <option value="₹">₹ INR</option>
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
                <option value="¥">¥ JPY</option>
              </select>

              <input
                type="text"
                required
                placeholder="Budget amount"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#10121b] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Quick budget pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 mr-1">Presets:</span>
              {activePresets.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setBudgetAmount(amt)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                    budgetAmount === amt
                      ? 'bg-white/10 text-white border-white/20'
                      : 'bg-[#10121b] text-slate-400 border-white/5 hover:text-slate-200 hover:border-white/10'
                  }`}
                >
                  {currency}{amt}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 04: Travel Style */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-semibold">
                STEP 04
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                What kind of trip is this?
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TRAVEL_STYLES.map((style) => {
                const isSelected = travelStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setTravelStyle(style.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white/[0.08] border-white/25 text-white'
                        : 'bg-[#10121b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-200">{style.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">{style.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 05: Travel Pace */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-semibold">
                STEP 05
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                What pace suits you best?
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TRAVEL_PACES.map((p) => {
                const isSelected = travelPace === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setTravelPace(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white/[0.08] border-white/25 text-white'
                        : 'bg-[#10121b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-200">{p.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 06: Interests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-semibold">
                  STEP 06
                </span>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  What should we prioritize?
                </label>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {interests.length} selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {INTEREST_OPTIONS.map((item) => {
                const isSelected = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`px-3 py-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white/[0.08] border-white/25 text-white'
                        : 'bg-[#10121b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-medium">{item.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 07: Special Preferences */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-semibold">
                STEP 07
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Anything else we should know? <span className="text-slate-500 font-normal lowercase">(optional)</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="e.g. Vegetarian, prefer quiet spots, traveling with parents, love sunrises..."
              value={specialPreferences}
              onChange={(e) => setSpecialPreferences(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#10121b] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-white/[0.06]">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-sm transition-all duration-200 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            >
              Generate My Trip →
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-3">
              Generates an exact {durationDays}-day personalized itinerary tailored to your preferences.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
