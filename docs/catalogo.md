# Catálogo: cómo agregar y editar productos

Un producto = un archivo en `src/content/productos/<slug>.md` (esquema en `src/content.config.ts`). Hoy hay 24, todos con precio.

## Campos

- `categoria`: Cámaras, Rollos y película, Impresión, Marcos, Pilas y baterías. `/catalogo/` agrupa por categoría con atajos arriba (anclas, sin JS).
- `orden`: define el orden dentro de la categoría y el de las categorías (Cámaras 1–3, Rollos 4–5, Impresión 6, Marcos 7–17 de menor a mayor medida, Pilas 18–24). La portada muestra los 4 primeros.
- `precio` (CLP). Sin precio sale "Precio por WhatsApp". `opciones` (nombre y precio) muestra "Desde" y un "Pedir" por opción (ej. portarretratos pastel). `tabla: impresion` muestra la lista de precios de `servicios.ts` en la ficha.
- `mayor: true` agrega el enlace de precio por mayor (pilas, rollo, película).
- `junto`: otros productos que se llevan juntos; la ficha muestra "Se lleva junto con" y un pedido conjunto por WhatsApp. Al agregar los álbumes Instax, vincularlos con la Instax Mini 12, la película y los portarretratos pastel.
- `imagen` (foto principal) y `mas` (otras, la trasera como `<slug>-atras.webp`).

## Fotos

- WebP 1200×1500 (4:5) en `public/img/productos/`, sin recortar: se encaja la foto y se estiran los bordes del fondo (sharp `resize` con `fit: 'inside'` y luego `extend` con `extendWith: 'copy'`). sharp ya está en `node_modules`.
- Los HEIC y DNG del iPhone se convierten antes con los códecs de Windows (WPF `BitmapDecoder` desde PowerShell), porque sharp no lee HEVC.

## Problemas conocidos

- Si el servidor de desarrollo falla después de cambiar el esquema, borrar `.astro/data-store.json` y reiniciar.
- Un `resumen` con ": " va entre comillas en el YAML.
