// compare.mjs — what differs between two copies of the standard, by rule id, so a check-in between
// the home and work copies reads a short list instead of two pages.
// Run: node compare.mjs <a/standards.html> <b/standards.html>
import fs from 'node:fs';

const island = (file) => {
  const m = /<script id="data" type="application\/json">([\s\S]*?)<\/script>/.exec(fs.readFileSync(file, 'utf8'));
  if (!m) throw new Error(`${file}: no data island`);
  return JSON.parse(m[1]);
};
const [fa, fb] = process.argv.slice(2);
if (!fa || !fb) { console.error('usage: node compare.mjs <a/standards.html> <b/standards.html>'); process.exit(2); }
const A = island(fa), B = island(fb);
console.log(`A: ${fa} (draft ${A.draft}, ${A.date})\nB: ${fb} (draft ${B.draft}, ${B.date})`);

// Rules and principles compare by id; the bookends compare by the rule they point at.
const sections = [
  ['principles', (x) => x.id, (x) => `${x.name} — ${x.line}`],
  ['rules', (x) => x.id, (x) => `[${x.cls}] ${x.text} | check: ${x.check}`],
  ['start', (x) => x.ref, (x) => x.step],
  ['dod', (x) => x.ref + ' ' + x.step, (x) => x.step],
];
let differences = 0;
for (const [name, key, show] of sections) {
  const a = new Map((A[name] ?? []).map((x) => [key(x), x]));
  const b = new Map((B[name] ?? []).map((x) => [key(x), x]));
  const lines = [];
  for (const [k, x] of a) if (!b.has(k)) lines.push(`  only in A  ${k}: ${show(x)}`);
  for (const [k, x] of b) if (!a.has(k)) lines.push(`  only in B  ${k}: ${show(x)}`);
  for (const [k, x] of a) if (b.has(k) && show(x) !== show(b.get(k))) lines.push(`  changed    ${k}\n    A: ${show(x)}\n    B: ${show(b.get(k))}`);
  if (lines.length) { console.log(`\n${name}:`); console.log(lines.join('\n')); differences += lines.length; }
}
console.log(differences ? `\n${differences} differences` : '\nno differences');
