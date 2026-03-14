'use client';

import { RefreshCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  reset: () => void;
}

export default function Error({ reset }: Props) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-4xl font-bold text-muted-foreground">Error</h1>
        <h2 className="text-2xl font-semibold">Algo salió mal</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Ocurrió un error inesperado. Intentá nuevamente.
        </p>
        <Button onClick={reset} size="lg" className="mt-4">
          <RefreshCwIcon className="h-5 w-5 mr-2" />
          Reintentar
        </Button>
      </div>
    </div>
  );
}
