import Image from 'next/image';
import Link from 'next/link';

import { MobileMenu } from './mobile-menu';
import { Navigation } from './navigation';
import { TopBar } from './top-bar';

export function Header() {
  return (
    <header className="border-b bg-background">
      <TopBar />
      <div className="container">
        <div className="flex items-center justify-between h-48">
          <div className="flex items-center space-x-5">
            <Link
              href="/"
              className="flex items-center space-x-4 sm:space-x-5 hover:opacity-80 transition-opacity w-[60vw] sm:w-auto max-w-sm min-w-48"
            >
              <Image
                src="/icon.svg"
                alt="Gomez Producciones Icon"
                width={85}
                height={85}
                className="flex-shrink-0 w-auto h-12 sm:h-16 md:h-20 lg:h-[85px] min-h-14"
              />
              <Image
                src="/logo-text.svg"
                alt="Gomez Producciones"
                width={280}
                height={48}
                className="w-auto h-6 sm:h-8 md:h-10 lg:h-12 min-h-7"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Navigation />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
