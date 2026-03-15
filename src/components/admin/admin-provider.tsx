'use client';

import { HomeIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';

import { getArticleLabelsAction } from '@/components/home/create-post/actions';
import { PostDialog } from '@/components/home/create-post/post-dialog';
import { Dialog } from '@/components/ui/dialog';
import type { ArticleLabel } from '@/payload-types';

const fabWrap: React.CSSProperties = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '12px',
};

const portalBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 18px',
  borderRadius: '9999px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  color: '#374151',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  textDecoration: 'none',
  fontFamily: 'system-ui, sans-serif',
};

const publishBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  borderRadius: '9999px',
  background: '#2563eb',
  border: 'none',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(37,99,235,0.4)',
  fontFamily: 'system-ui, sans-serif',
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ArticleLabel[]>([]);
  const { executeAsync } = useAction(getArticleLabelsAction);

  async function handlePublish() {
    if (categories.length === 0) {
      const result = await executeAsync();
      if (result?.data) setCategories(result.data as ArticleLabel[]);
    }
    setOpen(true);
  }

  return (
    <>
      {children}

      <div style={fabWrap}>
        <Link href="/" style={portalBtn}>
          <HomeIcon size={16} />
          Volver al portal
        </Link>
        <button type="button" onClick={handlePublish} style={publishBtn}>
          <PlusIcon size={18} />
          Publicar
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <PostDialog onSuccess={() => setOpen(false)} initialCategories={categories} />
      </Dialog>
    </>
  );
}
