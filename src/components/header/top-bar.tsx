import { Facebook, Instagram, Youtube } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function TopBar() {
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@oscargomezproducciones4552',
      icon: <Youtube className="size-5" />,
      color: 'bg-red-500 text-white hover:bg-red-600 hover:text-white',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100063067038840',
      icon: <Facebook className="size-5" />,
      color: 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/oscar.gomez64/',
      icon: <Instagram className="size-5" />,
      color:
        'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:text-white',
    },
  ];

  return (
    <div className="bg-muted/30 border-b">
      <div className="container">
        <div className="flex items-center justify-between h-12">
          <div className="text-sm text-muted-foreground">Tu portal de noticias</div>

          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                size="icon"
                className={`h-8 w-8 rounded-full transition-all duration-200 border-0 shadow-none ${social.color}`}
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
