import React, { useState } from 'react';
import { 
  Calendar, 
  DollarSign, 
  Heart, 
  MapPin, 
  Sun, 
  Sunset, 
  Moon, 
  Utensils, 
  Coins, 
  Hotel, 
  Compass, 
  Car, 
  Lightbulb, 
  Share2, 
  Printer, 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  FileCode2,
  ExternalLink
} from 'lucide-react';
import { getDestinationImage } from '../data/destinations';

export default function TripDashboard({ planData, onEditTrip, onRegenerate }) {
  const [selectedDay, setSelectedDay] = useState('all');
  const [copied, setCopied] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  if (!planData) return null;

  const { tripOverview, itinerary, accommodation, food, places, activities, transportation, budget, travelTips, usedPrompt, source, notice } = planData;
  const heroImage = getDestinationImage(tripOverview.destination);

  const handleCopyItinerary = () => {
    let text = `VOYAGE AI — PERSONALIZED TRAVEL PLAN\n`;
    text += `Destination: ${tripOverview.destination}\nDates: ${tripOverview.dates}\nBudget: ${tripOverview.budget}\nTravel Style: ${tripOverview.travelStyle}\n\n`;
    text += `ITINERARY:\n`;
    itinerary.forEach((d) => {
      text += `Day ${d.day}: ${d.title}\n`;
      text += `• Morning: ${d.morning}\n`;
      text += `• Afternoon: ${d.afternoon}\n`;
      text += `• Evening: ${d.evening}\n`;
      text += `• Food: ${d.food}\n`;
      text += `• Est. Cost: ${d.estimatedCost}\n\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredItinerary = selectedDay === 'all' 
    ? itinerary 
    : itinerary.filter((d) => d.day === Number(selectedDay));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Notice Banner (OpenAI source status) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-xs">
        <div className="flex items-center gap-2.5 text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>{notice || 'Personalized itinerary synthesized successfully.'}</span>
        </div>
        <div className="flex items-center gap-2">
          {usedPrompt && (
            <button
              onClick={() => setShowPromptModal(true)}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-200 underline flex items-center gap-1 cursor-pointer"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Inspect OpenAI Prompt</span>
            </button>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 1. TRIP OVERVIEW BANNER */}
      {/* ================================================================= */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={tripOverview.destination}
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-105 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050711] via-[#050711]/60 to-transparent"></div>
          <div className="absolute inset-0 cyber-grid opacity-15"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5" />
              <span>Personalized Itinerary Generated</span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyItinerary}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl backdrop-blur-md transition-colors"
                title="Copy entire plan to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copied ? 'Copied' : 'Copy Plan'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl backdrop-blur-md transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={onEditTrip}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 rounded-xl shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-950" />
                <span>Edit Details</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-display mb-2">
              {tripOverview.destination}
            </h1>
            <p className="text-lg sm:text-xl text-cyan-200 font-medium">
              {tripOverview.tagline}
            </p>
            {tripOverview.vibe && (
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
                {tripOverview.vibe}
              </p>
            )}
          </div>

          {/* Core Parameters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="glass-panel p-3.5 rounded-2xl border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Destination
              </span>
              <span className="text-base font-bold text-white font-display truncate block">
                {tripOverview.destination}
              </span>
            </div>

            <div className="glass-panel p-3.5 rounded-2xl border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Dates
              </span>
              <span className="text-base font-bold text-white font-display truncate block">
                {tripOverview.dates}
              </span>
            </div>

            <div className="glass-panel p-3.5 rounded-2xl border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Budget
              </span>
              <span className="text-base font-bold text-emerald-300 font-display truncate block">
                {tripOverview.budget}
              </span>
            </div>

            <div className="glass-panel p-3.5 rounded-2xl border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" /> Travel Style
              </span>
              <span className="text-base font-bold text-white font-display truncate block">
                {tripOverview.travelStyle}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. AI-GENERATED ITINERARY (DAY-BY-DAY) */}
      {/* ================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Day-by-Day Journey</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              AI-Generated Itinerary
            </h2>
          </div>

          {/* Day Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0a0e22] p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setSelectedDay('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDay === 'all'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Days ({itinerary.length})
            </button>
            {itinerary.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day.toString())}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedDay === d.day.toString()
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>
        </div>

        {/* Day Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredItinerary.map((dayItem) => (
            <div
              key={dayItem.day}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-xl relative overflow-hidden group"
            >
              {/* Day badge & title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-lg font-display">
                    D{dayItem.day}
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      Day {dayItem.day}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      {dayItem.title || `Day ${dayItem.day} Exploration`}
                    </h3>
                  </div>
                </div>

                {/* Day Estimated Cost */}
                {dayItem.estimatedCost && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold self-start sm:self-auto">
                    <Coins className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Est. Cost: {dayItem.estimatedCost}</span>
                  </div>
                )}
              </div>

              {/* Time Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                {/* Morning */}
                <div className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Morning</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {dayItem.morning}
                  </p>
                </div>

                {/* Afternoon */}
                <div className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                    <Sunset className="w-4 h-4 text-cyan-400" />
                    <span>Afternoon</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {dayItem.afternoon}
                  </p>
                </div>

                {/* Evening */}
                <div className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span>Evening</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {dayItem.evening}
                  </p>
                </div>
              </div>

              {/* Food footer */}
              {dayItem.food && (
                <div className="mt-4 p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div className="text-xs leading-relaxed">
                    <span className="font-semibold text-cyan-300">Curated Dining: </span>
                    <span className="text-slate-300">{dayItem.food}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. SEPARATE SPECIALIZED CARDS */}
      {/* ================================================================= */}
      <section className="space-y-8 pt-4">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Essential Trip Pillars</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Curated Trip Recommendations
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 🏨 CARD 1: ACCOMMODATION */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Hotel className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      🏨 Accommodation
                    </h3>
                    <p className="text-xs text-slate-400">Selected for comfort, location & vibe</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {accommodation.map((stay, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">{stay.name}</h4>
                        <span className="text-xs text-cyan-400 font-medium">{stay.type} • {stay.area}</span>
                      </div>
                      {stay.pricePerNight && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                          {stay.pricePerNight}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {stay.features}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🍴 CARD 2: FOOD */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      🍴 Food & Dining
                    </h3>
                    <p className="text-xs text-slate-400">Must-try culinary specialties & iconic spots</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {food.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-100">{item.dishOrSpot}</h4>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/40">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 📍 CARD 3: PLACES */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      📍 Places to Visit
                    </h3>
                    <p className="text-xs text-slate-400">Iconic landmarks, viewpoints & heritage</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {places.map((place, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-100">{place.name}</h4>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                        {place.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {place.description}
                    </p>
                    {place.bestTime && (
                      <span className="text-[11px] text-cyan-400 block pt-0.5 font-medium">
                        ⏱ Best time: {place.bestTime}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🎯 CARD 4: ACTIVITIES */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      🎯 Activities & Experiences
                    </h3>
                    <p className="text-xs text-slate-400">Curated adventures matched to your interests</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {activities.map((act, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-100">{act.title}</h4>
                      {act.duration && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-800/40">
                          {act.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {act.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🚗 CARD 5: TRANSPORTATION */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      🚗 Transportation
                    </h3>
                    <p className="text-xs text-slate-400">Local transit options, rentals & transfers</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {transportation.map((t, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-100">{t.mode}</h4>
                      {t.estimatedCost && (
                        <span className="text-xs font-semibold text-emerald-400 font-mono">
                          {t.estimatedCost}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 💰 CARD 6: BUDGET */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      💰 Budget Breakdown
                    </h3>
                    <p className="text-xs text-slate-400">Estimated daily expenses & distribution</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Est. Daily</span>
                  <span className="text-sm font-bold text-emerald-300 font-display">
                    {budget.estimatedDailyExpense}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5">
                {budget.breakdown && budget.breakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{item.category}</span>
                      <span className="text-emerald-400">{item.amount} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 💡 CARD 7: AI TRAVEL TIPS (Full Width) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
            <div className="p-2.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                💡 AI Travel Tips
              </h3>
              <p className="text-xs text-slate-400">Practical insider knowledge & smart safety hacks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {travelTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#080b1a]/70 border border-white/5 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          Trip planned with <span className="text-cyan-400 font-semibold">VoyageAI</span> Assistant
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onEditTrip}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            ← Modify Trip Details
          </button>
          <span>•</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-slate-300"
          >
            Back to Top ↑
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* OPENAI PROMPT INSPECTOR MODAL */}
      {/* ================================================================= */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl glass-panel rounded-2xl border border-cyan-500/30 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-cyan-400">
                <FileCode2 className="w-5 h-5" />
                <h3 className="font-bold text-white font-display">VoyageAI Prompt Transmitted to OpenAI</h3>
              </div>
              <button
                onClick={() => setShowPromptModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Generated Prompt:
              </span>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-cyan-300/90 whitespace-pre-wrap leading-relaxed">
                {usedPrompt}
              </pre>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed bg-cyan-950/20 p-3 rounded-xl border border-cyan-800/30">
              💡 This prompt was structured strictly according to the project specifications:
              Destination, Dates, Budget, Travel Style, and Interests.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
