"""Kit del logo de Banda Fotográfica (2026-11-25): cámara con lente amarillo, negativo rojo y el nombre en Poppins.

Uso: python marca/kit.py   (necesita fonttools). Escribe los SVG maestros en marca/ y el logo de la cabecera en
public/; los íconos web se generan aparte (ver docs/decisions/0008).
Todo va como relleno (sin trazos ni guiones), para que la imprenta o el corte en vinilo no dependan de nada.
"""
import math
import sys
from pathlib import Path

from fontTools.ttLib import TTFont

AQUI = Path(__file__).parent
sys.path.insert(0, str(AQUI / 'conceptos'))
from generar import texto, svg  # noqa: E402

POPPINS = TTFont(AQUI / 'fuentes' / 'Poppins-ExtraBoldItalic.ttf')
AMARILLO, ROJO, TINTA, PAPEL = '#F2AE1C', '#C8321E', '#231A14', '#F5EFE4'
COLOR = {'tinta': TINTA, 'rojo': ROJO, 'amarillo': AMARILLO, 'blanco': '#FFFFFF', 'nombre': TINTA}
OSCURO = {**COLOR, 'nombre': PAPEL}  # sobre fondo oscuro solo cambia "Banda"
NEGRO = {'tinta': '#000', 'rojo': '#000', 'amarillo': '#FFF', 'blanco': '#FFF', 'nombre': '#000'}  # timbres y fotocopias
ROJO_SOLO = {k: (ROJO if v == '#000' else v) for k, v in NEGRO.items()}


def rect(x0, y0, x1, y1, r, fill):
    return f'<rect x="{x0:g}" y="{y0:g}" width="{x1 - x0:g}" height="{y1 - y0:g}" rx="{r:g}" fill="{fill}"/>'


def negativo(k, perforado=True):
    """Tira de película sobre una curva suave, con puntas cortadas rectas (no redondas: parecía una vienesa)."""
    p0, p1, p2 = (34, 126), (150, 160), (266, 118)
    punto = lambda t: tuple((1 - t) ** 2 * a + 2 * (1 - t) * t * b + t * t * c for a, b, c in zip(p0, p1, p2))
    def normal(t):
        dx, dy = (2 * (1 - t) * (b - a) + 2 * t * (c - b) for a, b, c in zip(p0, p1, p2))
        n = math.hypot(dx, dy)
        return -dy / n, dx / n, math.degrees(math.atan2(dy, dx))
    ts = [i / 48 for i in range(49)]
    arriba = [(x + nx * 13, y + ny * 13) for t in ts for (x, y), (nx, ny, _) in [(punto(t), normal(t))]]
    abajo = [(x - nx * 13, y - ny * 13) for t in reversed(ts) for (x, y), (nx, ny, _) in [(punto(t), normal(t))]]
    d = 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in arriba + abajo) + 'Z'
    partes = [f'<path d="{d}" fill="{k["rojo"]}"/>']
    if perforado:
        # Perforaciones cada 14 unidades de largo, a ambos bordes, giradas con la tira
        largo, t, previo, siguiente = 0.0, 0.0, punto(0), 9.0
        while t < 1:
            t += 0.002
            p = punto(t)
            largo += math.dist(previo, p)
            previo = p
            if largo >= siguiente and t < 0.985:
                nx, ny, ang = normal(t)
                for s in (1, -1):
                    cx, cy = p[0] + nx * 7.5 * s, p[1] + ny * 7.5 * s
                    partes.append(f'<rect x="{cx - 3:.1f}" y="{cy - 2.5:.1f}" width="6" height="5" rx="1" '
                                  f'fill="{k["blanco"]}" transform="rotate({ang:.1f} {cx:.1f} {cy:.1f})"/>')
                siguiente += 14
    return ''.join(partes)


def simbolo(k, chico=False):
    """La cámara (caja de 30..270 × 10..190). La versión chica, para favicon, va sin perforaciones ni flash."""
    return ''.join([
        rect(115.5, 17.5, 184.5, 52.5, 11.5, k['amarillo']), rect(120.5, 22.5, 179.5, 47.5, 6.5, k['tinta']),
        rect(80, 30, 106, 42, 3, k['rojo']),
        rect(69.5, 37.5, 230.5, 140.5, 18.5, k['amarillo']), rect(74.5, 42.5, 225.5, 135.5, 13.5, k['tinta']),
        '' if chico else rect(194, 56, 216, 65, 4.5, k['blanco']),
        negativo(k, perforado=not chico),
        f'<circle cx="150" cy="92" r="43" fill="{k["blanco"]}"/><circle cx="150" cy="92" r="37" fill="{k["tinta"]}"/>'
        f'<circle cx="150" cy="92" r="30" fill="{k["amarillo"]}"/>',
    ])


def poppins(cadena, cx, base, tam, tracking=0.0):
    """Texto centrado en cx; `tam` es el tamaño de letra (como font-size)."""
    alto = tam * POPPINS['OS/2'].sCapHeight / POPPINS['head'].unitsPerEm
    _, ancho = texto(POPPINS, cadena, 0, 0, alto, tracking)
    return texto(POPPINS, cadena, cx - ancho / 2, base, alto, tracking)[0]


def nombre(k):
    """'Banda' y la cinta roja con 'Fotográfica', en una caja de 0..150 × 0..80."""
    return (f'<path fill="{k["nombre"]}" d="{poppins("Banda", 74, 38, 40, -1.5)}"/>'
            f'<path d="M4 46 L146 46 L140 76 L0 76Z" fill="{k["rojo"]}"/>'
            f'<path fill="{k["blanco"]}" d="{poppins("Fotográfica", 72, 68, 20)}"/>')


def apilado(k):
    return 300, 300, (simbolo(k) + f'<path fill="{k["nombre"]}" d="{poppins("Banda", 150, 232, 66, -2)}"/>'
                      f'<path d="M30 244 L272 244 L262 288 L22 288Z" fill="{k["rojo"]}"/>'
                      f'<path fill="{k["blanco"]}" d="{poppins("Fotográfica", 148, 277, 33, -0.5)}"/>')


def horizontal(k):
    return 558, 180, (f'<g transform="translate(-30 -10)">{simbolo(k)}</g>'
                      f'<g transform="translate(252 8) scale(2.04)">{nombre(k)}</g>')


def cuadrado(k, chico=False):
    return 256, 256, f'<g transform="translate(-22 38)">{simbolo(k, chico)}</g>'


def sobre_amarillo(lado, escala, chico=False):
    """Fondo amarillo y la cámara centrada (perfil, íconos de celular). Sobre amarillo el borde amarillo no se ve."""
    t = (lado - 240 * escala) / 2
    return lado, lado, (f'<rect width="{lado}" height="{lado}" fill="{AMARILLO}"/>'
                        f'<g transform="translate({t - 30 * escala:g} {(lado - 180 * escala) / 2 - 10 * escala:g}) '
                        f'scale({escala:g})">{simbolo(COLOR, chico)}</g>')


if __name__ == '__main__':
    piezas = {
        'simbolo': cuadrado(COLOR),
        'simbolo-chico': cuadrado(COLOR, chico=True),
        'simbolo-negro': cuadrado(NEGRO),
        'simbolo-rojo': cuadrado(ROJO_SOLO),
        'apilado': apilado(COLOR),
        'apilado-oscuro': apilado(OSCURO),
        'apilado-negro': apilado(NEGRO),
        'horizontal': horizontal(COLOR),
        'horizontal-oscuro': horizontal(OSCURO),
        'horizontal-negro': horizontal(NEGRO),
        'perfil': sobre_amarillo(1080, 3.6),
    }
    for archivo, (ancho, alto, cuerpo) in piezas.items():
        (AQUI / f'{archivo}.svg').write_text(svg(ancho, alto, cuerpo, 'Banda Fotográfica'), encoding='utf-8')
    # Cabecera de la web: "Banda" toma el color de tinta de cada tema (currentColor)
    web = svg(*horizontal({**COLOR, 'nombre': 'currentColor'})[:2], horizontal({**COLOR, 'nombre': 'currentColor'})[2],
              'Banda Fotográfica')
    (AQUI.parent / 'src' / 'assets').mkdir(exist_ok=True)
    (AQUI.parent / 'src' / 'assets' / 'logo-horizontal.svg').write_text(web, encoding='utf-8')
    print('ok:', ', '.join(piezas), '+ src/assets/logo-horizontal.svg')
