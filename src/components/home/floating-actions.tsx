'use client';

import { LayoutDashboardIcon, LogOutIcon, MoreHorizontalIcon, PlusIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useRef, useState } from 'react';

import { logoutAction } from '@/components/header/actions';
import { getArticleLabelsAction, getLocationsAction } from '@/components/home/create-post/actions';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import type { ArticleLabel, Location } from '@/payload-types';

import type { PostDraft } from './create-post/post-dialog';
import { PostDialog } from './create-post/post-dialog';

export function FloatingActions() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<ArticleLabel[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef<PostDraft>({ title: '', description: '', images: [], imagePreviews: [] });

  const router = useRouter();
  const { executeAsync: logout, isPending } = useAction(logoutAction);
  const { executeAsync: fetchCategories } = useAction(getArticleLabelsAction);
  const { executeAsync: fetchLocations } = useAction(getLocationsAction);

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
    const [catResult, locResult] = await Promise.all([
      categories.length === 0 ? fetchCategories() : Promise.resolve(null),
      locations.length === 0 ? fetchLocations() : Promise.resolve(null),
    ]);
    if (catResult?.data) setCategories(catResult.data as ArticleLabel[]);
    if (locResult?.data) setLocations(locResult.data as Location[]);
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
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-full border bg-white px-4 py-2.5 text-sm font-medium text-foreground shadow-md transition-colors hover:bg-gray-100 no-underline"
            >
              <LayoutDashboardIcon size={16} />
              Ir al panel
            </Link>
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

        <div className="flex flex-col items-end gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Más opciones"
            className="size-8 rounded-full shadow-md bg-white/90 hover:bg-gray-100"
          >
            {menuOpen ? <XIcon size={12} /> : <MoreHorizontalIcon size={12} />}
          </Button>

          <Button onClick={handlePublish} className="rounded-full shadow-lg px-5">
            <PlusIcon size={18} />
            Publicar
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <PostDialog
          onSuccess={() => setDialogOpen(false)}
          onClose={() => setDialogOpen(false)}
          initialCategories={categories}
          initialLocations={locations}
          draft={draftRef.current}
          onUnmount={(d) => {
            draftRef.current = d;
          }}
        />
      </Dialog>
    </>
  );
}
