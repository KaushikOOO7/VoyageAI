import React, { useState } from 'react';
import { X, Key, ShieldCheck, AlertCircle } from 'lucide-react';
import { getActiveApiKey, saveUserApiKey, isApiKeyConfigured } from '../services/aiService';

export default function ApiKeyModal({ isOpen, onClose }) {
  const currentKey = getActiveApiKey() || '';
  const [inputValue, setInputValue] = useState(currentKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveUserApiKey(inputValue);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 700);
  };

  const handleClear = () => {
    saveUserApiKey('');
    setInputValue('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg surface-card rounded-2xl p-6 sm:p-7 border border-white/10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <Key className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-semibold text-white font-display">
              OpenAI API Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Callout */}
        <div className="mt-5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
          {isApiKeyConfigured() ? (
            <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          )}
          <div className="text-xs leading-relaxed">
            <p className="font-semibold text-slate-200">
              {isApiKeyConfigured() ? 'API Key Configured' : 'Offline Dynamic Planner Active'}
            </p>
            <p className="text-slate-400 mt-0.5">
              {isApiKeyConfigured()
                ? 'VoyageAI will query the OpenAI API (gpt-4o-mini) directly for real-time travel planning.'
                : 'No API key configured. VoyageAI runs in autonomous dynamic mode with tailored itineraries for any destination.'}
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            OpenAI Secret Key
          </label>
          <input
            type="password"
            placeholder="sk-proj-..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#10121b] border border-white/10 rounded-xl text-xs font-mono text-cyan-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
          />
          <p className="text-[11px] text-slate-500">
            Alternatively, set <code>VITE_OPENAI_API_KEY=your_key</code> in your <code>.env</code> file.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
          <button
            onClick={handleClear}
            type="button"
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            Clear Key
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              {saved ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
