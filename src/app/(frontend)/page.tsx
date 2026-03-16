import { getActiveAdvertisements } from '@/app/services/advertisements';
import { getArticleLabels } from '@/app/services/article-labels';
import { getPosts } from '@/app/services/post';
import { AdBanner } from '@/components/home/ad-banner';
import { NewsFeed } from '@/components/home/news-feed';
import { YoutubeLiveEmbed } from '@/components/home/youtube-live/youtube-live-embed';
import { PwaInstallButton } from '@/components/pwa/pwa-install-button';

export default async function HomePage() {
  const [postsResult, ads, categories] = await Promise.all([
    getPosts({ limit: 20 }),
    getActiveAdvertisements(),
    getArticleLabels(),
  ]);

  const posts = postsResult.data?.docs ?? [];
  const shuffled = [...ads].sort(() => Math.random() - 0.5);
  const pick = (i: number) => (shuffled.length > 0 ? shuffled[i % shuffled.length] : undefined);

  return (
    <div className="min-h-dvh bg-background">
      {pick(0) && (
        <div className="container pt-4">
          <AdBanner ad={pick(0)!} />
        </div>
      )}

      <main className="container py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            <YoutubeLiveEmbed />

            <NewsFeed posts={posts} categories={categories} ad={pick(2)} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <PwaInstallButton />
              {pick(1) && <AdBanner ad={pick(1)!} />}
            </div>
          </aside>
        </div>

        {pick(1) && (
          <div className="lg:hidden mt-8">
            <AdBanner ad={pick(1)!} />
          </div>
        )}
      </main>
    </div>
  );
}
