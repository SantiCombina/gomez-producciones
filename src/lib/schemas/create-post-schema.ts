import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  category: z.string().optional(),
  featuredImage: z.string().optional(),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
