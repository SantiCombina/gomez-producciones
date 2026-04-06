# Tasks: YouTube Live Header Indicator

## Phase 1: Route Handler (API)

- [x] 1.1 Crear `src/app/api/youtube-live/route.ts` con función cacheada via `unstable_cache` (TTL 900s) que llama a `search.list` de YouTube API v3
- [x] 1.2 Implementar fallo silencioso: si `YOUTUBE_API_KEY` o `YOUTUBE_CHANNEL_ID` no están definidos, retornar `{ isLive: false }`
- [x] 1.3 Retornar `NextResponse.json({ isLive: boolean, videoId?: string })`

## Phase 2: Client Component LiveBadge

- [x] 2.1 Crear `src/components/header/live-badge.tsx` como Client Component (`'use client'`)
- [x] 2.2 Implementar fetch a `/api/youtube-live` en `useEffect` al montar el componente
- [x] 2.3 Implementar `setInterval(fetch, 900_000)` con cleanup en el return del `useEffect`
- [x] 2.4 Estado live → renderizar barra roja completa: `<a>` full-width con `bg-red-600`, dot pulsante (`animate-ping`), texto "EN VIVO", ícono `<Youtube />`
- [x] 2.5 Estado no-live → renderizar el contenido original del TopBar (texto + íconos de redes sociales)

## Phase 3: Integración en TopBar

- [x] 3.1 Modificar `src/components/header/top-bar.tsx`: reemplazar todo el contenido interno por `<LiveBadge />`
- [x] 3.2 Mover la lista `socialLinks` y el JSX de íconos al interior de `live-badge.tsx` (estado no-live)
- [x] 3.3 Verificar que `TopBar` sigue siendo Server Component (solo renderiza el wrapper `<div>` con clases base y delega a `LiveBadge`)

## Phase 4: Verificación

- [x] 4.1 Ejecutar `pnpm lint` y corregir errores
- [x] 4.2 Ejecutar `pnpm build` y verificar que no hay errores de tipos ni de build
- [ ] 4.3 Verificar manualmente en dev que sin transmisión el TopBar se ve igual que antes
- [ ] 4.4 Verificar que la API key NO aparece en Network tab del browser (DevTools)
- [ ] 4.5 Verificar que `GET /api/youtube-live` responde `{ isLive: false }` cuando no hay stream activo
