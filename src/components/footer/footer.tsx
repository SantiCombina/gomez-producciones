import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' },
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@oscargomezproducciones4552',
      icon: <Youtube className="size-5" />,
      color: 'bg-white/20 hover:bg-white/30',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100063067038840',
      icon: <Facebook className="size-5" />,
      color: 'bg-white/20 hover:bg-white/30',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/oscar.gomez64/',
      icon: <Instagram className="size-5" />,
      color: 'bg-white/20 hover:bg-white/30',
    },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      text: 'Porteña, Córdoba',
    },
    {
      icon: <Phone className="h-5 w-5" />,
      text: '+54 9 3564 56-3394',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      text: 'oagomez64@yahoo.com.ar',
    },
  ];

  return (
    <footer className="bg-blue-600 text-white mt-12 border-t">
      <div className="container py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Image
              src="/og-logo-white.png"
              alt="Oscar Gómez Producciones"
              width={280}
              height={80}
              className="object-contain mb-1 h-20 sm:h-24 w-auto"
              priority
            />
            <p className="hidden sm:block text-blue-100 mb-6 max-w-md">
              Minuto a minuto con información al instante de los hechos, desde un enfoque plenamente periodístico
            </p>
          </div>

          <div className="grid grid-cols-2 lg:contents">
            <div>
              <h3 className="font-semibold text-lg mb-4">Navegación</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-blue-100 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contacto</h3>
              <div className="space-y-3 mb-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-2 text-blue-100">
                    {info.icon}
                    <span className="text-base">{info.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    size="icon"
                    className={`h-10 w-10 rounded-full text-white transition-all duration-200 border-0 shadow-none ${social.color}`}
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

        <Separator className="bg-blue-500 my-6" />

        <p className="text-blue-100 text-sm">© {currentYear} Gómez Producciones | Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
