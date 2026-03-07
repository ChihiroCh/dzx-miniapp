const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const baseDir = '/Users/chenyun/Desktop/dzx-miniapp/tmp-rent-calculator-svg';
const outDir = '/Users/chenyun/Desktop/dzx-miniapp/src/package-invest/static/icons/rent-calculator';

const svgDefs = {
  house: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>`,
  rotate_ccw: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`,
  share_2: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>`,
  circle_alert: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>`,
  message_circle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>`,
};

for (const [name, content] of Object.entries(svgDefs)) {
  fs.writeFileSync(path.join(baseDir, `${name}.svg`), content);
}

const defs = [
  { src: 'house', out: 'house-primary.png', color: [0, 51, 102] },
  { src: 'rotate_ccw', out: 'rotate-ccw-muted.png', color: [71, 85, 105] },
  { src: 'share_2', out: 'share-2-white.png', color: [255, 255, 255] },
  { src: 'circle_alert', out: 'circle-alert-blue.png', color: [37, 99, 235] },
  { src: 'message_circle', out: 'message-circle-white.png', color: [255, 255, 255] },
];

function dist(r, g, b, bg) {
  const dr = r - bg[0];
  const dg = g - bg[1];
  const db = b - bg[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function renderIcon(srcPath, outPath, color) {
  const src = PNG.sync.read(fs.readFileSync(srcPath));

  const corners = [
    [src.width - 1, src.height - 1],
    [src.width - 1, 0],
    [0, src.height - 1],
  ];

  let bgR = 0;
  let bgG = 0;
  let bgB = 0;
  for (const [x, y] of corners) {
    const i = (y * src.width + x) * 4;
    bgR += src.data[i];
    bgG += src.data[i + 1];
    bgB += src.data[i + 2];
  }
  const bg = [Math.round(bgR / 3), Math.round(bgG / 3), Math.round(bgB / 3)];

  let minX = src.width;
  let minY = src.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const i = (y * src.width + x) * 4;
      const d = dist(src.data[i], src.data[i + 1], src.data[i + 2], bg);
      if (d > 8) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const TARGET = 24;
  const INNER = 20;
  const scale = Math.min(INNER / cropW, INNER / cropH, 1);
  const outW = Math.max(1, Math.round(cropW * scale));
  const outH = Math.max(1, Math.round(cropH * scale));
  const offsetX = Math.floor((TARGET - outW) / 2);
  const offsetY = Math.floor((TARGET - outH) / 2);

  const out = new PNG({ width: TARGET, height: TARGET });

  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const sx = minX + Math.min(cropW - 1, Math.floor(x / scale));
      const sy = minY + Math.min(cropH - 1, Math.floor(y / scale));
      const si = (sy * src.width + sx) * 4;
      const d = dist(src.data[si], src.data[si + 1], src.data[si + 2], bg);
      if (d <= 8) continue;
      const alpha = Math.max(0, Math.min(255, Math.round((d / 120) * 255)));
      const di = ((offsetY + y) * TARGET + (offsetX + x)) * 4;
      out.data[di] = color[0];
      out.data[di + 1] = color[1];
      out.data[di + 2] = color[2];
      out.data[di + 3] = alpha;
    }
  }

  fs.writeFileSync(outPath, PNG.sync.write(out));
}

for (const icon of defs) {
  const srcPng = path.join(baseDir, `${icon.src}.svg.png`);
  renderIcon(srcPng, path.join(outDir, icon.out), icon.color);
}

console.log('ok');
