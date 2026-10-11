import React, { useEffect, useRef } from 'react';

// Deterministic audience silhouette generation matching the user's script
const generateAudience = () => {
  const rows = [
    { y: 838, r: 20, step: 62, color: '#2b150d' },
    { y: 878, r: 30, step: 92, color: '#140905' },
  ];
  const list: Array<{ x: number; y: number; r: number; color: string; d: string; delay: string }> = [];
  let seed = 42;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  rows.forEach((row, ri) => {
    for (let x = -20 + ri * 30; x < 1640; x += row.step + rnd() * 18) {
      const d = (4 + rnd() * 4).toFixed(2) + 's';
      const delay = (-rnd() * 6).toFixed(2) + 's';
      const r = row.r * (0.9 + rnd() * 0.2);
      list.push({ x, y: row.y, r, color: row.color, d, delay });
    }
  });
  return list;
};

const AUDIENCE_MEMBERS = generateAudience();

export const StagePublicSpeakingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let animId: number;

    const resize = () => {
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (randomY?: boolean) => {
      const spread = (Math.random() + Math.random() + Math.random() - 1.5) * 0.28;
      return {
        x: w * (0.5 + spread),
        y: randomY ? Math.random() * h : h * 0.95,
        r: Math.random() * 1.6 + 0.4,
        vy: -(Math.random() * 0.25 + 0.08),
        vx: (Math.random() - 0.5) * 0.12,
        t: Math.random() * Math.PI * 2,
      };
    };

    resize();
    const parts = Array.from({ length: 90 }, () => spawn(true));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += 0.02;
        p.x += p.vx + Math.sin(p.t) * 0.08;
        p.y += p.vy;
        if (p.y < h * 0.2) Object.assign(p, spawn(false));
        const a = (0.35 + Math.sin(p.t * 1.7) * 0.25) * Math.min(1, (p.y - h * 0.2) / (h * 0.25));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,232,195,${Math.max(a, 0)})`;
        ctx.fill();
      }
      if (!reduce) {
        animId = requestAnimationFrame(draw);
      }
    };

    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <style>{`
        /* Stage Scene Animations */
        .stage-beam { transform-box: view-box; }
        .stage-beam-l { transform-origin: 430px -40px; animation: stageSweepL 11s ease-in-out infinite; }
        .stage-beam-r { transform-origin: 1170px -40px; animation: stageSweepR 13s ease-in-out infinite; }
        .stage-beam-c { transform-origin: 800px -60px; animation: stageBreathe 6s ease-in-out infinite; }
        @keyframes stageSweepL { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(3deg); } }
        @keyframes stageSweepR { 0%,100% { transform: rotate(4deg); } 50% { transform: rotate(-3deg); } }
        @keyframes stageBreathe { 0%,100% { opacity: .85; } 50% { opacity: 1; } }

        .stage-pool { transform-box: fill-box; transform-origin: center; animation: stagePool 6s ease-in-out infinite; }
        @keyframes stagePool { 0%,100% { opacity: .75; transform: scaleX(1); } 50% { opacity: 1; transform: scaleX(1.06); } }

        .stage-curtain-l { transform-box: view-box; transform-origin: 0 0; animation: stageSwayL 9s ease-in-out infinite; }
        .stage-curtain-r { transform-box: view-box; transform-origin: 1600px 0; animation: stageSwayR 10s ease-in-out infinite; }
        @keyframes stageSwayL { 0%,100% { transform: skewX(0deg); } 50% { transform: skewX(1.2deg); } }
        @keyframes stageSwayR { 0%,100% { transform: skewX(0deg); } 50% { transform: skewX(-1.2deg); } }

        .stage-arm { transform-box: view-box; transform-origin: 852px 512px; animation: stageGesture 4.2s ease-in-out infinite; }
        @keyframes stageGesture {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(-14deg); }
          45% { transform: rotate(-6deg); }
          65% { transform: rotate(-18deg); }
        }
        .stage-speaker { transform-box: view-box; transform-origin: 800px 560px; animation: stageLean 4.2s ease-in-out infinite; }
        @keyframes stageLean { 0%,100% { transform: rotate(0deg); } 30% { transform: rotate(-1.2deg); } 65% { transform: rotate(1deg); } }

        .stage-wave { transform-box: fill-box; transform-origin: center; opacity: 0; animation: stageRipple 4.5s ease-out infinite; }
        .stage-wave:nth-child(2) { animation-delay: 1.5s; }
        .stage-wave:nth-child(3) { animation-delay: 3s; }
        @keyframes stageRipple { 0% { transform: scale(.4); opacity: .55; } 100% { transform: scale(7); opacity: 0; } }

        .stage-person { animation: stageBob var(--d, 5s) ease-in-out var(--delay, 0s) infinite; }
        @keyframes stageBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }

        @media (prefers-reduced-motion: reduce) {
          .stage-beam-l, .stage-beam-r, .stage-beam-c, .stage-pool, .stage-curtain-l, .stage-curtain-r, .stage-arm, .stage-speaker, .stage-wave, .stage-person {
            animation: none !important;
          }
        }
      `}</style>

      {/* Animated SVG Scene */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="stageWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4ebe2" />
            <stop offset=".45" stopColor="#d6b49a" />
            <stop offset=".72" stopColor="#7a4632" />
            <stop offset="1" stopColor="#3b1d14" />
          </linearGradient>
          <linearGradient id="stageFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5a2e1f" />
            <stop offset="1" stopColor="#1c0d08" />
          </linearGradient>
          <linearGradient id="stageFold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4a0f12" />
            <stop offset=".45" stopColor="#8e1f22" />
            <stop offset=".6" stopColor="#a8302c" />
            <stop offset="1" stopColor="#3d0b0e" />
          </linearGradient>
          <pattern id="stageVelvet" patternUnits="userSpaceOnUse" width="48" height="900">
            <rect width="48" height="900" fill="url(#stageFold)" />
          </pattern>
          <linearGradient id="stageCurtainShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".45" />
          </linearGradient>
          <linearGradient id="stageLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff3dc" stopOpacity="0" />
            <stop offset=".45" stopColor="#ffe6bf" stopOpacity=".38" />
            <stop offset="1" stopColor="#ffd9a0" stopOpacity=".22" />
          </linearGradient>
          <radialGradient id="stagePoolGrad">
            <stop offset="0" stopColor="#ffe2b0" stopOpacity=".75" />
            <stop offset="1" stopColor="#ffe2b0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="stageHalo" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#ffe8c4" stopOpacity=".55" />
            <stop offset="1" stopColor="#ffe8c4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="stageWood" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2e160d" />
            <stop offset=".5" stopColor="#5b3220" />
            <stop offset="1" stopColor="#26120a" />
          </linearGradient>
          <radialGradient id="stageVignette" cx=".5" cy=".55" r=".75">
            <stop offset=".55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".45" />
          </radialGradient>
          <filter id="stageSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Back wall + stage floor */}
        <rect width="1600" height="900" fill="url(#stageWall)" />
        <rect y="745" width="1600" height="155" fill="url(#stageFloor)" />
        <rect y="743" width="1600" height="4" fill="#b9805a" opacity=".5" />

        {/* Spotlight beams */}
        <g filter="url(#stageSoft)" style={{ mixBlendMode: 'screen' }}>
          <polygon className="stage-beam stage-beam-l" points="410,-40 450,-40 900,770 690,770" fill="url(#stageLight)" />
          <polygon className="stage-beam stage-beam-r" points="1150,-40 1190,-40 910,770 700,770" fill="url(#stageLight)" />
          <polygon className="stage-beam stage-beam-c" points="780,-60 820,-60 940,770 660,770" fill="url(#stageLight)" />
        </g>

        {/* Light pool on the stage */}
        <ellipse className="stage-pool" cx="800" cy="762" rx="300" ry="46" fill="url(#stagePoolGrad)" />

        {/* Halo behind speaker */}
        <circle cx="800" cy="500" r="190" fill="url(#stageHalo)" />

        {/* Voice ripples from the mic */}
        <g fill="none" stroke="#fff2dc" strokeWidth="1.2">
          <circle className="stage-wave" cx="820" cy="476" r="24" />
          <circle className="stage-wave" cx="820" cy="476" r="24" />
          <circle className="stage-wave" cx="820" cy="476" r="24" />
        </g>

        {/* Speaker silhouette */}
        <g className="stage-speaker" fill="#2a140c">
          <rect x="788" y="470" width="24" height="30" rx="8" />
          <circle cx="800" cy="442" r="34" />
          <path d="M736 562 Q740 502 800 494 Q860 502 864 562 Z" />
          <path d="M752 520 Q730 540 742 556 L760 556 Z" />
          <g className="stage-arm">
            <path d="M852 512 Q892 522 906 478" stroke="#2a140c" strokeWidth="18" strokeLinecap="round" fill="none" />
            <circle cx="907" cy="472" r="11" />
          </g>
        </g>

        {/* Podium + mic */}
        <path d="M845 552 C 862 522, 842 492, 826 482" stroke="#1a0b06" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="821" cy="477" rx="7" ry="11" fill="#1a0b06" transform="rotate(-30 821 477)" />
        <rect x="708" y="546" width="184" height="15" rx="3" fill="#3c1f13" />
        <path d="M722 560 L878 560 L864 746 L736 746 Z" fill="url(#stageWood)" />
        <path d="M770 600 L830 600 L826 640 L774 640 Z" fill="#c69a6b" opacity=".35" />

        {/* Curtains */}
        <g className="stage-curtain-l">
          <path d="M0 0 L290 0 Q240 380 320 900 L0 900 Z" fill="url(#stageVelvet)" />
          <path d="M0 0 L290 0 Q240 380 320 900 L0 900 Z" fill="url(#stageCurtainShade)" />
        </g>
        <g className="stage-curtain-r">
          <path d="M1600 0 L1310 0 Q1360 380 1280 900 L1600 900 Z" fill="url(#stageVelvet)" />
          <path d="M1600 0 L1310 0 Q1360 380 1280 900 L1600 900 Z" fill="url(#stageCurtainShade)" />
        </g>
        <path d="M0 0 H1600 V70 Q1520 110 1440 70 Q1360 110 1280 70 Q1200 110 1120 70 Q1040 110 960 70 Q880 110 800 70 Q720 110 640 70 Q560 110 480 70 Q400 110 320 70 Q240 110 160 70 Q80 110 0 70 Z" fill="url(#stageVelvet)" />

        {/* Audience */}
        <g id="audience">
          {AUDIENCE_MEMBERS.map((p, i) => (
            <g
              key={i}
              className="stage-person"
              style={{ '--d': p.d, '--delay': p.delay } as React.CSSProperties}
            >
              <circle cx={p.x} cy={p.y - p.r * 1.6} r={p.r} fill={p.color} />
              <ellipse cx={p.x} cy={p.y + p.r * 0.9} rx={p.r * 2} ry={p.r * 1.6} fill={p.color} />
            </g>
          ))}
        </g>

        {/* Vignette */}
        <rect width="1600" height="900" fill="url(#stageVignette)" />
      </svg>

      {/* Floating Dust in Spotlight */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Top Fade Overlay to ensure seamless transition and high typographic legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #EBE6DA 0%, rgba(235, 230, 218, 0.92) 28%, rgba(235, 230, 218, 0.45) 55%, rgba(28, 13, 8, 0.2) 75%, rgba(28, 13, 8, 0.6) 100%)',
        }}
      />
    </div>
  );
};
