import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from 'next-safe-action';

import { getCurrentUser } from '@/app/services/users';

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ActionError';
  }
}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }
    console.error('Server action error:', e);
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new ActionError('No autorizado');
  }

  return next({ ctx: { user } });
});

export const adminActionClient = authActionClient.use(async ({ next, ctx }) => {
  if (ctx.user.role !== 'admin') {
    throw new ActionError('No tenés permisos para realizar esta acción');
  }

  return next({ ctx });
});
