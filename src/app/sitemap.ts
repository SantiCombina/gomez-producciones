import type { MetadataRoute } from 'next';

import { getPosts } from '@/app/services/post';

const BASE_URL = 'https://gomezproducciones.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsResult = await getPosts({ limit: 1000 });
  const posts = postsResult.data?.docs ?? [];

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => {
    const postWithSlug = post as typeof post & { slug?: string };
    const lastMod = new Date(post.updatedAt);
    return {
      url: `${BASE_URL}/news/${postWithSlug.slug ?? post.id}`,
      lastModified: lastMod,
      changeFrequency: lastMod > sevenDaysAgo ? 'daily' : 'monthly',
      priority: 0.8,
    };
  });

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postUrls,
  ];
}
