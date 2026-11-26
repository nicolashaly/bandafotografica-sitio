# 0007 Logo: "Elegida" en amarillo y rojo

**Fecha:** 2026-11-22 · **Estado:** reemplazada el 2026-11-25 por [[decisions/0008-logo-camara]]. Los archivos de esta versión siguen en el historial de git y los conceptos en `marca/conceptos/`.

El logo es una **b minúscula marcada con lápiz graso rojo sobre un círculo amarillo**: el gesto con que se marca el cuadro bueno en una hoja de contactos. Al lado va "Banda" en Gloock y "FOTOGRÁFICA" en IBM Plex Mono, como el rótulo del borde de la película. Se eligió entre tres conceptos (Elegida, Dos cuadros, Álbum; ver `marca/conceptos/`) con la skill `logo-design`.

- **Por qué:** se pidió cercano, de barrio, cálido y nostálgico, para Instagram, WhatsApp y la web. El trazo repite la marca de lápiz de la tira de la portada.
- **Colores de Kodak:** la gente conoce el local por el amarillo y rojo y le dice "la Kodak". Se conservan, pero en **tonos propios** (amarillo más ámbar, rojo más ladrillo) y sin ninguna forma de Kodak (ni la K, ni su caja, ni su letra). No escribir "Kodak" en el logo, el letrero ni el sitio: el amarillo con rojo en fotografía es parte de su imagen registrada.
- **Pendiente antes de imprimir en grande:** búsqueda de marca en INAPI (no se puede garantizar que no exista algo parecido).

## Guía de uso

**Archivos** (en `marca/`; se regeneran con `python marca/kit.py`, que necesita `fonttools`):

| Archivo | Para |
|---|---|
| `simbolo.svg` | El símbolo a color, desde 48 px |
| `simbolo-chico.svg` | Bajo 48 px: lazo cerrado y más grueso, b más grande (favicon) |
| `horizontal.svg`, `apilado.svg` | Logo con nombre, sobre fondo claro |
| `horizontal-oscuro.svg`, `apilado-oscuro.svg` | Sobre fondo oscuro (nombre en papel y amarillo) |
| `*-negro.svg` y `variantes/` | Un color: negro, blanco o rojo (timbres, fotocopias, grabado) |
| `perfil.svg`, `png/perfil.png` | Foto de perfil de Instagram y WhatsApp (1080 × 1080) |
| `web/` | favicon.ico/svg, íconos de celular, `site.webmanifest` y `head-snippet.html` |
| `presentacion.html`, `laminas/` | Lámina con ejemplos de uso |

**Colores** (CMYK aproximado: confirmar con la imprenta con una prueba de color):

| | HEX | RGB | CMYK aprox. |
|---|---|---|---|
| Amarillo | `#F2AE1C` | 242 174 28 | 0 30 90 0 |
| Rojo | `#C8321E` | 200 50 30 | 0 85 90 15 |
| Tinta | `#231A14` | 35 26 20 | 0 25 40 90 |
| Papel (fondos oscuros) | `#F5EFE4` | 245 239 228 | 0 2 7 4 |

**Reglas:**
- Espacio libre alrededor: como mínimo, la mitad del ancho de la b.
- Tamaño mínimo: símbolo 16 px (con `simbolo-chico`); logo horizontal 120 px de ancho o 30 mm impreso.
- Fondos: papel o blanco para el logo a color; amarillo solo con el símbolo sin disco (como `perfil.svg`); oscuro con las versiones `-oscuro`.
- No: cambiar los colores, estirarlo, girarlo, ponerle sombras o degradados, rodearlo con otro círculo, escribir "Kodak", ni cambiar la letra del nombre.
- El lazo es un trazo (stroke). Para corte en vinilo o letrero, expandirlo a contorno en Inkscape o Illustrator ("trazo a ruta").
- Fuentes: Gloock e IBM Plex Mono, ambas con licencia OFL, que permite usarlas en logos. En los SVG las letras ya están convertidas en formas.

**En la web:** la cabecera usa `public/logo.svg` (copia de `marca/simbolo.svg`) y el nombre en HTML (`.wordmark` en `global.css`), siempre en Gloock y Plex Mono aunque cambie el tema. Los íconos de `public/` (favicon, apple-touch, icon-192/512, maskable, `site.webmanifest`) salen de `marca/web/`, y `public/img/compartir.png` (la foto de perfil) es la imagen al compartir el enlace por WhatsApp. Si se cambia el logo, volver a copiarlos.
