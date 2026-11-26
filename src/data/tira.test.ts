import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recorte, enTira, proporcion } from './tira.ts';

test('recorte de la tira: mismo encuadre que el original en un cuadro 3:2', () => {
  const [W, H] = [640, 853];
  const r = recorte(W, H, '50% 30%');
  assert.deepEqual([r.left, r.width], [0, 640]);
  assert.equal(r.height, Math.round(640 / proporcion));
  // ventana visible de un cuadro 3:2 con cover: alto 640·2/3, desde p·(alto − ventana)
  const v = 640 * 2 / 3;
  assert.ok(Math.abs((r.top + 0.3 * (r.height - v)) - 0.3 * (H - v)) < 1);
  assert.deepEqual(recorte(1000, 500), { left: 173, top: 0, width: 654, height: 500 }); // foto apaisada: recorta a los lados
});

test('srcset de la tira', () => {
  const f = enTira({ src: '/img/servicios/atardecer-en-la-costa.webp', alt: 'x' });
  assert.equal(f.src, '/img/tira/640/atardecer-en-la-costa.webp');
  assert.equal(f.srcset, '/img/tira/320/atardecer-en-la-costa.webp 320w, /img/tira/480/atardecer-en-la-costa.webp 480w, /img/tira/640/atardecer-en-la-costa.webp 640w');
});
