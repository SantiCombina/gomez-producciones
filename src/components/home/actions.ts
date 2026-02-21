'use server';

import { z } from 'zod';

import { getActiveAdvertisements } from '@/app/services/advertisements';
import { getPosts } from '@/app/services/post';
import { actionClient } from '@/lib/safe-action-client';

const getPostsSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  category: z.string().optional(),
});

export const getPostsAction = actionClient
  .schema(getPostsSchema)
  .action(async ({ parsedInput: { limit, page, category } }) => {
    const result = await getPosts({ limit, page, category });

    if (!result.success) {
      throw new Error(result.message || 'Error al obtener los posts');
    }

    return result.data;
  });

export const getAdvertisementsAction = actionClient.schema(z.object({})).action(async () => {
  return await getActiveAdvertisements();
});
