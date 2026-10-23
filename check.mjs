// check.mjs — the page's data island is well formed, and every copy declared for this machine is byte-identical
// to the source (the clone this file sits in). copies.json lists copies by machine name; copies on other machines
// are reported as not checked here. Run from anywhere: node <clone>/check.mjs   (exit 1 on any problem)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './render.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(here, 'standards.html'), 'utf8');
const problems = [];
const m = /<script id="data" type="application\/json">([\s\S]*?)<\/script>/.exec(src);
if (!m) problems.push('no data island');
else {
  const D = JSON.parse(m[1]);
  if (!Number.isInteger(D.draft) || !D.date) problems.push('draft or date missing');
  const by = new Map(D.rules.map((r) => [r.id, r]));
  if (by.size !== D.rules.length) problems.push('duplicate rule id');
  for (const r of D.rules) {
    if (!D.principles.some((p) => p.id === r.p)) problems.push(`${r.id}: unknown principle`);
    if (!D.lanes.some((l) => l.id === r.lane)) problems.push(`${r.id}: unknown lane`);
    if (!D.classes[r.cls]) problems.push(`${r.id}: unknown class`);
    if (!r.check) problems.push(`${r.id}: no check`);
  }
  for (const s of [...D.start, ...D.dod]) if (!by.has(s.ref)) problems.push(`bookend refers to missing rule ${s.ref}`);
}
if (!problems.length) {
  const md = path.join(here, 'standards.md');
  if (!fs.existsSync(md) || fs.readFileSync(md, 'utf8') !== render(src)) problems.push('standards.md is stale: run node render.mjs');
}
const copies = JSON.parse(fs.readFileSync(path.join(here, 'copies.json'), 'utf8'));
const host = os.hostname();
const mine = copies[host] ?? [];
for (const c of mine) {
  if (!fs.existsSync(c)) { problems.push(`copy missing: ${c}`); continue; }
  if (fs.readFileSync(c, 'utf8') !== src) problems.push(`copy differs from source: ${c} (fix: copy standards.html over it, or edit the source)`);
}
const others = Object.entries(copies).filter(([h]) => h !== host).map(([h, l]) => `${l.length} on ${h}`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`ok: data island valid; ${mine.length} copies on ${host} identical` + (others.length ? `; not checked here: ${others.join(', ')}` : '') + (host in copies ? '' : ` (no copies declared for ${host})`));
