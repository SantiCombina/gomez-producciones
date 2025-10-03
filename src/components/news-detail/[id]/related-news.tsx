'use client';

import { useEffect, useState } from 'react';

import { NewsCard } from '@/components/home/news-card';
import type { Post } from '@/payload-types';

interface RelatedNewsProps {
  currentPostId: string;
}

export function RelatedNews({ currentPostId }: RelatedNewsProps) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setRelatedPosts([]);
  }, [currentPostId]);

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">Noticias Relacionadas</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[5/4] bg-muted rounded-lg mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">Noticias Relacionadas</h2>
        <p className="text-muted-foreground">No hay noticias relacionadas disponibles.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Noticias Relacionadas</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {relatedPosts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
