import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const CONTACT_DATA = [
  {
    icon: PhoneIcon,
    label: 'Teléfono',
    value: '+54 9 3564 56-3394',
    href: 'tel:+5493564563394',
  },
  {
    icon: MailIcon,
    label: 'Email',
    value: 'oagomez64@yahoo.com.ar',
    href: 'mailto:oagomez64@yahoo.com.ar',
  },
  {
    icon: MapPinIcon,
    label: 'Dirección',
    value: 'Porteña, Córdoba',
    href: null,
  },
] as const;

export function ContactInfo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {CONTACT_DATA.map((item) => {
        const content = (
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center text-center gap-4 p-6 sm:p-8">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground block">{item.label}</span>
                <span className="text-base font-semibold block">{item.value}</span>
              </div>
            </CardContent>
          </Card>
        );

        if (item.href) {
          return (
            <a key={item.label} href={item.href} className="block">
              {content}
            </a>
          );
        }

        return <div key={item.label}>{content}</div>;
      })}
    </div>
  );
}
