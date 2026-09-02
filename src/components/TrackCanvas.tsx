import { useEffect, useRef } from "react";
import { TEAM_SWATCHES } from "@/lib/palette";
import { scoreFor } from "@/lib/scoring";
import { useCircuit } from "@/lib/circuit-store";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

type CarVis = { id: string; t: number };

function oval(t: number, cx: number, cy: number, rx: number, ry: number) {
  const a = t * Math.PI * 2 - Math.PI / 2;
  return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, a };
}

export function TrackCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vis = useRef<CarVis[]>([]);
  const particles = useRef<Particle[]>([]);
  const lastScores = useRef<Record<string, number>>({});
  const teams = useCircuit((s) => s.teams);
  const events = useCircuit((s) => s.events);
  const mode = useCircuit((s) => s.mode);
  const period = useCircuit((s) => s.period);
  const lapGoal = useCircuit((s) => s.lapGoal);
  const theater = useCircuit((s) => s.theater);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let last = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 + 6;
      const rx = Math.min(w * 0.42, h * 0.62);
      const ry = Math.min(h * 0.36, w * 0.28);

      ctx.fillStyle = "#141416";
      roundRect(ctx, 8, 8, w - 16, h - 16, 20);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx + 46, ry + 36, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#2a2a30";
      ctx.lineWidth = 52;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#1a1a1e";
      ctx.lineWidth = 44;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.save();
      ctx.strokeStyle = "rgba(232,234,238,0.28)";
      ctx.setLineDash([10, 14]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const sf = oval(0, cx, cy, rx, ry);
      ctx.save();
      ctx.translate(sf.x, sf.y);
      ctx.rotate(sf.a + Math.PI / 2);
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#eceef2" : "#1a1a1e";
        ctx.fillRect(-10, -22 + i * 7, 20, 7);
      }
      ctx.restore();

      ctx.fillStyle = "rgba(232,234,238,0.08)";
      ctx.font = "600 11px 'Barlow Condensed', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("START / FINISH", sf.x, sf.y - 36);

      const scores = teams.map((team) => ({
        team,
        score: scoreFor(events, mode, period, (e) => e.teamId === team.id),
      }));
      const ranked = [...scores].sort((a, b) => b.score - a.score);

      ctx.fillStyle = "#eceef2";
      ctx.font = "600 42px 'Barlow Condensed', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CIRCUIT", cx, cy - 8);
      ctx.fillStyle = "rgba(232,234,238,0.45)";
      ctx.font = "500 13px 'IBM Plex Sans', sans-serif";
      const lead = ranked[0];
      ctx.fillText(
        lead && lead.score > 0 ? `P1  ${lead.team.name.toUpperCase()}` : "WAITING FOR THE GREEN",
        cx,
        cy + 16,
      );

      if (!vis.current.length) {
        vis.current = teams.map((t) => ({ id: t.id, t: 0 }));
      }

      scores.forEach((row, lane) => {
        const target = row.score / Math.max(1, lapGoal);
        let v = vis.current.find((c) => c.id === row.team.id);
        if (!v) {
          v = { id: row.team.id, t: target };
          vis.current.push(v);
        }
        if (reduce) v.t = target;
        else v.t += (target - v.t) * Math.min(1, dt * 2.4);

        const prev = lastScores.current[row.team.id] ?? row.score;
        if (row.score > prev) {
          const p = oval(v.t % 1, cx, cy, rx, ry);
          const color = TEAM_SWATCHES[row.team.swatch];
          for (let i = 0; i < 14; i++) {
            particles.current.push({
              x: p.x,
              y: p.y,
              vx: (Math.random() - 0.5) * 80,
              vy: (Math.random() - 0.5) * 80,
              life: 1,
              color,
            });
          }
        }
        lastScores.current[row.team.id] = row.score;

        const offset = (lane - 2) * 7;
        const pos = oval(v.t % 1, cx, cy, rx + offset, ry + offset * 0.55);
        const color = TEAM_SWATCHES[row.team.swatch];
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(pos.a + Math.PI / 2);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        roundRect(ctx, -16, -9, 32, 18, 5);
        ctx.fill();
        ctx.fillStyle = color;
        roundRect(ctx, -15, -8, 30, 16, 5);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.28)";
        roundRect(ctx, 2, -6, 10, 12, 3);
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = "#eceef2";
        ctx.font = "600 12px 'IBM Plex Sans', sans-serif";
        ctx.textAlign = "center";
        const laps = Math.floor(v.t);
        ctx.fillText(
          `${row.team.name}  ${row.score}${laps ? `  L${laps}` : ""}`,
          pos.x,
          pos.y - 18,
        );
      });

      particles.current = particles.current.filter((p) => p.life > 0);
      for (const p of particles.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 1.6;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [teams, events, mode, period, lapGoal, theater]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-label="Team race track"
    />
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
