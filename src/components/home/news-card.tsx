import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/date-utils';
import type { Media, Post } from '@/payload-types';

import { PostImagePreview } from './post-image-preview';

interface Props {
  post: Post;
}

export function NewsCard({ post }: Props) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;

  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;
  const extraImages = (post.images ?? [])
    .map((item) => (typeof item.image === 'object' ? item.image : null))
    .filter((img): img is Media => img !== null && !!img.url);
  const allImages: Media[] = [...(featuredImage?.url ? [featuredImage as Media] : []), ...extraImages];

  return (
    <Link href={`/noticia/${post.id}`} className="block h-full group">
      <Card className="overflow-hidden p-0 flex flex-col gap-0 hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="flex-shrink-0 overflow-hidden">
          <PostImagePreview images={allImages} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        </div>
        <CardContent className="p-4 md:p-5 flex flex-col gap-2.5 flex-1">
          <div className="flex items-center gap-2.5">
            {category && (
              <Badge variant="secondary" className="bg-primary/10 text-primary text-sm font-medium">
                {category.name}
              </Badge>
            )}
            <time className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</time>
          </div>
          <h3 className="text-lg font-semibold leading-snug line-clamp-2">{post.title}</h3>
          {post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.description}</p>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold mt-auto group-hover:gap-2.5 transition-all duration-300">
            Leer más
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
