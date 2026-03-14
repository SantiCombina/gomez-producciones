import { RichText } from '@payloadcms/richtext-lexical/react';

import type { Media, Post } from '@/payload-types';

import { ImageGallery } from './image-gallery';

interface ArticleBodyProps {
  post: Post;
}

export function ArticleBody({ post }: ArticleBodyProps) {
  const galleryImages = (post.images ?? [])
    .map((item) => (typeof item.image === 'object' ? item.image : null))
    .filter((img): img is Media => img !== null && !!img.url);

  return (
    <div className="space-y-8">
      {post.description && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4">
          {post.description}
        </p>
      )}

      {post.body && (
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground">
          <RichText data={post.body} />
        </div>
      )}

      {galleryImages.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold">Galería</h3>
          <ImageGallery images={galleryImages} />
        </div>
      )}
    </div>
  );
}
