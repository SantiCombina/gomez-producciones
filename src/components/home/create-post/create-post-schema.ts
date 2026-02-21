import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string({
      required_error: 'El título es requerido.',
      invalid_type_error: 'El título debe ser una cadena de texto.',
    })
    .min(1, {
      message: 'El título es requerido.',
    }),
  description: z
    .string({
      invalid_type_error: 'La descripción debe ser una cadena de texto.',
    })
    .optional(),
  image: z
    .custom<File>(
      (val) => {
        if (!val) return true;
        return typeof val === 'object' && 'name' in val && 'size' in val;
      },
      {
        message: 'El archivo seleccionado no es válido.',
      },
    )
    .optional(),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
