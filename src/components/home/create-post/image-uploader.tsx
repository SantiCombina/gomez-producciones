'use client';

import { ImageIcon, Loader2Icon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { compressImage } from '@/lib/image-utils';

interface Props {
  preview: string | null;
  onChange: (file: File) => void;
  onRemove: () => void;
}

export function ImageUploader({ preview, onChange, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
    } finally {
      setIsCompressing(false);
      e.target.value = '';
    }
  }

  return (
    <>
      {preview ? (
        <div className="relative rounded-lg overflow-hidden">
          <img src={preview} alt="Vista previa" className="w-full max-h-64 object-cover rounded-lg" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isCompressing}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-border bg-muted/40 hover:bg-muted hover:border-primary/40 text-foreground font-medium transition-colors text-sm disabled:opacity-50"
        >
          {isCompressing ? (
            <>
              <Loader2Icon className="h-5 w-5 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <ImageIcon className="h-5 w-5 text-primary" />
              Agregar foto
            </>
          )}
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </>
  );
}
