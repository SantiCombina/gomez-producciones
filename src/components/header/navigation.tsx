import { Button } from '@/components/ui/button';

import type { MenuItem } from '../home/types';

interface NavigationProps {
  items: MenuItem[];
}

export function Navigation({ items }: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {items.map((item) => (
        <Button key={item.label} variant="ghost" size="sm" className="text-foreground hover:text-primary">
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
