import { Suspense } from 'react';

import { getActiveAdvertisements } from '@/app/services/advertisements';
import { getArticleLabels } from '@/app/services/article-labels';
import { getPosts } from '@/app/services/post';
import { AdBanner } from '@/components/home/ad-banner';
import { NewsFeed } from '@/components/home/news-feed';
import { YoutubeLiveEmbed } from '@/components/home/youtube-live/youtube-live-embed';
import { PwaInstallButton } from '@/components/pwa/pwa-install-button';

interface Props {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const selectedCategory = categoria ? Number(categoria) : null;

  const [postsResult, ads, categories] = await Promise.all([
    getPosts({
      limit: 8,
      page: 1,
      category: selectedCategory !== null ? String(selectedCategory) : undefined,
    }),
    getActiveAdvertisements(),
    getArticleLabels(),
  ]);

  const initialPosts = postsResult.data?.docs ?? [];
  const initialHasNextPage = postsResult.data?.hasNextPage ?? false;

  const topAd = ads[0];

  return (
    <div className="min-h-dvh bg-background">
      {topAd ? (
        <div className="container pt-4">
          <AdBanner ad={topAd} />
        </div>
      ) : null}

      <div className="container py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            <YoutubeLiveEmbed />

            <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-muted" />}>
              <NewsFeed
                initialPosts={initialPosts}
                initialHasNextPage={initialHasNextPage}
                categories={categories}
                ads={ads}
                selectedCategory={selectedCategory}
              />
            </Suspense>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <PwaInstallButton />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
