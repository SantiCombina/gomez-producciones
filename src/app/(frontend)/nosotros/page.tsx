import type { Metadata } from 'next';

import { AboutHeader } from '@/components/nosotros/about-header';
import { CompanyHistory } from '@/components/nosotros/company-history';
import { OwnerProfile } from '@/components/nosotros/owner-profile';

export const metadata: Metadata = {
  title: 'Nosotros | Gomez Producciones',
  description: 'Conocé la historia y el equipo detrás de Gomez Producciones, el portal de noticias de tu comunidad.',
};

export default async function AboutPage() {
  return (
    <div className="min-h-dvh">
      <div className="container py-12 space-y-16">
        <AboutHeader />
        <CompanyHistory />
        <OwnerProfile />
      </div>
    </div>
  );
}
