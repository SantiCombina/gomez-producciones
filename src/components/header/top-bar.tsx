import { Facebook, Instagram, Youtube } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function TopBar() {
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@oscargomezproducciones4552',
      icon: <Youtube className="size-4" />,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100063067038840',
      icon: <Facebook className="size-4" />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/oscar.gomez64/',
      icon: <Instagram className="size-4" />,
    },
  ];

  return (
    <div className="bg-foreground text-background/70">
      <div className="container">
        <div className="flex items-center justify-between h-9">
          <span className="text-[10px] uppercase tracking-widest text-background/60">Tu portal de noticias</span>

          <div className="flex items-center space-x-1">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                size="icon"
                className="h-7 w-7 rounded-full bg-transparent text-background/60 hover:bg-primary hover:text-primary-foreground transition-all duration-200 border-0 shadow-none"
                asChild
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Seguinos en ${social.name}`}
                >
                  {social.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
