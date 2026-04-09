'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { compressImage } from '@/lib/image-utils';
import type { ArticleLabel, Location } from '@/payload-types';

import { createPostAction } from './actions';
import { CategorySelect } from './category-select';
import { createPostSchema, type CreatePostValues } from './create-post-schema';
import { ImageUploader } from './image-uploader';
import { LocationSelect } from './location-select';

const RichTextEditor = dynamic(() => import('./rich-text-editor').then((m) => m.RichTextEditor), {
  ssr: false,
  loading: () => <div className="h-50 rounded-md border bg-muted/30 animate-pulse" />,
});

interface Props {
  onSuccess: () => void;
  initialCategories: ArticleLabel[];
  initialLocations: Location[];
}

export function PostDialog({ onSuccess, initialCategories, initialLocations }: Props) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const dragCounterRef = useRef(0);
  const router = useRouter();

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      description: '',
      body: undefined,
      categoryId: undefined,
      locationId: undefined,
      images: [],
    },
  });

  const { executeAsync, isPending } = useAction(createPostAction);

  function addImages(files: File[]) {
    const current = form.getValues('images') ?? [];
    form.setValue('images', [...current, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  }

  function handleImageRemove(index: number) {
    const current = form.getValues('images') ?? [];
    const updated = current.filter((_, i) => i !== index);
    form.setValue('images', updated);
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    dragCounterRef.current++;
    if (dragCounterRef.current === 1) setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) setIsDragging(false);
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounterRef.current = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;
    setIsCompressing(true);
    try {
      const compressed = await Promise.all(files.map((f) => compressImage(f)));
      addImages(compressed);
    } finally {
      setIsCompressing(false);
    }
  }

  const handleBodyChange = useCallback(
    (json: string) => {
      form.setValue('body', json);
    },
    [form],
  );

  async function onSubmit(values: CreatePostValues) {
    const result = await executeAsync(values);
    if (result?.data) {
      form.reset();
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImagePreviews([]);
      router.refresh();
      onSuccess();
    }
  }

  return (
    <DialogContent
      className="sm:max-w-lg flex flex-col max-h-[88vh] p-0 gap-0"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <DialogHeader className="shrink-0 px-6 pt-5 pb-4 border-b">
        <DialogTitle className="text-center text-lg font-semibold">Nueva publicación</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="overflow-y-auto flex-1 min-h-0 px-6 pt-4 pb-1 space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Título de la publicación..." className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Extracto o resumen corto..."
                      className="resize-none bg-white min-h-15 max-h-30 overflow-y-auto"
                      style={{ fieldSizing: 'content' } as React.CSSProperties}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <RichTextEditor onChange={handleBodyChange} />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormControl>
                      <CategorySelect
                        initialCategories={initialCategories.map((c) => ({ id: c.id, name: c.name }))}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormControl>
                      <LocationSelect
                        initialLocations={initialLocations.map((l) => ({ id: l.id, name: l.name }))}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <ImageUploader
              previews={imagePreviews}
              onChange={addImages}
              onRemove={handleImageRemove}
              isDragging={isDragging}
              isCompressing={isCompressing}
            />
          </div>

          <div className="shrink-0 px-6 pb-4">
            <Button type="submit" className="w-full" disabled={isPending || !form.watch('title')}>
              {isPending ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Publicando...
                </>
              ) : (
                'Publicar'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
