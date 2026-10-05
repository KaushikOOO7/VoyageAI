import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export default function Hero({ onPlanTripClick }) {
  return (
    <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
      {/* Subtle atmospheric travel background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.14] filter grayscale contrast-125 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090e]/60 via-[#08090e]/90 to-[#08090e]" />
        <div className="absolute inset-0 subtle-grid opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fade-in">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium mb-8">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Intelligent Itinerary Synthesis</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-5 font-display text-gradient-subtle">
          VoyageAI
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-2xl sm:text-3xl font-medium text-slate-200 tracking-tight mb-4 font-display">
          Your AI-powered travel companion.
        </p>

        {/* Supporting sentence */}
        <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-normal leading-relaxed mb-10">
          Tell us where you want to go, what you love, and your budget. We'll plan the journey for you.
        </p>

        {/* Primary CTA */}
        <div className="flex items-center justify-center">
          <button
            onClick={onPlanTripClick}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] cursor-pointer"
          >
            <span>Plan My Trip</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
