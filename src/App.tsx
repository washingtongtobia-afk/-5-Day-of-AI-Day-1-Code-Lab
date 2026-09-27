/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AtmosphericCanvas } from './components/AtmosphericCanvas';
import { Navigation } from './components/Navigation';
import { ControlDeck } from './components/ControlDeck';
import { CuratorialDossier } from './components/CuratorialDossier';
import { Footer } from './components/Footer';
import { SimulationDensity } from './types/atmosphere';
import { playSnowChime, playBalloonAscentSound } from './utils/audio';

export default function App() {
  const [snowRemainingMs, setSnowRemainingMs] = useState<number>(0);
  const [balloonsRemainingMs, setBalloonsRemainingMs] = useState<number>(0);
  const [density, setDensity] = useState<SimulationDensity>('standard');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const [totalSnowSpawned, setTotalSnowSpawned] = useState<number>(0);
  const [totalBalloonsSpawned, setTotalBalloonsSpawned] = useState<number>(0);

  const snowEndTimeRef = useRef<number>(0);
  const balloonEndTimeRef = useRef<number>(0);

  // Precision 5-second countdown loop
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const now = Date.now();

      if (snowEndTimeRef.current > 0) {
        const remaining = Math.max(0, snowEndTimeRef.current - now);
        setSnowRemainingMs(remaining);
        if (remaining <= 0) {
          snowEndTimeRef.current = 0;
        }
      }

      if (balloonEndTimeRef.current > 0) {
        const remaining = Math.max(0, balloonEndTimeRef.current - now);
        setBalloonsRemainingMs(remaining);
        if (remaining <= 0) {
          balloonEndTimeRef.current = 0;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleTriggerSnow = useCallback(() => {
    snowEndTimeRef.current = Date.now() + 5000;
    setSnowRemainingMs(5000);
    playSnowChime(audioEnabled);
  }, [audioEnabled]);

  const handleTriggerBalloons = useCallback(() => {
    balloonEndTimeRef.current = Date.now() + 5000;
    setBalloonsRemainingMs(5000);
    playBalloonAscentSound(audioEnabled);
  }, [audioEnabled]);

  const handleResetSession = useCallback(() => {
    snowEndTimeRef.current = 0;
    balloonEndTimeRef.current = 0;
    setSnowRemainingMs(0);
    setBalloonsRemainingMs(0);
  }, []);

  const handleParticleSpawn = useCallback((type: 'snow' | 'balloon', count: number) => {
    if (type === 'snow') {
      setTotalSnowSpawned((prev) => prev + count);
    } else {
      setTotalBalloonsSpawned((prev) => prev + count);
    }
  }, []);

  const snowActive = snowRemainingMs > 0;
  const balloonsActive = balloonsRemainingMs > 0;

  return (
    <div className="min-h-screen bg-[#0d0f14] text-stone-100 flex flex-col relative overflow-x-hidden selection:bg-amber-400/20 selection:text-amber-100">
      {/* Background subtle formal gallery texture & radial illumination */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"
        aria-hidden="true"
      />

      {/* Atmospheric Particles Canvas Layer (Snowflakes from top to bottom & Balloons from bottom to top) */}
      <AtmosphericCanvas
        snowActive={snowActive}
        balloonsActive={balloonsActive}
        snowRemainingMs={snowRemainingMs}
        balloonsRemainingMs={balloonsRemainingMs}
        density={density}
        onParticleSpawn={handleParticleSpawn}
      />

      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Navigation
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        onResetSession={handleResetSession}
      />

      {/* Main Presentation Surface */}
      <main className="flex-1 z-10 flex flex-col justify-start">
        {/* Primary Ceremonial Control Console */}
        <ControlDeck
          snowActive={snowActive}
          balloonsActive={balloonsActive}
          snowRemainingMs={snowRemainingMs}
          balloonsRemainingMs={balloonsRemainingMs}
          density={density}
          onSetDensity={setDensity}
          onTriggerSnow={handleTriggerSnow}
          onTriggerBalloons={handleTriggerBalloons}
          totalSnowSpawned={totalSnowSpawned}
          totalBalloonsSpawned={totalBalloonsSpawned}
        />

        {/* Curatorial Dossier & Specimen Examination */}
        <CuratorialDossier
          onTriggerSnow={handleTriggerSnow}
          onTriggerBalloons={handleTriggerBalloons}
        />
      </main>

      {/* Formal Archival Footer */}
      <Footer />
    </div>
  );
}
