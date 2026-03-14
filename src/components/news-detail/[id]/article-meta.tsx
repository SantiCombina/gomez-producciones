import { CalendarIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date-utils';
import type { Post } from '@/payload-types';

interface ArticleMetaProps {
  post: Post;
}

export function ArticleMeta({ post }: ArticleMetaProps) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border/60">
      <div className="flex items-center gap-2 text-base text-muted-foreground">
        <CalendarIcon className="h-5 w-5" />
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>
      {category && (
        <Badge variant="secondary" className="bg-primary/10 text-primary text-sm font-medium">
          {category.name}
        </Badge>
      )}
    </div>
  );
}
