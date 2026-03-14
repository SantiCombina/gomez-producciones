import type { CollectionConfig } from 'payload';

import { isAdmin, isAdminOrSelf } from './access';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 2592000, // 30 días en segundos
  },
  fields: [
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      options: [
        {
          label: 'Administrador',
          value: 'admin',
        },
        {
          label: 'Usuario',
          value: 'user',
        },
      ],
      defaultValue: 'user',
      required: true,
    },
  ],
};
