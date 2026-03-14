import { HomeIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          La página que buscás no existe o fue eliminada.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/">
            <HomeIcon className="h-5 w-5 mr-2" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}
