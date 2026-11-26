"""Genera los tres conceptos de logo de Banda Fotográfica en SVG (negro primero).

Uso: python marca/conceptos/generar.py   (necesita fonttools: pip install fonttools)
Las letras se convierten en trazados desde Gloock (OFL) e IBM Plex Mono (OFL), las mismas fuentes de la web.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

AQUI = Path(__file__).parent
FUENTES = AQUI.parents[1] / 'node_modules' / '@fontsource'
GLOOCK = TTFont(FUENTES / 'gloock' / 'files' / 'gloock-latin-400-normal.woff')
PLEX = TTFont(FUENTES / 'ibm-plex-mono' / 'files' / 'ibm-plex-mono-latin-500-normal.woff')


def texto(fuente, cadena, x, base, alto_mayus, tracking=0.0):
    """Trazado SVG de `cadena` con la línea base en `base`; `alto_mayus` = alto de la H en px. Devuelve (d, ancho)."""
    cmap, glifos, hmtx = fuente.getBestCmap(), fuente.getGlyphSet(), fuente['hmtx']
    alto_h = fuente['OS/2'].sCapHeight
    s = alto_mayus / alto_h
    pen = SVGPathPen(glifos)
    cursor = 0.0
    for c in cadena:
        nombre = cmap[ord(c)]
        glifos[nombre].draw(TransformPen(pen, (s, 0, 0, -s, x + cursor, base)))
        cursor += hmtx[nombre][0] * s + tracking
    return pen.getCommands(), cursor - tracking


def caja(fuente, cadena, alto_mayus):
    """Límites verticales y ancho de la tinta de `cadena` (para centrar letras sueltas)."""
    from fontTools.pens.boundsPen import BoundsPen
    cmap, glifos = fuente.getBestCmap(), fuente.getGlyphSet()
    s = alto_mayus / fuente['OS/2'].sCapHeight
    b = BoundsPen(glifos)
    glifos[cmap[ord(cadena)]].draw(b)
    x0, y0, x1, y1 = b.bounds
    return x0 * s, y0 * s, x1 * s, y1 * s


def svg(ancho, alto, cuerpo, titulo):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {ancho:g} {alto:g}" width="{ancho:g}" height="{alto:g}">'
            f'<title>{titulo}</title>{cuerpo}</svg>\n')


def letra_centrada(fuente, c, cx, cy, alto_mayus):
    x0, y0, x1, y1 = caja(fuente, c, alto_mayus)
    x = cx - (x0 + x1) / 2
    base = cy + (y0 + y1) / 2  # y de la fuente crece hacia arriba
    d, _ = texto(fuente, c, x, base, alto_mayus)
    return d


# Colores: amarillo y rojo de la tienda, que la gente asocia a "la Kodak". Son tonos propios, no los de Kodak:
# el amarillo es más ámbar y el rojo más ladrillo, para evocar sin copiar su imagen.
NEGRO = {'tinta': '#000', 'rojo': '#000', 'amarillo': None}
COLOR = {'tinta': '#231A14', 'rojo': '#C8321E', 'amarillo': '#F2AE1C'}


# A · Elegida: la b de la casa marcada con lápiz graso, como el cuadro bueno en una hoja de contactos.
def concepto_a(k):
    b = letra_centrada(GLOOCK, 'b', 126, 132, 128)
    # Lazo a mano alzada, algo ladeado, que se pasa de largo al cerrar: el gesto del lápiz graso de la web (.lapiz)
    lazo = 'M104 40 C176 18 232 58 228 126 C224 192 172 230 114 224 C58 218 24 176 32 120 C40 66 96 30 160 34 C186 36 204 42 222 52'
    fondo = f'<circle cx="128" cy="130" r="97" fill="{k["amarillo"]}"/>' if k['amarillo'] else ''
    return (f'{fondo}<path fill="{k["tinta"]}" d="{b}"/>'
            f'<path d="{lazo}" fill="none" stroke="{k["rojo"]}" stroke-width="13" stroke-linecap="round" transform="rotate(-8 128 128)"/>')


# B · Dos cuadros: la B hecha de película; el asta es el borde perforado y los vientres son dos cuadros.
def concepto_b(k):
    asta = 'M44 28 H100 V228 H44 Z'
    agujeros = ''.join(f'M58 {y} h28 v26 h-28 Z' for y in (46, 115, 184))  # perforaciones (agujeros reales)
    def cuadro(x0, y0, x1, y1, r, g):  # anillo redondeado: exterior menos interior
        ext = (f'M{x0} {y0} H{x1 - r} A{r} {r} 0 0 1 {x1} {y0 + r} V{y1 - r} A{r} {r} 0 0 1 {x1 - r} {y1} H{x0} Z')
        xi0, yi0, xi1, yi1, ri = x0 + g, y0 + g, x1 - g, y1 - g, max(r - g, 4)
        inte = (f'M{xi0} {yi0} H{xi1 - ri} A{ri} {ri} 0 0 1 {xi1} {yi0 + ri} V{yi1 - ri} A{ri} {ri} 0 0 1 {xi1 - ri} {yi1} H{xi0} Z')
        return ext + inte
    d = asta + agujeros + cuadro(100, 28, 196, 122, 22, 26) + cuadro(100, 134, 214, 228, 24, 26)
    # En color, los cuadros se "revelan" en amarillo dentro de la B roja
    if k['amarillo']:
        rellenos = (f'<path fill="{k["amarillo"]}" d="M126 54 H170 V96 H126 Z M126 160 H188 V202 H126 Z"/>')
        return f'<path fill="{k["rojo"]}" fill-rule="evenodd" d="{d}"/>{rellenos}'
    return f'<path fill="{k["rojo"]}" fill-rule="evenodd" d="{d}"/>'


# C · Álbum: la B sostenida por cuatro esquineros, como las fotos pegadas en el álbum familiar.
def concepto_c(k):
    B = letra_centrada(GLOOCK, 'B', 128, 128, 96)
    m, l, g = 40, 50, 8  # margen, largo del esquinero, grosor del borde de la foto
    def esquinero(x, y, sx, sy):
        return f'M{x} {y} h{sx * l} l{-sx * l} {sy * l} Z'
    d = ''.join(esquinero(x, y, sx, sy) for x, y, sx, sy in (
        (m, m, 1, 1), (256 - m, m, -1, 1), (m, 256 - m, 1, -1), (256 - m, 256 - m, -1, -1)))
    # El borde de la foto pasa bajo los esquineros: sin él, los triángulos se leen como un visor de cámara
    p0, p1 = m + 10, 256 - m - 10
    foto = f'M{p0} {p0} H{p1} V{p1} H{p0} Z M{p0 + g} {p0 + g} V{p1 - g} H{p1 - g} V{p0 + g} Z'
    papel = f'<rect x="{p0}" y="{p0}" width="{p1 - p0}" height="{p1 - p0}" fill="{k["amarillo"]}"/>' if k['amarillo'] else ''
    return f'{papel}<path fill="{k["tinta"]}" d="{foto}"/><path fill="{k["tinta"]}" d="{B}"/><path fill="{k["rojo"]}" d="{d}"/>'


def lockup(simbolo, k):
    """Símbolo a la izquierda; 'Banda' en Gloock y 'FOTOGRÁFICA' en Plex Mono como el rótulo del borde de la película."""
    banda, ancho_banda = texto(GLOOCK, 'Banda', 296, 140, 92)
    foto, ancho_foto = texto(PLEX, 'FOTOGRÁFICA', 300, 196, 26, tracking=5.2)
    ancho = 296 + max(ancho_banda, ancho_foto + 4) + 8
    return ancho, f'<g>{simbolo}</g><path fill="{k["tinta"]}" d="{banda}"/><path fill="{k["rojo"]}" d="{foto}"/>'


if __name__ == '__main__':
  for clave, nombre, fn in (('a', 'Elegida', concepto_a), ('b', 'Dos cuadros', concepto_b), ('c', 'Álbum', concepto_c)):
    for sufijo, k in (('', NEGRO), ('-color', COLOR)):
        simbolo = fn(k)
        (AQUI / f'{clave}-simbolo{sufijo}.svg').write_text(svg(256, 256, simbolo, f'Banda Fotográfica · {nombre}'), encoding='utf-8')
        ancho, cuerpo = lockup(simbolo, k)
        (AQUI / f'{clave}-lockup{sufijo}.svg').write_text(svg(ancho, 256, cuerpo, f'Banda Fotográfica · {nombre}'), encoding='utf-8')
  print('ok')
