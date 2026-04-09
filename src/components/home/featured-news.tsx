import { ImageIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { formatDate } from '@/lib/date-utils';
import type { Media, Post } from '@/payload-types';

import { PostImagePreview } from './post-image-preview';

type PostWithSlug = Post & { slug?: string | null };

interface Props {
  posts: Post[];
}

function getImages(post: Post): Media[] {
  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;
  const extraImages = (post.images ?? [])
    .map((item) => (typeof item.image === 'object' ? item.image : null))
    .filter((img): img is Media => img !== null && !!img.url);
  return [...(featuredImage?.url ? [featuredImage as Media] : []), ...extraImages];
}

export function FeaturedNews({ posts }: Props) {
  const [main, ...secondary] = posts;

  if (!main) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 pl-3 border-l-[3px] border-primary">Destacadas</h2>

      <div className="grid gap-5 lg:grid-cols-2">
        <MainCard post={main} />

        {secondary.length > 0 && (
          <div className="flex flex-col gap-5 h-full">
            {secondary.map((post) => (
              <div key={post.id} className="flex-1 min-h-0">
                <SecondaryCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MainCard({ post }: { post: Post }) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const location = typeof post.location === 'object' && post.location ? post.location : null;
  const images = getImages(post);
  const slug = (post as PostWithSlug).slug ?? String(post.id);

  return (
    <Link href={`/news/${slug}`} className="block group h-full">
      <Card className="overflow-hidden p-0 hover:shadow-md transition-all duration-300 h-full flex flex-col border-border/60 hover:border-primary/30">
        <div className="shrink-0 overflow-hidden relative">
          <PostImagePreview
            images={images}
            aspectClass="aspect-[16/10]"
            sizes="(max-width: 768px) 100vw, 50vw"
            altFallback={post.title}
            priority
          />
          {category && (
            <Badge className="absolute top-3 left-0 rounded-l-none bg-primary text-primary-foreground text-sm font-medium shadow-sm">
              {category.name}
            </Badge>
          )}
        </div>

        <CardContent className="px-5 pt-3 pb-5 md:px-6 md:pt-4 md:pb-6 space-y-2.5 flex-1 flex flex-col">
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

          <h3 className="text-xl md:text-2xl font-bold leading-tight line-clamp-3 shrink-0">{post.title}</h3>

          {post.description && (
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">{post.description}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

function SecondaryCard({ post }: { post: Post }) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const location = typeof post.location === 'object' && post.location ? post.location : null;
  const images = getImages(post);
  const mainImage = images[0] ?? null;
  const slug = (post as PostWithSlug).slug ?? String(post.id);

  return (
    <Link href={`/news/${slug}`} className="block group h-full">
      <Card className="overflow-hidden p-0 hover:shadow-md transition-all duration-300 h-full flex flex-row border-border/60 hover:border-primary/30">
        <div className="relative w-36 sm:w-44 shrink-0 overflow-hidden">
          {category && (
            <Badge className="absolute top-2 left-0 z-10 rounded-l-none bg-primary text-primary-foreground text-[10px] font-medium shadow-sm px-1.5 py-0.5">
              {category.name}
            </Badge>
          )}
          {mainImage ? (
            <>
              <ImageWithSkeleton
                src={mainImage.url!}
                alt={mainImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none transition-transform duration-500"
                sizes="180px"
              />
              {images.length > 1 && (
                <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  +{images.length - 1}
                </span>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center gap-1 text-muted-foreground">
              <ImageIcon className="h-5 w-5 opacity-35" />
              <span className="text-[10px] font-medium text-center px-1">Sin imagen</span>
            </div>
          )}
        </div>

        <CardContent className="px-4 pt-3 pb-4 flex flex-col gap-2 flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-2 shrink-0">
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

          <h3 className="text-base font-semibold leading-snug line-clamp-2 shrink-0">{post.title}</h3>

          {post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed overflow-hidden flex-1 hidden sm:block [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
              {post.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
