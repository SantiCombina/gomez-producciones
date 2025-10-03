import { Calendar } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date-utils';
import type { Post } from '@/payload-types';

interface ArticleMetaProps {
  post: Post;
}

export function ArticleMeta({ post }: ArticleMetaProps) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;

  return (
    <div className="py-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </div>
        {category && (
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
            {category.name}
          </Badge>
        )}
      </div>
    </div>
  );
}
