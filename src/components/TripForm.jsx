import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Heart, 
  User, 
  Palmtree, 
  Utensils, 
  Compass, 
  Landmark, 
  Scroll, 
  ShoppingBag, 
  Trees, 
  Music, 
  Camera,
  ArrowRight,
  Info
} from 'lucide-react';
import { DESTINATION_PRESETS, INTEREST_OPTIONS, TRAVEL_STYLES } from '../data/destinations';

export default function TripForm({ onSubmit, isLoading, presetData }) {
  // Today's date in YYYY-MM-DD
  const today = new Date();
  const defaultStart = new Date(today);
  defaultStart.setDate(today.getDate() + 14);
  const defaultEnd = new Date(defaultStart);
  defaultEnd.setDate(defaultStart.getDate() + 5);

  const formatDate = (d) => d.toISOString().split('T')[0];

  const [destination, setDestination] = useState(presetData?.destination || 'Goa');
  const [startDate, setStartDate] = useState(presetData?.startDate || formatDate(defaultStart));
  const [endDate, setEndDate] = useState(presetData?.endDate || formatDate(defaultEnd));
  const [currency, setCurrency] = useState(presetData?.currency || '₹');
  const [budgetAmount, setBudgetAmount] = useState(presetData?.budgetAmount || '25,000');
  const [travelStyle, setTravelStyle] = useState(presetData?.travelStyle || 'Couple');
  const [interests, setInterests] = useState(presetData?.interests || ['Beaches', 'Food', 'Adventure']);

  // Calculate days
  const calculateDays = (start, end) => {
    if (!start || !end) return 5;
    const diffTime = Math.abs(new Date(end) - new Date(start));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const durationDays = calculateDays(startDate, endDate);

  const toggleInterest = (id) => {
    if (interests.includes(id)) {
      if (interests.length === 1) return; // Keep at least one
      setInterests(interests.filter((item) => item !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleSelectPreset = (preset) => {
    setDestination(preset.name);
    setCurrency(preset.budgetCurrency);
    setBudgetAmount(preset.defaultBudget);
    setTravelStyle(preset.defaultStyle);
    setInterests(preset.defaultInterests);
    
    // adjust end date based on defaultDays
    const newEnd = new Date(startDate);
    newEnd.setDate(newEnd.getDate() + preset.defaultDays);
    setEndDate(formatDate(newEnd));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    const fullBudget = `${currency}${budgetAmount.replace(/[^0-9,]/g, '')}`;
    const formattedDates = `${startDate} to ${endDate} (${durationDays} days)`;

    onSubmit({
      destination: destination.trim(),
      startDate,
      endDate,
      dates: formattedDates,
      durationDays,
      currency,
      budgetAmount,
      budget: fullBudget,
      travelStyle,
      interests
    });
  };

  const getInterestIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Palmtree': return <Palmtree className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'Landmark': return <Landmark className="w-4 h-4" />;
      case 'Scroll': return <Scroll className="w-4 h-4" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4" />;
      case 'Trees': return <Trees className="w-4 h-4" />;
      case 'Music': return <Music className="w-4 h-4" />;
      case 'Camera': return <Camera className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getStyleIcon = (iconName) => {
    switch (iconName) {
      case 'User': return <User className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div id="planner" className="relative scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Container Card */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        {/* Glowing top line */}
        <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Autonomous Trip Synthesis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
            Plan Your Journey with AI
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Input your parameters below. VoyageAI transforms them into an intelligent prompt for OpenAI and displays a personalized itinerary.
          </p>

          {/* Quick presets pill bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-xs text-slate-500 font-medium">Quick Presets:</span>
            {DESTINATION_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  destination.toLowerCase() === p.name.toLowerCase()
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/30'
                    : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Destination */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Where do you want to go?
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Goa, Tokyo, Paris, Bali, New York..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-5 py-4 bg-[#0a0e22] border border-white/10 rounded-2xl text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hidden sm:block">
                Destination
              </div>
            </div>
          </div>

          {/* 2. Dates */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                When are you travelling?
              </label>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                {durationDays} {durationDays === 1 ? 'Day' : 'Days'} Itinerary
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-medium">Start Date</span>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e22] border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-medium">End Date</span>
                <input
                  type="date"
                  required
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e22] border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>
          </div>

          {/* 3. Budget */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              Budget
            </label>
            <div className="flex gap-3">
              {/* Currency selector */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-24 sm:w-28 px-3 py-3.5 bg-[#0a0e22] border border-white/10 rounded-xl text-sm font-semibold text-cyan-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="₹">₹ INR</option>
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
                <option value="¥">¥ JPY</option>
              </select>

              {/* Amount input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  placeholder="e.g. 25,000"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  className="w-full px-5 py-3.5 bg-[#0a0e22] border border-white/10 rounded-xl text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-semibold"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hidden sm:block">
                  Total Budget Amount
                </div>
              </div>
            </div>
          </div>

          {/* 4. Travel style */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Heart className="w-4 h-4 text-cyan-400" />
              Travel style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TRAVEL_STYLES.map((style) => {
                const isSelected = travelStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setTravelStyle(style.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-950/60 to-[#0c142c] border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400'}`}>
                        {getStyleIcon(style.icon)}
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-200">{style.label}</div>
                      <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{style.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. What do you like? (Interests) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                What do you like?
              </label>
              <span className="text-xs text-slate-400">
                {interests.length} selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {INTEREST_OPTIONS.map((item) => {
                const isSelected = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`px-3.5 py-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-400/80 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-500'}`}>
                      {getInterestIcon(item.icon)}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-cyan-200' : 'text-slate-300'}`}>
                        {item.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold text-base shadow-[0_0_35px_rgba(6,182,212,0.35)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>✨ Generate My Trip</span>
            </button>

            {/* Quick Demo hint */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => handleSelectPreset(DESTINATION_PRESETS[0])}
                className="text-xs text-slate-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>💡 Example: Goa • 5 days • ₹25,000 • Couple • Beaches, Food, Adventure</span>
                <span className="text-cyan-400">Click to load</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
