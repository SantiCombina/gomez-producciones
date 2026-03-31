import type { CollectionConfig } from 'payload';

import { isAdmin, isAdminOrEditor, isAdminOrSelf } from './access';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  access: {
    read: isAdminOrEditor,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => user?.role !== 'admin',
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
          label: 'Editor',
          value: 'editor',
        },
      ],
      defaultValue: 'editor',
      required: true,
    },
  ],
};
