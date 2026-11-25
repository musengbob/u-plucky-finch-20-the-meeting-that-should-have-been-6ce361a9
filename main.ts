// Entry for "The Meeting That Should Have Been an Email":
// one funny line, 1-200 code points, no trailing explanation.
// The joke: the meeting's only outcome was scheduling another meeting,
// which is the most email-able decision imaginable — and the punchline
// (an email could have done it in one sentence) lands at the very end,
// which is exactly what the meeting failed to do.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "We held an hour-long meeting to decide we needed another meeting, a decision an email could have made in a single sentence.";

function outputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (dir && dir.trim()) return join(dir, "entry.txt");
  const explicit = process.env.OUTPUT_PATH;
  if (explicit && explicit.trim()) return explicit;
  return join(process.cwd(), "output", "entry.txt");
}

function fail(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
}

const target = outputPath();
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, LINE, "utf8");

const roundTrip = readFileSync(target, "utf8");
if (roundTrip !== LINE) {
  fail("written entry.txt does not match the line byte-for-byte.");
}
const count = [...roundTrip].length;
if (count < 1 || count > 200) {
  fail(`entry is ${count} code points; the rules require 1-200.`);
}
if (roundTrip.trim() === "") {
  fail("entry is only whitespace.");
}

console.log(`Wrote ${count} code points to ${target}:`);
console.log(roundTrip);
console.log("OK: byte-identical, within 1-200 code points, not blank.");
