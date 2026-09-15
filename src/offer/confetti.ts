/**
 * Конфетти без зависимостей: частицы вылетают из точки клика и падают под
 * гравитацией внутри канваса, который лежит поверх баннера. Цвета — четыре
 * брендовых токена Universal/Brand: lime, orange, purple, blue-light.
 */

const BRAND_TOKENS = ["--ui-universal-brand-lime", "--ui-universal-brand-orange", "--ui-universal-brand-purple", "--ui-universal-brand-blue-light"];
const FALLBACK = ["#bdf70d", "#ff7f32", "#8a5cf6", "#c6dcff"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  color: string;
  angle: number;
  spin: number;
  wobble: number;
  wobbleSpeed: number;
  life: number;
};

export function brandColors(el: Element): string[] {
  const style = getComputedStyle(el);
  return BRAND_TOKENS.map((token, i) => style.getPropertyValue(token).trim() || FALLBACK[i]);
}

/** Запускает залп из точки (x, y) в координатах канваса. Возвращает функцию остановки. */
export function burst(canvas: HTMLCanvasElement, x: number, y: number, colors: string[], count = 140): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const particles: Particle[] = Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9; // веером вверх
    const speed = 7 + Math.random() * 9;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.1 + Math.random() * 0.15,
      life: 1,
    };
  });

  let raf = 0;
  let last = performance.now();
  const gravity = 0.35;
  const drag = 0.985;

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 16.67, 2);
    last = now;
    ctx.clearRect(0, 0, rect.width, rect.height);
    let alive = 0;
    for (const p of particles) {
      if (p.life <= 0) continue;
      p.vy += gravity * dt;
      p.vx *= drag;
      p.vy *= drag;
      p.wobble += p.wobbleSpeed * dt;
      p.x += (p.vx + Math.sin(p.wobble) * 0.8) * dt;
      p.y += p.vy * dt;
      p.angle += p.spin * dt;
      if (p.y > rect.height + 20) p.life = 0;
      else if (p.y > rect.height * 0.75) p.life -= 0.02 * dt;
      if (p.life <= 0) continue;
      alive++;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(Math.cos(p.wobble * 1.5), 1); // «переворот» листочка
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2);
      ctx.fill();
      ctx.restore();
    }
    if (alive > 0) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, rect.width, rect.height);
  };
  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, rect.width, rect.height);
  };
}
