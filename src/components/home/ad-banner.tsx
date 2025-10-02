import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import type { Ad } from './types';

interface AdBannerProps {
  ad: Ad;
  className?: string;
}

export function AdBanner({ ad, className = '' }: AdBannerProps) {
  return (
    <Card className={`w-full overflow-hidden p-0 ${className}`}>
      <div className="relative h-32">
        <img src={ad.image.url} alt={ad.image.alt} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs bg-black/70 text-white hover:bg-black/70">
            Publicidad
          </Badge>
        </div>
      </div>
    </Card>
  );
}
