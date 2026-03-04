import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string({ error: 'El título debe ser una cadena de texto.' }).min(1, 'El título es requerido.'),
  description: z.string({ error: 'La descripción debe ser una cadena de texto.' }).optional(),
  categoryId: z.number().optional(),
  image: z.instanceof(File, { message: 'El archivo seleccionado no es válido.' }).optional(),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
