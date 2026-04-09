import { MapPinIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/date-utils';
import type { Media, Post } from '@/payload-types';

import { PostImagePreview } from './post-image-preview';

type PostWithSlug = Post & { slug?: string | null };

interface Props {
  post: Post;
}

export function NewsCard({ post }: Props) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const location = typeof post.location === 'object' && post.location ? post.location : null;
  const slug = (post as PostWithSlug).slug ?? String(post.id);

  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;
  const extraImages = (post.images ?? [])
    .map((item) => (typeof item.image === 'object' ? item.image : null))
    .filter((img): img is Media => img !== null && !!img.url);
  const allImages: Media[] = [...(featuredImage?.url ? [featuredImage as Media] : []), ...extraImages];

  return (
    <Link href={`/news/${slug}`} className="block h-full group">
      <Card className="overflow-hidden p-0 py-0 flex flex-col gap-0 hover:shadow-md transition-all duration-300 h-full border-border/60 hover:border-primary/30">
        <div className="shrink-0 overflow-hidden relative">
          <PostImagePreview
            images={allImages}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            altFallback={post.title}
          />
          {category && (
            <Badge className="absolute top-3 left-0 rounded-l-none bg-primary text-primary-foreground text-xs font-medium shadow-sm">
              {category.name}
            </Badge>
          )}
        </div>
        <CardContent className="px-4 pt-2 pb-4 md:px-5 md:pt-3 md:pb-5 flex flex-col gap-2.5 flex-1">
          <div className="flex items-center justify-between gap-2">
            {location ? (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPinIcon className="h-3 w-3 shrink-0 -translate-y-0.5" />
                {location.name}
              </span>
            ) : (
              <span />
            )}
            <time className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</time>
          </div>
          <h3 className="text-lg font-semibold leading-snug line-clamp-2 shrink-0">{post.title}</h3>
          {post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.description}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
