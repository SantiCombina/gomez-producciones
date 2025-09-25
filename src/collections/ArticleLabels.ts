import type { CollectionConfig } from 'payload';

export const ArticleLabels: CollectionConfig = {
  slug: 'article-labels',
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre de la Categoría',
      type: 'text',
      required: true,
    },
  ],
};
