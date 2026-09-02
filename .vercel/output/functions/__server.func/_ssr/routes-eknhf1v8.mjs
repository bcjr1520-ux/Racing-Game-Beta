import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Settings2, c as Maximize2, l as Gift, n as Users, o as Plus, r as Undo2, s as Minimize2, t as X, u as Flag } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, c as Slot, i as DialogDescription$1, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as startOfWeek, n as startOfMonth, r as startOfDay, t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-eknhf1v8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function periodStart(period, now = /* @__PURE__ */ new Date()) {
	if (period === "all") return 0;
	if (period === "today") return startOfDay(now).getTime();
	if (period === "week") return startOfWeek(now, { weekStartsOn: 1 }).getTime();
	return startOfMonth(now).getTime();
}
function inPeriod(events, period, now = /* @__PURE__ */ new Date()) {
	const start = periodStart(period, now);
	return events.filter((e) => e.at >= start);
}
function forMode(events, mode) {
	return events.filter((e) => e.kind === mode);
}
function sumQty(events) {
	return events.reduce((n, e) => n + e.qty, 0);
}
function scoreFor(events, mode, period, pred) {
	return sumQty(forMode(inPeriod(events, period), mode).filter(pred));
}
var MODE_COPY = {
	sales: {
		label: "Sales",
		unit: "sale",
		verb: "Log sale",
		headline: "Most units sold"
	},
	saves: {
		label: "Saves",
		unit: "save",
		verb: "Log save",
		headline: "Most accounts saved"
	},
	cancels: {
		label: "Cancels",
		unit: "cancel",
		verb: "Log cancel",
		headline: "Cancel volume on track"
	}
};
var PERIOD_COPY = {
	today: "Today",
	week: "This week",
	month: "This month",
	all: "All time"
};
var ctx = null;
function ac() {
	if (typeof window === "undefined") return null;
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function unlockAudio() {
	ac();
}
function beep(freq, dur, type, gain = .05) {
	const c = ac();
	if (!c) return;
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = type;
	o.frequency.value = freq;
	g.gain.value = gain;
	g.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + dur);
	o.connect(g);
	g.connect(c.destination);
	o.start();
	o.stop(c.currentTime + dur);
}
function playLog(bundle) {
	beep(bundle ? 520 : 380, .12, "triangle", .06);
	if (bundle) setTimeout(() => beep(720, .16, "triangle", .05), 90);
}
function playSpinTick() {
	beep(240, .03, "square", .03);
}
function playWin() {
	beep(440, .12, "sine", .06);
	setTimeout(() => beep(660, .18, "sine", .06), 120);
}
var DEFAULT_TEAMS = [
	{
		id: "t1",
		name: "Renegades",
		swatch: "crimson"
	},
	{
		id: "t2",
		name: "Apex",
		swatch: "teal"
	},
	{
		id: "t3",
		name: "Titan",
		swatch: "steel"
	},
	{
		id: "t4",
		name: "Harbor",
		swatch: "sand"
	},
	{
		id: "t5",
		name: "North",
		swatch: "olive"
	}
];
var NAMES = {
	t1: [
		"Maya Ellis",
		"Jordan Hale",
		"Priya Shah",
		"Chris Dalton",
		"Elena Ruiz",
		"Marcus Quinn",
		"Nina Patel",
		"Owen Grant",
		"Sasha Kim",
		"Theo Brooks"
	],
	t2: [
		"Lila Chen",
		"Andre Cole",
		"Riley Fox",
		"Hannah Park",
		"Dev Patel",
		"Sofia Lane",
		"Jonah West",
		"Ava Monroe",
		"Kai Reynolds",
		"Nora Blake"
	],
	t3: [
		"Ivy Santos",
		"Ben Carter",
		"Mila Ortiz",
		"Sam Reed",
		"Zoe Hart",
		"Leo Navarro",
		"Claire Dunn",
		"Nate Young",
		"Ruby Singh",
		"Paul Kim"
	],
	t4: [
		"Ada Walsh",
		"Hugo Price",
		"Iris Cole",
		"Finn Doyle",
		"Lena Moss",
		"Omar Diaz",
		"Willa Grant",
		"Seth Nolan",
		"Jade Tran",
		"Cole Hayes"
	],
	t5: [
		"Quinn Avery",
		"Tara Singh",
		"Miles Boone",
		"Eva Shore",
		"Rex Palmer",
		"Nora Vale",
		"Gus Klein",
		"Pia Romero",
		"Hank Ortiz",
		"Cora Flynn"
	]
};
function seedAssociates() {
	return Object.entries(NAMES).flatMap(([teamId, names]) => names.map((name, i) => ({
		id: `${teamId}-a${i + 1}`,
		teamId,
		name,
		active: true
	})));
}
var DEFAULT_PRIZES = [
	{
		id: "p1",
		label: "Extra 15-min break",
		weight: 3
	},
	{
		id: "p2",
		label: "Floor shout-out",
		weight: 4
	},
	{
		id: "p3",
		label: "Pick the huddle playlist",
		weight: 3
	},
	{
		id: "p4",
		label: "Leave 10 minutes early",
		weight: 2
	},
	{
		id: "p5",
		label: "Mystery snack run",
		weight: 3
	},
	{
		id: "p6",
		label: "Skip next icebreaker",
		weight: 3
	},
	{
		id: "p7",
		label: "Double-count next unit",
		weight: 2
	},
	{
		id: "p8",
		label: "Team lunch vote",
		weight: 1
	}
];
function seedEvents(associates) {
	const now = Date.now();
	const picks = [
		[
			"t1-a1",
			"t1",
			3
		],
		[
			"t1-a4",
			"t1",
			1
		],
		[
			"t2-a2",
			"t2",
			2
		],
		[
			"t2-a7",
			"t2",
			1
		],
		[
			"t3-a3",
			"t3",
			4
		],
		[
			"t3-a1",
			"t3",
			1
		],
		[
			"t4-a5",
			"t4",
			2
		],
		[
			"t5-a2",
			"t5",
			3
		],
		[
			"t5-a8",
			"t5",
			1
		],
		[
			"t1-a8",
			"t1",
			2
		],
		[
			"t2-a4",
			"t2",
			1
		],
		[
			"t4-a1",
			"t4",
			1
		]
	];
	return picks.map(([associateId, teamId, qty], i) => ({
		id: `seed-${i}`,
		at: now - (picks.length - i) * 19 * 60 * 1e3,
		associateId,
		teamId,
		kind: "sales",
		qty,
		note: "",
		bundle: qty >= 2
	})).filter((e) => associates.some((a) => a.id === e.associateId));
}
var associates = seedAssociates();
function uid() {
	return crypto.randomUUID();
}
var useCircuit = create()(persist((set, get) => ({
	version: 1,
	hydrated: false,
	teams: DEFAULT_TEAMS,
	associates,
	events: seedEvents(associates),
	prizes: DEFAULT_PRIZES,
	spins: [],
	mode: "sales",
	period: "today",
	lapGoal: 25,
	bundleThreshold: 2,
	sound: false,
	theater: false,
	pendingBonusId: null,
	setHydrated: () => set({ hydrated: true }),
	setMode: (mode) => set({ mode }),
	setPeriod: (period) => set({ period }),
	setLapGoal: (n) => set({ lapGoal: Math.max(5, Math.min(200, Math.round(n) || 25)) }),
	setBundleThreshold: (n) => set({ bundleThreshold: Math.max(2, Math.min(10, Math.round(n) || 2)) }),
	setSound: (sound) => set({ sound }),
	setTheater: (theater) => set({ theater }),
	renameTeam: (id, name) => set({ teams: get().teams.map((t) => t.id === id ? {
		...t,
		name: name.trim() || t.name
	} : t) }),
	setTeamSwatch: (id, swatch) => set({ teams: get().teams.map((t) => t.id === id ? {
		...t,
		swatch
	} : t) }),
	addAssociate: (teamId, name) => {
		const trimmed = name.trim();
		if (!trimmed) return;
		const a = {
			id: uid(),
			teamId,
			name: trimmed,
			active: true
		};
		set({ associates: [...get().associates, a] });
	},
	renameAssociate: (id, name) => {
		const trimmed = name.trim();
		if (!trimmed) return;
		set({ associates: get().associates.map((a) => a.id === id ? {
			...a,
			name: trimmed
		} : a) });
	},
	removeAssociate: (id) => set({ associates: get().associates.filter((a) => a.id !== id) }),
	moveAssociate: (id, teamId) => set({ associates: get().associates.map((a) => a.id === id ? {
		...a,
		teamId
	} : a) }),
	logUnit: ({ associateId, qty, note }) => {
		const state = get();
		const assoc = state.associates.find((a) => a.id === associateId);
		if (!assoc) throw new Error("Associate not found");
		let amount = Math.max(1, Math.round(qty));
		let bonusApplied = false;
		if (state.pendingBonusId === associateId) {
			amount += 1;
			bonusApplied = true;
		}
		const bundle = amount >= state.bundleThreshold;
		const event = {
			id: uid(),
			at: Date.now(),
			associateId,
			teamId: assoc.teamId,
			kind: state.mode,
			qty: amount,
			note: note?.trim() ?? "",
			bundle
		};
		set({
			events: [...state.events, event],
			pendingBonusId: bonusApplied ? null : state.pendingBonusId
		});
		if (state.sound) playLog(bundle);
		return {
			event,
			bundle,
			bonusApplied
		};
	},
	undoLast: () => {
		const events = get().events;
		if (!events.length) return;
		set({ events: events.slice(0, -1) });
	},
	setPrizes: (prizes) => set({ prizes }),
	recordSpin: (associateId, prize) => {
		const rec = {
			id: uid(),
			at: Date.now(),
			associateId,
			prize
		};
		const pendingBonusId = prize.toLowerCase().includes("double-count") ? associateId : get().pendingBonusId;
		set({
			spins: [...get().spins, rec],
			pendingBonusId
		});
	},
	clearPeriodEvents: () => {
		const { period, events } = get();
		const now = /* @__PURE__ */ new Date();
		const start = period === "all" ? Number.POSITIVE_INFINITY : period === "today" ? new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() : period === "week" ? now.getTime() - (now.getDay() + 6) % 7 * 864e5 : new Date(now.getFullYear(), now.getMonth(), 1).getTime();
		if (period === "all") {
			set({ events: [] });
			return;
		}
		set({ events: events.filter((e) => e.at < start) });
	},
	resetBoard: () => {
		set({
			teams: DEFAULT_TEAMS,
			associates: seedAssociates(),
			events: [],
			spins: [],
			prizes: DEFAULT_PRIZES,
			pendingBonusId: null,
			mode: "sales",
			period: "today",
			lapGoal: 25,
			bundleThreshold: 2
		});
	},
	importState: (raw) => {
		try {
			const data = raw;
			if (!data || !Array.isArray(data.teams) || !Array.isArray(data.associates)) return false;
			set({
				teams: data.teams,
				associates: data.associates,
				events: data.events ?? [],
				prizes: data.prizes ?? DEFAULT_PRIZES,
				spins: data.spins ?? [],
				mode: data.mode ?? "sales",
				period: data.period ?? "today",
				lapGoal: data.lapGoal ?? 25,
				bundleThreshold: data.bundleThreshold ?? 2,
				pendingBonusId: data.pendingBonusId ?? null
			});
			return true;
		} catch {
			return false;
		}
	}
}), {
	name: "circuit-board-v1",
	version: 1,
	skipHydration: true,
	partialize: (s) => ({
		version: s.version,
		teams: s.teams,
		associates: s.associates,
		events: s.events,
		prizes: s.prizes,
		spins: s.spins,
		mode: s.mode,
		period: s.period,
		lapGoal: s.lapGoal,
		bundleThreshold: s.bundleThreshold,
		sound: s.sound,
		pendingBonusId: s.pendingBonusId
	})
}));
function ActivityFeed() {
	const events = useCircuit((s) => s.events);
	const associates = useCircuit((s) => s.associates);
	const teams = useCircuit((s) => s.teams);
	const period = useCircuit((s) => s.period);
	const mode = useCircuit((s) => s.mode);
	const recent = [...inPeriod(events, period)].filter((e) => e.kind === mode).sort((a, b) => b.at - a.at).slice(0, 12);
	if (!recent.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "No units logged in this window."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: recent.map((e) => {
			const a = associates.find((x) => x.id === e.associateId);
			const t = teams.find((x) => x.id === e.teamId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-baseline justify-between gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: a?.name ?? "Removed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					children: [
						" ",
						MODE_COPY[e.kind].unit,
						e.qty > 1 ? ` x${e.qty}` : "",
						" · ",
						t?.name,
						e.bundle ? " · bundle" : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-xs text-muted-foreground tabular-nums",
					children: formatDistanceToNow(e.at, { addSuffix: true })
				})]
			}, e.id);
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-[opacity,transform,background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			outline: "border border-border bg-transparent text-foreground hover:bg-muted",
			ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
			destructive: "bg-danger text-primary-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var TEAM_SWATCHES = {
	crimson: "#c45c54",
	teal: "#2f9a8c",
	steel: "#4d7aa8",
	sand: "#8a7d6b",
	olive: "#6b8f71"
};
var SWATCH_ORDER = [
	"crimson",
	"teal",
	"steel",
	"sand",
	"olive"
];
var SEG_COLORS = [
	"#1c1c22",
	"#26262c",
	"#1c1c22",
	"#2a2a32"
];
function PrizeWheel({ associateId, onDone }) {
	const canvasRef = (0, import_react.useRef)(null);
	const prizes = useCircuit((s) => s.prizes);
	const associates = useCircuit((s) => s.associates);
	const recordSpin = useCircuit((s) => s.recordSpin);
	const sound = useCircuit((s) => s.sound);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const spinningRef = (0, import_react.useRef)(false);
	const vel = (0, import_react.useRef)(0);
	const ang = (0, import_react.useRef)(0);
	const lastTick = (0, import_react.useRef)(0);
	const assoc = associates.find((a) => a.id === associateId);
	const segments = (0, import_react.useMemo)(() => prizes.filter((p) => p.weight > 0).flatMap((p) => Array.from({ length: p.weight }, () => p)), [prizes]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		const loop = () => {
			if (spinningRef.current) {
				vel.current *= .985;
				ang.current += vel.current;
				const n = Math.max(1, segments.length);
				const seg = 2 * Math.PI / n;
				const idx = Math.floor(((-ang.current + Math.PI / 2) % (Math.PI * 2) + Math.PI * 2) / seg) % n;
				if (idx !== lastTick.current) {
					lastTick.current = idx;
					if (sound) playSpinTick();
				}
				if (vel.current < .004) {
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
			const r = size * .42;
			ctx.clearRect(0, 0, size, size);
			const n = Math.max(1, segments.length);
			const slice = Math.PI * 2 / n;
			segments.forEach((p, i) => {
				ctx.beginPath();
				ctx.moveTo(cx, cy);
				ctx.arc(cx, cy, r, ang.current + i * slice - Math.PI / 2, ang.current + (i + 1) * slice - Math.PI / 2);
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
			ctx.fillStyle = TEAM_SWATCHES.crimson;
			ctx.beginPath();
			ctx.moveTo(cx, 18);
			ctx.lineTo(cx - 10, 36);
			ctx.lineTo(cx + 10, 36);
			ctx.closePath();
			ctx.fill();
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [
		associateId,
		recordSpin,
		segments,
		sound
	]);
	function spin() {
		if (spinningRef.current || !segments.length) return;
		setResult(null);
		vel.current = .35 + Math.random() * .25;
		spinningRef.current = true;
		setSpinning(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "Prize wheel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: assoc ? `Spinning for ${assoc.name}` : "Use after a bundle, or spin for the floor."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "aspect-square w-full max-w-[360px]"
			}),
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg text-foreground",
				children: result
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: spin,
					disabled: spinning || !segments.length,
					children: spinning ? "Spinning" : "Spin"
				}), onDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: onDone,
					children: "Close"
				}) : null]
			})
		]
	});
}
var Dialog = Dialog$1;
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(100%-1.5rem,440px)] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-xl outline-none", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground hover:bg-muted hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-semibold tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-1 text-sm text-muted-foreground", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
		...props
	});
}
function QuickLog({ open, onOpenChange, onBundle }) {
	const teams = useCircuit((s) => s.teams);
	const associates = useCircuit((s) => s.associates);
	const mode = useCircuit((s) => s.mode);
	const logUnit = useCircuit((s) => s.logUnit);
	const [q, setQ] = (0, import_react.useState)("");
	const [teamId, setTeamId] = (0, import_react.useState)(null);
	const [associateId, setAssociateId] = (0, import_react.useState)(null);
	const [qty, setQty] = (0, import_react.useState)(1);
	const copy = MODE_COPY[mode];
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return associates.filter((a) => a.active).filter((a) => !teamId || a.teamId === teamId).filter((a) => !query || a.name.toLowerCase().includes(query)).sort((a, b) => a.name.localeCompare(b.name));
	}, [
		associates,
		q,
		teamId
	]);
	function reset() {
		setQ("");
		setTeamId(null);
		setAssociateId(null);
		setQty(1);
	}
	function submit() {
		if (!associateId) return;
		unlockAudio();
		const { bundle, bonusApplied } = logUnit({
			associateId,
			qty
		});
		const name = associates.find((a) => a.id === associateId)?.name ?? "Driver";
		toast.success(`${copy.verb.replace("Log ", "")} logged for ${name}`, { description: bonusApplied ? `Count ${qty}+1 with double-count bonus` : `${qty} ${copy.unit}${qty > 1 ? "s" : ""}` });
		onOpenChange(false);
		if (bundle) onBundle(associateId);
		reset();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			onOpenChange(v);
			if (!v) reset();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: copy.verb }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Pick a driver, set the count, and the car moves on the next frame." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-5 gap-1.5",
				children: teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setTeamId(teamId === t.id ? null : t.id);
						setAssociateId(null);
					},
					className: "flex h-11 flex-col items-center justify-center rounded-[var(--radius-sm)] border border-border text-[10px] font-medium uppercase tracking-wide",
					style: {
						background: teamId === t.id ? TEAM_SWATCHES[t.swatch] : "transparent",
						color: teamId === t.id ? "#0b0c0e" : void 0
					},
					children: t.name
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "driver",
					children: "Driver"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "driver",
					className: "mt-1",
					placeholder: "Search roster",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 max-h-40 overflow-y-auto rounded-[var(--radius-md)] border border-border",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 py-4 text-sm text-muted-foreground",
					children: "No matches."
				}) : filtered.slice(0, 40).map((a) => {
					const team = teams.find((t) => t.id === a.teamId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAssociateId(a.id),
						className: "flex w-full items-center justify-between gap-2 border-b border-border px-3 py-2.5 text-left text-sm last:border-0 hover:bg-muted",
						style: { background: associateId === a.id ? "var(--color-muted)" : void 0 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: team?.name
						})]
					}, a.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Count" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setQty(n),
						className: "size-11 rounded-[var(--radius-sm)] border border-border text-sm font-medium tabular-nums hover:bg-muted",
						style: {
							background: qty === n ? "var(--color-primary)" : void 0,
							color: qty === n ? "var(--color-primary-foreground)" : void 0
						},
						children: n
					}, n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				disabled: !associateId,
				onClick: submit,
				children: copy.verb
			})
		] })
	});
}
function RosterPanel() {
	const teams = useCircuit((s) => s.teams);
	const associates = useCircuit((s) => s.associates);
	const addAssociate = useCircuit((s) => s.addAssociate);
	const removeAssociate = useCircuit((s) => s.removeAssociate);
	const renameAssociate = useCircuit((s) => s.renameAssociate);
	const renameTeam = useCircuit((s) => s.renameTeam);
	const setTeamSwatch = useCircuit((s) => s.setTeamSwatch);
	const moveAssociate = useCircuit((s) => s.moveAssociate);
	const [draft, setDraft] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 lg:grid-cols-2 xl:grid-cols-3",
		children: teams.map((team) => {
			const roster = associates.filter((a) => a.teamId === team.id).sort((a, b) => a.name.localeCompare(b.name));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-3 rounded-full",
							style: { background: TEAM_SWATCHES[team.swatch] }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"aria-label": `${team.name} team name`,
							value: team.name,
							onChange: (e) => renameTeam(team.id, e.target.value),
							className: "h-11 font-display text-lg font-semibold"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex gap-1",
						children: SWATCH_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Set ${team.name} color ${id}`,
							onClick: () => setTeamSwatch(team.id, id),
							className: "size-7 rounded-full border border-border",
							style: {
								background: TEAM_SWATCHES[id],
								outline: team.swatch === id ? "2px solid var(--color-primary)" : void 0,
								outlineOffset: 2
							}
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: [roster.length, " drivers"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 max-h-64 space-y-1 overflow-y-auto",
						children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: a.name,
									onChange: (e) => renameAssociate(a.id, e.target.value),
									className: "h-10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									"aria-label": `Move ${a.name}`,
									className: "h-10 rounded-[var(--radius-sm)] border border-border bg-muted px-2 text-xs",
									value: a.teamId,
									onChange: (e) => moveAssociate(a.id, e.target.value),
									children: teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t.id,
										children: t.name
									}, t.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => removeAssociate(a.id),
									children: "Remove"
								})
							]
						}, a.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-3 flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							addAssociate(team.id, draft[team.id] ?? "");
							setDraft((d) => ({
								...d,
								[team.id]: ""
							}));
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Add driver",
							value: draft[team.id] ?? "",
							onChange: (e) => setDraft((d) => ({
								...d,
								[team.id]: e.target.value
							}))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							children: "Add"
						})]
					})
				]
			}, team.id);
		})
	});
}
function SetupPanel() {
	const fileRef = (0, import_react.useRef)(null);
	const lapGoal = useCircuit((s) => s.lapGoal);
	const bundleThreshold = useCircuit((s) => s.bundleThreshold);
	const sound = useCircuit((s) => s.sound);
	const prizes = useCircuit((s) => s.prizes);
	const setLapGoal = useCircuit((s) => s.setLapGoal);
	const setBundleThreshold = useCircuit((s) => s.setBundleThreshold);
	const setSound = useCircuit((s) => s.setSound);
	const setPrizes = useCircuit((s) => s.setPrizes);
	const clearPeriodEvents = useCircuit((s) => s.clearPeriodEvents);
	const resetBoard = useCircuit((s) => s.resetBoard);
	const importState = useCircuit((s) => s.importState);
	const snapshot = useCircuit((s) => ({
		version: s.version,
		teams: s.teams,
		associates: s.associates,
		events: s.events,
		prizes: s.prizes,
		spins: s.spins,
		mode: s.mode,
		period: s.period,
		lapGoal: s.lapGoal,
		bundleThreshold: s.bundleThreshold,
		pendingBonusId: s.pendingBonusId
	}));
	function exportJson() {
		const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "circuit-board.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-xl flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Race rules"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "lap",
							children: "Units per lap"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lap",
							type: "number",
							min: 5,
							max: 200,
							className: "mt-1",
							value: lapGoal,
							onChange: (e) => setLapGoal(Number(e.target.value))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bundle",
							children: "Bundle spin at"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "bundle",
							type: "number",
							min: 2,
							max: 10,
							className: "mt-1",
							value: bundleThreshold,
							onChange: (e) => setBundleThreshold(Number(e.target.value))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex h-11 items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: sound,
							onChange: (e) => setSound(e.target.checked)
						}), "Sound on log and spin"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Wheel prizes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Weight controls how often a slice appears."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: prizes.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: p.label,
								onChange: (e) => setPrizes(prizes.map((x, j) => j === i ? {
									...x,
									label: e.target.value
								} : x))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								max: 10,
								className: "w-20",
								value: p.weight,
								onChange: (e) => setPrizes(prizes.map((x, j) => j === i ? {
									...x,
									weight: Number(e.target.value)
								} : x))
							})]
						}, p.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Board lives in this browser. Export a backup before a floor PC swap."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: exportJson,
								children: "Export"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => fileRef.current?.click(),
								children: "Import"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => {
									clearPeriodEvents();
									toast("Cleared events in the current window");
								},
								children: "Clear this window"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								onClick: () => {
									if (confirm("Reset teams, roster, and all logs?")) {
										resetBoard();
										toast("Board reset");
									}
								},
								children: "Reset board"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json",
						className: "hidden",
						onChange: async (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							try {
								const raw = JSON.parse(await file.text());
								if (importState(raw)) toast.success("Imported board");
								else toast.error("That file is not a Circuit backup");
							} catch {
								toast.error("Could not read that file");
							}
							e.target.value = "";
						}
					})
				]
			})
		]
	});
}
function Standings() {
	const teams = useCircuit((s) => s.teams);
	const associates = useCircuit((s) => s.associates);
	const events = useCircuit((s) => s.events);
	const mode = useCircuit((s) => s.mode);
	const period = useCircuit((s) => s.period);
	const copy = MODE_COPY[mode];
	const teamRows = [...teams].map((t) => ({
		...t,
		score: scoreFor(events, mode, period, (e) => e.teamId === t.id)
	})).sort((a, b) => b.score - a.score);
	const driverRows = associates.filter((a) => a.active).map((a) => ({
		...a,
		score: scoreFor(events, mode, period, (e) => e.associateId === a.id)
	})).sort((a, b) => b.score - a.score).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: "Constructor standings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: copy.headline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-1.5",
				children: teamRows.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 rounded-[var(--radius-md)] bg-muted/60 px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 font-display text-lg tabular-nums text-muted-foreground",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2.5 rounded-full",
							style: { background: TEAM_SWATCHES[t.swatch] }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 text-sm font-medium",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg tabular-nums",
							children: t.score
						})
					]
				}, t.id))
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-h-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: "Drivers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-1",
				children: driverRows.map((d, i) => {
					const team = teams.find((t) => t.id === d.teamId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-1 py-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-5 tabular-nums text-muted-foreground",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate",
								children: d.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: team?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-right tabular-nums",
								children: d.score
							})
						]
					}, d.id);
				})
			})]
		})]
	});
}
function oval(t, cx, cy, rx, ry) {
	const a = t * Math.PI * 2 - Math.PI / 2;
	return {
		x: cx + Math.cos(a) * rx,
		y: cy + Math.sin(a) * ry,
		a
	};
}
function TrackCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const vis = (0, import_react.useRef)([]);
	const particles = (0, import_react.useRef)([]);
	const lastScores = (0, import_react.useRef)({});
	const teams = useCircuit((s) => s.teams);
	const events = useCircuit((s) => s.events);
	const mode = useCircuit((s) => s.mode);
	const period = useCircuit((s) => s.period);
	const lapGoal = useCircuit((s) => s.lapGoal);
	const theater = useCircuit((s) => s.theater);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		let last = performance.now();
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const draw = (now) => {
			const dt = Math.min((now - last) / 1e3, .1);
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
			const rx = Math.min(w * .42, h * .62);
			const ry = Math.min(h * .36, w * .28);
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
				score: scoreFor(events, mode, period, (e) => e.teamId === team.id)
			}));
			const ranked = [...scores].sort((a, b) => b.score - a.score);
			ctx.fillStyle = "#eceef2";
			ctx.font = "600 42px 'Barlow Condensed', sans-serif";
			ctx.textAlign = "center";
			ctx.fillText("CIRCUIT", cx, cy - 8);
			ctx.fillStyle = "rgba(232,234,238,0.45)";
			ctx.font = "500 13px 'IBM Plex Sans', sans-serif";
			const lead = ranked[0];
			ctx.fillText(lead && lead.score > 0 ? `P1  ${lead.team.name.toUpperCase()}` : "WAITING FOR THE GREEN", cx, cy + 16);
			if (!vis.current.length) vis.current = teams.map((t) => ({
				id: t.id,
				t: 0
			}));
			scores.forEach((row, lane) => {
				const target = row.score / Math.max(1, lapGoal);
				let v = vis.current.find((c) => c.id === row.team.id);
				if (!v) {
					v = {
						id: row.team.id,
						t: target
					};
					vis.current.push(v);
				}
				if (reduce) v.t = target;
				else v.t += (target - v.t) * Math.min(1, dt * 2.4);
				const prev = lastScores.current[row.team.id] ?? row.score;
				if (row.score > prev) {
					const p = oval(v.t % 1, cx, cy, rx, ry);
					const color = TEAM_SWATCHES[row.team.swatch];
					for (let i = 0; i < 14; i++) particles.current.push({
						x: p.x,
						y: p.y,
						vx: (Math.random() - .5) * 80,
						vy: (Math.random() - .5) * 80,
						life: 1,
						color
					});
				}
				lastScores.current[row.team.id] = row.score;
				const offset = (lane - 2) * 7;
				const pos = oval(v.t % 1, cx, cy, rx + offset, ry + offset * .55);
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
				ctx.fillText(`${row.team.name}  ${row.score}${laps ? `  L${laps}` : ""}`, pos.x, pos.y - 18);
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
	}, [
		teams,
		events,
		mode,
		period,
		lapGoal,
		theater
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "h-full w-full",
		"aria-label": "Team race track"
	});
}
function roundRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
var Sheet = Dialog$1;
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-black/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed z-50 flex flex-col border-border bg-card shadow-xl outline-none", side === "right" && "inset-y-0 right-0 h-full w-[min(100%,420px)] border-l", side === "left" && "inset-y-0 left-0 h-full w-[min(100%,420px)] border-r", side === "bottom" && "inset-x-0 bottom-0 max-h-[85vh] rounded-t-[var(--radius-xl)] border-t", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground hover:bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-semibold tracking-tight", className),
		...props
	});
}
var MODES = [
	"sales",
	"saves",
	"cancels"
];
var PERIODS = [
	"today",
	"week",
	"month",
	"all"
];
function CircuitApp() {
	const hydrated = useCircuit((s) => s.hydrated);
	const setHydrated = useCircuit((s) => s.setHydrated);
	const mode = useCircuit((s) => s.mode);
	const period = useCircuit((s) => s.period);
	const theater = useCircuit((s) => s.theater);
	const setMode = useCircuit((s) => s.setMode);
	const setPeriod = useCircuit((s) => s.setPeriod);
	const setTheater = useCircuit((s) => s.setTheater);
	const undoLast = useCircuit((s) => s.undoLast);
	const [view, setView] = (0, import_react.useState)("race");
	const [logOpen, setLogOpen] = (0, import_react.useState)(false);
	const [spinFor, setSpinFor] = (0, import_react.useState)(null);
	const [wheelOpen, setWheelOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useCircuit.persist.rehydrate().then(() => setHydrated());
	}, [setHydrated]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
			if (e.key === "l" || e.key === "L") setLogOpen(true);
			if (e.key === "w" || e.key === "W") {
				setView("wheel");
				setWheelOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background text-muted-foreground",
		children: "Loading board"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mr-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-semibold tracking-tight leading-none",
							children: "Circuit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								MODE_COPY[mode].headline,
								" · ",
								PERIOD_COPY[period]
							]
						})]
					}),
					!theater ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-[var(--radius-md)] bg-muted p-1",
						children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode(m),
							className: "h-9 rounded-[var(--radius-sm)] px-3 text-xs font-medium uppercase tracking-wide",
							style: {
								background: mode === m ? "var(--color-primary)" : "transparent",
								color: mode === m ? "var(--color-primary-foreground)" : void 0
							},
							children: MODE_COPY[m].label
						}, m))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-[var(--radius-md)] bg-muted p-1",
						children: PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPeriod(p),
							className: "h-9 rounded-[var(--radius-sm)] px-2.5 text-xs font-medium",
							style: { background: period === p ? "var(--color-card)" : "transparent" },
							children: PERIOD_COPY[p]
						}, p))
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": theater ? "Exit theater" : "Theater",
						onClick: () => setTheater(!theater),
						children: theater ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, {})
					}),
					!theater ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Pit roster",
							onClick: () => setView("pit"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Prize wheel",
							onClick: () => setView("wheel"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Setup",
							onClick: () => setView("setup"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Undo last log",
							onClick: undoLast,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								unlockAudio();
								setLogOpen(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), MODE_COPY[mode].verb]
						})
					] }) : null
				]
			}),
			view !== "race" && !theater ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border px-4 py-2 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setView("race"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-3.5" }), "Back to the grid"]
				})
			}) : null,
			theater || view === "race" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: theater ? "grid h-[calc(100dvh-64px)]" : "grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-[280px] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card lg:min-h-[540px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackCanvas, {})
				}), !theater ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "flex flex-col gap-5 rounded-[var(--radius-xl)] border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Standings, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold tracking-tight",
						children: "Live tape"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 max-h-48 overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, {})
					})] })]
				}) : null]
			}) : null,
			view === "pit" && !theater ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold tracking-tight",
						children: "Pit roster"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-sm text-muted-foreground",
						children: "Add, rename, move, or remove drivers. Five cars stay on the grid."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterPanel, {})
				]
			}) : null,
			view === "wheel" && !theater ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrizeWheel, { associateId: spinFor })
			}) : null,
			view === "setup" && !theater ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-4 font-display text-3xl font-semibold tracking-tight",
					children: "Setup"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupPanel, {})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLog, {
				open: logOpen,
				onOpenChange: setLogOpen,
				onBundle: (id) => {
					setSpinFor(id);
					setWheelOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: wheelOpen,
				onOpenChange: setWheelOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "bottom",
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: "Prize wheel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrizeWheel, {
						associateId: spinFor,
						onDone: () => {
							setWheelOpen(false);
							setSpinFor(null);
						}
					})]
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircuitApp, {});
}
//#endregion
export { Home as component };
