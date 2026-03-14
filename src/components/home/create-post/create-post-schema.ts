import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGES = 10;

const imageFile = z
  .instanceof(File, { message: 'El archivo seleccionado no es válido.' })
  .refine((f) => ACCEPTED_IMAGE_TYPES.includes(f.type), 'Solo se permiten imágenes (JPEG, PNG, WebP, GIF).')
  .refine((f) => f.size <= MAX_FILE_SIZE, 'La imagen no puede superar los 10MB.');

export const createPostSchema = z.object({
  title: z.string({ error: 'El título debe ser una cadena de texto.' }).min(1, 'El título es requerido.'),
  description: z.string({ error: 'La descripción debe ser una cadena de texto.' }).optional(),
  body: z.string().optional(),
  categoryId: z.number().optional(),
  images: z.array(imageFile).max(MAX_IMAGES, `Máximo ${MAX_IMAGES} imágenes.`).optional(),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
