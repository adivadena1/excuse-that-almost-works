// The Excuse That Almost Works — one-liner entry.
// Writes a single line (<=20 words, <=140 chars) to /output/entry.txt.
// Node 22, deterministic, no network, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Sorry boss, the lift broke with my laptop inside it and the repair guy says Thursday.";

const MAX_WORDS = 20;
const MAX_CHARS = 140;

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Gate guard: the line must satisfy BOTH competition limits.
const words = wordCount(LINE);
if (words > MAX_WORDS) {
  throw new Error(`line has ${words} words, over the ${MAX_WORDS}-word limit`);
}
if (LINE.length > MAX_CHARS) {
  throw new Error(`line has ${LINE.length} chars, over the ${MAX_CHARS}-char gate`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("line must be a single non-empty line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
// Round-trip check: what the judge will read must be exactly the gated line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE + "\n") {
  throw new Error("round-trip mismatch: /output/entry.txt does not hold the gated line");
}
console.log(`wrote ${words} words, ${LINE.length} chars to /output/entry.txt`);
