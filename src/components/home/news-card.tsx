import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { formatDate } from '@/lib/date-utils';
import type { Post } from '@/payload-types';

interface Props {
  post: Post;
}

export function NewsCard({ post }: Props) {
  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;

  const category = typeof post.category === 'object' && post.category ? post.category : null;

  if (!featuredImage?.url) {
    return null;
  }

  return (
    <Link href={`/${post.id}`} className="block h-full">
      <Card className="overflow-hidden p-0 flex flex-col gap-0 cursor-pointer hover:shadow-md transition-shadow duration-300 h-full">
        <div className="relative aspect-[5/4] flex-shrink-0">
          <ImageWithSkeleton
            src={featuredImage.url}
            alt={featuredImage.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {category && (
            <div className="absolute top-3 left-0">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground rounded-l-none rounded-r-md">
                {category.name}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <time className="text-xs text-muted-foreground mb-3 block">{formatDate(post.createdAt)}</time>
          <CardTitle className="text-lg mb-3 line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="text-base line-clamp-3 mb-2">
            {post.description || 'Sin descripción disponible'}
          </CardDescription>
          <span className="text-xs text-muted-foreground/70">Leer más</span>
        </CardContent>
      </Card>
    </Link>
  );
}
