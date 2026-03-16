import { ImageIcon } from 'lucide-react';

import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import type { Media } from '@/payload-types';

interface Props {
  images: Media[];
  priority?: boolean;
  sizes?: string;
  aspectClass?: string;
}

export function PostImagePreview({ images, priority, sizes, aspectClass = 'aspect-[16/9]' }: Props) {
  if (images.length === 0) {
    return (
      <div
        className={`${aspectClass} w-full bg-muted flex flex-col items-center justify-center gap-1.5 text-muted-foreground`}
      >
        <ImageIcon className="h-7 w-7 opacity-35" />
        <span className="text-xs font-medium">Sin imagen</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`relative ${aspectClass} w-full overflow-hidden`}>
        <ImageWithSkeleton
          src={images[0].url!}
          alt={images[0].alt || ''}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  const [main, second, third] = images;
  const remaining = images.length - 3;

  return (
    <div className={`relative ${aspectClass} w-full overflow-hidden grid grid-cols-[2fr_1fr] gap-0.5`}>
      <div className="relative h-full overflow-hidden">
        <ImageWithSkeleton
          src={main.url!}
          alt={main.alt || ''}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes={sizes}
          priority={priority}
        />
      </div>

      <div className="flex flex-col gap-0.5 h-full">
        {second && (
          <div className="relative flex-1 overflow-hidden">
            <ImageWithSkeleton
              src={second.url!}
              alt={second.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 33vw, 15vw"
            />
          </div>
        )}
        {third && (
          <div className="relative flex-1 overflow-hidden">
            <ImageWithSkeleton
              src={third.url!}
              alt={third.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 33vw, 15vw"
            />
            {remaining > 0 && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                <span className="text-white font-bold text-sm">+{remaining}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
