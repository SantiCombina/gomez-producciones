'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Separator } from '@/components/ui/separator';
import type { Advertisement, ArticleLabel, Post } from '@/payload-types';

import { AdBanner } from './ad-banner';
import { CategoryFilter } from './category-filter';
import { FeaturedNews } from './featured-news';
import { LatestNews } from './latest-news';

interface Props {
  posts: Post[];
  categories: ArticleLabel[];
  ad?: Advertisement;
}

export function NewsFeed({ posts, categories, ad }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('categoria');
  const selectedCategory = rawCategory ? Number(rawCategory) : null;

  const handleCategoryChange = (id: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === null) {
      params.delete('categoria');
    } else {
      params.set('categoria', id.toString());
    }
    router.push(params.size > 0 ? `?${params.toString()}` : '/', { scroll: false });
  };

  const filteredPosts = useMemo(() => {
    if (selectedCategory === null) return posts;
    return posts.filter((post) => {
      const catId = typeof post.category === 'object' && post.category ? post.category.id : post.category;
      return catId === selectedCategory;
    });
  }, [posts, selectedCategory]);

  const featuredPosts = filteredPosts.slice(0, 3);
  const latestPosts = filteredPosts.slice(3);

  return (
    <>
      <CategoryFilter
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        selected={selectedCategory}
        onChange={handleCategoryChange}
      />

      {filteredPosts.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No hay noticias en esta categoría</p>
      ) : (
        <>
          {featuredPosts.length > 0 && <FeaturedNews posts={featuredPosts} />}

          {ad ? (
            <>
              <Separator className="my-8" />
              <AdBanner ad={ad} />
            </>
          ) : null}

          {latestPosts.length > 0 ? (
            <>
              <Separator className="my-8" />
              <LatestNews posts={latestPosts} />
            </>
          ) : null}
        </>
      )}
    </>
  );
}
