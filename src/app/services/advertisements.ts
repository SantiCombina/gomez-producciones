import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/lib/payload';
import type { Advertisement } from '@/payload-types';

export const getActiveAdvertisements = unstable_cache(
  async (): Promise<Advertisement[]> => {
    try {
      const payload = await getPayloadClient();

      const result = await payload.find({
        collection: 'advertisements',
        where: {
          isActive: { equals: true },
        },
      });

      return result.docs as Advertisement[];
    } catch (error) {
      console.error('Error obteniendo publicidades:', error);
      return [];
    }
  },
  ['advertisements'],
  { revalidate: 1800 },
);
