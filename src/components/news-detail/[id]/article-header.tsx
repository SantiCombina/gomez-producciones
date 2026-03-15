import type { Media, Post } from '@/payload-types';

import { ArticleImageGallery } from './article-image-gallery';

interface ArticleHeaderProps {
  post: Post;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null;

  const extraImages = (post.images ?? [])
    .map((item) => (typeof item.image === 'object' ? item.image : null))
    .filter((img): img is Media => img !== null && !!img.url);

  const allImages: Media[] = [...(featuredImage?.url ? [featuredImage as Media] : []), ...extraImages];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mt-6">{post.title}</h1>
      <ArticleImageGallery images={allImages} />
    </div>
  );
}
