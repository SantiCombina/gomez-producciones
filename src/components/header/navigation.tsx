'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Button
        variant="ghost"
        size="sm"
        className={`relative px-0 py-2 bg-transparent hover:bg-transparent transition-all duration-300 ${
          isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
        }`}
        asChild
      >
        <Link href="/" className="relative">
          Inicio
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
              isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`relative px-0 py-2 bg-transparent hover:bg-transparent transition-all duration-300 ${
          isActive('/nosotros') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
        }`}
        asChild
      >
        <Link href="/nosotros" className="relative">
          Nosotros
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
              isActive('/nosotros') ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`relative px-0 py-2 bg-transparent hover:bg-transparent transition-all duration-300 ${
          isActive('/contacto') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
        }`}
        asChild
      >
        <Link href="/contacto" className="relative">
          Contacto
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
              isActive('/contacto') ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </Link>
      </Button>
    </nav>
  );
}
