'use client';

import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PwaInstallButton() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(true);

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => setIsStandalone(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  if (isStandalone || !installEvent) return null;

  const handleInstall = async () => {
    await installEvent.prompt();
    const result = await installEvent.userChoice;
    if (result.outcome === 'accepted') setIsStandalone(true);
  };

  return (
    <Button
      onClick={handleInstall}
      variant="ghost"
      className="w-full h-auto !items-center !justify-start whitespace-normal rounded-xl border border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 hover:border-primary/30 active:bg-primary/15"
    >
      <div className="flex items-center gap-3 w-full">
        <div className="p-2 rounded-lg bg-primary shrink-0">
          <Download className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="text-left">
          <p className="font-semibold text-sm">Instalá la app</p>
          <p className="text-xs text-muted-foreground">Gratis · Acceso rápido</p>
        </div>
      </div>
    </Button>
  );
}
