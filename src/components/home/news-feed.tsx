'use client';

import { useMemo, useState } from 'react';

import { Separator } from '@/components/ui/separator';
import type { Advertisement, ArticleLabel, Post } from '@/payload-types';

import { AdCarousel } from './ad-carousel';
import { CategoryFilter } from './category-filter';
import { FeaturedNews } from './featured-news';
import { LatestNews } from './latest-news';

interface Props {
  posts: Post[];
  categories: ArticleLabel[];
  ads: Advertisement[];
}

export function NewsFeed({ posts, categories, ads }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
        onChange={setSelectedCategory}
      />

      {filteredPosts.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No hay noticias en esta categoría</p>
      ) : (
        <>
          {featuredPosts.length > 0 && <FeaturedNews posts={featuredPosts} />}

          {ads.length > 0 && (
            <>
              <Separator className="my-8" />
              <AdCarousel ads={ads} />
            </>
          )}

          {latestPosts.length > 0 && (
            <>
              <Separator className="my-8" />
              <LatestNews posts={latestPosts} />
            </>
          )}
        </>
      )}
    </>
  );
}
