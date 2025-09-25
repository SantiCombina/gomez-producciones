import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Publicación',
    plural: 'Publicaciones',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'createdAt'],
  },
  fields: [
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
      required: true,
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'relationship',
      relationTo: 'article-labels',
      required: true,
    },
    {
      name: 'featuredImage',
      label: 'Imagen Principal',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
