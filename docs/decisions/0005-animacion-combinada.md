# 0005 Animación combinada

**Fecha:** 2026-11-03 · **Estado:** aceptada

El usuario quería un sitio más memorable y propuso usar React Bits, Spline, Manus y Refero Styles. Se probaron tres direcciones en una demo temporal (revelado, rollo en marcha, cuarto oscuro) y eligió combinarlas. Toda la animación sale de la identidad de película del sitio, no de efectos genéricos.

- **Sin dependencias:** CSS (`src/styles/motion.css`) y un script chico (`src/scripts/motion.ts`). React Bits obligaba a agregar React a un sitio Astro sin React, y Spline pesa mucho en celular y requiere diseñar la escena aparte. Refero y Manus sirvieron solo como referencia.
- **Qué hace:**
  - Luz roja de cuarto oscuro al entrar.
  - Titulares palabra por palabra.
  - En la tira de la portada, las fotos pasan de negativo a positivo en 3 s: se quedan en negativo hasta los 0,7 s y después cambian lento con `ease-in-out`. Es un ajuste pedido por el usuario.
  - La tira es un rollo de 36 cuadros (los 4 servicios y copias numeradas del 5 al 36, ocultas para lectores de pantalla). Avanza sola a 18 px/s, se pausa con el mouse encima o con foco, se arrastra con el mouse (cursor de mano) o con el dedo, al llegar al final se rebobina, y al hacer scroll entra al rollo. Sin animación solo queda el arrastre. Las perforaciones siguen a la cinta con `--corre` (2026-11-22).
  - En computador, una linterna sobre la tira.
  - El lápiz graso se dibuja solo.
  - El resto de las fotos se revela desde el sepia y los bloques suben al aparecer.
  - El cambio de tema pasa como un rollo que avanza.
  - Grano de película suave.
- **Luz roja solo en la primera página de la sesión** (`sessionStorage('revelado')`, clase `html.primera`), para no cansar.
- **Accesibilidad:** sin `prefers-reduced-motion: no-preference` no se pone `html.anim` y no se anima nada. Sin JavaScript todo se ve, porque lo que oculta contenido (`.rv`) lo agrega el script.
- **Secciones (2026-11-03):** después de probar una demo, el usuario eligió seis ideas más:
  - **Sello y talón (órdenes):** el número es un timbre de tinta y el talón se separa al pasar el mouse.
  - **Copias secándose (productos):** cuelgan de un cordel con pinzas y se mecen.
  - **Las tres cubetas (pasos):** una línea se llena con el scroll y revela cada paso. Sin script se ve llena.
  - **Fecha impresa (notas):** la fecha se ve como '26 10 28 (`Fecha.astro`) y la larga queda para lectores de pantalla.
  - **Visor de cámara (mapa):** el mapa se ve con las esquinas y el círculo de enfoque de un visor.
  - **Rollo entre páginas:** `@view-transition` con la misma animación del cambio de tema.
- **Rollo de la tira:** foto propia de un Kodak 400, ver la excepción en [[decisions/0002-temas-por-tipo-de-pelicula]].
- **Fuera por ahora:** 3D.
