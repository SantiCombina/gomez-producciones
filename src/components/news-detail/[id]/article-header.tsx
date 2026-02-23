import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import type { Post } from '@/payload-types';

interface ArticleHeaderProps {
  post: Post;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mt-6">{post.title}</h1>
      </div>

      {featuredImage?.url && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <ImageWithSkeleton
            src={featuredImage.url}
            alt={featuredImage.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
            priority
          />
        </div>
      )}
    </div>
  );
}
