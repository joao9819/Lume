/**
 * Aplica o tratamento único (leve aquecimento) às fotos baixadas em .photo-scratch/raw
 * e grava em src/assets + CREDITOS.md. Uso: node scripts/apply-photos.mjs
 */
import sharp from 'sharp';
import fs from 'fs';

const meta = JSON.parse(fs.readFileSync('.photo-scratch/picks-meta.json', 'utf8'));
const uso = {
  hero: ['Hero (janela em arco que abre)', 2400],
  ritual: ['Ritual de Luz', 1600],
  ambiente: ['A clínica', 1800],
  'tratamento-limpeza': ['Limpeza de Pele Profunda', 1200],
  'tratamento-peeling': ['Peeling de Renovação', 1200],
  'tratamento-microagulhamento': ['Microagulhamento', 1200],
  'tratamento-led': ['LED + Hidratação Profunda', 1200],
  'tratamento-drenagem': ['Drenagem Linfática', 1200],
  'tratamento-bioestimulador': ['Bioestimulador de Colágeno', 1200],
  'equipe-helena': ['Equipe: Helena Prado (personagem fictícia)', 1200],
  'equipe-marina': ['Equipe: Marina Lopes (personagem fictícia)', 1200],
};
const flip = new Set(JSON.parse(process.env.FLIP ?? '[]'));
const utm = '?utm_source=lume&utm_medium=referral';
const rows = [];
for (const [name, m] of Object.entries(meta)) {
  const src = `.photo-scratch/raw/${name}.jpg`;
  if (!fs.existsSync(src)) { console.log('falta', name); continue; }
  let img = sharp(src).resize({ width: uso[name][1], withoutEnlargement: true });
  if (flip.has(name)) img = img.flop();
  await img
    .recomb([[1.04, 0.02, 0], [0.01, 1.0, 0], [0, 0.02, 0.92]])
    .modulate({ saturation: 0.94, brightness: 1.01 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`src/assets/${name}.jpg`);
  rows.push(`| ${uso[name][0]} | \`src/assets/${name}.jpg\` | [${m.user}](https://unsplash.com/@${m.username}${utm}) | [${m.id}](${m.html}${utm}) |`);
  console.log('ok', name);
}
fs.writeFileSync('CREDITOS.md', `# Créditos das fotos

Todas as fotos são do [Unsplash](https://unsplash.com/${utm}), sob a [Licença Unsplash](https://unsplash.com/license) (uso gratuito, inclusive comercial, sem exigência de atribuição; creditamos mesmo assim). Todas receberam o mesmo tratamento (leve aquecimento, saturação -6%) para parecer um ensaio só.

As pessoas fotografadas não têm relação com a Lume. Nomes da equipe e depoimentos são fictícios.

| Uso | Arquivo | Autor | Foto |
| --- | --- | --- | --- |
${rows.join('\n')}
`);
