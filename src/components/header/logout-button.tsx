'use client';

import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';

import { logoutAction } from './actions';

export function LogoutButton() {
  const router = useRouter();
  const { executeAsync, isPending } = useAction(logoutAction);

  async function handleLogout() {
    await executeAsync();
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      disabled={isPending}
      className="h-10 w-10 text-muted-foreground hover:text-foreground"
      aria-label="Cerrar sesión"
    >
      <LogOutIcon className="h-5 w-5" />
    </Button>
  );
}
