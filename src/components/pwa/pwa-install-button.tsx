'use client';

import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    <button
      onClick={handleInstall}
      className="w-full text-left rounded-xl border border-sky-200 bg-sky-50 p-4 transition-colors hover:bg-sky-100 hover:border-sky-300 active:bg-sky-200 cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-sky-500 shrink-0">
          <Download className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-sky-900">Instalá la app</p>
          <p className="text-xs text-sky-600">Gratis · Acceso rápido</p>
        </div>
      </div>
      <p className="text-xs text-sky-700 leading-relaxed">
        Tocá aquí para instalar Gomez Producciones en tu dispositivo y acceder a las noticias al instante.
      </p>
    </button>
  );
}
