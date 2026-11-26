# 0003 Catálogo: WhatsApp, transferencia y retiro en tienda

**Fecha:** 2026-11-02 · **Estado:** aceptada; el pago online queda para una fase posterior

En esta fase no hay carrito. Cada producto abre WhatsApp con el mensaje ya escrito (`linkWhatsapp` en `negocio.ts`). El pago es por transferencia y el retiro, en el local. Sin precio cargado se muestra "Precio por WhatsApp".

**Reserva y medios de pago (2026-11-22):** los pasos son Escribe, Reserva y Retira. Reservar por WhatsApp exige pagar antes por transferencia (los datos de la cuenta se mandan por el chat, no van en el sitio: se quitó `negocio.transferencia`). En el local se paga con efectivo, tarjeta (Getnet) o transferencia, y el sitio lo dice junto al paso Retira para que la transferencia no parezca la única forma. Las boletas se emiten con Vessi (solo boletas, sin inventario). Nota: el medio de pago no cambia el IVA, la boleta se emite igual.

**Precio por mayor (2026-11-22):** el precio publicado es por unidad. Los productos con `mayor: true` agregan en su ficha "¿Precio por mayor? Consulta disponibilidad por WhatsApp", con el mensaje ya escrito. El catálogo lleva una línea general. No se promete que haya precio por mayor: solo se invita a preguntar.
