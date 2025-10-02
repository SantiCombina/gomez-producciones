import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';

import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { menuItems } from '@/components/home/data';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  description: 'Minuto a minuto con información al instante de los hechos, desde un enfoque plenamente periodístico.',
  title: 'Gomez Producciones - Portal de Noticias',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans">
        <Header menuItems={menuItems} />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
