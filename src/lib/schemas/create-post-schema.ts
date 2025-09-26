import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'El título no puede estar vacío.')
    .max(200, 'El título debe tener como máximo 200 caracteres.'),
  description: z.string().trim().optional(),
  category: z.number().min(1, 'Debe seleccionar una categoría válida.').optional(),
  featuredImage: z
    .union([
      z.string().transform((val) => {
        if (val === '') return undefined;
        const num = parseInt(val, 10);
        return isNaN(num) ? undefined : num;
      }),
      z.number(),
    ])
    .optional(),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
