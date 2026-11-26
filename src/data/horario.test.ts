import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estado, ahoraEnChile } from './horario.ts';

const h = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

// Semana del 2 al 8 de noviembre de 2026: lunes a domingo, sin feriados.
test('estados del horario', () => {
  assert.deepEqual(estado('2026-11-02', h('09:00')), { abierto: false, texto: 'Cerrado, abre hoy a las 10:00' });
  assert.deepEqual(estado('2026-11-02', h('10:00')), { abierto: true, texto: 'Abierto, colación a las 14:00' });
  assert.deepEqual(estado('2026-11-02', h('14:10')), { abierto: false, texto: 'En colación, volvemos a las 15:00' });
  assert.deepEqual(estado('2026-11-02', h('15:00')), { abierto: true, texto: 'Abierto, cierra a las 19:00' });
  assert.deepEqual(estado('2026-11-06', h('19:00')), { abierto: false, texto: 'Cerrado, abre mañana a las 10:00' });
  assert.deepEqual(estado('2026-11-07', h('18:59')), { abierto: true, texto: 'Abierto, cierra a las 19:00' });
  assert.deepEqual(estado('2026-11-07', h('19:00')), { abierto: false, texto: 'Cerrado, abre el lunes a las 10:00' });
  assert.deepEqual(estado('2026-11-08', h('12:00')), { abierto: false, texto: 'Cerrado, abre mañana a las 10:00' });
});

test('feriados', () => {
  // Martes 8 de diciembre de 2026, Inmaculada Concepción
  assert.deepEqual(estado('2026-12-08', h('12:00')), { abierto: false, texto: 'Cerrado, abre mañana a las 10:00' });
  // Víspera: el lunes al cierre, mañana es feriado
  assert.deepEqual(estado('2026-12-07', h('19:00')), { abierto: false, texto: 'Cerrado, abre el miércoles a las 10:00' });
  // Jueves Santo 2026: viernes y sábado feriados, domingo cerrado
  assert.deepEqual(estado('2026-04-02', h('19:00')), { abierto: false, texto: 'Cerrado, abre el lunes a las 10:00' });
});

test('hora de Chile', () => {
  // 2026-11-02 15:00 UTC = lunes 12:00 en Santiago (UTC-3, horario de verano)
  assert.deepEqual(ahoraEnChile(new Date('2026-11-02T15:00:00Z')), { fecha: '2026-11-02', dia: 1, min: 12 * 60 });
  // 2026-11-03 02:00 UTC = todavía lunes 23:00 en Santiago
  assert.deepEqual(ahoraEnChile(new Date('2026-11-03T02:00:00Z')), { fecha: '2026-11-02', dia: 1, min: 23 * 60 });
});
