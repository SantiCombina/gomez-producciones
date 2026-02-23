'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ImageWithSkeleton({ src, alt, fill, className, sizes, priority }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
