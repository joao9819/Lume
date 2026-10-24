/**
 * Motion da Lume (carregado só no cliente, só sem prefers-reduced-motion).
 * Personalidade: premium e calma. Uma curva (power3.out), três durações (0.6 / 0.9 / 1.2s).
 * Só transform, opacity e clip-path.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';
const root = document.documentElement;

type Box = { t: number; r: number; b: number; l: number; w: number; h: number };

/** Posição de `el` relativa a `frame`, em px. */
const box = (el: Element, frame: Element): Box => {
  const a = el.getBoundingClientRect();
  const f = frame.getBoundingClientRect();
  return { t: a.top - f.top, r: f.right - a.right, b: f.bottom - a.bottom, l: a.left - f.left, w: a.width, h: a.height };
};

const archClip = (t: number, r: number, b: number, l: number, rad: number) =>
  `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px ${rad}px 0px 0px)`;

/* 1. Títulos linha a linha */
function titles() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((title) => {
    const lines = title.querySelectorAll('.line > span');
    const isHero = !!title.closest('[data-hero]');
    gsap.fromTo(
      lines,
      { y: 0, yPercent: 100 },
      {
        y: 0,
        yPercent: 0,
        duration: 0.9,
        ease: EASE,
        stagger: 0.08,
        delay: isHero ? 0.15 : 0,
        scrollTrigger: isHero ? undefined : { trigger: title, start: 'top 85%', once: true },
      },
    );
  });
}

/* 2. Assinatura: a janela do hero abre até full-bleed (scrub, seção pinada ~60vh) */
function heroWindow() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const media = hero?.querySelector<HTMLElement>('[data-hero-media]');
  const win = hero?.querySelector<HTMLElement>('[data-hero-window]');
  if (!hero || !media || !win) return;

  const img = media.querySelector('img');
  const fades = hero.querySelectorAll('[data-hero-content], [data-hero-card]');

  // Entrada do hero: texto de apoio sobe junto com o título
  gsap.fromTo(
    hero.querySelectorAll('[data-fade]'),
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.08, delay: 0.35 },
  );
  gsap.fromTo('[data-hero-card]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: EASE, delay: 0.7 });

  const from = () => {
    const w = box(win, hero);
    return archClip(w.t, w.r, w.b, w.l, w.w / 2);
  };
  // Alvo: retângulo do tamanho da janela visível (base do hero), cantos retos
  const to = () => {
    const extra = Math.max(0, hero.offsetHeight - window.innerHeight);
    return archClip(extra, 0, 0, 0, 0);
  };

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: hero,
      start: 'bottom bottom',
      end: () => `+=${window.innerHeight * 0.6}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });
  tl.fromTo(media, { clipPath: from }, { clipPath: to, ease: 'power1.inOut' }, 0);
  if (img) tl.fromTo(img, { scale: 1.06 }, { scale: 1, ease: 'power1.out' }, 0);
  tl.to(fades, { opacity: 0, y: -32, duration: 0.45, ease: 'power1.in' }, 0);
}

/* 3. Imagens grandes (ritual, ambiente): fresta em arco que abre ao entrar, sem scrub */
function slits() {
  gsap.utils.toArray<HTMLElement>('[data-slit]').forEach((el) => {
    const img = el.querySelector('img');
    const shape = () => {
      const { width: w } = el.getBoundingClientRect();
      const slit = w * 0.42;
      return {
        from: archClip(0, slit, 0, slit, (w - 2 * slit) / 2),
        to: archClip(0, 0, 0, 0, w / 2),
      };
    };
    const s = shape();
    gsap.set(el, { clipPath: s.from });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        const t = shape();
        gsap.fromTo(el, { clipPath: t.from }, { clipPath: t.to, duration: 1.2, ease: 'power3.inOut', onComplete: () => gsap.set(el, { clipPath: 'none' }) });
        if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: EASE });
      },
    });
  });
}

/* 4. Blocos de texto e cartões: entrada curta */
function rises() {
  ScrollTrigger.batch('[data-rise]', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.fromTo(batch, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: EASE, stagger: 0.06 }),
  });
}

const start = () => {
  titles();
  heroWindow();
  slits();
  rises();
  root.classList.add('motion-ready');
  ScrollTrigger.refresh();
};

if (document.fonts?.ready) document.fonts.ready.then(start);
else start();
