import React, { useEffect, useRef } from 'react';
import { SnowflakeParticle, BalloonParticle, SimulationDensity } from '../types/atmosphere';

interface AtmosphericCanvasProps {
  snowActive: boolean;
  balloonsActive: boolean;
  snowRemainingMs: number;
  balloonsRemainingMs: number;
  density: SimulationDensity;
  onParticleSpawn?: (type: 'snow' | 'balloon', count: number) => void;
}

const BALLOON_PALETTES = [
  { name: 'Crimson Velvet', body: '#9b1c2e', highlight: '#f07183' },
  { name: 'Sovereign Navy', body: '#1a365d', highlight: '#63b3ed' },
  { name: 'Champagne Gold', body: '#b78b30', highlight: '#fce588' },
  { name: 'Imperial Emerald', body: '#165b40', highlight: '#6ee7b7' },
  { name: 'Amethyst Royale', body: '#582b6b', highlight: '#d8b4fe' },
  { name: 'Sterling Platinum', body: '#475569', highlight: '#cbd5e1' },
  { name: 'Burgundy Reserve', body: '#671928', highlight: '#e28495' },
];

export const AtmosphericCanvas: React.FC<AtmosphericCanvasProps> = ({
  snowActive,
  balloonsActive,
  density,
  onParticleSpawn,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // References to keep mutable state inside the requestAnimationFrame loop
  const snowflakesRef = useRef<SnowflakeParticle[]>([]);
  const balloonsRef = useRef<BalloonParticle[]>([]);
  const nextParticleIdRef = useRef(1);

  const snowEmissionTimerRef = useRef(0);
  const balloonEmissionTimerRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Density emission interval multipliers
  const getInterval = (type: 'snow' | 'balloon') => {
    if (type === 'snow') {
      if (density === 'gentle') return 160;
      if (density === 'copious') return 55;
      return 95; // standard
    } else {
      if (density === 'gentle') return 240;
      if (density === 'copious') return 110;
      return 160; // standard
    }
  };

  // Helper to draw a medium-sized intricate snowflake
  const drawSnowflake = (ctx: CanvasRenderingContext2D, p: SnowflakeParticle) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity;

    const r = p.size / 2; // radius ~13px to 20px (diameter 26px - 40px)
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Soft crystalline glow
    ctx.shadowColor = 'rgba(215, 235, 255, 0.7)';
    ctx.shadowBlur = 6;

    // Center jewel / hexagon
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
    ctx.fill();

    // 6 primary dendritic branches
    for (let i = 0; i < 6; i++) {
      const theta = (i * Math.PI) / 3;
      ctx.save();
      ctx.rotate(theta);

      // Main arm
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -r);
      ctx.stroke();

      // Outer barb / chevrons
      const b1 = r * 0.45;
      const bLen1 = r * 0.32;
      ctx.beginPath();
      ctx.moveTo(0, -b1);
      ctx.lineTo(-bLen1 * 0.7, -b1 - bLen1 * 0.6);
      ctx.moveTo(0, -b1);
      ctx.lineTo(bLen1 * 0.7, -b1 - bLen1 * 0.6);
      ctx.stroke();

      // Mid barb
      const b2 = r * 0.75;
      const bLen2 = r * 0.28;
      ctx.beginPath();
      ctx.moveTo(0, -b2);
      ctx.lineTo(-bLen2 * 0.7, -b2 - bLen2 * 0.6);
      ctx.moveTo(0, -b2);
      ctx.lineTo(bLen2 * 0.7, -b2 - bLen2 * 0.6);
      ctx.stroke();

      // Small secondary sub-arm
      if (p.variant === 1) {
        ctx.beginPath();
        ctx.arc(0, -r, 1.4, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.variant === 2) {
        const b0 = r * 0.25;
        const bLen0 = r * 0.2;
        ctx.beginPath();
        ctx.moveTo(0, -b0);
        ctx.lineTo(-bLen0 * 0.6, -b0 - bLen0 * 0.5);
        ctx.moveTo(0, -b0);
        ctx.lineTo(bLen0 * 0.6, -b0 - bLen0 * 0.5);
        ctx.stroke();
      }

      ctx.restore();
    }

    ctx.restore();
  };

  // Helper to draw a medium-sized formal celebration balloon
  const drawBalloon = (ctx: CanvasRenderingContext2D, b: BalloonParticle) => {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle);

    const w = b.width; // 52px - 66px
    const h = b.height; // 68px - 86px
    const rx = w / 2;
    const ry = h / 2;

    // Draw swaying trailing string
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(230, 225, 215, 0.65)';
    ctx.lineWidth = 1.3;
    ctx.lineCap = 'round';

    const stringLen = b.stringLength;
    const sway1 = Math.sin(b.swayPhase * 1.5) * 10;
    const sway2 = Math.sin(b.swayPhase * 1.5 + 1.2) * 14;

    ctx.moveTo(0, ry); // start from bottom knot
    ctx.bezierCurveTo(
      sway1, ry + stringLen * 0.35,
      -sway2, ry + stringLen * 0.7,
      sway1 * 0.5, ry + stringLen
    );
    ctx.stroke();
    ctx.restore();

    // Shadow & glow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;

    // Balloon body (tear-drop oval with slight neck)
    ctx.beginPath();
    ctx.moveTo(0, ry); // knot point
    // Left bottom curve
    ctx.bezierCurveTo(-rx * 0.4, ry + 2, -rx, ry * 0.4, -rx, -ry * 0.2);
    // Left top shoulder and crown
    ctx.bezierCurveTo(-rx, -ry * 0.95, -rx * 0.5, -ry, 0, -ry);
    // Right top shoulder and crown
    ctx.bezierCurveTo(rx * 0.5, -ry, rx, -ry * 0.95, rx, -ry * 0.2);
    // Right bottom curve
    ctx.bezierCurveTo(rx, ry * 0.4, rx * 0.4, ry + 2, 0, ry);
    ctx.closePath();

    // Rich gradient fill for formal depth
    const grad = ctx.createRadialGradient(
      -rx * 0.28, -ry * 0.32, rx * 0.1,
      0, 0, Math.max(rx, ry) * 1.05
    );
    grad.addColorStop(0, b.highlightColor);
    grad.addColorStop(0.35, b.bodyColor);
    grad.addColorStop(1, '#08080a');

    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle edge rim for formal satin texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Primary glossy specular highlight
    ctx.save();
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
    ctx.ellipse(-rx * 0.38, -ry * 0.42, rx * 0.22, ry * 0.32, -Math.PI / 6, 0, Math.PI * 2);
    const specGrad = ctx.createRadialGradient(
      -rx * 0.38, -ry * 0.42, 1,
      -rx * 0.38, -ry * 0.42, rx * 0.22
    );
    specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
    specGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
    specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = specGrad;
    ctx.fill();
    ctx.restore();

    // Bottom tie / knot
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-4, ry);
    ctx.lineTo(4, ry);
    ctx.lineTo(6, ry + 5);
    ctx.lineTo(-6, ry + 5);
    ctx.closePath();
    ctx.fillStyle = b.bodyColor;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }
      const deltaMs = Math.min(currentTime - lastTimeRef.current, 64);
      lastTimeRef.current = currentTime;
      const dt = deltaMs / 1000;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Manage Snowflakes Emission (if active)
      if (snowActive) {
        snowEmissionTimerRef.current += deltaMs;
        const interval = getInterval('snow');
        while (snowEmissionTimerRef.current >= interval) {
          snowEmissionTimerRef.current -= interval;

          // Spawn 1 or 2 medium snowflakes
          const spawnCount = density === 'copious' ? 2 : 1;
          for (let s = 0; s < spawnCount; s++) {
            const startX = Math.random() * (width + 100) - 50;
            // Medium size: diameter 26px to 38px (radius 13px to 19px)
            const size = 26 + Math.random() * 12;
            const snowflake: SnowflakeParticle = {
              id: nextParticleIdRef.current++,
              x: startX,
              y: -size - Math.random() * 30, // Starts above top
              baseX: startX,
              size,
              // Falling downward velocity: ~110px to 190px per second
              vy: 110 + Math.random() * 80,
              angle: Math.random() * Math.PI * 2,
              vAngle: (Math.random() - 0.5) * 1.4,
              opacity: 0.78 + Math.random() * 0.22,
              swayAmp: 18 + Math.random() * 22,
              swayFreq: 1.2 + Math.random() * 1.4,
              swayPhase: Math.random() * Math.PI * 2,
              variant: Math.floor(Math.random() * 3),
            };
            snowflakesRef.current.push(snowflake);
          }
          if (onParticleSpawn) onParticleSpawn('snow', spawnCount);
        }
      } else {
        snowEmissionTimerRef.current = 0;
      }

      // 2. Manage Balloons Emission (if active)
      if (balloonsActive) {
        balloonEmissionTimerRef.current += deltaMs;
        const interval = getInterval('balloon');
        while (balloonEmissionTimerRef.current >= interval) {
          balloonEmissionTimerRef.current -= interval;

          const startX = 60 + Math.random() * (width - 120);
          // Medium size: width 52px to 64px, height 68px to 84px
          const bWidth = 52 + Math.random() * 12;
          const bHeight = bWidth * (1.28 + Math.random() * 0.12);
          const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];

          const balloon: BalloonParticle = {
            id: nextParticleIdRef.current++,
            x: startX,
            // Starts below the screen
            y: height + bHeight + 40 + Math.random() * 20,
            baseX: startX,
            width: bWidth,
            height: bHeight,
            // Floating upward velocity (negative y): ~130px to 210px per second
            vy: -(130 + Math.random() * 80),
            angle: (Math.random() - 0.5) * 0.15,
            vAngle: (Math.random() - 0.5) * 0.4,
            colorName: palette.name,
            bodyColor: palette.body,
            highlightColor: palette.highlight,
            stringLength: 50 + Math.random() * 20,
            swayAmp: 16 + Math.random() * 24,
            swayFreq: 1.1 + Math.random() * 1.2,
            swayPhase: Math.random() * Math.PI * 2,
            stringSegments: [0, 0, 0],
          };
          balloonsRef.current.push(balloon);
          if (onParticleSpawn) onParticleSpawn('balloon', 1);
        }
      } else {
        balloonEmissionTimerRef.current = 0;
      }

      // 3. Update & Draw Snowflakes (falling from top to bottom)
      const survivingSnowflakes: SnowflakeParticle[] = [];
      for (const p of snowflakesRef.current) {
        // Fall downward
        p.y += p.vy * dt;
        p.swayPhase += p.swayFreq * dt;
        p.x = p.baseX + Math.sin(p.swayPhase) * p.swayAmp;
        p.angle += p.vAngle * dt;

        drawSnowflake(ctx, p);

        // Keep until it has traveled completely off the bottom
        if (p.y - p.size < height + 40) {
          survivingSnowflakes.push(p);
        }
      }
      snowflakesRef.current = survivingSnowflakes;

      // 4. Update & Draw Balloons (floating from bottom to top)
      const survivingBalloons: BalloonParticle[] = [];
      for (const b of balloonsRef.current) {
        // Float upward
        b.y += b.vy * dt;
        b.swayPhase += b.swayFreq * dt;
        b.x = b.baseX + Math.sin(b.swayPhase) * b.swayAmp;
        // Subtle rhythmic tilt as it cuts through buoyant air
        b.angle = Math.sin(b.swayPhase) * 0.12;

        drawBalloon(ctx, b);

        // Keep until it has floated completely past the top of the screen (including trailing string)
        if (b.y + b.height + b.stringLength > -40) {
          survivingBalloons.push(b);
        }
      }
      balloonsRef.current = survivingBalloons;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [snowActive, balloonsActive, density, onParticleSpawn]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 w-full h-full"
      aria-hidden="true"
    />
  );
};
