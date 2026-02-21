import type { Post } from '@/payload-types';

interface ArticleBodyProps {
  post: Post;
}

export function ArticleBody({ post }: ArticleBodyProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="text-foreground leading-relaxed">
        <p>{post.description}</p>
      </div>
    </div>
  );
}
