import type { Access } from 'payload';

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin';
};

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor';
};

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === 'admin' || user.role === 'editor') return true;
  return { id: { equals: user.id } };
};

export const isAuthenticated: Access = ({ req: { user } }) => {
  return !!user;
};

export const anyone: Access = () => true;
