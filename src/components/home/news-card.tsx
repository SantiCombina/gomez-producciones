import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-utils';
import type { Post } from '@/payload-types';

interface NewsCardProps {
  post: Post;
}

export function NewsCard({ post }: NewsCardProps) {
  // Extraer datos de la imagen
  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;

  // Extraer datos de la categoría
  const category = typeof post.category === 'object' && post.category ? post.category : null;

  // Si no hay imagen, no renderizar la tarjeta
  if (!featuredImage?.url) {
    return null;
  }

  return (
    <Link href={`/${post.id}`} className="block">
      <Card className="overflow-hidden p-0 flex flex-col gap-0 cursor-pointer hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-[5/4] flex-shrink-0">
          <img src={featuredImage.url} alt={featuredImage.alt || post.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-0">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground rounded-l-none rounded-r-md">
              {category?.name || 'General'}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <time className="text-xs text-muted-foreground mb-3 block">{formatDate(post.createdAt)}</time>
          <CardTitle className="text-lg mb-3">{post.title}</CardTitle>
          <CardDescription className="mb-4 text-base">
            {post.description || 'Sin descripción disponible'}
          </CardDescription>
          <Button variant="ghost" className="p-0 h-auto font-normal text-primary hover:text-primary/80 text-sm" asChild>
            <span>Leer más →</span>
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
