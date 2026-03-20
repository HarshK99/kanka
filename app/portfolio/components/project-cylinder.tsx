'use client';

import { useEffect, useRef } from 'react';

export interface CylinderProject {
  title: string;
  image: string;
  link: string;
}

interface ProjectCylinderProps {
  projects: CylinderProject[];
}

// ─── Concave arc with scale-aware spacing (no overlap) ─────────────────────
const CARD_W      = 260;    // px
const CARD_H      = 182;    // px
const WING        = 2;      // cards shown each side of center
const GAP         = 16;     // minimum gap between scaled card edges (px)
const ARC_ANGLE   = 18 * (Math.PI / 180); // radians per card — depth & rotation curve
const DEPTH_SCALE = 120;    // max z-forward for outermost cards (px)
const ANGLE_STEP  = 8;      // gentle rotateY per step (concave tilt toward centre)
const SCALE_CTR   = 0.88;   // center card scale (slightly smaller)
const SCALE_INC   = 0.06;   // scale increase per step toward edges
const ALPHA_MIN   = 0.62;   // center card opacity
const ALPHA_INC   = 0.19;   // opacity increase per step
const SPEED       = 0.00012; // very slow drift ≈ one step every ~8 s (floating)

/** Scale at a given absolute offset */
function cardScale(absOffset: number): number {
  return Math.min(1, SCALE_CTR + absOffset * SCALE_INC);
}

/**
 * Cumulative X positions at integer offsets 0 … WING+1.
 * Each step = sum of adjacent half-widths + GAP, so card edges never touch.
 */
const X_POS: number[] = (() => {
  const t = [0];
  for (let k = 1; k <= WING + 1; k++) {
    t.push(t[k - 1] + CARD_W * (cardScale(k - 1) + cardScale(k)) / 2 + GAP);
  }
  return t;
})();

/** Scale-compensated X translation with cosine easing between integer steps */
function getX(offset: number): number {
  const abs    = Math.abs(offset);
  const lo     = Math.floor(abs);
  const hi     = lo + 1;
  const frac   = abs - lo;
  const smooth = (1 - Math.cos(frac * Math.PI)) / 2;
  const loPos  = lo < X_POS.length ? X_POS[lo] : X_POS[X_POS.length - 1] + (lo - X_POS.length + 1) * (CARD_W + GAP);
  const hiPos  = hi < X_POS.length ? X_POS[hi] : X_POS[X_POS.length - 1] + (hi - X_POS.length + 1) * (CARD_W + GAP);
  return Math.sign(offset) * (loPos + (hiPos - loPos) * smooth);
}

/** Shortest-arc signed offset of card i from continuous position pos */
function arc(i: number, n: number, pos: number): number {
  let o = i - ((pos % n + n) % n);
  if (o >  n / 2) o -= n;
  if (o < -n / 2) o += n;
  return o;
}

export function ProjectCylinder({ projects }: ProjectCylinderProps) {
  const n = projects.length;

  // Refs to DOM elements — avoids React re-renders inside the animation loop
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(n).fill(null));
  const dotRefs  = useRef<(HTMLButtonElement | null)[]>(Array(n).fill(null));

  const posRef    = useRef(0);      // continuous floating-point carousel position
  const pausedRef = useRef(false);
  const rafRef    = useRef<number | undefined>(undefined);
  const prevTime  = useRef<number | undefined>(undefined);
  const touchX    = useRef<number | undefined>(undefined);

  // ── Direct-DOM style application (called every rAF frame) ──────────────────
  const applyStyles = (pos: number) => {
    const activeIdx = Math.round(((pos % n) + n) % n) % n;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = arc(i, n, pos);
      const abs    = Math.abs(offset);
      const hidden = abs > WING;

      const tx    = getX(offset);                                    // scale-aware, no overlap
      const tz    = (1 - Math.cos(abs * ARC_ANGLE)) * DEPTH_SCALE;  // concave Z: edges forward
      const ry    = -offset * ANGLE_STEP;                           // tilt toward centre
      const scale = cardScale(abs);
      const opacity = hidden ? 0 : Math.min(1, ALPHA_MIN + abs * ALPHA_INC);
      const zIdx    = hidden ? 0 : WING + 1 - Math.round(abs);      // center stays on top

      el.style.transform     = `translateX(${tx}px) rotateY(${ry}deg) translateZ(${tz}px) scale(${scale})`;
      el.style.opacity       = String(opacity);
      el.style.zIndex        = String(zIdx);
      el.style.pointerEvents = hidden ? 'none' : 'auto';
    });

    // Update dot indicators without React state
    dotRefs.current.forEach((el, i) => {
      if (!el) return;
      const active = i === activeIdx;
      el.style.width           = active ? '24px' : '6px';
      el.style.backgroundColor = active ? '#ffffff' : '#52525b';
    });
  };

  // ── rAF animation loop ──────────────────────────────────────────────────────
  useEffect(() => {
    const loop = (time: number) => {
      if (prevTime.current !== undefined && !pausedRef.current) {
        posRef.current += (time - prevTime.current) * SPEED;
      }
      prevTime.current = time;
      applyStyles(posRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Navigation helpers ──────────────────────────────────────────────────────
  // Jump to a specific card index (shortest-arc, instant)
  const shiftTo = (targetIdx: number) => {
    const cur  = Math.round(((posRef.current % n) + n) % n) % n;
    let diff   = targetIdx - cur;
    if (diff >  n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    posRef.current += diff;
  };

  const stepPrev = () => { posRef.current -= 1; };
  const stepNext = () => { posRef.current += 1; };

  // Card click: if centre → open link, else → navigate to that card
  const handleCardClick = (idx: number, link: string) => {
    const offset = arc(idx, n, posRef.current);
    if (Math.abs(offset) < 0.35) {
      if (link !== '#') window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      shiftTo(idx);
    }
  };

  // ── Touch swipe ─────────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === undefined) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) dx < 0 ? stepNext() : stepPrev();
    touchX.current = undefined;
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-10 select-none w-full">

      {/* Arc stage — overflow hidden clips cards that go off-screen on mobile */}
      <div
        className="relative w-full overflow-hidden"
        style={{ perspective: '1100px', height: `${CARD_H + 110}px` }}
        onMouseEnter={() => { pausedRef.current = true;  }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            ref={(el) => { cardRefs.current[idx] = el; }}
            style={{
              position : 'absolute',
              left     : `calc(50% - ${CARD_W / 2}px)`,
              top      : `calc(50% - ${CARD_H / 2}px)`,
              width    : CARD_W,
              height   : CARD_H,
              opacity  : 0,       // rAF sets this immediately on first frame
              willChange: 'transform, opacity',
              cursor   : 'pointer',
            }}
            onClick={() => handleCardClick(idx, project.link)}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-700/50 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 right-4 text-sm font-semibold text-white truncate">
                {project.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation bar */}
      <div className="flex items-center gap-5">
        <button
          onClick={stepPrev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 text-xl hover:border-zinc-400 hover:text-white transition-colors"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Pill-dot indicators — widths updated by rAF, no React state */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {projects.map((p, i) => (
            <button
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
              onClick={() => shiftTo(i)}
              style={{
                height         : '6px',
                width          : '6px',
                borderRadius   : '9999px',
                backgroundColor: '#52525b',
                border         : 'none',
                padding        : 0,
                cursor         : 'pointer',
                transition     : 'width 0.35s ease, background-color 0.35s ease',
              }}
              aria-label={`Go to ${p.title}`}
            />
          ))}
        </div>

        <button
          onClick={stepNext}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 text-xl hover:border-zinc-400 hover:text-white transition-colors"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <p className="text-xs text-zinc-500 tracking-wide">
        Hover to pause · swipe or use arrows · click centre to visit
      </p>

    </div>
  );
}
