// Gera public/og.jpg (1200x630), favicons e apple-touch-icon.
// Requer Fraunces e Hanken instaladas no sistema (ver scripts/build-fonts.py) para o texto do SVG.
import sharp from 'sharp';
import fs from 'fs';

const c = { linho: '#F4EFE7', areia: '#E8DFD2', cafe: '#2A2320', argila: '#6A5D52', terracota: '#9A4E2E' };
const hero = ['src/assets/hero.jpg', 'src/assets/hero.jpeg', 'src/assets/hero.png'].find((p) => fs.existsSync(p));

// Arco: topo semicircular
const arch = (x, y, w, h) => `M${x},${y + h} V${y + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w},${y + w / 2} V${y + h} Z`;
const A = { x: 760, y: 70, w: 360, h: 560 };

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${c.linho}"/>
  ${hero ? '' : `<path d="${arch(A.x, A.y, A.w, A.h)}" fill="${c.areia}"/>`}
  <text x="72" y="118" font-family="Hanken Grotesk" font-weight="500" font-size="18" letter-spacing="2.6" fill="${c.argila}">ESTÉTICA FACIAL E CORPORAL · RIBEIRÃO PRETO</text>
  <g font-family="Fraunces" font-weight="300" fill="${c.cafe}">
    <text x="68" y="250" font-size="92">RESULTADO</text>
    <text x="68" y="338" font-size="92">NATURAL</text>
    <text x="70" y="426" font-size="92" font-style="italic" fill="${c.terracota}">é o nosso</text>
    <text x="68" y="514" font-size="92">LUXO</text>
  </g>
  <text x="72" y="580" font-family="Fraunces" font-size="30" letter-spacing="4" fill="${c.cafe}">LUME</text>
</svg>`;

let og = sharp(Buffer.from(svg));
if (hero) {
  const mask = Buffer.from(`<svg width="${A.w}" height="${A.h}"><path d="${arch(0, 0, A.w, A.h)}" fill="#fff"/></svg>`);
  const photo = await sharp(hero).resize(A.w, A.h, { fit: 'cover', position: 'attention' }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  og = sharp(await og.png().toBuffer()).composite([{ input: photo, left: A.x, top: A.y }]);
}
await og.jpeg({ quality: 84, mozjpeg: true }).toFile('public/og.jpg');

// Favicon: arco terracota sobre linho
const icon = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64"><rect width="64" height="64" fill="${c.linho}"/><path d="${arch(18, 10, 28, 44)}" fill="${c.terracota}"/></svg>`;
fs.writeFileSync('public/favicon.svg', icon(64));
await sharp(Buffer.from(icon(180))).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(icon(32))).png().toFile('public/favicon-32.png');
console.log('og + favicons ok', hero ? '(com foto do hero)' : '(sem foto)');
