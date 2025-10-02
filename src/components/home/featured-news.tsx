import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-utils';
import type { Post } from '@/payload-types';

interface FeaturedNewsProps {
  post: Post;
}

export function FeaturedNews({ post }: FeaturedNewsProps) {
  // Extraer datos de la imagen
  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;

  // Extraer datos de la categoría
  const category = typeof post.category === 'object' && post.category ? post.category : null;

  // Si no hay imagen, no renderizar
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
            <CardContent className="md:w-1/2 p-6 flex flex-col justify-center">
              <time className="text-sm text-muted-foreground mb-3 block">{formatDate(post.createdAt)}</time>

              <CardTitle className="text-2xl lg:text-3xl mb-4 leading-tight">{post.title}</CardTitle>

              <CardDescription className="text-base lg:text-lg mb-6 leading-relaxed">
                {post.description || 'Sin descripción disponible'}
              </CardDescription>

              <Button
                variant="ghost"
                className="p-0 h-auto font-normal text-primary hover:text-primary/80 text-sm"
                asChild
              >
                <span>Leer más →</span>
              </Button>
            </CardContent>
          </div>
        </Card>
      </Link>
    </section>
  );
}
