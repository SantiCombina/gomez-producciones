import { ImageIcon } from 'lucide-react';
import * as React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { User } from '@/payload-types';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  user: User;
}

function getUserInitials(user: User): string {
  return user.email ? user.email.slice(0, 2).toUpperCase() : 'GP';
}

export const TriggerBar = React.forwardRef<HTMLDivElement, Props>(({ user, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="flex items-center gap-3 p-3 pr-5 rounded-xl border border-border bg-card cursor-pointer hover:bg-muted/50 transition-colors"
    >
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
          {getUserInitials(user)}
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 text-muted-foreground text-base">¿Qué está pasando en la zona?</span>
      <ImageIcon className="h-5 w-5 text-muted-foreground" />
    </div>
  );
});

TriggerBar.displayName = 'TriggerBar';
