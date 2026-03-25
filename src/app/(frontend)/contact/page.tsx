import type { Metadata } from 'next';

import { ContactInfo } from '@/components/contacto/contact-info';
import { ContactMap } from '@/components/contacto/contact-map';
import { SocialLinks } from '@/components/contacto/social-links';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contacto | Gomez Producciones',
  description: 'Contactate con Gomez Producciones. Estamos para escucharte y recibir tu información.',
};

export default function ContactPage() {
  return (
    <div className="min-h-dvh">
      <div className="container py-12 space-y-14 max-w-3xl mx-auto">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">Contacto</h1>
          <p className="text-muted-foreground text-lg">Estamos para escucharte</p>
          <div className="mx-auto h-1 w-12 rounded-full bg-primary/30" />
        </div>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Datos de contacto</h2>
          <ContactInfo />
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Seguinos en redes</h2>
          <SocialLinks />
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Ubicación</h2>
          <ContactMap />
        </section>
      </div>
    </div>
  );
}
