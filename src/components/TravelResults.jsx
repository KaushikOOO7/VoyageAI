import React, { useState } from 'react';
import { 
  Calendar, 
  DollarSign, 
  MapPin, 
  Clock, 
  RotateCcw, 
  ArrowLeft, 
  Copy, 
  Printer, 
  Check, 
  Code, 
  Compass, 
  Hotel, 
  Utensils, 
  Car, 
  Sparkles, 
  Lightbulb, 
  ShieldCheck 
} from 'lucide-react';
import { getDestinationBackdrop } from '../data/destinations';

export default function TravelResults({ planData, onRegenerate, onStartOver, isRegenerating }) {
  const [copied, setCopied] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  if (!planData) return null;

  const {
    tripOverview,
    itinerary = [],
    accommodation = [],
    food = [],
    places = [],
    activities = [],
    transportation = [],
    budget = {},
    travelTips = [],
    usedPrompt
  } = planData;

  const backdrop = getDestinationBackdrop(tripOverview.destination);

  const handleCopy = () => {
    let text = `VOYAGE AI — PERSONALIZED TRAVEL PLAN\n`;
    text += `Destination: ${tripOverview.destination}\nDates: ${tripOverview.dates}\nDuration: ${tripOverview.durationDays} days\nBudget: ${tripOverview.budget}\nStyle: ${tripOverview.travelStyle}\nPace: ${tripOverview.travelPace}\n\n`;
    text += `JOURNEY ITINERARY:\n`;
    itinerary.forEach((d) => {
      text += `DAY ${String(d.day).padStart(2, '0')}: ${d.title}\n`;
      text += `• Morning: ${d.morning}\n`;
      text += `• Afternoon: ${d.afternoon}\n`;
      text += `• Evening: ${d.evening}\n`;
      text += `• Food: ${d.food}\n`;
      text += `• Cost: ${d.estimatedCost}\n\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-14 animate-fade-in">
      {/* ================================================================= */}
      {/* TOP NAVIGATION & ACTIONS */}
      {/* ================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <button
          onClick={onStartOver}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Plan another trip</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            title="Generate a fresh itinerary using the same preferences"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-cyan-400 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate Plan</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print</span>
          </button>

          {usedPrompt && (
            <button
              onClick={() => setShowPromptModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
              title="Inspect structured AI prompt"
            >
              <Code className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prompt</span>
            </button>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 1. TRIP OVERVIEW */}
      {/* ================================================================= */}
      <section className="relative rounded-2xl overflow-hidden border border-white/[0.08] surface-card">
        {/* Subtle Backdrop photo */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={backdrop}
            alt={tripOverview.destination}
            className="w-full h-full object-cover filter brightness-[0.22] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090e] via-[#08090e]/70 to-transparent" />
        </div>

        <div className="p-6 sm:p-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Personalized Travel Plan</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-display mb-2">
              {tripOverview.destination}
            </h1>
            <p className="text-base text-slate-300 max-w-2xl">
              {tripOverview.tagline}
            </p>
            {tripOverview.vibe && (
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                {tripOverview.vibe}
              </p>
            )}
          </div>

          {/* Core Parameters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-white/[0.06]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                Dates
              </span>
              <span className="text-xs font-semibold text-white block truncate">
                {tripOverview.dates}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                Duration
              </span>
              <span className="text-xs font-semibold text-cyan-300 block">
                {tripOverview.durationDays} {tripOverview.durationDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                Budget
              </span>
              <span className="text-xs font-semibold text-emerald-300 block truncate">
                {tripOverview.budget}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                Travel Style
              </span>
              <span className="text-xs font-semibold text-white block">
                {tripOverview.travelStyle}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                Travel Pace
              </span>
              <span className="text-xs font-semibold text-white block">
                {tripOverview.travelPace}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. YOUR JOURNEY (VERTICAL TIMELINE) */}
      {/* ================================================================= */}
      <section className="space-y-6">
        <div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
            Day-by-Day Itinerary
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Your Journey ({itinerary.length} Days)
          </h2>
        </div>

        <div className="space-y-4">
          {itinerary.map((dayItem) => {
            const dayNum = String(dayItem.day).padStart(2, '0');

            return (
              <div
                key={dayItem.day}
                className="surface-card rounded-2xl p-6 sm:p-7 border border-white/[0.07] space-y-5"
              >
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-white/[0.04] px-2 py-1 rounded border border-white/[0.08]">
                      DAY {dayNum}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white font-display">
                      {dayItem.title}
                    </h3>
                  </div>

                  {dayItem.estimatedCost && (
                    <span className="text-xs font-mono text-emerald-400 self-start sm:self-auto">
                      Est. Cost: {dayItem.estimatedCost}
                    </span>
                  )}
                </div>

                {/* Day Blocks: Morning, Afternoon, Evening */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 block">
                      Morning
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {dayItem.morning}
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300 block">
                      Afternoon
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {dayItem.afternoon}
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 block">
                      Evening
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {dayItem.evening}
                    </p>
                  </div>
                </div>

                {/* Food recommendation */}
                {dayItem.food && (
                  <div className="flex items-start gap-2.5 pt-2 text-xs text-slate-300 border-t border-white/[0.04]">
                    <span className="text-slate-400 font-medium flex-shrink-0">Food Suggestion:</span>
                    <span className="text-slate-200">{dayItem.food}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. SMART RESULT SECTIONS */}
      {/* ================================================================= */}
      <section className="space-y-8 pt-4">
        <div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
            Trip Recommendations
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Curated Trip Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ACCOMMODATION */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Hotel className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white font-display">
                Accommodation Suggestions
              </h3>
            </div>
            <div className="space-y-3">
              {accommodation.map((stay, idx) => (
                <div key={idx} className="space-y-1 text-xs p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white">{stay.name}</span>
                    <span className="text-emerald-400 font-mono text-[11px]">{stay.pricePerNight}</span>
                  </div>
                  <div className="text-[11px] text-cyan-400/90">{stay.type} • {stay.area}</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{stay.features}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FOOD & DINING */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Utensils className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white font-display">
                Food Recommendations
              </h3>
            </div>
            <div className="space-y-3">
              {food.map((item, idx) => (
                <div key={idx} className="space-y-1 text-xs p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white">{item.dishOrSpot}</span>
                    <span className="text-[10px] uppercase font-semibold text-amber-300">{item.type}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PLACES TO EXPLORE */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white font-display">
                Places to Explore
              </h3>
            </div>
            <div className="space-y-3">
              {places.map((place, idx) => (
                <div key={idx} className="space-y-1 text-xs p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white">{place.name}</span>
                    <span className="text-[10px] text-slate-400">{place.category}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{place.description}</p>
                  {place.bestTime && (
                    <span className="text-[10px] text-cyan-400 block pt-0.5">
                      Best time: {place.bestTime}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITIES */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-semibold text-white font-display">
                Activities & Experiences
              </h3>
            </div>
            <div className="space-y-3">
              {activities.map((act, idx) => (
                <div key={idx} className="space-y-1 text-xs p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white">{act.title}</span>
                    <span className="text-[10px] text-rose-300 font-mono">{act.duration}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{act.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TRANSPORTATION */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Car className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-semibold text-white font-display">
                Transportation
              </h3>
            </div>
            <div className="space-y-3">
              {transportation.map((t, idx) => (
                <div key={idx} className="space-y-1 text-xs p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white">{t.mode}</span>
                    {t.estimatedCost && (
                      <span className="text-emerald-400 font-mono text-[11px]">{t.estimatedCost}</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{t.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BUDGET BREAKDOWN */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.07] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white font-display">
                  Budget Breakdown
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {budget.estimatedTotal || tripOverview.budget}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {(budget.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-white/[0.03]">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-mono text-slate-200">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRAVEL TIPS */}
        <div className="surface-card rounded-2xl p-6 border border-white/[0.07] space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-white font-display">
              Useful Travel Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {travelTips.map((tip, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-2.5">
                <span className="text-[10px] font-mono font-bold text-yellow-400/90 pt-0.5">{idx + 1}.</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* BOTTOM ACTIONS */}
      {/* ================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <button
            onClick={onStartOver}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium border border-white/10 transition-colors"
          >
            ← Plan another trip
          </button>
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 font-semibold transition-colors disabled:opacity-50"
          >
            Regenerate Plan
          </button>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-white transition-colors"
        >
          Back to top ↑
        </button>
      </div>

      {/* Prompt Inspector Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl surface-card rounded-2xl p-6 border border-white/10 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white font-display">
                OpenAI Structured Prompt
              </h3>
              <button
                onClick={() => setShowPromptModal(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5"
              >
                Close
              </button>
            </div>
            <pre className="text-xs font-mono text-cyan-300 bg-black/50 p-4 rounded-xl whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {usedPrompt}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
