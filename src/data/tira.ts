// Fotos de la tira de la portada. Los cuadros miden 300 px (62vw en teléfono), así que la tira usa copias reducidas
// que genera `node scripts/tira.ts` en public/img/tira/<ancho>/; los originales quedan para /servicios y el catálogo.
import { servicios, type Foto } from './servicios.ts';

// Fotos propias que siguen a los servicios en la tira (decorativas, sin enlace); motion.ts repite todo hasta 36 cuadros
export const tira: Foto[] = [
  ['torres-entre-arboles', 'Dos torres vistas entre árboles', '50% 45%'],
  ['farol-de-noche', 'Farol de madera encendido de noche'],
  ['calle-de-hojas-amarillas', 'Vereda cubierta de hojas amarillas'],
  ['edificio-rojo-semaforo', 'Edificio de franjas rojas y celestes con un semáforo en rojo'],
  ['nubes-naranjas', 'Nubes naranjas al atardecer sobre los árboles'],
  ['castillo-y-puente', 'Puente de piedra frente a un castillo'],
  ['torre-azul-de-noche', 'Torre iluminada de azul de noche', '50% 25%'],
  ['lavamanos-floreado', 'Lavamanos de loza con flores pintadas'],
  ['palmera-cielo-rosado', 'Palmera a contraluz bajo un cielo rosado', '50% 70%'],
  ['autopista-elevada', 'Autopista elevada de noche'],
  ['farol-y-ventanas', 'Farol y dos ventanas contra el cielo azul'],
  ['torres-de-noche', 'Rascacielos iluminados de noche'],
  ['torre-con-reloj', 'Torre de iglesia con reloj contra el cielo azul', '50% 30%'],
  ['paso-bajo-nivel-niebla', 'Paso bajo nivel con niebla y luz naranja'],
  ['portal-barrio-chino', 'Portal decorado de un barrio chino'],
  ['nubes-al-atardecer', 'Nubes al atardecer sobre los árboles'],
  ['pieza-con-arena', 'Pieza abandonada con el piso cubierto de arena'],
  ['edificio-iluminado', 'Edificio alto con ventanas encendidas', '50% 40%'],
].map(([nombre, alt, posicion]) => ({ src: `/img/tira/${nombre}.webp`, alt, posicion }));

// 300 px a 1x, 1,5x y 2x; el teléfono de PageSpeed (62vw de 412 px a 1,75x) toma la de 480
export const anchos = [320, 480, 640];
export const sizes = '(max-width: 30rem) 62vw, 300px';
// El cuadro más alto de los temas (110, en themes.css) es 17:13; los demás (3:2, 2,39:1) caben dentro
export const proporcion = 17 / 13;

// Todas las fotos que pasan por la tira: las de los servicios y las de arriba
export const fotosTira = [...servicios.flatMap((s) => (s.foto ? [s.foto] : [])), ...tira];

const nombre = (src: string) => src.split('/').pop()!;
const copia = (src: string, ancho: number) => `/img/tira/${ancho}/${nombre(src)}`;
export const enTira = (f: Foto) => ({
  ...f, src: copia(f.src, anchos.at(-1)!), srcset: anchos.map((a) => `${copia(f.src, a)} ${a}w`).join(', '),
});

// Recorte a la proporción del cuadro más alto, en el mismo object-position de la foto: con object-fit: cover el
// porcentaje se compone (p·(H−Hc) + p·(Hc−h) = p·(H−h)), así cualquier cuadro muestra lo mismo que con el original.
export function recorte(ancho: number, alto: number, posicion = '50% 50%') {
  const [px, py] = posicion.split(' ').map((v) => parseFloat(v) / 100);
  const width = Math.min(ancho, Math.round(alto * proporcion)), height = Math.min(alto, Math.round(ancho / proporcion));
  return { left: Math.round(px * (ancho - width)), top: Math.round(py * (alto - height)), width, height };
}
