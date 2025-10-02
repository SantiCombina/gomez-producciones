import { AdBanner } from '@/components/home/ad-banner';
import { mockAds, mockPosts } from '@/components/home/data';
import { FeaturedNews } from '@/components/home/featured-news';
import { LatestNews } from '@/components/home/latest-news';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  const [featuredPost, ...latestPosts] = mockPosts;

  return (
    <div className="min-h-dvh bg-background">
      <div className="container pt-4">
        <AdBanner ad={mockAds[0]} />
      </div>

      <main className="container py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            <FeaturedNews post={featuredPost} />

            <Separator className="my-8" />

            <div className="w-full">
              <AdBanner ad={mockAds[1]} />
            </div>

            <Separator className="my-8" />

            <LatestNews posts={latestPosts} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">{/* Placeholder for future content */}</div>
          </aside>
        </div>

        {/* Mobile Bottom Ad */}
        <div className="lg:hidden mt-8">
          <AdBanner ad={mockAds[2]} />
        </div>
      </main>
    </div>
  );
}
