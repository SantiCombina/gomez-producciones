'use server';

import { getPayloadClient } from '@/lib/payload';
import type { ArticleLabel } from '@/payload-types';

export const getArticleLabels = async (): Promise<ArticleLabel[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'article-labels',
      limit: 100,
      sort: 'name',
    });
    return result.docs as ArticleLabel[];
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return [];
  }
};

export const createArticleLabel = async (name: string): Promise<ArticleLabel | null> => {
  try {
    const payload = await getPayloadClient();
    const label = await payload.create({
      collection: 'article-labels',
      data: { name },
    });
    return label as ArticleLabel;
  } catch (error) {
    console.error('Error creando categoría:', error);
    return null;
  }
};
