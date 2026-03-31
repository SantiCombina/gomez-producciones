import type { CollectionConfig } from 'payload';

import { anyone, isAdminOrEditor } from './access';

export const Advertisements: CollectionConfig = {
  slug: 'advertisements',
  labels: {
    singular: 'Publicidad',
    plural: 'Publicidades',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'image', 'isActive', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      label: 'Nombre del sponsor',
      type: 'text',
      required: true,
      admin: {
        description: 'Nombre descriptivo para identificar esta publicidad (ej: "Sponsor Marzo — Ferretería López")',
      },
    },
    {
      name: 'image',
      label: 'Imagen del banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Tamaño recomendado: 1500 × 173 px. Formatos aceptados: JPG, PNG o WebP.',
      },
    },
    {
      name: 'link',
      label: 'Enlace al hacer click (opcional)',
      type: 'text',
      admin: {
        description: 'URL completa hacia donde va el sponsor (ej: https://ferreteria-lopez.com.ar)',
      },
    },
    {
      name: 'isActive',
      label: 'Publicidad activa',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'Desactivá esta casilla para que el banner deje de aparecer en el sitio sin necesidad de borrarlo.',
      },
    },
  ],
};
