# 0006 Rama `tests` para probar antes de producción

**Fecha:** 2026-11-22 · **Estado:** aceptada

- `master` es producción: lo que entra ahí se publica en bandafotografica.cl.
- `tests` es la rama de pruebas. Los cambios se suben primero a `tests`, se revisan y después se pasan a `master` (`git switch master && git merge --ff-only tests && git push`).
- Cuando se conecte Cloudflare Pages ([[decisions/0001-stack-astro-cloudflare]]), la rama de producción es `master`. Cada push a `tests` genera una vista previa en su propia dirección (`tests.<proyecto>.pages.dev`), sin tocar el sitio público.
- Si `master` recibe un arreglo directo, se trae a `tests` con `git switch tests && git merge master` para que no se separen.

## CI/CD (2026-11-22)

- **CI:** `.github/workflows/ci.yml` corre `npm ci`, `npm test` y `npm run build` con Node 24 en cada push a `tests` o `master` y en cada pull request. Si falla, no se pasa a `master`.
- **CD:** lo hace Cloudflare Pages con su integración de Git, sin Actions ni tokens en el repo. Conectado el 2026-11-25 (cuenta del usuario): Workers & Pages → Create → Pages → Connect to Git → `nicolashaly/bandafotografica`. Configuración: production branch `master`, build command `npm run build`, output `dist`, variable `NODE_VERSION=24`. Las vistas previas de `tests` quedan activas por defecto.
