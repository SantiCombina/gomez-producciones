import { getActiveAdvertisements } from '@/app/services/advertisements';
import { getArticleLabels } from '@/app/services/article-labels';
import { getPosts } from '@/app/services/post';
import { getCurrentUser } from '@/app/services/users';
import { AdCarousel } from '@/components/home/ad-carousel';
import { CreatePostTrigger } from '@/components/home/create-post/create-post-trigger';
import { NewsFeed } from '@/components/home/news-feed';
import { PwaInstallButton } from '@/components/pwa/pwa-install-button';

export default async function HomePage() {
  const [postsResult, ads, user, categories] = await Promise.all([
    getPosts({ limit: 20 }),
    getActiveAdvertisements(),
    getCurrentUser(),
    getArticleLabels(),
  ]);

  const posts = postsResult.data?.docs ?? [];

  return (
    <div className="min-h-dvh bg-background">
      {ads.length > 0 && (
        <div className="container pt-4">
          <AdCarousel ads={ads} />
        </div>
      )}

      <main className="container py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            {user && <CreatePostTrigger user={user} initialCategories={categories} />}

            <NewsFeed posts={posts} categories={categories} ads={ads} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <PwaInstallButton />
              {ads.length > 0 && <AdCarousel ads={ads} direction="down" />}
            </div>
          </aside>
        </div>

        {ads.length > 0 && (
          <div className="lg:hidden mt-8">
            <AdCarousel ads={ads} />
          </div>
        )}
      </main>
    </div>
  );
}
