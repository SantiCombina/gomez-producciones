import { getPosts, getPostsByCategory } from '@/app/services/post';
import type { Post } from '@/payload-types';

import { RelatedNewsCarousel } from './related-news-carousel';

interface RelatedNewsProps {
  currentPost: Post;
}

export async function RelatedNews({ currentPost }: RelatedNewsProps) {
  const categoryId =
    typeof currentPost.category === 'object' && currentPost.category
      ? currentPost.category.id.toString()
      : typeof currentPost.category === 'number'
        ? currentPost.category.toString()
        : null;

  const [categoryPosts, recentResult] = await Promise.all([
    categoryId ? getPostsByCategory(categoryId, 7) : Promise.resolve([]),
    getPosts({ limit: 5 }),
  ]);

  const filtered = categoryPosts.filter((p) => p.id !== currentPost.id);
  const recentDocs = recentResult.data?.docs ?? [];

  let relatedPosts: Post[];

  if (filtered.length >= 2) {
    relatedPosts = filtered.slice(0, 6);
  } else {
    const fallback = recentDocs.filter((p) => p.id !== currentPost.id && !filtered.some((r) => r.id === p.id));
    relatedPosts = [...filtered, ...fallback].slice(0, 6);
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 pl-3 border-l-[3px] border-primary">Noticias relacionadas</h2>
      <RelatedNewsCarousel posts={relatedPosts} />
    </section>
  );
}
