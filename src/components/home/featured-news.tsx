import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-utils';
import type { Post } from '@/payload-types';

interface Props {
  post: Post;
}

export function FeaturedNews({ post }: Props) {
  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;

  const category = typeof post.category === 'object' && post.category ? post.category : null;

  if (!featuredImage?.url) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Destacada</h2>

      <Link href={`/${post.id}`} className="block">
        <Card className="overflow-hidden p-0 cursor-pointer hover:shadow-md transition-shadow duration-300">
          <div className="md:flex">
            {/* Imagen */}
            <div className="relative md:w-1/2 aspect-[16/9] md:aspect-[3/2] flex-shrink-0">
              <img
                src={featuredImage.url}
                alt={featuredImage.alt || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-0">
                <Badge
                  variant="secondary"
                  className="bg-primary/90 text-primary-foreground rounded-l-none rounded-r-md text-sm"
                >
                  {category?.name || 'General'}
                </Badge>
              </div>
            </div>

            {/* Contenido */}
            <CardContent className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between min-h-[300px] md:min-h-[400px]">
              <div>
                <time className="text-sm text-muted-foreground mb-4 block">{formatDate(post.createdAt)}</time>

                <CardTitle className="text-xl md:text-2xl lg:text-3xl mb-4 leading-tight line-clamp-3">
                  {post.title}
                </CardTitle>

                <CardDescription className="text-base lg:text-lg leading-relaxed line-clamp-4 mb-6">
                  {post.description || 'Sin descripción disponible'}
                </CardDescription>
              </div>

              <div className="mt-auto">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium text-primary hover:text-primary/80 text-base"
                  asChild
                >
                  <span>Leer más →</span>
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    </section>
  );
}
