import React from 'react';
import { Snowflake, Sparkles, Clock, Compass, Layers } from 'lucide-react';
import { SimulationDensity } from '../types/atmosphere';

interface ControlDeckProps {
  snowActive: boolean;
  balloonsActive: boolean;
  snowRemainingMs: number;
  balloonsRemainingMs: number;
  density: SimulationDensity;
  onSetDensity: (density: SimulationDensity) => void;
  onTriggerSnow: () => void;
  onTriggerBalloons: () => void;
  totalSnowSpawned: number;
  totalBalloonsSpawned: number;
}

export const ControlDeck: React.FC<ControlDeckProps> = ({
  snowActive,
  balloonsActive,
  snowRemainingMs,
  balloonsRemainingMs,
  density,
  onSetDensity,
  onTriggerSnow,
  onTriggerBalloons,
  totalSnowSpawned,
  totalBalloonsSpawned,
}) => {
  const formatTime = (ms: number) => {
    if (ms <= 0) return '0.00';
    return (ms / 1000).toFixed(2);
  };

  const isAnyActive = snowActive || balloonsActive;

  return (
    <section id="chamber" className="relative w-full max-w-5xl mx-auto px-4 py-8 lg:py-12">
      {/* Formal Section Kicker */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 mb-2">
          <span>Cabinet of Atmospheric Studies</span>
          <span aria-hidden="true">·</span>
          <span>Calibrated Chamber</span>
          <span aria-hidden="true">·</span>
          <span>5.00s Duration</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif-display font-medium text-stone-100 tracking-tight text-balance">
          The Ceremonial Atmospheric Chamber
        </h1>
        <p className="mt-3 text-stone-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-balance">
          Initiate calibrated physical displays across the viewport. Engage either primary protocol to release medium-scale atmospheric phenomena for an exact five-second sequence.
        </p>
      </div>

      {/* Main Control Console Card */}
      <div className="relative bg-[#13161c] border border-stone-800/90 rounded-sm shadow-2xl p-6 md:p-10 backdrop-blur-sm">
        {/* Subtle decorative corner tick marks */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-stone-600/50" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-stone-600/50" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-stone-600/50" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-stone-600/50" />

        {/* Operational Status Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-stone-800/80 gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                isAnyActive ? 'bg-amber-400 animate-pulse shadow-[0_0_10px_#fbbf24]' : 'bg-stone-600'
              }`}
            />
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
              Chamber Status:
            </span>
            <span className="text-xs font-serif-display font-semibold text-stone-200 tracking-wide">
              {snowActive && balloonsActive
                ? 'Dual Atmospheric Protocols In Flight'
                : snowActive
                ? 'Snowflake Precipitation Sequence Active'
                : balloonsActive
                ? 'Buoyant Balloon Ascent Sequence Active'
                : 'Chamber at Rest · Ready for Calibration'}
            </span>
          </div>

          {/* Density Segmented Filter Control */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Density:
            </span>
            <div className="inline-flex bg-stone-900/90 border border-stone-800 rounded-sm p-0.5">
              {(['gentle', 'standard', 'copious'] as SimulationDensity[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => onSetDensity(d)}
                  className={`px-2.5 py-1 text-xs capitalize transition-all rounded-xs whitespace-nowrap ${
                    density === d
                      ? 'bg-stone-700/80 text-stone-100 font-medium shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* THE TWO REQUIRED PRIMARY BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          {/* BUTTON 1: "Snowflakes" */}
          <div className="relative group">
            <button
              onClick={onTriggerSnow}
              type="button"
              className={`w-full text-left p-6 md:p-8 rounded-sm transition-all duration-200 border relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-400 ${
                snowActive
                  ? 'bg-gradient-to-b from-[#182333] to-[#0f1722] border-sky-400/80 shadow-[0_0_25px_rgba(56,189,248,0.18)]'
                  : 'bg-gradient-to-b from-[#161a22] to-[#101318] border-stone-700/80 hover:border-sky-300/60 hover:bg-[#191e28]'
              }`}
            >
              {/* Active countdown progress bar */}
              {snowActive && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-300 transition-all"
                  style={{ width: `${(snowRemainingMs / 5000) * 100}%` }}
                />
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-sm flex items-center justify-center border transition-colors ${
                      snowActive
                        ? 'bg-sky-950/60 border-sky-400 text-sky-200'
                        : 'bg-stone-900 border-stone-700 text-stone-300 group-hover:text-sky-300 group-hover:border-sky-400/50'
                    }`}
                  >
                    <Snowflake
                      className={`w-6 h-6 transition-transform ${snowActive ? 'animate-spin' : ''}`}
                      style={{ animationDuration: '6s' }}
                    />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-sky-300/80 font-medium">
                      Atmospheric Protocol I
                    </span>
                    <span className="text-2xl md:text-3xl font-serif-display font-medium text-stone-100 tracking-tight">
                      Snowflakes
                    </span>
                  </div>
                </div>

                {/* 5-second countdown timer badge */}
                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-stone-900/90 border border-stone-700/60 text-xs font-mono tabular-nums text-stone-300">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{snowActive ? `${formatTime(snowRemainingMs)}s` : '5.00s'}</span>
                  </div>
                </div>
              </div>

              {/* Subtext description */}
              <p className="mt-4 text-xs md:text-sm text-stone-400 leading-relaxed">
                Release medium-scale dendritic hexagonal ice crystals. Crystals precipitate continuously from the top of the viewport down to the bottom for an exact 5-second sequence.
              </p>

              {/* Tactical Status Footnote */}
              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span>Vector: Top → Bottom (110–190 px/s)</span>
                <span className={snowActive ? 'text-sky-300 font-medium' : 'text-stone-400'}>
                  {snowActive ? 'Active · Precipitating' : 'Click to Engage'}
                </span>
              </div>
            </button>
          </div>

          {/* BUTTON 2: "Balloons" */}
          <div className="relative group">
            <button
              onClick={onTriggerBalloons}
              type="button"
              className={`w-full text-left p-6 md:p-8 rounded-sm transition-all duration-200 border relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                balloonsActive
                  ? 'bg-gradient-to-b from-[#2b171c] to-[#180f13] border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.18)]'
                  : 'bg-gradient-to-b from-[#161a22] to-[#101318] border-stone-700/80 hover:border-amber-400/60 hover:bg-[#1a171c]'
              }`}
            >
              {/* Active countdown progress bar */}
              {balloonsActive && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-400 to-rose-400 transition-all"
                  style={{ width: `${(balloonsRemainingMs / 5000) * 100}%` }}
                />
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-sm flex items-center justify-center border transition-colors ${
                      balloonsActive
                        ? 'bg-rose-950/60 border-amber-400 text-amber-200'
                        : 'bg-stone-900 border-stone-700 text-stone-300 group-hover:text-amber-300 group-hover:border-amber-400/50'
                    }`}
                  >
                    {/* Stylized formal balloon SVG icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 stroke-current fill-none stroke-[1.8]"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2C8.686 2 6 5.134 6 9c0 4.2 4.5 8 6 9 1.5-1 6-4.8 6-9 0-3.866-2.686-7-6-7z" />
                      <path d="M10 18l4 0 -2 2z" />
                      <path d="M12 20c-1 1 -1.5 2 -1 3" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-amber-300/80 font-medium">
                      Atmospheric Protocol II
                    </span>
                    <span className="text-2xl md:text-3xl font-serif-display font-medium text-stone-100 tracking-tight">
                      Balloons
                    </span>
                  </div>
                </div>

                {/* 5-second countdown timer badge */}
                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-stone-900/90 border border-stone-700/60 text-xs font-mono tabular-nums text-stone-300">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{balloonsActive ? `${formatTime(balloonsRemainingMs)}s` : '5.00s'}</span>
                  </div>
                </div>
              </div>

              {/* Subtext description */}
              <p className="mt-4 text-xs md:text-sm text-stone-400 leading-relaxed">
                Release buoyant medium-scale formal celebration spheres. Aerostats float continuously from the bottom of the viewport up to the top for an exact 5-second sequence.
              </p>

              {/* Tactical Status Footnote */}
              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span>Vector: Bottom → Top (-130–210 px/s)</span>
                <span className={balloonsActive ? 'text-amber-300 font-medium' : 'text-stone-400'}>
                  {balloonsActive ? 'Active · Ascending' : 'Click to Engage'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Telemetry & Calibration Strip */}
        <div className="mt-8 pt-6 border-t border-stone-800/90 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-400">
          <div>
            <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Crystallographic Sizing</span>
            <span className="text-stone-200 font-mono font-medium">Ø 26px – 38px (Medium)</span>
          </div>
          <div>
            <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Aerostatic Dimension</span>
            <span className="text-stone-200 font-mono font-medium">54px × 72px (Medium)</span>
          </div>
          <div>
            <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Total Crystals Spawned</span>
            <span className="text-stone-200 font-mono font-medium">{totalSnowSpawned}</span>
          </div>
          <div>
            <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Total Balloons Released</span>
            <span className="text-stone-200 font-mono font-medium">{totalBalloonsSpawned}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
