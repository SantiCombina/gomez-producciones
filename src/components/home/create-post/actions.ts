'use server';

import { createMedia } from '@/app/services/media';
import { createPost } from '@/app/services/post';
import { authActionClient } from '@/lib/safe-action-client';

import { createPostSchema } from './create-post-schema';

export const createPostAction = authActionClient.schema(createPostSchema).action(async ({ parsedInput }) => {
  let mediaId: number | undefined;

  if (parsedInput.image && (parsedInput.image as File).size > 0) {
    const media = await createMedia(parsedInput.image as File, parsedInput.title);
    mediaId = media.id;
  }

  const result = await createPost({
    title: parsedInput.title,
    description: parsedInput.description,
    featuredImage: mediaId,
  });

  if (!result.success) {
    throw new Error(result.message || 'Error al crear la publicación');
  }

  return result.post;
});
