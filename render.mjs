// render.mjs — writes standards.md, the plain-text form of the data island that CLAUDE.md files import, so
// every session starts with the standard loaded. Generated, never edited: check.mjs fails when it is stale.
// Run: node render.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function render(src) {
  const m = /<script id="data" type="application\/json">([\s\S]*?)<\/script>/.exec(src);
  if (!m) throw new Error('no data island');
  const D = JSON.parse(m[1]);
  const out = [];
  out.push(`# The working standard (draft ${D.draft}, ${D.date})`, '');
  out.push('Generated from standards.html by render.mjs; never edit this file. Rules are cited by id. A project adds only');
  out.push('its own specifics beside an id and never restates a rule (3X2).', '');
  out.push('Classes: ' + Object.entries(D.classes).map(([k, v]) => `${k} = ${v}`).join('; ') + '.', '');
  const lane = Object.fromEntries(D.lanes.map((l) => [l.id, l.name]));
  for (const p of D.principles) {
    out.push(`## ${p.id}. ${p.name}`, '', p.line, '');
    for (const r of D.rules.filter((x) => x.p === p.id)) {
      out.push(`- **${r.id}** (${lane[r.lane]}, ${r.cls}): ${r.text} *Check: ${r.check}.*`);
    }
    out.push('');
  }
  out.push('## Starting something', '');
  D.start.forEach((s, i) => out.push(`${i + 1}. ${s.step} (${s.ref})`));
  out.push('', '## Definition of Done', '');
  D.dod.forEach((s, i) => out.push(`${i + 1}. ${s.step} (${s.ref})`));
  out.push('', '## Where we leave the named idea', '');
  for (const l of D.leave) out.push(`- ${l.idea}: ${l.ours}`);
  return out.join('\n') + '\n';
}

const here = path.dirname(fileURLToPath(import.meta.url));
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const md = render(fs.readFileSync(path.join(here, 'standards.html'), 'utf8'));
  fs.writeFileSync(path.join(here, 'standards.md'), md);
  console.log(`wrote standards.md (${md.length} bytes)`);
}
