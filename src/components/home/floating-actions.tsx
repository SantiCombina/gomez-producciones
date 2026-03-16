'use client';

import { LayoutDashboardIcon, LogOutIcon, MoreHorizontalIcon, PlusIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useRef, useState } from 'react';

import { logoutAction } from '@/components/header/actions';
import { getArticleLabelsAction } from '@/components/home/create-post/actions';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import type { ArticleLabel, User } from '@/payload-types';

import { PostDialog } from './create-post/post-dialog';

interface Props {
  user: User;
}

export function FloatingActions({ user }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<ArticleLabel[]>([]);
  const isAdmin = user.role === 'admin';
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { executeAsync: logout, isPending } = useAction(logoutAction);
  const { executeAsync: fetchCategories } = useAction(getArticleLabelsAction);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  async function handlePublish() {
    if (categories.length === 0) {
      const result = await fetchCategories();
      if (result?.data) setCategories(result.data as ArticleLabel[]);
    }
    setDialogOpen(true);
  }

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
    router.refresh();
  }

  return (
    <>
      <div
        ref={menuRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pb-[env(safe-area-inset-bottom)]"
      >
        {menuOpen && (
          <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-full border bg-white px-4 py-2.5 text-sm font-medium text-foreground shadow-md transition-colors hover:bg-muted no-underline"
              >
                <LayoutDashboardIcon size={16} />
                Ir al panel
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isPending}
              className="flex items-center gap-2.5 rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 shadow-md transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              <LogOutIcon size={16} />
              Cerrar sesión
            </button>
          </div>
        )}

        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Más opciones"
            className="size-8 sm:size-10 rounded-full shadow-md"
          >
            {menuOpen ? <XIcon size={14} /> : <MoreHorizontalIcon size={14} />}
          </Button>

          <Button onClick={handlePublish} className="rounded-full shadow-lg size-12 sm:size-auto sm:px-5">
            <PlusIcon size={18} />
            <span className="hidden sm:inline">Publicar</span>
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <PostDialog onSuccess={() => setDialogOpen(false)} initialCategories={categories} />
      </Dialog>
    </>
  );
}
