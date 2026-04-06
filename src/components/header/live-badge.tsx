'use client';

import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

type LiveState = {
  isLive: boolean;
  videoId?: string;
};

const POLL_INTERVAL = 900_000; // 15 minutos — coincide con el TTL del caché server-side

const socialLinks = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@oscargomezproducciones4552',
    icon: <Youtube className="size-4" />,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100063067038840',
    icon: <Facebook className="size-4" />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/oscar.gomez64/',
    icon: <Instagram className="size-4" />,
  },
];

export function LiveBadge() {
  const [liveState, setLiveState] = useState<LiveState>({ isLive: false });

  useEffect(() => {
    async function checkLive() {
      try {
        const res = await fetch('/api/youtube-live');
        if (res.ok) {
          const data: LiveState = await res.json();
          setLiveState(data);
        }
      } catch {
        // fallo silencioso — el estado por defecto es no-live
      }
    }

    checkLive();

    const interval = setInterval(checkLive, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  if (liveState.isLive && liveState.videoId) {
    return (
      <a
        href={`https://www.youtube.com/watch?v=${liveState.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
        aria-label="Ver transmisión en vivo en YouTube"
      >
        <div className="container">
          <div className="flex items-center justify-center gap-3 h-9">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">En vivo</span>
            <Youtube className="size-4 text-white" />
          </div>
        </div>
      </a>
    );
  }

  return (
    <div className="bg-foreground text-background/70">
      <div className="container">
        <div className="flex items-center justify-between h-9">
          <span className="text-[10px] uppercase tracking-widest text-background/60">Tu portal de noticias</span>
          <div className="flex items-center space-x-1">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                size="icon"
                className="h-7 w-7 rounded-full bg-transparent text-background/60 hover:bg-primary hover:text-primary-foreground transition-all duration-200 border-0 shadow-none"
                asChild
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Seguinos en ${social.name}`}
                >
                  {social.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
