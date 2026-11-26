// Animación del sitio (estilos en src/styles/motion.css). Solo actúa si Base.astro puso html.anim.

// La tira de la portada: un rollo de 36 cuadros que se arrastra con el mouse o el dedo. Con animación además avanza solo,
// y al bajar por la página entra al rollo (al subir, sale). Va antes que el resto para que las copias también se revelen.
const tira = document.querySelector<HTMLElement>('.tira');
const cinta = tira?.querySelector<HTMLElement>('.tira-cuadros');
if (tira && cinta) {
  // Copias de los cuadros (servicios y fotos de index.astro) numeradas como un negativo; solo los servicios se leen y se recorren con el teclado
  const originales = [...cinta.children];
  for (let n = originales.length; n < 36; n++) {
    const copia = originales[n % originales.length].cloneNode(true) as HTMLElement;
    copia.setAttribute('aria-hidden', 'true');
    copia.querySelector('a')?.setAttribute('tabindex', '-1');
    copia.querySelector('.lapiz')?.remove();
    copia.querySelector('.marcado')?.classList.remove('marcado');
    copia.querySelector('.cuadro-borde')!.textContent = String(n + 1);
    copia.querySelector('.cuadro-flecha')!.textContent = `▶${n + 1}A`;
    cinta.append(copia);
  }

  // El borde perforado acompaña a la cinta
  let pos = 0; // posición con decimales (scrollLeft se redondea)
  cinta.addEventListener('scroll', () => {
    if (Math.abs(cinta.scrollLeft - pos) > 1) pos = cinta.scrollLeft; // la movió algo distinto del avance automático
    tira.style.setProperty('--corre', String(cinta.scrollLeft));
  }, { passive: true });

  // Arrastrar con el mouse (con el dedo ya se desliza sola); si se arrastró, el clic no abre el cuadro
  let arrastre: { x: number; desde: number; movio: boolean } | null = null;
  let anularClic = false;
  cinta.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button === 0) arrastre = { x: e.clientX, desde: cinta.scrollLeft, movio: false };
  });
  addEventListener('pointermove', (e) => {
    if (!arrastre) return;
    const dx = e.clientX - arrastre.x;
    if (!arrastre.movio && Math.abs(dx) > 4) { arrastre.movio = true; cinta.classList.add('arrastrando'); }
    if (arrastre.movio) cinta.scrollLeft = arrastre.desde - dx;
  });
  addEventListener('pointerup', () => {
    anularClic = !!arrastre?.movio;
    arrastre = null;
    cinta.classList.remove('arrastrando');
  });
  cinta.addEventListener('click', (e) => { if (anularClic) { e.preventDefault(); anularClic = false; } }, true);
  cinta.addEventListener('dragstart', (e) => e.preventDefault());

  if (document.documentElement.classList.contains('anim')) {
    const velocidad = 18; // px por segundo
    let quietaHasta = 0;
    let mouseEncima = false, conFoco = false, enPantalla = true;
    const pausar = (ms: number) => { quietaHasta = performance.now() + ms; };
    cinta.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') mouseEncima = true; });
    cinta.addEventListener('pointerleave', () => { mouseEncima = false; });
    cinta.addEventListener('touchstart', () => pausar(1e9), { passive: true });
    cinta.addEventListener('touchend', () => pausar(2500), { passive: true });
    cinta.addEventListener('focusin', () => { conFoco = true; });
    cinta.addEventListener('focusout', () => { conFoco = false; });
    new IntersectionObserver(([e]) => { enPantalla = e.isIntersecting; }).observe(tira);

    let antes = performance.now();
    const avanzar = (t: number) => {
      const dt = Math.min(t - antes, 100);
      antes = t;
      if (enPantalla && !mouseEncima && !conFoco && !arrastre && t > quietaHasta) {
        if (pos >= cinta.scrollWidth - cinta.clientWidth - 1) {
          cinta.scrollTo({ left: 0, behavior: 'smooth' }); // al final del rollo, rebobina
          pausar(3000);
        } else {
          pos += (velocidad * dt) / 1000;
          cinta.scrollLeft = pos;
        }
      }
      requestAnimationFrame(avanzar);
    };
    requestAnimationFrame(avanzar);

    // Al bajar por la página la cinta entra al rollo; al subir, sale
    let y = scrollY;
    addEventListener('scroll', () => {
      pos = Math.min(Math.max(pos + (scrollY - y) * 0.25, 0), cinta.scrollWidth - cinta.clientWidth);
      y = scrollY;
      cinta.scrollLeft = pos;
    }, { passive: true });
  }
}

if (document.documentElement.classList.contains('anim')) {
  // Titulares palabra por palabra
  document.querySelectorAll<HTMLElement>('.hero h1, .pagina-cabeza h1, .ficha-texto h1').forEach((h1) => {
    const palabras = h1.textContent!.trim().split(/\s+/).map((texto, k) => {
      const caja = document.createElement('span');
      const palabra = document.createElement('span');
      caja.className = 'w';
      palabra.style.setProperty('--k', String(k));
      palabra.textContent = texto;
      caja.append(palabra);
      return caja;
    });
    h1.replaceChildren(...palabras.flatMap((p, k) => (k ? [' ', p] : [p])));
  });

  // Bloques y fotos entran al aparecer en pantalla; --i escalona los hermanos
  const io = new IntersectionObserver((entradas) => entradas.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visto');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
  document.querySelectorAll<HTMLElement>(
    '.hero-pie > *, .pagina-cabeza > :not(h1, .titulo-nota), .titulo-nota > span, .ficha-texto > :not(h1), .cuadro, [data-slot], .cabeza-seccion, .orden, .producto, .paso, .nota, .visita > *',
  ).forEach((el) => {
    if (el.closest('.tira-cuadros > [aria-hidden]')) return; // las copias de la tira entran ya reveladas, sin hueco al aparecer
    const base = el.closest('li') ?? el;
    el.style.setProperty('--i', String(Math.min([...base.parentElement!.children].indexOf(base), 6)));
    el.classList.add('rv');
    io.observe(el);
  });

  // Linterna: sigue al mouse sobre la tira
  const tira = document.querySelector<HTMLElement>('.tira');
  if (tira) {
    tira.addEventListener('pointermove', (e) => {
      const r = tira.getBoundingClientRect();
      tira.style.setProperty('--x', `${e.clientX - r.left}px`);
      tira.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  }

  // Las tres cubetas: la línea de .pasos se llena con el scroll y cada paso se revela cuando le llega
  document.querySelectorAll<HTMLElement>('.pasos').forEach((pasos) => {
    const lista = [...pasos.querySelectorAll<HTMLElement>('.paso')];
    let pendiente = false;
    const medir = () => {
      const r = pasos.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3)));
      pasos.style.setProperty('--p', p.toFixed(3));
      lista.forEach((el, i) => el.classList.toggle('lleno', p >= i / lista.length + 0.06));
      pendiente = false;
    };
    pasos.classList.add('cubetas-activas');
    addEventListener('scroll', () => { if (!pendiente) { pendiente = true; requestAnimationFrame(medir); } }, { passive: true });
    medir();
  });
}

