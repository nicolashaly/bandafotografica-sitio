# 0002 Temas por tipo de película

**Fecha:** 2026-11-02 · **Estado:** aceptada (reemplaza a los temas analógico, minimalista y clásico)

El visitante elige el tema y la elección queda guardada en su navegador. Idea del usuario: que los temas sean tipos de rollo. Hay cuatro: `35mm` (35 mm color, por defecto, vive en `:root`), `bn` (blanco y negro), `cine` y `110`. Cada tema cambia colores, fuentes, proporción del cuadro (`--frame-ratio`), perforaciones, rótulo del borde (`--edge-label`) y filtro de fotos.

- En modo oscuro automático: 35 mm pasa a cuarto oscuro, BN a negativo (tira clara) y 110 a café oscuro. Cine es siempre oscuro.
- Los colores se inspiran en el tipo de película, no en una marca, para no imitar imagen comercial ajena.
  - **Excepción (2026-11-03):** el rollo al borde izquierdo de la tira de la portada es una foto propia de un rollo Kodak 400 real, que el usuario pidió usar tal cual (`public/img/rollo.webp`). Es una foto de producto. El diseño de Kodak no se redibuja con código y el rollo es igual en todos los temas.
- Descartados por ahora: diapositiva y medio formato 120. Agregarlos es un bloque nuevo en `themes.css` más una entrada en `Header.astro`.
- La identidad de la portada es la "hoja de contactos": los servicios son cuadros de una tira de película y el primero con foto lleva una marca de lápiz graso.
