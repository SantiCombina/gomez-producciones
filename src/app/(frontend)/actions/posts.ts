'use server';

import { z } from 'zod';

import { getPosts } from '@/app/services/post';
import { actionClient } from '@/lib/safe-action-client';

export const loadMorePostsAction = actionClient
  .schema(
    z.object({
      page: z.number().int().min(2),
      category: z.number().nullable(),
    }),
  )
  .action(async ({ parsedInput: { page, category } }) => {
    const result = await getPosts({
      page,
      limit: 8,
      category: category !== null ? String(category) : undefined,
    });

    return {
      docs: result.data?.docs ?? [],
      hasNextPage: result.data?.hasNextPage ?? false,
    };
  });
