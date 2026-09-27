import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface NavigationProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onResetSession: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  audioEnabled,
  onToggleAudio,
  onResetSession,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0d0f14]/90 backdrop-blur-md border-b border-stone-800/80 px-6 lg:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg md:text-xl font-serif-display font-medium tracking-wide text-stone-100 hover:text-amber-200 transition-colors whitespace-nowrap"
        >
          The Grand Conservatory
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
          <a href="#chamber" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Chamber
          </a>
          <a href="#specimens" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Specimens
          </a>
          <a href="#principles" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Principles
          </a>
          <a href="#ledger" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Register
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAudio}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 rounded-sm transition-colors whitespace-nowrap"
            title={audioEnabled ? 'Mute atmospheric resonance' : 'Enable acoustic resonance'}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-300" /> : <VolumeX className="w-3.5 h-3.5 text-stone-400" />}
            <span className="hidden sm:inline">{audioEnabled ? 'Acoustics On' : 'Acoustics Muted'}</span>
          </button>

          <button
            onClick={onResetSession}
            type="button"
            className="px-4 py-1.5 text-xs font-medium text-stone-100 bg-[#1e232d] hover:bg-[#282f3d] border border-stone-600/70 rounded-sm transition-colors whitespace-nowrap"
          >
            Clear Chamber
          </button>
        </div>
      </div>
    </header>
  );
};
