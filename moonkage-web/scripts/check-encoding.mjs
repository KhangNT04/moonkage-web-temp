// Detect files whose bytes are not valid UTF-8 (i.e. damaged by a wrong encoding).
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'C:/Workspace/MSS301/temp/web-temp/moonkage-web/src';
const decoder = new TextDecoder('utf-8', { fatal: true });

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx|css|json|html)$/.test(e.name)) out.push(full);
  }
  return out;
}

let bad = 0;
for (const file of walk(ROOT)) {
  const buf = readFileSync(file);
  try {
    decoder.decode(buf);
  } catch {
    bad++;
    console.log(`INVALID-UTF8 ${file.replace(ROOT + '\\', '')}`);
  }
}
console.log(`\n${bad} invalid files.`);
