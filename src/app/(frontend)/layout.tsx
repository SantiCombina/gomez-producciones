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
  title: 'Gomez Producciones - Portal de Noticias',
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
    title: 'OG',
  },
  description: 'Minuto a minuto con información al instante de los hechos, desde un enfoque plenamente periodístico.',
  keywords: ['noticias', 'periodismo', 'gomez producciones', 'radio', 'televisión', 'medios'],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://gomezproducciones.vercel.app',
    siteName: 'Gomez Producciones',
    title: 'Gomez Producciones - Portal de Noticias',
    description: 'Minuto a minuto con información al instante de los hechos, desde un enfoque plenamente periodístico.',
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
    title: 'Gomez Producciones - Portal de Noticias',
    description: 'Minuto a minuto con información al instante de los hechos, desde un enfoque plenamente periodístico.',
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
              '@type': 'Organization',
              name: 'Gomez Producciones',
              url: 'https://gomezproducciones.vercel.app',
              logo: 'https://gomezproducciones.vercel.app/og-logo-black.png',
              sameAs: [],
            }),
          }}
        />
        <PwaSetup />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
