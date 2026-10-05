import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Tell us about your trip.',
      desc: 'Choose your destination, duration, budget, pace, and the experiences you care about.'
    },
    {
      num: '02',
      title: 'VoyageAI creates your itinerary.',
      desc: 'Our structured reasoning engine crafts a balanced, day-by-day plan tailored to your rhythm.'
    },
    {
      num: '03',
      title: 'Start exploring.',
      desc: 'Review curated stays, dining, transit suggestions, and budget breakdowns ready for your journey.'
    }
  ];

  return (
    <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 border-t border-white/[0.06]">
      <div className="text-center mb-12">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 block mb-2">
          Simple Process
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
          How VoyageAI Works
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="surface-card p-6 rounded-2xl relative space-y-3"
          >
            <span className="text-xs font-mono font-semibold text-cyan-400/90 block">
              {step.num}
            </span>
            <h3 className="text-base font-semibold text-white font-display">
              {step.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
