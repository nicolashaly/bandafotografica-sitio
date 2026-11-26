// Datos del local: lo único que hay que editar cuando cambia un teléfono, el horario o la cuenta.
import { servicios } from './servicios.ts';

export const negocio = {
  nombre: 'Banda Fotográfica',
  ciudad: 'Talagante',
  direccion: 'Av. Bernardo O’Higgins 997',
  comuna: 'Talagante, Región Metropolitana',
  codigoPostal: '9670000',
  mapa: "https://www.google.com/maps/search/?api=1&query=Av.+Bernardo+O'Higgins+997,+Talagante",
  mapaEmbed: "https://www.google.com/maps?q=Av.+Bernardo+O'Higgins+997,+Talagante,+Chile&output=embed",
  whatsapp: '56971889041',
  movil: '+56 9 7188 9041',
  email: 'fotografiatalagante@gmail.com',
  instagram: 'https://www.instagram.com/bandafotografica/',
};

// Tramos de atención por día (0 = domingo). Colación = hueco entre tramos.
// El horario puede cambiar con verano/invierno: editar aquí y en `horarioCorto`.
const jornada: [string, string][] = [['10:00', '14:00'], ['15:00', '19:00']];
export const semana: Record<number, [string, string][]> = { 1: jornada, 2: jornada, 3: jornada, 4: jornada, 5: jornada, 6: jornada, 0: [] };

// Resumen para el pie y para cuando no hay JavaScript.
export const horarioCorto = 'Lunes a sábado, 10:00 a 19:00';

// false = el sitio sale sin catálogo: sin páginas /catalogo/, sin enlaces ni sección en el inicio. Poner true cuando estén los productos reales.
export const conCatalogo = true;

// Ancla de una categoría en /catalogo/ ("Pilas y baterías" → "pilas-y-baterias")
export const ancla = (texto: string) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const precioCLP = (n: number) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

type ConPrecio = { precio?: number; opciones?: { precio: number }[]; tabla?: string };

// Precios variables de un producto: sus opciones o la lista de precios del servicio que muestra
const variantes = (p: ConPrecio) => [
  ...(p.opciones ?? []).map((o) => o.precio),
  ...(servicios.find((s) => s.id === p.tabla)?.precios ?? []).map((x) => x.copia),
];

// Precio de un producto: con opciones o lista de precios, el más bajo; sin precio, se cotiza por WhatsApp
export function precioTexto(p: ConPrecio) {
  const desde = variantes(p);
  if (desde.length) return `Desde ${precioCLP(Math.min(...desde))}`;
  return p.precio ? precioCLP(p.precio) : 'Precio por WhatsApp';
}

// `offers` de schema.org con los mismos precios que precioTexto; sin precio no hay oferta
export function ofertaProducto(p: ConPrecio) {
  const desde = variantes(p);
  if (desde.length) return { '@type': 'AggregateOffer', priceCurrency: 'CLP', lowPrice: Math.min(...desde), highPrice: Math.max(...desde), offerCount: desde.length };
  return p.precio ? { '@type': 'Offer', priceCurrency: 'CLP', price: p.precio } : undefined;
}

// Correo para cotizaciones, con el asunto ya escrito
export const linkCorreo = (asunto = 'Cotización') => `mailto:${negocio.email}?subject=${encodeURIComponent(asunto)}`;

export function linkWhatsapp(texto = 'Hola, quería consultar por') {
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto)}`;
}
