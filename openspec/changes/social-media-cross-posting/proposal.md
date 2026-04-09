# Proposal: Social Media Cross-Posting

## Intent

Al publicar un post en el panel de Payload CMS, el editor debe poder elegir si también publicarlo automáticamente en Facebook y/o Instagram. Esto elimina el paso manual de ir a cada red social y reduce el tiempo de distribución de noticias.

## Scope

### In Scope
- Agregar campos checkbox en la colección `Posts`: `postToFacebook` y `postToInstagram`
- Hook `afterChange` en Posts que, al crear/actualizar con esos flags activos, llama a las APIs de Meta (Facebook Graph API)
- Publicación en Facebook Page como post de texto + imagen destacada
- Publicación en Instagram como imagen con caption (requiere imagen destacada)
- Variables de entorno para tokens de acceso de Meta
- Manejo de errores: si falla la publicación en RRSS, el post se guarda igual y se loguea el error

### Out of Scope
- Programación diferida (publicar en RRSS en una fecha futura)
- Edición o eliminación de posts ya publicados en RRSS
- Soporte para otras redes (Twitter/X, TikTok, etc.)
- Analytics o tracking de engagement en RRSS
- UI personalizada para preview del post antes de publicar en RRSS

## Capabilities

### New Capabilities
- `social-media-cross-posting`: Publicación automática en Facebook e Instagram desde el panel de Payload al crear/actualizar un post

### Modified Capabilities
- `posts-collection`: Nuevos campos `postToFacebook` y `postToInstagram` (boolean, UI-only en admin)

## Approach

1. Agregar campos `postToFacebook` y `postToInstagram` a la colección Posts (no persistidos en DB, solo en admin UI via `virtual: true` o como campos normales reseteados post-publicación)
2. Hook `afterChange` en Posts: si `_status === 'published'` y algún flag está activo, llamar al servicio de Meta Graph API
3. Crear `src/lib/meta-api.ts` con funciones `postToFacebookPage()` e `postToInstagram()`
4. Autenticación via Page Access Token (long-lived) en variables de entorno

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/collections/Posts.ts` | Modified | Agregar campos checkbox y hook afterChange |
| `src/lib/meta-api.ts` | New | Cliente para Facebook Graph API |
| `.env.local` | Modified | `META_FB_PAGE_ID`, `META_FB_ACCESS_TOKEN`, `META_IG_ACCOUNT_ID` |
| `src/payload-types.ts` | Modified | Auto-generado tras cambios en colección |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Token de Meta expirado o revocado | Med | Loguear error claro; no bloquear guardado del post |
| Instagram requiere imagen; post sin imagen falla | High | Deshabilitar checkbox de IG si no hay `featuredImage` |
| Rate limits de Graph API | Low | Posts son infrecuentes; no implementar retry complejo |
| Cambios en Meta Graph API | Low | Documentar versión de API usada (v21.0) |

## Rollback Plan

Remover los campos `postToFacebook` e `postToInstagram` de `Posts.ts`, eliminar `src/lib/meta-api.ts`, y correr `pnpm generate:types`. No hay migración de DB destructiva si los campos son `virtual` o si se usa una migración de drop column en Neon.

## Dependencies

- Facebook Page con permisos `pages_manage_posts`, `pages_read_engagement`
- Instagram Business Account vinculada a la Page
- Page Access Token (long-lived, ~60 días o permanente via Business Manager)

## Success Criteria

- [ ] Al crear un post con `postToFacebook` tildado, aparece publicado en la Facebook Page
- [ ] Al crear un post con `postToInstagram` tildado y con imagen, aparece en Instagram
- [ ] Si la publicación en RRSS falla, el post se guarda igualmente en Payload y se loguea el error
- [ ] Si no hay `featuredImage`, el checkbox de Instagram está deshabilitado o muestra advertencia
- [ ] Los tokens de acceso no están hardcodeados en el código
