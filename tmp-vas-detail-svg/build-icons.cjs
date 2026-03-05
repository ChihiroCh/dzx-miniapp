const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const baseDir = '/Users/chenyun/Desktop/dzx-miniapp/tmp-vas-detail-svg';
const outDir = '/Users/chenyun/Desktop/dzx-miniapp/src/package-invest/static/icons/vas-service-detail';

const svgDefs = {
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
  circle_check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
  clipboard_list: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  file_text: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  pen_tool: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>`,
  award: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>`,
  circle_alert: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  trending_up: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>`,
  dollar_sign: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
};

for (const [name, content] of Object.entries(svgDefs)) {
  fs.writeFileSync(path.join(baseDir, `${name}.svg`), content);
}

const defs = [
  { src: 'zap', out: 'zap-white.png', color: [255, 255, 255] },
  { src: 'circle_check', out: 'circle-check-primary.png', color: [0, 51, 103] },
  { src: 'clipboard_list', out: 'clipboard-list-white.png', color: [255, 255, 255] },
  { src: 'file_text', out: 'file-text-white.png', color: [255, 255, 255] },
  { src: 'pen_tool', out: 'pen-tool-white.png', color: [255, 255, 255] },
  { src: 'send', out: 'send-white.png', color: [255, 255, 255] },
  { src: 'users', out: 'users-white.png', color: [255, 255, 255] },
  { src: 'award', out: 'award-white.png', color: [255, 255, 255] },
  { src: 'clock', out: 'clock-accent.png', color: [245, 159, 10] },
  { src: 'circle_alert', out: 'circle-alert-red.png', color: [239, 68, 68] },
  { src: 'info', out: 'info-blue.png', color: [37, 99, 235] },
  { src: 'trending_up', out: 'trending-up-accent.png', color: [245, 159, 10] },
  { src: 'dollar_sign', out: 'dollar-sign-accent.png', color: [245, 159, 10] },
];

function rgbaDist(r, g, b, bg) {
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
    const idx = (y * src.width + x) * 4;
    bgR += src.data[idx];
    bgG += src.data[idx + 1];
    bgB += src.data[idx + 2];
  }

  const bg = [Math.round(bgR / 3), Math.round(bgG / 3), Math.round(bgB / 3)];

  let minX = src.width;
  let minY = src.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const idx = (y * src.width + x) * 4;
      const d = rgbaDist(src.data[idx], src.data[idx + 1], src.data[idx + 2], bg);
      if (d > 8) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    throw new Error(`No foreground found in ${srcPath}`);
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
      const sidx = (sy * src.width + sx) * 4;

      const d = rgbaDist(src.data[sidx], src.data[sidx + 1], src.data[sidx + 2], bg);
      if (d <= 8) continue;

      const alpha = Math.max(0, Math.min(255, Math.round((d / 120) * 255)));
      const didx = ((offsetY + y) * TARGET + (offsetX + x)) * 4;
      out.data[didx] = color[0];
      out.data[didx + 1] = color[1];
      out.data[didx + 2] = color[2];
      out.data[didx + 3] = alpha;
    }
  }

  fs.writeFileSync(outPath, PNG.sync.write(out));
}

for (const item of defs) {
  const srcPngPath = path.join(baseDir, `${item.src}.svg.png`);
  const outPngPath = path.join(outDir, item.out);
  renderIcon(srcPngPath, outPngPath, item.color);
}

console.log('generated', defs.map((d) => d.out).join(', '));
