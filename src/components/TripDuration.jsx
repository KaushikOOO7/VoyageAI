import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDisplayDate, calculateEndDate } from '../utils/format';

export default function TripDuration({
  startDate,
  onStartDateChange,
  durationDays,
  onDurationChange
}) {
  const [isCustom, setIsCustom] = useState(durationDays > 7);
  const [customInput, setCustomInput] = useState(durationDays > 7 ? String(durationDays) : '10');

  const quickDays = [1, 2, 3, 4, 5, 6, 7];
  const calculatedEnd = calculateEndDate(startDate, durationDays);

  const handleSelectQuick = (days) => {
    setIsCustom(false);
    onDurationChange(days);
  };

  const handleSelectCustom = () => {
    setIsCustom(true);
    const parsed = Math.max(1, Math.min(21, parseInt(customInput, 10) || 10));
    onDurationChange(parsed);
  };

  const handleCustomInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomInput(val);
    const parsed = parseInt(val, 10);
    if (parsed && parsed >= 1 && parsed <= 21) {
      onDurationChange(parsed);
    }
  };

  return (
    <div className="space-y-4">
      {/* Date & Duration inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#10121b] border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <span className="text-[11px] text-slate-500 block">
            {formatDisplayDate(startDate)}
          </span>
        </div>

        {/* Calculated End Date (Automatic) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Calculated End Date
          </label>
          <div className="px-3.5 py-2.5 bg-[#10121b]/60 border border-white/5 rounded-xl text-sm text-slate-300 flex items-center justify-between">
            <span>{formatDisplayDate(calculatedEnd)}</span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
              {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Automatically updated from duration
          </span>
        </div>
      </div>

      {/* Explicit Duration Selector */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-300">How many days is your trip?</span>
          <span className="text-slate-400 font-mono text-[11px]">
            Selected: <strong className="text-white">{durationDays} {durationDays === 1 ? 'Day' : 'Days'}</strong>
          </span>
        </div>

        {/* Quick buttons [ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ] [ 6 ] [ 7 ] [ Custom ] */}
        <div className="flex flex-wrap items-center gap-1.5">
          {quickDays.map((d) => {
            const isSelected = !isCustom && durationDays === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => handleSelectQuick(d)}
                className={`w-10 h-10 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'bg-[#10121b] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {d}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleSelectCustom}
            className={`px-3 h-10 rounded-xl text-xs font-medium transition-all ${
              isCustom
                ? 'bg-white text-slate-950 font-semibold'
                : 'bg-[#10121b] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            Custom
          </button>

          {isCustom && (
            <div className="flex items-center gap-2 pl-2">
              <input
                type="number"
                min="1"
                max="21"
                value={customInput}
                onChange={handleCustomInputChange}
                className="w-16 h-10 px-2 bg-[#10121b] border border-cyan-500/40 rounded-xl text-xs text-center text-white focus:outline-none"
                placeholder="Days"
              />
              <span className="text-xs text-slate-400">days (max 21)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
