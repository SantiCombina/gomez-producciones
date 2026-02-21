import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Advertisement, Media } from '@/payload-types';

interface Props {
  ad: Advertisement;
  className?: string;
}

export function AdBanner({ ad, className = '' }: Props) {
  const image = typeof ad.image === 'object' ? (ad.image as Media) : null;

  if (!image?.url) return null;

  const content = (
    <Card className={`w-full overflow-hidden p-0 ${className}`}>
      <div className="relative h-32">
        <img src={image.url} alt={image.alt || ad.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs bg-black/70 text-white hover:bg-black/70">
            Publicidad
          </Badge>
        </div>
      </div>
    </Card>
  );

  if (ad.link) {
    return (
      <a href={ad.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
