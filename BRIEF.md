Atue como dev front-end sênior com olho de diretor de arte.

## Missão
Construir nesta sessão a landing page completa da Lume Estética, com UMA pausa só (item 7c).

## Primeiro passo
Salve este briefing inteiro em BRIEF.md na raiz do repositório. Ele é a fonte única da verdade. Em dúvida, consulte o BRIEF, não decida por conta própria.

## Contexto
Projeto CONCEITUAL de portfólio da Hexo Studio: clínica de estética facial e corporal fictícia no Jardim Botânico, Ribeirão Preto. Landing de uma página para vender. Objetivo: agendar avaliação pelo WhatsApp ou pelo formulário. Os dados abaixo são fictícios e aprovados. Use exatamente esses, não crie outros. Número de WhatsApp: placeholder 5516999990000.

## Stack
Astro + Tailwind, saída estática, deploy na Vercel. GSAP + ScrollTrigger para motion. Componentes da 21st.dev permitidos se adaptados 100% a esta direção de arte.

## Direção de arte (fechada)
Conceito: a pele como luz de janela. As imagens aparecem por uma janela em arco que se abre conforme a rolagem.

Paleta (tokens):
- linho #F4EFE7: fundo principal
- areia #E8DFD2: seções alternadas
- cafe #2A2320: texto e fundo escuro
- argila #6A5D52: texto secundário (só sobre linho/areia)
- terracota #9A4E2E: CTA com texto branco, itálicos sobre fundo claro
- mel #D9A27A: itálicos/destaques SÓ sobre café
- pedra #B9AC9C: texto secundário sobre café

Tipografia (Google Fonts, self-host via @fontsource se possível):
- Fraunces variável: títulos em CAIXA ALTA peso 300, opsz 144, SOFT 50. Palavra de ligação em Fraunces Italic 300 minúscula, cor terracota (mel no escuro). Na copy abaixo, *asteriscos* = esse itálico.
- Hanken Grotesk: corpo 400; botões/labels 500; eyebrow caixa alta, 0.75rem, tracking 0.14em.
- Escala clamp 320→1440: H1 3rem→7rem lh .95; H2 2.25rem→4.5rem lh 1; H3 1.375→1.75rem; corpo 1→1.125rem lh 1.6. Parágrafos máx. 60ch.

Hero (100svh, grid 12 col, fundo linho):
- Col 1–7: eyebrow, H1 em 3 linhas à esquerda, subtítulo (máx. 52ch), CTA terracota + link de texto; na base, linha fina de dados separados por "·".
- Col 8–12: foto vertical (rosto, luz lateral) em ARCO (topo semicircular), 85% da altura. Cartão areia sobre a base do arco, à esquerda: "Primeira visita · Avaliação + limpeza · R$ 290".
- Mobile: texto, depois arco com 70vw; barra CTA fixa no rodapé "Agendar pelo WhatsApp" (terracota, some quando a seção de agendamento está visível).

Elemento-assinatura "janela que abre": ao rolar, o clip-path do arco do hero se expande até retângulo full-bleed (scrub ScrollTrigger, ~60vh, seção pinada). As outras imagens grandes (ritual, ambiente) entram como fresta em arco e abrem, sem scrub, ao entrar na tela. Títulos revelam linha a linha (y 100%→0, 0.9s, power3.out, stagger 0.08). Nível de motion: médio, nada além disso. prefers-reduced-motion: imagens já abertas, sem reveal.

NÃO FAZER: rosa millennial, dourado metalizado, gradientes, glassmorphism; cards com ícone em cima; estrelas; contadores animados; hero centralizado com overlay; antes e depois; emojis; sombras fortes; raio > 4px (exceto arco); modelo sorrindo pra câmera; seringa em close; sliders automáticos; popups; botão flutuante verde do WhatsApp; mais de 2 fontes; texto justificado.

## Conteúdo (copy final, não reescrever)
Header fixo (blur ao rolar): LUME · Tratamentos · O ritual · A clínica · Dúvidas · [Agendar avaliação]

1 Hero. Eyebrow: ESTÉTICA FACIAL E CORPORAL · RIBEIRÃO PRETO. H1: RESULTADO NATURAL / *é o nosso* / LUXO. Sub: Tratamentos faciais e corporais com avaliação por imagem, protocolo feito para a sua pele e uma hora inteira só sua. No Jardim Botânico. CTA: Agendar avaliação · link: Ver tratamentos ↓. Dados: Desde 2017 · +4.800 atendimentos · Avaliação com imagem da pele.

2 Abordagem. Eyebrow: A ABORDAGEM LUME. H2: O CAMINHO *até* A SUA MELHOR PELE. P1: Antes de qualquer procedimento, a gente olha. Analisamos a sua pele com imagem de alta resolução, entendemos a sua rotina e só então decidimos o que ela precisa. P2: Sem excesso, sem promessa milagrosa e sem rosto "feito". O resultado que buscamos é aquele que ninguém percebe de onde veio, só que você está bem. Pilares (só texto): Olhar antes de tratar · Protocolo sob medida · Acompanhamento de verdade.

3 Tratamentos (fundo areia; card = foto 4:5, categoria, nome, descrição, "duração · preço", link "Agendar este →" abrindo WhatsApp com "Olá! Quero agendar: {nome}"). Eyebrow: TRATAMENTOS. H2: CUIDADO *sob* MEDIDA.
- Facial · Limpeza de Pele Profunda: Higienização, esfoliação enzimática, extração cuidadosa e máscara calmante. 75 min · R$ 220
- Facial · Peeling de Renovação: Ácidos em concentração ajustada para textura, manchas e viço. 50 min · R$ 280
- Facial · Microagulhamento: Estímulo de colágeno para poros, cicatrizes de acne e firmeza. 60 min · R$ 450
- Facial · LED + Hidratação Profunda: Luz terapêutica e ativos hidratantes para a pele cansada ou sensibilizada. 40 min · R$ 160
- Corporal · Drenagem Linfática: Manobras lentas que desincham e devolvem leveza ao corpo. 60 min · R$ 190
- Corporal · Bioestimulador de Colágeno: Firmeza gradual e natural, com avaliação prévia obrigatória. Sob avaliação · a partir de R$ 1.800

4 Ritual (fundo café; imagem esquerda abrindo em arco). Eyebrow: A ASSINATURA. H2: RITUAL *de* LUZ. Texto: Nosso tratamento mais pedido. Noventa minutos de renovação enzimática, infusão de ceramidas, LED e massagem modeladora para devolver à pele a força da barreira e um brilho que dura semanas. Duração 90 min · Investimento R$ 390. CTA: Reservar o Ritual de Luz.

5 Como funciona. H2: TRÊS PASSOS, *sem* PRESSA. Números grandes em Fraunces itálico. 01 Avaliação: Conversa, imagem da pele e entendimento da sua rotina. 60 minutos. 02 Plano: Você sai com um protocolo escrito: o que fazer, em que ordem e quanto custa. 03 Acompanhamento: A cada sessão, comparamos a evolução e ajustamos o caminho.

6 Ambiente. Eyebrow: A CLÍNICA. H2: UMA HORA *que é só* SUA. Texto: Linho, pedra e luz filtrada. Cada sala foi pensada para desacelerar o seu pulso antes do primeiro toque. 4 colunas: Luz (difusa e quente, nunca direta) · Som (baixo, feito para sumir) · Aroma (botânicos suaves) · Toque (mãos firmes, toalhas aquecidas).

7 Equipe. H2: QUEM CUIDA *de* VOCÊ. Helena Prado, biomédica esteta, responsável técnica: Doze anos de pele, uma obsessão: resultado que parece seu. Marina Lopes, esteticista e terapeuta corporal: Especialista em drenagem e protocolos para pele sensível.

8 Depoimentos (Fraunces itálico grande, sem estrelas):
"Saí da avaliação entendendo minha pele pela primeira vez. Três meses depois, parei de usar base." Camila R., 34
"Fiz o bioestimulador com medo de ficar artificial. Ninguém notou o procedimento, só que eu estava descansada." Patrícia M., 47
"É o único lugar em que eu desligo o celular sem esforço." Juliana F., 29

9 Oferta (faixa terracota, texto branco). H2: PRIMEIRA VISITA *com* AVALIAÇÃO (itálico em linho). Texto: Avaliação com imagem + limpeza de pele profunda, com plano escrito para levar para casa. R$ 290 (de R$ 400). Botão linho/texto café: Quero agendar.

10 Dúvidas (acordeão acessível). H2: DÚVIDAS *antes da* PRIMEIRA VISITA.
- Preciso de avaliação antes de qualquer tratamento? Sim. Ela garante que o protocolo é o certo para você e evita gastar com o que a sua pele não precisa.
- Os procedimentos doem? A maioria é confortável. No microagulhamento usamos anestésico tópico.
- Tem tempo de recuperação? Limpeza, LED e drenagem não. Peeling e microagulhamento podem deixar a pele rosada por 1 a 3 dias.
- Em quanto tempo vejo resultado? Viço e hidratação aparecem na hora. Textura e firmeza levam de 4 a 12 semanas.
- Quais as formas de pagamento? Pix, débito e crédito em até 6x sem juros.
- Tem estacionamento? Sim, gratuito para clientes.

11 Agendamento (id="agendar"). H2: AGENDE *sem* PRESSA. Texto: Escolha o tratamento e o melhor período. A gente responde pelo WhatsApp em até 2 horas no horário comercial. Form: Nome, WhatsApp (máscara BR), Tratamento (select com os 6 + Ritual de Luz + Primeira visita), Melhor período (Manhã/Tarde/Noite), Mensagem opcional, botão "Enviar pelo WhatsApp". Valida, monta a mensagem e abre wa.me com texto encodado. Sem backend. Direita: Rua das Paineiras, 180 · Jardim Botânico · Ribeirão Preto, SP · Seg a sex, 9h–20h · Sáb, 9h–14h · (16) 99999-0000 · @lume.estetica · mapa Google embed lazy (facade clicável).

12 Footer (café). Wordmark LUME gigante na largura total · "Estética facial e corporal desde 2017" · âncoras · Instagram · "Projeto conceitual · Hexo Studio".

Imagens: baixe do Unsplash (licença livre) para /src/assets, com critério fixo: luz natural lateral, pele com textura real, tons quentes, mulheres de 25 a 50 com diversidade de tom de pele, close de mãos, produtos e ambiente de linho/pedra. Proibido: sorriso para câmera, seringa, estúdio com fundo branco. Aplique o mesmo tratamento em todas (leve aquecimento) para parecer um ensaio só. Registre autor e link de cada foto em CREDITOS.md. Se não achar foto boa para algum lugar, deixe espaço marcado e liste no relatório.

## Execução
a) Confira se as skills design-taste-frontend, motion-design e 21st-ui estão disponíveis. Carregue só essas, antes de escrever CSS. Se faltar alguma, avise e siga a direção escrita.
b) Monte o projeto, tokens no Tailwind (cores, fontes, espaçamento), dados em src/data/clinica.json (tratamentos, preços, contatos, FAQ, depoimentos, com "ficticio": true), header, hero e a animação da janela.
c) Faça push numa branch de prévia, envie o link da Vercel e PARE para minha aprovação. Esta é a única pausa.
d) Aprovado, construa todo o resto sem novas pausas: seções 2–12, formulário, SEO (title, meta, OG image, JSON-LD BeautySalon, sitemap), favicon, animações.
e) Loop visual: instale Playwright, tire print de 390px e 1440px da página inteira, compare com este brief e a lista NÃO FAZER, corrija. No máximo 2 rodadas.
f) Checagem final: WCAG 2.2 AA (contraste, foco visível, labels, navegação por teclado no acordeão e no form), responsivo 320–1920px, Lighthouse via CLI se der. Se não der, diga que não mediu. Nunca invente número.
g) Push da prévia final e relatório curto: o que foi feito, o que ficou marcado, links.

## Skills
- design-taste-frontend: no início (passo b) e no loop visual (passo e), para auditar contra a lista NÃO FAZER.
- motion-design: antes de escrever as animações GSAP (passos b e d).
- 21st-ui: só para acordeão do FAQ e campos do form, se houver componente que caiba na direção. Restilizar 100%.

## Padrões técnicos
Componentes Astro pequenos e nomeados por seção; conteúdo só no clinica.json; nenhum segredo no código; nenhum lorem ipsum; imagens via astro:assets em AVIF/WebP com width/height; hero ≤ 200 KB e com fetchpriority high; animação só com transform, opacity e clip-path; GSAP carregado só no cliente; prefers-reduced-motion respeitado; html lang="pt-BR".

## Critérios de aceite
- [ ] Hero igual à composição descrita em 1440px e 390px
- [ ] Arco do hero abre para full-bleed no scroll; imagens já abertas com reduced-motion
- [ ] Todos os CTAs abrem o WhatsApp com mensagem correta
- [ ] Form valida, monta e abre o WhatsApp com todos os campos
- [ ] Barra CTA fixa no mobile, some na seção de agendamento
- [ ] Copy idêntica ao brief, itálicos nas palavras marcadas
- [ ] Nenhum item da lista NÃO FAZER presente
- [ ] Contraste AA em todos os pares; foco visível
- [ ] Sem scroll horizontal de 320 a 1920px
- [ ] CREDITOS.md com todas as fotos

## Regras
Só pergunte se algo travar a execução. Avise se algum pedido prejudicar o resultado. Não invente dados, depoimentos ou números além dos deste brief.
