import type { MetadataRoute } from 'next';

import { getPosts } from '@/app/services/post';

const BASE_URL = 'https://gomezproducciones.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsResult = await getPosts({ limit: 1000 });
  const posts = postsResult.data?.docs ?? [];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postUrls,
  ];
}
