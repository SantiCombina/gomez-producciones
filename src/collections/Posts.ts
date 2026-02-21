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
  hooks: {
    afterDelete: [
      async ({ doc, req }) => {
        const featuredImageId = typeof doc.featuredImage === 'object' ? doc.featuredImage?.id : doc.featuredImage;

        if (featuredImageId) {
          try {
            await req.payload.delete({ collection: 'media', id: featuredImageId });
          } catch (error) {
            console.error('Error eliminando media asociada al post:', error);
          }
        }
      },
    ],
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
      required: false,
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
  ],
};
