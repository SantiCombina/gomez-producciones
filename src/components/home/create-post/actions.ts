'use server';

import { z } from 'zod';

import { createArticleLabel, getArticleLabels } from '@/app/services/article-labels';
import { createMedia } from '@/app/services/media';
import { createPost } from '@/app/services/post';
import { ActionError, authActionClient } from '@/lib/safe-action-client';
import type { Post } from '@/payload-types';

import { createPostSchema } from './create-post-schema';

export const createPostAction = authActionClient.schema(createPostSchema).action(async ({ parsedInput }) => {
  const imageFiles = (parsedInput.images ?? []).filter((f) => f.size > 0);

  const mediaResults = await Promise.all(imageFiles.map((f) => createMedia(f, parsedInput.title)));

  const featuredImageId = mediaResults[0]?.id;
  const galleryImageIds = mediaResults.slice(1).map((m) => ({ image: m.id }));

  let body: Post['body'] | undefined;
  if (parsedInput.body) {
    try {
      body = JSON.parse(parsedInput.body) as NonNullable<Post['body']>;
    } catch {
      throw new ActionError('El contenido del artículo no es válido.');
    }
  }

  const result = await createPost({
    title: parsedInput.title,
    description: parsedInput.description,
    body,
    category: parsedInput.categoryId,
    featuredImage: featuredImageId,
    images: galleryImageIds.length > 0 ? galleryImageIds : undefined,
  });

  if (!result.success) {
    throw new ActionError(result.message || 'Error al crear la publicación');
  }

  return result.post;
});

export const getArticleLabelsAction = authActionClient.action(async () => {
  return await getArticleLabels();
});

export const createArticleLabelAction = authActionClient
  .schema(z.object({ name: z.string().min(1) }))
  .action(async ({ parsedInput }) => {
    return await createArticleLabel(parsedInput.name);
  });
