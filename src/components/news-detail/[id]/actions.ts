import { z } from 'zod';

import { getPostById } from '@/app/services/post';
import { actionClient } from '@/lib/safe-action-client';

const getPostByIdSchema = z.object({
  id: z.string().min(1, 'El ID del post es requerido'),
});

export const getPostByIdAction = actionClient.schema(getPostByIdSchema).action(async ({ parsedInput: { id } }) => {
  const post = await getPostById(id);

  if (!post) {
    throw new Error('Post no encontrado');
  }

  return post;
});
