'use client';

import { Download, Home, Info, Menu, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/nosotros', label: 'Nosotros', icon: Info },
  { href: '/contacto', label: 'Contacto', icon: Phone },
];

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
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu size={28} className="md:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[82vw] max-w-[300px] flex flex-col p-0 gap-0">
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

        <div className="px-5 pt-8 pb-3">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/60">
            Secciones
          </p>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 px-4 py-5 rounded-2xl transition-all duration-200 ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted active:bg-muted/80'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    active ? 'bg-white/20' : 'bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[17px] font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        {!isStandalone && installEvent && (
          <div className="px-4 pb-8 pt-4 shrink-0">
            <div className="h-px bg-border mb-4" />
            <Button
              onClick={handleInstall}
              variant="ghost"
              className="w-full h-auto whitespace-normal !items-center !justify-start rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 hover:bg-sky-100 hover:border-sky-300 active:bg-sky-200"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-xl bg-sky-500 shrink-0">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm text-sky-900 leading-tight">Instalá la app</p>
                  <p className="text-xs text-sky-600 mt-0.5">Acceso rápido a las noticias</p>
                </div>
              </div>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
