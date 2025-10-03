import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import type { MenuItem } from '../home/types';

interface Props {
  items: MenuItem[];
}

export function MobileMenu({ items }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={28} className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle>Navegación</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-2">
          {items.map((item) => (
            <Button key={item.label} variant="ghost" className="justify-start">
              {item.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
