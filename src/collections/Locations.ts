import type { CollectionConfig } from 'payload';

import { anyone, isAdminOrEditor } from './access';

export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: {
    singular: 'Ubicación',
    plural: 'Ubicaciones',
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
      label: 'Nombre de la Ubicación',
      type: 'text',
      required: true,
    },
  ],
};
