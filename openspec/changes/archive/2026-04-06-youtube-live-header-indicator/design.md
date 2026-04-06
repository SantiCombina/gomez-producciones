# Design: YouTube Live Header Indicator

## Technical Approach

Route Handler en `src/app/api/youtube-live/route.ts` con caché server-side vía `unstable_cache` (TTL 900s). Client Component `LiveBadge` consume el endpoint y renderiza el badge o el texto por defecto. `TopBar` reemplaza su `<span>` estático por `<LiveBadge />`.

## Architecture Decisions

| Decisión | Elegido | Alternativa | Rationale |
|----------|---------|-------------|-----------|
| Caché server-side | `unstable_cache` (next/cache) | `fetch` con `{ next: { revalidate } }` | `unstable_cache` es explícito y funciona consistentemente en Route Handlers de Next.js 15 |
| Polling client | `setInterval` en `useEffect` | SWR / React Query | Sin dependencias extra; el intervalo coincide exactamente con el TTL del caché |
| Ubicación del route | `src/app/api/` (fuera de route groups) | `src/app/(frontend)/api/` | Los Route Handlers públicos van fuera de route groups en este proyecto |
| Estado inicial | Texto por defecto (sin hydration flash) | Spinner / skeleton | Mejor UX: si no está en vivo (caso normal), el usuario no ve ningún cambio |

## Data Flow

```
Browser (cada 15 min)
    │
    └── GET /api/youtube-live
              │
        Route Handler
              │
        unstable_cache (TTL 900s) ──── HIT ──→ { isLive, videoId }
              │ MISS
              ↓
    YouTube Data API v3
    search.list?part=id&channelId=...&type=video&eventType=live
              │
              ↓
    { isLive: boolean, videoId?: string }
              │
              ↓
        JSON Response
              │
        LiveBadge (Client Component)
              │
        isLive=true → <a href="youtube.com/watch?v={videoId}">🔴 EN VIVO</a>
        isLive=false → <span>Tu portal de noticias</span>
```

## File Changes

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/app/api/youtube-live/route.ts` | Crear | Route Handler con `unstable_cache` → YouTube API |
| `src/components/header/live-badge.tsx` | Crear | Client Component con polling y badge visual |
| `src/components/header/top-bar.tsx` | Modificar | Reemplazar `<span>` estático por `<LiveBadge />` |

## Interfaces / Contracts

```typescript
// GET /api/youtube-live — respuesta
type YouTubeLiveResponse = {
  isLive: boolean;
  videoId?: string;
};

// Route Handler — función cacheada interna
const checkLiveStatus = unstable_cache(
  async (): Promise<YouTubeLiveResponse> => { ... },
  ['youtube-live-status'],
  { revalidate: 900 }
);
```

```typescript
// LiveBadge — estado interno
type LiveState = {
  isLive: boolean;
  videoId?: string;
};
// Estado inicial: { isLive: false } → renderiza texto por defecto sin flash
```

## Implementación clave — Route Handler

```typescript
// src/app/api/youtube-live/route.ts
import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

const checkLiveStatus = unstable_cache(
  async () => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    if (!apiKey || !channelId) return { isLive: false };

    const url = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const videoId = data.items?.[0]?.id?.videoId;
    return { isLive: !!videoId, videoId };
  },
  ['youtube-live-status'],
  { revalidate: 900 }
);

export async function GET() {
  const status = await checkLiveStatus();
  return NextResponse.json(status);
}
```

## Testing Strategy

| Layer | Qué testear | Approach |
|-------|-------------|----------|
| Manual | Badge aparece con canal en vivo | Simular con un canal en vivo conocido |
| Manual | Sin env vars → sin badge | Comentar vars en `.env.local` |
| Manual | Link lleva a la transmisión correcta | Click en el badge |
| Lint/Types | Tipos correctos | `pnpm lint && tsc --noEmit` |

Sin test runner disponible en el proyecto — verificación manual + lint.

## Migration / Rollout

No hay migración de datos. Agregar `YOUTUBE_API_KEY` y `YOUTUBE_CHANNEL_ID` a Vercel env vars antes del deploy.

## Open Questions

- Ninguna — diseño completo y listo para implementar.
