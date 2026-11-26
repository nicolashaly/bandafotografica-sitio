import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const productos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productos' }),
  schema: z.object({
    nombre: z.string(),
    resumen: z.string(),
    categoria: z.enum(['Rollos y película', 'Cámaras', 'Impresión', 'Marcos', 'Pilas y baterías']),
    precio: z.number().optional(), // CLP; sin precio se cotiza por WhatsApp
    tabla: z.string().optional(), // id de un servicio (servicios.ts) cuya lista de precios se muestra en la ficha
    opciones: z.array(z.object({ nombre: z.string(), precio: z.number() })).default([]), // variantes con su precio (CLP)
    imagen: z.object({ src: z.string(), alt: z.string() }).optional(),
    mas: z.array(z.object({ src: z.string(), alt: z.string() })).default([]), // fotos extra en la ficha (p. ej. la parte trasera)
    orden: z.number().default(99),
    junto: z.array(reference('productos')).default([]), // se muestran como "Se lleva junto con" en la ficha
    mayor: z.boolean().default(false), // muestra "precio por mayor: consulta por WhatsApp"
    ejemplo: z.boolean().default(false), // contenido provisorio a reemplazar
  }),
});

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    fecha: z.coerce.date(),
    fuente: z.object({ nombre: z.string(), url: z.string().url() }).optional(), // notas basadas en una noticia externa
    ejemplo: z.boolean().default(false),
  }),
});

export const collections = { productos, noticias };
