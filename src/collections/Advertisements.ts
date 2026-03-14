import type { CollectionConfig } from 'payload';

import { anyone, isAdmin } from './access';

export const Advertisements: CollectionConfig = {
  slug: 'advertisements',
  labels: {
    singular: 'Publicidad',
    plural: 'Publicidades',
  },
  access: {
    read: anyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      admin: {
        description: 'Nombre descriptivo para identificar esta publicidad',
      },
    },
    {
      name: 'image',
      label: 'Imagen Publicitaria',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'link',
      label: 'Enlace (opcional)',
      type: 'text',
      admin: {
        description: 'URL a la que redirigirá al hacer click en la publicidad',
      },
    },
    {
      name: 'isActive',
      label: 'Activa',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Solo las publicidades activas aparecerán en el sitio web',
      },
    },
  ],
};
