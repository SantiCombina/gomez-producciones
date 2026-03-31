import type { CollectionConfig } from 'payload';

import { generateSlug } from '@/lib/slug-utils';

import { anyone, isAdminOrEditor } from './access';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Publicación',
    plural: 'Publicaciones',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'createdAt'],
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data.title && !data.slug) {
          data.slug = generateSlug(data.title as string);
        }
        return data;
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        const mediaIdsToDelete: number[] = [];

        const featuredImageId = typeof doc.featuredImage === 'object' ? doc.featuredImage?.id : doc.featuredImage;
        if (featuredImageId) mediaIdsToDelete.push(featuredImageId);

        if (Array.isArray(doc.images)) {
          for (const item of doc.images) {
            const imageId = typeof item.image === 'object' ? item.image?.id : item.image;
            if (imageId) mediaIdsToDelete.push(imageId);
          }
        }

        for (const id of mediaIdsToDelete) {
          try {
            await req.payload.delete({ collection: 'media', id });
          } catch (error) {
            console.error('Error eliminando media asociada al post:', error);
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: false,
      unique: true,
      index: true,
      admin: {
        description: 'Identificador URL. Se genera automáticamente del título.',
        readOnly: false,
      },
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      required: false,
    },
    {
      name: 'body',
      label: 'Contenido',
      type: 'richText',
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'relationship',
      relationTo: 'article-labels',
      required: false,
    },
    {
      name: 'featuredImage',
      label: 'Imagen Principal',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'images',
      label: 'Galería de Imágenes',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
