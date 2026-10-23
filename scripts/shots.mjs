// Prints de página inteira e da dobra: node scripts/shots.mjs [url] [outDir]
import { chromium } from 'playwright';
import fs from 'fs';
const url = process.argv[2] ?? 'http://localhost:4321/';
const out = process.argv[3] ?? 'shots';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' + (fs.existsSync('/opt/pw-browsers/chromium/chrome') ? '/chrome' : '') }).catch(() => chromium.launch());
const sizes = (process.env.SIZES ?? '390x844,1440x900').split(',').map((s) => s.split('x').map(Number));
const reduce = process.env.REDUCE === '1';
for (const [w, h] of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}/fold-${w}${reduce ? '-rm' : ''}.png` });
  const info = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
    h1: [...document.querySelectorAll('h1 .line')].map((l) => Math.round(l.getBoundingClientRect().height)),
    h1w: Math.round(document.querySelector('h1')?.getBoundingClientRect().width ?? 0),
  }));
  console.log(w, JSON.stringify(info));
  if (process.env.SCROLL) {
    for (const f of process.env.SCROLL.split(',')) {
      await page.evaluate((y) => window.scrollTo(0, y * innerHeight), Number(f));
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${out}/scroll-${w}-${f}.png` });
    }
  }
  if (process.env.FULL) {
    // percorre a página para disparar os reveals antes do print inteiro
    const H = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += h * 0.6) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(250); }
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600);
    await page.screenshot({ path: `${out}/full-${w}${reduce ? '-rm' : ''}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
