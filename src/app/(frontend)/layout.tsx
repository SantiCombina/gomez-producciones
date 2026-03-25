import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';

import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { PwaSetup } from '@/components/pwa/pwa-setup';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gomezproducciones.vercel.app'),
  title: 'Gomez Producciones - Noticias de Porteña y la Región',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    title: 'Gomez Producciones',
  },
  description:
    'Seguí las noticias de Porteña, San Francisco y la región en tiempo real. Información local al instante con un enfoque plenamente periodístico. Tu portal de confianza.',
  keywords: [
    'noticias',
    'periodismo',
    'gomez producciones',
    'radio',
    'televisión',
    'medios',
    'Porteña',
    'Córdoba',
    'noticias Porteña',
    'San Francisco Córdoba',
    'noroeste de Córdoba',
    'noticias locales',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://gomezproducciones.vercel.app',
    siteName: 'Gomez Producciones',
    title: 'Gomez Producciones - Noticias de Porteña y la Región',
    description:
      'Seguí las noticias de Porteña, San Francisco y la región en tiempo real. Información local al instante con un enfoque plenamente periodístico.',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Gomez Producciones - Portal de Noticias',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gomez Producciones - Noticias de Porteña y la Región',
    description:
      'Seguí las noticias de Porteña, San Francisco y la región en tiempo real. Información local al instante con un enfoque plenamente periodístico.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsMediaOrganization',
              name: 'Gomez Producciones',
              url: 'https://gomezproducciones.vercel.app',
              logo: 'https://gomezproducciones.vercel.app/og-logo-black.png',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Porteña',
                addressRegion: 'Córdoba',
                addressCountry: 'AR',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+54-9-3564-56-3394',
                contactType: 'customer service',
              },
              sameAs: [
                'https://www.youtube.com/@oscargomezproducciones4552',
                'https://www.facebook.com/profile.php?id=100063067038840',
                'https://www.instagram.com/oscar.gomez64/',
              ],
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
        >
          Ir al contenido principal
        </a>
        <PwaSetup />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
