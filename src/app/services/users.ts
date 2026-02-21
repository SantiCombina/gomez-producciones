import { headers } from 'next/headers';

import { getPayloadClient } from '@/lib/payload';
import type { User } from '@/payload-types';

export const getCurrentUser = async (): Promise<User | null> => {
  const payload = await getPayloadClient();
  const headersList = await headers();

  const { user } = await payload.auth({ headers: headersList });

  return (user as User) ?? null;
};
