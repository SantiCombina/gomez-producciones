'use server';

import { cookies } from 'next/headers';

import { authActionClient } from '@/lib/safe-action-client';

export const logoutAction = authActionClient.action(async () => {
  const cookieStore = await cookies();
  cookieStore.delete('payload-token');
  return { success: true };
});
