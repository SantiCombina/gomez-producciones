import { ArrowRightIcon, ImageIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { formatDate } from '@/lib/date-utils';
import type { Media, Post } from '@/payload-types';

import { PostImagePreview } from './post-image-preview';

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
      <h2 className="text-2xl font-bold mb-6">Destacadas</h2>

      <div className="grid gap-5 lg:grid-cols-2">
        <MainCard post={main} />

        {secondary.length > 0 && (
          <div className="flex flex-col gap-5">
            {secondary.map((post) => (
              <SecondaryCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MainCard({ post }: { post: Post }) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const images = getImages(post);

  return (
    <Link href={`/noticia/${post.id}`} className="block group h-full">
      <Card className="overflow-hidden p-0 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="flex-shrink-0 overflow-hidden">
          <PostImagePreview
            images={images}
            aspectClass="aspect-[16/10]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <CardContent className="p-5 md:p-6 space-y-2.5 flex-1 flex flex-col">
          <div className="flex items-center gap-3">
            {category && (
              <Badge variant="secondary" className="bg-primary/10 text-primary text-sm font-medium">
                {category.name}
              </Badge>
            )}
            <time className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</time>
          </div>

          <h3 className="text-xl md:text-2xl font-bold leading-tight line-clamp-3">{post.title}</h3>

          {post.description && (
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">{post.description}</p>
          )}

          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all duration-300 mt-auto pt-1">
            Leer más
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

function SecondaryCard({ post }: { post: Post }) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const images = getImages(post);
  const mainImage = images[0] ?? null;

  return (
    <Link href={`/noticia/${post.id}`} className="block group flex-1">
      <Card className="overflow-hidden p-0 hover:shadow-lg transition-shadow duration-300 h-full flex flex-row">
        <div className="relative w-36 sm:w-44 shrink-0 overflow-hidden">
          {mainImage ? (
            <>
              <ImageWithSkeleton
                src={mainImage.url!}
                alt={mainImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
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

        <CardContent className="p-4 flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {category && (
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs font-medium">
                {category.name}
              </Badge>
            )}
            <time className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</time>
          </div>

          <h3 className="text-base font-semibold leading-snug line-clamp-2">{post.title}</h3>

          {post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 hidden sm:block">
              {post.description}
            </p>
          )}

          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all duration-300 mt-auto">
            Leer más
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
