# Exploration: YouTube Live Header Indicator

## Current State

El `TopBar` (`src/components/header/top-bar.tsx`) es un Server Component que muestra:
- Texto "Tu portal de noticias" (izquierda)
- Íconos de redes sociales: YouTube, Facebook, Instagram (derecha)

El header principal (`src/components/header/header.tsx`) renderiza `<TopBar />` en la parte superior.

Las variables de entorno ya están configuradas en `.env.local`:
- `YOUTUBE_API_KEY` — clave de la YouTube Data API v3
- `YOUTUBE_CHANNEL_ID` — ID del canal (`UCBiLQKNH5AtZdq8hQRvIoFw`)

**Quota de YouTube Data API v3 (plan gratuito)**: 10,000 unidades/día.
- `search.list` cuesta **100 unidades/llamada** — permite máx. 100 llamadas/día.
- Para quedarse cómodo: **1 llamada cada 15 min** = 96 llamadas/día = 9,600 unidades.

## Affected Areas

- `src/components/header/top-bar.tsx` — donde va el indicador visual
- `src/app/(frontend)/api/youtube-live/route.ts` (nuevo) — Route Handler con caché server-side
- `.env.local` — ya tiene las variables necesarias

## Approaches

### 1. Route Handler con `unstable_cache` + Client Component polling

Crear un Route Handler `/api/youtube-live` que llama a YouTube API con `unstable_cache`
(TTL 15 min). Un Client Component en el TopBar hace `fetch` a ese endpoint y refresca
cada 15 minutos vía `setInterval`.

- **Pros**: Un solo punto de control de quota (sin importar cuántos usuarios hay, la
  llamada real a YouTube ocurre a lo sumo 1 vez cada 15 min gracias al caché server-side);
  el Client Component no necesita la API key (nunca llega al browser); fácil de testear
  el endpoint por separado.
- **Cons**: Requiere convertir parte del TopBar (o agregar un componente hijo) a Client Component.
- **Effort**: Low

### 2. Server Component con ISR / `revalidate`

Hacer que TopBar (o el Header) sea un Server Component con `fetch` cacheado y `revalidate: 900`.

- **Pros**: Sin JS extra en el cliente.
- **Cons**: El usuario no ve el estado live hasta que recarga la página; si el canal se pone
  en vivo, el indicador puede tardar hasta 15 min + tiempo de visita en aparecer. No es una
  buena UX para algo que debería sentirse en tiempo real.
- **Effort**: Low

### 3. WebSocket / Server-Sent Events

Conexión persistente que pushea el estado live al cliente.

- **Pros**: Verdaderamente en tiempo real.
- **Cons**: Infraestructura mucho más compleja; no aplica para un portal de noticias con
  Vercel/Next.js estático. Overkill.
- **Effort**: High

## Recommendation

**Opción 1**: Route Handler con `unstable_cache` (TTL 900s) + `LiveBadge` Client Component
que hace polling cada 15 minutos.

- El Route Handler es la única pieza que toca la YouTube API — garantiza que nunca se supere
  la quota independientemente del tráfico.
- El Client Component hace `fetch('/api/youtube-live')` al montar y luego cada 15 min.
- Si está en vivo: reemplaza "Tu portal de noticias" por un badge rojo pulsante "🔴 EN VIVO"
  que es un link a la transmisión.
- Si no está en vivo: comportamiento actual sin cambios visuales.

## Risks

- La YouTube API puede devolver falsos negativos si el canal tiene el stream configurado
  como privado o no listado — aceptable para este caso.
- Si `YOUTUBE_API_KEY` o `YOUTUBE_CHANNEL_ID` no están en producción (Vercel env vars),
  el indicador simplemente no aparece (debe fallar silenciosamente).
- El `unstable_cache` de Next.js puede no persistir entre redeployments en Vercel — en ese
  caso la primera request post-deploy consume 1 llamada extra. Irrelevante para la quota.

## Ready for Proposal

Sí. La solución es clara, de bajo esfuerzo y con un control preciso de la quota.
