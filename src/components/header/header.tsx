import Image from 'next/image';
import Link from 'next/link';

import { MenuItem } from '../home/types';

import { MobileMenu } from './mobile-menu';
import { Navigation } from './navigation';
import { TopBar } from './top-bar';

interface HeaderProps {
  menuItems: MenuItem[];
}

export function Header({ menuItems }: HeaderProps) {
  return (
    <header className="border-b bg-background">
      <TopBar />
      <div className="container">
        <div className="flex items-center justify-between h-48">
          <div className="flex items-center space-x-5">
            <Link href="/" className="flex items-center space-x-5 hover:opacity-80 transition-opacity">
              <Image src="/icon.svg" alt="Gomez Producciones Icon" width={85} height={85} className="flex-shrink-0" />
              <Image
                src="/logo-text.svg"
                alt="Gomez Producciones"
                width={280}
                height={48}
                className="hidden sm:block"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Navigation items={menuItems} />
            <MobileMenu items={menuItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
