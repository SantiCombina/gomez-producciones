'use client';

import { ImageIcon, Loader2Icon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/image-utils';

interface Props {
  preview: string | null;
  onChange: (file: File) => void;
  onRemove: () => void;
  isDragging?: boolean;
  isCompressing?: boolean;
}

export function ImageUploader({
  preview,
  onChange,
  onRemove,
  isDragging = false,
  isCompressing: externalCompressing,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalCompressing, setInternalCompressing] = useState(false);
  const isCompressing = externalCompressing ?? internalCompressing;

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setInternalCompressing(true);
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
    } finally {
      setInternalCompressing(false);
      e.target.value = '';
    }
  }

  useEffect(() => {
    async function handlePaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (!file) break;
          setInternalCompressing(true);
          try {
            const compressed = await compressImage(file);
            onChange(compressed);
          } finally {
            setInternalCompressing(false);
          }
          break;
        }
      }
    }

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onChange]);

  return (
    <>
      {preview ? (
        <div className="relative rounded-lg overflow-hidden">
          <img src={preview} alt="Vista previa" className="w-full max-h-64 object-cover rounded-lg" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 hover:bg-black/80 text-white hover:text-white"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={() => inputRef.current?.click()}
          disabled={isCompressing}
          className={`relative w-full h-auto flex-col !items-center !justify-center gap-1 p-5 whitespace-normal rounded-lg border-2 border-dashed transition-colors duration-200 ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted/40 hover:bg-muted hover:border-primary/40'
          }`}
        >
          <div
            className={`flex flex-col items-center gap-1 transition-opacity duration-200 ${isDragging || isCompressing ? 'opacity-0' : 'opacity-100'}`}
          >
            <ImageIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Agregar foto</span>
            <span className="text-xs text-muted-foreground">Hacé clic, arrastrá o pegá con Ctrl+V</span>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-1 transition-opacity duration-200 ${isCompressing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <Loader2Icon className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Procesando...</span>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg transition-opacity duration-200 ${isDragging ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <ImageIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Soltá la imagen aquí</span>
          </div>
        </Button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </>
  );
}
