'use client';

import { ImageIcon, Loader2Icon, PlusIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/image-utils';

interface Props {
  previews: string[];
  onChange: (files: File[]) => void;
  onRemove: (index: number) => void;
  isDragging?: boolean;
  isCompressing?: boolean;
}

export function ImageUploader({
  previews,
  onChange,
  onRemove,
  isDragging = false,
  isCompressing: externalCompressing,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalCompressing, setInternalCompressing] = useState(false);
  const isCompressing = externalCompressing ?? internalCompressing;

  async function handleFiles(fileList: FileList | File[]) {
    const imageFiles = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    setInternalCompressing(true);
    try {
      const compressed = await Promise.all(imageFiles.map((f) => compressImage(f)));
      onChange(compressed);
    } finally {
      setInternalCompressing(false);
    }
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await handleFiles(files);
    e.target.value = '';
  }

  useEffect(() => {
    async function handlePaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items;
      if (!items) return;
      const imageFiles: File[] = [];
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) imageFiles.push(file);
        }
      }
      if (imageFiles.length > 0) {
        setInternalCompressing(true);
        try {
          const compressed = await Promise.all(imageFiles.map((f) => compressImage(f)));
          onChange(compressed);
        } finally {
          setInternalCompressing(false);
        }
      }
    }

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onChange]);

  return (
    <>
      {previews.length > 0 ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {previews.map((src, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <img
                  src={src}
                  alt={`Vista previa ${index + 1}`}
                  className={`w-full object-cover rounded-lg ${index === 0 ? 'max-h-48' : 'max-h-32'}`}
                />
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
                    Principal
                  </span>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(index)}
                  className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-black/60 hover:bg-black/80 text-white hover:text-white"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => inputRef.current?.click()}
            disabled={isCompressing}
            className="w-full h-10 border border-dashed border-border hover:border-primary/40 text-muted-foreground"
          >
            {isCompressing ? (
              <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <PlusIcon className="h-4 w-4 mr-2" />
            )}
            Agregar más fotos
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
            <span className="text-sm font-medium">Agregar fotos</span>
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
            <span className="text-sm font-medium text-primary">Soltá las imágenes aquí</span>
          </div>
        </Button>
      )}
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleChange} />
    </>
  );
}
