import React from 'react';
import { Compass, Navigation } from 'lucide-react';

export default function LoadingState({ destination, stepInfo }) {
  const currentStep = stepInfo?.step || 1;
  const currentMsg = stepInfo?.message || 'Planning your journey...';

  const stages = [
    { num: 1, label: 'Finding the best places...' },
    { num: 2, label: 'Balancing your days...' },
    { num: 3, label: 'Building your itinerary...' },
    { num: 4, label: 'Adding local experiences...' },
    { num: 5, label: 'Working within your budget...' },
    { num: 6, label: 'Almost ready...' }
  ];

  return (
    <div className="max-w-md mx-auto w-full px-4 text-center animate-fade-in">
      <div className="surface-card rounded-2xl p-8 border border-white/[0.08] shadow-2xl space-y-6">
        {/* Subtle rotating compass */}
        <div className="w-12 h-12 mx-auto rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-400">
          <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white font-display">
            Planning your journey...
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {currentMsg}
          </p>
        </div>

        {/* Minimal progress bar */}
        <div className="w-full bg-[#10121b] h-1.5 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(15, (currentStep / 6) * 100))}%` }}
          />
        </div>

        {/* Subtle stage indicator */}
        <div className="space-y-2 text-left max-w-xs mx-auto pt-2">
          {stages.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div
                key={s.num}
                className={`flex items-center gap-2.5 text-xs transition-colors ${
                  isCurrent
                    ? 'text-cyan-300 font-medium'
                    : isDone
                    ? 'text-slate-500'
                    : 'text-slate-700'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-cyan-400 scale-125'
                      : isDone
                      ? 'bg-emerald-400'
                      : 'bg-slate-800'
                  }`}
                />
                <span className="text-[11px] font-mono">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
