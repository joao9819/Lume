const fs = require('fs');
const path = require('path');
const { files } = JSON.parse(fs.readFileSync('.photo-scratch/request.json', 'utf8'));
(async () => {
  for (const [dest, url] of Object.entries(files)) {
    const r = await fetch(url);
    if (!r.ok) { console.log('falhou', dest, r.status); process.exitCode = 1; continue; }
    const p = path.join('.photo-scratch', dest);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, Buffer.from(await r.arrayBuffer()));
    console.log('ok', dest);
  }
})();
