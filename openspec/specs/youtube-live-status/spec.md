# Spec: YouTube Live Status

**Capability**: `youtube-live-status`
**Introducida en**: `youtube-live-header-indicator` (2026-04-06)

## Descripción

Consulta periódica a la YouTube Data API v3 para detectar si el canal configurado tiene una transmisión en vivo activa. El resultado se cachea server-side y se expone al cliente vía Route Handler. El TopBar refleja visualmente el estado.

## Requirements

### Requirement: Detección de transmisión en vivo

El sistema DEBE detectar si el canal de YouTube (`YOUTUBE_CHANNEL_ID`) tiene una transmisión activa usando `search.list?eventType=live`.

- La detección DEBE ocurrir server-side, nunca en el cliente.
- El resultado DEBE ser cacheado con TTL de 900 segundos (`unstable_cache`).
- El endpoint DEBE ser `GET /api/youtube-live`.
- La respuesta DEBE tener la forma `{ isLive: boolean, videoId?: string }`.

### Requirement: Control de quota

El sistema DEBE mantenerse dentro del plan gratuito de YouTube Data API v3 (10,000 unidades/día).

- La llamada real a YouTube API NO DEBE ocurrir más de 1 vez cada 15 minutos por el servidor, independientemente del tráfico.
- `search.list` cuesta 100 unidades/llamada → máx. 96 llamadas/día = 9,600 unidades.

### Requirement: Seguridad de credenciales

- `YOUTUBE_API_KEY` DEBE ser usada solo en el Route Handler (server-side).
- La API key NO DEBE aparecer en ninguna respuesta enviada al cliente.

### Requirement: Fallo silencioso

Si `YOUTUBE_API_KEY` o `YOUTUBE_CHANNEL_ID` no están definidos, o si la API devuelve un error, el sistema DEBE retornar `{ isLive: false }` sin lanzar excepciones.

### Requirement: Indicador visual en el TopBar

- Cuando `isLive: true`: el TopBar DEBE mostrar una barra de ancho completo con fondo `bg-red-600`, un punto pulsante (`animate-ping`), texto "En vivo" y el ícono de YouTube. La barra completa DEBE ser un enlace a `https://www.youtube.com/watch?v={videoId}`.
- Cuando `isLive: false`: el TopBar DEBE mostrar el contenido por defecto (texto "Tu portal de noticias" e íconos de redes sociales) sin cambios visuales.
- El estado inicial del componente cliente DEBE ser `{ isLive: false }` para evitar hydration flash.

## Archivos

| Archivo | Rol |
|---------|-----|
| `src/app/api/youtube-live/route.ts` | Route Handler con caché server-side |
| `src/components/header/live-badge.tsx` | Client Component — polling y renderizado condicional |
| `src/components/header/top-bar.tsx` | Server Component — delega a `<LiveBadge />` |
