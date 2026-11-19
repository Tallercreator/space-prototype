import * as React from "react";

import { asset } from "./data";

/**
 * Геометрия глаз в координатах исходного рендера персонажа (1805×1805,
 * в ассете обрезан до области 240,346 — 1617,1462). Глазные яблоки и зрачки
 * рисуются поверх картинки заново, чтобы зрачки могли двигаться.
 */
const VIEW_BOX = "240 346 1377 1116";
const EYES = [
  { cx: 572.5, cy: 828.5 },
  { cx: 939.5, cy: 828.5 },
];
const EYE_RX = 134;
const EYE_RY = 97;
const PUPIL_R = 79;
/** Без движения курсора дольше этого времени персонаж сам осматривается по сторонам. */
const IDLE_MS = 3500;
/** На каком расстоянии от персонажа (px) взгляд отклоняется на половину хода. */
const FALLOFF = 140;

export type MascotMood = "watching" | "happy" | "sad";

/**
 * Персонаж-наблюдатель: следит зрачками за курсором (или пальцем), моргает,
 * а когда курсор замирает — сам поглядывает по сторонам.
 */
export function Mascot({ mood = "watching" }: { mood?: MascotMood }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let idleTimer = 0;
    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      // Центр лица — между глазами, а не центр картинки: справа у рендера боковая грань.
      const dx = e.clientX - (box.left + box.width * 0.375);
      const dy = e.clientY - (box.top + box.height * 0.43);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = dist / (dist + FALLOFF);
      el.style.setProperty("--look-x", ((dx / dist) * reach).toFixed(3));
      el.style.setProperty("--look-y", ((dy / dist) * reach).toFixed(3));
      el.removeAttribute("data-idle");
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => el.setAttribute("data-idle", ""), IDLE_MS);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div ref={ref} className={`offer-mascot offer-mascot--${mood}`} data-idle="" aria-hidden="true">
      <img className="offer-mascot__body" src={asset("mascot")} alt="" draggable={false} />
      <svg className="offer-mascot__eyes" viewBox={VIEW_BOX}>
        <defs>
          <radialGradient id="offer-mascot-ball" cx="34%" cy="28%" r="80%">
            <stop offset="0" stopColor="#f1f3ee" />
            <stop offset="0.6" stopColor="#d6d9d2" />
            <stop offset="1" stopColor="#b9bcb4" />
          </radialGradient>
          <radialGradient id="offer-mascot-pupil" cx="38%" cy="32%" r="75%">
            <stop offset="0" stopColor="#2e3130" />
            <stop offset="0.55" stopColor="#0c0d0d" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          {EYES.map((eye, i) => (
            <clipPath key={i} id={`offer-mascot-clip-${i}`}>
              <ellipse cx={eye.cx} cy={eye.cy} rx={EYE_RX} ry={EYE_RY} />
            </clipPath>
          ))}
        </defs>
        {EYES.map((eye, i) => (
          <g key={i}>
            <ellipse
              cx={eye.cx}
              cy={eye.cy}
              rx={EYE_RX + 1.5}
              ry={EYE_RY + 1.5}
              fill="url(#offer-mascot-ball)"
            />
            <g clipPath={`url(#offer-mascot-clip-${i})`}>
              <g className="offer-mascot__pupil">
                <circle cx={eye.cx} cy={eye.cy} r={PUPIL_R} fill="url(#offer-mascot-pupil)" />
                <ellipse
                  cx={eye.cx - 30}
                  cy={eye.cy - 40}
                  rx="17"
                  ry="7"
                  fill="#fff"
                  opacity="0.92"
                  transform={`rotate(-34 ${eye.cx - 30} ${eye.cy - 40})`}
                />
                <ellipse
                  cx={eye.cx - 44}
                  cy={eye.cy - 14}
                  rx="6"
                  ry="12"
                  fill="#fff"
                  opacity="0.22"
                  transform={`rotate(18 ${eye.cx - 44} ${eye.cy - 14})`}
                />
              </g>
            </g>
            <ellipse
              className="offer-mascot__lid"
              cx={eye.cx}
              cy={eye.cy}
              rx={EYE_RX + 4}
              ry={EYE_RY + 4}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
