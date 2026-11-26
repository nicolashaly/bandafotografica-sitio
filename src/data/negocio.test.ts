import { test } from 'node:test';
import assert from 'node:assert/strict';
import { precioTexto, ofertaProducto, ancla } from './negocio.ts';

test('ancla de categoría', () => assert.equal(ancla('Pilas y baterías'), 'pilas-y-baterias'));

test('precio de un producto', () => {
  const nb = (s: string) => s.replace(/\s/g, ' '); // Intl usa espacio duro
  assert.equal(precioTexto({}), 'Precio por WhatsApp');
  assert.equal(nb(precioTexto({ precio: 3000 })), '$3.000');
  assert.equal(nb(precioTexto({ precio: 9999, opciones: [{ precio: 3800 }, { precio: 3000 }] })), 'Desde $3.000');
  assert.equal(nb(precioTexto({ tabla: 'impresion' })), 'Desde $800');
});

test('oferta de un producto (schema.org)', () => {
  assert.equal(ofertaProducto({}), undefined);
  assert.deepEqual(ofertaProducto({ precio: 3000 }), { '@type': 'Offer', priceCurrency: 'CLP', price: 3000 });
  assert.deepEqual(ofertaProducto({ precio: 9999, opciones: [{ precio: 3800 }, { precio: 3000 }] }),
    { '@type': 'AggregateOffer', priceCurrency: 'CLP', lowPrice: 3000, highPrice: 3800, offerCount: 2 });
  assert.deepEqual(ofertaProducto({ tabla: 'impresion' }),
    { '@type': 'AggregateOffer', priceCurrency: 'CLP', lowPrice: 800, highPrice: 19990, offerCount: 9 });
});
