import { Card } from '@/components/ui/card';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
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
      <div className="relative w-full aspect-1500/173">
        <ImageWithSkeleton src={image.url} alt={image.alt || ad.title} fill className="object-contain" sizes="100vw" />
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
