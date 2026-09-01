/**
 * Helpers pour générer des fichiers de test
 * Génère images PNG avec encodeur PNG pur (zlib + CRC32)
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

/**
 * Créer un PNG de test (pur JS, pas besoin de node-canvas)
 */
function createPngBuffer(width, height, options = {}) {
  const {
    bgColor = [255, 255, 255],
    hasBorder = true,
    borderColor = [200, 200, 200],
    hasCenterRect = true,
    centerRectColor = [220, 50, 50],
    textLines = 8,
    textColor = [50, 50, 50],
  } = options;

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw image data: each row starts with filter byte (0 = none)
  const rowLen = 1 + width * 3;
  const raw = Buffer.alloc(rowLen * height);

  for (let y = 0; y < height; y++) {
    const rowOff = y * rowLen;
    raw[rowOff] = 0; // filter: none

    for (let x = 0; x < width; x++) {
      const px = rowOff + 1 + x * 3;
      let r = bgColor[0],
        g = bgColor[1],
        b = bgColor[2];

      // Border
      if (hasBorder && (x < 10 || x >= width - 10 || y < 10 || y >= height - 10)) {
        r = borderColor[0];
        g = borderColor[1];
        b = borderColor[2];
      }

      // Center rectangle
      if (hasCenterRect) {
        const cx = width / 2;
        const cy = height / 2;
        const rx = width / 4;
        const ry = height / 4;
        if (Math.abs(x - cx) < rx && Math.abs(y - cy) < ry) {
          r = centerRectColor[0];
          g = centerRectColor[1];
          b = centerRectColor[2];
        }
      }

      // Simulated text lines
      const lineSpacing = Math.max(20, Math.floor(height / (textLines + 2)));
      for (let line = 0; line < textLines; line++) {
        const lineY = y - line * lineSpacing;
        if (lineY >= 0 && lineY < 5 && x > width * 0.2 && x < width * 0.8) {
          r = textColor[0];
          g = textColor[1];
          b = textColor[2];
        }
      }

      raw[px] = r;
      raw[px + 1] = g;
      raw[px + 2] = b;
    }
  }

  const compressed = zlib.deflateSync(raw);

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

/**
 * Créer un PNG de test
 */
export function createTestImage(options = {}) {
  const {
    width = 800,
    height = 600,
    filename = 'test-image.png',
    variant = 1, // Different variants for testing multiple images
  } = options;

  // Vary colors slightly for each variant
  const centerColors = [
    [220, 50, 50], // Red
    [50, 220, 50], // Green
    [50, 50, 220], // Blue
    [220, 180, 50], // Yellow
    [180, 50, 220], // Purple
    [50, 180, 220], // Cyan
  ];

  const colorIndex = variant % centerColors.length;

  const pngData = createPngBuffer(width, height, {
    centerRectColor: centerColors[colorIndex],
    textLines: 6 + variant,
  });

  const filePath = path.join(fixturesDir, filename);
  fs.mkdirSync(fixturesDir, { recursive: true });
  fs.writeFileSync(filePath, pngData);
  return filePath;
}

/**
 * Créer une image large (pour tester portrait/landscape)
 */
export function createWideImage() {
  return createTestImage({
    width: 1200,
    height: 800,
    filename: 'wide-image.png',
    variant: 7,
  });
}

/**
 * Créer une image haute (portrait)
 */
export function createTallImage() {
  return createTestImage({
    width: 600,
    height: 900,
    filename: 'tall-image.png',
    variant: 8,
  });
}

/**
 * Créer une grande image (pour tester la performance)
 */
export function createLargeImage() {
  return createTestImage({
    width: 2000,
    height: 2000,
    filename: 'large-image.png',
    variant: 9,
  });
}

/**
 * Générer tous les fichiers de test
 */
export async function generateAllFixtures() {
  console.log('Generating test fixtures...');
  fs.mkdirSync(fixturesDir, { recursive: true });

  const files = {
    testImage1: createTestImage({ filename: 'test-image-1.png', variant: 1 }),
    testImage2: createTestImage({ filename: 'test-image-2.png', variant: 2 }),
    testImage3: createTestImage({ filename: 'test-image-3.png', variant: 3 }),
    testImage4: createTestImage({ filename: 'test-image-4.png', variant: 4 }),
    testImage5: createTestImage({ filename: 'test-image-5.png', variant: 5 }),
    wideImage: createWideImage(),
    tallImage: createTallImage(),
    largeImage: createLargeImage(),
  };

  console.log('✅ Fixtures generated:', Object.keys(files).length, 'files');
  return files;
}

// Generate fixtures if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllFixtures();
}
