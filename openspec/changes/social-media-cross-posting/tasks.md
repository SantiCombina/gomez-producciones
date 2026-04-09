# Tasks: Social Media Cross-Posting

## Phase 1: Infraestructura

- [x] 1.1 Agregar `NEXT_PUBLIC_SITE_URL=` a `.env.local`
- [x] 1.2 Crear `src/lib/meta-api.ts` con tipos `MetaPostPayload`, guard de env vars, y funciones exportadas vacías `postToFacebookPage()` e `postToInstagram()`

## Phase 2: Implementación del cliente Meta API

- [x] 2.1 Implementar `postToFacebookPage()` en `src/lib/meta-api.ts`: POST a `https://graph.facebook.com/v21.0/{PAGE_ID}/feed` con `message` (título + URL) y `link` (URL del post)
- [x] 2.2 Implementar `postToInstagram()` en `src/lib/meta-api.ts`: flujo de dos pasos — crear media container (`/ig-user-id/media`) y publicarlo (`/ig-user-id/media_publish`)
- [x] 2.3 Agregar manejo de errores en ambas funciones: `try/catch` con `console.error`, nunca re-throw

## Phase 3: Modificar colección Posts

- [x] 3.1 Agregar campo `postToFacebook` (checkbox, sidebar, default false) a `src/collections/Posts.ts`
- [x] 3.2 Agregar campo `postToInstagram` (checkbox, sidebar, default false, description advirtiendo que requiere imagen) a `src/collections/Posts.ts`
- [x] 3.3 Agregar hook `afterChange` en `Posts.ts`: leer flags, llamar a `meta-api.ts`, luego resetear flags a `false` via `req.payload.update()`
- [x] 3.4 Ejecutar `pnpm generate:types` para regenerar `src/payload-types.ts`

## Phase 4: Verificación

- [x] 4.1 Ejecutar `pnpm lint` y corregir cualquier error de ESLint/TypeScript
- [x] 4.2 Ejecutar `pnpm build` y verificar que compila sin errores
- [ ] 4.3 Verificar manualmente en `pnpm dev` que los checkboxes aparecen en el sidebar del formulario de Posts
- [ ] 4.4 Verificar que guardar un post sin los flags tildados no dispara ninguna llamada a Meta API (revisar logs del servidor)
- [ ] 4.5 Verificar que con tokens vacíos, guardar con flags tildados loguea advertencia y no rompe el guardado
