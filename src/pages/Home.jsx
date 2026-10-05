import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, MapPin, Sparkles, Calendar, DollarSign, Heart, Shield, Navigation } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useMouseParallax } from '../utils/useMouseParallax';

export default function Home({ onOpenApiKeyModal }) {
  const navigate = useNavigate();
  const parallax = useMouseParallax(0.8);

  const steps = [
    {
      num: '01',
      title: 'Tell us where you’re going',
      desc: 'Enter any global city, coastal retreat, or alpine valley, plus where you depart from.'
    },
    {
      num: '02',
      title: 'Tell us what you love',
      desc: 'Set your budget, trip duration, preferred pace, companions, and favorite experiences.'
    },
    {
      num: '03',
      title: 'VoyageAI builds your itinerary',
      desc: 'Our structured reasoning engine crafts an exact day-by-day schedule with morning, afternoon, and evening plans.'
    },
    {
      num: '04',
      title: 'Start exploring',
      desc: 'Access curated accommodations, dining recommendations, transit tips, and insider advice.'
    }
  ];

  const highlights = [
    {
      icon: <Calendar className="w-4 h-4 text-cyan-400" />,
      title: 'Day-by-Day Timeline',
      desc: 'Exact duration matching with balanced morning, afternoon, and evening schedules.'
    },
    {
      icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
      title: 'Smart Budgeting',
      desc: 'Multi-currency budget estimation covering stays, meals, transit, and activities.'
    },
    {
      icon: <Compass className="w-4 h-4 text-indigo-400" />,
      title: 'Tailored Travel Pace',
      desc: 'Choose between Relaxed, Balanced, or Packed rhythms to match your traveling style.'
    },
    {
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      title: 'Deep Personalization',
      desc: 'Accommodates food preferences, dietary constraints, companion dynamics, and specific requests.'
    },
    {
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      title: 'Local Experiences',
      desc: 'Discovers authentic neighborhood dining, hidden viewpoints, and cultural treasures.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenApiKeyModal={onOpenApiKeyModal}
        onPlanClick={() => navigate('/plan')}
      />

      <main className="flex-1">
        {/* ============================================================= */}
        {/* HERO SECTION WITH SUBTLE 3D PARALLAX */}
        {/* ============================================================= */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden perspective-container">
          {/* Subtle atmospheric backdrop */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-[0.10] filter grayscale contrast-125"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08090e]/40 via-[#08090e]/85 to-[#08090e]" />
            <div className="absolute inset-0 subtle-grid opacity-30" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fade-in relative z-10">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium mb-8">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personalized AI Travel Planner</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-5 font-display text-gradient-subtle">
              VoyageAI
            </h1>

            {/* Subtitle */}
            <p className="text-2xl sm:text-3xl font-medium text-slate-200 tracking-tight mb-4 font-display">
              Your AI-powered travel companion.
            </p>

            {/* Supporting sentence */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-normal leading-relaxed mb-10">
              Tell us where you want to go, what you love, and your budget. We'll plan the journey for you.
            </p>

            {/* Primary CTA Button */}
            <div className="flex items-center justify-center mb-16">
              <button
                onClick={() => navigate('/plan')}
                className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-white/10 active:scale-[0.98] cursor-pointer"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* SUBTLE 3D TRAVEL HERO GRAPHIC (LIGHTWEIGHT CSS/SVG) */}
            <div 
              className="relative max-w-md mx-auto h-48 sm:h-56 rounded-2xl surface-card border border-white/[0.08] p-5 preserve-3d card-3d-interactive flex flex-col justify-between overflow-hidden shadow-2xl"
              style={{
                transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) rotateX(${parallax.rotateX}deg) rotateY(${parallax.rotateY}deg)`
              }}
            >
              {/* Subtle visual SVG flight path */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 200" fill="none">
                <path d="M 40 160 Q 200 20 360 80" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="40" cy="160" r="4" fill="#38bdf8" />
                <circle cx="360" cy="80" r="5" fill="#38bdf8" />
              </svg>

              <div className="flex items-center justify-between text-xs z-10">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Bengaluru → Goa</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                  5 Days • Balanced
                </span>
              </div>

              {/* Waypoint Card Snippet */}
              <div className="space-y-1.5 text-left bg-black/40 p-3 rounded-xl border border-white/5 z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Day 1: Chapora Cliff Sunset</span>
                  <span className="text-[10px] font-mono text-emerald-400">₹2,800 est.</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  Coastal check-in, red stone fortress views & fresh seafood thali.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 z-10">
                <span className="flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-cyan-400" />
                  Autonomous Route Reasoning
                </span>
                <span className="font-mono text-slate-400">100% Tailored</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* HOW IT WORKS */}
        {/* ============================================================= */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 border-t border-white/[0.06]">
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-2">
              Effortless Planning
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              How VoyageAI Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="surface-card p-6 rounded-2xl border border-white/[0.07] space-y-3 card-3d-interactive"
              >
                <span className="text-xs font-mono font-bold text-cyan-400 block">
                  {step.num}
                </span>
                <h3 className="text-sm font-semibold text-white font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/* FEATURE HIGHLIGHTS */}
        {/* ============================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 border-t border-white/[0.06]">
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-2">
              Engineered For Travel
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Designed For Real Journeys
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="surface-card p-6 rounded-2xl border border-white/[0.07] space-y-3 card-3d-interactive"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-white font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* Final prompt card to start */}
            <div className="surface-card p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-transparent flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 block mb-2">Ready?</span>
                <h3 className="text-sm font-semibold text-white font-display mb-1">
                  Ready to plan your next trip?
                </h3>
                <p className="text-xs text-slate-400">
                  Takes less than 60 seconds to configure your travel vision.
                </p>
              </div>
              <button
                onClick={() => navigate('/plan')}
                className="inline-flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-950 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Start Planning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
