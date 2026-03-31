import type { CollectionConfig } from 'payload';

import { anyone, isAdminOrEditor } from './access';

export const ArticleLabels: CollectionConfig = {
  slug: 'article-labels',
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
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
