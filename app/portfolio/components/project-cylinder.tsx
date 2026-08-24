'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './depth-carousel.css';

export interface CylinderProject {
  title: string;
  image: string;
  link: string;
}

interface ProjectCylinderProps {
  projects: CylinderProject[];
}

// ─── Depth-rail tuning ──────────────────────────────────────────────────────
// Card aspect ratio matches the project screenshots (~2.1:1 landscape) so cover doesn't crop them.
const CARD_WIDTH = 720;
const CARD_HEIGHT = 340;
const RADIUS = 16;
const TINT = '#05060a';
const DEPTH = 520;
const SPREAD = 220;
const TILT = 22;
const VISIBLE_CARDS = 2;
const FALLOFF = 0.22;
const BLUR = 6;
const DURATION = 700;
const EASE = 'power3.out';
const AUTOPLAY_DELAY = 4000;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

interface DragState {
  x: number;
  startPos: number;
  lastX: number;
  lastT: number;
  v: number;
  moved: boolean;
  id: number;
}

export function ProjectCylinder({ projects }: ProjectCylinderProps) {
  const count = projects.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);

  const dragRef = useRef<DragState | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedRef = useRef(false);

  const [active, setActive] = useState(0);

  const layout = useCallback(
    (pos: number) => {
      const n = count;
      if (!n) return;
      const sc = scaleRef.current;

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let d = i - pos;
        if (n > 1) {
          d = ((d % n) + n) % n;
          if (d > n / 2) d -= n;
        }

        const back = Math.max(0, d);
        const az = Math.abs(d);
        const shown = az <= VISIBLE_CARDS + 0.5;

        const tz = -DEPTH * d;
        const tx = SPREAD * d;
        const ry = TILT * clamp(d, 0, 1);

        let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
        if (!shown) opacity = 0;

        const brightness = Math.max(0.15, 1 - back * FALLOFF);
        const blurPx = BLUR > 0 ? Math.min(BLUR, (back / Math.max(1, VISIBLE_CARDS)) * BLUR) : 0;
        const zi = Math.round(2000 - d * 20);

        el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
        el.style.zIndex = String(zi);
        el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

        const ov = overlayRefs.current[i];
        if (ov) ov.style.opacity = clamp(back * FALLOFF * 1.25, 0, 0.86).toFixed(3);
      }
    },
    [count]
  );

  const notify = useCallback((idx: number) => setActive(idx), []);

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();
      const proxy = { p: posRef.current };
      const dur = animate && !reducedRef.current ? DURATION / 1000 : 0;
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: EASE,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          if (count > 0) posRef.current = ((posRef.current % count) + count) % count;
          layout(posRef.current);
        },
      });
    },
    [layout, count]
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const n = count;
      if (!n) return;
      const idx = ((rawIndex % n) + n) % n;
      let delta = idx - posRef.current;
      if (n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [tweenTo, notify, count]
  );

  const navigateBy = useCallback((step: number) => setFocus(focusRef.current + step, true), [setFocus]);

  // Auto-size cards to fit narrow viewports
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const needed = CARD_WIDTH + Math.abs(SPREAD) * 2 + 120;
      scaleRef.current = clamp(w / needed, 0.4, 1);
      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [layout]);


  // Pointer drag
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (count < 2) return;
      tweenRef.current?.kill();
      dragRef.current = {
        x: e.clientX,
        startPos: posRef.current,
        lastX: e.clientX,
        lastT: performance.now(),
        v: 0,
        moved: false,
        id: e.pointerId,
      };
    },
    [count]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const stepPx = Math.max(CARD_WIDTH * 0.55 * scaleRef.current, 40);
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.id);
      }
      if (!drag.moved) return;
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;
      posRef.current = drag.startPos - dx / stepPx;
      layout(posRef.current);
    },
    [layout]
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const stepPx = Math.max(CARD_WIDTH * 0.55 * scaleRef.current, 40);
    const projected = posRef.current - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [setFocus]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  // Click centre card to open its link; click any other card to bring it to centre
  const onCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved) return;
      if (index === active) {
        const link = projects[index]?.link;
        if (link && link !== '#') window.open(link, '_blank', 'noopener,noreferrer');
        return;
      }
      setFocus(index, true);
    },
    [setFocus, active, projects]
  );

  // Slow continuous auto-advance, pausing on hover/focus (matches old "floating" feel)
  useEffect(() => {
    reducedRef.current = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedRef.current || count < 2) return;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = setInterval(() => {
        if (!hovered && !focused) navigateBy(1);
      }, AUTOPLAY_DELAY);
    };
    const onEnter = () => { hovered = true; };
    const onLeave = () => { hovered = false; };
    const onFocusIn = () => { focused = true; };
    const onFocusOut = () => { focused = false; };
    root?.addEventListener('mouseenter', onEnter);
    root?.addEventListener('mouseleave', onLeave);
    root?.addEventListener('focusin', onFocusIn);
    root?.addEventListener('focusout', onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener('mouseenter', onEnter);
      root?.removeEventListener('mouseleave', onLeave);
      root?.removeEventListener('focusin', onFocusIn);
      root?.removeEventListener('focusout', onFocusOut);
    };
  }, [count, navigateBy]);

  useEffect(() => {
    layout(posRef.current);
  }, [layout]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    },
    []
  );

  return (
    <div className="relative w-full overflow-hidden" style={{ height: CARD_HEIGHT + 140 }}>
      <div
        ref={rootRef}
        className="depth-carousel"
        style={{ '--dc-perspective': '1400px' } as React.CSSProperties}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onKeyDown={onKeyDown}
      >
        <div className="depth-carousel__stage">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="depth-carousel__card"
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: RADIUS }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${project.title}`}
              aria-hidden={active !== i}
              onClick={() => onCardClick(i)}
            >
              <img className="depth-carousel__img" src={project.image} alt={project.title} draggable={false} />
              <span
                className="depth-carousel__tint"
                ref={(el) => { overlayRefs.current[i] = el; }}
                style={{ background: TINT }}
              />
              <span className="depth-carousel__caption-fade" />
              <p className="depth-carousel__caption">{project.title}</p>
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className="depth-carousel__arrow depth-carousel__arrow--prev"
              aria-label="Previous project"
              onClick={() => navigateBy(-1)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="depth-carousel__arrow depth-carousel__arrow--next"
              aria-label="Next project"
              onClick={() => navigateBy(1)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {count > 1 && (
          <div className="depth-carousel__dots" role="tablist" aria-label="Projects">
            {projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to ${p.title}`}
                className={`depth-carousel__dot${active === i ? ' is-active' : ''}`}
                onClick={() => setFocus(i, true)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
