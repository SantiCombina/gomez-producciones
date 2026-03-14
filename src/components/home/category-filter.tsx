'use client';

import { useRef } from 'react';

import { cn } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  selected: number | null;
  onChange: (id: number | null) => void;
}

export function CategoryFilter({ categories, selected, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (categories.length === 0) return null;

  return (
    <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
          selected === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
        )}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={cn(
            'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
            selected === cat.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
