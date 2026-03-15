import { Radio } from 'lucide-react';

import { getYouTubeLiveStatus } from '@/app/services/youtube';

export async function YoutubeLiveEmbed() {
  const status = await getYouTubeLiveStatus();

  if (!status.isLive) return null;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2">
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-red-600" />
        </span>
        <Radio className="size-4 text-red-600" />
        <span className="text-sm font-semibold uppercase tracking-wide text-red-600">En vivo</span>
        <span className="text-sm text-muted-foreground truncate">{status.title}</span>
      </div>

      <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${status.videoId}?autoplay=1&mute=1`}
          title={status.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
