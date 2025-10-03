import { AdBanner } from '@/components/home/ad-banner';
import { mockAds } from '@/components/home/data';
import { getPostByIdAction } from '@/components/news-detail/[id]/actions';
import { ArticleContent } from '@/components/news-detail/[id]/article-content';
import { RelatedNews } from '@/components/news-detail/[id]/related-news';
import { Separator } from '@/components/ui/separator';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const postResult = await getPostByIdAction({ id });

    if (!postResult?.data) {
      return (
        <div className="container py-8">
          <h1 className="text-2xl font-bold">Noticia no encontrada</h1>
          <p>La noticia que buscas no existe o ha sido eliminada.</p>
        </div>
      );
    }

    const post = postResult.data;

    return (
      <div className="min-h-dvh bg-background">
        <div className="container pt-4">
          <AdBanner ad={mockAds[0]} />
        </div>

        <main className="container py-6">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-3 space-y-8">
              <ArticleContent post={post} />

              <Separator className="my-8" />

              <div className="w-full">
                <AdBanner ad={mockAds[1]} />
              </div>

              <Separator className="my-8" />

              <RelatedNews currentPostId={post.id.toString()} />
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 border border-border rounded-lg min-h-[300px] bg-muted/60">
                  <h3 className="font-semibold mb-4">Espacio disponible</h3>
                  <p className="text-sm text-muted-foreground">
                    Aquí se puede agregar contenido adicional como noticias relacionadas, widgets sociales, o
                    publicidad.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Mobile Bottom Ad */}
          <div className="lg:hidden mt-8">
            <AdBanner ad={mockAds[2]} />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error obteniendo noticia:', error);
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>Hubo un error al cargar la noticia.</p>
      </div>
    );
  }
}
