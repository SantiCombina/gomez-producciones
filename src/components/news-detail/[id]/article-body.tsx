import { RichText } from '@payloadcms/richtext-lexical/react';

import type { Post } from '@/payload-types';

interface ArticleBodyProps {
  post: Post;
}

export function ArticleBody({ post }: ArticleBodyProps) {
  return (
    <div className="space-y-8">
      {post.description && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4">
          {post.description}
        </p>
      )}

      {post.body && (
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground prose-ul:list-disc prose-ol:list-decimal prose-li:text-foreground">
          <RichText data={post.body} />
        </div>
      )}
    </div>
  );
}
