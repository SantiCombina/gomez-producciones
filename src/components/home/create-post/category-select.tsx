'use client';

import { CheckIcon, ChevronDownIcon, Loader2Icon, PlusIcon, TagIcon, XIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { createArticleLabelAction } from './actions';

interface Category {
  id: number;
  name: string;
}

interface Props {
  initialCategories: Category[];
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export function CategorySelect({ initialCategories, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { executeAsync, isPending } = useAction(createArticleLabelAction);

  const selected = categories.find((c) => c.id === value);

  async function handleCreate() {
    if (!newName.trim()) return;
    const result = await executeAsync({ name: newName.trim() });
    if (result?.data) {
      const created = { id: result.data.id, name: result.data.name };
      setCategories((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      onChange(created.id);
      setNewName('');
      setCreating(false);
      setOpen(false);
    }
  }

  function openCreating() {
    setCreating(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function cancelCreating() {
    setCreating(false);
    setNewName('');
  }

  return (
    <div className="flex gap-2">
      <Popover
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) cancelCreating();
        }}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="flex-1 justify-start gap-2 font-normal bg-white hover:bg-muted/40 min-w-0"
          >
            <TagIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className={`truncate ${selected ? 'text-foreground' : 'text-muted-foreground'}`}>
              {selected ? selected.name : 'Categoría (opcional)'}
            </span>
            <ChevronDownIcon className="h-4 w-4 text-muted-foreground shrink-0 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-1 w-[--radix-popover-trigger-width]"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {!creating ? (
            <button
              type="button"
              onClick={openCreating}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-left text-muted-foreground"
            >
              <PlusIcon className="h-3.5 w-3.5 shrink-0" />
              Crear categoría
            </button>
          ) : (
            <div className="flex gap-1.5 p-1 min-w-0">
              <Input
                ref={inputRef}
                placeholder="Nombre..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreate();
                  }
                  if (e.key === 'Escape') cancelCreating();
                }}
                className="h-8 text-sm min-w-0"
                disabled={isPending}
              />
              <Button
                type="button"
                size="sm"
                className="h-8 w-8 px-0 shrink-0"
                onClick={handleCreate}
                disabled={!newName.trim() || isPending}
              >
                {isPending ? (
                  <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <CheckIcon className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          )}

          {categories.length > 0 && <div className="h-px bg-border my-1" />}

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onChange(cat.id);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-left"
            >
              {cat.name}
              <CheckIcon className={`h-3.5 w-3.5 shrink-0 ${value === cat.id ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          ))}
        </PopoverContent>
      </Popover>

      {selected && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0 h-9 w-9 bg-white hover:bg-muted/40 text-muted-foreground hover:text-foreground"
          onClick={() => onChange(undefined)}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
