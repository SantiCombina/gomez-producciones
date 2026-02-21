import { getCurrentUser } from '@/app/services/users';
import { getAdvertisementsAction, getPostsAction } from '@/components/home/actions';
import { AdBanner } from '@/components/home/ad-banner';
import { CreatePostTrigger } from '@/components/home/create-post/create-post-trigger';
import { FeaturedNews } from '@/components/home/featured-news';
import { LatestNews } from '@/components/home/latest-news';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  const [postsResult, adsResult, user] = await Promise.all([
    getPostsAction({ limit: 10 }),
    getAdvertisementsAction({}),
    getCurrentUser(),
  ]);

  const posts = postsResult?.data?.docs ?? [];
  const ads = adsResult?.data ?? [];
  const [featuredPost, ...latestPosts] = posts;

  return (
    <div className="min-h-dvh bg-background">
      {ads[0] && (
        <div className="container pt-4">
          <AdBanner ad={ads[0]} />
        </div>
      )}

      <main className="container py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            {user && <CreatePostTrigger user={user} />}

            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No hay noticias disponibles</p>
            ) : (
              <>
                {featuredPost && <FeaturedNews post={featuredPost} />}

                {ads[1] && (
                  <>
                    <Separator className="my-8" />
                    <div className="w-full">
                      <AdBanner ad={ads[1]} />
                    </div>
                  </>
                )}

                <Separator className="my-8" />

                {latestPosts.length > 0 && <LatestNews posts={latestPosts} />}
              </>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 border border-border rounded-lg min-h-[300px] bg-muted/60">
                <h3 className="font-semibold mb-4">Espacio disponible</h3>
                <p className="text-sm text-muted-foreground">
                  Aquí se puede agregar contenido adicional como noticias relacionadas, widgets sociales, o publicidad.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {ads[2] && (
          <div className="lg:hidden mt-8">
            <AdBanner ad={ads[2]} />
          </div>
        )}
      </main>
    </div>
  );
}
