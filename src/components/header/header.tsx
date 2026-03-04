import Image from 'next/image';
import Link from 'next/link';

import { MobileMenu } from './mobile-menu';
import { Navigation } from './navigation';
import { TopBar } from './top-bar';

export function Header() {
  return (
    <header className="border-b bg-white">
      <TopBar />
      <div className="container">
        <div className="flex items-center justify-between h-36">
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/og-logo-black.png"
                alt="Oscar Gómez Producciones"
                width={320}
                height={90}
                className="w-auto h-16 sm:h-20 md:h-24 lg:h-28"
                priority
              />
            </Link>
          </div>
          <div className="flex items-center pr-2">
            <Navigation />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
