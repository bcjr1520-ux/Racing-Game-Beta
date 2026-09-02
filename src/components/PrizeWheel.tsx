import { useEffect, useMemo, useRef, useState } from "react";
import { playSpinTick, playWin } from "@/lib/audio";
import { useCircuit } from "@/lib/circuit-store";
import { Button } from "@/components/ui/button";
import { TEAM_SWATCHES } from "@/lib/palette";

const SEG_COLORS = ["#1c1c22", "#26262c", "#1c1c22", "#2a2a32"];

export function PrizeWheel({
  associateId,
  onDone,
}: {
  associateId: string | null;
  onDone?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prizes = useCircuit((s) => s.prizes);
  const associates = useCircuit((s) => s.associates);
  const recordSpin = useCircuit((s) => s.recordSpin);
  const sound = useCircuit((s) => s.sound);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const spinningRef = useRef(false);
  const vel = useRef(0);
  const ang = useRef(0);
  const lastTick = useRef(0);
  const assoc = associates.find((a) => a.id === associateId);

  const segments = useMemo(
    () => prizes.filter((p) => p.weight > 0).flatMap((p) => Array.from({ length: p.weight }, () => p)),
    [prizes],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const loop = () => {
      if (spinningRef.current) {
        vel.current *= 0.985;
        ang.current += vel.current;
        const n = Math.max(1, segments.length);
        const seg = (2 * Math.PI) / n;
        const twoPi = Math.PI * 2;
        const normalized = (((-ang.current) % twoPi) + twoPi) % twoPi;
        const idx = Math.floor(normalized / seg) % n;
        if (idx !== lastTick.current) {
          lastTick.current = idx;
          if (sound) playSpinTick();
        }
        if (vel.current < 0.004) {
          vel.current = 0;
          spinningRef.current = false;
          const landed = segments[idx]?.label ?? "No prize";
          setResult(landed);
          setSpinning(false);
          if (associateId) recordSpin(associateId, landed);
          if (sound) playWin();
        }
      }
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const size = canvas.clientWidth || 320;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.42;
      ctx.clearRect(0, 0, size, size);
      const n = Math.max(1, segments.length);
      const slice = (Math.PI * 2) / n;
      segments.forEach((p, i) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(
          cx,
          cy,
          r,
          ang.current + i * slice - Math.PI / 2,
          ang.current + (i + 1) * slice - Math.PI / 2,
        );
        ctx.closePath();
        ctx.fillStyle = SEG_COLORS[i % SEG_COLORS.length];
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.stroke();
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang.current + i * slice + slice / 2 - Math.PI / 2);
        ctx.fillStyle = "#e8eaee";
        ctx.font = "600 11px 'IBM Plex Sans', sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(p.label, r - 12, 4);
        ctx.restore();
      });
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = "#eceef2";
      ctx.fill();
      ctx.fillStyle = "#0b0c0e";
      ctx.font = "700 11px 'Barlow Condensed', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SPIN", cx, cy + 4);

      // Pointer at top — tip points DOWN at the wheel
      ctx.fillStyle = TEAM_SWATCHES.crimson;
      ctx.beginPath();
      ctx.moveTo(cx, 42); // tip (bottom)
      ctx.lineTo(cx - 11, 22); // top-left
      ctx.lineTo(cx + 11, 22); // top-right
      ctx.closePath();
      ctx.fill();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [associateId, recordSpin, segments, sound]);

  function spin() {
    if (spinningRef.current || !segments.length) return;
    setResult(null);
    vel.current = 0.35 + Math.random() * 0.25;
    spinningRef.current = true;
    setSpinning(true);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="font-display text-2xl font-semibold tracking-tight">Prize wheel</p>
        <p className="text-sm text-muted-foreground">
          {assoc
            ? `Spinning for ${assoc.name}`
            : "Use after a bundle, or spin for the floor."}
        </p>
      </div>
      <canvas ref={canvasRef} className="aspect-square w-full max-w-[360px]" />
      {result ? <p className="font-display text-lg text-foreground">{result}</p> : null}
      <div className="flex gap-2">
        <Button onClick={spin} disabled={spinning || !segments.length}>
          {spinning ? "Spinning" : "Spin"}
        </Button>
        {onDone ? (
          <Button variant="ghost" onClick={onDone}>
            Close
          </Button>
        ) : null}
      </div>
    </div>
  );
}
