import { semana, dias } from './negocio.ts';
import { feriados } from './feriados.ts';

const aMin = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3));
const hora = (h: string) => h.replace(/^0/, '');
// Fechas YYYY-MM-DD a mediodía UTC: el día de la semana no depende de la zona.
const diaDe = (fecha: string) => new Date(`${fecha}T12:00:00Z`).getUTCDay();
const sumar = (fecha: string, d: number) => {
  const f = new Date(`${fecha}T12:00:00Z`);
  f.setUTCDate(f.getUTCDate() + d);
  return f.toISOString().slice(0, 10);
};
const tramosDe = (fecha: string) => (feriados.includes(fecha) ? [] : semana[diaDe(fecha)]);

// Fecha, día y minuto actuales en Chile, sin importar la zona del visitante.
export function ahoraEnChile(fecha = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(fecha).map((x) => [x.type, x.value]),
  );
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  return { fecha: `${p.year}-${p.month}-${p.day}`, dia, min: Number(p.hour) * 60 + Number(p.minute) };
}

export function estado(fecha: string, min: number) {
  const tramos = tramosDe(fecha);
  for (const [i, [a, c]] of tramos.entries()) {
    if (min >= aMin(a) && min < aMin(c)) return { abierto: true, texto: `Abierto, ${i < tramos.length - 1 ? 'colación' : 'cierra'} a las ${hora(c)}` };
    if (min < aMin(a)) return { abierto: false, texto: i === 0 ? `Cerrado, abre hoy a las ${hora(a)}` : `En colación, volvemos a las ${hora(a)}` };
  }
  for (let d = 1; d <= 14; d++) {
    const sig = sumar(fecha, d);
    const t = tramosDe(sig);
    if (t.length) {
      const cuando = d === 1 ? 'mañana' : `el ${dias[diaDe(sig)].toLowerCase()}`;
      return { abierto: false, texto: `Cerrado, abre ${cuando} a las ${hora(t[0][0])}` };
    }
  }
  return { abierto: false, texto: 'Cerrado' };
}
