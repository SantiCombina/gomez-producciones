import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getActiveAdvertisements } from '@/app/services/advertisements';
import { getPostById, getPostBySlug } from '@/app/services/post';
import { AdBanner } from '@/components/home/ad-banner';
import { ArticleContent } from '@/components/news-detail/[id]/article-content';
import { RelatedNews } from '@/components/news-detail/[id]/related-news';
import { Separator } from '@/components/ui/separator';
import { Media, Post } from '@/payload-types';

const BASE_URL = 'https://gomezproducciones.vercel.app';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function getPostImageUrl(post: Post): string {
  return typeof post.featuredImage === 'object' && (post.featuredImage as Media)?.url
    ? (post.featuredImage as Media).url!
    : `${BASE_URL}/og-image.webp`;
}

async function resolvePost(idOrSlug: string): Promise<Post | null> {
  const bySlug = await getPostBySlug(idOrSlug);
  if (bySlug) return bySlug;
  return getPostById(idOrSlug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await resolvePost(id);

  if (!post) {
    return { title: 'Noticia no encontrada | Gomez Producciones' };
  }

  const imageUrl = getPostImageUrl(post);
  const description = post.description ?? 'Leé la última noticia en Gomez Producciones.';

  return {
    title: `${post.title} | Gomez Producciones`,
    description,
    alternates: {
      canonical: `/news/${(post as Post & { slug?: string }).slug ?? post.id}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      siteName: 'Gomez Producciones',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;

  const [post, ads] = await Promise.all([resolvePost(id), getActiveAdvertisements()]);

  if (!post) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Noticia no encontrada</h1>
        <p>La noticia que buscas no existe o ha sido eliminada.</p>
      </div>
    );
  }

  const imageUrl = getPostImageUrl(post);
  const category = typeof post.category === 'object' && post.category ? post.category : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.description ?? '',
    image: imageUrl,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    url: `${BASE_URL}/news/${(post as Post & { slug?: string }).slug ?? post.id}`,
    articleSection: category ? (category as { name: string }).name : undefined,
    author: {
      '@type': 'Person',
      name: 'Oscar Gómez',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gomez Producciones',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-logo-black.png`,
      },
    },
  };

  const shuffled = [...ads].sort(() => Math.random() - 0.5);
  const pick = (i: number) => (shuffled.length > 0 ? shuffled[i % shuffled.length] : undefined);

  return (
    <div className="min-h-dvh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="container py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            <ArticleContent post={post} />

            {pick(0) ? (
              <>
                <Separator className="my-8" />
                <AdBanner ad={pick(0)!} />
              </>
            ) : null}

            <Separator className="my-8" />

            <Suspense fallback={<div className="h-48 animate-pulse rounded-lg bg-muted" />}>
              <RelatedNews currentPost={post} />
            </Suspense>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">{pick(1) ? <AdBanner ad={pick(1)!} /> : null}</div>
          </aside>
        </div>

        {pick(1) ? (
          <div className="lg:hidden mt-8">
            <AdBanner ad={pick(1)!} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
