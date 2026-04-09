'use client';

import { HomeIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useRef, useState } from 'react';

import { getArticleLabelsAction, getLocationsAction } from '@/components/home/create-post/actions';
import type { PostDraft } from '@/components/home/create-post/post-dialog';
import { PostDialog } from '@/components/home/create-post/post-dialog';
import { Dialog } from '@/components/ui/dialog';
import type { ArticleLabel, Location } from '@/payload-types';

const css = `
  .gp-fab-wrap {
    position: fixed !important;
    bottom: 24px !important;
    right: 24px !important;
    z-index: 9999 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-end !important;
    gap: 12px !important;
  }
  .gp-fab-portal {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 10px 18px !important;
    border-radius: 9999px !important;
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    color: #374151 !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
    text-decoration: none !important;
    font-family: system-ui, sans-serif !important;
    white-space: nowrap !important;
  }
  .gp-fab-publish {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    padding: 12px 20px !important;
    border-radius: 9999px !important;
    background: #2563eb !important;
    border: none !important;
    color: #ffffff !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    box-shadow: 0 4px 12px rgba(37,99,235,0.4) !important;
    font-family: system-ui, sans-serif !important;
    white-space: nowrap !important;
  }
  @media (max-width: 640px) {
    .gp-fab-portal {
      padding: 0 !important;
      width: 36px !important;
      height: 36px !important;
      justify-content: center !important;
    }
    .gp-fab-portal .gp-fab-text,
    .gp-fab-portal .gp-fab-icon-desk { display: none !important; }
    .gp-fab-portal .gp-fab-icon-mob { display: flex !important; }
    .gp-fab-publish {
      padding: 0 !important;
      width: 52px !important;
      height: 52px !important;
      gap: 0 !important;
    }
    .gp-fab-publish .gp-fab-text { display: none !important; }
  }
  @media (min-width: 641px) {
    .gp-fab-portal .gp-fab-icon-mob { display: none !important; }
  }
`;

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ArticleLabel[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const draftRef = useRef<PostDraft>({ title: '', description: '', images: [], imagePreviews: [] });
  const { executeAsync } = useAction(getArticleLabelsAction);
  const { executeAsync: executeLocations } = useAction(getLocationsAction);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  async function handlePublish() {
    if (categories.length === 0 || locations.length === 0) {
      const [catResult, locResult] = await Promise.all([
        categories.length === 0 ? executeAsync() : Promise.resolve(null),
        locations.length === 0 ? executeLocations() : Promise.resolve(null),
      ]);
      if (catResult?.data) setCategories(catResult.data as ArticleLabel[]);
      if (locResult?.data) setLocations(locResult.data as Location[]);
    }
    setOpen(true);
  }

  return (
    <>
      {children}

      <style>{css}</style>

      <div className="gp-fab-wrap">
        <Link href="/" className="gp-fab-portal">
          <HomeIcon size={16} />
          <span className="gp-fab-text">Volver al portal</span>
        </Link>

        {!isAdmin && (
          <button type="button" onClick={handlePublish} className="gp-fab-publish">
            <PlusIcon size={20} />
            <span className="gp-fab-text">Publicar</span>
          </button>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <PostDialog
          onSuccess={() => setOpen(false)}
          onClose={() => setOpen(false)}
          initialCategories={categories}
          initialLocations={locations}
          draft={draftRef.current}
          onUnmount={(d) => { draftRef.current = d; }}
        />
      </Dialog>
    </>
  );
}
