import { unstable_cache } from 'next/cache';
import type { Where } from 'payload';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload';
import { Post } from '@/payload-types';

export const createPost = async (data: {
  title: string;
  description?: string;
  body?: Post['body'];
  category?: number;
  featuredImage?: number;
  images?: { image: number }[];
}) => {
  try {
    const payload = await getPayloadClient();

    const post = await payload.create({
      collection: 'posts',
      data,
    });

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error('Error creating post:', error);
    const message = error instanceof Error ? error.message : 'Error al crear el post';
    return {
      success: false,
      message,
    };
  }
};

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return (result.docs[0] as Post) ?? null;
  } catch {
    return null;
  }
});

export const getPostById = cache(async (id: string): Promise<Post | null> => {
  try {
    const payload = await getPayloadClient();

    const post = await payload.findByID({
      collection: 'posts',
      id,
    });

    return post as Post;
  } catch (error) {
    const isNotFound = error instanceof Error && 'status' in error && (error as { status: number }).status === 404;
    if (!isNotFound) {
      console.error('Error obteniendo post por ID:', error);
    }
    return null;
  }
});

const fetchPosts = async (options?: { limit?: number; page?: number; category?: string }) => {
  try {
    const payload = await getPayloadClient();

    const where: Where = {};
    if (options?.category) {
      where.category = { equals: options.category };
    }

    const result = await payload.find({
      collection: 'posts',
      limit: options?.limit || 10,
      page: options?.page || 1,
      where,
      sort: '-createdAt',
    });

    return {
      success: true,
      data: {
        docs: result.docs as Post[],
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page || 1,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      },
    };
  } catch (error) {
    console.error('Error obteniendo posts:', error);
    return {
      success: false,
      message: 'Error al obtener los posts',
      data: {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
};

export const getPosts = unstable_cache(fetchPosts, ['posts'], { revalidate: 60, tags: ['posts'] });

export const updatePost = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    body?: Post['body'];
    category?: number;
    featuredImage?: number;
    images?: { image: number }[];
  },
) => {
  try {
    const payload = await getPayloadClient();

    const post = await payload.update({
      collection: 'posts',
      id,
      data,
    });

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error('Error updating post:', error);
    const message = error instanceof Error ? error.message : 'Error al actualizar el post';
    return {
      success: false,
      message,
    };
  }
};

export const deletePost = async (id: string) => {
  try {
    const payload = await getPayloadClient();

    await payload.delete({
      collection: 'posts',
      id,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting post:', error);
    const message = error instanceof Error ? error.message : 'Error al eliminar el post';
    return {
      success: false,
      message,
    };
  }
};

export const getPostsByCategory = async (categoryId: string, limit = 10): Promise<Post[]> => {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'posts',
      where: {
        category: { equals: categoryId },
      },
      limit,
      sort: '-createdAt',
    });

    return result.docs as Post[];
  } catch (error) {
    console.error('Error obteniendo posts por categoría:', error);
    return [];
  }
};

export const searchPosts = async (query: string, limit = 10): Promise<Post[]> => {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'posts',
      where: {
        or: [{ title: { like: query } }, { description: { like: query, exists: true } }],
      },
      limit,
      sort: '-createdAt',
    });

    return result.docs as Post[];
  } catch (error) {
    console.error('Error buscando posts:', error);
    return [];
  }
};

export const getPostsCount = async (): Promise<number> => {
  try {
    const payload = await getPayloadClient();

    const result = await payload.count({
      collection: 'posts',
    });

    return result.totalDocs;
  } catch (error) {
    console.error('Error obteniendo conteo de posts:', error);
    return 0;
  }
};
