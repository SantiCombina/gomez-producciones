# Proposal: YouTube Live Header Indicator

## Intent

Mostrar un indicador visual en el TopBar cuando el canal de YouTube del cliente está en vivo, permitiendo al usuario navegar a la transmisión con un clic. El chequeo debe mantenerse dentro del plan gratuito de la YouTube Data API v3 (10,000 unidades/día).

## Scope

### In Scope
- Route Handler `/api/youtube-live` con caché server-side de 15 minutos
- Badge "🔴 EN VIVO" en el TopBar cuando hay transmisión activa (reemplaza "Tu portal de noticias")
- Link directo a la transmisión en YouTube al hacer clic en el badge
- Fallo silencioso si las variables de entorno no están configuradas

### Out of Scope
- Notificaciones push o alertas al usuario
- Configuración del canal desde el panel de administración de Payload
- Soporte para múltiples canales
- Historial de transmisiones pasadas

## Capabilities

### New Capabilities
- `youtube-live-status`: Consulta periódica a YouTube API para detectar transmisiones en vivo del canal, con caché compartido server-side para control de quota.

### Modified Capabilities
- Ninguna

## Approach

1. **Route Handler** `src/app/api/youtube-live/route.ts` — llama a `search.list` de YouTube API v3 con `unstable_cache` (TTL: 900s). Devuelve `{ isLive: boolean, videoId?: string }`.
2. **`LiveBadge`** `src/components/header/live-badge.tsx` — Client Component que hace `fetch('/api/youtube-live')` al montar y refresca con `setInterval(900_000)`. Renderiza el badge o null.
3. **`TopBar`** — incorpora `<LiveBadge />` como hijo; el texto "Tu portal de noticias" queda como fallback dentro del Client Component.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/api/youtube-live/route.ts` | New | Route Handler con caché de YouTube API |
| `src/components/header/live-badge.tsx` | New | Client Component con polling y badge visual |
| `src/components/header/top-bar.tsx` | Modified | Incorpora `<LiveBadge />` |
| `.env.local` / Vercel env vars | Dependency | `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` ya presentes |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Superar quota gratuita | Low | TTL 900s = 96 llamadas/día = 9,600 unidades (margen de 400) |
| API key expuesta al cliente | Low | La key solo se usa en el Route Handler (server-side) |
| Entorno de producción sin env vars | Med | Fallo silencioso: LiveBadge no renderiza nada |

## Rollback Plan

Revertir los cambios en `top-bar.tsx` y eliminar `live-badge.tsx` y `route.ts`. No hay migraciones de base de datos ni cambios en colecciones de Payload.

## Dependencies

- `YOUTUBE_API_KEY` y `YOUTUBE_CHANNEL_ID` en variables de entorno de producción (Vercel)

## Success Criteria

- [ ] El badge "🔴 EN VIVO" aparece en el TopBar cuando el canal tiene una transmisión activa
- [ ] El link lleva a `https://www.youtube.com/watch?v={videoId}`
- [ ] Sin transmisión activa, el TopBar muestra "Tu portal de noticias" sin cambios
- [ ] La YouTube API no es llamada más de 1 vez cada 15 minutos por el servidor
- [ ] La API key no aparece en ninguna respuesta del cliente (DevTools → Network)
