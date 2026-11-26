# 0008 Logo: cámara con negativo

**Fecha:** 2026-11-25 · **Estado:** aceptada y en la web (falta la búsqueda de marca en INAPI) · reemplaza a [[decisions/0007-logo-elegida]]

El usuario trajo un logo propio: una cámara con diafragma amarillo, un negativo rojo, una foto y "Banda / Fotográfica" en letra gruesa inclinada. Se redibujó en vector y se simplificó, viendo las opciones antes de elegir:

- Se quitaron la foto con montaña, la curva amarilla de abajo, los degradados y el borde blanco de adhesivo.
- El lente queda **amarillo liso, sin las líneas del diafragma** (pedido del usuario).
- El negativo va en **curva suave con puntas cortadas rectas** (con puntas redondas "parecía una vienesa").
- **Colores propios**, no los de Kodak (pedido del usuario, tras ver ambos): amarillo `#F2AE1C`, rojo `#C8321E`, tinta `#231A14`, los mismos de la 0007. Siguen sin escribirse "Kodak" ni usar formas de su marca.
- Letra: **Poppins ExtraBold Italic** (OFL), en `marca/fuentes/` con su licencia. En los SVG el texto ya va convertido en formas.

## Archivos

Se regeneran con `python marca/kit.py` (necesita fonttools). Todo es relleno, sin trazos ni guiones, así que sirve tal cual para imprenta y corte en vinilo.

| Archivo | Para |
|---|---|
| `simbolo.svg` | La cámara sola, a color |
| `simbolo-chico.svg` | Bajo 48 px (favicon): sin perforaciones ni flash |
| `apilado.svg`, `horizontal.svg` | Logo completo sobre fondo claro |
| `*-oscuro.svg` | Sobre fondo oscuro: "Banda" pasa a papel `#F5EFE4` |
| `*-negro.svg`, `simbolo-rojo.svg` | Un color (timbres, fotocopias), sobre fondo claro |
| `perfil.svg`, `png/perfil.png` | Foto de perfil de Instagram y WhatsApp (1080 × 1080, fondo amarillo) |
| `png/` | PNG de símbolo, apilado, horizontal y perfil |
| `web/` | favicon, íconos de celular y `head-snippet.html`, generados desde `simbolo.svg` y `simbolo-chico.svg` |

No hay versión blanca de un color: en fondos oscuros se usan las `-oscuro`.

## En la web

La cabecera importa `src/assets/logo-horizontal.svg`, que escribe `kit.py`, con "Banda" en `currentColor`: toma la tinta de cada tema y se lee en los cuatro, en claro y oscuro. Los íconos de `public/` salen de `marca/web/` (el `site.webmanifest` de `public/` es propio: no copiar el de `marca/web/`), y `public/img/compartir.png` es la foto de perfil. Si se cambia el logo, correr `kit.py`, el export y volver a copiarlos.

## Reglas

- Espacio libre alrededor: como mínimo, el alto del lente.
- Tamaño mínimo: horizontal 120 px de ancho o 30 mm impreso; bajo 48 px, solo `simbolo-chico`.
- No: cambiar colores, estirar, girar, agregar sombras o degradados, ni volver a poner las líneas del diafragma.
- Antes de imprimir el letrero: búsqueda de marca en INAPI y prueba de color con la imprenta.
