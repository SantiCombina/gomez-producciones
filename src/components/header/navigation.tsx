'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

interface NavigationProps {
  isAdmin: boolean;
}

export function Navigation({ isAdmin }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const items = isAdmin ? [...navItems, { href: '/admin', label: 'Admin' }] : navItems;

  return (
    <nav className="hidden md:flex items-center gap-8">
      {items.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`relative text-base font-medium py-2 transition-colors duration-200 ${
            isActive(href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {label}
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
              isActive(href) ? 'w-full' : 'w-0'
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}
