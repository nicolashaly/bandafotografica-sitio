// Servicios del local. Del sitio anterior solo se tomó qué se ofrece; los textos son propios.
// `cuadro` es el número que el servicio lleva en la tira de la portada.
// `foto` (la de la tira) y `mas` (fotos de ejemplo junto a cada servicio) son fotos propias, salvo las de Fotos para trámites (Pexels).

export type Foto = { src: string; alt: string; posicion?: string };
// Lista de precios de un servicio (CLP): copia por unidad, copia desde una foto en papel (si cambia),
// precio sobre 100 copias y cuadro (uno o un rango)
type Precio = { medida: string; copia: number; desdePapel?: number; sobre100?: number; cuadro?: [number] | [number, number] };

export const servicios: {
  id: string; cuadro: string; nombre: string; linea: string; traes: string; llevas: string; items: string[]; foto?: Foto; mas?: Foto[]; precios?: Precio[];
}[] = [
  {
    id: 'documentos',
    cuadro: '1A',
    nombre: 'Fotos para trámites',
    linea: 'Cada trámite pide su medida y su fondo. Tú te sientas, del resto nos encargamos nosotros.',
    traes: 'Tu cara y, si lo tienes, el requisito del trámite en el celular.',
    llevas: 'Las fotos impresas en el formato que te pidieron.',
    items: ['Carnet', 'Pasaporte y visa', 'Permisos y otros trámites'],
    // Fotos de Pexels (licencia Pexels: gratis, sin atribución obligatoria) hasta tener las del mesón:
    // pexels.com/photo/19601394 (Tran Nhu Tuan) y pexels.com/photo/36652029 (Muhammad Arif)
    // En la tira la foto parte en negativo y una cara invertida asusta: ahí va la cámara, los retratos solo en `mas`
    foto: { src: '/img/productos/camara-soligor-48mp.webp', alt: 'Cámara digital Soligor de 48 megapíxeles sobre su caja' },
    mas: [
      { src: '/img/servicios/retrato-carnet-fondo-blanco.webp', alt: 'Retrato tipo carnet de una mujer con camisa blanca sobre fondo blanco', posicion: '50% 30%' },
      { src: '/img/servicios/retrato-pasaporte-fondo-celeste.webp', alt: 'Retrato tipo pasaporte de un hombre con camisa beige sobre fondo celeste', posicion: '50% 30%' },
    ],
  },
  {
    id: 'revelado',
    cuadro: '2A',
    nombre: 'Copias y fotos antiguas',
    linea: 'Esa foto que solo existe en tu celular merece papel. Y la de la familia, doblada en una esquina, también tiene arreglo.',
    traes: 'Las fotos en el celular o en un pendrive. O la foto vieja, tal como esté.',
    llevas: 'Copias en papel, o la foto antigua retocada.',
    items: ['Copias desde el celular o la cámara', 'Retoque', 'Restauración de fotos antiguas'],
    foto: { src: '/img/servicios/atardecer-en-la-costa.webp', alt: 'Atardecer sobre las rocas en la orilla del mar' },
    mas: [
      { src: '/img/servicios/torre-con-reloj.webp', alt: 'Torre de iglesia con reloj contra el cielo azul', posicion: '50% 30%' },
      { src: '/img/servicios/palmera-cielo-rosado.webp', alt: 'Palmera a contraluz bajo un cielo rosado', posicion: '50% 70%' },
    ],
  },
  {
    id: 'analogico',
    cuadro: '3A',
    nombre: 'Rollos y negativos',
    linea: '¿Sigues disparando con película? La revelamos. ¿Tienes negativos guardados en un cajón? Los pasamos a digital.',
    traes: 'El rollo rebobinado hasta el final, o tus negativos.',
    llevas: 'Los negativos revelados y, si quieres, las fotos escaneadas.',
    items: ['Revelado de rollos', 'Escaneo de negativos', 'Venta de rollos'],
    foto: { src: '/img/productos/rollo-fujifilm-200.webp', alt: 'Caja del rollo Fujifilm 200 de 36 exposiciones' },
    mas: [
      { src: '/img/productos/camara-premier-pc-640.webp', alt: 'Cámara de rollo Premier PC-640 sobre su caja' },
      { src: '/img/productos/camara-premier-pc-640-atras.webp', alt: 'Parte trasera de la cámara Premier PC-640, con la tapa del rollo' },
    ],
  },
  {
    id: 'impresion',
    cuadro: '4A',
    nombre: 'Impresión y marcos',
    linea: 'Del celular al papel, y del papel a la pared. Eliges el tamaño y, si quieres, el marco.',
    traes: 'La foto, o lo que quieras enmarcar.',
    llevas: 'La copia impresa o el cuadro listo para colgar.',
    items: ['Copias en varios tamaños', 'Alta resolución', 'Productos con tu foto', 'Enmarcado'],
    precios: [
      { medida: '10x15', copia: 800, desdePapel: 1000, sobre100: 450, cuadro: [3000, 3500] },
      { medida: '13x18', copia: 1000, desdePapel: 1500, sobre100: 600, cuadro: [3990] },
      { medida: '15x21', copia: 2000, cuadro: [3990, 4990] },
      { medida: '20x30', copia: 3500, cuadro: [3990, 4990] },
      { medida: '30x40', copia: 6500, cuadro: [6990] },
      { medida: '40x50', copia: 9990, cuadro: [11990] },
      { medida: '50x60', copia: 10990, cuadro: [12990] },
      { medida: '50x70', copia: 13490, cuadro: [14990] },
      { medida: '60x100', copia: 19990 },
    ],
    foto: { src: '/img/productos/portarretratos-colores.webp', alt: 'Cuatro portarretratos de colores con láminas ilustradas' },
    mas: [
      { src: '/img/productos/portarretratos-madera-13x18.webp', alt: 'Portarretratos de madera con una foto de dos torres entre árboles' },
      { src: '/img/servicios/edificio-rojo-semaforo.webp', alt: 'Edificio de franjas rojas y celestes con un semáforo en rojo' },
    ],
  },
];
