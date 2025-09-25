import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
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
