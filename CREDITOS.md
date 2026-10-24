# Créditos das fotos

Ainda não há fotos nesta versão. O ambiente de desenvolvimento não tem acesso de rede ao Unsplash (`unsplash.com`, `images.unsplash.com` e `api.unsplash.com` bloqueados), e o site do Unsplash barra acesso automatizado.

Fluxo para incluir as fotos, com o mesmo tratamento para todas e este arquivo gerado automaticamente:

1. Preencher `scripts/photo-picks.json` com o ID de cada foto (o trecho final da URL `unsplash.com/photos/...`).
2. `UNSPLASH_ACCESS_KEY=... node scripts/fetch-photos.mjs fetch`

## Pendentes (espaço marcado na página)

- Hero (janela em arco que abre) (`hero`)
- Ritual de Luz (`ritual`)
- A clínica (`ambiente`)
- Limpeza de Pele Profunda (`tratamento-limpeza`)
- Peeling de Renovação (`tratamento-peeling`)
- Microagulhamento (`tratamento-microagulhamento`)
- LED + Hidratação Profunda (`tratamento-led`)
- Drenagem Linfática (`tratamento-drenagem`)
- Bioestimulador de Colágeno (`tratamento-bioestimulador`)
- Equipe: Helena Prado (`equipe-helena`)
- Equipe: Marina Lopes (`equipe-marina`)
