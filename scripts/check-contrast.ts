// Build-time WCAG 2.1 AA contrast gate (Story 1.5).
// Run via `npm run check:contrast`. Exits non-zero if any documented
// foreground/background pair falls below 4.5:1 (text) or 3:1 (UI).

interface Pair {
  fg: string;
  bg: string;
  label: string;
  threshold: number;
}

const TOKENS = {
  ptrRed: "#E8273E",
  ptrTeal: "#1FB8CC",
  carbon: "#0A0E0C",
  surface: "#121815",
  offWhite: "#F5F7F4",
  muted: "#9BA8A2",
} as const;

const PAIRS: Pair[] = [
  { fg: TOKENS.offWhite, bg: TOKENS.carbon, label: "off-white text on carbon", threshold: 4.5 },
  { fg: TOKENS.offWhite, bg: TOKENS.surface, label: "off-white text on surface", threshold: 4.5 },
  { fg: TOKENS.muted, bg: TOKENS.carbon, label: "muted text on carbon", threshold: 4.5 },
  { fg: TOKENS.muted, bg: TOKENS.surface, label: "muted text on surface", threshold: 4.5 },
  { fg: TOKENS.ptrTeal, bg: TOKENS.carbon, label: "teal text on carbon", threshold: 4.5 },
  { fg: TOKENS.ptrTeal, bg: TOKENS.surface, label: "teal text on surface", threshold: 4.5 },
  { fg: TOKENS.carbon, bg: TOKENS.ptrTeal, label: "carbon text on teal CTA", threshold: 4.5 },
  { fg: TOKENS.ptrTeal, bg: TOKENS.carbon, label: "teal UI border on carbon", threshold: 3 },
  // Red is the "spark" accent (FR-055, ≤15% coverage) and is never used as a
  // text foreground or as a CTA background per FR-056 — primary CTA uses teal.
  // Therefore red-on-light text pairs are NOT in the documented design system.
  { fg: TOKENS.ptrRed, bg: TOKENS.carbon, label: "red UI accent on carbon", threshold: 3 },
];

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  const n = parseInt(v, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function relativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const la = relativeLuminance(hexToRgb(a));
  const lb = relativeLuminance(hexToRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const failures: string[] = [];
for (const p of PAIRS) {
  const ratio = contrast(p.fg, p.bg);
  const ok = ratio >= p.threshold;
  const line = `${ok ? "OK " : "FAIL"}  ${p.label}: ${ratio.toFixed(2)}:1 (need ${p.threshold}:1)`;
  console.log(line);
  if (!ok) failures.push(line);
}

if (failures.length) {
  console.error(`\nContrast gate FAILED — ${failures.length} pair(s) below threshold:`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log(`\nContrast gate PASSED — ${PAIRS.length} pairs verified.`);
