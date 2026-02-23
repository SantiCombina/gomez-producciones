'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { compressImage } from '@/lib/image-utils';

import { createPostAction } from './actions';
import { createPostSchema, type CreatePostValues } from './create-post-schema';
import { ImageUploader } from './image-uploader';

interface Props {
  onSuccess: () => void;
}

export function PostDialog({ onSuccess }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const dragCounterRef = useRef(0);
  const router = useRouter();

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', description: '' },
  });

  const { executeAsync, isPending } = useAction(createPostAction);

  function handleImageChange(file: File) {
    form.setValue('image', file);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
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
    const file = e.dataTransfer.files[0];
    if (!file?.type.startsWith('image/')) return;
    setIsCompressing(true);
    try {
      const compressed = await compressImage(file);
      handleImageChange(compressed);
    } finally {
      setIsCompressing(false);
    }
  }

  function handleImageRemove() {
    form.setValue('image', undefined);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  }

  async function onSubmit(values: CreatePostValues) {
    const result = await executeAsync(values);
    if (result?.data) {
      form.reset();
      setImagePreview(null);
      onSuccess();
      router.refresh();
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
                      placeholder="¿Qué querés publicar?"
                      className="resize-none bg-white min-h-[80px] max-h-[200px] overflow-y-auto"
                      style={{ fieldSizing: 'content' } as React.CSSProperties}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ImageUploader
              preview={imagePreview}
              onChange={handleImageChange}
              onRemove={handleImageRemove}
              isDragging={isDragging}
              isCompressing={isCompressing}
            />
          </div>

          <div className="shrink-0 px-6 pb-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isPending || !form.watch('title')}
            >
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
