# 0001 Astro estático + Cloudflare Pages

**Fecha:** 2026-11-02 · **Estado:** aceptada

El usuario pidió tecnología moderna y escalable para un sitio que hoy es pequeño. Se eligió Astro estático en vez de Next.js: es más rápido, el hosting es gratis y el catálogo y las noticias quedan como archivos de contenido. Permite sumar más adelante un CMS (p. ej. Keystatic) o pago online sin rehacer el sitio.

Sin Tailwind ni framework de UI: los temas son variables CSS, y los pocos scripts (tema, horario, menú) son `<script>` de Astro. El menú y el selector usan el atributo nativo `popover`.
