import { getPayloadClient } from '@/lib/payload';
import type { Media } from '@/payload-types';

export const createMedia = async (file: File, alt?: string): Promise<Media> => {
  const payload = await getPayloadClient();

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const media = await payload.create({
    collection: 'media',
    data: { alt: alt || file.name },
    file: {
      data: buffer,
      mimetype: file.type,
      name: file.name,
      size: file.size,
    },
  });

  return media as Media;
};
