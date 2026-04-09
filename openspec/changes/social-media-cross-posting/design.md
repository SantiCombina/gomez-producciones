# Design: Social Media Cross-Posting

## Technical Approach

Agregar dos campos booleanos a la colección `Posts` y un hook `afterChange` que llama a `src/lib/meta-api.ts`. El patrón sigue exactamente el modelo de `src/app/services/youtube.ts`: env vars con guard, fetch nativo, error silencioso con log.

## Architecture Decisions

| Decisión | Opción elegida | Alternativas | Rationale |
|----------|---------------|--------------|-----------|
| Dónde vive la lógica Meta | `src/lib/meta-api.ts` | En el hook inline | Separar cliente de efecto secundario; testeable aislado |
| Persistencia de flags | Campos normales en DB, reseteados post-publicación via `afterChange` update | Virtual fields | Payload 3 no soporta virtual fields nativamente; resetear es más simple |
| Cuándo publicar | `afterChange` hook en Posts | Endpoint API separado | Consistente con patrón existente (slug en `beforeChange`) |
| URL del post en RRSS | `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/{slug}` | URL relativa | Las APIs de Meta requieren URL absoluta |

## Data Flow

```
Editor guarda post (Payload Admin)
        │
        ▼
Posts.beforeChange → genera slug
        │
        ▼
Payload persiste en PostgreSQL
        │
        ▼
Posts.afterChange
  ├─ postToFacebook === true?
  │     └─ meta-api.postToFacebookPage(post)
  │           ├─ OK → log success
  │           └─ Error → log warn (no throw)
  ├─ postToInstagram === true?
  │     ├─ sin featuredImage → log warn, skip
  │     └─ con featuredImage → meta-api.postToInstagram(post)
  │           ├─ OK → log success
  │           └─ Error → log warn (no throw)
  └─ Resetea flags a false via req.payload.update()
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/collections/Posts.ts` | Modify | Agregar campos `postToFacebook`, `postToInstagram` y hook `afterChange` |
| `src/lib/meta-api.ts` | Create | Cliente Facebook Graph API v21.0 |
| `.env.local` | Modify | Agregar `META_FB_PAGE_ID`, `META_FB_ACCESS_TOKEN`, `META_IG_ACCOUNT_ID`, `NEXT_PUBLIC_SITE_URL` |
| `src/payload-types.ts` | Regenerate | `pnpm generate:types` tras modificar colección |

## Interfaces / Contracts

```typescript
// src/lib/meta-api.ts

export interface MetaPostPayload {
  title: string;
  slug: string;
  featuredImageUrl?: string; // URL absoluta de Uploadthing
}

export async function postToFacebookPage(post: MetaPostPayload): Promise<void>
export async function postToInstagram(post: MetaPostPayload): Promise<void>
```

```typescript
// Nuevos campos en Posts collection
{
  name: 'postToFacebook',
  label: 'Publicar en Facebook',
  type: 'checkbox',
  defaultValue: false,
  admin: { position: 'sidebar', description: 'Publica automáticamente al guardar' }
},
{
  name: 'postToInstagram',
  label: 'Publicar en Instagram',
  type: 'checkbox',
  defaultValue: false,
  admin: { position: 'sidebar', description: 'Requiere imagen principal' }
}
```

## Testing Strategy

| Layer | Qué testear | Approach |
|-------|-------------|----------|
| Unit | `meta-api.ts` con tokens ausentes | No disponible (proyecto sin test runner) |
| Manual | Publicación real con cuenta de prueba | Usar una Page/cuenta de test de Meta |
| Lint/Types | Tipos generados correctos | `pnpm lint && pnpm build` |

## Migration / Rollout

Requiere migración de DB (dos columnas boolean nuevas en tabla `posts`). Payload genera la migración automáticamente al iniciar con `pnpm dev`. Las columnas son nullable con default `false` — no hay riesgo para posts existentes.

Para activar en producción: el cliente agrega las 3 env vars al servidor. Sin ellas, la feature está inactiva silenciosamente.

## Open Questions

- [ ] ¿`NEXT_PUBLIC_SITE_URL` ya está definida en el proyecto o hay que agregarla?
- [ ] ¿La imagen de Uploadthing tiene URL pública accesible por Meta (sin auth)? Meta requiere URL pública para Instagram.
