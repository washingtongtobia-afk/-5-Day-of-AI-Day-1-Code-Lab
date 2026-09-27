import React, { useState } from 'react';
import { Snowflake, Shield, Info, ArrowDown, ArrowUp } from 'lucide-react';

interface CuratorialDossierProps {
  onTriggerSnow: () => void;
  onTriggerBalloons: () => void;
}

export const CuratorialDossier: React.FC<CuratorialDossierProps> = ({
  onTriggerSnow,
  onTriggerBalloons,
}) => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<'snow' | 'balloon'>('snow');

  return (
    <section id="specimens" className="w-full max-w-5xl mx-auto px-4 py-12 border-t border-stone-800/80">
      {/* Editorial Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest text-stone-500 mb-2">
          <span>Curatorial Ledger</span>
          <span aria-hidden="true">·</span>
          <span>Specimen Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Archive Register</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-serif-display font-medium text-stone-100 tracking-tight">
          Physical Specimens & Atmospheric Dynamics
        </h2>
        <p className="mt-2 text-stone-400 text-sm max-w-2xl leading-relaxed">
          Detailed anatomical investigation into the medium-sized crystals and buoyant aerostats calibrated within the chamber.
        </p>
      </div>

      {/* Specimen Switcher Tabs */}
      <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
        <button
          type="button"
          onClick={() => setSelectedSpecimen('snow')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-sm border transition-colors ${
            selectedSpecimen === 'snow'
              ? 'bg-sky-950/60 border-sky-400/80 text-sky-200'
              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <Snowflake className="w-3.5 h-3.5 text-sky-400" />
          <span>Specimen A · Medium Hexagonal Snowflake</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedSpecimen('balloon')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-sm border transition-colors ${
            selectedSpecimen === 'balloon'
              ? 'bg-amber-950/60 border-amber-400/80 text-amber-200'
              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          {/* Balloon icon */}
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.686 2 6 5.134 6 9c0 4.2 4.5 8 6 9 1.5-1 6-4.8 6-9 0-3.866-2.686-7-6-7z" />
          </svg>
          <span>Specimen B · Medium Buoyant Balloon</span>
        </button>
      </div>

      {/* Specimen Card Display */}
      {selectedSpecimen === 'snow' ? (
        <div className="bg-[#12151b] border border-stone-800 p-6 md:p-8 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Specimen Visual Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#0a0c10] border border-stone-800/80 rounded-sm relative overflow-hidden">
            <div className="absolute top-3 left-3 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
              ACCESSION: CRY-2026.04
            </div>
            <div className="my-6 relative flex items-center justify-center w-36 h-36">
              {/* Detailed rendered medium snowflake vector */}
              <svg viewBox="0 0 100 100" className="w-32 h-32 text-sky-100 drop-shadow-[0_0_12px_rgba(186,230,253,0.5)]">
                {/* 6 primary branches */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <g key={deg} transform={`rotate(${deg} 50 50)`}>
                    <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Barbs */}
                    <line x1="50" y1="30" x2="38" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="50" y1="30" x2="62" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="50" y1="20" x2="42" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="50" y1="20" x2="58" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="50" cy="10" r="1.5" fill="currentColor" />
                  </g>
                ))}
                {/* Center hexagonal motif */}
                <polygon
                  points="50,42 57,46 57,54 50,58 43,54 43,46"
                  fill="rgba(56, 189, 248, 0.25)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Dendritic Stellar Crystal
              </span>
              <p className="text-[11px] text-stone-500 mt-1 font-mono">
                Calibrated Medium Diameter: 32.4 mm (equivalent)
              </p>
            </div>
          </div>

          {/* Specimen Curatorial Description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-sky-400 uppercase tracking-widest font-mono">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Gravitational Descent Dynamics</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif-display font-medium text-stone-100">
              Six-Fold Dendritic Precipitation
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Medium-scale snowflakes form under supersaturated atmospheric vapor between -13°C and -16°C. In the chamber simulation, each crystal executes a sinusoidal lateral wobble while maintaining terminal downward velocity under viscous drag.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-xs text-stone-400">
              <div>
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Fall Vector</span>
                <span className="text-stone-200 font-medium">Top to Bottom (Vertical Drift)</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Chamber Duration</span>
                <span className="text-stone-200 font-medium">5.00 Seconds Exact</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Crystallographic Class</span>
                <span className="text-stone-200 font-medium">Hexagonal Dihexagonal Dipyramidal</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Terminal Velocity</span>
                <span className="text-stone-200 font-medium">110 – 190 px / sec</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onTriggerSnow}
                className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-100 bg-sky-950/70 hover:bg-sky-900 border border-sky-600/70 rounded-sm transition-colors"
              >
                Release Snowflakes (5s)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#12151b] border border-stone-800 p-6 md:p-8 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Specimen Visual Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#0a0c10] border border-stone-800/80 rounded-sm relative overflow-hidden">
            <div className="absolute top-3 left-3 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
              ACCESSION: AER-2026.09
            </div>
            <div className="my-4 relative flex items-center justify-center w-36 h-44">
              {/* Detailed rendered medium balloon vector */}
              <svg viewBox="0 0 100 130" className="w-28 h-36 drop-shadow-[0_0_15px_rgba(245,158,11,0.35)]">
                <defs>
                  <radialGradient id="specimenBalloonGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#fce588" />
                    <stop offset="40%" stopColor="#b78b30" />
                    <stop offset="100%" stopColor="#4a3205" />
                  </radialGradient>
                  <linearGradient id="specimenHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                {/* String */}
                <path
                  d="M50 86 Q46 98 54 110 T48 126"
                  stroke="rgba(220,210,195,0.75)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Knot */}
                <polygon points="46,86 54,86 56,90 44,90" fill="#926d1e" />
                {/* Balloon Body */}
                <path
                  d="M50 86 C32 84 20 66 20 46 C20 22 33 10 50 10 C67 10 80 22 80 46 C80 66 68 84 50 86 Z"
                  fill="url(#specimenBalloonGrad)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                {/* Specular curved gloss */}
                <ellipse cx="38" cy="34" rx="9" ry="14" transform="rotate(-25 38 34)" fill="url(#specimenHighlight)" />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-xs uppercase tracking-wider text-amber-200 font-medium">
                Formal Aerostatic Sphere
              </span>
              <p className="text-[11px] text-stone-500 mt-1 font-mono">
                Calibrated Medium Geometry: 58 mm × 76 mm
              </p>
            </div>
          </div>

          {/* Specimen Curatorial Description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-amber-400 uppercase tracking-widest font-mono">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Buoyant Aerostatic Lift Dynamics</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif-display font-medium text-stone-100">
              Positive Archimedean Displacement
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Medium-scale celebration balloons are charged with low-density gas displacing ambient air. Upon release from the bottom boundaries of the chamber, buoyant net upward acceleration overtakes gravitational pull, steering each aerostat upward toward the ceiling in harmonic sway.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-xs text-stone-400">
              <div>
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Ascent Vector</span>
                <span className="text-stone-200 font-medium">Bottom to Top (Skyward Lift)</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Chamber Duration</span>
                <span className="text-stone-200 font-medium">5.00 Seconds Exact</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Formal Finishes</span>
                <span className="text-stone-200 font-medium">Crimson, Navy, Gold, Emerald</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Ascent Velocity</span>
                <span className="text-stone-200 font-medium">-130 – -210 px / sec</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onTriggerBalloons}
                className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-100 bg-amber-950/70 hover:bg-amber-900 border border-amber-600/70 rounded-sm transition-colors"
              >
                Release Balloons (5s)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theoretical Principles Grid */}
      <div id="principles" className="mt-12 pt-12 border-t border-stone-800/80">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500">Formulas & Governance</span>
          <h3 className="text-xl font-serif-display font-medium text-stone-200">
            Governing Dynamics of the Chamber
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#0f1217] border border-stone-800/80 rounded-sm">
            <span className="text-xs font-serif-display uppercase tracking-wider text-sky-300 font-semibold">
              I. Viscous Drag & Crystallization Equation
            </span>
            <p className="text-stone-400 text-xs mt-2 leading-relaxed">
              The downward terminal velocity $v_t$ of falling snowflakes is governed by the equilibrium between gravitational acceleration and hydrodynamic fluid resistance:
            </p>
            <div className="my-3 p-3 bg-stone-950/90 rounded border border-stone-800 font-mono text-xs text-sky-200 text-center">
              F_net = m · g - (1/2) · ρ_air · v² · C_d · A = 0
            </div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Six-branch dendritic geometry maximizes surface area $A$, dampening velocity and imparting gentle, sustained descent across the 5-second interval.
            </p>
          </div>

          <div className="p-6 bg-[#0f1217] border border-stone-800/80 rounded-sm">
            <span className="text-xs font-serif-display uppercase tracking-wider text-amber-300 font-semibold">
              II. Archimedean Buoyancy & Dynamic Lift
            </span>
            <p className="text-stone-400 text-xs mt-2 leading-relaxed">
              The upward net force $F_b$ driving balloons from the bottom of the screen upward to the top is determined by displaced air mass:
            </p>
            <div className="my-3 p-3 bg-stone-950/90 rounded border border-stone-800 font-mono text-xs text-amber-200 text-center">
              F_buoyancy = (ρ_ambient - ρ_helium) · V_sphere · g
            </div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              When $F_b$ exceeds the structural mass of the latex membrane and tether string, steady vertical acceleration ascends the specimen to the upper atmospheric envelope.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
