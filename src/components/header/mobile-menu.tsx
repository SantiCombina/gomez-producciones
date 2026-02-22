'use client';

import { Download, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const result = await installEvent.userChoice;
    if (result.outcome === 'accepted') setIsStandalone(true);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu size={28} className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="right" className="w-64 flex flex-col">
        <SheetHeader>
          <SheetTitle>Navegación</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-1 flex-1">
          <Button
            variant="ghost"
            className={`justify-start relative px-3 py-3 transition-all duration-300 ${
              isActive('/')
                ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
            asChild
          >
            <Link href="/" onClick={() => setOpen(false)}>
              Inicio
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`justify-start relative px-3 py-3 transition-all duration-300 ${
              isActive('/nosotros')
                ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
            asChild
          >
            <Link href="/nosotros" onClick={() => setOpen(false)}>
              Nosotros
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`justify-start relative px-3 py-3 transition-all duration-300 ${
              isActive('/contacto')
                ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
            asChild
          >
            <Link href="/contacto" onClick={() => setOpen(false)}>
              Contacto
            </Link>
          </Button>
        </div>

        {!isStandalone && installEvent && (
          <div className="pb-2">
            <Separator className="mb-4" />
            <Button
              onClick={handleInstall}
              variant="ghost"
              className="w-full h-auto rounded-xl border border-sky-200 bg-sky-50 p-3 hover:bg-sky-100 hover:border-sky-300 active:bg-sky-200 justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-sky-500 shrink-0">
                  <Download className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-sky-900">Instalá la app</p>
                  <p className="text-xs text-sky-600">Acceso rápido a las noticias</p>
                </div>
              </div>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
