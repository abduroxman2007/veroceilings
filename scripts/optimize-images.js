/* eslint-disable no-console */
/**
 * Optimises images under src/assets/images IN PLACE.
 *
 * Run this after adding new project photos:
 *   npm run optimize:images
 *   npm run optimize:images -- --dry-run
 *
 * Rules:
 *   - Filenames and extensions never change (components import exact paths).
 *   - Anything wider than MAX_WIDTH is downscaled; nothing is ever upscaled.
 *   - The original is replaced only if the re-encoded file is actually smaller.
 *   - PNG transparency is preserved. See the note on palette mode below.
 *
 * Commit the results — these are source assets, not build output.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGE_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 82;

const DRY_RUN = process.argv.includes('--dry-run');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(jpe?g|png)$/i.test(entry.name) ? [full] : [];
  });
}

async function optimize(file) {
  const before = fs.statSync(file).size;
  const image = sharp(file, { failOn: 'none' });
  const meta = await image.metadata();

  let pipeline = image;
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  if (/\.png$/i.test(file)) {
    // Palette quantisation shrinks PNGs dramatically, but libvips' quantiser
    // emits an indexed image with no tRNS chunk — which silently flattens the
    // alpha channel and leaves opaque boxes where transparency used to be.
    // So it is only safe on images that have no alpha to begin with.
    pipeline = pipeline.png({
      compressionLevel: 9,
      palette: !meta.hasAlpha,
      ...(meta.hasAlpha ? {} : { quality: PNG_QUALITY }),
    });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const buffer = await pipeline.toBuffer();

  // Never write a file that got bigger.
  if (buffer.length >= before) {
    return { file, before, after: before, skipped: true };
  }

  // Decode the result before trusting it, so a corrupt encode can never
  // overwrite a good original.
  const check = await sharp(buffer).metadata();
  if (!check.width || !check.height) {
    throw new Error('re-encoded image failed to decode');
  }
  if (meta.hasAlpha && !check.hasAlpha) {
    throw new Error('alpha channel was lost during re-encoding');
  }

  if (!DRY_RUN) fs.writeFileSync(file, buffer);
  return { file, before, after: buffer.length, skipped: false };
}

async function main() {
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`Image directory not found: ${IMAGE_DIR}`);
    process.exit(1);
  }

  const files = walk(IMAGE_DIR);
  console.log(`${DRY_RUN ? '[dry run] ' : ''}Scanning ${files.length} images...\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;
  let skipped = 0;
  const failures = [];

  for (const file of files) {
    try {
      const result = await optimize(file);
      totalBefore += result.before;
      totalAfter += result.after;

      if (result.skipped) {
        skipped += 1;
      } else {
        changed += 1;
        const pct = ((1 - result.after / result.before) * 100).toFixed(0);
        const rel = path.relative(IMAGE_DIR, file);
        console.log(
          `  ${rel}  ${(result.before / 1024).toFixed(0)} KB -> ` +
          `${(result.after / 1024).toFixed(0)} KB  (-${pct}%)`
        );
      }
    } catch (error) {
      failures.push({ file, message: error.message });
    }
  }

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
  console.log(`\n${changed} optimised, ${skipped} already optimal, ${failures.length} failed`);
  console.log(`Total: ${mb(totalBefore)} MB -> ${mb(totalAfter)} MB`);

  if (failures.length) {
    console.log('\nFailures (originals left untouched):');
    failures.forEach((f) => console.log(`  ${path.relative(IMAGE_DIR, f.file)}: ${f.message}`));
    process.exitCode = 1;
  }
}

main();
