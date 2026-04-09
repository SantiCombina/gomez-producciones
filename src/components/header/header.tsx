import Image from 'next/image';
import Link from 'next/link';

import { getCurrentUser } from '@/app/services/users';
import { FloatingActions } from '@/components/home/floating-actions';

import { MobileMenu } from './mobile-menu';
import { Navigation } from './navigation';
import { TopBar } from './top-bar';

export async function Header() {
  const user = await getCurrentUser();

  return (
    <>
      <header className="bg-card border-b">
        <TopBar />
        <div className="container">
          <div className="flex items-center justify-between h-24 md:h-28 lg:h-32">
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
            <div className="flex items-center gap-2 pr-2">
              <Navigation />
              <MobileMenu isLoggedIn={!!user} />
            </div>
          </div>
        </div>
      </header>
      {user && <FloatingActions />}
    </>
  );
}
