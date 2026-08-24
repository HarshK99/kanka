/**
 * Compresses every raster image under public/ in place.
 * PNGs are palette-quantized (keeps alpha); JPEGs are re-encoded with mozjpeg.
 * A file is only overwritten if the result is actually smaller.
 *
 * Usage: node scripts/optimize-images.mjs [--dry-run]
 */
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.join(process.cwd(), 'public');
const DRY_RUN = process.argv.includes('--dry-run');
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(full)));
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function optimize(file) {
  const original = await readFile(file);
  const ext = path.extname(file).toLowerCase();

  let output;
  if (ext === '.png') {
    output = await sharp(original)
      .png({ compressionLevel: 9, palette: true, quality: 80, effort: 10 })
      .toBuffer();
  } else {
    output = await sharp(original)
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();
  }

  const before = original.length;
  const after = output.length;
  const saved = before - after;

  if (saved > 0) {
    if (!DRY_RUN) await writeFile(file, output);
    return { file, before, after, saved };
  }
  return { file, before, after: before, saved: 0 };
}

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const images = await collectImages(ROOT);
if (images.length === 0) {
  console.log('No images found under public/.');
  process.exit(0);
}

console.log(`${DRY_RUN ? '[dry run] ' : ''}Optimizing ${images.length} image(s)...\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of images) {
  const { before, after, saved } = await optimize(file);
  totalBefore += before;
  totalAfter += after;
  const rel = path.relative(process.cwd(), file);
  if (saved > 0) {
    const pct = ((saved / before) * 100).toFixed(0);
    console.log(`  ${rel}: ${fmt(before)} -> ${fmt(after)} (-${pct}%)`);
  } else {
    console.log(`  ${rel}: already optimal, skipped`);
  }
}

const totalSaved = totalBefore - totalAfter;
const totalPct = totalBefore > 0 ? ((totalSaved / totalBefore) * 100).toFixed(0) : '0';
console.log(`\nTotal: ${fmt(totalBefore)} -> ${fmt(totalAfter)} (saved ${fmt(totalSaved)}, -${totalPct}%)`);
if (DRY_RUN) console.log('Dry run — no files were modified.');
