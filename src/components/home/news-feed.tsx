'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { loadMorePostsAction } from '@/app/(frontend)/actions/posts';
import { Separator } from '@/components/ui/separator';
import type { Advertisement, ArticleLabel, Post } from '@/payload-types';

import { AdBanner } from './ad-banner';
import { CategoryFilter } from './category-filter';
import { FeaturedNews } from './featured-news';
import { NewsCard } from './news-card';

const AD_INTERVAL = 6;

interface Props {
  initialPosts: Post[];
  initialHasNextPage: boolean;
  categories: ArticleLabel[];
  ads: Advertisement[];
  selectedCategory: number | null;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function NewsFeed({ initialPosts, initialHasNextPage, categories, ads, selectedCategory }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasNextPage);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { execute, isExecuting } = useAction(loadMorePostsAction, {
    onSuccess: ({ data }) => {
      if (!data) return;
      setPosts((prev) => [...prev, ...data.docs]);
      setPage((prev) => prev + 1);
      setHasMore(data.hasNextPage);
    },
  });

  const shuffledAds = useMemo(() => {
    if (ads.length === 0) return [];
    return [...ads].sort(() => Math.random() - 0.5);
  }, [ads]);

  const loadMore = useCallback(() => {
    if (isExecuting || !hasMore) return;
    execute({ page: page + 1, category: selectedCategory });
  }, [isExecuting, hasMore, execute, page, selectedCategory]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    setPosts(initialPosts);
    setPage(1);
    setHasMore(initialHasNextPage);
  }, [initialPosts, initialHasNextPage]);

  const handleCategoryChange = (id: number | null) => {
    if (id === null) {
      router.push('/', { scroll: false });
    } else {
      router.push(`?categoria=${id}`, { scroll: false });
    }
  };

  const featuredPosts = posts.slice(0, 3);
  const latestPosts = posts.slice(3);
  const postChunks = chunkArray(latestPosts, AD_INTERVAL);

  return (
    <>
      <CategoryFilter
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        selected={selectedCategory}
        onChange={handleCategoryChange}
      />

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No hay noticias en esta categoría</p>
      ) : (
        <>
          {featuredPosts.length > 0 && <FeaturedNews posts={featuredPosts} />}

          {latestPosts.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="text-2xl font-bold mb-6 pl-3 border-l-[3px] border-primary">Últimas noticias</h2>
                <div className="space-y-8">
                  {postChunks.map((chunk, chunkIndex) => (
                    <Fragment key={chunkIndex}>
                      <div className="grid gap-5 sm:gap-8 sm:grid-cols-2">
                        {chunk.map((post) => (
                          <NewsCard key={post.id} post={post} />
                        ))}
                      </div>
                      {shuffledAds.length > 0 &&
                        chunk.length % 2 === 0 &&
                        (chunkIndex < postChunks.length - 1 || hasMore) && (
                          <AdBanner ad={shuffledAds[chunkIndex % shuffledAds.length]} />
                        )}
                    </Fragment>
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}

      <div ref={sentinelRef} className="h-1" />

      {isExecuting && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </>
  );
}
