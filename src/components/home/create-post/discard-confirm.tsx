'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { useEffect, useState } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onContinue: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

export function DiscardConfirm({ open, onContinue, onDiscard, onSave }: Props) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <DialogPrimitive.Root
        open={open}
        onOpenChange={(v) => {
          if (!v) onContinue();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[60] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <DialogPrimitive.Title className="text-base font-semibold">¿Qué querés hacer?</DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
              Tenés contenido sin publicar.
            </DialogPrimitive.Description>
            <div className="mt-4 flex flex-col gap-2">
              <Button onClick={onSave}>Guardar para después</Button>
              <Button variant="destructive" onClick={onDiscard}>
                Descartar
              </Button>
              <Button variant="ghost" onClick={onContinue}>
                Seguir editando
              </Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={(v) => {
        if (!v) onContinue();
      }}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/50" />
        <DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-[60] flex flex-col rounded-t-lg border bg-background outline-none">
          <div className="mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full bg-muted" />
          <div className="p-4 text-center">
            <p className="font-semibold">¿Qué querés hacer?</p>
            <p className="mt-1 text-sm text-muted-foreground">Tenés contenido sin publicar.</p>
          </div>
          <div className="flex flex-col gap-2 p-4 pt-0">
            <Button onClick={onSave}>Guardar para después</Button>
            <Button variant="destructive" onClick={onDiscard}>
              Descartar
            </Button>
            <Button variant="ghost" onClick={onContinue}>
              Seguir editando
            </Button>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
