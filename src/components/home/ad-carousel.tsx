'use client';

import { useCallback, useEffect, useState } from 'react';

import type { Advertisement } from '@/payload-types';

import { AdBanner } from './ad-banner';

type SlideDirection = 'left' | 'down';

interface Props {
  ads: Advertisement[];
  className?: string;
  intervalMs?: number;
  direction?: SlideDirection;
}

export function AdCarousel({ ads, className, intervalMs = 4000, direction = 'left' }: Props) {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * ads.length));
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'entering'>('visible');

  const rotate = useCallback(() => {
    setPhase('exiting');
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (ads.length <= 1) return 0;
        let next: number;
        do {
          next = Math.floor(Math.random() * ads.length);
        } while (next === prev);
        return next;
      });
      setPhase('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('visible');
        });
      });
    }, 350);
  }, [ads.length]);

  useEffect(() => {
    if (ads.length <= 1) return;
    const timer = setInterval(rotate, intervalMs);
    return () => clearInterval(timer);
  }, [ads.length, intervalMs, rotate]);

  if (ads.length === 0) return null;

  const isLeft = direction === 'left';

  const style: React.CSSProperties =
    phase === 'exiting'
      ? {
          transform: isLeft ? 'translateX(-100%)' : 'translateY(100%)',
          opacity: 0,
          transition: 'transform 350ms ease-in, opacity 350ms ease-in',
        }
      : phase === 'entering'
        ? {
            transform: isLeft ? 'translateX(100%)' : 'translateY(-100%)',
            opacity: 0,
            transition: 'none',
          }
        : {
            transform: 'translate(0, 0)',
            opacity: 1,
            transition: 'transform 350ms ease-out, opacity 350ms ease-out',
          };

  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <div style={style}>
        <AdBanner ad={ads[currentIndex]} />
      </div>
    </div>
  );
}
