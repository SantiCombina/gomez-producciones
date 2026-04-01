'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { PostImagePreview } from '@/components/home/post-image-preview';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/date-utils';
import type { Media, Post } from '@/payload-types';

type PostWithSlug = Post & { slug?: string | null };

interface Props {
  posts: Post[];
}

function RelatedCard({ post }: { post: Post }) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const slug = (post as PostWithSlug).slug ?? String(post.id);

  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;
  const extraImages = (post.images ?? [])
    .map((item) => (typeof item.image === 'object' ? item.image : null))
    .filter((img): img is Media => img !== null && !!img.url);
  const allImages: Media[] = [...(featuredImage?.url ? [featuredImage as Media] : []), ...extraImages];

  return (
    <Link href={`/news/${slug}`} className="block group h-full">
      <Card className="overflow-hidden p-0 flex flex-col gap-0 hover:shadow-md transition-all duration-300 h-full border-border/60 hover:border-primary/30">
        <div className="shrink-0 overflow-hidden relative">
          <PostImagePreview
            images={allImages}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            altFallback={post.title}
            aspectClass="aspect-[4/3]"
          />
          {category && (
            <Badge className="absolute top-2 left-0 rounded-l-none bg-primary text-primary-foreground text-xs font-medium shadow-sm">
              {category.name}
            </Badge>
          )}
        </div>
        <CardContent className="p-3 flex flex-col gap-1.5 flex-1">
          <time className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</time>
          <h3 className="text-sm font-semibold leading-snug line-clamp-3">{post.title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}

export function RelatedNewsCarousel({ posts }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Anterior"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
      >
        {posts.map((post) => (
          <div key={post.id} className="snap-start shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
            <RelatedCard post={post} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll('right')}
        aria-label="Siguiente"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
