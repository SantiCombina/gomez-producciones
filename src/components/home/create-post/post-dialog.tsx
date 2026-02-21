'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPostAction } from './actions';
import { createPostSchema, type CreatePostValues } from './create-post-schema';
import { ImageUploader } from './image-uploader';

interface Props {
  onSuccess: () => void;
}

export function PostDialog({ onSuccess }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-center text-lg font-semibold">Nueva publicación</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                  <Textarea placeholder="Descripción (opcional)..." rows={4} className="resize-none bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ImageUploader preview={imagePreview} onChange={handleImageChange} onRemove={handleImageRemove} />

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
        </form>
      </Form>
    </DialogContent>
  );
}
