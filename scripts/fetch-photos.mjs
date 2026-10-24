/**
 * Fotos do Unsplash para /src/assets, com o mesmo tratamento (leve aquecimento) e CREDITOS.md.
 *
 *   UNSPLASH_ACCESS_KEY=... node scripts/fetch-photos.mjs search hero "woman portrait window light"
 *   UNSPLASH_ACCESS_KEY=... node scripts/fetch-photos.mjs fetch      # baixa o que está em scripts/photo-picks.json
 *
 * Requer acesso de rede a api.unsplash.com e images.unsplash.com. A chave nunca vai para o repositório.
 */
import sharp from 'sharp';
import fs from 'fs';

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) { console.error('Defina UNSPLASH_ACCESS_KEY.'); process.exit(1); }
const api = async (path) => {
  const r = await fetch(`https://api.unsplash.com${path}`, { headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' } });
  if (!r.ok) throw new Error(`${r.status} ${path}: ${await r.text()}`);
  return r.json();
};

// Destino de cada posição: largura máxima e uso
const SLOTS = {
  hero: { w: 2400, uso: 'Hero (janela em arco que abre)' },
  ritual: { w: 1600, uso: 'Ritual de Luz' },
  ambiente: { w: 1800, uso: 'A clínica' },
  'tratamento-limpeza': { w: 1200, uso: 'Limpeza de Pele Profunda' },
  'tratamento-peeling': { w: 1200, uso: 'Peeling de Renovação' },
  'tratamento-microagulhamento': { w: 1200, uso: 'Microagulhamento' },
  'tratamento-led': { w: 1200, uso: 'LED + Hidratação Profunda' },
  'tratamento-drenagem': { w: 1200, uso: 'Drenagem Linfática' },
  'tratamento-bioestimulador': { w: 1200, uso: 'Bioestimulador de Colágeno' },
  'equipe-helena': { w: 1200, uso: 'Equipe: Helena Prado (personagem fictícia)' },
  'equipe-marina': { w: 1200, uso: 'Equipe: Marina Lopes (personagem fictícia)' },
};

// Tratamento único do "ensaio": leve aquecimento, um pouco menos de saturação
const warm = (img) => img
  .recomb([[1.04, 0.02, 0], [0.01, 1.0, 0], [0, 0.02, 0.92]])
  .modulate({ saturation: 0.94, brightness: 1.01 });

const [mode, slot, ...q] = process.argv.slice(2);

if (mode === 'search') {
  const res = await api(`/search/photos?per_page=30&content_filter=high&query=${encodeURIComponent(q.join(' '))}`);
  for (const p of res.results.filter((p) => !p.premium && !p.plus)) console.log(`${slot}\t${p.id}\t${p.user.name}\t${p.alt_description ?? ''}`);
}

if (mode === 'fetch') {
  const picks = JSON.parse(fs.readFileSync('scripts/photo-picks.json', 'utf8'));
  const rows = [];
  for (const [name, id] of Object.entries(picks)) {
    if (!id || !SLOTS[name]) continue;
    const p = await api(`/photos/${id}`);
    await api(new URL(p.links.download_location).pathname + new URL(p.links.download_location).search); // registro de download exigido pela API
    const raw = Buffer.from(await (await fetch(`${p.urls.raw}&w=${SLOTS[name].w}&q=90&fm=jpg&fit=max`)).arrayBuffer());
    await warm(sharp(raw)).jpeg({ quality: 86, mozjpeg: true }).toFile(`src/assets/${name}.jpg`);
    rows.push(`| ${SLOTS[name].uso} | \`src/assets/${name}.jpg\` | [${p.user.name}](${p.user.links.html}?utm_source=lume&utm_medium=referral) | [${p.id}](${p.links.html}?utm_source=lume&utm_medium=referral) |`);
    console.log('ok', name, p.user.name);
  }
  const pend = Object.keys(SLOTS).filter((s) => !picks[s]).map((s) => `- ${SLOTS[s].uso} (\`${s}\`)`);
  fs.writeFileSync('CREDITOS.md', `# Créditos das fotos

Todas as fotos são do [Unsplash](https://unsplash.com/?utm_source=lume&utm_medium=referral), sob a [Licença Unsplash](https://unsplash.com/license). Receberam o mesmo tratamento (leve aquecimento, saturação -6%) para parecer um ensaio só.

| Uso | Arquivo | Autor | Foto |
| --- | --- | --- | --- |
${rows.join('\n')}
${pend.length ? `\n## Pendentes (espaço marcado na página)\n\n${pend.join('\n')}\n` : ''}`);
}
