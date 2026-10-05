import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#07080c] py-10 text-center text-xs text-slate-500">
      <div className="max-w-4xl mx-auto px-4 space-y-2">
        <p className="font-medium text-slate-400 font-display">
          VoyageAI — Intelligent Travel Assistant
        </p>
        <p className="text-[11px] text-slate-600 max-w-md mx-auto">
          Personalized itineraries synthesized from your travel rhythm, pace, and interests.
        </p>
      </div>
    </footer>
  );
}
