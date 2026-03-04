'use client';

import { useState } from 'react';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import type { ArticleLabel, User } from '@/payload-types';

import { PostDialog } from './post-dialog';
import { TriggerBar } from './trigger-bar';

interface Props {
  user: User;
  initialCategories: ArticleLabel[];
}

export function CreatePostTrigger({ user, initialCategories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TriggerBar user={user} />
      </DialogTrigger>
      <PostDialog onSuccess={() => setOpen(false)} initialCategories={initialCategories} />
    </Dialog>
  );
}
