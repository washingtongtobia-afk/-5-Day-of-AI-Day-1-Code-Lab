export type SimulationDensity = 'gentle' | 'standard' | 'copious';

export interface SnowflakeParticle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  size: number; // medium size: 26px to 40px diameter
  vy: number; // falling speed
  angle: number;
  vAngle: number;
  opacity: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  variant: number; // 0, 1, 2 for distinct crystalline forms
}

export interface BalloonParticle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  width: number; // medium size: 52px to 66px
  height: number; // medium size: 68px to 86px
  vy: number; // upward speed (negative)
  angle: number;
  vAngle: number;
  colorName: string;
  bodyColor: string;
  highlightColor: string;
  stringLength: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  stringSegments: number[];
}

export interface ChamberStats {
  snowEventsCount: number;
  balloonEventsCount: number;
  totalSnowflakesSpawned: number;
  totalBalloonsSpawned: number;
}
