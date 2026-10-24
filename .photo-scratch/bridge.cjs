const sharp = require('sharp');
const fs = require('fs');
const dir = '.photo-scratch';
const req = JSON.parse(fs.readFileSync(`${dir}/request.json`));
const get = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(`${r.status} ${u}`); return Buffer.from(await r.arrayBuffer()); };
(async () => {
  if (req.mode === 'sheets') {
    fs.mkdirSync(`${dir}/sheets`, { recursive: true });
    for (const slot of req.slots) {
      const items = JSON.parse(await get(`${req.base}/results/${slot}.json`));
      fs.writeFileSync(`${dir}/sheets/${slot}.json`, JSON.stringify(items.map((p, i) => ({ i, ...p })), null, 1));
      const W = 220, H = 275, cols = 6, tiles = [];
      await Promise.all(items.map(async (it, i) => {
        const img = await sharp(await get(it.raw + '&w=440&q=55&fm=jpg&fit=max')).resize(W, H, { fit: 'contain', background: '#222' }).toBuffer();
        const label = Buffer.from(`<svg width="40" height="28"><rect width="40" height="28" fill="#000"/><text x="5" y="21" font-size="19" fill="#fff" font-family="DejaVu Sans">${i}</text></svg>`);
        tiles.push({ input: await sharp(img).composite([{ input: label, left: 0, top: 0 }]).toBuffer(), left: (i % cols) * W, top: Math.floor(i / cols) * H });
      }));
      await sharp({ create: { width: cols * W, height: Math.ceil(items.length / cols) * H, channels: 3, background: '#111' } })
        .composite(tiles).jpeg({ quality: 60 }).toFile(`${dir}/sheets/${slot}.jpg`);
      console.log(slot, items.length);
    }
  }
  if (req.mode === 'download') {
    fs.mkdirSync(`${dir}/raw`, { recursive: true });
    for (const [slot, raw] of Object.entries(req.picks)) {
      fs.writeFileSync(`${dir}/raw/${slot}.jpg`, await get(raw + '&w=2400&q=88&fm=jpg&fit=max'));
      console.log('ok', slot);
    }
  }
})().catch((e) => { console.error(e); process.exit(1); });
