// Genera las copias reducidas de la tira de la portada (src/data/tira.ts): `node scripts/tira.ts`.
// Volver a correrlo al cambiar o agregar una foto de la tira o la foto de un servicio.
import { mkdirSync } from 'node:fs';
import sharp from 'sharp'; // viene con Astro
import { fotosTira, anchos, recorte } from '../src/data/tira.ts';

const nombres = fotosTira.map((f) => f.src.split('/').pop());
if (new Set(nombres).size !== nombres.length) throw new Error('Dos fotos de la tira con el mismo nombre');

for (const a of anchos) mkdirSync(`public/img/tira/${a}`, { recursive: true });
for (const f of fotosTira) {
  const origen = `public${f.src}`;
  const { width = 0, height = 0 } = await sharp(origen).metadata();
  const r = recorte(width, height, f.posicion);
  for (const a of anchos) {
    const destino = `public/img/tira/${a}/${f.src.split('/').pop()}`;
    const { size } = await sharp(origen).extract(r).resize({ width: a, withoutEnlargement: true }).webp({ quality: 75, effort: 6 }).toFile(destino);
    console.log(destino, Math.round(size / 1024), 'KB');
  }
}
