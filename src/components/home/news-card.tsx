import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-utils';

import type { Post } from './types';

interface NewsCardProps {
  post: Post;
  variant?: 'featured' | 'regular';
}

export function NewsCard({ post, variant = 'regular' }: NewsCardProps) {
  const imageHeight = variant === 'featured' ? 'h-64' : 'h-48';
  const titleSize = variant === 'featured' ? 'text-xl' : 'text-lg';
  const padding = variant === 'featured' ? 'p-6' : 'p-4';

  return (
    <Card className="overflow-hidden p-0 flex flex-col">
      <div className={`relative ${imageHeight} flex-shrink-0`}>
        <img src={post.featuredImage.url} alt={post.featuredImage.alt} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-0">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground rounded-l-none rounded-r-md">
            {post.category.name}
          </Badge>
        </div>
      </div>
      <CardContent className={padding}>
        <time className="text-xs text-muted-foreground mb-3 block">{formatDate(post.createdAt)}</time>
        <CardTitle className={`${titleSize} mb-3`}>{post.title}</CardTitle>
        <CardDescription className="mb-4 text-base">{post.description}</CardDescription>
        <Button
          variant="ghost"
          className={`p-0 h-auto font-normal text-primary hover:text-primary/80 ${
            variant === 'regular' ? 'text-sm' : ''
          }`}
        >
          Leer más →
        </Button>
      </CardContent>
    </Card>
  );
}
