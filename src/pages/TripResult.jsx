import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCcw, 
  Edit3, 
  Copy, 
  Printer, 
  Check, 
  Compass, 
  Hotel, 
  Utensils, 
  Car, 
  DollarSign, 
  Lightbulb, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  Eye, 
  PackageCheck 
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { getDestinationBackdrop } from '../data/destinations';
import { useMouseParallax } from '../utils/useMouseParallax';
import Footer from '../components/Footer';

export default function TripResult({ onOpenApiKeyModal }) {
  const navigate = useNavigate();
  const { tripPlan, regenerateTrip, isGenerating, startOver, modifyTrip } = useTrip();

  const [copied, setCopied] = useState(false);
  const [tipsExpanded, setTipsExpanded] = useState(true);
  const parallax = useMouseParallax(0.7);

  // If no trip plan exists, redirect to /plan
  if (!tripPlan) {
    return (
      <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col justify-center items-center px-4 text-center">
        <div className="surface-card p-8 rounded-2xl max-w-md border border-white/10 space-y-4">
          <Compass className="w-8 h-8 text-cyan-400 mx-auto" />
          <h2 className="text-xl font-bold font-display text-white">No Itinerary Found</h2>
          <p className="text-xs text-slate-400">
            Please configure your travel details first to generate a personalized itinerary.
          </p>
          <button
            onClick={() => navigate('/plan')}
            className="px-5 py-2.5 bg-white text-slate-950 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Go to Trip Planner →
          </button>
        </div>
      </div>
    );
  }

  const {
    tripTitle,
    destination,
    summary,
    totalDays,
    startDate,
    endDate,
    travelStyle,
    travellers,
    estimatedBudget = {},
    days = [],
    stay = {},
    foodRecommendations = [],
    transportTips = [],
    packingTips = [],
    travelTips = [],
    hiddenGems = [],
    thingsToAvoid = []
  } = tripPlan;

  const backdrop = getDestinationBackdrop(destination);
  const currencySymbol = estimatedBudget.currency === 'INR' ? '₹' : estimatedBudget.currency === 'USD' ? '$' : estimatedBudget.currency === 'EUR' ? '€' : estimatedBudget.currency === 'GBP' ? '£' : '₹';

  const handleCopyItinerary = () => {
    let text = `VOYAGEAI — ${tripTitle.toUpperCase()}\n`;
    text += `Destination: ${destination}\nDuration: ${totalDays} Days\nTravel Style: ${travelStyle}\nBudget: ${currencySymbol}${estimatedBudget.total?.toLocaleString()}\n\n`;
    text += `ITINERARY:\n`;
    days.forEach((d) => {
      text += `DAY ${d.day}: ${d.title}\n`;
      if (d.morning) text += `• Morning (${d.morning.time}): ${d.morning.activity} — ${d.morning.description}\n`;
      if (d.afternoon) text += `• Afternoon (${d.afternoon.time}): ${d.afternoon.activity} — ${d.afternoon.description}\n`;
      if (d.evening) text += `• Evening (${d.evening.time}): ${d.evening.activity} — ${d.evening.description}\n`;
      if (d.food?.length) text += `• Dining: ${d.food.join(', ')}\n`;
      if (d.transport) text += `• Transit: ${d.transport}\n`;
      text += `• Estimated Day Cost: ${d.estimatedCost}\n\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#08090e]/85 border-b border-white/[0.06] no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => modifyTrip(navigate)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Details</span>
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-cyan-400">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white font-display">
              Voyage<span className="text-cyan-400">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyItinerary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-12 animate-fade-in">
        {/* ============================================================= */}
        {/* 1. TRIP HERO (LAYERED DEPTH WITH SUBTLE 3D PARALLAX) */}
        {/* ============================================================= */}
        <section className="relative rounded-3xl overflow-hidden border border-white/[0.08] surface-card perspective-container">
          {/* Background Layer: Atmospheric blurred backdrop */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <img
              src={backdrop}
              alt={destination}
              className="w-full h-full object-cover filter brightness-[0.20] blur-[2px] scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090e] via-[#08090e]/60 to-transparent" />
          </div>

          <div className="p-6 sm:p-10 space-y-6 relative z-10">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
                Your journey to {destination}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-2">
                {destination}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium">
                {totalDays} days • {travelStyle} • {currencySymbol}{estimatedBudget.total?.toLocaleString()}
              </p>
              {summary && (
                <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
                  {summary}
                </p>
              )}
            </div>

            {/* Foreground 3D Location Telemetry Card */}
            <div 
              className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 preserve-3d card-3d-interactive grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs"
              style={{
                transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) rotateX(${parallax.rotateX}deg) rotateY(${parallax.rotateY}deg)`
              }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Duration</span>
                <span className="font-semibold text-white font-mono">{totalDays} Days</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Budget</span>
                <span className="font-semibold text-emerald-400 font-mono">
                  {currencySymbol}{estimatedBudget.total?.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Style</span>
                <span className="font-semibold text-white">{travelStyle}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Companions</span>
                <span className="font-semibold text-white">{travellers}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 2. DAY-BY-DAY ITINERARY (VERTICAL TRAVEL TIMELINE) */}
        {/* ============================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-0.5">
                Day-by-Day Timeline
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Your Personalized Itinerary ({days.length} Days)
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              {days.length === totalDays ? `Strictly ${totalDays} Days` : ''}
            </span>
          </div>

          <div className="space-y-6">
            {days.map((d) => (
              <div
                key={d.day}
                className="surface-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] space-y-5 card-3d-interactive"
              >
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/10">
                      DAY {String(d.day).padStart(2, '0')}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">
                      {d.title}
                    </h3>
                  </div>
                  {d.estimatedCost && (
                    <span className="text-xs font-mono text-emerald-400 font-medium self-start sm:self-auto">
                      Day Cost: {d.estimatedCost}
                    </span>
                  )}
                </div>

                {d.summary && (
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    {d.summary}
                  </p>
                )}

                {/* Timeline Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                  {/* Morning */}
                  {d.morning && (
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          Morning
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{d.morning.time}</span>
                      </div>
                      <h4 className="font-semibold text-slate-100">{d.morning.activity}</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{d.morning.description}</p>
                      {d.morning.estimatedCost && (
                        <span className="text-[10px] font-mono text-slate-500 block pt-1">
                          Est: {d.morning.estimatedCost}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Afternoon */}
                  {d.afternoon && (
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                          Afternoon
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{d.afternoon.time}</span>
                      </div>
                      <h4 className="font-semibold text-slate-100">{d.afternoon.activity}</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{d.afternoon.description}</p>
                      {d.afternoon.estimatedCost && (
                        <span className="text-[10px] font-mono text-slate-500 block pt-1">
                          Est: {d.afternoon.estimatedCost}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Evening */}
                  {d.evening && (
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                          Evening
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{d.evening.time}</span>
                      </div>
                      <h4 className="font-semibold text-slate-100">{d.evening.activity}</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{d.evening.description}</p>
                      {d.evening.estimatedCost && (
                        <span className="text-[10px] font-mono text-slate-500 block pt-1">
                          Est: {d.evening.estimatedCost}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Food & Transit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/[0.04] text-xs">
                  {d.food && d.food.length > 0 && (
                    <div className="flex items-start gap-2 text-[11px] text-slate-300">
                      <Utensils className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 font-medium">Dining: </span>
                        <span>{Array.isArray(d.food) ? d.food.join(' • ') : d.food}</span>
                      </div>
                    </div>
                  )}

                  {d.transport && (
                    <div className="flex items-start gap-2 text-[11px] text-slate-300">
                      <Car className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 font-medium">Transit: </span>
                        <span>{d.transport}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/* 3. WHERE TO STAY & FOOD */}
        {/* ============================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Where to stay */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.08] space-y-3 card-3d-interactive">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Hotel className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white font-display">Where to Stay</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-200">{stay.recommendation || 'Boutique stay'}</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">{stay.reason}</p>
              {stay.budgetGuidance && (
                <div className="text-[11px] font-mono text-cyan-400 pt-1">
                  Budget: {stay.budgetGuidance}
                </div>
              )}
            </div>
          </div>

          {/* Food recommendations */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.08] space-y-3 card-3d-interactive">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Utensils className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white font-display">Food & Dining</h3>
            </div>
            <ul className="space-y-2 text-[11px] text-slate-300">
              {foodRecommendations.map((f, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 4. TRANSPORT & BUDGET BREAKDOWN */}
        {/* ============================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transportation */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.08] space-y-3 card-3d-interactive">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Car className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-semibold text-white font-display">Transportation Tips</h3>
            </div>
            <ul className="space-y-2 text-[11px] text-slate-300">
              {transportTips.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-400">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Budget Breakdown */}
          <div className="surface-card rounded-2xl p-6 border border-white/[0.08] space-y-3 card-3d-interactive">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white font-display">Budget Breakdown</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Total: {currencySymbol}{estimatedBudget.total?.toLocaleString()}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {estimatedBudget.breakdown ? (
                <>
                  <div className="flex justify-between py-1 border-b border-white/[0.03]">
                    <span className="text-slate-400">Accommodation</span>
                    <span className="font-mono text-slate-200">
                      {currencySymbol}{estimatedBudget.breakdown.accommodation?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.03]">
                    <span className="text-slate-400">Food & Dining</span>
                    <span className="font-mono text-slate-200">
                      {currencySymbol}{estimatedBudget.breakdown.food?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.03]">
                    <span className="text-slate-400">Local Transport</span>
                    <span className="font-mono text-slate-200">
                      {currencySymbol}{estimatedBudget.breakdown.transport?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.03]">
                    <span className="text-slate-400">Activities & Sights</span>
                    <span className="font-mono text-slate-200">
                      {currencySymbol}{estimatedBudget.breakdown.activities?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Miscellaneous</span>
                    <span className="font-mono text-slate-200">
                      {currencySymbol}{estimatedBudget.breakdown.miscellaneous?.toLocaleString()}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-slate-400">Calculated within designated budget limit.</div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 5. TRAVEL TIPS & HIDDEN GEMS */}
        {/* ============================================================= */}
        <section className="surface-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-semibold text-white font-display">Essential Travel Advice</h3>
            </div>
            <button
              onClick={() => setTipsExpanded(!tipsExpanded)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>{tipsExpanded ? 'Collapse' : 'Expand'}</span>
              {tipsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {tipsExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1 text-xs">
              {/* Local Travel Tips */}
              <div className="space-y-2">
                <span className="font-semibold text-slate-200 block">General Advice</span>
                <ul className="space-y-2 text-[11px] text-slate-300">
                  {travelTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hidden Gems */}
              {hiddenGems && hiddenGems.length > 0 && (
                <div className="space-y-2">
                  <span className="font-semibold text-cyan-300 block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Hidden Gems
                  </span>
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    {hiddenGems.map((gem, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{gem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Things to Avoid */}
              {thingsToAvoid && thingsToAvoid.length > 0 && (
                <div className="space-y-2">
                  <span className="font-semibold text-rose-300 block flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    Things to Avoid
                  </span>
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    {thingsToAvoid.map((avoid, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400">•</span>
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Packing Tips */}
              {packingTips && packingTips.length > 0 && (
                <div className="space-y-2">
                  <span className="font-semibold text-indigo-300 block flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5 text-indigo-400" />
                    Packing Essentials
                  </span>
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    {packingTips.map((pack, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400">•</span>
                        <span>{pack}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ============================================================= */}
        {/* 6. BOTTOM ACTIONS */}
        {/* ============================================================= */}
        <section className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 no-print">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => modifyTrip(navigate)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Modify Trip</span>
            </button>

            <button
              onClick={() => regenerateTrip()}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-slate-950 text-xs font-semibold transition-all hover:bg-slate-100 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate Trip</span>
            </button>

            <button
              onClick={() => startOver(navigate)}
              className="px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Start Over
            </button>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Back to Top ↑
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
