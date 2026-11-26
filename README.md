# Banda Fotográfica: sitio web

Sitio web de Banda Fotográfica, una tienda de fotografía en Talagante, Chile. Está publicado en **https://bandafotografica.cl**.

> Este repositorio es una copia pública del proyecto, para mostrar el código. El desarrollo sigue en un repositorio privado.

## Qué tiene

- Catálogo de productos con precios, agrupado por categoría. Cada producto es un archivo Markdown, así que se agrega uno sin tocar código.
- Servicios con su lista de precios de impresión.
- Horario en vivo: indica si el local está abierto, en colación o cerrado, y considera los feriados de Chile.
- Pedidos y reservas por WhatsApp.
- SEO: datos estructurados de tienda y productos, sitemap y una imagen por producto para compartir.

## Tecnologías

- **[Astro](https://astro.build)** con TypeScript, sitio estático.
- **Cloudflare Pages:** cada cambio en la rama principal se publica solo.
- **GitHub Actions:** corre las pruebas y el build en cada cambio.
- **Dependabot:** actualizaciones de dependencias.

## Cómo probarlo

Necesitas Node.js 24 (mínimo 22.23).

```
npm install
npm run dev      # http://localhost:4321
npm test         # pruebas de horario, precios y catálogo
npm run build    # genera dist/
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Teléfonos, dirección, horario y correo | `src/data/negocio.ts` |
| Servicios y lista de precios de impresión | `src/data/servicios.ts` |
| Productos del catálogo (uno por archivo) | `src/content/productos/*.md` |
| Noticias (una por archivo) | `src/content/noticias/*.md` |
| Temas de color | `src/styles/themes.css` |
| Logo e íconos | `marca/` |

Más detalle en [`docs/architecture/overview.md`](docs/architecture/overview.md) y en las decisiones de [`docs/decisions/`](docs/decisions/).

## Autor

Nicolás Haly Arroyo. Las fotos de productos son propias, salvo dos de "Fotos para trámites", que son de Pexels.
