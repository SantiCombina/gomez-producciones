'use client';

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import type { Media } from '@/payload-types';

interface Props {
  images: Media[];
}

export function ImageGallery({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, close, goNext, goPrev]);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <ImageWithSkeleton
              src={img.url!}
              alt={img.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={close}>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            className="absolute top-4 right-4 text-white hover:bg-white/10 z-10 h-12 w-12"
          >
            <XIcon className="h-7 w-7" />
          </Button>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 text-white hover:bg-white/10 z-10 h-12 w-12"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 text-white hover:bg-white/10 z-10 h-12 w-12"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </Button>
            </>
          )}

          <div className="relative max-w-[90vw] max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <ImageWithSkeleton
              src={selectedImage.url!}
              alt={selectedImage.alt || ''}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {images.length > 1 && (
            <span className="absolute bottom-4 text-white/70 text-sm">
              {selectedIndex! + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </>
  );
}
