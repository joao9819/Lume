// QA: node scripts/qa.mjs [url]  (axe WCAG 2.2 AA, overflow, teclado, form, links WhatsApp, barra mobile)
import { chromium } from 'playwright';
import fs from 'fs';
const url = process.argv[2] ?? 'http://localhost:4321/';
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const log = (...a) => console.log(...a);

// 1. Overflow horizontal
for (const w of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
  const p = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto(url, { waitUntil: 'networkidle' });
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  log(`overflow ${w}px: scrollWidth=${sw} ${sw > w ? 'FALHA' : 'ok'}`);
  await p.close();
}

// 2. axe em 390 e 1440 (reduced motion para tudo visível)
for (const w of [390, 1440]) {
  const p = await (await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.addScriptTag({ content: axe });
  const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.length} (${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')})`));
  log(`axe ${w}px:`, r.length ? '\n  ' + r.join('\n  ') : 'sem violações');
  await p.close();
}

const p = await (await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })).newPage();
await p.goto(url, { waitUntil: 'networkidle' });

// 3. Links do WhatsApp
const links = await p.$$eval('a[href*="wa.me"]', (as) => as.map((a) => decodeURIComponent(a.href.split('text=')[1] || '')));
log('links wa.me:', links.length, [...new Set(links)]);

// 4. Acordeão por teclado
const s1 = p.locator('#duvidas summary').first();
await s1.focus(); await p.keyboard.press('Enter');
const open1 = await p.$eval('#duvidas details', (d) => d.open);
await p.keyboard.press('Space');
const open2 = await p.$eval('#duvidas details', (d) => d.open);
log(`acordeão: Enter abre=${open1}, Espaço fecha=${!open2}`);

// 5. Barra mobile some na seção de agendamento
const vis = async () => p.$eval('[data-mobile-cta]', (e) => !e.classList.contains('is-hidden'));
const before = await vis();
await p.locator('#agendar').scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
const during = await vis();
log(`barra mobile: visível antes=${before}, some no #agendar=${!during}`);

// 6. Formulário
await p.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return {}; }; });
await p.click('#form-agendar button[type=submit]');
const errs = await p.$$eval('.erro', (e) => e.filter((x) => x.textContent).map((x) => x.textContent));
const focused = await p.evaluate(() => document.activeElement?.id);
log('form vazio: erros=', errs, 'foco=', focused);
await p.fill('#f-nome', 'Ana Souza');
await p.type('#f-whats', '16991234567');
log('máscara:', await p.inputValue('#f-whats'));
await p.selectOption('#f-trat', 'Ritual de Luz');
await p.check('input[name=periodo][value="Tarde"]');
await p.fill('#f-msg', 'Pele sensível.');
await p.click('#form-agendar button[type=submit]');
const opened = await p.evaluate(() => window.__opened);
log('form válido abre:', opened.map((u) => decodeURIComponent(u)));

// 7. Foco visível no primeiro link via Tab
await p.goto(url, { waitUntil: 'networkidle' });
await p.keyboard.press('Tab');
log('1º Tab:', await p.evaluate(() => document.activeElement?.textContent?.trim()));
await browser.close();
