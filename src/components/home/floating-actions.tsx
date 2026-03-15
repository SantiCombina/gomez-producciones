'use client';

import { LayoutDashboardIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Dialog } from '@/components/ui/dialog';
import type { ArticleLabel, User } from '@/payload-types';

import { PostDialog } from './create-post/post-dialog';

interface Props {
  user: User;
  initialCategories: ArticleLabel[];
}

export function FloatingActions({ user, initialCategories }: Props) {
  const [open, setOpen] = useState(false);
  const isAdmin = user.role === 'admin';

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-3 rounded-full shadow-lg hover:bg-muted transition-colors text-sm font-medium"
          >
            <LayoutDashboardIcon className="h-4 w-4" />
            Panel avanzado
          </Link>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3.5 rounded-full shadow-lg hover:bg-primary/90 active:scale-95 transition-all text-sm font-semibold"
        >
          <PlusIcon className="h-5 w-5" />
          Publicar
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <PostDialog onSuccess={() => setOpen(false)} initialCategories={initialCategories} />
      </Dialog>
    </>
  );
}
