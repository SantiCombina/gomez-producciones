import type { Post } from '@/payload-types';

import { ArticleBody } from './article-body';
import { ArticleHeader } from './article-header';
import { ArticleMeta } from './article-meta';

interface ArticleContentProps {
  post: Post;
}

export function ArticleContent({ post }: ArticleContentProps) {
  return (
    <article className="space-y-6">
      <ArticleHeader post={post} />
      <ArticleMeta post={post} />
      <ArticleBody post={post} />
    </article>
  );
}
