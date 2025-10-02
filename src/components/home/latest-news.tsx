import { NewsCard } from './news-card';
import type { Post } from './types';

interface LatestNewsProps {
  posts: Post[];
}

export function LatestNews({ posts }: LatestNewsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Últimas Noticias</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} variant="regular" />
        ))}
      </div>
    </section>
  );
}
