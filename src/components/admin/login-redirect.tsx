'use client';

import { useAuth } from '@payloadcms/ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function LoginRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return null;
}
