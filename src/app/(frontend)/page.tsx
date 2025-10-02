import { getPostsAction } from '@/components/home/actions';
import { AdBanner } from '@/components/home/ad-banner';
import { mockAds } from '@/components/home/data';
import { FeaturedNews } from '@/components/home/featured-news';
import { LatestNews } from '@/components/home/latest-news';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  // Obtener posts reales de la base de datos
  const postsResult = await getPostsAction({ limit: 10 });

  if (!postsResult.data) {
    // Fallback en caso de error
    return (
      <div className="min-h-dvh bg-background">
        <div className="container py-6">
          <p className="text-center">Error al cargar las noticias</p>
        </div>
      </div>
    );
  }

  // Usar directamente los posts de Payload
  const posts = postsResult.data.docs;
  const [featuredPost, ...latestPosts] = posts;

  // Si no hay posts, mostrar mensaje
  if (posts.length === 0) {
    return (
      <div className="min-h-dvh bg-background">
        <div className="container py-6">
          <p className="text-center">No hay noticias disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="container pt-4">
        <AdBanner ad={mockAds[0]} />
      </div>

      <main className="container py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            {featuredPost && <FeaturedNews post={featuredPost} />}

            <Separator className="my-8" />

            <div className="w-full">
              <AdBanner ad={mockAds[1]} />
            </div>

            <Separator className="my-8" />

            {latestPosts.length > 0 && <LatestNews posts={latestPosts} />}
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
