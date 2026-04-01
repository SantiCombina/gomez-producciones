'use client';

import { ImageIcon, XIcon, ZoomInIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import type { Media } from '@/payload-types';

interface Props {
  images: Media[];
}

export function ArticleImageGallery({ images }: Props) {
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

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] w-full rounded-lg bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <ImageIcon className="h-10 w-10 opacity-40" />
        <span className="text-sm font-medium">Noticia sin imagen</span>
      </div>
    );
  }

  const [main, ...extras] = images;
  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      {images.length === 1 ? (
        <button
          type="button"
          onClick={() => setSelectedIndex(0)}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-lg group cursor-zoom-in"
          aria-label="Ver imagen completa"
        >
          <ImageWithSkeleton
            src={main.url!}
            alt={main.alt || ''}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
            <ZoomInIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
          </div>
        </button>
      ) : (
        <div className="space-y-2">
          <div className={`grid gap-2 ${extras.length === 1 ? 'grid-cols-[2fr_1fr]' : 'grid-cols-[2fr_1fr]'}`}>
            <button
              type="button"
              onClick={() => setSelectedIndex(0)}
              className="relative overflow-hidden rounded-lg group cursor-zoom-in aspect-[4/3]"
              aria-label="Ver imagen completa"
            >
              <ImageWithSkeleton
                src={main.url!}
                alt={main.alt || ''}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 66vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                <ZoomInIcon className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </button>

            <div
              className={`flex flex-col gap-2 ${extras.length >= 3 ? 'grid grid-rows-3' : extras.length === 2 ? 'grid grid-rows-2' : ''}`}
            >
              {extras.slice(0, 3).map((img, i) => {
                const realIndex = i + 1;
                const isLast = i === 2 && extras.length > 3;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedIndex(realIndex)}
                    className="relative flex-1 overflow-hidden rounded-lg group cursor-zoom-in"
                    aria-label="Ver imagen completa"
                  >
                    <ImageWithSkeleton
                      src={img.url!}
                      alt={img.alt || ''}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 33vw, 20vw"
                    />
                    {isLast ? (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">+{extras.length - 3}</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={close}>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            className="absolute top-4 right-4 text-white hover:text-white hover:bg-white/10 z-10 h-12 w-12"
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
                className="absolute left-2 text-white hover:text-white hover:bg-white/10 z-10 h-12 w-12"
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
                className="absolute right-2 text-white hover:text-white hover:bg-white/10 z-10 h-12 w-12"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </Button>
            </>
          )}

          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
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
