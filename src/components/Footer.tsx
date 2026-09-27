import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="ledger" className="w-full border-t border-stone-800/80 bg-[#0a0c10] py-10 px-6 lg:px-12 text-stone-500 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-serif-display text-stone-300 text-sm tracking-wide">
            The Grand Conservatory
          </span>
          <span aria-hidden="true">·</span>
          <span>Atmospheric Studies Archive</span>
          <span aria-hidden="true">·</span>
          <span>Anno Domini MMXXVI</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#chamber" className="hover:text-stone-300 transition-colors">
            Chamber Deck
          </a>
          <a href="#specimens" className="hover:text-stone-300 transition-colors">
            Specimens
          </a>
          <a href="#principles" className="hover:text-stone-300 transition-colors">
            Principles
          </a>
          <span className="text-stone-600">|</span>
          <span className="text-stone-500">Formal Calibrated Simulation</span>
        </div>
      </div>
    </footer>
  );
};
