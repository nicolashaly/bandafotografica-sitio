# 0009 Noticias curadas con revisión del usuario

**Fecha:** 2026-11-22 · **Estado:** aceptada, sin implementar (falta elegir las fuentes con RSS y programar la tarea)

- Dos borradores por semana (lunes y jueves) los prepara una tarea programada, sin claves de API en el repositorio.
- Fuentes: feeds RSS de revistas de fotografía (español e inglés) y de trámites (Registro Civil, ChileAtiende). Google Noticias solo para encontrar temas, no como fuente de texto (sus condiciones limitan el uso comercial; revisar antes).
- Elige la noticia más útil para clientes de Talagante, evita repetidas y escribe una nota propia de 150 a 250 palabras con la voz del local.
- Reglas: solo hechos que estén en la fuente ([[decisions/0004-sin-datos-inventados]]), redacción propia y no paráfrasis frase a frase, sin copiar imágenes del medio, sin "humanizador" para disimular IA, y "Fuente:" con enlace visible.
- El borrador llega como pull request a `tests`; el usuario lo aprueba (puede ser desde el celular) y luego pasa a `master`.
- La colección `noticias` ya tiene el campo opcional `fuente` (nombre y URL), que se muestra al pie. La primera nota real es `cedulas-sin-retirar.md` (2026-11-24, fuente BioBioChile).
