import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Gomez Producciones',
  description: 'Contactate con Gomez Producciones. Estamos para escucharte y recibir tu información.',
};

export default async function ContactPage() {
  return (
    <div className="min-h-dvh">
      <div className="container py-12 space-y-16">Contact Page</div>
    </div>
  );
}
