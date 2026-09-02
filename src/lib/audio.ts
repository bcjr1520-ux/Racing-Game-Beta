let ctx: AudioContext | null = null;

function ac() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  ac();
}

function beep(freq: number, dur: number, type: OscillatorType, gain = 0.05) {
  const c = ac();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start();
  o.stop(c.currentTime + dur);
}

export function playLog(bundle: boolean) {
  beep(bundle ? 520 : 380, 0.12, "triangle", 0.06);
  if (bundle) setTimeout(() => beep(720, 0.16, "triangle", 0.05), 90);
}

export function playSpinTick() {
  beep(240, 0.03, "square", 0.03);
}

export function playWin() {
  beep(440, 0.12, "sine", 0.06);
  setTimeout(() => beep(660, 0.18, "sine", 0.06), 120);
}
