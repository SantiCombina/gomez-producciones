import { NewsCard } from './news-card';
import type { Post } from './types';

interface FeaturedNewsProps {
  post: Post;
}

export function FeaturedNews({ post }: FeaturedNewsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Noticia Destacada</h2>
      <NewsCard post={post} variant="featured" />
    </section>
  );
}
