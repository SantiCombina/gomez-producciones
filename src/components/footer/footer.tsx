import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/about' },
    { label: 'Contacto', href: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@oscargomezproducciones4552',
      icon: <Youtube className="size-5" />,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100063067038840',
      icon: <Facebook className="size-5" />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/oscar.gomez64/',
      icon: <Instagram className="size-5" />,
    },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />,
      text: 'Porteña, Córdoba',
    },
    {
      icon: <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />,
      text: '+54 9 3564 56-3394',
    },
    {
      icon: <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />,
      text: 'oagomez64@yahoo.com.ar',
    },
  ];

  return (
    <footer className="bg-foreground text-background mt-12">
      <div className="container py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-8">
          <div className="lg:col-span-2">
            <Image
              src="/og-logo-white.png"
              alt="Oscar Gómez Producciones"
              width={220}
              height={60}
              className="object-contain mb-1 h-20 sm:h-24 w-auto"
            />
            <p className="hidden sm:block text-background/60 mb-6 max-w-md text-sm leading-relaxed">
              Minuto a minuto con información al instante de los hechos, desde un enfoque plenamente periodístico
            </p>
          </div>

          <div className="grid grid-cols-[2fr_3fr] lg:contents">
            <div>
              <h3 className="font-medium text-sm uppercase tracking-widest mb-3 text-background/40">Navegación</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background/65 hover:text-background transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm uppercase tracking-widest mb-3 text-background/40">Contacto</h3>
              <div className="space-y-2 mb-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-2 text-background/65">
                    {info.icon}
                    <span className="text-sm">{info.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-1.5">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    size="icon"
                    className="h-10 w-10 rounded-full bg-background/10 text-background hover:bg-primary hover:text-primary-foreground transition-all duration-200 border-0 shadow-none"
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

        <Separator className="bg-background/10 my-4" />

        <div className="flex flex-col items-center gap-2 lg:flex-row lg:justify-between">
          <p className="text-background/30 text-xs">
            © {currentYear} Gómez Producciones | Todos los derechos reservados
          </p>
          <a href="https://forge.ar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <span className="text-background/30 text-xs">Un desarrollo de</span>
            <Image src="/Forge.png" alt="Forge" width={56} height={16} className="h-6 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
}
