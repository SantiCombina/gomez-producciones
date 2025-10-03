'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function MobileMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={28} className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle>Navegación</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-1">
          <Button
            variant="ghost"
            className={`justify-start relative px-3 py-3 transition-all duration-300 ${
              isActive('/')
                ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
            asChild
          >
            <Link href="/">Inicio</Link>
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
            <Link href="/nosotros">Nosotros</Link>
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
            <Link href="/contacto">Contacto</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
