import { CalendarIcon, MapPinIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date-utils';
import type { Post } from '@/payload-types';

interface ArticleMetaProps {
  post: Post;
}

export function ArticleMeta({ post }: ArticleMetaProps) {
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const location = typeof post.location === 'object' && post.location ? post.location : null;

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-b border-border/60">
      <div className="flex items-center gap-2 text-base text-muted-foreground">
        <CalendarIcon className="h-5 w-5" aria-hidden="true" />
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>
      {category && (
        <Badge variant="secondary" className="bg-primary/10 text-primary text-sm font-medium">
          {category.name}
        </Badge>
      )}
      {location && (
        <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-1">
          <MapPinIcon className="h-4 w-4 text-amber-600 shrink-0" />
          {location.name}
        </div>
      )}
    </div>
  );
}
