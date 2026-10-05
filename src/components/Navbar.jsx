import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, Key } from 'lucide-react';
import { isApiKeyConfigured } from '../services/aiService';

export default function Navbar({ onOpenApiKeyModal, onPlanClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isKeyReady = isApiKeyConfigured();

  const handlePlanNavigation = (e) => {
    e.preventDefault();
    if (onPlanClick) {
      onPlanClick();
    } else {
      navigate('/plan');
    }
  };

  const handleHowItWorksClick = (e) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/#how-it-works');
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#08090e]/85 border-b border-white/[0.06] no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white font-display">
            Voyage<span className="text-cyan-400">AI</span>
          </span>
        </Link>

        {/* Navigation items */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/plan"
            onClick={handlePlanNavigation}
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Plan
          </Link>
          <a
            href="#how-it-works"
            onClick={handleHowItWorksClick}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors hidden sm:inline-block"
          >
            How it works
          </a>

          {/* API Key Status Pill */}
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-full transition-colors cursor-pointer"
            title="Configure OpenAI API Key"
          >
            <Key className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">API</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isKeyReady ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
          </button>

          {/* Primary CTA button */}
          <button
            type="button"
            onClick={handlePlanNavigation}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Start Planning
          </button>
        </nav>
      </div>
    </header>
  );
}
