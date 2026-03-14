import type { CollectionConfig } from 'payload';

import { anyone, isAuthenticated } from './access';

export const ArticleLabels: CollectionConfig = {
  slug: 'article-labels',
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
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
