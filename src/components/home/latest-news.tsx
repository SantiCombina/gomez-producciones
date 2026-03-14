import type { Post } from '@/payload-types';

import { NewsCard } from './news-card';

interface Props {
  posts: Post[];
}

export function LatestNews({ posts }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Últimas Noticias</h2>
      <div className="grid gap-5 sm:gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
