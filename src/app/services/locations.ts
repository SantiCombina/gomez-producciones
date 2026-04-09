import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/lib/payload';
import type { Location } from '@/payload-types';

export const getLocations = unstable_cache(
  async (): Promise<Location[]> => {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: 'locations',
        limit: 100,
        sort: 'name',
      });
      return result.docs as Location[];
    } catch (error) {
      console.error('Error obteniendo ubicaciones:', error);
      return [];
    }
  },
  ['locations'],
  { revalidate: 3600, tags: ['locations'] },
);

export const createLocation = async (name: string): Promise<Location | null> => {
  try {
    const payload = await getPayloadClient();
    const location = await payload.create({
      collection: 'locations',
      data: { name },
    });
    return location as Location;
  } catch (error) {
    console.error('Error creando ubicación:', error);
    return null;
  }
};
